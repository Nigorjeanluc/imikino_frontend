import React from 'react';
import { Card } from 'react-bootstrap';
import { 
  MDBCard,
  MDBCardHeader,
 } from 'mdbreact';
import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  BACKEND_URL_IMAGE,
  IMIKINO_URL_IMAGE
} from '../../../redux/helpers/backendURLs';
import Title from '../Title';
import './Team.scss';

const Team = (props) => {
  const { team } = props;
  return (
    <>
    <Card className="teamTeam"><h1><img src={`${BACKEND_URL_IMAGE}/teams/${team.image}`} alt={team.id} /> {team.name}</h1></Card>
    {/* <MDBCard className="teamTeam">
      <MDBCardHeader className="teamsss">
        <h1><img src={`${BACKEND_URL_IMAGE}/teams/${team.image}`} alt={team.id} /> {team.name}</h1>
      </MDBCardHeader>
    </MDBCard> */}
    </>
  );
}

export default Team;
