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
} from 'mdbreact';
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
import { getAllVideos } from '../../../../../redux/actions/videos';
import {
  createVideo,
  editVideo,
  deleteVideo
} from '../../../../../redux/actions/video';
import Pagination from '../../../../utils/Pagination';
import DeleteBtn from '../../../../utils/Dashboard/Buttons/DeleteBtn';
import EditBtnVideo from '../../../../utils/Dashboard/Buttons/EditBtn';

class VideosPage extends Component {
  state = {
    video_link: '',
    socket: openSocket(HEROKU_URL)
  }

  componentDidMount() {
    const {
      getAllVideos,
    } = this.props;
    getAllVideos(1, 10);

    const { socket } = this.state;
    socket.on('refreshVideo', (data) => {
      getAllVideos(1, 10);
    });
  }

  handleChange = (event) => {
    this.setState({ video_link: event.target.value});
  }

  handleSubmit = (event) => {
    const { createVideo } = this.props;
    createVideo({ video_link: this.state.video_link });
    event.preventDefault();
  }

  nextPagination = (e) => {
    const { getAllVideos, Next } = this.props;
    if(e) {
      getAllVideos(Next.page, 10);
    }
  };

  prevPagination = (e) => {
    const { getAllVideos, Previous } = this.props;
    if(e) {
      getAllVideos(Previous.page, 10);
    };
  }

  deleteLoc = (id) => {
    const { deleteVideo } = this.props;
    deleteVideo(id);
  }

  render() {
    const {
      listOfVideos,
      getVideo,
      Next,
      Previous
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
        <BreadcrumSection pageTitle="Videos" />
        <MDBRow>
          <MDBCol md="12">
            {
              getVideo && getVideo.errors !== '' ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{`${getVideo.errors}`}</strong>
                </div>
              ) : null
            }
            {
              getVideo && getVideo.message ? (
                <div className="alert alert-success" role="alert">
                  <strong>{`${getVideo.message}`}</strong>
                </div>
              ) : null
            }
          </MDBCol>
        </MDBRow>
        <MDBRow className="mb-4">
          <MDBCol md="6">
              <MDBCard>
                  <MDBCardBody>
                    <MDBTable hover>
                      <MDBTableHead color="blue-grey lighten-4">
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Time</th>
                          <th>Control</th>
                        </tr>
                      </MDBTableHead>
                      <MDBTableBody>
                        {
                          listOfVideos && listOfVideos.map(video => (
                            <tr key={video.id}>
                              <td style={{fontSize: '16px'}}>{video.id}</td>
                              <td style={{fontSize: '16px'}}>{video.video_link}</td>
                              <td style={{fontSize: '16px'}}>{moment(video.updated_at).startOf('hour').fromNow()}</td>
                              <td>
                                {/* <EditBtnVideo identify={video.id} videoData={video} /> */}
                                <DeleteBtn title="video" delete={() => this.deleteLoc(video.id)} />
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
          <MDBCol style={{fontSize: '16px'}} md="6" className="mb-4">
            <MDBCard>
              <MDBCardHeader>
                <h4>Add Video</h4>
              </MDBCardHeader>
              <MDBCardBody>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="video">Video video_link</label>
                    <input
                      style={{
                        height: '30px'
                      }}
                      onChange={this.handleChange}
                      value={this.state.video_link}
                      type="text"
                      className="form-control"
                      id="video"
                    />
                  </div>
                  <MDBBtn type="submit" flat color="indigo">Submit</MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ videos, video }) => ({
  Next: videos.Next,
  Previous: videos.Previous,
  errors: videos.errors,
  loading: videos.loading,
  listOfVideos: videos.listOfVideos,
  getVideos: videos.getVideos,
  video: video.video,
  getVideo: video.getVideo
});

const mapDispatchToProps = (dispatch) => ({
  getAllVideos: (page, limit) => dispatch(getAllVideos(page, limit)),
  createVideo: (data) => dispatch(createVideo(data)),
  editVideo: (id, data) => dispatch(editVideo(id, data)),
  deleteVideo: (id) => dispatch(deleteVideo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideosPage);
