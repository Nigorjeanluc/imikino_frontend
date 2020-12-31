import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon, MDBRow, MDBCol, MDBCardText } from 'mdbreact';
import { Link } from 'react-router-dom';

const AdminCardSection1 = (props) => {
  const {
    countLeagues,
    countLocations,
    countTeams,
    countPlayers,
    countSports,
    countVideos,
    countReporters,
    countTopScorers,
    countUnapproved,
    countPosts
  } = props;
  return (
  <>
    <MDBRow className="mb-4">
      <MDBCol xl="3" md="6" className="mb-r">
        <Link to="/admin/leagues">
          <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="trophy" className="primary-color"/>
                <div className="data">
                  <p><b>LEAGUES</b></p>
                  <h4>
                    <strong>{countLeagues}</strong>
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
          <Link to="/admin/teams">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="users" className="warning-color"/>
                <div className="data">
                  <p>TEAMS</p>
                  <h4>
                    <strong>{countTeams}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar bg grey" role="progressbar"
                    style={{width: '100%'}}></div>
                </div>
                {/* <MDBCardText>Worse than last week (25%)</MDBCardText> */}
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <Link to="/admin/players">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="male" className="light-blue lighten-1"/>
                <div className="data">
                  <p>PLAYERS</p>
                  <h4>
                    <strong>{countPlayers}</strong>
                  </h4>
                </div>
              </div>
              <MDBCardBody>
                <div className="progress">
                  <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="25" className="progress-bar grey darken-2" role="progressbar"
                    style={{width: '100%'}}></div>
                </div>
                {/* <MDBCardText>Worse than last week (75%)</MDBCardText> */}
              </MDBCardBody>
            </MDBCard>
          </Link>
        </MDBCol>
        <MDBCol xl="3" md="6" className="mb-r">
          <Link to="/admin/sports">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="biking" className="red accent-2"/>
                <div className="data">
                  <p>SPORTS</p>
                  <h4>
                    <strong>{countSports}</strong>
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
      <MDBRow className="mb-4" style={{paddingTop: '20px'}}>
        <MDBCol xl="3" md="6" className="mb-r">
          <Link to="/admin/locations">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="map-marker-alt" className="blue accent-2"/>
                <div className="data">
                  <p>LOCATION</p>
                  <h4>
                    <strong>{countLocations}</strong>
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
          <Link to="/admin/videos">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="photo-video" className="blue accent-2"/>
                <div className="data">
                  <p>VIDEOS</p>
                  <h4>
                    <strong>{countVideos}</strong>
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
          <Link to="/admin/reporters">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="address-card" className="blue accent-2"/>
                <div className="data">
                  <p>REPORTERS</p>
                  <h4>
                    <strong>{countReporters}</strong>
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
          <Link to="/admin/top_scorers">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="futbol" className="blue accent-2"/>
                <div className="data">
                  <p>TOP SCORERS</p>
                  <h4>
                    <strong>{countTopScorers}</strong>
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
      <MDBRow style={{paddingTop: '20px'}}>
        <MDBCol xl="3" md="6" className="mb-r">
          <Link to="/admin/posts">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="newspaper" className="blue accent-2"/>
                <div className="data">
                  <p>APPROVE POSTS</p>
                  <h4>
                    <strong>{countUnapproved}</strong>
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
          <Link to="/admin/editor/posts">
            <MDBCard className="cascading-admin-card">
              <div className="admin-up">
              <MDBIcon icon="newspaper" className="blue accent-2"/>
                <div className="data">
                  <p>YOUR POSTS</p>
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
      </MDBRow>
    </>
  )
}

export default AdminCardSection1;

