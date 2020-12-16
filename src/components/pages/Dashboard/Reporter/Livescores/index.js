import React, { Component } from 'react';
import { MDBCol, MDBRow, MDBBadge, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import moment from 'moment';
import openSocket from 'socket.io-client';
import { Link } from 'react-router-dom';

import {
  SOCKET_URL,
  HEROKU_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
  BACKEND_URL_IMAGE
} from '../../../../../redux/helpers/backendURLs';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import AdminCardSection1 from '../../../../utils/Sections/AdminCardSection1';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import DeleteBtnMatch from '../../../../utils/Dashboard/Buttons/DeleteBtnMatch';
import { getAllLeagues } from '../../../../../redux/actions/leagues';
import { getAllTeams } from '../../../../../redux/actions/teams';
import { getAllPlayers } from '../../../../../redux/actions/players';
import { getAllSports } from '../../../../../redux/actions/sports';
import { getAllLocations } from '../../../../../redux/actions/locations';
import { getAllMatchs } from '../../../../../redux/actions/matchs';
import { deleteMatch } from '../../../../../redux/actions/match';
import ChartSection1 from '../../../../utils/Sections/ChartSection1';
import TableSection from '../../../../utils/Sections/TableSection';
import ChartSection2 from '../../../../utils/Sections/ChartSection2';
// import MapSection from '../../../../utils/Sections/MapSection';
import ModalSection from '../../../../utils/Sections/ModalSection';
import AdminCardSection2 from '../../../../utils/Sections/AdminCardSection2';
import './index.scss';

class Livescore extends Component {
  state = {
    socket: openSocket(HEROKU_URL)
  }
  componentDidMount() {
    const {
      getAllLeagues,
      getAllPlayers,
      getAllSports,
      getAllLocations,
      getAllTeams,
      getAllMatchs
    } = this.props;
    const { socket } = this.state;
    getAllLeagues(1, 2000);
    getAllTeams(1, 2000);
    getAllPlayers(1, 2000);
    getAllSports(1, 2000);
    getAllLocations(1, 2000);
    getAllMatchs(1, 20);
    socket.on('refreshMatch', (data) => {
      console.log('Yes V');
      getAllMatchs(1, 20);
    });
  }

  deleteGo = (id) => {
    const { deleteGoal } = this.props;
    deleteGoal(id)
  }

  deleteCa = (id) => {
    const { deleteCard } = this.props;
    deleteCard(id)
  }

  deleteMat = (id) => {
    const { deleteMatch } = this.props;
    deleteMatch(id)
  }

  render() {
    const {
      listOfLeagues,
      listOfLocations,
      listOfPlayers,
      listOfSports,
      listOfTeams,
      listOfMatchs,
      getMatch
    } = this.props;

    console.log(listOfMatchs);
    const totalLeagues = listOfLeagues && listOfLeagues.length ? listOfLeagues.length : 0;
    const totalLocations = listOfLocations && listOfLocations.length ? listOfLocations.length : 0;
    const totalPlayers = listOfPlayers && listOfPlayers.length ? listOfPlayers.length : 0;
    const totalSports = listOfSports && listOfSports.length ? listOfSports.length : 0;
    const totalTeams = listOfTeams && listOfTeams.length ? listOfTeams.length : 0;
    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Livescores" />
        <MDBRow>
          <MDBCol md="12">
            {
              getMatch && getMatch.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getMatch.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getMatch && getMatch.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getMatch.message}`}</strong>
                </div>
              ) : null
            }
          </MDBCol>
          <MDBCol className="livescoreCard" md="12">
              <Link to='/reporter/livescores/addmatch'><MDBBtn>Add Match</MDBBtn></Link><hr />
          </MDBCol>
                {listOfMatchs && listOfMatchs.map(match => (
          <MDBCol key={match.id} className="livescoreCard" md="12">
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
                    <MDBCol
                      md="12"
                      className="text-center"
                    >
                      <span style={{fontSize: '14px'}}>Starting time: {match && moment(match.starting_time).format("ddd, MMM Do YYYY, h:mm:ss a")}</span>
                      <br /><span>Stadium: {match && match.stadium}</span>
                      {match && match.started ? 
                      <>
                        <br />
                        <Link to={`/reporter/livescores/addmatch/${match.id}`}>
                          <MDBBtn color="elegant" outline>Edit Stats</MDBBtn>
                        </Link>
                        <br />
                        <DeleteBtnMatch title="Match" delete={() => this.deleteMat(match.id)}/>
                      </> : <>
                        <br />
                        <Link to={`/reporter/livescores/addmatch/${match.id}`}>
                          <MDBBtn color="blue-grey" outline >Start Match</MDBBtn>
                        </Link>
                      </>}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow style={{marginTop: '20px'}}>
                    <MDBCol
                      md="6"
                      sm="6"
                      xs="6"
                      lg="6"
                      className="text-center"
                    >
                      {match.goals && match.goals.filter(goal => ((goal.team && goal.team.id) === match.team_one)).length > 0 ? (<><h3>Goals</h3><hr /></>): null}
                      {match.goals && match.goals.length > 0 && match.goals.filter(goal => ((goal.team && goal.team.id) === match.team_one)).map(goal => (
                        <div key={goal.id}>
                          <p>
                            <span>Scorer: </span>
                            <img style={{width: '20px', height: '20px'}} src={`${BACKEND_URL_IMAGE}/players/${goal.player && goal.player.image}`} alt={goal.player && goal.player.name} /> 
                            <span> {goal.player && goal.player.name}</span>
                          </p>
                          <p>
                            Minute: {goal.goal_time} <sup>'</sup>
                            <span><DeleteBtn delete={() => this.deleteGo(goal.id)} title="Goal"/></span>
                          </p>
                        </div>
                      ))}
                    </MDBCol>
                    <MDBCol
                      md="6"
                      sm="6"
                      xs="6"
                      lg="6"
                      className="text-center"
                    >
                      {match.goals && match.goals.filter(goal => ((goal.team && goal.team.id) === match.team_two)).length > 0 ? (<><h3>Goals</h3><hr /></>): null}
                      {match.goals && match.goals.length > 0 && match.goals.filter(goal => ((goal.team && goal.team.id) === match.team_two)).map(goal => (
                        <div key={goal.id}>
                          <p>
                            <span>Scorer: </span>
                            <img style={{width: '20px', height: '20px'}} src={`${BACKEND_URL_IMAGE}/players/${goal.player && goal.player.image}`} alt={goal.player && goal.player.name} /> 
                            <span> {goal.player && goal.player.name}</span>
                          </p>
                          <p>
                            Minute: {goal.goal_time} <sup>'</sup>
                            <span><DeleteBtn delete={() => this.deleteGo(goal.id)} title="Goal"/></span>
                          </p>
                        </div>
                      ))}
                    </MDBCol>
                  </MDBRow>
                  <MDBRow style={{marginTop: '20px'}}>
                    <MDBCol
                      md="6"
                      sm="6"
                      xs="6"
                      lg="6"
                      className="text-center"
                    >
                      {match.cards && match.cards.filter(card => ((card.team && card.team.id) === match.team_one)).length > 0 ? (<><h3>Cards</h3><hr /></>): null}
                      {match.cards && match.cards.length > 0 && match.cards.filter(card => ((card.team && card.team.id) === match.team_one)).map(card => (
                        <div key={card.id}>
                          <p>
                            <img style={{width: '20px', height: '20px'}} src={`${BACKEND_URL_IMAGE}/players/${card.player && card.player.image}`} alt={card.player && card.player.name} /> 
                            <span>
                                { card.card_type === 'RED' ?
                                  <img style={{width: '20px', height: '20px'}} src={require('../../../../../assets/red-card.png')} alt="card" />
                                  : null
                               }
                               { card.card_type === 'YELLOW' ?
                                 <img style={{width: '20px', height: '20px'}} src={require('../../../../../assets/yellow-card.png')} alt="card" />
                                 : null
                              } {card.player && card.player.name}  {card.team && card.team.id}
                            </span>
                          </p>
                          <p>
                            Minute: {card.card_time} <sup>'</sup>
                            <span><DeleteBtn delete={() => this.deleteCa(card.id)} title="Card"/></span>
                          </p>
                        </div>
                      ))}
                    </MDBCol>
                    <MDBCol
                      md="6"
                      sm="6"
                      xs="6"
                      lg="6"
                      className="text-center"
                    >
                      {match.cards && match.cards.filter(card => ((card.team && card.team.id) === match.team_two)).length > 0 ? (<><h3>Cards</h3><hr /></>): null}
                      {match.cards && match.cards.length > 0 && match.cards.filter(card => ((card.team && card.team.id) === match.team_two)).map(card => (
                        <div key={card.id}>
                          <p>
                            <img style={{width: '20px', height: '20px'}} src={`${BACKEND_URL_IMAGE}/players/${card.player && card.player.image}`} alt={card.player && card.player.name} /> 
                            <span>
                                { card.card_type === 'RED' ?
                                  <img style={{width: '20px', height: '20px'}} src={require('../../../../../assets/red-card.png')} alt="card" />
                                  : null
                               }
                               { card.card_type === 'YELLOW' ?
                                 <img style={{width: '20px', height: '20px'}} src={require('../../../../../assets/yellow-card.png')} alt="card" />
                                 : null
                              } {card.player && card.player.name}  {card.team && card.team.id}
                            </span>
                          </p>
                          <p>
                            Minute: {card.card_time} <sup>'</sup>
                            <span><DeleteBtn delete={() => this.deleteCa(card.id)} title="Card"/></span>
                          </p>
                        </div>
                      ))}
                    </MDBCol>
                  </MDBRow>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
                ))}
        </MDBRow>
        {/* <AdminCardSection1
          countLeagues={totalLeagues}
          countLocations={totalLocations}
          countPlayers={totalPlayers}
          countSports={totalSports}
          countTeams={totalTeams}
        /> */}
        {/* <ChartSection1 /> */}
        {/* <TableSection />
        <ChartSection2 /> */}
        {/* <MDBRow className="mb-4"> */}
            {/* <MapSection /> */}
            {/* <ModalSection /> */}
        {/* </MDBRow> */}
        {/* <AdminCardSection2 /> */}
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ leagues, sports, teams, locations, players, matchs, match }) => ({
  Next: leagues.Next,
  Previous: leagues.Previous,
  errors: leagues.errors,
  loading: leagues.loading,
  listOfLeagues: leagues.listOfLeagues,
  getLeagues: leagues.getLeagues,
  listOfSports: sports.listOfSports,
  getSports: sports.getSports,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
  listOfLocations: locations.listOfLocations,
  getLocations: locations.getLocations,
  listOfPlayers: players.listOfPlayers,
  getPlayers: players.getPlayers,
  listOfMatchs: matchs.listOfMatchs,
  getMatchs: matchs.getMatchs,
  match: match.match,
  getMatch: match.getMatch
});

const mapDispatchToProps = (dispatch) => ({
  getAllLeagues: (page, limit) => dispatch(getAllLeagues(page, limit)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  getAllPlayers: (page, limit) => dispatch(getAllPlayers(page, limit)),
  getAllSports: (page, limit) => dispatch(getAllSports(page, limit)),
  getAllLocations: (page, limit) => dispatch(getAllLocations(page, limit)),
  getAllMatchs: (page, limit) => dispatch(getAllMatchs(page, limit)),
  deleteMatch: (id) => dispatch(deleteMatch(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Livescore);
