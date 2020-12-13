import React, { useState } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import ReactPlayer from 'react-player';

import './VideosPanel.scss';
import Title from '../Title';

const VideosPanel = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <MDBRow className="video-panel">
      <MDBCol size="12"><Title text="Videos" /></MDBCol>
      <MDBCol md="6" className="vid-wrapper" size="12">
        <ReactPlayer url={[
            'https://www.youtube.com/watch?v=UZnTPDy-znE',
            'https://www.youtube.com/watch?v=bUrGf6Fhi4s',
          ]}
          width='100%'
          height='100%'
          style={{ marginBottom: '15px' }}
          controls
        />
      </MDBCol>
      <MDBCol md="6">
        <div>
          <iframe src={`https://www.youtube.com/embed/watch?v=UZnTPDy-znE`}
            allow="accelerometer;
            autoplay;
            encrypted-media;
            gyroscope;
            picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </MDBCol>
    </MDBRow>
  );
}

export default VideosPanel;
