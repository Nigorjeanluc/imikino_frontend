import React, { Component } from 'react';
import { MDBCol, MDBRow, MDBBadge } from 'mdbreact';
import { connect } from 'react-redux';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import AdminCardSection1 from '../../../../utils/Sections/AdminCardSection1';
import { getAllLeagues } from '../../../../../redux/actions/leagues';
import { getAllTeams } from '../../../../../redux/actions/teams';
import { getAllPlayers } from '../../../../../redux/actions/players';
import { getAllSports } from '../../../../../redux/actions/sports';
import { getAllLocations } from '../../../../../redux/actions/locations';
import { getAllVideos } from '../../../../../redux/actions/videos';
import { getAllReporters } from '../../../../../redux/actions/users';
import { getAllTopScorers } from '../../../../../redux/actions/topScorers';
import { getUnapprovedPosts, getAuthorPosts } from '../../../../../redux/actions/posts';
import ChartSection1 from '../../../../utils/Sections/ChartSection1';
import TableSection from '../../../../utils/Sections/TableSection';
import ChartSection2 from '../../../../utils/Sections/ChartSection2';
// import MapSection from '../../../../utils/Sections/MapSection';
import ModalSection from '../../../../utils/Sections/ModalSection';
import AdminCardSection2 from '../../../../utils/Sections/AdminCardSection2';

class Frontpage extends Component {
  componentDidMount() {
    const {
      getAllLeagues,
      getAllTeams,
      getAllPlayers,
      getAllSports,
      getAllLocations,
      getAllVideos,
      getAllReporters,
      getAllTopScorers,
      getUnapprovedPosts,
      getAuthorPosts
    } = this.props;
    getAllLeagues(1, 2000);
    getAllTeams(1, 2000);
    getAllPlayers(1, 2000);
    getAllSports(1, 2000);
    getAllLocations(1, 2000);
    getAllVideos(1, 2000);
    getAllReporters(1, 2000);
    getAllTopScorers(1, 2000);
    getUnapprovedPosts(1, 2000);
    getAuthorPosts(1, 2000);
  }

  render() {
    const {
      listOfLeagues,
      listOfLocations,
      listOfPlayers,
      listOfSports,
      listOfTeams,
      listOfVideos,
      listOfReporters,
      listOfTopScorers,
      listOfUnapproved,
      listOfPosts
    } = this.props;
    const totalLeagues = listOfLeagues && listOfLeagues.length ? listOfLeagues.length : 0;
    const totalLocations = listOfLocations && listOfLocations.length ? listOfLocations.length : 0;
    const totalPlayers = listOfPlayers && listOfPlayers.length ? listOfPlayers.length : 0;
    const totalSports = listOfSports && listOfSports.length ? listOfSports.length : 0;
    const totalTeams = listOfTeams && listOfTeams.length ? listOfTeams.length : 0;
    const totalVideos = listOfVideos && listOfVideos.length ? listOfVideos.length : 0;
    const totalReporters = listOfReporters && listOfReporters.length ? listOfReporters.length : 0;
    const totalTopScorers = listOfTopScorers && listOfTopScorers.length ? listOfTopScorers.length : 0;
    const totalUnapproved = listOfUnapproved && listOfUnapproved.length ? listOfUnapproved.length : 0;
    const totalPosts = listOfPosts && listOfPosts.length ? listOfPosts.length : 0;
    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Dashboard" />
        <AdminCardSection1
          countLeagues={totalLeagues}
          countLocations={totalLocations}
          countPlayers={totalPlayers}
          countSports={totalSports}
          countTeams={totalTeams}
          countVideos={totalVideos}
          countReporters={totalReporters}
          countTopScorers={totalTopScorers}
          countUnapproved={totalUnapproved}
          countPosts={totalPosts}
        />
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

const mapStateToProps = ({
  leagues,
  sports,
  teams,
  locations,
  players,
  videos,
  posts,
  users,
  topScorers,
}) => ({
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
  listOfVideos: videos.listOfVideos,
  getVideos: videos.getVideos,
  listOfTopScorers: topScorers.listOfTopScorers,
  getTopScorers: topScorers.getTopScorers,
  listOfUsers: users.listOfUsers,
  listOfReporters: users.listOfReporters,
  listOfUnapproved: posts.listOfUnapproved,
  getUnapproved: posts.getUnapproved,
  listOfPosts: posts.listOfPosts,
  getPosts: posts.getPosts,
});

const mapDispatchToProps = (dispatch) => ({
  getAllLeagues: (page, limit) => dispatch(getAllLeagues(page, limit)),
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit)),
  getAllPlayers: (page, limit) => dispatch(getAllPlayers(page, limit)),
  getAllSports: (page, limit) => dispatch(getAllSports(page, limit)),
  getAllLocations: (page, limit) => dispatch(getAllLocations(page, limit)),
  getAllVideos: (page, limit) => dispatch(getAllVideos(page, limit)),
  getAllReporters: (page, limit) => dispatch(getAllReporters(page, limit)),
  getAllTopScorers: (page, limit) => dispatch(getAllTopScorers(page, limit)),
  getUnapprovedPosts: (page, limit) => dispatch(getUnapprovedPosts(page, limit)),
  getAuthorPosts: (page, limit) => dispatch(getAuthorPosts(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage);
