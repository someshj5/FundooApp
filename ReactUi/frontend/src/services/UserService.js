import axios from 'axios'

const baseUserUrl = require("../config/key").baseUserUrl




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

   

    // forgotPassword_service(data){
    //     return axios.post(baseUserUrl+"forgot_password/",data,{
    //         headers:{
    //             "token":token
    //         }
    //     })
    // }

    

}
export default UserService;