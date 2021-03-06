import React, { useState, useEffect } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from "react-redux";
import { Embed } from 'semantic-ui-react';
import { TwitterTimelineEmbed } from 'react-twitter-embed';

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
    dispatch(getAllVideos(1, 2));
  }, [dispatch]);

  return (
    <MDBRow className="video-panel">
      <MDBCol size="12"><Title text="Videos" /></MDBCol>
      {
        videoData && videoData.listOfVideos ? videoData.listOfVideos.length > 0 && videoData.listOfVideos.map(video => (
        <MDBCol key={video.id} md="6" className="vid-wrapper">
          <ReactPlayer
            className="vid-frame"
            url={video.video_link}
            width='100%'
            height='100%'
            controls
          />
        </MDBCol>
        )
        ) : null
      }
      
      <MDBCol className="d-md-none d-xs-block" size="12" xs="12">
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="ImikinoRw"
                    options={{height: 1100, tweetLimit: 2}}
                    noScrollbar={true}
                    // noFooter={true}
                    // noHeader={true}
                    theme="dark"
                  />
      </MDBCol>
      {/* <MDBCol style={{padding: '15px 15px 15px 0'}} md="5">
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
      </MDBCol> */}
    </MDBRow>
  );
}

export default VideosPanel;
