/* eslint-disable global-require */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import ClipLoader from 'react-spinners/ClipLoader';
// import moment from 'moment';
import { IMIKINO_URL_IMAGE, LOCAL_URL_IMAGE, SOCKET_URL } from '../../../redux/helpers/backendURLs';
import { getTransferPosts } from '../../../redux/actions/posts';

import Navbar from '../../utils/navbar/Navbar';
// import GlobalStyle from '../../../styles/Global';
import Title from '../../utils/Title';
import Footer from '../../utils/Footer';
import NewsCard from '../../utils/NewsCard';
import Pagination from '../../utils/Pagination';
import Scroll from '../../utils/BackToTop';
import {PageView, initGA} from '../../utils/Tracking';
import './Transfer.scss';

export class Transfer extends Component {
  state = { navbarOpen: false };


  componentDidMount () {
    initGA('UA-105882306-1');
    PageView();
    const { getTransferPosts } = this.props;
    getTransferPosts(1, 10);
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  nextPagination = (e) => {
    const { getTransferPosts, Next } = this.props;
    if(e) {
      getTransferPosts(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getTransferPosts, Previous } = this.props;
    console.log(Previous.page);
    if(e) {
      getTransferPosts(Previous.page, 10);
    };
  }

  render() {
    const { listOfTransfer, getTransfer, loading, Next, Previous } = this.props;

    const currentPage = Next && !Next.page ? (
      Previous.page + 1
    ) : (
      Previous.page ? (
        Previous.page + 1
      ) : (
        Next.page - 1
      )
    );

    const jsx = listOfTransfer ? listOfTransfer && listOfTransfer.map((post) => <NewsCard
          key={post.id}
          title={post.title}
          image={post.image}
          slug={post.slug}
          allViews={post.allViews}
          updated_at={post.updated_at}
          size={"6"}
        />) : (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <h1>You have not post yet.</h1>
        </div>
      );

    const mainJsx = getTransfer.loading ? (
        <ClipLoader
          css={{ display: 'block', margin: '0 auto' }}
          size={150}
          color={'#3AB397'}
          loading={loading}
        />
      ) : jsx;
    
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
              <Title text="IGURA N'IGURISHA"/>
              <MDBRow className="cards-panel">
                {mainJsx}
                <MDBCol md="12">
                  <Pagination currentPage={currentPage} prevPagination={this.prevPagination} nextPagination={this.nextPagination} {...this.props} />
                </MDBCol>
              </MDBRow>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  Next: posts.Next,
  Previous: posts.Previous,
  errors: posts.errors,
  loading: posts.loading,
  listOfTransfer: posts.listOfTransfer,
  getTransfer: posts.getTransfer,
});

const mapDispatchToProps = (dispatch) => ({
  getTransferPosts: (page, limit) => dispatch(getTransferPosts(page, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
