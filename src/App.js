import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/register";
import Cookies from "universal-cookie";
import SearchPage from "./pages/searchpage";

function App() {
  const cookies = new Cookies(null, { path: '/' });
  const token=cookies.get("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token?<SearchPage />:<Login />} />
        <Route path="/search" element={<SearchPage /> } />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
