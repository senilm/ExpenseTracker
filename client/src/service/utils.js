export const getAccessToken = (req,res) =>{
    return sessionStorage.getItem('accessToken')
}