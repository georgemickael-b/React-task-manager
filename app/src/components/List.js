import React from 'react'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import AddIcon from 'material-ui/svg-icons/content/add'
import DeleteIcon from 'material-ui/svg-icons/action/delete'
import {List as ListUI,ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import Dialog from 'material-ui/Dialog'
import Card from './Card'
import SortableComponent from './SortableComponent'


class List extends React.Component{
  constructor(){
    super()
    this.state={
      dialogOpen : false,
      newCardName:null,
      newCardDesc : null,
      dialogErrorMsg :null
    }
  }
  deleteList(id){
    this.props.deleteList(id)
  }

  generateCards=()=>{
    var cards=this.props.cards
    var cardsList=[]
    for(let i in cards){
      let card=cards[i]
      let item=<div>
                <Card
                  name={card.name}
                  desc={card.desc}
                  key={"card"+i}
                  addCommentCard={this.addCommentCard}
                  comments={card.comments}
                  id={card.id}
                  deleteCard={this.deleteCard}
                />
                <br/>
              </div>
      cardsList.push(item)
    }
    console.log(cardsList)
    return cardsList
  }

  addCard = ()=>{
    if(!this.state.newCardName){
      this.setState({dialogErrorMsg:"Name of the card cannot be empty."})
      return
    }
    var card={
      id : Date.now(),
      name : this.state.newCardName,
      desc : this.state.newCardDesc,
      comments :[]
    }
    this.props.addCardToList(this.props.id,card)
    this.handleDialogClose()
  }

  deleteCard=(cardId)=>{
    this.props.deleteCard(this.props.id,cardId)
  }

  addCommentCard =(cardId,comment) =>{
    this.props.addCommentCardList(this.props.id,cardId,comment)
    console.log("inCommentCard")
  }

  getDialogActions= ()=>{
    return [
     <FlatButton
       label="Cancel"
       primary={true}
       onTouchTap={this.handleDialogClose}
     />,
     <FlatButton
       label="Submit"
       primary={true}
       keyboardFocused={true}
       onTouchTap={this.addCard}
     />,
   ]
  }
  handleDialogClose= ()=>this.setState({dialogOpen:false,newCardName:null,newCardDesc:null,dialogErrorMsg:null})
  openDialog= ()=>this.setState({dialogOpen:true})
  onChangeNewCardName = (e)=> this.setState({newCardName:e.target.value})
  onChangeNewCardDesc = (e)=> this.setState({newCardDesc:e.target.value})

  reOrderCards =(pos1,pos2)=>{
    this.props.reOrderCards(this.props.id,pos1,pos2)
  }
  render(){
    return(
      <div>
        <Paper zDepth={1} style={{padding:10,marginTop:10}}>
          <ListItem
            primaryText={this.props.name}
            disabled={true}
            rightIconButton={
              <div>
                <IconButton onClick={this.openDialog}><AddIcon /></IconButton>
                <IconButton onClick={this.deleteList.bind(this,this.props.id)}><DeleteIcon /></IconButton>
              </div>
            }
           />
          <Divider />
          <br/>
          <SortableComponent items={this.generateCards()} reOrderItems={this.reOrderCards}/>

        </Paper>

        <Dialog
           title="Add Card"
           actions={this.getDialogActions()}
           modal={false}
           open={this.state.dialogOpen}
           onRequestClose={this.handleDialogClose}
         >
          {this.state.dialogErrorMsg && this.state.dialogErrorMsg}
          <br/>
          <TextField
            floatingLabelText="Card Name"
            onChange={this.onChangeNewCardName}
          /><br />
          <TextField
            floatingLabelText="Description"
            onChange={this.onChangeNewCardDesc}
            multiLine={true}
          /><br />
       </Dialog>
     </div>
    )
  }
}

export default List
