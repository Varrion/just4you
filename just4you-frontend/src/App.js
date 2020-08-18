import React, {useEffect, useState} from 'react';
import './App.css';
import SideBar from "./components/SideBar";
import '@fortawesome/fontawesome-free/js/all'
import {Router} from "@reach/router";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
import PrivateRoute from "./components/PrivateRoute";
import Items from "./pages/Item/Items";
import ItemDetails from "./pages/Item/ItemDetails";
import Categories from "./pages/Item/Category/Categories";
import CategoryDetails from "./pages/Item/Category/CategoryDetails";
import Profile from "./pages/User/Profile";
import AddUpdateItem from "./pages/Item/AddUpdateItem";
import axios from "axios";
import {AuthContext} from "./auth/AuthContext";

function App() {
    const [sideBarToggled, setSideBarToggled] = useState(false);

    const existingUser = {
        user: sessionStorage.getItem("user"),
        seller: sessionStorage.getItem("seller")
    };

    const [authUser, setAuthUser] = useState(existingUser);
    const [loggedUser, setLoggedUser] = useState(null);

    const setUser = (data) => {
        sessionStorage.setItem("user", data);
        sessionStorage.setItem("seller", data);
        setAuthUser(data);
    };

    const getUsername = authUser => {
        let encodedUser = authUser.split(" ")[1];
        let encodedString = atob(encodedUser);
        return encodedString.split(":")[0]
    }

    useEffect(() => {
        if (authUser.user) {
            axios.get(`user/${getUsername(authUser.user)}`)
                .then(res => {
                    setLoggedUser(res.data)
                })
                .catch(err => console.log(err))
        }
    }, [authUser.user])

    return (
        <>
            <AuthContext.Provider value={{authUser, setAuthUser: setUser}}>
                <SideBar sideBarToggle={sideBarToggled} setSideBarToggled={setSideBarToggled} style={{top: 56}}/>
                <div style={{marginLeft: !sideBarToggled ? '65px' : '240px'}}>
                    <div className="container-fluid App">
                        <Router>
                            <Dashboard path="/"/>
                            <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} authUser={authUser}
                                   path="login"/>
                            <Register path="register"/>
                            <PrivateRoute component={Profile} path="user/:username"/>
                            <Items loggedUser={loggedUser} path="items"/>
                            <ItemDetails loggedUser={loggedUser} path="items/:itemId"/>
                            <Categories loggedUser={loggedUser} path="categories"/>
                            <CategoryDetails loggedUser={loggedUser} path="categories/:categoryId"/>
                            <PrivateRoute component={AddUpdateItem} path="category/add"/>
                        </Router>
                    </div>
                </div>
            </AuthContext.Provider>
        </>
    );
}

export default App;
