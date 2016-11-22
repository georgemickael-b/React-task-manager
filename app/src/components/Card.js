import React from 'react'
import {Card as CardUI, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField'
import {Container,Row,Col}  from 'react-grid-system'
import IconButton from 'material-ui/IconButton'
import CommentIcon from 'material-ui/svg-icons/communication/comment'
import {teal50} from 'material-ui/styles/colors'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton';



class Card extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      newComment : '',
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleNewCommentChange =(e)=>{
    this.setState({newComment:e.target.value})
    console.log(this.state.newComment)
  }

  addComment=()=>{
    if(this.state.newComment=='')
      return
    this.props.addCommentCard(this.props.id,this.state.newComment)
    this.setState({newComment:''})
  }

  deleteCard=()=>{
      this.props.deleteCard(this.props.id)
  }

  generateComments= ()=>{
    return this.props.comments.map((comment,idx)=>{
      return(
        <li key={"comment"+idx}>
          {comment}
        </li>
      )
    })
  }
  render() {
    return (
      <CardUI expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title={<div style={{fontSize:16}}>{this.props.name}</div>}
          actAsExpander={true}
          showExpandableButton={true}
          style={{backgroundColor:teal50}}
        />
        <CardText expandable={true}>
          <div style={{fontSize:16}}>{this.props.desc}</div>
          <br />
          <div>Comments : </div>
          <ul>
            {this.generateComments()}
          </ul>
          <div>
              <TextField
                floatingLabelText="New Comment"
                multiLine={true}
                fullWidth={true}
                onChange={this.handleNewCommentChange}
                value={this.state.newComment}
              />
              <FlatButton primary={true} label="Add Comment" onClick={this.addComment} style={{width:"100%"}}/>
          </div>
          <br/>
            <RaisedButton label="Delete this Card" secondary={true}  onClick={this.deleteCard} style={{width:"100%"}}/>
        </CardText>
      </CardUI>
    );
  }
}

export default Card
