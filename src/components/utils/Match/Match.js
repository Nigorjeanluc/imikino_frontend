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
          <MDBRow className="matchContainer">
            <MDBCol
              className="text-center"
            >
              <img style={{width: '50px', height: '50px'}} src={`${BACKEND_URL_IMAGE}/teams/${match.team_1 && match.team_1.image}`} alt={match.team_1 && match.team_1.name} />
              <span>  {match.team_1 && match.team_1.name}</span><br />
              {match && match.started ? match.cards.filter(card => ((card.team && card.team.id) === match.team_one)).map(card =>
                  <>
                  <span key={card.id}>
                    {
                      card.card_type === 'RED' ?
                      <img style={{width: '20px', height: '20px'}} src={require('../../../assets/red-card.png')} alt="card" />
                      : null
                    }
                    { 
                      card.card_type === 'YELLOW' ?
                      <img style={{width: '20px', height: '20px'}} src={require('../../../assets/yellow-card.png')} alt="card" />
                      : null
                    } {card.player && card.player.name}  {card.team && card.team.id}
                  </span><br/>
                  </>
                ) : null}
            </MDBCol>
            <MDBCol
              className="text-center"
            >
              {match && match.started ? (
                <span style={{fontSize: '24px'}}>{match.goals && match.goals.filter(goal => ((goal.team && goal.team.id) === match.team_one)).length} : {match.goals && match.goals.filter(goal => ((goal.team && goal.team.id) === match.team_two)).length}</span>
              ) : <span style={{fontSize: '22px'}}> vs </span>}
            </MDBCol>
            <MDBCol
              className="text-center"
            >
              <img style={{width: '50px', height: '50px'}} src={`${BACKEND_URL_IMAGE}/teams/${match.team_2 && match.team_2.image}`} alt={match.team_2 && match.team_2.name} />
              <span>  {match.team_2 && match.team_2.name}</span><br />
              {match && match.started ? match.cards.filter(card => ((card.team && card.team.id) === match.team_two)).map(card =>
                  <>
                  <span key={card.id}>
                    {
                      card.card_type === 'RED' ?
                      <img style={{width: '20px', height: '20px'}} src={require('../../../assets/red-card.png')} alt="card" />
                      : null
                    }
                    { 
                      card.card_type === 'YELLOW' ?
                      <img style={{width: '20px', height: '20px'}} src={require('../../../assets/yellow-card.png')} alt="card" />
                      : null
                    } {card.player && card.player.name}  {card.team && card.team.id}
                  </span><br/>
                  </>
                ) : null}
            </MDBCol>
          </MDBRow>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
  );
}

export default Match;
                