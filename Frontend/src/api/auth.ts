import axios from './axios'

//const API = ' http://localhost:3000/api'

export const signUptRequest= (user:any) => axios.post(`/sign-up`,user)
export const signInRequest= (user:any) => axios.post(`/sign-in`,user)
export const verifyTokenRequest = async (token: string) => {
    try {
      const res = await axios.get(`/verify`, {
        headers: {
          Authorization: `Bearer ${token}` // Añade el token de autorización si es necesario
        }
      });
      return res.data; // Retorna los datos del usuario o lo que sea que devuelva tu endpoint /verify
    } catch (error) {
      throw new Error("Failed to verify token"); // Manejo de errores según sea necesario
    }
  };
