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
  Meteor.publish('users.getClients', () => { 
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

  Meteor.publish('users.getEmployees', () => {
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
    'users.initializeClient'(){
      Roles.addUsersToRoles(Meteor.userId(), 'client');
    },
    'users.initializeEmployee'(user){
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Roles.addUsersToRoles(Accounts.createUser(user), 'employee');
      }
    },
    'users.initializeAdministrator'(){
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Roles.addUsersToRoles(Accounts.createUser(user), 'employee');
      }
    },
    async 'users.isClient'(){
      return await Roles.userIsInRole(Meteor.userId(), 'client');
    },
    async 'users.isAdministrator'(){
      return await Roles.userIsInRole(Meteor.userId(), 'employee');
    },
    async 'users.isEmployee'(){
      return await Roles.userIsInRole(Meteor.userId(), 'administrator');
    },
    'users.updateProfileSelf'(user){
      Meteor.users.update({_id: Meteor.userId()}, {$set: 
        user
      });
    },
    'users.deleteSelf'(){
      Meteor.users.remove({ _id:  Meteor.userId()});
    },
    'users.delete'(_id){
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Meteor.users.remove({ _id });
      }
    },
    'users.update'(_id){
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Meteor.users.update({_id: Meteor.userId()}, {$set: 
          user
        });
      }
    }
  });
}