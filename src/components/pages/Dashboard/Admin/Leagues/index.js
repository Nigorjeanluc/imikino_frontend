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
  BACKEND_URL_IMAGE,
  HEROKU_URL
} from '../../../../../redux/helpers/backendURLs';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import { getAllLeagues } from '../../../../../redux/actions/leagues';
import { getAllTeams } from '../../../../../redux/actions/teams';
import { fetchLeague, deleteLeague, createLeague, editLeague } from '../../../../../redux/actions/league';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnLeague from '../../../../utils/Dashboard/Buttons/EditBtnLeague';

class LeaguesPage extends Component {
  state = {
    uploadPercentage: 0,
    name: '',
    image: null,
    team_id: 0,
    description: '',
    socket: openSocket(HEROKU_URL)
  }

  componentDidMount() {
    const {
      getAllLeagues
    } = this.props;
    getAllLeagues(1, 10);

    const { socket } = this.state;
    socket.on('refreshLeague', (data) => {
      console.log('Yes III');
      getAllLeagues(1, 10);
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
    const { createLeague } = this.props;
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
        socket.emit('createLeague');
      }
    }

    createLeague(formData, options);
  }

  nextPagination = (e) => {
    const { getAllLeagues, Next } = this.props;
    if(e) {
      getAllLeagues(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAllLeagues, Previous } = this.props;
    if(e) {
      getAllLeagues(Previous.page, 10);
    };
  }

  deleteLeag = (id) => {
    const { deleteLeague } = this.props;
    deleteLeague(id);
  }

  render() {
    const {
      listOfLeagues,
      Next,
      Previous,
      getLeague
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
        <BreadcrumSection pageTitle="Leagues" />
        <MDBRow>
          <MDBCol md="12">
            {
              getLeague && getLeague.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getLeague.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getLeague && getLeague.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getLeague.message}`}</strong>
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
                          listOfLeagues && listOfLeagues.map(league => (
                            <tr key={league.id}>
                              <td style={{fontSize: '16px'}}>{league.id}</td>
                              <td style={{fontSize: '16px'}}>
                                <img className='img-responsive' src={`${BACKEND_URL_IMAGE}/leagues/${league.image}`}  alt="leagueImg"/> {league.name}
                              </td>
                              <td style={{fontSize: '16px'}}>{moment(league.updated_at).fromNow()}</td>
                              <td>
                                <EditBtnLeague identify={league.id} leagueData={league} {...this.props} />
                                <DeleteBtn title="league" delete={() => this.deleteLeag(league.id)} />
                                <MDBBtn href={`/admin/tables/${league.id}`} color="dark-green" >Standings</MDBBtn>
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
                <h4>Add League</h4>
              </MDBCardHeader>
              <MDBCardBody>
                {
                  getLeague && getLeague.loading === true ? (
                    <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                      {this.state.uploadPercentage}%
                    </MDBProgress>
                  ) : null
                }
                <form ref="form" onSubmit={this.handleSubmit}>
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
                          this.state.image ? this.state.image.name : 'Choose image'
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

const mapStateToProps = ({ leagues, league }) => ({
  Next: leagues.Next,
  Previous: leagues.Previous,
  errors: leagues.errors,
  loading: leagues.loading,
  listOfLeagues: leagues.listOfLeagues,
  getLeagues: leagues.getLeagues,
  league: league.league,
  getLeague: league.getLeague,
});

const mapDispatchToProps = (dispatch) => ({
  getAllLeagues: (page, limit) => dispatch(getAllLeagues(page, limit)),
  createLeague: (name, options) => dispatch(createLeague(name, options)),
  editLeague: (id, data) => dispatch(editLeague(id, data)),
  deleteLeague: (id) => dispatch(deleteLeague(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LeaguesPage);
