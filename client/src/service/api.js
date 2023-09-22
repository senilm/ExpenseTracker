
import axios from 'axios'
import { getAccessToken } from './utils'

export const getAuthHeader = () => getAccessToken()

const API_URL = 'https://expense-tracker-fnia.onrender.com'

export const axiosInstance = axios.create({
    baseURL:API_URL,
    timeout:10000,
    headers:{
        "Authorization":getAuthHeader(),
        "Accept":"application/json, form-data",
        "Content-Type":"application/json"
    }
})

axiosInstance.interceptors.request.use(
    function (config) {
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        return processResponse(response)
        // return response
    },
    function(error){
        return Promise.reject(processError(error))
        // return Promise.reject(error)
    }
)


const processResponse = (response) =>{
    if (response.status === 200) {
        return {isSuccess:true, data:response.data}
    }else{
        return {
            isFailure:true,
            status:response?.status,
            msg:response?.data.msg,
            code:response?.code
        }
    }
}

const processError = (error)=>{

    if(error.response){
        return{
            isError:true,
            msg:error.response.data.msg
        }
    }

}