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
                <NavLink exact={true} to="/admin/dashboard" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="chart-pie" className="mr-3"/>
                        Dashboard
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/leagues" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="trophy" className="mr-3"/>
                        Leagues
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/teams" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="users" className="mr-3"/>
                        Teams
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/players" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="male" className="mr-3"/>
                        Players
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/sports" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="biking" className="mr-3"/>
                        Sports
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/locations" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="map-marker-alt" className="mr-3"/>
                        Locations
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/videos" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="photo-video" className="mr-3"/>
                        Videos
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/reporters" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="address-card" className="mr-3"/>
                        Reporters
                    </MDBListGroupItem>
                </NavLink>
                <NavLink to="/admin/reporters" activeClassName="activeClass">
                    <MDBListGroupItem>
                        <MDBIcon icon="futbol" className="mr-3"/>
                        Top Scorer
                    </MDBListGroupItem>
                </NavLink>
            </MDBListGroup>
        </div>
    );
}

export default SideNavigation;
