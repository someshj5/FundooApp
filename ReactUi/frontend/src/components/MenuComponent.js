import React, { Component } from 'react'
import { Menu, MenuItem, Avatar, Dialog, DialogContent, DialogActions, InputBase } from '@material-ui/core';
import nature from '../nature.jpeg'
import ReactCrop from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import NoteService from '../services/NoteService';

// import listView from '../svg_icons/listview.svg'

ProfilePicUpload = new NoteService().uploadImage

export default class MenuComponent extends Component {
    constructor() {
        super();
        this.state = {
            anchorEl: null,
            menuOpen: false,
            redirect: false,
            Dopen: false,
            src:null,
            crop:{
             
                aspect:1
            }
        }
    }

    logout = event => {
        sessionStorage.setItem("userdata", "")
        sessionStorage.clear();
        this.props.signOut()
    }
    handleMenu = event => {
        this.setState({
            menuOpen: true,
            anchorEl: event.target
        })
    }
    handleClose = event => {
        this.setState({
            menuOpen: !this.state.menuOpen,
            anchorEl: this.state.anchorEl
        })
    }

    handleDialog = () => {
        this.setState({
            Dopen: true
        })
    }

    CloseDialog=()=>{
        this.setState({
            Dopen: false
        })
    }

    onSelect= event=>{
        if(event.target.files && event.target.files.length>0){
            const reader = new FileReader();
            reader.addEventListener("load",()=>
            this.setState({src : reader.result})
            );
            reader.readAsDataURL(event.target.files[0]);
        }  
    };

    onImageLoaded=image=>{
        this.imageRef = image

    }

    onCropComplete=crop=>{
        this.makeClientCrop(crop);

    }

    onCropChange = (crop, percentCrop)=>{
        this.setState({ crop: percentCrop })
    }

    async makeClientCrop(crop){
        if(this.imageRef && crop.width && crop.height){
            const croppedImageUrl = await this.getCroppedImage(
                this.imageRef,
                crop,
                "newFile.jpeg"
            )
            this.setState({ croppedImageUrl })
        }
    }

    getCroppedImage(image,crop,fileName){
        const canvas = document.createElement("canvas")
        const scaleX = image.naturalWidth/ image.width
        const scaleY = image.naturalHeight/ image.height
        canvas.width = crop.width
        canvas.height = crop.height
        const ctx = canvas.getContext("2d")

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
            if (!blob) {
                //reject(new Error('Canvas is empty'));
                console.error("Canvas is empty");
                return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
            }, "image/jpeg");
      });
    }

    imageUploadService=()=>{
        
    }


    render() {

        const { crop, croppedImageUrl, src } = this.state;

        return (
            <div>

                <div className='desktopPic'>
                    <Avatar src={nature}
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                    />
                </div>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    onClose={this.handleClose}
                    open={this.state.menuOpen}
                    keepMounted
                >
                    <MenuItem onClick={this.handleClose}><p onClick={this.handleDialog}>My Account</p></MenuItem>
                    <MenuItem onClick={this.logout}>Sign out</MenuItem>

                </Menu>
                <Dialog
                    open={this.state.Dopen}
                    PaperProps={{
                        style: {
                            background: this.state.color,
                            width: "70%",
                            height: "auto"
                        }
                    }}>
                   
                    <DialogContent>
                        <InputBase type="file" onChange={this.onSelect}>Upload</InputBase>
                        {src && (
                            <ReactCrop src={src} crop={crop} onImageLoaded={this.onImageLoaded}
                            onComplete={this.onCropComplete} onChange={this.onCropChange}/>
                        )}
                        {croppedImageUrl && (
                            <img alt="Crop" style={{maxWidth:"100%"}} src={croppedImageUrl}/>
                        )}
                    </DialogContent>
                    <DialogActions>
                      <p onclick={this.imageUploadService}>Upload</p>
                      <p onClick={this.CloseDialog}>Cancel</p>
                    </DialogActions>

                </Dialog>

            </div>
        )
    }
}
