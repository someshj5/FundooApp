import React, { Component } from 'react'
import collaboratorIcon from '../svg_icons/collaborator.svg'
import PersonAdd from "@material-ui/icons/PersonAdd"
import Done from "@material-ui/icons/Done"

import { Dialog, DialogContent, DialogTitle, DialogActions, Divider, InputBase, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';


export default class CollaboratorComponent extends Component {
    constructor(){
        super();
        this.state={
            Dopen:false,
            isRename:false
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
                                    onClick={this.handleAddCollab}
                                    style={{width:"110%"}}
                                    placeholder="Person or email to share with"/> 
                                </ListItemText>
                                <ListItemIcon style={{marginLeft:34}}><Done/></ListItemIcon>
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
