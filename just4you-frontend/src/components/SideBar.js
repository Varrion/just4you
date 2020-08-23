import React, {useEffect, useState} from "react";
import SideNav, {NavIcon, NavItem, NavText} from '@trendmicro/react-sidenav';
import {navigate} from "@reach/router";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {LogoutUser} from "../services/customerService";
import {GetAllCategories} from "../services/categoryService";

function SideBar(props) {

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        GetAllCategories()
            .then(res => setCategories(res.data))
    }, [props.loggedUser])

    return (
        <SideNav
            className={"flex-column-space_between position-fixed"}
            style={{background: 'linear-gradient(180deg, rgba(2,0,36,1) 20%, rgba(134,145,190,1) 60%, rgba(18,126,173,1) 77%)'}}
        >
            <SideNav.Toggle onClick={() => props.setSideBarToggled(!props.sideBarToggle)}/>
            <SideNav.Nav defaultSelected="home"
                         style={{height: '-webkit-fill-available'}}>
                <NavItem onClick={() => navigate("/")}>
                    <NavIcon>
                        <i className="fa fa-fw fa-home side-bar-icon"/>
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="categories">
                    <NavIcon>
                        <i className="fas fa-tshirt side-bar-icon"/>
                    </NavIcon>
                    <NavText>
                        Categories
                        {props.loggedUser &&
                        <OverlayTrigger
                            key={'right'}
                            placement={'right'}
                            overlay={
                                <Tooltip>
                                    Add new category.
                                </Tooltip>
                            }
                        >
                            <Button variant="link" onClick={() => navigate("/categories/add")}><i
                                className="fas fa-plus"/></Button>
                        </OverlayTrigger>}
                    </NavText>
                    {categories && categories.length ? categories.map(category =>
                            <NavItem key={category.id} eventKey={"categories/" + category.id}
                                     onClick={() => navigate(`/categories/${category.id}`)}>
                                <NavText>
                                    {category.name}
                                </NavText>
                            </NavItem>)
                        : <NavItem eventKey="categories/empty">
                            <NavText>
                                No categories yet
                            </NavText>
                        </NavItem>}
                </NavItem>
            </SideNav.Nav>
            <SideNav.Nav>
                {!props.loggedUser ?
                    <>
                        <NavItem onClick={() => navigate("/login")}>
                            <NavIcon>
                                <i className="fas fa-sign-in-alt side-bar-icon"/>
                            </NavIcon>
                            <NavText>
                                Login
                            </NavText>
                        </NavItem>
                        <NavItem onClick={() => navigate("/register")}>
                            <NavIcon>
                                <i className="fas fa-user-plus side-bar-icon"/>
                            </NavIcon>
                            <NavText>
                                Register
                            </NavText>
                        </NavItem>
                    </> :
                    <>
                        <NavItem onClick={() => navigate("login")}>
                            <NavIcon>
                                <i className="fas fa-user-circle side-bar-icon"/>
                            </NavIcon>
                            <NavText>
                                User
                            </NavText>
                        </NavItem>
                        <NavItem onClick={() => navigate("register")}>
                            <NavIcon>
                                <i className="fas fa-shopping-cart side-bar-icon"/>
                            </NavIcon>
                            <NavText>
                                Shopping Cart
                            </NavText>
                        </NavItem>
                        <NavItem onClick={() => LogoutUser(props.setLoggedUser)}>
                            <NavIcon>
                                <i className="fas fa-sign-out-alt side-bar-icon"/>
                            </NavIcon>
                            <NavText>
                                Logout
                            </NavText>
                        </NavItem>
                    </>}
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideBar