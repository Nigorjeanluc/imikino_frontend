import React, { Component } from 'react';
import {
  MDBCol,
  MDBRow,
  MDBBadge,
  MDBCardBody,
  MDBCard,
  MDBProgress,
  MDBBtn,
} from 'mdbreact';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import {SOCKET_URL} from '../../../../../redux/helpers/backendURLs';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import { createMatch } from '../../../../../redux/actions/match';
import { getAllLeagues } from '../../../../../redux/actions/leagues';
import { getAllLocations } from '../../../../../redux/actions/locations';
import { getAllTags } from '../../../../../redux/actions/tags';
import { getAllTeams } from '../../../../../redux/actions/teams';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AddMatch extends Component {
  state = {
    uploadPercentage: 0,
    team_one: 0,
    team_two: 0,
    location_id: 0,
    league_id: 0,
    stadium: '',
    starting_time: null,
    started: false,
    paused: false,
    socket: openSocket(SOCKET_URL),
  }

  componentDidMount() {
    const {
      getAllLeagues,
      getAllLocations,
      getAllTags,
      getAllTeams
    } = this.props;
    getAllLeagues(1, 2000);
    getAllLocations(1, 2000);
    getAllTags(1, 2000);
    getAllTeams(1, 2000);
  }


  handleChangeTeamOne = (event) => {
    this.setState({ team_one: event.target.value });
  }

  handleChangeTeamTwo = (event) => {
    this.setState({ team_two: event.target.value });
  }

  handleChangeLocation = (event) => {
    this.setState({ location_id: event.target.value });
  }

  handleChangeLeague = (event) => {
    this.setState({ league_id: event.target.value });
  }

  handleChangeStadium = (event) => {
    this.setState({ stadium: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { createMatch } = this.props;
    const {
      team_one,
      team_two,
      location_id,
      stadium,
      starting_time,
      started,
      paused,
      league_id,
      socket,
    } = this.state;

    createMatch({
      team_one,
      team_two,
      location_id,
      stadium,
      starting_time,
      started,
      paused,
      league_id: parseInt(league_id, 10),
    });
  }

  render() {
    const {
      listOfLocations,
      listOfLeagues,
      listOfTags,
      listOfTeams,
      getLocations,
      getLeagues,
      getTags,
      getPost,
      getTeams
    } = this.props;

    const {
      editorState
    } = this.state;

    const options = listOfTags && listOfTags.map(tag => {
      return {
        label: tag.name,
        value: tag.id
      }
    });

    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Add Match" />
        <MDBRow>
          <MDBCol md="12">
            {
              getPost && getPost.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getPost.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getPost && getPost.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getPost.message}`}</strong>
                </div>
              ) : null
            }
          </MDBCol>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                {
                  getPost && getPost.loading === true ? (
                    <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                      {this.state.uploadPercentage}%
                    </MDBProgress>
                  ) : null
                }
                <form ref="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                  <MDBRow
                      style={{
                        marginBottom: '20px'
                      }}
                    >
                      <MDBCol md="6">
                        <label htmlFor="team_one">Select team one</label>
                        <div>
                          <select
                            onChange={this.handleChangeTeamOne}
                            value={this.state.team_one}
                            style={{height: '30px', fontSize: '14px'}}
                            className="browser-default custom-select"
                            name="team_one"
                          >
                            <option>Choose Team One</option>
                            {listOfTeams && listOfTeams.map(team => (
                              <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="team_two">Select team two</label>
                        <div>
                          <select
                            onChange={this.handleChangeTeamTwo}
                            value={this.state.team_two}
                            style={{height: '30px', fontSize: '14px'}}
                            className="browser-default custom-select"
                            name="team_two"
                          >
                            <option>Choose team two</option>
                            {listOfTeams && listOfTeams.map(team => (
                              <option key={team.id} value={team.id}>{team.name}</option>
                            ))}
                          </select>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow
                      style={{
                        marginBottom: '20px'
                      }}
                    >
                      <MDBCol md="6">
                        <label htmlFor="location">Select location</label>
                        <div>
                          <select
                            onChange={this.handleChangeLocation}
                            value={this.state.location_id}
                            style={{height: '30px', fontSize: '14px'}}
                            className="browser-default custom-select"
                            name="location_id"
                          >
                            <option>Choose location</option>
                            {listOfLocations && listOfLocations.map(location => (
                              <option key={location.id} value={location.id}>{location.name}</option>
                            ))}
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="league">Select league</label>
                        <div>
                          <select
                            onChange={this.handleChangeLeague}
                            value={this.state.league_id}
                            style={{height: '30px', fontSize: '14px'}}
                            className="browser-default custom-select"
                            name="league_id"
                          >
                            <option>Choose league</option>
                            {listOfLeagues && listOfLeagues.map(league => (
                              <option key={league.id} value={league.id}>{league.name}</option>
                            ))}
                          </select>
                        </div>
                      </MDBCol>
                      <MDBCol md="12">
                        <label htmlFor="stadium">Stadium</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeStadium}
                          value={this.state.stadium}
                          type="text"
                          name="stadium"
                          className="form-control"
                          id="stadium"
                        />
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBBtn size="lg" style={{width: '100%'}} type="submit" color="indigo">Save post</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ sports, locations, tags, post, teams, leagues }) => ({
  listOfSports: sports.listOfSports,
  getSports: sports.getSports,
  listOfLocations: locations.listOfLocations,
  getLocations: locations.getLocations,
  listOfTags: tags.listOfTags,
  getTags: tags.getTags,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
  listOfLeagues: leagues.listOfLeagues,
  getLeagues: leagues.getLeagues,
  post: post.post,
  getPost: post.getPost
});

const mapDispatchToProps = (dispatch) => ({
  getAllLeagues: (page, limit) => dispatch(getAllLeagues(page, limit)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  getAllLocations: (page, limit) => dispatch(getAllLocations(page, limit)),
  getAllTags: (page, limit) => dispatch(getAllTags(page, limit)),
  createMatch: (data) => dispatch(createMatch(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddMatch);
