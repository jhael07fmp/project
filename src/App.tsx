import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";
import AuthContext from "./context/authContext";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import NavbarContext from "./context/NavbarContext";
import Barbershops from "./pages/barbershops/Barbershops";
import NewBarbershop from "./pages/barbershops/create/NewBarbershop";
import DetailsBarbershops from "./pages/barbershops/details/DetailsBarbershops";
import CreateEmployees from "./pages/barbershops/employees/CreateEmployees";
import ViewEmployees from "./pages/barbershops/employees/ViewEmployees";
import NewAppoiment from "./pages/appointments/NewAppoiment";

const App = () => {
  return (
    <NavbarContext>
      <AuthContext>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Home />} />

              <Route path="/barbershops" element={<Barbershops />} />
              <Route path="/barbershops/new" element={<NewBarbershop />} />
              <Route path="/barbershops/employees/new/:id" element={<CreateEmployees />} />
              <Route path="/barbershops/details/:id" element={<DetailsBarbershops />} />
              <Route path="/barbershops/details/employees/:id" element={<ViewEmployees />} />

              <Route path="/appointment/:barbershopId/:barberId" element={<NewAppoiment />} />
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
