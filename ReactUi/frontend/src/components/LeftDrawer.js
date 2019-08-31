import React, { Component } from 'react'
import { Drawer, Divider } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import note from '../svg_icons/note.svg'
import labeledt from '../svg_icons/label_edit.svg'
import reminder from '../svg_icons/reminder_menu.svg'
import archive from '../svg_icons/archive_menu.svg'
import trash from '../svg_icons/trash.svg'




const myDrawerTheme = createMuiTheme({
    overrides:{
        MuiDrawer:{
            paper:{
                top:65
            }

        }
    }
})

export class LeftDrawer extends Component {

    render() {
        return (
            
                <ThemeProvider theme={myDrawerTheme}>            
            <div>
                {/* <Button onClick={this.leftDfun}>Open Left</Button> */}
                <Drawer 
                    open={this.props.open}
                    anchor="left"
                    variant="persistent"
                    >
                    <div className = "DrawerNote">
                        <img src={note} alt="notesvg"/>
                        <p>Notes</p>
                    </div >

                    <div className = "DrawerNote" >
                        <img src={reminder} alt="remindersvg"/>
                        <p >Reminders</p>
                    </div>

                    <Divider />

                    <div>
                    <p className="labelhead">LABELS</p>
                    </div>

                    <div className = "DrawerNote">
                    <img src={labeledt} alt="labelsvg"/>
                        <p >Edit labels</p>
                    </div>

                    <Divider />

                    <div className="DrawerNote">
                    <img src={archive} alt="labelsvg"/>

                        <p>Archive</p>
                    </div>

                    <Divider />
                    
                    <div className="DrawerNote">
                    <img src={trash} alt="labelsvg"/>

                        <p>Trash</p>
                    </div>

                </Drawer>
            </div>
             </ThemeProvider>
        )
    }
}

export default LeftDrawer
