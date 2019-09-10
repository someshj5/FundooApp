import React, { Component } from 'react'
import archiveIcon from '../svg_icons/archive.svg'




export default class ArchiveComponent extends Component {
    constructor(props){
        super(props);
        this.state={
            is_archive:null,
            id : props.noteobj.id,
            label: props.label,
            collaborator: props.collaborator,
        }
    }

    UpdateArchive=()=>{
        

    }
    render() {
        return (
            <div>
                <img  onClick={this.UpdateArchive}src={archiveIcon} alt="archiveIcon" />
            </div>
        )
    }
}
