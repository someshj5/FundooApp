import axios from 'axios'


const baseUrl = require("../config/key").baseUrl

class NoteService{

    getNotesAll(){
        return axios.get(baseUrl+"notes/")
    }

    createNote(data){

        return axios.post(baseUrl+"notes/", data)
    }

    getANote(id){
        return axios.get(baseUrl+"notes/"+id+"/")
    }


    delANote(data,id){
        return axios.delete(baseUrl+"notes/"+id+"/", data)
    }

    updateANote(data,id){
        return axios.put(baseUrl+"notes/"+id+"/",data)
    }

    getArchives(){
        return axios.get(baseUrl+"archive/")
    }

    getTrash(){
        return axios.get(baseUrl+"trash/")
    }

    getReminders(){
        return axios.get(baseUrl+"reminder/")
    }

    getLabels(){
        return axios.get(baseUrl+"label/")
    }

    createLabel(data){
        return axios.post(baseUrl+"label/", data)
    }

    deleteLabel(id){
        return axios.delete(baseUrl+"label/"+id+"/")
    }

    editLabel(data,id){
        return axios.put(baseUrl+"label/"+id+"/", data)
    }

    getLabelsNote(name){
        return axios.get(baseUrl+"labelnote/"+name+"/")
    }

    collaborator(data,id){
        return axios.post(baseUrl+"collaborators/"+id+"/",data)
    }

}

export default NoteService;