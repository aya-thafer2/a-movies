import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Details from "./components/Details/Details";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Popular from "./components/Popular/Popular";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import NotFound from "./components/NotFound/NotFound";
import cookies from "react-cookies";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./components/Loader/Loader";
import PopularTV from "./components/PopularTV/PopularTV";
import TVdetails from "./components/TVdetails/TVdetails";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";

function App() {
  const apiKey = "5773406a2f9494f2990540516a96fa4b";
  const imgPath = "https://image.tmdb.org/t/p/original/";
  const [logUser, setLogUser] = useState(cookies.load("token"));
  const [users, setUsers] = useState([]);
  const [token,setToken] = useState('')
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState('')

  const getUsers = async () => {
    const result = await axios.get(
      "https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers"
    );
    setUsers(result.data);
    setLoading(false);
  };

  // const getToken = async () => {
  //   const result = await axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`);
  //   if(result.data.success===true){
  //     setToken(result.data.request_token);
  //   }
  // }
  const createSession =async()=>{
    const result = await axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,{'request_token': token});
    console.log(result);
    //setSessionId(result.data.guest_session_id);


  }

  useEffect(() => {
    getUsers();
    //getToken()
  }, []);

  useEffect(() => {
    /** logUser is a token  */
    // if(logUser!==''){
    //   createSession();
    // }
    console.log(logUser);
  }, [logUser]);

  return (
    <>
      <Navbar logUser={logUser} setLogUser={setLogUser}/>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading ? (
        <Loader />
      ) : (
        <Routes>
          {logUser?
          <>
          
          <Route
                path="/forget-password"
                element={<ForgetPassword />}
              ></Route>
              <Route
                path="/reset-code/:email"
                element={<ResetPassword />}
              ></Route>
          </>:<>
          <Route path="/login" element={<Login setLogUser={setLogUser} />}></Route>
          </>
          }
          <Route path="/register" element={<Register />}></Route>
          <Route path="/" element={<Home loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath} />}></Route>
          
          <Route
            path="/movies"
            element={<Popular loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath} />}
          ></Route>
          <Route
            path="/movie/:id"
            element={<Details loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath} />}
          ></Route>
          <Route
            path="/tv"
            element={<PopularTV loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath} />}
          ></Route>
          <Route
            path="/tv/:id"
            element={<TVdetails loading={loading} setLoading={setLoading} apiKey={apiKey} imgPath={imgPath} />}
          ></Route>
          
          
          
        </Routes>
      )}

      <Footer />
    </>
  );
}

export default App;
