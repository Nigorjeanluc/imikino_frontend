import React from 'react';
import {
  MDBCard,
  MDBCol,
  MDBCardBody,
  MDBRow
} from 'mdbreact';
import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  BACKEND_URL_IMAGE,
  IMIKINO_URL_IMAGE
} from '../../../redux/helpers/backendURLs';
import './Match.scss';

const Match = (props) => {
  const {match} = props;
  return (
  <MDBCol className="livescoreCard" md="12">
    <MDBCard>
      <MDBCardBody>
        <div>
          <MDBRow>
            <MDBCol
              md="5"
              sm="5"
              xs="5"
              lg="5"
              className="text-center"
            >
              <img style={{width: '50px', height: '50px'}} src={`${BACKEND_URL_IMAGE}/teams/${match.team_1 && match.team_1.image}`} alt={match.team_1 && match.team_1.name} />
              <span>  {match.team_1 && match.team_1.name}</span>
            </MDBCol>
            <MDBCol
              md="2"
              sm="2"
              xs="2"
              lg="2"
              className="text-center"
            >
              {match && match.started ? (
                <span style={{fontSize: '24px'}}>{match.goals && match.goals.filter(goal => ((goal.team && goal.team.id) === match.team_one)).length} : {match.goals && match.goals.filter(goal => ((goal.team && goal.team.id) === match.team_two)).length}</span>
              ) : <span style={{fontSize: '22px'}}> vs </span>}
              
            </MDBCol>
            <MDBCol
              md="5"
              sm="5"
              xs="5"
              lg="5"
              className="text-center"
            >
              <img style={{width: '50px', height: '50px'}} src={`${BACKEND_URL_IMAGE}/teams/${match.team_2 && match.team_2.image}`} alt={match.team_2 && match.team_2.name} />
              <span>  {match.team_2 && match.team_2.name}</span>
            </MDBCol>
          </MDBRow>
        </div>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
  );
}

export default Match;
                