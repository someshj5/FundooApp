import axios from 'axios'

class NoteService{

    getNotesAll(){
        return axios.get("http://localhost:8000/notes/notes/")
    }

    createNote(data){

        return axios.post("http://localhost:8000/notes/notes/", data)
    }

    getANote(data){
        return axios.get("http://localhost:8000/notes/notes/<int:pk>/", data)
    }


    delANote(data){
        return axios.delete("http://localhost:8000/notes/notes/<int:pk>/", data)
    }

    updateANote(data){
        return axios.put("http://localhost:8000/notes/notes/<int:pk>/",data)
    }

}

export default NoteService;