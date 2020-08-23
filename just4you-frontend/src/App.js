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
import {AuthContext} from "./auth/AuthContext";
import ShoppingCart from "./pages/User/ShoppingCart";
import AddUpdateCategory from "./components/AddUpdateCategory";

function App() {
    const [sideBarToggled, setSideBarToggled] = useState(false);

    const existingUser = {
        credentials: sessionStorage.getItem("credentials"),
        user: sessionStorage.getItem("userData")
    };

    const [authUser, setAuthUser] = useState(existingUser);
    const [loggedUser, setLoggedUser] = useState(null);

    const setUser = (data) => {
        sessionStorage.setItem("credentials", data);
        sessionStorage.setItem("userData", data);
        setAuthUser(data);
    };

    useEffect(() => {
        if (authUser.user) {
            setLoggedUser(JSON.parse(authUser.user))
        }
    }, [authUser.user])

    return (
        <>
            <AuthContext.Provider value={{authUser, setAuthUser: setUser}}>
                <SideBar loggedUser={loggedUser} setLoggedUser={setLoggedUser} sideBarToggle={sideBarToggled} setSideBarToggled={setSideBarToggled} style={{top: 56}}/>
                <div style={{marginLeft: !sideBarToggled ? '65px' : '240px'}}>
                    <div className="App">
                        <Router>
                            <Dashboard path="/"/>
                            <Login authUser={authUser} path="login"/>
                            <Register path="register"/>
                            <Items loggedUser={loggedUser} path="items"/>
                            <ItemDetails loggedUser={loggedUser} path="items/:itemId"/>
                            <Categories loggedUser={loggedUser} path="categories"/>
                            <CategoryDetails loggedUser={loggedUser} path="categories/:categoryId"/>
                            <PrivateRoute component={AddUpdateItem} path="items/add"/>
                            <PrivateRoute component={Profile} path="user/:username"/>
                            <PrivateRoute component={AddUpdateItem} path="items/add"/>
                            <PrivateRoute component={ShoppingCart} path="user/cart"/>
                            <PrivateRoute component={AddUpdateCategory} path="categories/add"/>
                        </Router>
                    </div>
                </div>
            </AuthContext.Provider>
        </>
    );
}

export default App;
