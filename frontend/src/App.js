import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header/Header";
import SideBar from "./components/sideBar/SideBar";
import { useEffect, useState } from "react";
import Tasks from "./pages/tasks/Tasks";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import Login from "./pages/login/Login";
import AuthProvider from "./contexts/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";
import useAuth from "./hooks/useAuth";
import jwt_decode from "jwt-decode";
import { domain, token } from "./.env";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setDoneList } from "./redux/slices/taskSlice";

toast.configure();

function App() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      await axios
        .get(`${domain}/?query=done`, {
          headers: { Authorization: `JWT ${localStorage.getItem("token")}` },
        })
        .then((res) => dispatch(setDoneList(res.data)));
    };
    getData();
  }, [user]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
