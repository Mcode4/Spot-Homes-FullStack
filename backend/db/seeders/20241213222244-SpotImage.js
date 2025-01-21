'use strict';

const { SpotImage,Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotIm = [
  {
    // spotId:1,
    name:'mars hotel',
    url:'https://img.freepik.com/premium-photo/house-built-future-planet-future-design-homes-houses-mars-martian_410516-47165.jpg',
    preview:true
  },
  {
    // spotId:1,
    name:'mars hotel',
    url:'https://img.freepik.com/premium-photo/house-built-future-planet-future-design-homes-houses-mars-martian_410516-47165.jpg',
    preview:false
  },
  {
    // spotId:1,
    name:'moon hotel',
    url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmZH-23DJlIaDBlyvnNYRBC7Gzkoj-c-2VKA&s',
    preview:true
  },
  {
    // spotId:1,
    name:'Apartment Suite',
    url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm7i3Z1mN-ZMo1OqjenrZQwod1k9wj8l4aqw&s',
    preview:true
  },
  {
    // spotId:1,
    name:'Condo House',
    url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1Oez8pmMlfEqmcJe3DE61HN3ewlLUa72w&s',
    preview:false
  },
  {
    // spotId:1,
    name:'Spot for BBQ',
    url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ3DFS7NLNZ0VbP4QakPLpDzAQ5Ftco_SKaQ&s',
    preview:true
  },
  {
    // spotId:1,
    name:'Full House',
    url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm0s6MYy-1MJ8aVhicV3O9f_WoZSZJ66f9xw&s',
    preview:false
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    //  await SpotImage.bulkCreate(spotIm,{
    //   validate:true
    //  });
    for(let spot of spotIm){
      const {name,url,preview} = spot;
      const foundspot = await Spot.findOne({
        where:{
          name
        }
      });
      console.log(foundspot.id);
      await SpotImage.create({
        "spotId":foundspot.id,url,preview
      },options)
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options,null,{});
  }
};
