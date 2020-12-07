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

import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
  BACKEND_URL_IMAGE
} from '../../../../../redux/helpers/backendURLs';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import { getAllTeams } from '../../../../../redux/actions/teams';
import { fetchTeam, deleteTeam, createTeam, editTeam } from '../../../../../redux/actions/team';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnTeam from '../../../../utils/Dashboard/Buttons/EditBtnTeam';

class TeamsPage extends Component {
  state = {
    uploadPercentage: 0,
    name: '',
    image: null,
    team_id: 0,
    description: '',
    socket: openSocket(SOCKET_URL)
  }

  componentDidMount() {
    const {
      getAllTeams
    } = this.props;
    getAllTeams(1, 10);

    const { socket } = this.state;
    socket.on('refreshTeam', (data) => {
      console.log('Yes IIIFafafa');
      getAllTeams(1, 10);
    });
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleChangeImage = (event) => {
    this.setState({ image: event.target.files[0] });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { createTeam } = this.props;
    const { image, name, socket } = this.state;
    const formData = new FormData();
    formData.append('image',image, image.name);
    formData.append('name',name);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor( (loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent });
        }
        this.setState({ uploadPercentage: percent });
        socket.emit('createTeam');
      }
    }

    createTeam(formData, options);
  }

  nextPagination = (e) => {
    const { getAllTeams, Next } = this.props;
    if(e) {
      getAllTeams(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAllTeams, Previous } = this.props;
    if(e) {
      getAllTeams(Previous.page, 10);
    };
  }

  deleteLeag = (id) => {
    const { deleteTeam } = this.props;
    deleteTeam(id);
  }

  render() {
    const {
      listOfTeams,
      Next,
      Previous,
      getTeam
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
        <BreadcrumSection pageTitle="Teams" />
        <MDBRow>
          <MDBCol md="12">
            {
              getTeam && getTeam.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getTeam.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getTeam && getTeam.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getTeam.message}`}</strong>
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
                          listOfTeams && listOfTeams.map(team => (
                            <tr key={team.id}>
                              <td style={{fontSize: '16px'}}>{team.id}</td>
                              <td style={{fontSize: '16px'}}>
                                <img className='img-responsive' src={`${BACKEND_URL_IMAGE}/teams/${team.image}`}  alt="teamImg"/> {team.name}
                              </td>
                              <td style={{fontSize: '16px'}}>{moment(team.updated_at).startOf('hour').fromNow()}</td>
                              <td>
                                <EditBtnTeam identify={team.id} {...this.props} />
                                <DeleteBtn title="team" delete={() => this.deleteLeag(team.id)} />
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
                <h4>Add Team</h4>
              </MDBCardHeader>
              <MDBCardBody>
                {
                  getTeam && getTeam.loading === true ? (
                    <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                      {this.state.uploadPercentage}%
                    </MDBProgress>
                  ) : null
                }
                <form ref="form" onSubmit={this.handleSubmit}>
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
                          this.state.image ? this.state.image.name : 'Choose image'
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

const mapStateToProps = ({ teams, team }) => ({
  Next: teams.Next,
  Previous: teams.Previous,
  errors: teams.errors,
  loading: teams.loading,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
  team: team.team,
  getTeam: team.getTeam,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  createTeam: (name, options) => dispatch(createTeam(name, options)),
  editTeam: (id, data) => dispatch(editTeam(id, data)),
  deleteTeam: (id) => dispatch(deleteTeam(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsPage);
