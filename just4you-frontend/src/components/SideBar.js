import React from "react";
import SideNav, {NavIcon, NavItem, NavText} from '@trendmicro/react-sidenav';
import {navigate} from "@reach/router";

function SideBar(props) {
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
                <NavItem eventKey="charts">
                    <NavIcon>
                        <i className="fa fa-fw fa-line-chart side-bar-icon"/>
                    </NavIcon>
                    <NavText>
                        Charts
                    </NavText>
                    <NavItem eventKey="charts/linechart">
                        <NavText>
                            Line Chart
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="charts/barchart">
                        <NavText>
                            Bar Chart
                        </NavText>
                    </NavItem>
                </NavItem>
            </SideNav.Nav>
            <SideNav.Nav>
                <NavItem onClick={() => navigate("login")}>
                    <NavIcon>
                        <i className="fas fa-sign-in-alt side-bar-icon"/>
                    </NavIcon>
                    <NavText>
                        Login
                    </NavText>
                </NavItem>
                <NavItem onClick={() => navigate("register")} >
                    <NavIcon>
                        <i className="fas fa-user-plus side-bar-icon"/>
                    </NavIcon>
                    <NavText>
                        Register
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}

export default SideBar