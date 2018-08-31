import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Dishes = new Mongo.Collection('dishes');

if (Meteor.isServer) {
  Meteor.publish('dishes', () => {
    return Dishes.find({});
  });
}
Meteor.methods({
  'dishes.Insert'(dish) {
    if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
      Dishes.insert({
        name: dish.name,
        price: dish.price,
        description: dish.description,
        image: dish.image,
        type: dish.type,
        nutritionFacts: {
          calories: dish.calories,
          totalFat: dish.totalFat,
          saturatedFat: dish.saturatedFat,
          transFat: dish.transFat,
          cholesterol: dish.cholesterol,
          sodium: dish.sodium,
          totalCarbohydrates: dish.totalCarbohydrates,
          dietaryFibers: dish.dietaryFibers,
          sugar: dish.sugar,
          protein: dish.protein,
          vitaminA: dish.vitaminA,
          vitaminC: dish.vitaminC,
          calcium: dish.calcium,
          iron: dish.iron
        }
      });
    }
  },
  'dishes.Delete'(id) {
    if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
      Dishes.remove(id);
    }
  },
  'dishes.Update'(id, dish) {
    if (Roles.userIsInRole(Meteor.userId(), 'administrator')) {
      Dishes.update({_id: id}, {$set: 

        {
          name: dish.nameNew,
          price: dish.priceNew,
          description: dish.descriptionNew,
          image: dish.imageNew,
          type: dish.typeNew,
          nutritionFacts: {
            calories: dish.caloriesNew,
            totalFat: dish.totalFatNew,
            saturatedFat: dish.saturatedFatNew,
            transFat: dish.transFatNew,
            cholesterol: dish.cholesterolNew,
            sodium: dish.sodiumNew,
            totalCarbohydrates: dish.totalCarbohydratesNew,
            dietaryFibers: dish.dietaryFibersNew,
            sugar: dish.sugarNew,
            protein: dish.proteinNew,
            vitaminA: dish.vitaminANew,
            vitaminC: dish.vitaminCNew,
            calcium: dish.calciumNew,
            iron: dish.ironNew
          }
        }
        
      });
    }
  }
});
