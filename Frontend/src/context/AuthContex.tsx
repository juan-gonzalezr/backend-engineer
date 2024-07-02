import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";
import { signUptRequest, signInRequest, verifyTokenRequest } from "../api/auth";
import Cookies from 'js-cookie';

interface IUser {
  username: string;
  email: string;
  id:string;
  // Define aquí cualquier otra propiedad que tenga tu usuario
}
interface IUserIn {
  email: string;
  password: string;
  // Define aquí cualquier otra propiedad que tenga tu usuario
}

interface IAuthContext {
  signUp: (user: IUser) => Promise<void>;
  signIn: (user: IUserIn) => Promise<void>;
  user: IUser | null;
  isAuthenticated: boolean;
  errors: any; // Puedes definir el tipo específico de los errores según tu API o necesidades
  loading: boolean; // Estado de carga
}

const initialContext: IAuthContext = {
  signUp: async () => {},
  signIn: async () => {},
  user: null,
  isAuthenticated: false,
  errors: null,
  loading: true, // Estado inicial de carga en true
};

export const AuthContext = createContext<IAuthContext>(initialContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a provider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState<any>(null); // Puedes definir el tipo específico de errores aquí según tu API
  const [loading, setLoading] = useState(true); // Estado de carga

  const signUp = async (userData: IUser) => {
    try {
      const res = await signUptRequest(userData); // Asumiendo que signUptRequest toma userData como parámetro
      console.log(res.data);
      setUser(res.data); // Asumiendo que res.data es el usuario devuelto por el backend
      console.log(user);
      setIsAuthenticated(true);
      setErrors(null); // Reiniciar los errores después de una operación exitosa
    } catch (error:any) {
      setErrors(error.response.data); // Manejar errores de respuesta del servidor
      // Puedes manejar otros tipos de errores aquí según sea necesario
    }
  };

  const signIn = async (userData: IUserIn) => {
    try {
      const res = await signInRequest(userData); // Asumiendo que signInRequest toma userData como parámetro
      console.log(res.data);   
      setUser(res.data); // Asumiendo que res.data es el usuario devuelto por el backend
      setIsAuthenticated(true);   
    } catch (error:any) {
      setErrors(error.response.data); // Manejar errores de respuesta del servidor
      // Puedes manejar otros tipos de errores aquí según sea necesario
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = Cookies.get('token'); // Obtener el token de las cookies
      if (!token) {
        setIsAuthenticated(false);
        
        setLoading(false); // Cambiar estado de carga a false
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(token); // Esperar la respuesta de verifyTokenRequest
        //console.log(res);
        if (!res) {
          setIsAuthenticated(false);
          
          setLoading(false)
          return;
        } else {
          setIsAuthenticated(true);
          setUser(res); // Asumiendo que res es el usuario devuelto por el backend
          setLoading(false)
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false); // Cambiar estado de carga a false en cualquier caso
      }
    };

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, signIn, user, isAuthenticated, errors, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
