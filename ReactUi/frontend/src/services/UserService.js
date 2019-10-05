import axios from 'axios'

const baseUserUrl = require("../config/key").baseUserUrl


// let token = this.props.match.params.token

class UserService{

    signup_service(data){
        return axios.post(baseUserUrl+"signupjwt/",data)
    }


    login_service(data){
        return axios.post(baseUserUrl+"user_login/", data,)
    }

    forgotPassword_service(data){
        return axios.post(baseUserUrl+"forgot_password/",data)
    }
    resetPassword_service(data,token){
        return axios.post(baseUserUrl+"password_reset/"+token+"/",data)
    }
    resetPassword(token){
        return axios.get(baseUserUrl+"password_reset/"+token+"/")
    }


}
export default UserService;