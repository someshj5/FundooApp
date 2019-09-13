import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import '../App.css'
import keep_icon from '../svg_icons/keep_icon.png'
import listView from '../svg_icons/listview.svg'
import gridView from '../svg_icons/gridview.svg'


import LeftDrawer from './LeftDrawer'
import Redirect from 'react-router-dom/Redirect'
// import GetAllNotesComponent from './GetAllNotesComponent';
import MenuComponent from './MenuComponent';
import AddNoteComponent from './AddNoteComponent';
import NoteSection from './NoteSection';
import NoteService from '../services/NoteService';



const get_NotesAll = new NoteService().getNotesAll
const getArchiveNotes = new NoteService().getArchives
const getTrashNotes = new NoteService().getTrash
const getReminderNotes = new NoteService().getReminders




export class DashboardComponent extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            list:false,
            anchorEl: null,
            menuOpen: false,
            redirect:false,
            notes:[],
            labels:[],

        }
        this.leftDfun = this.leftDfun.bind(this)
    }

    componentDidMount(){
        this.noteGetFunc();

        if (sessionStorage.getItem('userdata')){
            console.log("call user feed")
        }
        else{
            this.setState({redirect:true})
        }
    }

    leftDfun = event => {
        this.setState({
            open: !this.state.open
        })
    }

    signOut=()=>{
        this.setState({redirect:true})
    }



    noteGetFunc = e =>{
    get_NotesAll()
    .then(res =>{
        this.setState({
            notes:res.data.data
        })
    })

    .catch(error =>{
        console.log("error data", error.response.data)
        
    })
    }


    ArchiveGet=()=>{
        this.setState({notes:[]})
        console.log("notes",this.state.notes);
        
        getArchiveNotes()
        .then(res=>{
            this.setState({notes:res.data})
        })
        .catch(error=>{
            console.log("error archive ", error.response)
        })
    }

    TrashGet=()=>{
        this.setState({notes:[]})
        getTrashNotes()
        .then(res=>{
            this.setState({notes:res.data})
        })
        .catch(error=>{
            console.log("error trash ", error.response)
        })
    }

    ReminderGet=()=>{
        this.setState({notes:[]})
        getReminderNotes()
        .then(res=>{
            this.setState({notes:res.data})
        })
        .catch(error=>{
            console.log("error reminderget ", error.response)

        })
        
    }

    handleView=()=>{
        this.setState({
            list:!this.state.list
        })
    }


    render() {

        if(this.state.redirect){
            return (<Redirect to={'/login'}/>)
        }

        let viewIcon = listView

        if (this.state.list){
            viewIcon= gridView
        }


        return (
            <div className='root' id="main">
                <AppBar position="fixed" color="default">

                    <Toolbar className='ToolBar' >

                        <IconButton  onClick={this.leftDfun} edge="start" color="inherit" aria-label="menu" >
                            <MenuIcon  />
                        </IconButton>

                        <div className='imgFundoo'>
                            <div>
                                <img src={keep_icon} alt='keep_icon'></img>
                            </div>
                            <div className='icon'>
                                <p>fundooNotes</p>
                            </div>
                        </div>

                        <div className='search'>
                            <InputBase
                            style={{width:390}}
                                className="InputBase"
                                placeholder="Search" />

                            <div className='searchIcon'>
                                <SearchIcon />
                            </div>

                        </div>
                        <div onClick={this.handleView} className="listviewIcon"><img src={viewIcon} alt="listicon"/></div>

                        <div><MenuComponent signOut={this.signOut} /></div>
                    </Toolbar>

                   
                </AppBar>
                <LeftDrawer ReminderGet={this.ReminderGet} noteGetFunc={this.noteGetFunc} TrashGet={this.TrashGet} ArchiveGet={this.ArchiveGet} open={this.state.open} ClickSec={this.ClickSec}/>
                <AddNoteComponent noteGetFunc={this.noteGetFunc} />
                <NoteSection ReminderGet={this.ReminderGet} TrashGet={this.TrashGet}  ArchiveGet={this.ArchiveGet} noteGetFunc={this.noteGetFunc} note={this.state.notes} labels={this.state.labels}/>

            </div>
        )           
    }
}

export default DashboardComponent


