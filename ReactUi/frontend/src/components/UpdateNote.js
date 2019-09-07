import React, { Component } from 'react'
import NoteService from '../services/NoteService';



const UpdateNote = new NoteService().updateANote

export default class UpdateNote extends Component {
    constructor(){
        super();
        this.state={
            
        }

    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
