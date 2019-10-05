import React, { Component } from 'react'
import collaboratorIcon from '../svg_icons/collaborator.svg'
import PersonAdd from "@material-ui/icons/PersonAdd"
import Done from "@material-ui/icons/Done"

import { Dialog, DialogContent, DialogTitle, DialogActions, Divider, InputBase, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import NoteService from '../services/NoteService';


const ColaboratorAdd = new NoteService().collaborator
const collaboratorGets = new NoteService().collaboratorGet

export default class CollaboratorComponent extends Component {
    constructor(props) {
        super(props);
        this.items=["sonu",'Monu','Gomu']
        this.state = {
            Dopen: false,
            isRename: false,
            collabid: null,
            id: props.id,
            collablist: [],
            suggestions: [],
            items:["sonu",'Monu','Gomu'],
            collabResponse:null
        }
    }

    componentDidMount() {
        this.getAllCollaborators();
        // this.props.noteGetFunc();
        

    }


    handleDialog = () => {
        this.setState({
            Dopen: true
        })
        this.getAllCollaborators()
    }

    handleDialogClose = () => {
        this.setState({
            Dopen: false,
            isRename: false
        })
        this.props.noteGetFunc()
    }

    handleAddCollab = () => {
        this.setState({
            isRename: true

        })
    }


    handleCollabchange = (event) => {
        this.setState({
            collabid: event.target.value

        })
        console.log("------------------",this.state.collabid)
        const value = event.target.value
        let suggestions =[]
        let emails = []
        this.state.collablist.map((obj)=>{
            emails.push(obj.email)
        })
        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'i')
            suggestions = emails.sort().filter(v=> regex.test(v))
        }
        
        this.setState(()=>({ suggestions }))
        console.log("suggestionF", this.state.suggestions)



    }

    renderSuggestions(){
        const suggestions = this.state.suggestions;
        // if (suggestions.length === 0){
        //     return null
        // }
        return(

            <ul >
                {suggestions.map((item)=><li style={{listStyleType:"none"}}>{item}</li>)}
            </ul>
        )
    }

    getAllCollaborators = () => {
        collaboratorGets()
            .then(res => {
                this.setState({
                    collablist: res.data.data,
                    collabResponse:res.data.message

                })
                console.log("collaborator list", this.state.collablist)

            })
            .catch(error => {
                console.log("collaborator list error ", error.response)
            })
    }

    Collabnote = () => {
        let updateData = {
            "email": this.state.collabid
        }

        ColaboratorAdd(updateData, this.props.id)
            .then(res => {
                console.log("after colaboratorAdded", res.data)
            })
            .catch(error => {
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
                            width: "90%",
                            height: "auto"
                        }
                    }}

                >
                    <DialogTitle>
                        <h5>Collaborators</h5>
                        <Divider />
                    </DialogTitle>

                    <DialogContent>
                        <ListItem>
                            <span>
                                <ListItemIcon><PersonAdd /></ListItemIcon></span>
                            <span>
                                <ListItemText>
                                    {this.state.isRename ?
                                        <ListItem>
                                            <ListItemText>
                                                <InputBase
                                                    id='collabid'
                                                    onChange={this.handleCollabchange}
                                                    onClick={this.handleAddCollab}
                                                    style={{ width: "110%" }}
                                                    placeholder="Person or email to share with" />
                                            </ListItemText>
                                            

                                            <ListItemIcon style={{ marginLeft: 34 }}><Done onClick={this.Collabnote} /></ListItemIcon>
                                            
                                        </ListItem> :
                                        <InputBase
                                            onClick={this.handleAddCollab}
                                            style={{ width: "110%" }}
                                            placeholder="Person or email to share with" />
                                    }
                                    

                                    
                                    {/* <Suggestions results={this.state.collablist} /> */}

                                </ListItemText>
                                <div style={{position:"absolute", height:50}}>{this.renderSuggestions()}</div>
                            </span>
                            <p style={{color:"red"}}>{this.state.collabResponse}</p>

                        </ListItem>
                    </DialogContent>
                    <DialogActions>
                        <p onClick={this.handleDialogClose}>Cancel</p>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
