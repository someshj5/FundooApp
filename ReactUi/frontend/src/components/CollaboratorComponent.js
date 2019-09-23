import React, { Component } from 'react'
import collaboratorIcon from '../svg_icons/collaborator.svg'
import PersonAdd from "@material-ui/icons/PersonAdd"
import Done from "@material-ui/icons/Done"

import { Dialog, DialogContent, DialogTitle, DialogActions, Divider, InputBase, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import NoteService from '../services/NoteService';


const ColaboratorAdd = new NoteService().collaborator

export default class CollaboratorComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            Dopen:false,
            isRename:false,
            collabid:null,
            id:props.id
        }
    }




    handleDialog=()=>{
        this.setState({
            Dopen:true
        })
    }

    handleDialogClose=()=>{
        this.setState({
            Dopen:false,
            isRename:false
        })
    }

    handleAddCollab=()=>{
        this.setState({
            isRename:true

        })
    }


    handleCollabchange=(event)=>{
        this.setState({
            collabid:event.target.value
        })
        console.log("collabid",this.state.collabid)
    }

    Collabnote=()=>{
        let updateData={
            "email":this.state.collabid
        }

        ColaboratorAdd(updateData,this.props.id)
        .then(res=>{
            console.log("after colaboratorAdded", res.data)
        })
        .catch(error=>{
            console.log("error colaaboratorAdd", error.response.data)
        })

    }


    render() {
        return (
            <div>
                 <div><img onClick={this.handleDialog} src={collaboratorIcon} alt="collaboratorIcon" /></div>

                 <Dialog
                 open={this.state.Dopen}
                 className="dialogbox"
                 PaperProps={{
                     style: {
                        //  background: this.state.color,
                         width: "90%",
                         height: "auto"
                     }
                 }}
                 
                 >
                     <DialogTitle>
                         <h5>Collaborators</h5>
                         <Divider/>
                     </DialogTitle>

                     <DialogContent>
                         <ListItem>
                             <span>
                             <ListItemIcon><PersonAdd/></ListItemIcon></span>
                             <span>
                             <ListItemText>
                                 {this.state.isRename ?
                                 <ListItem>
                                  <ListItemText>  
                                 <InputBase
                                 id='collabid'
                                 onChange={this.handleCollabchange}
                                    onClick={this.handleAddCollab}
                                    style={{width:"110%"}}
                                    placeholder="Person or email to share with"/> 
                                </ListItemText>
                                <ListItemIcon style={{marginLeft:34}}><Done onClick={this.Collabnote}/></ListItemIcon>
                                </ListItem> :  
                                <InputBase
                                onClick={this.handleAddCollab}
                                style={{width:"110%"}}
                                placeholder="Person or email to share with"/>
                                }
                             
                               
                             </ListItemText>
                             </span>
                             

                           
                            
                           
                         </ListItem>

                      

                     </DialogContent>
                     <DialogActions>
                     <p onClick={this.handleDialogClose}>Cancel</p>
                        <p>Save</p>
                     </DialogActions>
                 </Dialog>
            </div>
        )
    }
}
