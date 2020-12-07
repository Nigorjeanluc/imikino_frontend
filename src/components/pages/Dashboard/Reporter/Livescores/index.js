import React, { Component } from 'react';
import { MDBCol, MDBRow, MDBBadge, MDBCard, MDBCardBody, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
  BACKEND_URL_IMAGE
} from '../../../../../redux/helpers/backendURLs';

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
    getAllMatchs(1, 40);
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
                  <div key={match.id}>
                    <MDBRow>
                      <MDBCol md="9">
                        <p style={{textAlign: 'center'}}>
                          <img style={{width: '30px', height: '30px'}} src={`${BACKEND_URL_IMAGE}/teams/${match.team_1 && match.team_1.image}`} alt={match.team_1 && match.team_1.name} />
                          <span style={{fontSize: '12px', fontWeight: '800'}}>  {match.team_1 && match.team_1.name}</span><span style={{fontSize: '22px'}}> vs </span> 
                          <img style={{width: '30px', height: '30px'}} src={`${BACKEND_URL_IMAGE}/teams/${match.team_2 && match.team_2.image}`} alt={match.team_2 && match.team_2.name} />
                          <span style={{fontSize: '12px', fontWeight: '800'}}>  {match.team_2 && match.team_2.name}</span>
                        </p>
                        <p style={{textAlign: 'center'}}>
                          <span></span>
                          <span></span>
                        </p>
                        <p style={{textAlign: 'center'}}>
                          Starting {moment(match.starting_time, "YYYYMMDD hh:mm:ss").fromNow()}
                        </p>
                      </MDBCol>
                      <MDBCol md="3">
                        <MDBBtn color="unique">Add Goal or Card</MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </div>
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
