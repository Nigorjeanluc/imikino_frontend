import React, { Component } from 'react';
import { MDBCol, MDBRow, MDBBadge, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import AdminCardSection1 from '../../../../utils/Sections/AdminCardSection1';
import { getAllLeagues } from '../../../../../redux/actions/leagues';
import { getAllTeams } from '../../../../../redux/actions/teams';
import { getAllPlayers } from '../../../../../redux/actions/players';
import { getAllSports } from '../../../../../redux/actions/sports';
import { getAllLocations } from '../../../../../redux/actions/locations';
import { getAllMatchs } from '../../../../../redux/actions/matchs';
import ChartSection1 from '../../../../utils/Sections/ChartSection1';
import TableSection from '../../../../utils/Sections/TableSection';
import ChartSection2 from '../../../../utils/Sections/ChartSection2';
// import MapSection from '../../../../utils/Sections/MapSection';
import ModalSection from '../../../../utils/Sections/ModalSection';
import AdminCardSection2 from '../../../../utils/Sections/AdminCardSection2';
import { Link } from 'react-router-dom';

class Livescore extends Component {
  componentDidMount() {
    const {
      getAllLeagues,
      getAllPlayers,
      getAllSports,
      getAllLocations,
      getAllTeams,
      getAllMatchs
    } = this.props;
    getAllLeagues(1, 2000);
    getAllTeams(1, 2000);
    getAllPlayers(1, 2000);
    getAllSports(1, 2000);
    getAllLocations(1, 2000);
    getAllMatchs(1, 10);
  }

  render() {
    const {
      listOfLeagues,
      listOfLocations,
      listOfPlayers,
      listOfSports,
      listOfTeams,
      listOfMatchs
    } = this.props;

    console.log(listOfMatchs);
    const totalLeagues = listOfLeagues && listOfLeagues.length ? listOfLeagues.length : 0;
    const totalLocations = listOfLocations && listOfLocations.length ? listOfLocations.length : 0;
    const totalPlayers = listOfPlayers && listOfPlayers.length ? listOfPlayers.length : 0;
    const totalSports = listOfSports && listOfSports.length ? listOfSports.length : 0;
    const totalTeams = listOfTeams && listOfTeams.length ? listOfTeams.length : 0;
    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Livescores" />
        <MDBRow>
          <MDBCol md="12">
            <MDBCard>
              <MDBCardBody>
                <Link to='/reporter/livescores/addmatch'><MDBBtn>Add Match</MDBBtn></Link><hr />
                {listOfMatchs && listOfMatchs.map(match => (
                  <p key={match.id}>{match.team_one}</p>
                ))}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
        {/* <AdminCardSection1
          countLeagues={totalLeagues}
          countLocations={totalLocations}
          countPlayers={totalPlayers}
          countSports={totalSports}
          countTeams={totalTeams}
        /> */}
        {/* <ChartSection1 /> */}
        {/* <TableSection />
        <ChartSection2 /> */}
        {/* <MDBRow className="mb-4"> */}
            {/* <MapSection /> */}
            {/* <ModalSection /> */}
        {/* </MDBRow> */}
        {/* <AdminCardSection2 /> */}
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ leagues, sports, teams, locations, players, matchs }) => ({
  Next: leagues.Next,
  Previous: leagues.Previous,
  errors: leagues.errors,
  loading: leagues.loading,
  listOfLeagues: leagues.listOfLeagues,
  getLeagues: leagues.getLeagues,
  listOfSports: sports.listOfSports,
  getSports: sports.getSports,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
  listOfLocations: locations.listOfLocations,
  getLocations: locations.getLocations,
  listOfPlayers: players.listOfPlayers,
  getPlayers: players.getPlayers,
  listOfMatchs: matchs.listOfMatchs,
  getMatchs: matchs.getMatchs
});

const mapDispatchToProps = (dispatch) => ({
  getAllLeagues: (page, limit) => dispatch(getAllLeagues(page, limit)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  getAllPlayers: (page, limit) => dispatch(getAllPlayers(page, limit)),
  getAllSports: (page, limit) => dispatch(getAllSports(page, limit)),
  getAllLocations: (page, limit) => dispatch(getAllLocations(page, limit)),
  getAllMatchs: (page, limit) => dispatch(getAllMatchs(page, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Livescore);