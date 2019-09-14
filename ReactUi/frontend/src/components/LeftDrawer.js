import React, { Component } from 'react'
import { Drawer, Divider, Dialog, DialogContent, DialogTitle, InputBase } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles'
import note from '../svg_icons/note.svg'
import labeledt from '../svg_icons/label_edit.svg'
import reminder from '../svg_icons/reminder_menu.svg'
import archive from '../svg_icons/archive_menu.svg'
import labelIcon from '../svg_icons/label.svg'
import AddIcon from '@material-ui/icons/Add';

import trash from '../svg_icons/trash.svg'
import "../App.css"
import NoteService from '../services/NoteService';


const DrawerLabelGet = new NoteService().getLabels
const LabelCreate = new NoteService().createLabel



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
    constructor(){
        super();
        this.state={
            
            labels:[],
            Dopen:false

        }
    }

    componentDidMount(){
        this.DrawerLabels()
        this.setState({
            labels:this.props.labels
        })
        

    }




    handleArchive=(event)=>{
        this.props.ArchiveGet()
    }

    handleClick=(event)=>{
        this.props.TrashGet()
    }

    handleNotes=(event)=>{
        this.props.noteGetFunc()
    }

    handleReminder=(events)=>{
        this.props.ReminderGet()
    }

    DrawerLabels=()=>{
        DrawerLabelGet()
        .then(res=>{
            this.setState({
                labels:res.data
            })

        })
        .catch(error=>{
            console.log("label error", error.response.data)
        })
    }

    handleDialogOpen=()=>{
        this.setState({
            Dopen:true
        })
    }

    handleOnchange=(event)=>{
        this.setState({
            [event.target.name] :event.target.value
        })
        console.log("===>", this.state)
    }


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

        const DrawerLabel = this.state.labels.map((label)=>{
            return <div  className = "DrawerNote" key={label.id}><img src={labelIcon} alt="labelsvg"/><p>{label.name}</p></div>

        })

        const DialogLabel = this.state.labels.map((label)=>{
            return <div className = "DialogNote" key={label.id}><img src={labelIcon} alt="labelsvg"/><p>{label.name}</p><div className="DgEditLabel" ><img  src={labeledt} alt="labelsvg"/></div></div>
        })



        return (
            
                <ThemeProvider theme={myDrawerTheme}>            
            <div>
                {/* <Button onClick={this.leftDfun}>Open Left</Button> */}
                <Drawer 
                    open={this.props.open}
                    anchor="left"
                    variant="persistent"
                    >
                    <div className = "DrawerNote" id="notes"  onClick={this.handleNotes}>
                        <img src={note} alt="notesvg"/>
                        <p>Notes</p>
                    </div >
                    <Divider />


                    <div className = "DrawerNote" id="reminders" onClick={this.handleReminder}>
                        <img src={reminder} alt="remindersvg"/>
                        <p >Reminders</p>
                    </div>

                    <Divider />

                    <div>
                    <p className="labelhead">LABELS</p>
                    </div>

                    <div >
                        {DrawerLabel}
                    </div>

                    <div className = "DrawerNote">
                    <img src={labeledt} alt="labelsvg"/>
                        <p onClick={this.handleDialogOpen}>Edit labels</p>
                    </div>

                    <Divider />

                    <div className="DrawerNote" id ="archives"  onClick={this.handleArchive} >
                    <img src={archive} alt="labelsvg"/>

                        <p>Archive</p>
                    </div>

                    <Divider />
                    
                    <div className="DrawerNote" id ="trash"  onClick={this.handleClick}>
                    <img src={trash} alt="labelsvg"/>

                        <p>Trash</p>
                    </div>

                </Drawer>

                
            </div>
            <div>
            <Dialog
                open={this.state.Dopen}
                PaperProps={{
                    style: {
                        background: this.state.color,
                        width: "20%",
                        height: "auto"
                    }
                }}>
                    <DialogTitle>
                    <div>
                    <InputBase
                            name="label"
                            onChange={this.handleOnChange} 
                            placeholder="create new label"
                            style={{width:"85%"}}
                        />
                        <span ><AddIcon onClick={this.CreateLabel}/></span>
                    </div>
                    </DialogTitle>
                    <DialogContent>
                        
                    {DialogLabel}
                    </DialogContent>

                 </Dialog>
            </div>
          
             </ThemeProvider>
            


        )
    }
}

export default LeftDrawer
