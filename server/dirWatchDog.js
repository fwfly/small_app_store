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
 * File Name: dirWatchDog.js
 * Project: tools portal
 * Description:  Monitor a directory and send notify if any change.
 *
 *****************************************************************************/

var fs = require('fs');

var oberserverLst = [];
function Notify(filename){
  oberserverLst.forEach(function(entry){
    entry.update(filename);
  });
}

function AddObserver(observer){
  oberserverLst.push(observer);
}

function StartMonitor(dir) {

  var lastEvent="";
  var action="";

  var watchSync = Meteor.wrapAsync(fs.watch, fs);  
  watchSync(dir, function(eventType, filename){
    if ("rename" == eventType ) {
      if( fs.existsSync(dir + "/" + filename)){
        action ="add";
      } else {
        action = "remove";
      } 
    } else if ("change" == eventType) {
        action = "modify";
    }

    if( "" == lastEvent ){
      if( "remove" != action ){
        lastEvent = eventType;
        action="";
      }
       //Notify(filename);
       var syncWapper = Meteor.wrapAsync(Notify);
        syncWapper(filename);
 
    } else {
      lastEvent = "";
      action="";
    }
 
  });  
}

function DirWatchDog() {
   return {
      StartMonitor : StartMonitor,
      AddObserver : AddObserver
   };
};

export {DirWatchDog};
