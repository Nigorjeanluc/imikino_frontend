import React, { Component } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBProgress
} from 'mdbreact';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import {SOCKET_URL} from '../../../../redux/helpers/backendURLs';

import { editPlayer, fetchPlayer } from '../../../../redux/actions/player';
import { getAllTeams } from '../../../../redux/actions/teams';

export class EditBtnPlayer extends Component {
  state = {
    uploadPercentage: 0,
    modal: false,
    name: '',
    image: '',
    team_id: 0,
    description: '',
    socket: openSocket(SOCKET_URL)
  }

  componentDidMount () {
    const { fetchPlayer, identify, player } = this.props;
    if(this.state.modal) {
      fetchPlayer(identify);
      this.setState({
        name: player.name
      })
    }
  }
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleChangeTeam = (event) => {
    console.log(event.target.value)
    this.setState({ team_id: event.target.value });
  }

  handleChangeImage = (event) => {
    this.setState({ image: event.target.files[0] });
    console.log(this.state.image);
  }

  handleChangeDesc = (event) => {
    this.setState({ description: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { editPlayer, identify } = this.props;
    const { image, name, description, team_id, socket } = this.state;
    console.log(this.state);
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

        if ( percent < 100) {
          this.setState({ uploadPercentage: percent });
        }
        this.setState({ uploadPercentage: percent });
        socket.emit('createPlayer');
      }
    }

    const done = await editPlayer(identify ,formData, options);
    if (done) {
      this.setState({ uploadPercentage: 100 });
      this.toggle();
    }
  }

  render() {
    const { listOfTeams, player, getPlayer } = this.props;
    return (
    <>
      <MDBBtn
        style={{
          borderRadius: '50%',
          paddingLeft: '10px',
          paddingRight: '8px'
        }}
        outline
        color="info"
        onClick={this.toggle}
      >
        <MDBIcon size="2x" icon="edit"/>
      </MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Edit Player</MDBModalHeader>
        <form onSubmit={this.handleSubmit}>
        <MDBModalBody>
          {
            getPlayer && getPlayer.loading === true ? (
              <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                {this.state.uploadPercentage}%
              </MDBProgress>
            ) : null
          }
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
                      value={player.name}
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
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="danger" onClick={this.toggle}>Cancel</MDBBtn>
          <MDBBtn type="submit" color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
        </form>
      </MDBModal>
    </>
    );
  }
}

const mapStateToProps = ({ player, teams }) => ({
  errors: player.errors,
  loading: player.loading,
  player: player.player,
  getPlayer: player.getPlayer,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
});

const mapDispatchToProps = (dispatch) => ({
  editPlayer: (id, data, options) => dispatch(editPlayer(id, data, options)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  fetchPlayer: (id) => dispatch(fetchPlayer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBtnPlayer);
