import React, { Component } from 'react'
import NoteItem from './NoteItem';
import Grid from '@material-ui/core/Grid';


export default class NoteSection extends Component {
    constructor(){
        super();
        this.state={
            id:null
        }
    }


    render() {
        const notes = this.props.note.map((noteobj) =>(
            <NoteItem layout={this.props.layout} ReminderGet={this.props.ReminderGet} TrashGet={this.props.TrashGet} ArchiveGet={this.props.ArchiveGet} labels={this.props.labels} noteGetFunc={this.props.noteGetFunc} key={noteobj.id} noteobj={noteobj}/>
        ))
        return (
            <Grid  
            container 
            justify="space-around" 
            alignContent="center" 
            style={{
                width:850,
                marginTop:100,
                marginLeft:250
                }}>

                {notes}
                
            </Grid>
        )
    }
}
