import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBView } from 'mdbreact';
import moment from 'moment';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';

import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
  BACKEND_URL_IMAGE,
  HEROKU_URL,
  FRONTEND
} from '../../../../../redux/helpers/backendURLs';
import ApproveBtn from '../../../../utils/Dashboard/Buttons/ApproveBtn';

import { getSingle, editPost, approvePost } from '../../../../../redux/actions/post';
import { getPostComments } from '../../../../../redux/actions/comments';

import './Styles.scss';

class Frontpage2 extends Component {
  state = {
    uploadPercentage: 0,
    socket: openSocket(HEROKU_URL),
  }

  componentDidMount() {
    const {
      getSingle,
      getPostComments,
      match,
    } = this.props;
    getSingle(match.params.slug);
    getPostComments(match.params.slug);
  }

  
  approvePos = (slug) => {
    const { approvePost } = this.props;
    approvePost(slug);
  }

  render() {
    const {
      post,
      listOfComments,
      getPost
    } = this.props;

    const jsx = post && (
      <>
                        <h2 className="main-title">{post.title}</h2>
                        <MDBCard className="img-card" reverse>
                          <MDBRow>
                            <MDBView className="img-container text-center" hover cascade waves>
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
                                , {moment(post.updated_at).startOf('hour').fromNow()}
                              </p>
                              {/* <ul className="icons-list">
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
                              </ul> */}
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
                                          src={ comment.user && comment.user.profileImg ? comment.user.profileImg : require('../../../../../assets/logo.png')}
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
      </>
    )

    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Single Post" />
        <MDBRow>
          <MDBCol md="12">
            {post && (<ApproveBtn title={post.title} approve={() => this.approvePos(post.slug)} />)}
            <hr />
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol md="12">
            {
              getPost && getPost.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getPost.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getPost && getPost.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getPost.message}`}</strong>
                </div>
              ) : null
            }
          </MDBCol>
          <MDBCol md="12">
            <MDBCard body>
              <MDBCol md="12">
                {jsx}
              </MDBCol>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({
  post,
  comments,
  sports,
  locations,
  tags
}) => ({
  errors: post.errors,
  loading: post.loading,
  post: post.post,
  getPost: post.getPost,
  listOfComments: comments.listOfComments,
  getComments: comments.getComments,
  listOfSports: sports.listOfSports,
  getSports: sports.getSports,
  listOfLocations: locations.listOfLocations,
  getLocations: locations.getLocations,
  listOfTags: tags.listOfTags,
  getTags: tags.getTags,
});

const mapDispatchToProps = (dispatch) => ({
  getSingle: (slug) => dispatch(getSingle(slug)),
  getPostComments: (slug) => dispatch(getPostComments(slug)),
  editPost: (id, data, options) => dispatch(editPost(id, data, options)),
  approvePost: (id) => dispatch(approvePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage2);
