import React, { Component } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBProgress,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';
import { connect } from 'react-redux';

import { editTable, fetchTable } from '../../../../redux/actions/table';
import { getAllTeams } from '../../../../redux/actions/teams';

export class EditBtnTable extends Component {
  state = {
    modal: false,
    pts: null,
    gd: null,
    ga: null,
    gf: null,
    l: null,
    w: null,
    d: null,
    pg: null,
  }

  componentDidMount () {
    const { fetchTable, identify, table, match } = this.props;
    if(this.state.modal) {
      fetchTable(match.params.league_id);
      this.setState({
        team_id: table.team_id,
        pg: table.Pg,
        pts: table.PTS,
        ga: table.GA
      })
    }
  }
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
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

  // handleChangeTeam = (event) => {
  //   this.setState({ team_id: event.target.value });
  // }

  handleSubmit = (event) => {
    const { editTable, match, identify } = this.props;
    const {
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
    editTable(match.params.league_id, {
      team_id: identify,
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
    this.toggle();
  }

  // handleChange = (event) => {
  //   this.setState({ name: event.target.value});
  // }

  // handleSubmit = (event) => {
  //   const { editTable, identify } = this.props;
  //   editTable(identify, this.state.name);
  //   event.preventDefault();
  //   this.toggle();
  // }

  render() {
    const { getTable, identify, name, table } = this.props;
    console.log(table);
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
        <MDBModalHeader toggle={this.toggle}>Edit Table</MDBModalHeader>
        <form ref="form" onSubmit={this.handleSubmit}>
        <MDBModalBody>
                {
                  getTable && getTable.loading === true ? (
                    <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                      {this.state.uploadPercentage}%
                    </MDBProgress>
                  ) : null }
                  <div className="form-group">
                    <label htmlFor="player">Select the team</label>
                    <div>
                      <select
                        value={this.state.team_id}
                        style={{height: '30px', fontSize: '14px'}}
                        className="browser-default custom-select"
                        name="team_id"
                        disabled={true}
                      >
                        <option value={identify}>{name}</option>
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

const mapStateToProps = ({ table, teams }) => ({
  errors: table.errors,
  loading: table.loading,
  listOfTeams: teams.listOfTeams,
  table: table.listOfTables,
  getTable: table.getTable
});

const mapDispatchToProps = (dispatch) => ({
  editTable: (id, data) => dispatch(editTable(id, data)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  fetchTable: (id) => dispatch(fetchTable(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBtnTable);
