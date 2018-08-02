import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

Meteor.methods({
  updateUser(user){
    Meteor.users.update({_id: Meteor.userId}, {$set: {
      'profile.firstName': user.firstName,
      'profile.lastName': user.lastName,
      'profile.phoneNumber1': user.phoneNumber1,
      'profile.phoneNumber2': user.phoneNumber2,
      'profile.phoneNumber3': user.phoneNumber3,
      'profile.phoneNumber4': user.phoneNumber4,
      'profile.address1': user.address1,
      'profile.address2': user.address2,
      'profile.address3': user.address3,
      'profile.address4': user.address4,
    }})
  },
  'query.User'(firstName) {
    console.log('enrtro');
    return Meteor.users.find({"profile.firstName": firstName});
  }
});
