/* eslint-disable global-require */
import React, { Component, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  faFacebook,
  faFacebookSquare,
  faTwitter,
  faWhatsapp
} from '@fortawesome/fontawesome-free-brands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';

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

import {
  IMIKINO_URL_IMAGE,
  LOCAL_URL_IMAGE,
  BACKEND_URL_IMAGE,
  BASIC_URL,
  FRONTEND
} from '../../../redux/helpers/backendURLs';
import { getSingle } from '../../../redux/actions/post';
import { getTrendingPosts } from '../../../redux/actions/posts';
import { getPostComments } from '../../../redux/actions/comments';
import { createComment } from '../../../redux/actions/comment';
import Navbar from '../../utils/navbar/Navbar';
import Scroll from '../../utils/BackToTop';
// import GlobalStyle from '../../../styles/Global';
// import Title from '../../utils/Title';
import Footer from '../../utils/Footer';
import './SinglePost.scss';
import Title from '../../utils/Title';
import NewsCard from '../../utils/NewsCard';
import HelmetMetaData from '../../utils/HelmetMetaData';

export class SinglePost extends Component {
  state = {
    navbarOpen: false,
    amazina: '',
    email: '',
    phone: '',
    message: '',
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

  handleAmazina = (event) => {
    this.setState({
      amazina: event.target.value
    });
  }

  handleEmail = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { match, post, createComment } = this.props;
    const {
      amazina,
      email,
      phone,
      message
    } = this.state;

    createComment(match.params.slug, {
      name: amazina,
      email,
      phone,
      comment: message,
    })
  }

  
  handlePhone = (event) => {
    this.setState({
      phone: event.target.value
    });
  }

  handleMessage = (event) => {
    this.setState({
      message: event.target.value
    });
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
                                src={`${BACKEND_URL_IMAGE}/news/${post.image}`}
                                alt={post.slug}
                                className="img-fluid postImg"
                              />
                            </MDBView>
                          </MDBRow>
                        </MDBCard>
                        <div className="text-center">
                              {/* <h2 style={{fontSize: '12px'}} className="font-weight-bold">
                                {post.title}
                              </h2> */}
                              <p style={{marginTop: '20px'}}>
                                Yanditswe na 
                                <a href="#!">
                                  <strong> {post.author}</strong>
                                </a>
                                , {moment(post.updated_at).format('MMM Do YYYY, h:mm a')}
                              </p>
                              <ul className="icons-list">
                                <li>
                                  <FacebookShareButton
                                    url={`${FRONTEND}/${post.slug}`}
                                    quote={post.title}
                                    hashtag="#imikino.rw"
                                  >
                                    <FontAwesomeIcon icon={faFacebook} size="3x"/>
                                  </FacebookShareButton>
                                  </li>
                                  <li>
                                    <TwitterShareButton
                                        url={`${FRONTEND}/${post.slug}`}
                                        title={post.title}
                                        hashtag="#imikino.rw"
                                      >
                                        <FontAwesomeIcon icon={faTwitter} size="3x"/>
                                    </TwitterShareButton>
                                  </li>
                                  <li>
                                    <WhatsappShareButton
                                      url={`${FRONTEND}/${post.slug}`}
                                      title={post.title}
                                    >
                                      <FontAwesomeIcon icon={faWhatsapp} size="3x"/>
                                    </WhatsappShareButton>
                                  </li>
                              </ul>
                        </div>
                        <MDBContainer style={{
                          paddingRight: '0px !important',
                          paddingLeft: '0px !important'
                        }} className="mt-5">
                          {parse(`<div class="body-font">${post.body}</div>`)}
                          {post.image1 ? (
                          <MDBView className="img-container" hover cascade waves>
                            <img
                              src={`${BACKEND_URL_IMAGE}/news/${post.image1}`}
                              alt={post.slug}
                              className="img-fluid"
                            />
                          </MDBView>
                          ) : null}
                          {post.body2 ? parse(`<div class="body-font">${post.body2}</div>`) : null}
                          {post.image2 ? (
                          <MDBView className="img-container" hover cascade waves>
                            <img
                              src={`${BACKEND_URL_IMAGE}/news/${post.image2}`}
                              alt={post.slug}
                              className="img-fluid"
                            />
                          </MDBView>
                          ) : null}
                          {post.body3 ? parse(`<div class="body-font">${post.body3}</div>`) : null}
                        </MDBContainer>
                        { listOfComments && listOfComments.length > 0 && (
                        <MDBCard
                          className="mt-5 my-5 px-5 pt-4"
                          style={{ fontWeight: 600 }}
                        >
                          <MDBCardBody className="py-0">
                            <MDBRow>
                              <div className="col-md-12 commentsTitle">
                                <h2>Comments</h2>
                              </div>
                              <div className="col-md-12 mdb-feed feedSection">
                                { listOfComments.map((comment) => (
                                  <div key={comment.id} className="news feedSection commentArea">
                                    <div className="labels">
                                      <div className="userImg">
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
                                      <div className="userDetails">
                                        <span>{` ${comment.name}`}</span>
                                        <span>{moment(comment.created_at).fromNow()}</span>
                                      </div>
                                    </div>
                                    <div className="excerpt">
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
                        <MDBCard style={{marginTop: 20}}>
                          <MDBCardBody>
                            <h2 className="text-center">Gira icyo ubivugaho</h2><hr />
                            <form onSubmit={this.handleSubmit}>
                            <MDBRow className="commentForm">
                              <MDBCol md="12">
                                <label>Amazina</label>
                                <input
                                  type="text"
                                  placeholder="Andika amazina yawe hano"
                                  className="form-control"
                                  onChange={this.handleAmazina}
                                  value={this.state.amazina}
                                />
                              </MDBCol>
                              {/* <MDBCol md="6">
                                <label>Email</label>
                                <input
                                  type="text"
                                  placeholder="Andika Email yawe hano"
                                  className="form-control"
                                  onChange={this.handleEmail}
                                  value={this.state.email}
                                />
                              </MDBCol> */}
                              <MDBCol md="12">
                                <label>Telephone</label>
                                <input
                                  type="text"
                                  placeholder="Andika telephone yawe hano"
                                  className="form-control"
                                  onChange={this.handlePhone}
                                  value={this.state.phone}
                                />
                              </MDBCol>
                              <MDBCol md="12">
                                <label>Message</label>
                                <textarea
                                  rows="5"
                                  className="form-control"
                                  placeholder="Andika ubutumwa byawe hano"
                                  onChange={this.handleMessage}
                                  value={this.state.message}
                                />
                              </MDBCol>
                              <MDBCol md="12">
                                <MDBBtn
                                  size="lg"
                                  style={{width: '100%', marginBottom: '20px'}}
                                  type="submit"
                                  color="deep-purple"
                                >
                                  Ohereza ubutumwa bwawe
                                </MDBBtn>
                              </MDBCol>
                            </MDBRow>
                            </form>
                          </MDBCardBody>
                        </MDBCard>
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
        <a href={`${news.slug}`}>
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
        </a>
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
        {post && (
          <HelmetMetaData
            title={post.title}
            quote={post.title}
            image={`${BACKEND_URL_IMAGE}/news/${post.image}`}
            description={post.body}
            hashtag="imikino.rw"
          ></HelmetMetaData>
        )}
        <Container fluid>
          <Scroll showBelow={250} />
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
                          boxShadow: "none",
                          background: 'none'
                      }}>
                        <Row style={{
                          // border: "none",
                          // boxShadow: "none"
                        }}>
                          <MDBCol><MDBCard className="panel-card" cascade><Title text="INKURU ZIKUNZWE" /></MDBCard></MDBCol></Row>
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
  getPostComments: (slug) => dispatch(getPostComments(slug)),
  createComment: (slug, data) => dispatch(createComment(slug, data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
