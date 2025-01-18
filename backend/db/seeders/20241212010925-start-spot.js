'use strict';

const { Spot, User } = require('../models');
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotData = [
  {
    // ownerId:1,
    userName: 'Demo-lition',
    address:'mars',
    city:'mars_x',
    state:'CA',
    country:'Mars',
    lat:36,
    lng:-121,
    name:'mars hotel',
    description:'transportion is excluded',
    price:150
  },
  {
    // ownerId:1,
    userName: 'Demo-lition',
    address:'1111 Apt-A',
    city:'Los Angeles',
    state:'CA',
    country:'US',
    lat:35,
    lng:-120,
    name:'Apartment Suite',
    description:'transportion is excluded',
    price:95
  },
  {
    // ownerId:1,
    userName: 'Demo-lition',
    address:'1112 St.',
    city:'Los Angeles',
    state:'CA',
    country:'US',
    lat:34,
    lng:-119,
    name:'Condo House',
    description:'transportion is excluded',
    price:95
  },
  {
    // ownerId:1,
    userName: 'FakeUser2',
    address:'3333 BBQ Spot Park',
    city:'Austin',
    state:'TX',
    country:'US',
    lat:30,
    lng:-110,
    name:'Spot for BBQ',
    description:'transportion is excluded',
    price:200
  },
  {
    // ownerId:1,
    userName: 'FakeUser2',
    address:'1113 St.',
    city:'New York City',
    state:'NY',
    country:'US',
    lat:40,
    lng:-130,
    name:'Full House',
    description:'transportion is excluded',
    price:350
  },
  {
    // ownerId:2,
    userName: 'FakeUser1',
    address:'moon',
    city:'moon_x',
    state:'CA',
    country:'Moon',
    lat:37,
    lng:-122,
    name:'moon hotel',
    description:'transportion is excluded',
    price:150
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
  //  await Spot.bulkCreate(spotData,{validate:true})
    for(let spotsingle of spotData){
      const {address,city,state,country,lat,lng, name,description,price} = spotsingle;
      const founduser = await User.findOne({
        where :{
          username : spotsingle.userName
        }
      });
      await Spot.create({
        address,city,state,country,lat,lng, name,description,price,'ownerId':founduser.id
      },options)
    }
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
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
