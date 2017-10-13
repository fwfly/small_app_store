import React, {Component} from "react"
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


export default class ReviewBoard extends Component{

    constructor(props){
        super(props);
        this.state = {
            newReviewer : {
                auther: "",
                message: ""
            }
        }
    }

    handleSubmit(){
        console.log(this.state.newReviewer)
        // meteor.call(submitmsg)
    }

    onChangeAuther(event){
        var newState = this.state;
        newState.newReviewer.auther = event.target.value;

        this.setState(newState);
    }

    onChangeMsg(event){
        var newState = this.state;
        newState.newReviewer.message = event.target.value;

        this.setState(newState);
    }


    render(){
        return(
            <div className="reviewBoard">
                <div className="write_message">
                    <TextField
                        id="text-auther"
                        onChange={this.onChangeAuther.bind(this)}
                        value={this.state.newReviewer.auther}
                    /><br/>
                    <TextField
                        id="text-message"
                        onChange={this.onChangeMsg.bind(this)}
                        value={this.state.newReviewer.message}/><br/>
                    <FlatButton 
                        label="submit" 
                        primary={true}
                        onTouchTap={ this.handleSubmit.bind(this)}
                    />
                </div>
                <div className="reviewlist">
                   list all message here
                </div>
            </div>
        );
    }
}
