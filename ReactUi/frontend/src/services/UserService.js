import axios from 'axios'

class UserService{

    signup_service(data){
        return axios.post("http://localhost:8000/fundooapp/signupjwt/",data)
    }


    login_service(data){
        return axios.post("http://localhost:8000/fundooapp/user_login/", data)
    }

    forgotPassword_service(data){
        return axios.post("http://localhost:8000/fundooapp/forgot_password/",data)
    }

    

}
export default UserService;