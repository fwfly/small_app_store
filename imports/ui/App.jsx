import React, { Component, PropTypes } from 'react';
import {createContainer } from 'meteor/react-meteor-data';
import { AppDB } from '../api/appDB.js'
import ToolsApp from './ToolsApp.jsx';

import AppBar from 'material-ui/AppBar';
import GridList from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';

const styles={
  gridList:{
    width:500,
    overflowY:'auto'
  },

  tileStyle:{
    backgroundColor: 'lightblue',
    flex:1,
    margin:'-1px'
  },

  raisedButton:{
    flex:1
  },
  actTag:{
    width:'0px',
    height: '0px',
    flex:0
  }
};



class App extends Component{

  renderToolsApps(){
    return this.props.toolsApps.map((toolsApp)=>(
      <ToolsApp
       key={toolsApp._id}
       toolsApp={toolsApp}/>
    ));
  }

  render(){
    const styles = {

      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList : {
        width: 500,
        height: 450,
        overflowY: 'auto',
      }
    }

    return (
      <div>
      <AppBar
        title="Tools Portal"
        iconClassNameRight="muidocs-icon-navigation-expand-more" 
      />
      <div style={styles.root}>
        <Subheader>Download apps you want.</Subheader>  
        <GridList
           cellHeight={180}
           style={styles.gridList}
        >
          {this.renderToolsApps()}
        </GridList>
      </div>
      </div>
    );
  }
}

App.propTypes = {
  toolsApps: PropTypes.array.isRequired, 
};

export default createContainer(() =>{
  return {
    toolsApps: AppDB.find({}).fetch(),
  };
},App);

