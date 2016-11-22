import React from 'react'
import {Container,Row,Col}  from 'react-grid-system'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import RaisedButton from 'material-ui/RaisedButton'
import List from './List'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import {teal50} from 'material-ui/styles/colors'
import {arrayMove} from 'react-sortable-hoc';

class Board extends React.Component{
  constructor(){
    super()
    this.state={
      lists : JSON.parse(localStorage.getItem('taskManagerList')) || [],

      dialogOpen : false,
      newListName : null,
      dialogErrorMsg:null
    }
  }

  generateLists(){
    console.log(this.state.lists)
    return this.state.lists.map((list,idx)=>{
        return(
          <Col sm={12} md={3} key={"list"+idx}>
            <List name={list.name}
                  id={list.id}
                  deleteList={this.deleteList}
                  addCardToList={this.addCardToList}
                  cards={list.cards}
                  addCommentCardList={this.addCommentCardList}
                  reOrderCards={this.reOrderCards}
                  deleteCard={this.deleteCard}
                />
          </Col>
        )
    })
  }

  addList= ()=>{

    if(!this.state.newListName){
      this.setState({dialogErrorMsg:"Name cannot be empty."})
      return
    }
    var list={
      id : Date.now(),
      name : this.state.newListName,
      cards:[]
    }
    this.setState({
      lists : this.state.lists.concat(list)
    })
    this.handleDialogClose()
  }

  deleteList =(id) =>{
    var lists=this.state.lists.slice()
    for(let i in lists){
      if(lists[i].id===id){
        lists.splice(i,1)
        this.setState({lists:lists})
        break
      }
    }
  }

  addCardToList =(listId,card)=>{
    var lists=this.state.lists.slice()
    for(let i in lists){
      if(lists[i].id===listId){
        lists[i].cards.push(JSON.parse(JSON.stringify(card)))
        this.setState({lists:lists})
        console.log(this.state.lists)
        break
      }
    }
  }

  addCommentCardList =(listId,cardId,comment) =>{
    console.log(listId,cardId,comment)
    var lists=this.state.lists.slice()
    for(let i in lists){
      if(lists[i].id===listId){
        for(let j in lists[i].cards){
          if(lists[i].cards[j].id==cardId){
            var d=new Date()
            lists[i].cards[j].comments.push(d.toDateString()+" : "+comment)
            this.setState({lists:lists})
            break
          }
        }
      }
    }
  }

  reOrderCards=(listId,pos1,pos2)=>{
    var lists=this.state.lists.slice()
    for(let i in lists){
      if(lists[i].id===listId){
        lists[i].cards=arrayMove(lists[i].cards, pos1, pos2)
        this.setState({lists:lists})
        break
      }
    }
  }

  deleteCard=(listId,cardId)=>{
  var lists=this.state.lists.slice()
    for(let i in lists){
      if(lists[i].id===listId){
        for(let j in lists[i].cards){
          if(cardId==lists[i].cards[j].id){
            lists[i].cards.splice(j,1)
            this.setState({lists:lists})
            break
          }
        }
      }
    }
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
       onTouchTap={this.addList}
     />,
   ]
  }

  handleDialogClose= ()=>this.setState({dialogOpen:false,dialogErrorMsg:null,newListName:null})
  openDialog= ()=>this.setState({dialogOpen:true})
  onChangeNewListName = (e)=> this.setState({newListName:e.target.value})

  render(){
    localStorage.setItem('taskManagerList', JSON.stringify(this.state.lists));
    return(
      <div>
        <Toolbar style={{backgroundColor:teal50}}>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle text="Personal Task Manager" style={{paddingLeft:"30px"}}/>
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton label="Add List" primary={true} onClick={this.openDialog}/>
          </ToolbarGroup>
        </Toolbar>
        <Container fluid={true}>
          <Row>
            {this.generateLists()}
          </Row>
        </Container>

        <Dialog
           title="Add List"
           actions={this.getDialogActions()}
           modal={false}
           open={this.state.dialogOpen}
           onRequestClose={this.handleDialogClose}
         >
          {this.state.dialogErrorMsg && this.state.dialogErrorMsg}
          <br/>
          <TextField
            floatingLabelText="List Name"
            onChange={this.onChangeNewListName}
          /><br />
       </Dialog>
      </div>
    )
  }
}

export default Board
