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
import { DirWatchDog } from './dirWatchDog.js'; 
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Future } from 'fibers/future';
import { AppDB }  from '../imports/api/appDB.js';

const testDB = new Mongo.Collection('testdb');
var repoDir="/home/kenny/jenkins_util_repos";


function IniFileRepo(){
  if(!fs.existsSync(repoDir)) {
    if(!fs.mkdirSync(repoDir)) {
      console.log("Error when creating folder");
    }
  } 
}

// Update File List
// scaning repository folder and creating file list. 
function updateFileDB(path){
    try{

      var dbobj = {
        name: "none",
        idx: -1,
        mt: "none",
        description: "none",
        version:"0.0.0",
        author:"unknow",
        size:"unknow"
      };

      //Clear DB
      AppDB.remove({});
      var files = fs.readdirSync(path);
      var id = 0;
      files.forEach(file => {
        var filepath = path + "/" + file;

        var syncStat = Meteor.wrapAsync(fs.lstat, fs);
        syncStat(filepath, function(err, stats){
          if(stats.isFile()) {
            id = id+1;

            dbobj.name = file;
            dbobj.idx = id;
            dbobj.description = file + " Grammarly's free writing app makes sure everything you type is easy to read, effective, and mistake-free. \nAdding Grammarly to Chrome means that your spelling and grammar will be vetted on Gmail, Facebook, Twitter, Linkedin, Tumblr, and nearly ";
            dbobj.author = file + ", Cool"
            dbobj.version="1.0.0"
            // Get file size  and time.

            AppDB.insert(dbobj);
          }
        });
      });
 
    } catch (err) {
      if( 'ENOENT' === err.code ) {
        console.log('Folder not found');
      } else {
        throw err;
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


Meteor.startup(() =>{
  //Initial
  IniFileRepo();
  updateFileDB(repoDir);

  var dirWatchDog = DirWatchDog();
  var fileServiceObj = {};
  fileServiceObj.reporDir = repoDir;

  fileServiceObj.update = function(filename){
    updateFileDB(repoDir);
  };

  dirWatchDog.AddObserver(fileServiceObj);
  dirWatchDog.StartMonitor(repoDir);
  console.log("\nFile service is running");
});


const deployApp = function (params, req, res, next){

  console.log(req.body);
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8',
  });
  res.write("{'success': 'hello' }");
  res.end();
}
  

// http parser to get http body
var bodyParser = Meteor.npmRequire('body-parser');
Picker.middleware(bodyParser.json());
Picker.middleware(bodyParser.raw());
Picker.middleware(bodyParser.text());
Picker.middleware(bodyParser.urlencoded({extended: false}));


// Router download url
Picker.route( '/dlapp/:_id', downloadFile);
Picker.route('/deployApp', deployApp);