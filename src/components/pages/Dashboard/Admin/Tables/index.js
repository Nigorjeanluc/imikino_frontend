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
import { getAllTables } from '../../../../../redux/actions/tables';
import { getAllTeams } from '../../../../../redux/actions/teams';
import { fetchTable, deleteTable, createTable, editTable } from '../../../../../redux/actions/table';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnTable from '../../../../utils/Dashboard/Buttons/EditBtnTable';

class TablesPage extends Component {
  state = {
    uploadPercentage: 0,
    pts: 0,
    gd: 0,
    ga: 0,
    gf: 0,
    l: 0,
    w: 0,
    d: 0,
    pg: 0,
    image: 0,
    team_id: 0,
    socket: openSocket(HEROKU_URL)
  }

  componentDidMount() {
    const {
      getAllTables,
      getAllTeams,
      match
    } = this.props;
    getAllTables(match.params.league_id, 1, 1000);
    getAllTeams(1, 1000);

    const { socket } = this.state;
    socket.on('refreshTable', (data) => {
      console.log('Yes III');
      getAllTables(match.params.league_id, 1, 1000);
    });
  }

  handleChangePTS = (event) => {
    this.setState({ pts: event.target.value });
  }

  handleChangeGD = (event) => {
    this.setState({ gd: event.target.value });
  }
  
  handleChangeGA = (event) => {
    this.setState({ ga: event.target.value });
  }
  
  handleChangeGF = (event) => {
    this.setState({ gf: event.target.value });
  }

  handleChangeL = (event) => {
    this.setState({ l: event.target.value });
  }

  handleChangeD = (event) => {
    this.setState({ d: event.target.value });
  }

  handleChangeW = (event) => {
    this.setState({ w: event.target.value });
  }

  handleChangePG = (event) => {
    this.setState({ pg: event.target.value });
  }

  handleChangeTeam = (event) => {
    this.setState({ team_id: event.target.value });
    console.log("Team ID", this.state.team_id);
  }

  handleSubmit = (event) => {
    const { createTable, match } = this.props;
    const {
      team_id,
      pg,
      pts,
      ga,
      gd,
      gf,
      w,
      l,
      d
    } = this.state;
    console.log(this.state)
    createTable(match.params.league_id, {
      team_id: parseInt(team_id, 10),
      Pg: pg,
      PTS: pts,
      GA: ga,
      GD: gd,
      GF: gf,
      W: w,
      L: l,
      D: d
    });
    event.preventDefault();
  }

  nextPagination = (e) => {
    const { getAllTables, Next, match } = this.props;
    if(e) {
      getAllTables(match.params.league_id, Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAllTables, Previous, match } = this.props;
    if(e) {
      getAllTables(match.params.league_id, Previous.page, 10);
    };
  }

  deleteLeag = (id) => {
    const { deleteTable } = this.props;
    deleteTable(id);
  }

  render() {
    const {
      listOfTables,
      listOfTeams,
      Next,
      Previous,
      getTable
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
        <BreadcrumSection pageTitle="Tables" />
        <MDBRow>
          <MDBCol md="12">
            {
              getTable && getTable.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getTable.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getTable && getTable.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getTable.message}`}</strong>
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
                          <th>Team</th>
                          <th>Pg</th>
                          <th>W</th>
                          <th>D</th>
                          <th>L</th>
                          <th>GF</th>
                          <th>GA</th>
                          <th>GD</th>
                          <th>PTS</th>
                          <th>Time</th>
                          <th>Control</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {
                          listOfTables && listOfTables.map(table => (
                            <tr style={{height: '50px'}} key={table.id}>
                              <td style={{fontSize: '16px'}}>
                                <img className='img-responsive' style={{width: '25px', height: '25px'}} src={`${BACKEND_URL_IMAGE}/teams/${table.team.image}`}  alt="tableImg"/> {table.team.name}
                              </td>
                              <td style={{fontSize: '16px'}}>{table.Pg}</td>
                              <td style={{fontSize: '16px'}}>{table.W}</td>
                              <td style={{fontSize: '16px'}}>{table.D}</td>
                              <td style={{fontSize: '16px'}}>{table.L}</td>
                              <td style={{fontSize: '16px'}}>{table.GF}</td>
                              <td style={{fontSize: '16px'}}>{table.GA}</td>
                              <td style={{fontSize: '16px'}}>{table.GD}</td>
                              <td style={{fontSize: '16px'}}>{table.PTS}</td>
                              <td style={{fontSize: '16px'}}>{moment(table.updated_at).startOf('hour').fromNow()}</td>
                              <td>
                                <EditBtnTable identify={table.id} tableData={table} {...this.props} />
                                <DeleteBtn title="table" delete={() => this.deleteLeag(table.id)} />
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
                <h4>Add Standing</h4>
              </MDBCardHeader>
              <MDBCardBody>
                {
                  getTable && getTable.loading === true ? (
                    <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                      {this.state.uploadPercentage}%
                    </MDBProgress>
                  ) : null
                }
                <form ref="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="player">Select the team</label>
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
                    <MDBRow>
                      <MDBCol md="6">
                        <label htmlFor="pts">PTS</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangePTS}
                          value={this.state.pts}
                          type="text"
                          name="pts"
                          className="form-control"
                          id="pts"
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="gd">GD</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeGD}
                          value={this.state.gd}
                          type="text"
                          name="gd"
                          className="form-control"
                          id="gd"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="6">
                        <label htmlFor="ga">GA</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeGA}
                          value={this.state.ga}
                          type="text"
                          name="ga"
                          className="form-control"
                          id="ga"
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="gf">GF</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeGF}
                          value={this.state.gf}
                          type="text"
                          name="gf"
                          className="form-control"
                          id="gf"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="6">
                        <label htmlFor="l">L</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeL}
                          value={this.state.l}
                          type="text"
                          name="l"
                          className="form-control"
                          id="l"
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="d">D</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeD}
                          value={this.state.d}
                          type="text"
                          name="d"
                          className="form-control"
                          id="d"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="6">
                        <label htmlFor="w">W</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeW}
                          value={this.state.w}
                          type="text"
                          name="w"
                          className="form-control"
                          id="w"
                        />
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="pg">PG</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangePG}
                          value={this.state.pg}
                          type="text"
                          name="pg"
                          className="form-control"
                          id="pg"
                        />
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <MDBBtn type="submit" flat color="indigo">Submit</MDBBtn>
                </form>
                {/* <form ref="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="table">Table Image</label>
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
                    <label htmlFor="table">Table name</label>
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
                      id="table"
                    />
                  </div>
                  <MDBBtn type="submit" flat color="indigo">Submit</MDBBtn>
                </form> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ tables, teams, table }) => ({
  Next: tables.Next,
  Previous: tables.Previous,
  errors: tables.errors,
  loading: tables.loading,
  listOfTables: tables.listOfTables,
  getTables: tables.getTables,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
  table: table.table,
  getTable: table.getTable,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTables: (league_id, page, limit) => dispatch(getAllTables(league_id, page, limit)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  createTable: (name, options) => dispatch(createTable(name, options)),
  editTable: (id, data) => dispatch(editTable(id, data)),
  deleteTable: (id) => dispatch(deleteTable(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TablesPage);
