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

import {SOCKET_URL, HEROKU_URL} from '../../../../redux/helpers/backendURLs';

import { editLeague, fetchLeague } from '../../../../redux/actions/league';
import { getAllTeams } from '../../../../redux/actions/teams';

export class EditBtnLeague extends Component {
  state = {
    uploadPercentage: 0,
    modal: false,
    name: '',
    image: '',
    socket: openSocket(HEROKU_URL)
  }

  componentDidMount () {
    const { fetchLeague, identify, league, leagueData } = this.props;
    this.setState({
      name: leagueData.name,
      image: leagueData.image
    })
  }
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleChangeImage = (event) => {
    this.setState({ image: event.target.files[0] });
    console.log(this.state.image);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { editLeague, identify } = this.props;
    const { image, name, description, team_id, socket } = this.state;
    console.log(this.state);
    const formData = new FormData();
    if (image.name) {
      formData.append('image', image, image.name);
    } else {
      formData.append('image', image);
    }
    formData.append('name',name);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor( (loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if ( percent < 100) {
          this.setState({ uploadPercentage: percent });
        }
        this.setState({ uploadPercentage: percent });
        socket.emit('createLeague');
      }
    }

    const done = await editLeague(identify ,formData, options);
    if (done) {
      this.setState({ uploadPercentage: 100 });
      this.toggle();
    }
  }

  render() {
    const { listOfTeams, league, getLeague } = this.props;
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
        <MDBModalHeader toggle={this.toggle}>Edit League</MDBModalHeader>
        <form onSubmit={this.handleSubmit}>
        <MDBModalBody>
          {
            getLeague && getLeague.loading === true ? (
              <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                {this.state.uploadPercentage}%
              </MDBProgress>
            ) : null
          }
                  <div className="form-group">
                    <label htmlFor="league">League Image</label>
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
                          this.state.image && this.state.image.name ? this.state.image.name : (
                            this.state.image && !this.state.image.name ? this.state.image : 'Choose image'
                          )
                        }
                      </label>
                    </div>
                    <label htmlFor="league">League name</label>
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
                      id="league"
                    />
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

const mapStateToProps = ({ league, teams }) => ({
  errors: league.errors,
  loading: league.loading,
  league: league.league,
  getLeague: league.getLeague,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
});

const mapDispatchToProps = (dispatch) => ({
  editLeague: (id, data, options) => dispatch(editLeague(id, data, options)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  fetchLeague: (id) => dispatch(fetchLeague(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBtnLeague);
