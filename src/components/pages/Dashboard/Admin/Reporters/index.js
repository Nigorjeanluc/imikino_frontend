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
  deleteUser
} from '../../../../../redux/actions/user';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnUser from '../../../../utils/Dashboard/Buttons/EditBtn';

class UsersPage extends Component {
  state = {
    name: '',
    email: '',
    role: 'REPORTER',
    password: '',
    confirm: '',
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

  handleChangeName = (event) => {
    this.setState({ name: event.target.value});
  }

  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value});
  }
  
  handleChangeRole = (event) => {
    this.setState({ role: event.target.value});
  }
  
  handleChangePassword = (event) => {
    this.setState({ password: event.target.value});
  }
  
  handleChangeConfirm = (event) => {
    this.setState({ confirm: event.target.value});
  }

  handleSubmit = (event) => {
    const { createUser } = this.props;
    const {
      name,
      email,
      role,
      password,
      confirm
    } = this.state;
    createUser({
      name,
      profileImg: 'none',
      email,
      role,
      password
    });
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
      listOfReporters,
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
                          <th>Email</th>
                          <th>Role</th>
                          <th>Created At</th>
                          <th>Control</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {
                          listOfReporters && listOfReporters.map(reporter => (
                            <tr key={reporter.id}>
                              <td>{reporter.id}</td>
                              <td>{reporter.name}</td>
                              <td>{reporter.email}</td>
                              <td>{reporter.role}</td>
                              <td>{moment(reporter.updated_at).fromNow()}</td>
                              <td>
                                {/* <EditBtnUser identify={reporter.id} reporterData={reporter} /> */}
                                <DeleteBtn title="reporter" delete={() => this.deleteLoc(reporter.id)} />
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
                <h4>Add Reporter</h4>
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="video">Reporter Name</label>
                    <input
                      style={{
                        height: '30px'
                      }}
                      onChange={this.handleChangeName}
                      value={this.state.name}
                      type="text"
                      className="form-control"
                      id="video"
                    />
                    <label htmlFor="video">Reporter Email</label>
                    <input
                      style={{
                        height: '30px'
                      }}
                      onChange={this.handleChangeEmail}
                      value={this.state.email}
                      type="text"
                      className="form-control"
                      id="video"
                    />
                    <label>Role</label>
                    <select defaultValue={this.state.role} className="form-control" disabled>
                      <option value="REPORTER" selected>Reporter</option>
                    </select>
                    <label htmlFor="video">Password</label>
                    <input
                      style={{
                        height: '30px'
                      }}
                      onChange={this.handleChangePassword}
                      value={this.state.password}
                      type="password"
                      className="form-control"
                      id="video"
                    />
                    <label htmlFor="video">Confirm Password</label>
                    <input
                      style={{
                        height: '30px'
                      }}
                      onChange={this.handleChangeConfirm}
                      value={this.state.confirm}
                      type="password"
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
  deleteUser: (id) => dispatch(deleteUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersPage);
