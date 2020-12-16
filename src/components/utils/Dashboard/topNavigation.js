import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink, MDBIcon, MDBBtn } from 'mdbreact';

import { logout } from '../../../redux/actions/user';

class TopNavigation extends Component {
    state = {
        collapse: false
    }

    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    handleLogout = () => {
        const { logout } = this.props;
        logout();
    }

    render() {
        return (
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling>
                {/* <MDBNavbarBrand href="/">
                    <strong>Imikino dashboard</strong>
                </MDBNavbarBrand> */}
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    {/* <MDBNavbarNav left>
                        <MDBNavItem active>
                            <MDBNavLink to="#">Home</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a rel="noopener noreferrer" className="nav-link Ripple-parent" href="https://mdbootstrap.com/docs/react/" target="_blank">About</a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a rel="noopener noreferrer" className="nav-link Ripple-parent" href="https://mdbootstrap.com/docs/react/getting-started/download/" target="_blank">Free download</a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a rel="noopener noreferrer"  className="nav-link Ripple-parent" href="https://mdbootstrap.com/bootstrap-tutorial/" target="_blank">Free tutorials</a>
                        </MDBNavItem>
                    </MDBNavbarNav> */}
                    <MDBNavbarNav right>
                        {/* <MDBNavItem>
                            <a className="nav-link navbar-link" rel="noopener noreferrer" target="_blank" href="https://pl-pl.facebook.com/mdbootstrap/"><MDBIcon fab icon="facebook" /></a>
                        </MDBNavItem>
                        <MDBNavItem>
                            <a className="nav-link navbar-link" rel="noopener noreferrer" target="_blank" href="https://twitter.com/mdbootstrap"><MDBIcon fab icon="twitter" /></a>
                        </MDBNavItem> */}
                        {/* <MDBNavItem>
                            <a className="border border-light rounded mr-1 nav-link Ripple-parent" rel="noopener noreferrer" href="https://mdbootstrap.com/products/react-ui-kit/" target="_blank"><MDBIcon fab icon="github" className="mr-2"/>Go Pro</a>
                        </MDBNavItem> */}
                        <MDBBtn onClick={this.handleLogout} color="info"><MDBIcon icon="sign-out-alt" className="mr-2"/>Logout</MDBBtn>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        );
    }
}

const mapStateToProps = ({
    user: {
      token,
      login: { profile, errors, message, loading }
    }
  }) => ({
    token,
    errors,
    message,
    loading,
    profile
  });
  
  export default connect(mapStateToProps, { logout })(TopNavigation);
