/* eslint-disable global-require */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { MDBRow, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
// import moment from 'moment';
import { getAllPosts } from '../../../redux/actions/posts';
import Navbar from '../../utils/navbar/Navbar';
// import GlobalStyle from '../../../styles/Global';
import Title from '../../utils/Title';
import BtnLink from '../../utils/BtnLink';
import CarouselWindow from '../../utils/Carousel';
import Footer from '../../utils/Footer';
import NewsCard from '../../utils/NewsCard/NewsCard';
import './Home.scss';
import VideosPanel from '../../utils/VideosPanel';
import Gallery from '../../utils/Gallery';
import Pagination from '../../utils/Pagination';

export class Home extends Component {
  state = { navbarOpen: false };

  componentWillMount() {
    // eslint-disable-next-line no-unused-vars
    const { history, getAllPosts } = this.props;
    // const { token } = localStorage;
    // if (!token) {
    //   history.push('/');
    // }
    getAllPosts();
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    const { listOfPosts } = this.props;
    const images = [
      {
        src: require('../../../assets/imgs/1.jpg'),
        altText: 'Slide 1',
        caption: 'Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1 Slide 1Slide 1 Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1Slide 1'
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
        <Container fluid>
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
          <Row style={{ marginTop: '6rem' }} className="justify-content-md-center">
            <Col md={8}>
              <Title text="All Sport News"/>
              <Row>
                <Col md="8">
                  <CarouselWindow items={images}/>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <BtnLink active link="/" text="Latest News"/>
                </Col>
              </Row>
              <MDBRow className="cards-panel">
                {
                  listOfPosts && listOfPosts.map((post) => <NewsCard
                    key={post.id}
                    title={post.title}
                    image={post.image}
                    slug={post.slug}
                    views={post.views}
                  />)
                }
                <Col md="12">
                  <Pagination/>
                </Col>
              </MDBRow>
              <VideosPanel/>
              <hr className="line"/>
              <MDBRow>
                <MDBCol size="12">
                  <Title text="Gallery" />
                  <Gallery />
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
  listOfPosts: posts.listOfPosts
});

const mapDispatchToProps = (dispatch) => ({ getAllPosts: () => dispatch(getAllPosts()), });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
