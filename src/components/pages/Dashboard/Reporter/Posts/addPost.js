import React, { Component } from 'react';
import {
  MDBCol,
  MDBRow,
  MDBBadge,
  MDBCardBody,
  MDBCard,
  MDBProgress,
  MDBBtn,
} from 'mdbreact';
import Select from 'react-select';
import { connect } from 'react-redux';
import openSocket from 'socket.io-client';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import {SOCKET_URL, HEROKU_URL} from '../../../../../redux/helpers/backendURLs';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import { createPost } from '../../../../../redux/actions/post';
import { getAllSports } from '../../../../../redux/actions/sports';
import { getAllLocations } from '../../../../../redux/actions/locations';
import { getAllTags } from '../../../../../redux/actions/tags';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AddPost extends Component {
  state = {
    uploadPercentage: 0,
    title: '',
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
    isTransfer: false,
    socket: openSocket(HEROKU_URL),
    content: '',
    content2: '',
    content3: '',
    approved: false,
    editorState: EditorState.createEmpty(),
    editorState2: EditorState.createEmpty(),
    editorState3: EditorState.createEmpty(),
    options: [],
    allViews: 0
  }

  componentDidMount() {
    const {
      getAllSports,
      getAllLocations,
      getAllTags
    } = this.props;
    getAllSports(1, 2000);
    getAllLocations(1, 2000);
    getAllTags(1, 2000);
  }

  
  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  }
  
  onEditorStateChange2 = (editorState2) => {
    this.setState({
      editorState2,
      content2: draftToHtml(convertToRaw(editorState2.getCurrentContent()))
    });
  }

  onEditorStateChange3 = (editorState3) => {
    this.setState({
      editorState3,
      content3: draftToHtml(convertToRaw(editorState3.getCurrentContent()))
    });
  }

  handleChangeTitle = (event) => {
    this.setState({ title: event.target.value });
  }
  
  handleChangeTag = (event) => {
    this.setState({ options: event });
  }

  handleChangeLocation = (event) => {
    this.setState({ location_id: event.target.value });
  }

  handleChangeSport = (event) => {
    this.setState({ sport_id: event.target.value });
  }

  handleChangeTransfer = (event) => {
    this.setState({ isTransfer: event.target.value });
  }

  handleChangeImage = (event) => {
    this.setState({ image: event.target.files[0] });
  }

  handleChangeImage1 = (event) => {
    this.setState({ image1: event.target.files[0] });
  }

  handleChangeImage1Txt = (event) => {
    this.setState({ image1Txt: event.target.value });
  }

  handleChangeImage2 = (event) => {
    this.setState({ image2: event.target.files[0] });
  }

  handleChangeImage2Txt = (event) => {
    this.setState({ image2Txt: event.target.value });
  }

  handleChangeImage3 = (event) => {
    this.setState({ image3: event.target.files[0] });
  }

  handleChangeImage3Txt = (event) => {
    this.setState({ image3Txt: event.target.value });
  }

  handleChangeImage4 = (event) => {
    this.setState({ image4: event.target.files[0] });
  }

  handleChangeImage4Txt = (event) => {
    this.setState({ image4Txt: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { createPost } = this.props;
    const {
      image,
      title,
      socket,
      content,
      content2,
      content3,
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
      allViews
    } = this.state;
    const formData = new FormData();
    formData.append('image', image, image.name);
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
    formData.append('body2', content2);
    formData.append('body3', content3);
    formData.append('sport_id', sport_id);
    formData.append('location_id', location_id);
    formData.append('tags', JSON.stringify(options));
    formData.append('allViews', allViews);

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

    createPost(formData, formOptions);
  }

  render() {
    const {
      listOfLocations,
      listOfSports,
      listOfTags,
      getLocations,
      getSports,
      getTags,
      getPost
    } = this.props;

    const {
      editorState,
      editorState2,
      editorState3
    } = this.state;

    const options = listOfTags && listOfTags.map(tag => {
      return {
        label: tag.name,
        value: tag.id
      }
    });

    console.log(options, "Options");
    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Add Post" />
        <MDBRow>
          <MDBCol md="12">
            {
              getPost && getPost.errors === true ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getPost.error}`}</strong>
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
            <MDBCard>
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
                    <label htmlFor="image">Post Image</label>
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
                    <MDBRow
                      style={{
                        marginBottom: '20px'
                      }}
                    >
                      <MDBCol md="12">
                        <label>Select Tags</label>
                        <Select
                          // defaultValue={[this.state.options[0], this.state.options[2]]}
                          isMulti
                          name="colors"
                          options={options}
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
                            value={this.state.location_id}
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
                            value={this.state.sport_id}
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
                        <label htmlFor="transfer">Is Post transfer related</label>
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
                        height: '200px',
                        border: '2px solid black',
                        backgroundColor: 'white',
                        padding: '10px',
                        marginTop: 0
                      }}
                    />
                    <MDBRow>
                      <MDBCol md="6">
                        <label htmlFor="image">Post Image 2</label>
                        <div style={{marginBottom: '10px'}} className="custom-file">
                          <input
                            onChange={this.handleChangeImage1}
                            type="file"
                            className="custom-file-input"
                            id="image"
                            name="image"
                            aria-describedby="inputGroupFileAddon01"
                          />
                          <label className="custom-file-label" htmlFor="image">
                            {
                              this.state.image1 ? this.state.image1.name : 'Choose image'
                            }
                          </label>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="image2_txt">Image 2 Text</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeImage1Txt}
                          value={this.state.image1Txt}
                          type="text"
                          name="image2_txt"
                          className="form-control"
                          id="image2_txt"
                        />
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
                      editorState={editorState2}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange2}
                      wrapperStyle={{
                        backgroundColor: 'white',
                        marginBottom: '20px'
                      }}
                      toolbarStyle={{
                        backgroundColor: 'black',
                        marginBottom: 0
                      }}
                      editorStyle={{
                        height: '200px',
                        border: '2px solid black',
                        backgroundColor: 'white',
                        padding: '10px',
                        marginTop: 0
                      }}
                    />
                    <MDBRow>
                      <MDBCol md="6">
                        <label htmlFor="image3">Post Image 3</label>
                        <div style={{marginBottom: '10px'}} className="custom-file">
                          <input
                            onChange={this.handleChangeImage2}
                            type="file"
                            className="custom-file-input"
                            id="image3"
                            name="image3"
                            aria-describedby="inputGroupFileAddon01"
                          />
                          <label className="custom-file-label" htmlFor="image3">
                            {
                              this.state.image2 ? this.state.image2.name : 'Choose image'
                            }
                          </label>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="image3_txt">Image 3 Text</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeImage2Txt}
                          value={this.state.image2Txt}
                          type="text"
                          name="image3_txt"
                          className="form-control"
                          id="image3_txt"
                        />
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
                      editorState={editorState3}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange3}
                      wrapperStyle={{
                        backgroundColor: 'white',
                        marginBottom: '20px'
                      }}
                      toolbarStyle={{
                        backgroundColor: 'black',
                        marginBottom: 0
                      }}
                      editorStyle={{
                        height: '200px',
                        border: '2px solid black',
                        backgroundColor: 'white',
                        padding: '10px',
                        marginTop: 0
                      }}
                    />
                    <MDBRow>
                      <MDBCol md="6">
                        <label htmlFor="image4">Post Image 4</label>
                        <div style={{marginBottom: '10px'}} className="custom-file">
                          <input
                            onChange={this.handleChangeImage3}
                            type="file"
                            className="custom-file-input"
                            id="image4"
                            name="image4"
                            aria-describedby="inputGroupFileAddon01"
                          />
                          <label className="custom-file-label" htmlFor="image">
                            {
                              this.state.image3 ? this.state.image3.name : 'Choose image'
                            }
                          </label>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="image4_txt">Image 4 Text</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeImage3Txt}
                          value={this.state.image3Txt}
                          type="text"
                          name="image3_txt"
                          className="form-control"
                          id="image3_txt"
                        />
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                      <MDBCol md="6">
                        <label htmlFor="image4">Post Image 5</label>
                        <div style={{marginBottom: '10px'}} className="custom-file">
                          <input
                            onChange={this.handleChangeImage4}
                            type="file"
                            className="custom-file-input"
                            id="image4"
                            name="image4"
                            aria-describedby="inputGroupFileAddon01"
                          />
                          <label className="custom-file-label" htmlFor="image">
                            {
                              this.state.image4 ? this.state.image4.name : 'Choose image'
                            }
                          </label>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <label htmlFor="image5_txt">Image 5 Text</label>
                        <input
                          style={{
                            height: '30px',
                            marginBottom: '10px'
                          }}
                          onChange={this.handleChangeImage4Txt}
                          value={this.state.image4Txt}
                          type="text"
                          name="image5_txt"
                          className="form-control"
                          id="image5_txt"
                        />
                      </MDBCol>
                    </MDBRow>
                  </div>
                  <MDBRow>
                    <MDBCol md="12">
                      <MDBBtn size="lg" style={{width: '100%'}} type="submit" color="indigo">Save post</MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ sports, locations, tags, post }) => ({
  listOfSports: sports.listOfSports,
  getSports: sports.getSports,
  listOfLocations: locations.listOfLocations,
  getLocations: locations.getLocations,
  listOfTags: tags.listOfTags,
  getTags: tags.getTags,
  post: post.post,
  getPost: post.getPost
});

const mapDispatchToProps = (dispatch) => ({
  getAllSports: (page, limit) => dispatch(getAllSports(page, limit)),
  getAllLocations: (page, limit) => dispatch(getAllLocations(page, limit)),
  getAllTags: (page, limit) => dispatch(getAllTags(page, limit)),
  createPost: (data, options) => dispatch(createPost(data, options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
