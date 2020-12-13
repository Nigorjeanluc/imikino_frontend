/* eslint-disable global-require */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBRow } from 'mdbreact';
import { connect } from 'react-redux';

import { IMIKINO_URL_IMAGE, LOCAL_URL_IMAGE, SOCKET_URL } from '../../../redux/helpers/backendURLs';
import { getAllTeams } from '../../../redux/actions/teams';
import Navbar from '../../utils/navbar/Navbar';
// import GlobalStyle from '../../../styles/Global';
import Title from '../../utils/Title';
import Team from '../../utils/Team';
import Footer from '../../utils/Footer';
import Scroll from '../../utils/BackToTop';
import './Teams.scss';

export class Teams extends Component {
  state = { navbarOpen: false };

  componentDidMount () {
    const { getAllTeams } = this.props;
    getAllTeams(1, 20);
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    const { listOfTeams, loading } = this.props;
    return (
      <>
        <Container fluid>
          <Scroll showBelow={250} />
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
          <Row style={{ marginTop: '6rem' }} className="justify-content-md-center">
            {/* <Col md={8}>
              <Title text="Teams"/>
            </Col> */}
            {
              !loading && listOfTeams.map(team => (
                <Col key={team.id} md={8}>
                  <Team team={team} />
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

const mapStateToProps = ({ teams }) => ({
  Next: teams.Next,
  Previous: teams.Previous,
  errors: teams.errors,
  loading: teams.loading,
  listOfTeams: teams.listOfTeams,
  getTeams: teams.getTeams,
});

const mapDispatchToProps = (dispatch) => ({
  getAllTeams: (page, limit) => dispatch(getAllTeams(page, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Teams);
