import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

Accounts.validateNewUser((user) => {
  const email = user.emails[0].address;
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({ email });
  return true;
});

if (Meteor.isServer) {
  Meteor.publish('user.getClients', () => { 
    if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
      return Meteor.users.find(
        {
         "roles": "client"
        }, 
        {
          "services": 0
        }
      );
    }
  });

  Meteor.publish('user.getEmployees', () => {
    if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
      return Meteor.users.find(
        {
         "roles": "employee"
        }, 
        {
          "services": 0
        }
      );
    }
  });

  Meteor.methods({
    'user.initializeClient'(){
      Roles.addUsersToRoles(Meteor.userId(), 'normal-user');
    },
    'user.initializeEmployee'(){
      Roles.addUsersToRoles(Meteor.userId(), 'employee');
    },
    'user.initializeAdministrator'(){
      Roles.addUsersToRoles(Meteor.userId(), 'administrator');
    },
    async 'user.isClient'(){
      return await Roles.userIsInRole(Meteor.userId(), 'client');
    },
    async 'user.isAdmin'(){
      return await Roles.userIsInRole(Meteor.userId(), 'employee');
    },
    async 'user.isEmployee'(){
      return await Roles.userIsInRole(Meteor.userId(), 'administrator');
    },
    'user.updateProfileSelf'(user){
      Meteor.users.update({_id: Meteor.userId()}, {$set: 
        user
      });
    },
    'user.deleteSelf'(){
      Meteor.users.remove({ _id:  Meteor.userId()});
    },
    'user.delete'(_id){
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Meteor.users.remove({ _id });
      }
    },
    'user.update'(_id){
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Meteor.users.update({_id: Meteor.userId()}, {$set: 
          user
        });
      }
    }
  });
}