import React from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import ReactPlayer from 'react-player';

import './VideosPanel.scss';
import Title from '../Title';

function VideosPanel() {
  return (
    <MDBRow className="video-panel">
      <MDBCol size="12"><Title text="Videos" /></MDBCol>
      <MDBCol size="6">
        <ReactPlayer url={[
          'https://www.youtube.com/watch?v=oUFJJNQGwhk',
          'https://www.youtube.com/watch?v=jNgP6d9HraI'
        ]}
      />
      </MDBCol>
    </MDBRow>
  );
}

export default VideosPanel;
