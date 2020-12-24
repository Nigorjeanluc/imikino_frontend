import React, { Component } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';
import { connect } from 'react-redux';
import Select from 'react-select';

import { editTopScorer } from '../../../../redux/actions/topScorer';
import { getAllPlayers } from '../../../../redux/actions/players';
import { getAllTeams } from '../../../../redux/actions/teams';

export class EditBtnTopScorer extends Component {
  state = {
    modal: false,
    player_id: 0,
    team_id: 0,
    goals: 0,
    matchs: 0,
    selectDataPlayer: {
      label: '',
      value: 0
    },
    selectDataTeam: {
      label: '',
      value: 0
    },
  }

  componentWillMount () {
    const { topScorerData, getAllTeams } = this.props;
    getAllPlayers(1, 2000);
    getAllTeams(1, 2000);
    this.setState({
      selectDataPlayer: {
        label: topScorerData.player.name,
        value: topScorerData.player.id
      },
      selectDataTeam: {
        label: topScorerData.team.name,
        value: topScorerData.team.id
      },
      player_id: topScorerData.player_id,
      goals: topScorerData.goals,
      matchs: topScorerData.matchs
    });
  }
  
  toggle = async () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  
  handleGoals = (event) => {
    this.setState({
      goals: event.target.value
    })
  }

  handleMatchs = (event) => {
    this.setState({
      matchs: event.target.value
    })
  }

  handlePlayer = (event) => {
    this.setState({
      player_id: event.value
    })
  }

  handleTeam = (event) => {
    this.setState({
      team_id: event.value
    })
  }

  handleSubmit = (event) => {
    const { editTopScorer, identify } = this.props;
    const {
      player_id,
      team_id,
      goals,
      matchs
    } = this.state;
    editTopScorer(identify, {
      player_id,
      team_id,
      goals,
      matchs
    });
    event.preventDefault();
    this.toggle();
  }

  render() {
    const { listOfPlayers, listOfTeams } = this.props;
    const seletablePlayer = listOfPlayers && listOfPlayers.map(player => ({
      value: player.id,
      label: player.name
    }));
    const seletableTeam = listOfTeams && listOfTeams.map(team => ({
      value: team.id,
      label: team.name
    }));
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
        <MDBModalHeader toggle={this.toggle}>Edit Location</MDBModalHeader>
        <form onSubmit={this.handleSubmit}>
        <MDBModalBody>
          <div className="form-group">
            <label>Select Player</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isDisabled={false}
              isClearable={false}
              isRtl={false}
              defaultValue={this.state.selectDataPlayer}
              isSearchable={true}
              onChange={this.handlePlayer}
              name="color"
              options={seletablePlayer}
            />
            <label>Select Team</label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isDisabled={false}
              isClearable={false}
              isRtl={false}
              defaultValue={this.state.selectDataTeam}
              isSearchable={true}
              onChange={this.handleTeam}
              name="color"
              options={seletableTeam}
            />
            <label>Number of Goals</label>
            <input
              type="number"
              className="form-control"
              onChange={this.handleGoals}
              value={this.state.goals}
            />
            <label>Number of Matchs</label>
            <input
              type="number"
              className="form-control"
              onChange={this.handleMatchs}
              value={this.state.matchs}
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

const mapStateToProps = ({ topScorer, players, teams }) => ({
  errors: topScorer.errors,
  loading: topScorer.loading,
  topScorer: topScorer.topScorer,
  getTopScorer: topScorer.getTopScorer,
  listOfPlayers: players.listOfPlayers,
  getPlayers: players.getPlayers,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
});

const mapDispatchToProps = (dispatch) => ({
  editTopScorer: (id, data, options) => dispatch(editTopScorer(id, data, options)),
  getAllPlayers: (page, limit) => dispatch(getAllPlayers(page, limit)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBtnTopScorer);
