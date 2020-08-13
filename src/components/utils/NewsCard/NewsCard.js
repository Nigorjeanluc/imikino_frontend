import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, } from '@fortawesome/fontawesome-free-brands';
import { faComments, faEye, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

import './NewsCard.scss';

function NewsCard() {
  return (
      <MDBCol className="panel" md="4">
        <MDBCard className="panel-card" cascade>
          <MDBCardImage
            cascade
            className='img-fluid'
            overlay="white-light"
            hover
            // eslint-disable-next-line global-require
            src={require('../../../assets/imgs/5.jpeg')}
          />
          <MDBCardBody cascade>
            <MDBCardTitle>Card title Card title Card title Card title Card title Card title Card title</MDBCardTitle>
            <hr/>
            <MDBCardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </MDBCardText>
          </MDBCardBody>
          <div className='rounded-bottom mdb-color lighten-3 text-center pt-3'>
            <ul className='list-unstyled list-inline font-small'>
              <li className='list-inline-item pr-2 white-text'>
              <FontAwesomeIcon icon={faCalendarDay} size="2x" /> 05/10/2015
              </li>
              <li className='list-inline-item pr-2'>
                <a href='#!' className='white-text'>
                  <FontAwesomeIcon icon={faComments} size="2x" /> 12
                </a>
              </li>
              <li className='list-inline-item pr-2'>
                <a href='#!' className='white-text'>
                  <FontAwesomeIcon icon={faFacebookF} size="2x" /> 21
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#!' className='white-text'>
                  <FontAwesomeIcon icon={faEye} size="2x" /> 21
                </a>
              </li>
            </ul>
          </div>
        </MDBCard>
      </MDBCol>
  );
}

export default NewsCard;