import axios from 'axios'

class NoteService{

    getNotesAll(){
        return axios.get("http://localhost:8000/notes/notes/")
    }

    createNote(data){

        return axios.post("http://localhost:8000/notes/notes/", data)
    }

    getANote(data,id){
        return axios.get("http://localhost:8000/notes/notes/"+id+"/", data)
    }


    delANote(data,id){
        return axios.delete("http://localhost:8000/notes/notes/"+id+"/", data)
    }

    updateANote(data,id){
        return axios.put("http://localhost:8000/notes/notes/"+id+"/",data)
    }

}

export default NoteService;