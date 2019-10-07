import axios from 'axios'


const baseUrl = require("../config/key").baseUrl

let loginToken = localStorage.getItem('token')

var headerData={
    Authorization:loginToken
}

class NoteService{

    getNotesAll(){
        return axios.get(baseUrl+"notes/",{headers:headerData})
    }

    createNote(data){

        return axios.post(baseUrl+"notes/", data,{headers:headerData})
    }

    getANote(id){
        return axios.get(baseUrl+"notes/"+id+"/",{headers:headerData})
    }


    delANote(data,id){
        return axios.delete(baseUrl+"notes/"+id+"/", data,{headers:headerData})
    }

    updateANote(data,id){
        return axios.put(baseUrl+"notes/"+id+"/",data,{headers:headerData})
    }

    getArchives(){
        return axios.get(baseUrl+"archive/",{headers:headerData})
    }

    getTrash(){
        return axios.get(baseUrl+"trash/",{headers:headerData})
    }

    getPinned(){
        return axios.get(baseUrl+"pinned/",{headers:headerData})
    }

    getReminders(){
        return axios.get(baseUrl+"reminder/",{headers:headerData})
    }

    getLabels(){
        return axios.get(baseUrl+"label/",{headers:headerData})
    }

    createLabel(data){
        return axios.post(baseUrl+"label/", data,{headers:headerData})
    }

    deleteLabel(id){
        return axios.delete(baseUrl+"label/"+id+"/",{headers:headerData})
    }

    editLabel(data,id){
        return axios.put(baseUrl+"label/"+id+"/", data,{headers:headerData})
    }

    getLabelsNote(name){
        return axios.get(baseUrl+"labelnote/"+name+"/",{headers:headerData})
    }

    collaborator(data,id){
        return axios.post(baseUrl+"collaborators/"+id+"/",data,{headers:headerData})
    }
    collaboratorGet(){
        return axios.get(baseUrl+"Getcollaborators/",{headers:headerData})
    }
    search(data){
        return axios.get(baseUrl+"search/?query="+data,{headers:headerData})
    }

    uploadImage(data){
        return axios.post(baseUrl+"upload/",data,{headers:headerData})
    }


}

export default NoteService;