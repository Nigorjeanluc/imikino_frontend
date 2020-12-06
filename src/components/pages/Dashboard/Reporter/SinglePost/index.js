import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBBox, MDBTypography } from 'mdbreact';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import AdminCardSection1 from '../../../../utils/Sections/AdminCardSection1';

import {SOCKET_URL} from '../../../../../redux/helpers/backendURLs';

import { getSingle } from '../../../../../redux/actions/post';
import { getPostComments } from '../../../../../redux/actions/comments';
import ChartSection1 from '../../../../utils/Sections/ChartSection1';
import TableSection from '../../../../utils/Sections/TableSection';
import ChartSection2 from '../../../../utils/Sections/ChartSection2';
// import MapSection from '../../../../utils/Sections/MapSection';
import ModalSection from '../../../../utils/Sections/ModalSection';
import AdminCardSection2 from '../../../../utils/Sections/AdminCardSection2';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class Frontpage2 extends Component {
  state = {
   content: '',
   editorState: EditorState.createEmpty(),
  }

  componentDidMount() {
    const { getSingle, getPostComments, match, post } = this.props;
    getSingle(match.params.slug);
    getPostComments(match.params.slug);
  }

  componentWillReceiveProps() {
    const { post } = this.props;

    const done = post && post.id ? this.convertToEditor(post.body) : null;
  }

  convertToEditor = (html) => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState
      })
    }
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  }

  render() {
    const {
      post,
      listOfComments
    } = this.props;
    const {
      editorState
    } = this.state;

    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Single Post" />
        <MDBRow>
          <MDBCol md="12">
            <MDBCard body>
              <MDBCol md="12">
                { post && post.id ? (
                <div key={post.id}>
                  <MDBTypography tag="h4" variant="display-4">{post.title}</MDBTypography>
                  <img src={`${SOCKET_URL}/uploads/news/${post.image}`} alt="News Image" />
                </div>
                ) : null }
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
              </MDBCol>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ post, posts, comments }) => ({
  errors: post.errors,
  loading: post.loading,
  post: post.post,
  getPost: post.getPost,
  listOfComments: comments.listOfComments,
  getComments: comments.getComments
});

const mapDispatchToProps = (dispatch) => ({
  getSingle: (slug) => dispatch(getSingle(slug)),
  getPostComments: (slug) => dispatch(getPostComments(slug))
});

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage2);
