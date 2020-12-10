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

import { editTeam, fetchTeam } from '../../../../redux/actions/team';
import { getAllTeams } from '../../../../redux/actions/teams';

export class EditBtnTeam extends Component {
  state = {
    uploadPercentage: 0,
    modal: false,
    name: '',
    image: '',
    socket: openSocket(HEROKU_URL)
  }

  componentDidMount () {
    const { fetchTeam, identify, team, teamData  } = this.props;
    this.setState({
      name: teamData.name,
      image: teamData.image
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
    const { editTeam, identify } = this.props;
    const { image, name, socket } = this.state;
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
        socket.emit('createTeam');
      }
    }

    const done = await editTeam(identify ,formData, options);
    if (done) {
      this.setState({ uploadPercentage: 100 });
      this.toggle();
    }
  }

  render() {
    const { listOfTeams, team, getTeam } = this.props;
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
        <MDBModalHeader toggle={this.toggle}>Edit Team</MDBModalHeader>
        <form onSubmit={this.handleSubmit}>
        <MDBModalBody>
          {
            getTeam && getTeam.loading === true ? (
              <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                {this.state.uploadPercentage}%
              </MDBProgress>
            ) : null
          }
                  <div className="form-group">
                    <label htmlFor="team">Team Image</label>
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
                    <label htmlFor="team">Team name</label>
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
                      id="team"
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

const mapStateToProps = ({ team, teams }) => ({
  errors: team.errors,
  loading: team.loading,
  team: team.team,
  getTeam: team.getTeam,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
});

const mapDispatchToProps = (dispatch) => ({
  editTeam: (id, data, options) => dispatch(editTeam(id, data, options)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  fetchTeam: (id) => dispatch(fetchTeam(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBtnTeam);
