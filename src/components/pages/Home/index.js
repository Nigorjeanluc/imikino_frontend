/* eslint-disable global-require */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import ClipLoader from 'react-spinners/ClipLoader';
// import moment from 'moment';
import { IMIKINO_URL_IMAGE, LOCAL_URL_IMAGE } from '../../../redux/helpers/backendURLs';
import { getAllPosts, getHeaderPosts, getTrendingPosts } from '../../../redux/actions/posts';
import { getAllPlayers } from '../../../redux/actions/players';
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

export class Home extends Component {
  state = { navbarOpen: false };

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const { history, getAllPosts, getHeaderPosts, getTrendingPosts, getAllPlayers } = this.props;
    // const { token } = localStorage;
    // if (!token) {
    //   history.push('/');
    // }
    getAllPosts();
    getHeaderPosts();
    getTrendingPosts();
    getAllPlayers(1, 1000);
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
      listOfPlayers,
      Next,
      Previous,
      loading,
      getHeader,
      getPosts,
      getTrending
    } = this.props;

    console.log(listOfPlayers, "Players");

    const imgs = listOfHeader && listOfHeader.map(post => {
      return {
        src: `${IMIKINO_URL_IMAGE}/news/${post.image}`,
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
          views={post.views}
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
          views={post.views}
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
                <Col md="4">
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="Imikino_rw"
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
              {/* <MDBRow>
                <MDBCol>
                  <Title text="TOP SCORER" />
                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol md="12">
                  {listOfPlayers && listOfPlayers.sort((a, b) =>  a - b).map(player => player && player.goals ? player.goals.length : null)}
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

const mapStateToProps = ({ posts, players }) => ({
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
  listOfPlayers: players.listOfPlayers,
  getPlayers: players.getPlayers
});

const mapDispatchToProps = (dispatch) => ({
  getAllPosts: (page, limit) => dispatch(getAllPosts(page, limit)),
  getHeaderPosts: (page, limit) => dispatch(getHeaderPosts(page, limit)),
  getTrendingPosts: () => dispatch(getTrendingPosts()),
  getAllPlayers: (page, limit) => dispatch(getAllPlayers(page, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
