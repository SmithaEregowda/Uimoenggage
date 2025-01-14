import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/register";
import Cookies from "universal-cookie";
import SearchPage from "./pages/searchpage";
import ListPage from "./pages/listpage";

function App() {
  const cookies = new Cookies(null, { path: '/' });
  const token=cookies.get("token");

  return (
    <div>
    
      <BrowserRouter>
      {token&&
      <div className="navWrapper">
      <Link to="/search">Search List</Link>
      <Link to="/listpage">Filter List</Link>
      </div>
      }
      <Routes>
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={token?<SearchPage />:<Login />} />
        <Route path="/search" element={<SearchPage /> } />
        <Route path="/search/:listId" element={<SearchPage /> } />
        <Route path="/listpage" element={<ListPage /> } />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
