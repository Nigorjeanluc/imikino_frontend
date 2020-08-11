/* eslint-disable global-require */
import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import {
  faFacebookSquare,
  faTwitter,
  faInstagram,
  faYoutube
} from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Footer.scss';

const FooterPage = () => (
    <MDBFooter style={{ backgroundColor: '#1b1b2f' }} className="footer font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="12 text-center">
            <img style={{ width: 300, height: 100 }} src={require('../../../assets/logo.png')} alt="Logo" />
            {/* <h5 className="title">Footer Content</h5> */}
            <ul className="icons-list">
              <li><a href="/"><FontAwesomeIcon icon={faFacebookSquare} size="3x"/></a></li>
              <li><a href="/"><FontAwesomeIcon icon={faTwitter} size="3x"/></a></li>
              <li><a href="/"><FontAwesomeIcon icon={faInstagram} size="3x"/></a></li>
              <li><a href="/"><FontAwesomeIcon icon={faYoutube} size="3x"/></a></li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3 copyright-bottom">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://imikino.rw"> imikino.rw </a>
           All Rights reserved. Developped by <a href="/">Igor J.L. Ndiramiye</a>
        </MDBContainer>
      </div>
    </MDBFooter>
);

export default FooterPage;
