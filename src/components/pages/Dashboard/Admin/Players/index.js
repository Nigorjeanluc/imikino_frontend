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
  MDBProgress
} from 'mdbreact';
import { connect } from 'react-redux';
import moment from 'moment';
import openSocket from 'socket.io-client';

import {SOCKET_URL} from '../../../../../redux/helpers/backendURLs';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import { getAllPlayers } from '../../../../../redux/actions/players';
import { getAllTeams } from '../../../../../redux/actions/teams';
import { fetchPlayer, deletePlayer, createPlayer, editPlayer } from '../../../../../redux/actions/player';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnPlayer from '../../../../utils/Dashboard/Buttons/EditBtnPlayer';

class PlayersPage extends Component {
  state = {
    uploadPercentage: 0,
    name: '',
    image: null,
    socket: openSocket(SOCKET_URL)
  }

  componentDidMount() {
    const {
      getAllPlayers,
      getAllTeams
    } = this.props;
    getAllTeams(1, 2000);
    getAllPlayers(1, 10);

    const { socket } = this.state;
    socket.on('refreshPlayer', (data) => {
      console.log('Yes II');
      getAllPlayers(1, 10);
    });
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleChangeTeam = (event) => {
    this.setState({ team_id: event.target.value });
  }

  handleChangeImage = (event) => {
    this.setState({ image: event.target.files[0] });
  }

  handleChangeDesc = (event) => {
    this.setState({ description: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { createPlayer } = this.props;
    const { image, name, description, team_id, socket } = this.state;
    const formData = new FormData();
    formData.append('image',image, image.name);
    formData.append('name',name);
    formData.append('description',description);
    formData.append('team_id',team_id);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor( (loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent });
        }
        this.setState({ uploadPercentage: percent });
        socket.emit('createPlayer');
      }
    }

    createPlayer(formData, options);
  }

  nextPagination = (e) => {
    const { getAllPlayers, Next } = this.props;
    if(e) {
      getAllPlayers(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAllPlayers, Previous } = this.props;
    if(e) {
      getAllPlayers(Previous.page, 10);
    };
  }

  deletePlay = (id) => {
    const { deletePlayer } = this.props;
    deletePlayer(id);
  }

  render() {
    const {
      listOfPlayers,
      listOfTeams,
      Next,
      Previous,
      getPlayer
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

    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Players" />
        <MDBRow>
          <MDBCol md="12">
            {
              getPlayer && getPlayer.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getPlayer.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getPlayer && getPlayer.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getPlayer.message}`}</strong>
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
                          <th>Team</th>
                          <th>Time</th>
                          <th>Control</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {
                          listOfPlayers && listOfPlayers.map(player => (
                            <tr key={player.id}>
                              <td style={{fontSize: '16px'}}>{player.id}</td>
                              <td style={{fontSize: '16px'}}>
                                <img className='img-responsive' src={`${SOCKET_URL}/uploads/players/${player.image}`}  alt="playerImg"/> {player.name}
                              </td>
                              <td style={{fontSize: '16px'}}>{player.team.name}</td>
                              <td style={{fontSize: '16px'}}>{moment(player.updated_at).startOf('hour').fromNow()}</td>
                              <td>
                                <EditBtnPlayer identify={player.id} {...this.props} />
                                <DeleteBtn title="player" delete={() => this.deletePlay(player.id)} />
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
                <h4>Add Player</h4>
              </MDBCardHeader>
              <MDBCardBody>
                {
                  getPlayer && getPlayer.loading === true ? (
                    <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                      {this.state.uploadPercentage}%
                    </MDBProgress>
                  ) : null
                }
                <form ref="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="player">Player Image</label>
                    <div style={{marginBottom: '10px'}} className="custom-file">
                      <input
                        onChange={this.handleChangeImage}
                        type="file"
                        className="custom-file-input"
                        id="image"
                        name="image"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label className="custom-file-label" htmlFor="image">
                        {
                          this.state.image ? this.state.image.name : 'Choose image'
                        }
                      </label>
                    </div>
                    <label htmlFor="player">Player name</label>
                    <input
                      style={{
                        height: '30px',
                        marginBottom: '10px'
                      }}
                      onChange={this.handleChangeName}
                      value={this.state.name}
                      type="text"
                      name="name"
                      className="form-control"
                      id="player"
                    />
                    <label htmlFor="player">Select player's team</label>
                    <div>
                      <select
                        onChange={this.handleChangeTeam}
                        value={this.state.team_id}
                        style={{height: '30px', fontSize: '14px'}}
                        className="browser-default custom-select"
                        name="team_id"
                      >
                        <option>Choose team</option>
                        {listOfTeams && listOfTeams.map(team => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="5"
                        name="description"
                      />
                    </div>
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

const mapStateToProps = ({ players, player, teams }) => ({
  Next: players.Next,
  Previous: players.Previous,
  errors: players.errors,
  loading: players.loading,
  listOfPlayers: players.listOfPlayers,
  getPlayers: players.getPlayers,
  player: player.player,
  getPlayer: player.getPlayer,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
});

const mapDispatchToProps = (dispatch) => ({
  getAllPlayers: (page, limit) => dispatch(getAllPlayers(page, limit)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  createPlayer: (name, options) => dispatch(createPlayer(name, options)),
  editPlayer: (id, data) => dispatch(editPlayer(id, data)),
  deletePlayer: (id) => dispatch(deletePlayer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayersPage);
