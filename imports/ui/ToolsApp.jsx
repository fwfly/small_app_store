import React, {Component, PropTypes} from 'react'

import {GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';

import Dialog from 'material-ui/Dialog';

import {List, ListItem} from 'material-ui/List';

const styles={
  tileStyle:{
    backgroundColor: 'lightblue'
  },

  raisedButton:{
    order:'3'
  },
  actTag:{
    width:'0px',
    height: '0px',
    flex:0
  }
};

const tileContainerStyle = {
  display: 'flex',
  flexDirection:'column',
  height:'inherit'
}

const appTileStyle = {
  textAlign:'center',
  fontWeight: 'bold',
  fontSize:'150%',
  margin: '5px 15px 5px 15px',
  color: 'rgba(0, 0, 0, 0.6)',
  order:'1'
};

const appDesStyle = {
  fontWeight: 'bold',
  margin: '0px 15px 0px 15px',
  color: 'white',
  textOverflow: 'ellipsis',
  overflow:'hidden',
  height:'50%',
  order:'2'
};


const raisedButton = {
  order:'3',
  position: 'absolute',
  left: '0px',
  right: '0px',
  bottom: '0px'
}
 
const listItemStyle = {
  margin: "4px 0px 0px",
  color: "rgba(0, 0, 0, 0.541176)"
}


export default class ToolsApp extends Component {


  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  } 

  handleClose(){
    this.setState({open: false});
  }

  handleOpen(){
    this.setState({open: true});
  };
 
  handleDownload(){
    console.log(this.atag);
    this.atag.click();
  }

  render(){
    var atag = document.createElement("a");
    atag.setAttribute("href", "/dlapp/" + this.props.toolsApp.idx);
    this.atag = atag


    const actions = [
       <RaisedButton
        label="Close"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />
    ];

    return (
        <GridTile
          style={styles.tileStyle}
          key={this.props.toolsApp.idx}
       >
          <Dialog
            title={this.props.toolsApp.name}
            actions={actions}
            model={false}
            open={this.state.open}
            onRequestClose={this.handleClose.bind(this)}
          >
            <List>
               <ListItem>
               <div>
                 Description
               </div>
               <div style={listItemStyle}>
                 {this.props.toolsApp.description}
               </div>
              </ListItem>
              <ListItem
               primaryText="Version"
               secondaryText={this.props.toolsApp.version}
               >
              </ListItem>
              <ListItem
               primaryText="Release Date"
               secondaryText={this.props.toolsApp.mt}
               >
              </ListItem>
              <ListItem
               primaryText="Size"
               secondaryText={this.props.toolsApp.size}
               >
              </ListItem>
              <ListItem
               primaryText="Author"
               secondaryText={this.props.toolsApp.author}
               >
              </ListItem>
 
            </List>
          </Dialog>
          <div style={tileContainerStyle}>
            <div style={appTileStyle}><span>{this.props.toolsApp.name}</span></div>
            <div style={appDesStyle}
              onTouchTap={this.handleOpen.bind(this)}
            >{this.props.toolsApp.description}</div>
            <div style={raisedButton}>
              <RaisedButton label="Download" fullWidth={true}  primary={true} onTouchTap={ this.handleDownload.bind(this) } />
            </div>
         </div>
        </GridTile>
    );
  }
}

ToolsApp.propTypes={
  toolsApp:PropTypes.object.isRequired,
};
