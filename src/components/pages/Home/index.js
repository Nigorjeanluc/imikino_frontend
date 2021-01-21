/* eslint-disable global-require */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBRow, MDBCol, MDBTable, MDBTableBody } from 'mdbreact';
import { connect } from 'react-redux';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import ClipLoader from 'react-spinners/ClipLoader';
// import moment from 'moment';
import {
  IMIKINO_URL_IMAGE,
  LOCAL_URL_IMAGE,
  BACKEND_URL_IMAGE
} from '../../../redux/helpers/backendURLs';
import { getAllPosts, getHeaderPosts, getTrendingPosts } from '../../../redux/actions/posts';
import { getAllTopScorers } from '../../../redux/actions/topScorers';
import Navbar from '../../utils/navbar/Navbar';
// import GlobalStyle from '../../../styles/Global';
import Title from '../../utils/Title';
import BtnLink from '../../utils/BtnLink';
import Scroll from '../../utils/BackToTop';
import CarouselWindow from '../../utils/Carousel';
import Footer from '../../utils/Footer';
import NewsCard from '../../utils/NewsCard/NewsCard';
import './Home.scss';
import VideosPanel from '../../utils/VideosPanel';
import Gallery from '../../utils/Gallery';
import Pagination from '../../utils/Pagination';
import {PageView, initGA} from '../../utils/Tracking';

export class Home extends Component {
  state = { navbarOpen: false };

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    initGA('UA-105882306-1');
    PageView();
    const { history, getAllPosts, getHeaderPosts, getTrendingPosts, getAllTopScorers } = this.props;
    // const { token } = localStorage;
    // if (!token) {
    //   history.push('/');
    // }
    getAllPosts();
    getHeaderPosts();
    getTrendingPosts();
    getAllTopScorers(1, 1000);
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  nextPagination = (e) => {
    const { getAllPosts, Next } = this.props;
    if(e) {
      getAllPosts(Next.page, 12);
    }
  };

  prevPagination = (e) => {
    const { getAllPosts, Previous } = this.props;
    console.log(Previous.page);
    if(e) {
      getAllPosts(Previous.page, 12);
    };
  }

  render() {
    const {
      listOfPosts,
      listOfHeader,
      listOfTrending,
      listOfTopScorers,
      Next,
      Previous,
      loading,
      getHeader,
      getPosts,
      getTrending
    } = this.props;

    console.log(listOfTopScorers, "TopScorers");

    const imgs = listOfHeader && listOfHeader.map(post => {
      return {
        src: `${BACKEND_URL_IMAGE}/news/${post.image}`,
        altText: `${post.slug}`,
        caption: `${post.title}`
      };
    });

    const currentPage = Next && !Next.page ? (
        Previous.page + 1
      ) : (
        Previous.page ? (
          Previous.page + 1
        ) : (
          Next.page - 1
        )
      );

      const jsx = listOfPosts ? listOfPosts && listOfPosts.map((post) => <NewsCard
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
    
      const mainJsx = getPosts.loading ? (
        <ClipLoader
          css={{ display: 'block', margin: '0 auto' }}
          size={150}
          color={'#3AB397'}
          loading={loading}
        />
      ) : jsx;

      const trendingJsx = listOfTrending ? listOfTrending && listOfTrending.map((post) => <NewsCard
          key={post.id}
          title={post.title}
          image={post.image}
          slug={post.slug}
          allViews={post.allViews}
          updated_at={post.updated_at}
          size={"6"}
        />) : (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <h1>You have not yet requested a trip.</h1>
        </div>
      );
    
      const mainTrendingJsx = getTrending.loading ? (
        <ClipLoader
          css={{ display: 'block', margin: '0 auto' }}
          size={150}
          color={'#3AB397'}
          loading={loading}
        />
      ) : trendingJsx;

      const headerJsx = getHeader.loading ? (
        <ClipLoader
          css={{ display: 'block', margin: '0 auto' }}
          size={150}
          color={'#3AB397'}
          loading={loading}
        />
      ) : (
        <CarouselWindow items={imgs}/>
      );

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
              {/* <Title text="INKURU ZIGEZWEHO"/> */}
              <Row>
                <Col md="12">
                  { headerJsx }
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <BtnLink active link="/" text="INKURU ZIGEZWEHO"/>
                </Col>
              </Row>
              <MDBRow className="cards-panel">
                <Col md="8">
                  <Row>
                    { mainJsx }
                    <Col md="12">
                      <Pagination currentPage={currentPage} prevPagination={this.prevPagination} nextPagination={this.nextPagination} {...this.props} />
                    </Col>
                  </Row>
                </Col>
                <Col className="d-none d-md-block" md="4">
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="ImikinoRw"
                    options={{height: 1100, tweetLimit: 2}}
                    noScrollbar={true}
                    // noFooter={true}
                    // noHeader={true}
                    theme="dark"
                  />
                </Col>
              </MDBRow>
              <VideosPanel/>
              <MDBRow>
                <MDBCol>
                  <Title text="INKURU ZIKUNZWE" />
                </MDBCol>
              </MDBRow>
              <MDBRow className="cards-panel">
                <MDBCol md="8">
                  <MDBRow>
                    {mainTrendingJsx}
                  </MDBRow>
                </MDBCol>
                <MDBCol md="4">
                  <img style={{width: '100%', height: '100%'}} alt="banner" src={require('../../../assets/imgs/banner.png')} />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol>
                  <Title text="TOP SCORERS" />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  <MDBTable hover>
                    <MDBTableBody>
                  {listOfTopScorers && listOfTopScorers.map((topScorer, index) =>
                        <tr key={index}>
                          <td style={{
                            padding: '20px'
                          }}>
                            <h5 className="card-title">{index + 1}</h5>
                          </td>
                          <td>
                            <span>
                              <img className='img-responsive' src={`${BACKEND_URL_IMAGE}/players/${topScorer.player.image}`} />
                              <span> {topScorer.player.name}</span>
                            </span>
                          </td>
                          <td>
                            <span>
                              <img className='img-responsive' style={{width: '40px'}} src={`${BACKEND_URL_IMAGE}/teams/${topScorer.team.image}`} />
                              <span> {topScorer.team.name}</span>
                            </span>
                          </td>
                          <td style={{
                            padding: '25px'
                          }}>
                            <span>
                              Ibitego: {topScorer.goals}
                            </span>
                          </td>
                          <td style={{
                            padding: '25px'
                          }}>
                            <span>
                              Imikino: {topScorer.matchs}
                            </span>
                          </td>
                        </tr>
                    // <div className="card" key={index}>
                    //   <div className="card-body text-center">
                    //     <span><img style={{
                    //       width: "150px",
                    //       height: "200px"
                    //     }} className='img-responsive' src={`${BACKEND_URL_IMAGE}/players/${topScorer.player.image}`} /></span>
                    //     <h5 className="card-title">{index + 1} {topScorer.player.name}</h5>
                    //     <span><img className='img-responsive' src={`${BACKEND_URL_IMAGE}/teams/${topScorer.team.image}`} /></span>
                    //     <h5 className="card-title">{index + 1} {topScorer.team.name}</h5>
                    //     <h6 className="card-subtitle mb-2 text-muted">Goals: {topScorer.goals}</h6>
                    //     <h6 className="card-subtitle mb-2 text-muted">Matchs: {topScorer.matchs}</h6>
                    //   </div>
                    // </div>
                  )}
                    </MDBTableBody>
                  </MDBTable>
                </MDBCol>
              </MDBRow>
              {/* <MDBRow>
                <MDBCol>
                  <Title text="TOP SCORER" />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  {listOfTopScorers && listOfTopScorers.sort((a, b) =>  a - b).map(player => player && player.goals ? player.goals.length : null)}
                </MDBCol>
              </MDBRow> */}
            </Col>
          </Row>
        </Container>
        <Footer/>
      </>
    );
  }
}

const mapStateToProps = ({ posts, topScorers }) => ({
  Next: posts.Next,
  Previous: posts.Previous,
  errors: posts.errors,
  loading: posts.loading,
  listOfPosts: posts.listOfPosts,
  listOfHeader: posts.listOfHeader,
  listOfTrending: posts.listOfTrending,
  getTrending: posts.getTrending,
  getHeader: posts.getHeader,
  getPosts: posts.getPosts,
  listOfTopScorers: topScorers.listOfTopScorers,
  getTopScorers: topScorers.getTopScorers
});

const mapDispatchToProps = (dispatch) => ({
  getAllPosts: (page, limit) => dispatch(getAllPosts(page, limit)),
  getHeaderPosts: (page, limit) => dispatch(getHeaderPosts(page, limit)),
  getTrendingPosts: () => dispatch(getTrendingPosts()),
  getAllTopScorers: (page, limit) => dispatch(getAllTopScorers(page, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
