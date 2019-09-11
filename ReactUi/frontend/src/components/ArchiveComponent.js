import React, { Component } from 'react'
import archiveIcon from '../svg_icons/archive.svg'
import NoteService from '../services/NoteService';


const ArchiveAnote = new NoteService().updateANote

export default class ArchiveComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            is_archive:null,
            id : props.id,
            label: props.label,
            collaborator: props.collaborator,
        }
    }

    UpdateArchive=()=>{
        this.setState({
            is_archive: true
        })
        let UpdateData ={
            "is_archive":this.state.is_archive,
            "label": this.state.label,
            "collaborator": this.state.collaborator
        }
        ArchiveAnote(UpdateData, this.state.id)

        .then(res=>{
            console.log("archive update", res)
            this.props.noteGetFunc()
        })
        .catch(error=>{
            console.log("error in archiving", error)
        })
    }



    render() {
        return (
            <div>
                <img  onClick={this.UpdateArchive}src={archiveIcon} alt="archiveIcon" />
            </div>
        )
    }
}
