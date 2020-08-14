import React from 'react';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBIcon } from 'mdbreact';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, } from '@fortawesome/fontawesome-free-brands';
// import { faComments, faEye, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

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
          {/* <MDBBtn
            floating
            tag='a'
            className='ml-auto mr-4 lighten-3 mdb-coalor'
            action
          >
            <MDBIcon icon='chevron-right'/>
            <MDBIcon icon='chevron-right'/>
          </MDBBtn> */}
          <MDBCardBody>
            <a href='#!' className='float-right activator waves-effect waves-light mr-4'>
              <MDBIcon icon='share-alt' className='black-text' />
            </a>
            <MDBCardTitle>
            Card Title Card Title Card Title Card Title Card Title Card Title Card Title Card Title
            Card Title Card Title Card Title Card Title Card Title Card Title Card Title Card Title
            </MDBCardTitle>
            <hr />
            <MDBCardText>
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
              Some quick example text to build on the card title and make up the
              bulk of the card&apos;s content.
            </MDBCardText>
            <a href='#!' className='black-text d-flex justify-content-end'>
              <h5>
                Read more
                <MDBIcon icon='angle-double-right' className='ml-2' />
              </h5>
            </a>
          </MDBCardBody>
          {/* <MDBCardBody cascade>
            <MDBCardTitle>Card title Card title Card title Card title Card title Card title Card title</MDBCardTitle>
            <hr/>
            <MDBCardText>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </MDBCardText>
          </MDBCardBody> */}
          <div className='rounded-bottom mdb-color lighten-0 text-center pt-3'>
            {/* <ul className='list-unstyled list-inline font-small'>
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
            </ul> */}
            <ul className='list-unstyled list-inline font-small'>
              <li className='list-inline-item pr-2 white-text'>
                <MDBIcon far icon='clock' /> 05/10/2015
              </li>
              <li className='list-inline-item pr-2'>
                <a href='#!' className='white-text'>
                  <MDBIcon far icon='comments' className='mr-1' />
                  12
                </a>
              </li>
              <li className='list-inline-item pr-2'>
                <a href='#!' className='white-text'>
                  <MDBIcon fab icon='facebook-f' className='mr-1' />
                  21
                </a>
              </li>
              <li className='list-inline-item'>
                <a href='#!' className='white-text'>
                  <MDBIcon fab icon='twitter' className='mr-1' />5
                </a>
              </li>
            </ul>
          </div>
        </MDBCard>
      </MDBCol>
  );
}

export default NewsCard;
