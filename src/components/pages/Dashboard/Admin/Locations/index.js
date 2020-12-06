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

import {SOCKET_URL} from '../../../../../redux/helpers/backendURLs';
import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import { getAllLocations } from '../../../../../redux/actions/locations';
import {
  createLocation,
  editLocation,
  deleteLocation
} from '../../../../../redux/actions/location';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnLocation from '../../../../utils/Dashboard/Buttons/EditBtn';

class LocationsPage extends Component {
  state = {
    name: '',
    socket: openSocket(SOCKET_URL)
  }

  componentDidMount() {
    const {
      getAllLocations,
    } = this.props;
    getAllLocations(1, 10);

    const { socket } = this.state;
    socket.on('refreshLocation', (data) => {
      getAllLocations(1, 10);
    });
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value});
  }

  handleSubmit = (event) => {
    const { createLocation } = this.props;
    createLocation(this.state.name);
    event.preventDefault();
  }

  nextPagination = (e) => {
    const { getAllLocations, Next } = this.props;
    if(e) {
      getAllLocations(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAllLocations, Previous } = this.props;
    if(e) {
      getAllLocations(Previous.page, 10);
    };
  }

  deleteLoc = (id) => {
    const { deleteLocation } = this.props;
    deleteLocation(id);
  }

  render() {
    const {
      listOfLocations,
      getLocation,
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
        <BreadcrumSection pageTitle="Locations" />
        <MDBRow>
          <MDBCol md="12">
            {
              getLocation && getLocation.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getLocation.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getLocation && getLocation.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getLocation.message}`}</strong>
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
                          listOfLocations && listOfLocations.map(location => (
                            <tr key={location.id}>
                              <td style={{fontSize: '16px'}}>{location.id}</td>
                              <td style={{fontSize: '16px'}}>{location.name}</td>
                              <td style={{fontSize: '16px'}}>{moment(location.updated_at).startOf('hour').fromNow()}</td>
                              <td>
                                <EditBtnLocation identify={location.id} />
                                <DeleteBtn title="location" delete={() => this.deleteLoc(location.id)} />
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
                <h4>Add Location</h4>
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="location">Location name</label>
                    <input
                      style={{
                        height: '30px'
                      }}
                      onChange={this.handleChange}
                      value={this.state.name}
                      type="text"
                      className="form-control"
                      id="location"
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

const mapStateToProps = ({ locations, location }) => ({
  Next: locations.Next,
  Previous: locations.Previous,
  errors: locations.errors,
  loading: locations.loading,
  listOfLocations: locations.listOfLocations,
  getLocations: locations.getLocations,
  location: location.location,
  getLocation: location.getLocation
});

const mapDispatchToProps = (dispatch) => ({
  getAllLocations: (page, limit) => dispatch(getAllLocations(page, limit)),
  createLocation: (name) => dispatch(createLocation(name)),
  editLocation: (id, data) => dispatch(editLocation(id, data)),
  deleteLocation: (id) => dispatch(deleteLocation(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationsPage);
