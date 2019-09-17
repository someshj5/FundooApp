import React, { Component } from 'react'
import { InputBase, ListItemText, ListItemIcon, ListItem } from '@material-ui/core';
import NoteService from '../services/NoteService';
import Delete from '@material-ui/icons/Delete'
import Label from '@material-ui/icons/Label'
import Edit from '@material-ui/icons/Edit'






const LabelDelete = new NoteService().deleteLabel

export default class DialogLabelEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            label:props.label.name,
            labelId:props.label.id,
            isHover:false,
            renameLabel:false,


        }
    }




    handleMouse=()=>{
        this.setState({
            isHover:true
        })
    }

    handleMouseLeave=()=>{
        this.setState({
            isHover:false
        })
    }


    deleteLabel=()=>{

        LabelDelete(this.state.labelId)
        .then(res=>{
            this.props.LabelsGet()
            console.log("delete response", res.data)
        })
        .catch(error=>{
            console.log("error in delete", error.response.data)
        })
    }


    handleOnChange=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }


    handleLblEdit=()=>{


        this.setState({
            renameLabel:true
        })
    }

    render() {
        return (
            <ListItem onMouseEnter={this.handleMouse} onMouseLeave={this.handleMouseLeave} className="DialogNote" id="DialogNote" key={this.props.label.id}>
                {this.state.isHover 
                    ? <ListItemIcon><Delete onClick={this.deleteLabel}/></ListItemIcon>
                    : <ListItemIcon><Label/></ListItemIcon>
                }

                <div className="DgEditLabel" >

                    {this.state.renameLabel ? <InputBase
                                                className="InputDgLbl"
                                                name="label"
                                                defaultValue={this.state.label}
                                                onChange={this.handleOnChange}
                                                
                                                />
                                               
                                                
                        :<ListItemText>{this.props.label.name}</ListItemText>
                    
                    }
                    <div className="DgEdit">
                      <ListItemIcon onClick={this.handleLblEdit}><Edit/></ListItemIcon>
                      </div>
                </div>
            </ListItem>
        )
    }
}
