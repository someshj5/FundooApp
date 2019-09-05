import React, { Component } from 'react'
import NoteItem from './NoteItem';
import Grid from '@material-ui/core/Grid';


export default class NoteSection extends Component {
    render() {
        const notes = this.props.note.map((noteobj) =>(
            <NoteItem key={noteobj.id} noteobj={noteobj}/>
        ))
        return (
            <Grid  
            container 
            justify="space-around" 
            alignContent="center" 
            style={{
                 
                width:750,
                marginTop:100,
                marginLeft:200
                }}>

                {notes}
                
            </Grid>
        )
    }
}
