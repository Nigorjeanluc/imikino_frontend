import React, { Component } from 'react';
// import Routes from '../src/components/Routes';
import TopNavigation from '../../../utils/Dashboard/topNavigation';
import SideNavigation from '../../../utils/Dashboard/sideNavigation';
import SideNavigation2 from '../../../utils/Dashboard/sideNavigation2';
import Footer from '../../../utils/Dashboard/FooterDash';
import './index.scss';

class Dashboard extends Component {

  componentDidMount() {
    const { history } = this.props;
    const { token } = localStorage;
    if (!token) {
      history.push('/');
    }
  }
  
  render() {
    const { user } = localStorage;
    const userData = JSON.parse(user);
    return (
      <div className="body">
        <div className="flexible-content">
          <TopNavigation />
          {
            userData.role === 'REPORTER' ? (
              <SideNavigation2 />
            ) : (
              userData.role === 'ADMIN' ? (
                <SideNavigation />
              ) : null
            )
          }
          <main id="content" className="p-5">
            {this.props.children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Dashboard;
