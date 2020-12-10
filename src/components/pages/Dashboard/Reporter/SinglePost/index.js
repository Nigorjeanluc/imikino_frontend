import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBBox, MDBTypography, MDBBtn, MDBIcon } from 'mdbreact';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import Select from 'react-select';
import openSocket from 'socket.io-client';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import AdminCardSection1 from '../../../../utils/Sections/AdminCardSection1';

import {
  SOCKET_URL,
  LOCAL_URL_IMAGE,
  IMIKINO_URL_IMAGE,
  BACKEND_URL_IMAGE,
  HEROKU_URL
} from '../../../../../redux/helpers/backendURLs';

import { getSingle, editPost } from '../../../../../redux/actions/post';
import { getPostComments } from '../../../../../redux/actions/comments';
import { getAllSports } from '../../../../../redux/actions/sports';
import { getAllLocations } from '../../../../../redux/actions/locations';
import { getAllTags } from '../../../../../redux/actions/tags';
import ChartSection1 from '../../../../utils/Sections/ChartSection1';
import TableSection from '../../../../utils/Sections/TableSection';
import ChartSection2 from '../../../../utils/Sections/ChartSection2';
// import MapSection from '../../../../utils/Sections/MapSection';
import ModalSection from '../../../../utils/Sections/ModalSection';
import AdminCardSection2 from '../../../../utils/Sections/AdminCardSection2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Frontpage2 extends Component {
  state = {
    uploadPercentage: 0,
    id: 0,
    title: '',
    originalImage: null,
    image: null,
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image1Txt: '',
    image2Txt: '',
    image3Txt: '',
    image4Txt: '',
    location_id: 0,
    sport_id: 0,
    socket: openSocket(HEROKU_URL),
    content: '',
    approved: false,
    isTransfer: false,
    isTitleToggled: false,
    editorState: EditorState.createEmpty(),
    options: [],
    allViews: 0
  }

  componentDidMount() {
    const {
      getSingle,
      getPostComments,
      match,
      getAllSports,
      getAllLocations,
      getAllTags
    } = this.props;
    getSingle(match.params.slug);
    getPostComments(match.params.slug);
    getAllSports(1, 2000);
    getAllLocations(1, 2000);
    getAllTags(1, 2000);
  }

  componentWillReceiveProps() {
    const { post } = this.props;

    if (post && post.id) this.convertToEditor(post.body);

    this.setState({
      title: post.title,
      location_id: post.location_id,
      sport_id: post.sport_id,
      options: post.tags,
      id: post.slug,
      isTransfer: post.isTransfer,
      originalImage: post.image,
    })
  }

  convertToEditor = (html) => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState
      });
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  }

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value
    })
  }
  handleChangeSport = (event) => {
    this.setState({ sport_id: event.target.value })
  }

  handleChangeLocation = (event) => {
    this.setState({ location_id: event.target.value })
  }

  handleChangeTransfer = (event) => {
    this.setState({ isTransfer: event.target.value })
  }

  handleChangeTag = (event) => {
    this.setState({ options: event });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { editPost, post } = this.props;
    const {
      image,
      title,
      socket,
      content,
      image1,
      image1Txt,
      image2,
      image2Txt,
      image3,
      image3Txt,
      image4,
      image4Txt,
      sport_id,
      location_id,
      approved,
      isTransfer,
      options,
      allViews,
      originalImage,
      id
    } = this.state;
    const formData = new FormData();
    if (image) {
      formData.append('image', image, image.name);
    } else {
      formData.append('image', originalImage);
    }
    if (image1) formData.append('image1', image1, image1.name);
    if (image2) formData.append('image2', image2, image2.name);
    if (image3) formData.append('image3', image3, image3.name);
    if (image4) formData.append('image4', image4, image4.name);
    if (image1) formData.append('image1_txt', image1Txt);
    if (image2) formData.append('image2_txt', image2Txt);
    if (image3) formData.append('image3_txt', image3Txt);
    if (image4) formData.append('image4_txt', image4Txt);
    formData.append('approved', approved);
    formData.append('isTransfer', isTransfer);
    formData.append('title', title);
    formData.append('body', content);
    formData.append('sport_id', sport_id);
    formData.append('location_id', location_id);
    formData.append('tags', JSON.stringify(options));
    formData.append('allViews', allViews)

    const formOptions = {
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

    editPost(id, formData, formOptions);
  }

  render() {
    const {
      post,
      listOfComments,
      listOfLocations,
      listOfSports,
      listOfTags,
      getPost
    } = this.props;
    const {
      editorState,
      isTitleToggled,
      options,
      location_id,
      sport_id
    } = this.state;

    const defaultTags = post && post.tags && post.tags.map(tag => {
      return {
        label: tag.name,
        value: tag.id
      };
    });

    console.log(getPost);

    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Single Post" />
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
              <form ref="form" onSubmit={this.handleSubmit}>
                { post && post.id ? (
                <div key={post.id}>
                  {isTitleToggled ?
                    <div style={{
                      paddingTop: '10px'
                    }}>
                      <label htmlFor="postTitle">Title</label>
                      <input
                        style={{
                          height: '30px',
                          marginBottom: '10px'
                        }}
                        onChange={this.handleChangeTitle}
                        value={this.state.title}
                        type="text"
                        name="title"
                        className="form-control"
                        id="postTitle"
                      />
                    </div> : <h4>{post.title} <MDBBtn outline color="dark"><MDBIcon onClick={() => this.setState({ isTitleToggled: !isTitleToggled})} size="2x" icon="edit"/></MDBBtn></h4>}
                  {/* <MDBTypography tag="h4" variant="display-4">{post.title} <MDBBtn outline color="dark"><MDBIcon onClick={this.toggleTitle} size="2x" icon="edit"/></MDBBtn></MDBTypography> */}
                  <img style={{
                    width: '100%',
                    height: '350px',
                    marginBottom: '20px'
                  }} src={`${BACKEND_URL_IMAGE}/news/${post.image}`} alt="News Image" />
                </div>
                ) : null }
                <MDBRow
                  style={{
                    marginBottom: '20px'
                  }}
                >
                  <MDBCol md="12">
                    <label>Select Tags</label>
                    <Select
                      defaultValue={defaultTags}
                      isMulti
                      name="colors"
                      options={listOfTags && listOfTags.map(tag => {
                        return {
                          label: tag.name,
                          value: tag.id
                        }
                      })}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={this.handleChangeTag}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow
                  style={{
                    marginBottom: '20px'
                  }}
                >
                  <MDBCol md="4">
                    <label htmlFor="location">Select location</label>
                    <div>
                      <select
                        onChange={this.handleChangeLocation}
                        value={location_id}
                        style={{height: '30px', fontSize: '14px'}}
                        className="browser-default custom-select"
                        name="location_id"
                      >
                        <option>Choose location</option>
                        {listOfLocations && listOfLocations.map(location => (
                          <option key={location.id} value={location.id}>{location.name}</option>
                        ))}
                      </select>
                    </div>
                  </MDBCol>
                  <MDBCol md="4">
                    <label htmlFor="sport">Select sport</label>
                    <div>
                      <select
                        onChange={this.handleChangeSport}
                        value={sport_id}
                        style={{height: '30px', fontSize: '14px'}}
                        className="browser-default custom-select"
                        name="sport_id"
                      >
                        <option>Choose sport</option>
                        {listOfSports && listOfSports.map(sport => (
                          <option key={sport.id} value={sport.id}>{sport.name}</option>
                        ))}
                      </select>
                    </div>
                  </MDBCol>
                  <MDBCol md="4">
                    <label htmlFor="transfer">Is Post tranfer related</label>
                    <select
                      onChange={this.handleChangeTransfer}
                      value={this.state.isTransfer}
                      style={{height: '30px', fontSize: '14px'}}
                      className="browser-default custom-select"
                      name="transfer"
                    >
                      <option value={false}>NO</option>
                      <option value={true}>YES</option>
                    </select>
                  </MDBCol>
                </MDBRow>
                <Editor
                  // toolbarHidden
                  // toolbar={{
                  //   inline: { inDropdown: true },
                  //   list: { inDropdown: true },
                  //   textAlign: { inDropdown: true },
                  //   link: { inDropdown: true },
                  //   history: { inDropdown: true },
                  // }}
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={this.onEditorStateChange}
                  wrapperStyle={{
                    backgroundColor: 'white',
                    marginBottom: '20px'
                  }}
                  toolbarStyle={{
                    backgroundColor: 'black',
                    marginBottom: 0
                  }}
                  editorStyle={{
                    height: '400px',
                    border: '2px solid black',
                    backgroundColor: 'white',
                    padding: '10px',
                    marginTop: 0
                  }}
                />
                <MDBRow>
                  <MDBCol md="12">
                    <MDBBtn size="lg" style={{width: '100%', marginBottom: '20px'}} type="submit" color="dark-green">Change post</MDBBtn>
                  </MDBCol>
                </MDBRow>
              </form>
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
  getAllSports: (page, limit) => dispatch(getAllSports(page, limit)),
  getAllLocations: (page, limit) => dispatch(getAllLocations(page, limit)),
  getAllTags: (page, limit) => dispatch(getAllTags(page, limit)),
  editPost: (id, data, options) => dispatch(editPost(id, data, options))
});

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage2);
