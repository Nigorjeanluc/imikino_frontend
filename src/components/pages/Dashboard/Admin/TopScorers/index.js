import React, { Component } from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBCardHeader,
} from 'mdbreact';
import { connect } from 'react-redux';
import moment from 'moment';
import openSocket from 'socket.io-client';
import Select from 'react-select';

import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
  BACKEND_URL_IMAGE,
  HEROKU_URL
} from '../../../../../redux/helpers/backendURLs';
import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import { getAllTopScorers } from '../../../../../redux/actions/topScorers';
import { getAllPlayers } from '../../../../../redux/actions/players';
import {
  createTopScorer,
  editTopScorer,
  deleteTopScorer
} from '../../../../../redux/actions/topScorer';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
// import EditBtnTopScorer from '../../../../utils/Dashboard/Buttons/EditBtn';

class TopScoresPage extends Component {
  state = {
    name: '',
    player_id: 0,
    goals: 0,
    matchs: 0,
    socket: openSocket(HEROKU_URL)
  }

  componentDidMount() {
    const {
      getAllTopScorers,
      getAllPlayers
    } = this.props;
    getAllTopScorers(1, 10);
    getAllPlayers(1, 2000);

    const { socket } = this.state;
    socket.on('refreshTopScorer', (data) => {
      getAllTopScorers(1, 10);
    });
  }

  handleGoals = (event) => {
    this.setState({
      goals: event.value.target
    })
  }

  handleMatchs = (event) => {
    this.setState({
      matchs: event.value.target
    })
  }

  handlePlayer = (event) => {
    this.setState({
      player_id: event.value
    })
  }

  handleSubmit = (event) => {
    const { createTopScorer } = this.props;
    const {
      player_id,
      matchs,
      goals
    } = this.state;
    createTopScorer({
      player_id,
      matchs,
      goals
    });
    event.preventDefault();
  }

  nextPagination = (e) => {
    const { getAllTopScorers, Next } = this.props;
    if(e) {
      getAllTopScorers(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAllTopScorers, Previous } = this.props;
    if(e) {
      getAllTopScorers(Previous.page, 10);
    };
  }

  deleteTop = (id) => {
    const { deleteTopScorer } = this.props;
    deleteTopScorer(id);
  }

  render() {
    const {
      listOfTopScorers,
      listOfPlayers,
      getTopScorer,
      Next,
      Previous
    } = this.props;

    const currentPage = Next && !Next.page ? (
      Previous.page + 1
    ) : (
      Previous.page ? (
        Previous.page + 1
      ) : (
        Next.page - 1
      )
    );

    const seletablePlayer = listOfPlayers && listOfPlayers.map(player => ({
      value: player.id,
      label: player.name
    }));

    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Top Scorers" />
        <MDBRow>
          <MDBCol md="12">
            {
              getTopScorer && getTopScorer.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getTopScorer.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getTopScorer && getTopScorer.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getTopScorer.message}`}</strong>
                </div>
              ) : null
            }
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-4">
          <MDBCol md="6">
              <MDBCard>
                  <MDBCardBody>
                    <MDBTable hover>
                      <MDBTableHead color="blue-grey lighten-4">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Time</th>
                          <th>Control</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {
                          listOfTopScorers && listOfTopScorers.map(topScorer => (
                            <tr key={topScorer.id}>
                              <td style={{fontSize: '16px'}}>{topScorer.id}</td>
                              <td style={{fontSize: '16px'}}>{topScorer.player.name}</td>
                              <td style={{fontSize: '16px'}}>{moment(topScorer.updated_at).startOf('hour').fromNow()}</td>
                              <td>
                                {/* <EditBtnTopScorer identify={topScorer.id} topScorerData={topScorer} /> */}
                                <DeleteBtn title="topScorer" delete={() => this.deleteTop(topScorer.id)} />
                              </td>
                            </tr>
                          ))
                        }
                      </MDBTableBody>
                    </MDBTable>
                  </MDBCardBody>
              </MDBCard>
              <Pagination currentPage={currentPage} prevPagination={this.prevPagination} nextPagination={this.nextPagination} {...this.props} />
          </MDBCol>
          <MDBCol style={{fontSize: '16px'}} md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader>
                <h4>Add TopScorer</h4>
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label>Select Player</label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isDisabled={false}
                      isClearable={false}
                      isRtl={false}
                      isSearchable={true}
                      onChange={this.handlePlayer}
                      name="color"
                      options={seletablePlayer}
                    />
                    <label>Number of Goals</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={this.handleGoals}
                      value={this.state.goals}
                    />
                    <label>Number of Matchs</label>
                    <input
                      type="number"
                      className="form-control"
                      onChange={this.handleMatchs}
                      value={this.state.matchs}
                    />
                  </div>
                  <MDBBtn type="submit" flat color="indigo">Submit</MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ topScorers, topScorer, players }) => ({
  Next: topScorers.Next,
  Previous: topScorers.Previous,
  errors: topScorers.errors,
  loading: topScorers.loading,
  listOfTopScorers: topScorers.listOfTopScorers,
  getTopScorers: topScorers.getTopScorers,
  listOfPlayers: players.listOfPlayers,
  getPlayers: players.getPlayers,
  topScorer: topScorer.topScorer,
  getTopScorer: topScorer.getTopScorer
});

const mapDispatchToProps = (dispatch) => ({
  getAllTopScorers: (page, limit) => dispatch(getAllTopScorers(page, limit)),
  getAllPlayers: (page, limit) => dispatch(getAllPlayers(page, limit)),
  createTopScorer: (name) => dispatch(createTopScorer(name)),
  editTopScorer: (id, data) => dispatch(editTopScorer(id, data)),
  deleteTopScorer: (id) => dispatch(deleteTopScorer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopScoresPage);
