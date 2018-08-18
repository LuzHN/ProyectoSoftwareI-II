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

Meteor.methods({
  'initialize.User'(){
    console.log(Meteor.userId());
    Roles.addUsersToRoles(Meteor.userId(), 'normal-user');
  },
  'check.Role'() {
    console.log(Roles.userIsInRole(Meteor.userId(), 'normal-user'));
  }
});