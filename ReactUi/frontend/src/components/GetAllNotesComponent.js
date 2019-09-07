// import React, { Component } from 'react'
// import NoteService from '../services/NoteService';
// import NoteSection from './NoteSection';



// const get_NotesAll = new NoteService().getNotesAll
// export default class GetAllNotesComponent extends Component {
//     constructor(props){
//         super(props);
//         this.state = {
//             notes:[]
//         }
//     }
//     componentDidMount(){
//         this.noteGetFunc();
//     }

//     noteGetFunc = e =>{

//         get_NotesAll()
//     .then(res =>{
//         this.setState({
//             notes:res.data.data
//         })
//     })

//     .catch(error =>{
//         console.log("error data", error.response.data)
        
//     })
//     }


//     render() {
//         return (
//             <div>
//                 <NoteSection note={this.state.notes}/>
//             </div>
//         )
//     }
// }
