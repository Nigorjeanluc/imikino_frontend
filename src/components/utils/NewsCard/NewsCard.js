import React from 'react';
import { MDBCard, MDBCardBody, MDBBtn, MDBCardImage, MDBCardTitle, MDBCol, MDBIcon, MDBRow } from 'mdbreact';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { IMIKINO_URL_IMAGE, LOCAL_URL_IMAGE } from '../../../redux/helpers/backendURLs';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, } from '@fortawesome/fontawesome-free-brands';
// import { faComments, faEye, faCalendarDay } from '@fortawesome/free-solid-svg-icons';

import './NewsCard.scss';

function NewsCard({ history, title, image, slug, size, updated_at }) {
  console.log(history);
  return (
      <MDBCol className="panel" sm="12" md={`${size}`}>
        <MDBCard className="panel-card" cascade>
          <MDBRow>
            <MDBCol className="top" size="7" sm="7" md="7">
              <Link to={`${slug}`} className='black-text' replace>
                <MDBCardImage
                  cascade
                  className='img'
                  overlay="white-light"
                  hover
                  // eslint-disable-next-line global-require
                  src={`${IMIKINO_URL_IMAGE}/news/${image}`}
                />
              </Link>
            </MDBCol>
            <MDBCol className="bottom" size="5" sm="5" md="5">
                <MDBCardBody className="titleBody">
                  <a href='#!' className='float-right activator waves-effect waves-light mr-4'>
                    <MDBIcon icon='share-alt' className='black-text' />
                  </a>
                  <MDBCardTitle className="titleCard">
                    <Link className='black-text justify-content-start' to={`${slug}`}>{title}</Link>
                    {/* <Link to={`${slug}`} className='black-text d-flex justify-content-end'>
                      <MDBBtn size="sm" rounded className="viewMore">
                          Read more
                          <MDBIcon icon='angle-double-right' className='ml-2' />
                      </MDBBtn>
                    </Link> */}
                  </MDBCardTitle>
                  {/* <hr />
                  <MDBCol className="viewMoreContainer">
                  </MDBCol> */}
                </MDBCardBody>
            </MDBCol>
          </MDBRow>
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
                <MDBIcon far icon='clock' /> { moment(updated_at, "YYYYMMDD").fromNow() }
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
