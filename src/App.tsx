import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";
import AuthContext from "./context/authContext";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import NavbarContext from "./context/NavbarContext";
import Barbershops from "./pages/barbershops/Barbershops";

const App = () => {
  return (
    <NavbarContext>
      <AuthContext>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/barbershops" element={<Barbershops />} />
              <Route path="/barbershops/new" element={<Barbershops />} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route
              path="/*"
              element={
                <div className="flex h-screen items-center ">
                  <h2 className="text-7xl mx-auto w-fit">404 PAGE NOT FOUND</h2>
                </div>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthContext>
    </NavbarContext>
  );
};

export default App;
