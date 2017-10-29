"use strict";
/****************************************************************************
 *   (c) Copyright 2016 Hewlett Packard Enterprise Development LP
 *   Licensed under the Apache License, Version 2.0 (the "License"); you may
 *   not use this file except in compliance with the License. You may obtain
 *   a copy of the License at
 *           http://www.apache.org/licenses/LICENSE-2.0
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and limitations
 *   under the License.
 *
 * File Name: fileservice.js
 * Project: tools portal
 * Description:  file service is for tools portoal web site. Providing links for user download tools.
 *
 *****************************************************************************/ 
var fs = require('fs');
var os = require("os");
var homedir = os.homedir();

import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Future } from 'fibers/future';
import { AppDB }  from '../imports/api/appDB.js';
import multer from 'multer'


const repoDir =  homedir + "/jenkins_util_repos";
var storage = multer.diskStorage({
        destination: function(req, file, cb){
            cb(null, 'uploads/')
        },
        filename: function(req, file, cb){
            console.log(file)
            cb(null, file.originalname);
        }
    });
var upload = multer({storage: storage});


function IniFileRepo(){
  if(!fs.existsSync(repoDir)) {
    if(!fs.mkdirSync(repoDir)) {
      console.log("Error when creating folder");
    }
  }
}

// handle http file request
const downloadFile = function (params, request, res, next) {
  var urls = request.url.split("/");

  // url will be parsed as ["", "data", "6"]
  var itemidx = Number(urls[2]);
  console.log(itemidx)
  var items = AppDB.find( {idx : itemidx} ).fetch();
  var item = items[0]

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Disposition', "attachment; filename=" + item.name);

  var filepath = repoDir + "/" + item.name;
  var filestream = fs.createReadStream(filepath);
  filestream.pipe(res);
}

const deployApp = function (params, req, res, next){

  var newApp = req.body;

  let items = AppDB.find( {name: newApp['name']} ).fetch();
  console.log(items);
  if( 0 == items.length  ){
    AppDB.insert(newApp);
    console.log("Add an app" + newApp['name']);
  } else {
    AppDB.update({name: newApp['name']}, newApp);
    console.log("Update an app" + newApp['name']);
  }


  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.write("{'success': 'hello' }");
  res.end();
}

const uploadApp = function (params, req, res, next){

    if (req.files !== undefined){
        console.log("File uploading");
    } else {
        console.log("file not found");
        console.log(req.headers);
    }
    res.end();

}

Meteor.startup(() =>{
  //Initial
  IniFileRepo();
});


// http parser to get http body
var bodyParser = Meteor.npmRequire('body-parser');
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.raw());
Picker.middleware(bodyParser.text());
Picker.middleware(bodyParser.urlencoded({extended: false}));
Picker.middleware(upload.any());


// Router download url
Picker.route( '/dlapp/:_id', downloadFile);
Picker.route('/deployApp', deployApp);
Picker.route('/uploadapp', uploadApp);
