/* eslint-disable global-require */
import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  MDBContainer,
  MDBMedia,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBMask,
  MDBCardBody,
  MDBBtn,
  MDBView,
  MDBIcon,
  MDBTooltip,
  MDBCollapse,
  MDBInput
} from 'mdbreact';
import { connect } from 'react-redux';
import moment from 'moment';
import ClipLoader from 'react-spinners/ClipLoader';
import parse from 'html-react-parser';

import { IMIKINO_URL_IMAGE, LOCAL_URL_IMAGE } from '../../../redux/helpers/backendURLs';
import { getSingle } from '../../../redux/actions/post'
import { getTrendingPosts } from '../../../redux/actions/posts'
import { getPostComments } from '../../../redux/actions/comments';
import Navbar from '../../utils/navbar/Navbar';
// import GlobalStyle from '../../../styles/Global';
// import Title from '../../utils/Title';
import Footer from '../../utils/Footer';
import './SinglePost.scss';
import Title from '../../utils/Title';
import NewsCard from '../../utils/NewsCard';

export class SinglePost extends Component {
  state = {
    navbarOpen: false,
  };

  componentDidMount () {
    const { getSingle, getTrendingPosts, getPostComments, post, listOfComments, match } = this.props;
    getSingle(match.params.slug);
    getTrendingPosts();
    getPostComments(match.params.slug);
    console.log(listOfComments);
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  handleTrends = (slug) => {
    const { getSingle } = this.props;
    getSingle(slug);
  }

  render() {
    const { history, listOfComments, listOfTrending, post, loading } = this.props;

    const jsx = post && (
      <>
                        
                        <h2 className="main-title">{post.title}</h2>
                        <MDBCard className="img-card" reverse>
                          <MDBRow>
                            <MDBView className="img-container" hover cascade waves>
                              <img
                                src={`${IMIKINO_URL_IMAGE}/news/${post.image}`}
                                alt={post.slug}
                                className="img-fluid"
                              />
                            </MDBView>
                          </MDBRow>
                        </MDBCard>
                        <div className="text-center">
                              <h2 className="font-weight-bold">
                                {post.title}
                              </h2>
                              <p>
                                Written by 
                                <a href="#!">
                                  <strong> {post.author}</strong>
                                </a>
                                , {moment(post.updated_at).startOf('hour').fromNow()}
                              </p>
                              <MDBBtn color="primary" className="btn-fb waves-light" rounded>
                                <MDBIcon fab icon="facebook-f" className="pr-2" />
                                Facebook
                              </MDBBtn>
                              <MDBBtn color="info" className="btn-tw waves-light">
                                <MDBIcon fab icon="twitter" className="pr-2" />
                                Twitter
                              </MDBBtn>
                              <MDBBtn color="danger" className="btn-gplus waves-light">
                                <MDBIcon fab icon="google-plus-g" className="pr-2" />
                                Google
                              </MDBBtn>
                              <MDBBtn color="default" className="waves-light">
                                <span className="counter">{post.comments && post.comments.length} </span>
                                <MDBIcon icon="comments" className="pr-2" />
                                Comments
                              </MDBBtn>
                        </div>
                        <MDBContainer className="mt-5">
                          {parse(`<div class="body-font">${post.body}</div>`)}
                        </MDBContainer>
                        { listOfComments && (
                        <MDBCard
                          className="mt-5 my-5 px-5 pt-4"
                          style={{ fontWeight: 600 }}
                        >
                          <MDBCardBody className="py-0">
                            <MDBRow>
                              <div className="commentsTitle">
                                <h2>Comments</h2>
                              </div>
                              <div className="mdb-feed feedSection">
                                { listOfComments.map((comment) => (
                                  <div key={comment.id} className="news feedSection">
                                    <div className="label">
                                      <img
                                        style={{
                                          width: 50,
                                          height: 50,
                                          marginBottom: 20
                                        }}
                                        src={ comment.user && comment.user.profileImg ? comment.user.profileImg : require('../../../assets/logo.png')}
                                        alt=""
                                        className="rounded-circle z-depth-1-half"
                                      />
                                    </div>
                                    <div className="excerpt">
                                      <div className="brief">
                                        <a href="#!" className="name">
                                          {comment.name}
                                        </a> added you as a friend
                                        <div className="date">7 hours ago</div>
                                      </div>
                                      <div style={{marginTop: 10}} className="added-text">
                                        {comment.comment}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </MDBRow>
                          </MDBCardBody>
                        </MDBCard>)}
      </>
    )

    const mainJsx = loading ? (
      <ClipLoader
        css={{ display: 'block', margin: '0 auto' }}
        size={150}
        color={'#3AB397'}
        loading={loading}
      />
    ) : jsx;

    const trends = listOfTrending && listOfTrending.map((news, index) => (
      <Fragment key={index}>
        <NewsCard
          key={news.id}
          title={news.title}
          image={news.image}
          slug={`${news.slug}`}
          allViews={news.allViews}
          updated_at={news.updated_at}
          size={12}
          history={history}
        />
        {/* <Col>
          <MDBBtn tag="a" size="md" gradient="blue">
            {news.allViews} Views
          </MDBBtn>
        </Col> */}
      {/* <MDBMedia>
        <MDBMedia left middle className="mr-3" href="#">
          <MDBMedia style={{width: "100px", height: "100px"}} object src={`https://imikino.rw/images/news/${news.image}`} alt={news.title} />
        </MDBMedia>
        <MDBMedia body>
          <MDBMedia heading>
            <Link to={`${news.slug}`} className='black-text'>{news.title}</Link>
          </MDBMedia>
          <span className="Btn-trends">
            <MDBBtn tag="a" size="md" gradient="blue">
              {news.allViews} Views
            </MDBBtn>
          </span>
        </MDBMedia>
      </MDBMedia> */}
      <hr />
      </Fragment>
    ));
    return (
      <>
        <Container fluid>
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
              <MDBRow className="justify-content-center" style={{ marginTop: '6rem' }}>
                <MDBCol md="9" sm="12">
                  <MDBRow>
                    <MDBCol md="8">
                      <MDBCard>
                        <MDBCardBody>
                          <MDBContainer>
                            <MDBRow>
                              <MDBCol className="news-panel" md="12">
                                { mainJsx }
                              </MDBCol>
                            </MDBRow>
                          </MDBContainer>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                    <MDBCol md="4">
                      <MDBCard style={{
                          border: "none",
                          boxShadow: "none"
                      }}>
                        <Row style={{
                          // border: "none",
                          // boxShadow: "none"
                        }}>
                          <MDBCol><MDBCard className="panel-card" cascade><Title text="Trending News" /></MDBCard></MDBCol></Row>
                        <Row>{trends}</Row>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
              </MDBRow>
        </Container>
        <Footer/>
      </>
    );
  }
}


const mapStateToProps = ({ post, posts, comments }) => ({
  errors: post.errors,
  loading: post.loading,
  post: post.post,
  getPost: post.getPost,
  listOfTrending: posts.listOfTrending,
  getTrending: posts.getTrending,
  listOfComments: comments.listOfComments,
  getComments: comments.getComments
});

const mapDispatchToProps = (dispatch) => ({
  getSingle: (slug) => dispatch(getSingle(slug)),
  getTrendingPosts: () => dispatch(getTrendingPosts()),
  getPostComments: (slug) => dispatch(getPostComments(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
