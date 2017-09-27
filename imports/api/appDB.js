import { Mongo } from 'meteor/mongo';

console.log("AppDB");
export const AppDB = new Mongo.Collection('AppDB');
