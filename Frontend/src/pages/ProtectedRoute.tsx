import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContex"



const ProtectedRoute = () => {
    const{loading,isAuthenticated}=useAuth()
    //console.log(loading,isAuthenticated);
    if(loading)return <h1>loading..</h1>
    if(!isAuthenticated && !loading) return <Navigate to='/sign-in'/>   
  return (
    <Outlet/>
  )
}

export default ProtectedRoute