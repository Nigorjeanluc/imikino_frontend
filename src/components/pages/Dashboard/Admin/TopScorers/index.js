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
import { getAllTopScorers } from '../../../../../redux/actions/topScorers';
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
    socket: openSocket(HEROKU_URL)
  }

  componentDidMount() {
    const {
      getAllTopScorers,
    } = this.props;
    getAllTopScorers(1, 10);

    const { socket } = this.state;
    socket.on('refreshTopScorer', (data) => {
      getAllTopScorers(1, 10);
    });
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value});
  }

  handleSubmit = (event) => {
    const { createTopScorer } = this.props;
    createTopScorer(this.state.name);
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
                    <label htmlFor="location">TopScorer name</label>
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

const mapStateToProps = ({ topScorers, topScorer }) => ({
  Next: topScorers.Next,
  Previous: topScorers.Previous,
  errors: topScorers.errors,
  loading: topScorers.loading,
  listOfTopScorers: topScorers.listOfTopScorers,
  getTopScorers: topScorers.getTopScorers,
  topScorer: topScorer.topScorer,
  getTopScorer: topScorer.getTopScorer
});

const mapDispatchToProps = (dispatch) => ({
  getAllTopScorers: (page, limit) => dispatch(getAllTopScorers(page, limit)),
  createTopScorer: (name) => dispatch(createTopScorer(name)),
  editTopScorer: (id, data) => dispatch(editTopScorer(id, data)),
  deleteTopScorer: (id) => dispatch(deleteTopScorer(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopScoresPage);
