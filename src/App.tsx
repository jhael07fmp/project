import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup/SignUp";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
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
  );
};

export default App;
