import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import '../App.css'
import keep_icon from '../svg_icons/keep_icon.png'
import LeftDrawer from './LeftDrawer'
import Redirect from 'react-router-dom/Redirect'
import GetAllNotesComponent from './GetAllNotesComponent';
import MenuComponent from './MenuComponent';
import AddNoteComponent from './AddNoteComponent';



export class DashboardComponent extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            anchorEl: null,
            menuOpen: false,
            redirect:false
        }
        this.leftDfun = this.leftDfun.bind(this)
    }

    componentDidMount(){
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

    render() {

        if(this.state.redirect){
            return (<Redirect to={'/login'}/>)
        }

        return (
            <div className='root' id="main">
                <AppBar position="static" color="default">

                    <Toolbar className='ToolBar' >

                        <IconButton edge="start" color="" aria-label="menu" >
                            <MenuIcon onClick={this.leftDfun} />
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
                                className="InputBase"
                                placeholder="Search" />

                            <div className='searchIcon'>
                                <SearchIcon />
                            </div>

                        </div>
                        
                        <MenuComponent />

                    </Toolbar>
                </AppBar>
                <LeftDrawer open={this.state.open} />
                <AddNoteComponent/>
                <GetAllNotesComponent/>
            </div>
        )           
    }
}

export default DashboardComponent


