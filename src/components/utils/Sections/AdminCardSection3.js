import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';
import { Link } from 'react-router-dom';

const AdminCardSection1 = (props) => {
  const {
    countPosts,
    countMatchs
  } = props;
  return (
  <>
    <MDBRow className="mb-4">
      <MDBCol xl="3" md="6" className="mb-r">
        <Link to="/reporter/posts">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="trophy" className="primary-color"/>
                <div className="data">
                  <p><b>POSTS</b></p>
                  <h4>
                    <strong>{countPosts}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                    style={{width: '100%'}}></div>
                </div>
                {/* <MDBCardText>Better than last week (25%)</MDBCardText> */}
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>
      <MDBCol xl="3" md="6" className="mb-r">
        <Link to="/reporter/livescores">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="trophy" className="primary-color"/>
                <div className="data">
                  <p><b>MATCHS</b></p>
                  <h4>
                    <strong>{countMatchs}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg-primary" role="progressbar"
                    style={{width: '100%'}}></div>
                </div>
                {/* <MDBCardText>Better than last week (25%)</MDBCardText> */}
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>
      </MDBRow>
    </>
  )
}

export default AdminCardSection1;

