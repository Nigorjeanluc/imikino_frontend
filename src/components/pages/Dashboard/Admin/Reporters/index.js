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

import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
  BACKEND_URL_IMAGE,
  HEROKU_URL
} from '../../../../../redux/helpers/backendURLs';
import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import { getAllReporters } from '../../../../../redux/actions/users';
import {
  createUser,
} from '../../../../../redux/actions/user';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnUser from '../../../../utils/Dashboard/Buttons/EditBtn';

class UsersPage extends Component {
  state = {
    video_link: '',
    socket: openSocket(HEROKU_URL)
  }

  componentDidMount() {
    const {
      getAllReporters,
    } = this.props;
    getAllReporters(1, 10);

    const { socket } = this.state;
    socket.on('refreshUser', (data) => {
      getAllReporters(1, 10);
    });
  }

  handleChange = (event) => {
    this.setState({ video_link: event.target.value});
  }

  handleSubmit = (event) => {
    const { createUser } = this.props;
    createUser({ video_link: this.state.video_link });
    event.preventDefault();
  }

  nextPagination = (e) => {
    const { getAllUsers, Next } = this.props;
    if(e) {
      getAllUsers(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAllUsers, Previous } = this.props;
    if(e) {
      getAllUsers(Previous.page, 10);
    };
  }

  deleteLoc = (id) => {
    const { deleteUser } = this.props;
    deleteUser(id);
  }

  render() {
    const {
      listOfUsers,
      getUser,
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

    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Users" />
        <MDBRow>
          <MDBCol md="12">
            {
              getUser && getUser.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getUser.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getUser && getUser.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getUser.message}`}</strong>
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
                          listOfUsers && listOfUsers.map(video => (
                            <tr key={video.id}>
                              <td style={{fontSize: '16px'}}>{video.id}</td>
                              <td style={{fontSize: '16px'}}>{video.video_link}</td>
                              <td style={{fontSize: '16px'}}>{moment(video.updated_at).startOf('hour').fromNow()}</td>
                              <td>
                                {/* <EditBtnUser identify={video.id} videoData={video} /> */}
                                <DeleteBtn title="video" delete={() => this.deleteLoc(video.id)} />
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
                <h4>Add User</h4>
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="video">User video_link</label>
                    <input
                      style={{
                        height: '30px'
                      }}
                      onChange={this.handleChange}
                      value={this.state.video_link}
                      type="text"
                      className="form-control"
                      id="video"
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

const mapStateToProps = ({ users, user }) => ({
  Next: users.Next,
  Previous: users.Previous,
  errors: users.errors,
  loading: users.loading,
  listOfUsers: users.listOfUsers,
  listOfReporters: users.listOfReporters,
  getUsers: users.getUsers,
  profile: user.profile,
  getUser: user.getUser
});

const mapDispatchToProps = (dispatch) => ({
  getAllReporters: (page, limit) => dispatch(getAllReporters(page, limit)),
  createUser: (data) => dispatch(createUser(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
