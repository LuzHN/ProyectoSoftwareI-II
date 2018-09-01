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
    if (
      Roles.userIsInRole(Meteor.userId(), 'administrator') ||
      Roles.userIsInRole(Meteor.userId(), 'client')
    ) {
      return Meteor.users.find({
        $or: [
          {
            roles: 'client'
          },
          {
            roles: 'normal-user'
          }
        ]
      });
    }
  });

  Meteor.publish('users.getAdmins', () => {
    if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
      return Meteor.users.find(
        {
          roles: 'administrator'
        },
        {
          services: 0
        }
      );
    }
  });

  Meteor.publish('users.getEmployees', () => {
    if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
      return Meteor.users.find(
        {
          roles: 'employee'
        },
        {
          services: 0
        }
      );
    }
  });

  Meteor.methods({
    'users.initializeClient'(user) {
      Roles.addUsersToRoles(Accounts.createUser(user), 'client');
      console.log('Se inicializo un cliente.');
    },
    'users.initializeClientEnAdmin'(user) {
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Roles.addUsersToRoles(Accounts.createUser(user), 'client');
        console.log('Se inicializo un cliente.');
        return 1;
      } else {
        console.log('No es administrador para inicializar clientes.');
        return 0;
      }
    },
    'users.initializeEmployee'(user) {
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Roles.addUsersToRoles(Accounts.createUser(user), 'employee');
        console.log('Se inicializo un empleado.');
        return 1;
      } else {
        console.log('No es administrador para inicializar un empleado.');
        return 0;
      }
    },
    'users.initializeAdministrator'(user) {
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Roles.addUsersToRoles(Accounts.createUser(user), 'administrator');
        console.log('Se inicializo un adminsitrador');
        return 1;
      } else {
        console.log('Nos es administrador para inicializar administradores');
        return 0;
      }
    },
    async 'users.isClient'() {
      return await Roles.userIsInRole(Meteor.userId(), 'client');
    },
    async 'users.isAdministrator'() {
      return await Roles.userIsInRole(Meteor.userId(), 'employee');
    },
    async 'users.isEmployee'() {
      return await Roles.userIsInRole(Meteor.userId(), 'administrator');
    },
    'users.updateProfileSelf'(user) {
      Meteor.users.update(
        { _id: Meteor.userId() },
        {
          $set: { profile: user }
        }
      );
    },
    'users.deleteSelf'() {
      Meteor.users.remove({ _id: Meteor.userId() });
    },
    'users.delete'(id) {
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Meteor.users.remove({ _id: id });
      }
    },
    'users.update'(id, user) {
      if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
        Meteor.users.update(
          { _id: id },
          {
            $set: { profile: user }
          }
        );
      }
    }
  });
}
