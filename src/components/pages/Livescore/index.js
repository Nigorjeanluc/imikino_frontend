/* eslint-disable global-require */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
// import { MDBRow } from 'mdbreact';

import Navbar from '../../utils/navbar/Navbar';
// import GlobalStyle from '../../../styles/Global';
import { getAllMatchs } from '../../../redux/actions/matchs';
import Title from '../../utils/Title';
import Match from '../../utils/Match';
import Footer from '../../utils/Footer';
import Scroll from '../../utils/BackToTop';
import {PageView, initGA} from '../../utils/Tracking';
import './Livescore.scss';

export class Livescore extends Component {
  state = { navbarOpen: false };

  componentDidMount () {
    initGA('UA-105882306-1');
    PageView();
    const script = document.createElement("script");
    script.async = true;
    script.src = "//s7.addthis.com/icons/official-addthis-angularjs/current/dist/official-addthis-angularjs.min.js";
    this.div.appendChild(script);
    const { getAllMatchs } = this.props;
    getAllMatchs(1, 20);
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    const { listOfMatchs, loading } = this.props;
    return (
      <>
        <Container fluid  ref={el => (this.div = el)}>
          <Scroll showBelow={250} />
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
          <Row style={{ marginTop: '6rem' }} className="justify-content-md-center">
            <Col md={8}>
              <Title text="Livescores"/>
            </Col>
            {
              !loading && listOfMatchs.map(livematch => (
                <Col key={livematch.id} md={8}>
                  <Match match={livematch} />
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

const mapStateToProps = ({ matchs }) => ({
  Next: matchs.Next,
  Previous: matchs.Previous,
  errors: matchs.errors,
  loading: matchs.loading,
  listOfMatchs: matchs.listOfMatchs,
  getMatchs: matchs.getMatchs,
});

const mapDispatchToProps = (dispatch) => ({
  getAllMatchs: (page, limit) => dispatch(getAllMatchs(page, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Livescore);
