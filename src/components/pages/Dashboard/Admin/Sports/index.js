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
  MDBCardHeader
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
import { getAllSports } from '../../../../../redux/actions/sports';
import { fetchSport, deleteSport, createSport, editSport } from '../../../../../redux/actions/sport';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnSport from '../../../../utils/Dashboard/Buttons/EditBtnSport';
class SportsPage extends Component {
  state = {
    name: '',
    socket: openSocket(SOCKET_URL)
  }
  
  componentDidMount() {
    const {
      getAllSports,
    } = this.props;
    getAllSports(1, 10);

    const { socket } = this.state;
    socket.on('refreshSport', (data) => {
      getAllSports(1, 10);
    });
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value});
  }

  handleSubmit = (event) => {
    const { createSport } = this.props;
    createSport(this.state.name);
    event.preventDefault();
  }

  nextPagination = (e) => {
    const { getAllSports, Next } = this.props;
    if(e) {
      getAllSports(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAllSports, Previous } = this.props;
    if(e) {
      getAllSports(Previous.page, 10);
    };
  }

  deleteSpo = (id) => {
    const { deleteSport } = this.props;
    deleteSport(id);
  }

  render() {
    const {
      listOfSports,
      Next,
      Previous,
      getSport
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
        <BreadcrumSection pageTitle="Sports" />
        <MDBRow>
          <MDBCol md="12">
            {
              getSport && getSport.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getSport.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getSport && getSport.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getSport.message}`}</strong>
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
                          listOfSports && listOfSports.map(sport => (
                            <tr key={sport.id}>
                              <td style={{fontSize: '16px'}}>{sport.id}</td>
                              <td style={{fontSize: '16px'}}>{sport.name}</td>
                              <td style={{fontSize: '16px'}}>{moment(sport.updated_at).startOf('hour').fromNow()}</td>
                              <td>
                                <EditBtnSport identify={sport.id} />
                                <DeleteBtn title="sport" delete={() => this.deleteSpo(sport.id)} />
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
                <h4>Add Sport</h4>
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="sport">Sport name</label>
                    <input
                      style={{
                        height: '30px'
                      }}
                      onChange={this.handleChange}
                      value={this.state.name}
                      type="text"
                      className="form-control"
                      id="sport"
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

const mapStateToProps = ({ sports, sport }) => ({
  Next: sports.Next,
  Previous: sports.Previous,
  errors: sports.errors,
  loading: sports.loading,
  listOfSports: sports.listOfSports,
  getSports: sports.getSports,
  sport: sport.sport,
  getSport: sport.getSport
});

const mapDispatchToProps = (dispatch) => ({
  getAllSports: (page, limit) => dispatch(getAllSports(page, limit)),
  createSport: (name) => dispatch(createSport(name)),
  createSport: (name) => dispatch(createSport(name)),
  editSport: (id, data) => dispatch(editSport(id, data)),
  deleteSport: (id) => dispatch(deleteSport(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SportsPage);
