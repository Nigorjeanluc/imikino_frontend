import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import Home from './pages/Home';
import Livescore from './pages/Livescore';
import Transfer from './pages/Transfer';
import News from './pages/News';
import Tables from './pages/Tables';
import Teams from './pages/Teams';
import SinglePost from './pages/SinglePost';
import Frontpage from './pages/Dashboard/Admin/Frontpage';
import Frontpage2 from './pages/Dashboard/Reporter/Frontpage';
import Livescores from './pages/Dashboard/Reporter/Livescores';
import Posts from './pages/Dashboard/Reporter/Posts';
import AdminPosts from './pages/Dashboard/Admin/Posts';
import AdminSinglePost from './pages/Dashboard/Admin/Posts/SinglePost';
import AddPost from './pages/Dashboard/Reporter/Posts/addPost';
import ReporterSinglePost from './pages/Dashboard/Reporter/SinglePost';
import Leagues from './pages/Dashboard/Admin/Leagues';
import TeamsPage from './pages/Dashboard/Admin/Teams';
import PlayersPage from './pages/Dashboard/Admin/Players';
import SportsPage from './pages/Dashboard/Admin/Sports';
import LocationsPage from './pages/Dashboard/Admin/Locations';
import VideosPage from './pages/Dashboard/Admin/Videos';
import TopScorersPage from './pages/Dashboard/Admin/TopScorers';
import ReportersPage from './pages/Dashboard/Admin/Reporters';
import TablesPage from './pages/Dashboard/Admin/Tables';
import AddMatch from './pages/Dashboard/Reporter/Livescores/addMatch';
import AddGoalCard from './pages/Dashboard/Reporter/Livescores/addGoalCard';
import HelmetMetaData from './utils/HelmetMetaData';

function Routes() {
  return (
    <>
      <HelmetMetaData></HelmetMetaData>
      <Switch>
        <Route exact path="/admin/dashboard" component={Frontpage} />
        <Route exact path="/admin/leagues" component={Leagues} />
        <Route exact path="/admin/teams" component={TeamsPage} />
        <Route exact path="/admin/players" component={PlayersPage} />
        <Route exact path="/admin/sports" component={SportsPage} />
        <Route exact path="/admin/locations" component={LocationsPage} />
        <Route exact path="/admin/videos" component={VideosPage} />
        <Route exact path="/admin/reporters" component={ReportersPage} />
        <Route exact path="/admin/posts" component={AdminPosts} />
        <Route exact path="/admin/top_scorers" component={TopScorersPage} />
        <Route exact path="/admin/tables/:league_id" component={TablesPage} />
        <Route exact path="/admin/posts/:slug" component={AdminSinglePost} />

        <Route exact path="/reporter/dashboard" component={Frontpage2} />
        <Route exact path="/reporter/posts" component={Posts} />
        <Route exact path="/reporter/posts/addpost" component={AddPost} />
        <Route exact path="/reporter/livescores" component={Livescores} />
        <Route exact path="/reporter/livescores/addmatch" component={AddMatch} />
        <Route exact path="/reporter/livescores/addmatch/:id" component={AddGoalCard} />
        <Route exact path="/reporter/posts/:slug" component={ReporterSinglePost} />

        
        <Route exact path="/" component={Home} />
        <Route exact path="/livescores" component={Livescore} />
        <Route exact path="/transfers" component={Transfer} />
        <Route exact path="/news" component={News} />
        <Route exact path="/tables" component={Tables} />
        <Route exact path="/teams" component={Teams} />
        <Route exact path="/:slug" component={SinglePost} />
      </Switch>
    </>
  );
}

Routes.propTypes = { isAuth: PropTypes.bool, role: PropTypes.string, match: PropTypes.object };
Routes.defaultProps = { match: { params: {} }, isAuth: false, role: 'normal' };

export default connect(null)(Routes);
