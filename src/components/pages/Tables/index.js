/* eslint-disable global-require */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { MDBRow } from 'mdbreact';

import Navbar from '../../utils/navbar/Navbar';
// import GlobalStyle from '../../../styles/Global';
import Table from '../../utils/Table';
import Footer from '../../utils/Footer';
// import { getFrontPageAllTables } from '../../../redux/actions/tables';
import { getAllLeagues2 } from '../../../redux/actions/leagues';
import './Tables.scss';

export class Tables extends Component {
  state = { navbarOpen: false };

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const { getAllLeagues2 } = this.props;
    // const { token } = localStorage;
    // if (!token) {
    //   history.push('/');
    // }
    getAllLeagues2(1, 10);
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    const { listOfLeagues, loading } = this.props;
    return (
      <>
        <Container fluid>
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
          <Row style={{ marginTop: '6rem' }} className="justify-content-md-center">
            {
              !loading && listOfLeagues.map(league => (
                <Col key={league.id} md={8}>
                  <Table league={league} />
                </Col>
              ))
            }
          </Row>
        </Container>
        <Footer/>
      </>
    );
  }
}

const mapStateToProps = ({ leagues, teams, table }) => ({
  Next: leagues.Next,
  Previous: leagues.Previous,
  errors: leagues.errors,
  loading: leagues.loading,
  listOfLeagues: leagues.listOfLeagues,
  getLeagues: leagues.getLeagues,
  // listOfTeams: teams.listOfTeams,
  // getTeams: teams.getTeams,
  // table: table.table,
  // getTable: table.getTable,
});

const mapDispatchToProps = (dispatch) => ({
  getAllLeagues2: (page, limit) => dispatch(getAllLeagues2(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tables);
