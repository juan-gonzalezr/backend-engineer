import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./context/AuthContex";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Historical from "./pages/Historical";
import Profile from "./pages/Profile";

import ProtectedRoute from './pages/ProtectedRoute'
import { RestaurantProvider } from "./context/RestaurantContext";

function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route element={<ProtectedRoute/>}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/historical" element={<Historical />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </RestaurantProvider>
    </AuthProvider>
  );
}

export default App;
