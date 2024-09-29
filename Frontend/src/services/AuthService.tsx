import axiosInstance from "../config/axios"
type LoginData  =  {
    email: string;
    password: string;
}

const login = async (data:LoginData) => {
    try {
        const response = await axiosInstance.post('/login',{
            email: data.email,
            password: data.password

        })
        console.log(response)
           
      


        } catch (error) {
            console.log(error);
        }
    }


export { login}