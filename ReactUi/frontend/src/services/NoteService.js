import axios from 'axios'

class NoteService{

    getNotesAll(){
        return axios.get("http://localhost:8000/notes/notes/")
    }

    createNote(data){

        return axios.post("http://localhost:8000/notes/notes/", data)
    }

    getANote(id){
        return axios.get("http://localhost:8000/notes/notes/"+id+"/")
    }


    delANote(data,id){
        return axios.delete("http://localhost:8000/notes/notes/"+id+"/", data)
    }

    updateANote(data,id){
        return axios.put("http://localhost:8000/notes/notes/"+id+"/",data)
    }

    getArchives(){
        return axios.get("http://localhost:8000/notes/archive/")
    }

    getTrash(){
        return axios.get("http://localhost:8000/notes/trash/")
    }

    getReminders(){
        return axios.get("http://localhost:8000/notes/reminder/")
    }

    getLabels(){
        return axios.get("http://localhost:8000/notes/label/")
    }

}

export default NoteService;