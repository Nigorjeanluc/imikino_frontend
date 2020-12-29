import React from 'react';
import logo from "../../../assets/logo.png";
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink, Link } from 'react-router-dom';

const SideNavigation = () => {
    return (
        <div className="sidebar-fixed position-fixed">
            <Link to="/" className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src={logo}/>
            </Link>
            <MDBListGroup className="list-group-flush">
                <NavLink exact={true} to="/reporter/dashboard" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/reporter/posts" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="newspaper" className="mr-3"/>
                        Posts
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/reporter/livescores" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="users" className="mr-3"/>
                        Livescores
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default SideNavigation;
