import React, { Component } from 'react'
import { InputBase, ListItemText, ListItemIcon, ListItem } from '@material-ui/core';
import NoteService from '../services/NoteService';
import Delete from '@material-ui/icons/Delete'
import Label from '@material-ui/icons/Label'
import Edit from '@material-ui/icons/Edit'
import Done from '@material-ui/icons/Done'







const LabelDelete = new NoteService().deleteLabel
const LabelEdit = new NoteService().editLabel

export default class DialogLabelEdit extends Component {
    constructor(props){
        super(props);
        this.state={
            labelname:props.label.name,
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
        console.log("===>", this.state.labelname)
    }


    handleLblEdit=()=>{
        this.setState({
            renameLabel:true
        })
    }


    handleEditLabel=(event)=>{
        let updateData={
            "name": this.state.labelname
        }

        LabelEdit(updateData,this.props.label.id)
        .then(res=>{
            console.log("after label renamed", res.data)
        })

        .catch(error=>{
            console.log("error edit label", error.response)
        })


    }

    render() {
        return (
            <ListItem onMouseEnter={this.handleMouse}
             onMouseLeave={this.handleMouseLeave} 
             className="DialogNote" id="DialogNote" key={this.props.label.id}>
                {this.state.isHover 
                    ? <ListItemIcon><Delete onClick={this.deleteLabel}/></ListItemIcon>
                    : <ListItemIcon><Label/></ListItemIcon>
                }

                <div className="DgEditLabel" >

                    {this.state.renameLabel ?<ListItem>
                                                <ListItemText>
                                                    <InputBase
                                                    className="InputDgLbl"
                                                    name="labelname"
                                                    defaultValue={this.state.labelname}
                                                    onChange={this.handleOnChange}
                                                    
                                                    />
                                                </ListItemText>
                                                <ListItemIcon className="DgEdit">
                                                    <Done onClick={this.handleEditLabel}/>
                                                </ListItemIcon>
                                            </ListItem> 
                                               
                                                
                                            :<ListItem><ListItemText>{this.props.label.name}</ListItemText>
                                                <ListItemIcon className="DgEdit" onClick={this.handleLblEdit}><Edit/></ListItemIcon>
                                            </ListItem>
                    
                    }
                   
                </div>
            </ListItem>
        )
    }
}
