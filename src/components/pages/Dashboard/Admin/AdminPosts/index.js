import React, { Component } from 'react';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBCardHeader,
  MDBProgress,
  MDBIcon
} from 'mdbreact';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import openSocket from 'socket.io-client';

import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
  BACKEND_URL_IMAGE,
  HEROKU_URL
} from '../../../../../redux/helpers/backendURLs';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import { getAdminPosts } from '../../../../../redux/actions/posts';
import { fetchPost, deletePostAdmin, createPostAdmin, editPostAdmin } from '../../../../../redux/actions/post';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnLeague from '../../../../utils/Dashboard/Buttons/EditBtnLeague';

class PostsPage extends Component {
  state = {
    uploadPercentage: 0,
    name: '',
    image: null,
    team_id: 0,
    description: '',
    socket: openSocket(HEROKU_URL)
  }

  componentDidMount() {
    const {
      getAdminPosts
    } = this.props;
    getAdminPosts(1, 10);

    const { socket } = this.state;
    socket.on('refreshPost', (data) => {
      console.log('Yes III');
      getAdminPosts(1, 10);
    });
  }

  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  handleChangeImage = (event) => {
    this.setState({ image: event.target.files[0] });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { createPostAdmin } = this.props;
    const { image, name, socket } = this.state;
    const formData = new FormData();
    formData.append('image',image, image.name);
    formData.append('name',name);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor( (loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent });
        }
        this.setState({ uploadPercentage: percent });
        socket.emit('createPost');
      }
    }

    createPostAdmin(formData, options);
  }

  nextPagination = (e) => {
    const { getAdminPosts, Next } = this.props;
    if(e) {
      getAdminPosts(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAdminPosts, Previous } = this.props;
    if(e) {
      getAdminPosts(Previous.page, 10);
    };
  }

  deletePos = (id) => {
    const { deletePostAdmin } = this.props;
    deletePostAdmin(id);
  }

  render() {
    const {
      listOfPosts,
      Next,
      Previous,
      getPost
    } = this.props;

    const currentPage = Next && !Next.page ? (
      Previous.page + 1
    ) : (
      Previous.page ? (
        Previous.page + 1
      ) : (
        Next.page - 1
      )
    );

    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="All Posts" />
        <MDBRow>
          <MDBCol md="12">
            <Link to="/admin/editor/posts/addpost">
              <MDBBtn color="amber" size="lg">Add a new Post</MDBBtn>
            </Link>
            <hr />
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-4">
          <MDBCol md="12">
              <MDBCard>
                  <MDBCardBody>
                    <MDBTable hover>
                      <MDBTableHead color="blue-grey lighten-4">
                        <tr>
                          <th>#</th>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Updated</th>
                          <th>Control</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {
                          listOfPosts && listOfPosts.map(post => (
                            <tr key={post.id}>
                              <td style={{fontSize: '16px'}}>{post.id}</td>
                              <td style={{fontSize: '16px'}}>
                                <span>
                                  <img style={{width: '160px', height: '80px'}} className="image-responsive" src={`${BACKEND_URL_IMAGE}/news/${post.image}`} alt={post.title} />
                                </span>
                              </td>
                              <td style={{fontSize: '16px'}}>
                                {post.title}
                              </td>
                              <td style={{fontSize: '16px'}}>
                                {post.approved ? <MDBBtn color="light-green">Approved</MDBBtn> : <MDBBtn color="red">Not Approved</MDBBtn>}
                              </td>
                              <td width='150px' style={{fontSize: '16px'}}>{moment(post.updated_at).fromNow()}</td>
                              <td
                                width='150px'
                              >
                                <MDBRow className="text-center">
                                  {/* <EditBtnLeague identify={post.id} {...this.props} /> */}
                                  <DeleteBtn title="post" delete={() => this.deletePos(post.slug)} />
                                  <Link to={`/admin/posts/${post.slug}`}>
                                    <MDBBtn
                                      color="success"
                                    >
                                      <MDBIcon size="2x" icon="eye"/>
                                    </MDBBtn>
                                  </Link>
                                </MDBRow>
                              </td>
                            </tr>
                          ))
                        }
                      </MDBTableBody>
                    </MDBTable>
                  </MDBCardBody>
              </MDBCard>
              <Pagination currentPage={currentPage} prevPagination={this.prevPagination} nextPagination={this.nextPagination} {...this.props} />
          </MDBCol>
          {/* <MDBCol style={{fontSize: '16px'}} md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader>
                <h4>Add League</h4>
              </MDBCardHeader>
              <MDBCardBody>
                {
                  getPost && getPost.loading === true ? (
                    <MDBProgress value={this.state.uploadPercentage} className="my-2" >
                      {this.state.uploadPercentage}%
                    </MDBProgress>
                  ) : null
                }
                <form ref="form" onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="post">League Image</label>
                    <div style={{marginBottom: '10px'}} className="custom-file">
                      <input
                        onChange={this.handleChangeImage}
                        type="file"
                        className="custom-file-input"
                        id="image"
                        name="image"
                        aria-describedby="inputGroupFileAddon01"
                      />
                      <label className="custom-file-label" htmlFor="image">
                        {
                          this.state.image ? this.state.image.name : 'Choose image'
                        }
                      </label>
                    </div>
                    <label htmlFor="post">League name</label>
                    <input
                      style={{
                        height: '30px',
                        marginBottom: '10px'
                      }}
                      onChange={this.handleChangeName}
                      value={this.state.name}
                      type="text"
                      name="name"
                      className="form-control"
                      id="post"
                    />
                  </div>
                  <MDBBtn type="submit" flat color="indigo">Submit</MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol> */}
        </MDBRow>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ posts, post }) => ({
  Next: posts.Next,
  Previous: posts.Previous,
  errors: posts.errors,
  loading: posts.loading,
  listOfPosts: posts.listOfPosts,
  getPosts: posts.getPosts,
  post: post.post,
  getPost: post.getPost,
});

const mapDispatchToProps = (dispatch) => ({
  getAdminPosts: (page, limit) => dispatch(getAdminPosts(page, limit)),
  createPostAdmin: (name, options) => dispatch(createPostAdmin(name, options)),
  editPostAdmin: (id, data) => dispatch(editPostAdmin(id, data)),
  deletePostAdmin: (id) => dispatch(deletePostAdmin(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
