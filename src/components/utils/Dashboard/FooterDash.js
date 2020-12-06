import React from 'react';
import { MDBFooter, MDBBtn, MDBIcon } from 'mdbreact';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <MDBFooter color="blue" className="page-footers text-center font-small darken-2">
            <div className="pt-4">
                <Link to="/"><MDBBtn outline color="white">Return Home<MDBIcon icon="home" className="ml-2"/></MDBBtn></Link>
                <hr className="my4"/>
            </div>
            <div className="pb-4">
                <MDBIcon fab icon="facebook" className="mr-3"/>
                <MDBIcon fab icon="twitter" className="mr-3"/>
                <MDBIcon fab icon="youtube" className="mr-3"/>
                <MDBIcon fab icon="google-plus" className="mr-3"/>
            </div>
            <p className="footer-copyright mb-0 py-3 text-center">
                &copy; {new Date().getFullYear()} Copyright: <a href="https://imikino.rw"> imikino.rw </a>
            </p>
        </MDBFooter>
    );
}

export default Footer;
