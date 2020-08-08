/* eslint-disable global-require */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Navbar from '../../utils/navbar/Navbar';
import GlobalStyle from '../../../styles/Global';
import Title from '../../utils/Title';
import BtnLink from '../../utils/BtnLink';
import CarouselWindow from '../../utils/Carousel';
import Footer from '../../utils/Footer';

export class Home extends Component {
  state = { navbarOpen: false };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    const images = [
      {
        src: require('../../../assets/imgs/1.jpg'),
        altText: 'Slide 1',
        caption: 'Slide 1'
      },
      {
        src: require('../../../assets/imgs/2.jpg'),
        altText: 'Slide 1',
        caption: 'Slide 1'
      },
      {
        src: require('../../../assets/imgs/3.jpg'),
        altText: 'Slide 1',
        caption: 'Slide 1'
      },
      {
        src: require('../../../assets/imgs/4.jpg'),
        altText: 'Slide 1',
        caption: 'Slide 1'
      }
    ];
    return (
      <>
        <GlobalStyle />
        <Container fluid>
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
          <Row style={{ marginTop: '5rem' }} className="justify-content-md-center">
            <Col md={8}>
              <Title text="Football News"/>
              <Row>
                <Col md={6}>
                  <BtnLink link="/" text="Latest News"/>
                </Col>
                <Col md={6}>
                  <BtnLink link="/" text="Today's Match"/>
                </Col>
              </Row>
              <Row>
                <Col md="8">
                  <CarouselWindow items={images}/>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </>
    );
  }
}

export default Home;
