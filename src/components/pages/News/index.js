/* eslint-disable global-require */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBRow } from 'mdbreact';

import Navbar from '../../utils/navbar/Navbar';
// import GlobalStyle from '../../../styles/Global';
import Title from '../../utils/Title';
import Footer from '../../utils/Footer';
import NewsCard from '../../utils/NewsCard';
import Scroll from '../../utils/BackToTop';
import './News.scss';

export class News extends Component {
  state = { navbarOpen: false };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    return (
      <>
        <Container fluid>
          <Scroll showBelow={250} />
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
          <Row style={{ marginTop: '6rem' }} className="justify-content-md-center">
            <Col md={8}>
              <Title text="Recent Sport News"/>
              <MDBRow className="cards-panel">
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
                <NewsCard />
              </MDBRow>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </>
    );
  }
}

export default News;
