import React, { Component } from 'react';
import { MDBCol, MDBRow, MDBBadge, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from 'react-select';
import openSocket from 'socket.io-client';

import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
  BACKEND_URL_IMAGE,
  HEROKU_URL
} from '../../../../../redux/helpers/backendURLs';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import AdminCardSection1 from '../../../../utils/Sections/AdminCardSection1';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import { getAllLeagues } from '../../../../../redux/actions/leagues';
import { getAllTeams } from '../../../../../redux/actions/teams';
import { fetchTeam } from '../../../../../redux/actions/team';
import { createGoal, deleteGoal } from '../../../../../redux/actions/goal';
import { createCard, deleteCard } from '../../../../../redux/actions/card';
import { getAllPlayers } from '../../../../../redux/actions/players';
import { getAllSports } from '../../../../../redux/actions/sports';
import { getAllLocations } from '../../../../../redux/actions/locations';
import { getAllMatchs } from '../../../../../redux/actions/matchs';
import { editMatch, getSingleMatch, deleteMatch } from '../../../../../redux/actions/match';
import ChartSection1 from '../../../../utils/Sections/ChartSection1';
import TableSection from '../../../../utils/Sections/TableSection';
import ChartSection2 from '../../../../utils/Sections/ChartSection2';
// import MapSection from '../../../../utils/Sections/MapSection';
import ModalSection from '../../../../utils/Sections/ModalSection';
import AdminCardSection2 from '../../../../utils/Sections/AdminCardSection2';
import { Link } from 'react-router-dom';
import team from '../../../../../redux/reducers/team';
import './index.scss';

class AddGoalCard extends Component {
  state = {
    goal_time: 0,
    card_time: 0,
    card_type: 'RED',
    team_id: 0,
    player_id: 0,
    isGoalPlayerToggled: false,
    isCardPlayerToggled: false,
    socket: openSocket(HEROKU_URL),
  }

  componentDidMount() {
    const {
      getAllLeagues,
      getAllPlayers,
      getAllSports,
      getAllLocations,
      getAllTeams,
      getAllMatchs,
      getSingleMatch,
      match
    } = this.props;
    const { socket } = this.state;
    getAllLeagues(1, 2000);
    getAllTeams(1, 2000);
    getAllPlayers(1, 2000);
    getAllSports(1, 2000);
    getAllLocations(1, 2000);
    getAllMatchs(1, 40);
    getSingleMatch(match.params.id);
    socket.on('refreshMatch', (data) => {
      console.log('Yes V');
      getSingleMatch(match.params.id);
    });
  }

  // componentWillReceiveProps() {
  //   const { team } = this.props;

  //   if (team && team.players) {
  //   }

  // }

  deleteGo = (id) => {
    const { deleteGoal } = this.props;
    deleteGoal(id)
  }

  deleteCa = (id) => {
    const { deleteCard } = this.props;
    deleteCard(id)
  }

  handleTeamGoal = (event) => {
    const { fetchTeam } = this.props;
    fetchTeam(event.value);
    this.setState({
      team_id: event.value,
      isGoalPlayerToggled: true
    })
  }

  handlePlayerGoal = (event) => {
    this.setState({
      player_id: event.value
    })
  }

  handleGoalTime = (event) => {
    console.log(event.target.value);
    this.setState({
      goal_time: event.target.value
    })
  }

  handleTeamCard = (event) => {
    const { fetchTeam } = this.props;
    fetchTeam(event.value);
    this.setState({
      team_id: event.value,
      isCardPlayerToggled: true
    });
  }

  handlePlayerCard = (event) => {
    this.setState({
      player_id: event.value
    })
  }

  handleCardType = (event) => {
    this.setState({
      card_type: event.target.value
    })
  }

  handleCardTime = (event) => {
    console.log(event.target.value);
    this.setState({
      card_time: event.target.value
    })
  }

  handleGoalSubmit = (event) => {
    event.preventDefault();
    const { createGoal, livescore } = this.props;
    const {
      team_id,
      player_id,
      goal_time
    } =this.state;
    createGoal({
      match_id: livescore.id,
      team_id,
      player_id,
      goal_time
    })
  }

  handleCardSubmit = (event) => {
    event.preventDefault();
    const { createCard, livescore } = this.props;
    const {
      team_id,
      player_id,
      card_time,
      card_type
    } =this.state;

    console.log(card_type, "Card");

    console.log(card_type, "Card Type");
    createCard({
      match_id: livescore.id,
      team_id,
      player_id,
      card_time,
      card_type
    })
  }

  handleStartMatch = () => {
    const { editMatch, livescore } = this.props;
    editMatch(livescore.id, { started: true });
  }

  render() {
    const {
      listOfMatchs,
      getMatch,
      livescore,
      team,
      getGoal,
      getCard
    } = this.props;

    console.log(listOfMatchs);

    const seletablePlayer = team && team.players && team.players.map(player => ({
      value: player.id,
      label: player.name
    }));

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
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                {livescore ?
                  <div>
                    <MDBRow>
                      <MDBCol
                        md="5"
                        sm="5"
                        xs="5"
                        lg="5"
                        className="text-center"
                      >
                        <img style={{width: '50px', height: '50px'}} src={`${BACKEND_URL_IMAGE}/teams/${livescore.team_1 && livescore.team_1.image}`} alt={livescore.team_1 && livescore.team_1.name} />
                        <span>  {livescore.team_1 && livescore.team_1.name}</span>
                      </MDBCol>
                      <MDBCol
                        md="2"
                        sm="2"
                        xs="2"
                        lg="2"
                        className="text-center"
                      >
                        {livescore && livescore.started ? (
                          <span style={{fontSize: '24px'}}>{livescore.goals && livescore.goals.filter(goal => ((goal.team && goal.team.id) === livescore.team_one)).length} : {livescore.goals && livescore.goals.filter(goal => ((goal.team && goal.team.id) === livescore.team_two)).length}</span>
                        ) : <span style={{fontSize: '22px'}}> vs </span>}
                        
                      </MDBCol>
                      <MDBCol
                        md="5"
                        sm="5"
                        xs="5"
                        lg="5"
                        className="text-center"
                      >
                        <img style={{width: '50px', height: '50px'}} src={`${BACKEND_URL_IMAGE}/teams/${livescore.team_2 && livescore.team_2.image}`} alt={livescore.team_2 && livescore.team_2.name} />
                        <span>  {livescore.team_2 && livescore.team_2.name}</span>
                      </MDBCol>
                      <MDBCol
                        md="12"
                        className="text-center"
                      >
                        <span style={{fontSize: '14px'}}>Starting time: {livescore && moment(livescore.starting_time).format("ddd, MMM Do YYYY, h:mm:ss a")}</span>
                        {livescore && livescore.started ? null : <><br /><MDBBtn onClick={this.handleStartMatch} color="blue-grey" outline >Start Match</MDBBtn></>}
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
                        {livescore.goals && livescore.goals.filter(goal => ((goal.team && goal.team.id) === livescore.team_one)).length > 0 ? (<><h3>Goals</h3><hr /></>): null}
                        {livescore.goals && livescore.goals.length > 0 && livescore.goals.filter(goal => ((goal.team && goal.team.id) === livescore.team_one)).map(goal => (
                          <div key={goal.id}>
                            <p>
                              <img style={{width: '20px', height: '20px'}} src={`${BACKEND_URL_IMAGE}/players/${goal.player && goal.player.image}`} alt={goal.player && goal.player.name} /> 
                              <span>{goal.player && goal.player.name}  {goal.team && goal.team.id}</span>
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
                        {livescore.goals && livescore.goals.filter(goal => ((goal.team && goal.team.id) === livescore.team_two)).length > 0 ? (<><h3>Goals</h3><hr /></>): null}
                        {livescore.goals && livescore.goals.length > 0 && livescore.goals.filter(goal => ((goal.team && goal.team.id) === livescore.team_two)).map(goal => (
                          <div key={goal.id}>
                            <p>
                              <img style={{width: '20px', height: '20px'}} src={`${BACKEND_URL_IMAGE}/players/${goal.player && goal.player.image}`} alt={goal.player && goal.player.name} /> 
                              <span>{goal.player && goal.player.name}  {goal.team && goal.team.id}</span>
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
                        {livescore.cards && livescore.cards.filter(card => ((card.team && card.team.id) === livescore.team_one)).length > 0 ? (<><h3>Cards</h3><hr /></>): null}
                        {livescore.cards && livescore.cards.length > 0 && livescore.cards.filter(card => ((card.team && card.team.id) === livescore.team_one)).map(card => (
                          <div key={card.id}>
                            <p>
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
                        {livescore.cards && livescore.cards.filter(card => ((card.team && card.team.id) === livescore.team_two)).length > 0 ? (<><h3>Cards</h3><hr /></>): null}
                        {livescore.cards && livescore.cards.length > 0 && livescore.cards.filter(card => ((card.team && card.team.id) === livescore.team_two)).map(card => (
                          <div key={card.id}>
                            <p>
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
                  </div> : null}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        {
        livescore && !livescore.started ? null :
        <MDBRow style={{marginTop: '20px'}}>
          <MDBCol style={{marginBottom: '20px'}} md="6">
            <MDBCol md="12">
                  {
                    getGoal && getGoal.errors !== '' ? (
                      <div className="alert alert-danger" role="alert">
                        <strong>{`${getGoal.errors}`}</strong>
                      </div>
                    ) : null
                  }
                  {
                    getGoal && getGoal.message ? (
                      <div className="alert alert-success" role="alert">
                        <strong>{`${getGoal.message}`}</strong>
                      </div>
                    ) : null
                  }
            </MDBCol>
            <MDBCard>
              <MDBCardBody>
                <div className="text-center">
                  <h2>Add a goal</h2><hr />
                  <form onSubmit={this.handleGoalSubmit}>
                    <label>Select team</label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      onChange={this.handleTeamGoal}
                      name="color"
                      options={[
                        {
                          value: livescore.team_1 && livescore.team_1.id,
                          label: livescore.team_1 && livescore.team_1.name
                        },
                        {
                          value: livescore.team_2 && livescore.team_2.id,
                          label: livescore.team_2 && livescore.team_2.name
                        },
                      ]}
                    />
                    { this.state.isGoalPlayerToggled && (
                      <>
                        <label>Select Player</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          isDisabled={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          onChange={this.handlePlayerGoal}
                          name="color"
                          options={seletablePlayer}
                        />
                      </>
                    )}
                    <label>Goal Time</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={this.handleGoalTime}
                      value={this.state.goal_time}
                    />
                    <MDBBtn style={{width: '100%', margin: '10px 0 0 0'}} type="submit" color="dark-green">Add a Goal</MDBBtn>
                  </form>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol style={{marginBottom: '20px'}} md="6">
            <MDBCol md="12">
                  {
                    getCard && getCard.errors !== '' ? (
                      <div className="alert alert-danger" role="alert">
                        <strong>{`${getCard.errors}`}</strong>
                      </div>
                    ) : null
                  }
                  {
                    getCard && getCard.message ? (
                      <div className="alert alert-success" role="alert">
                        <strong>{`${getCard.message}`}</strong>
                      </div>
                    ) : null
                  }
            </MDBCol>
            <MDBCard>
              <MDBCardBody>
                <div className="text-center">
                  <h2>Add a card</h2><hr />
                  <form onSubmit={this.handleCardSubmit}>
                    <label>Select team</label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      onChange={this.handleTeamCard}
                      name="color"
                      options={[
                        {
                          value: livescore.team_1 && livescore.team_1.id,
                          label: livescore.team_1 && livescore.team_1.name
                        },
                        {
                          value: livescore.team_2 && livescore.team_2.id,
                          label: livescore.team_2 && livescore.team_2.name
                        },
                      ]}
                    />
                    { this.state.isCardPlayerToggled && (
                      <>
                        <label>Select Player</label>
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          isDisabled={false}
                          isClearable={false}
                          isRtl={false}
                          isSearchable={true}
                          onChange={this.handlePlayerCard}
                          name="color"
                          options={seletablePlayer}
                        />
                      </>
                    )}
                    <label>Card Type</label>
                    <select value={this.state.card_type} className="form-control" onChange={this.handleCardType}>
                      <option value="RED">RED CARD</option>
                      <option value="YELLOW">YELLOW CARD</option>
                    </select>
                    <label>Card Time</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={this.handleCardTime}
                      value={this.state.card_time}
                    />
                    <MDBBtn style={{width: '100%', margin: '10px 0 0 0'}} type="submit" color="deep-purple">Add a Card</MDBBtn>
                  </form>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        }
      </Dashboard>
    );
  }
}

const mapStateToProps = ({
  leagues,
  sports,
  teams,
  locations,
  players,
  matchs,
  match,
  team,
  goal,
  card
}) => ({
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
  livescore: match.match,
  getMatch: match.getMatch,
  team: team.team,
  getTeam: team.getTeam,
  goal: goal.goal,
  getGoal: goal.getGoal,
  card: card.card,
  getCard: card.getCard
});

const mapDispatchToProps = (dispatch) => ({
  getAllLeagues: (page, limit) => dispatch(getAllLeagues(page, limit)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  getAllPlayers: (page, limit) => dispatch(getAllPlayers(page, limit)),
  getAllSports: (page, limit) => dispatch(getAllSports(page, limit)),
  getAllLocations: (page, limit) => dispatch(getAllLocations(page, limit)),
  getAllMatchs: (page, limit) => dispatch(getAllMatchs(page, limit)),
  deleteMatch: (id) => dispatch(deleteMatch(id)),
  getSingleMatch: (id) => dispatch(getSingleMatch(id)),
  editMatch: (id, data) => dispatch(editMatch(id, data)),
  fetchTeam: (id) => dispatch(fetchTeam(id)),
  createGoal: (data) => dispatch(createGoal(data)),
  createCard: (data) => dispatch(createCard(data)),
  deleteGoal: (id) => dispatch(deleteGoal(id)),
  deleteCard: (id) => dispatch(deleteCard(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGoalCard);
