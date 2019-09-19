import React, { Component } from 'react'
import moreIcon from '../svg_icons/more.svg'
import { Menu, MenuItem, InputBase, Checkbox } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import NoteService from '../services/NoteService';



const TrashAnote = new NoteService().updateANote
const GetLabel = new NoteService().getLabels
const LabelCreate = new NoteService().createLabel



export default class MoreIconComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            label: props.label,
            collaborator: props.collaborator,
            menuOpen: false,
            labelMenu: false,
            anchorEl: null,
            is_Trash: false,
            toggleLabelMenu: false,
            labels: []


        }
    }


    LabelsGet = () => {
        GetLabel()
            .then(res => {
                this.setState({
                    labels: res.data
                })
                console.log("labels", res.data)
            })

            .catch(error => {
                console.log("error labelsget", error.response.data)
            })



    }

    handleMenu = (e) => {
        this.setState({
            menuOpen: true,
            anchorEl: e.target
        })
    }

    handleClose = e => {
        this.setState({
            toggleLabelMenu: false,
            menuOpen: !this.state.menuOpen,
            anchorEl: this.state.anchorEl
        })
    }



    TrashNote = () => {
        this.setState({
            is_Trash: true
        })

        let UpdateData = {
            "is_Trash": true,
            "label": this.state.label,
            "collaborator": this.state.collaborator
        }
        TrashAnote(UpdateData, this.state.id)

            .then(res => {
                console.log("is_trash update", res)
                this.props.noteGetFunc()
            })
            .catch(error => {
                console.log("error in is_trash", error)
            })


    }

    AddlabelMenu = (e) => {
        GetLabel()
            .then(res => {
                this.setState({
                    labels: res.data,
                    toggleLabelMenu: !this.state.toggleLabelMenu
                })
                console.log("labels", res.data)
            })

            .catch(error => {
                console.log("error labelsget", error.response.data)
            })
    }

    handleOnchange=(event)=>{
        this.setState({
            [event.target.name] :event.target.value
        })
        console.log("===>", this.state)
    }
    if
    CreateLabel=()=>{
        let Labeldata={
            "name": this.state.label,
            "user":sessionStorage.getItem("userid")
        }
        LabelCreate(Labeldata)
        .then(res=>{
            
            this.LabelsGet()
            console.log("Label created", res.data)
        })
        .catch(error=>{
            console.log("error label", error.response.data)
        })
    }




    render() {
        let MenuLabelS = "none"
        let MenuLabelF = "block"
        if (this.state.toggleLabelMenu) {
            MenuLabelF = "none"
            MenuLabelS = "block"
        }


        const labelMap = this.state.labels.map((label) => {
            return <MenuItem  key={label.id} >
            <Checkbox
                        
            onChange={this.handleLabel}
            color="default"
            />
            {label.name}
            </MenuItem>

        })

        return (
            <div>
                <img onClick={this.handleMenu} aria-controls="Moremenu" src={moreIcon} alt="moreIcon" />

                <Menu
                    id="Moremenu"
                    onClose={this.handleClose}
                    anchorEl={this.state.anchorEl}
                    open={this.state.menuOpen}>
                    <div style={{ display: MenuLabelF }}>
                        <MenuItem id="MenuItem" ><p onClick={this.TrashNote}>Delete Note</p></MenuItem>
                        <MenuItem id="MenuItem" >

                            <p onClick={this.AddlabelMenu}>
                                Add label
                        </p>
                        </MenuItem >
                    </div>


                    <div style={{ display: MenuLabelS , height:200}} className="labelsMenuItem">


                        <div >
                            <InputBase
                            name="label"
                            onChange={this.handleOnchange}
                                style={{ width: "75%" }}
                                placeholder="Enter label name"
                                className="LabelInputBase"
                            />
                            <span className="labelAddIcon"><AddIcon onClick={this.CreateLabel}/></span>
                        </div>
                        {labelMap}
                    </div>
                </Menu>
            </div>
        )
    }
} 