import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from "react-redux";
import { Embed } from 'semantic-ui-react';

import './VideosPanel.scss';
import Title from '../Title';
import { getAllVideos } from '../../../redux/actions/videos';

const VideosPanel = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoData = useSelector(({
    videos
  }) => ({
    loading: videos.loading,
    errors: videos.errors,
    listOfVideos: videos.listOfVideos,
    getVideos: videos.getVideos,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideos(1, 10));
  }, [dispatch]);

  return (
    <MDBRow className="video-panel">
      <MDBCol size="12"><Title text="Videos" /></MDBCol>
      <MDBCol md="7" className="vid-wrapper" size="12">
        <ReactPlayer url={
          videoData.listOfVideos.length > 0 ? videoData.listOfVideos : [
            'https://www.youtube.com/watch?v=UZnTPDy-znE',
            'https://www.youtube.com/watch?v=bUrGf6Fhi4s',
          ]
        }
          width='100%'
          height='405px'
          style={{ marginBottom: '15px' }}
          controls
        />
      </MDBCol>
      <MDBCol style={{padding: '15px 15px 15px 0'}} md="5">
        {videoData.listOfVideos.length > 0 ? videoData.listOfVideos.map(video => (
          <div key={video.id}>
            <iframe src={video.video_link}
              allow="accelerometer;
              autoplay;
              encrypted-media;
              gyroscope;
              picture-in-picture"
              allowFullScreen
              style={{
                width: '100%',
                height: '200px',
              }}
            ></iframe>
          </div>
        )) : (
          <>
            <div>
              <iframe src={`https://www.youtube.com/embed/watch?v=UZnTPDy-znE`}
                allow="accelerometer;
                autoplay;
                encrypted-media;
                gyroscope;
                picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '200px',
                }}
              ></iframe>
            </div>
            <div>
              <iframe src={`https://www.youtube.com/embed/watch?v=UZnTPDy-znE`}
                allow="accelerometer;
                autoplay;
                encrypted-media;
                gyroscope;
                picture-in-picture"
                allowFullScreen
                style={{
                  width: '100%',
                  height: '200px',
                }}
              ></iframe>
            </div>
          </>
        )}
      </MDBCol>
    </MDBRow>
  );
}

export default VideosPanel;
