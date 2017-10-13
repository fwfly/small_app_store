import React, {Component} from 'react';
import ListItem from 'material-ui/List';


export default class ReviewItem extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
             <ListItem>
                <div>
                    {this.props.review.reviewer}
                </div>
                <div>
                    {this.props.review.date}
                </div>
                <div>
                    {this.props.review.message}
                </div>
            </ListItem>
        );
    }
}
