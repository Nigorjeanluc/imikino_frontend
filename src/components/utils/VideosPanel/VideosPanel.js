import React from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import ReactPlayer from 'react-player';

import './VideosPanel.scss';
import Title from '../Title';

function VideosPanel() {
  return (
    <MDBRow className="video-panel">
      <MDBCol size="12"><Title text="Videos" /></MDBCol>
      <MDBCol className="vid-wrapper" size="12">
        <ReactPlayer url={[
          'https://www.youtube.com/watch?v=-Rr3rG4cccM',
          'https://www.youtube.com/watch?v=o_17s8yUrB8',
          'https://www.youtube.com/watch?v=NnvemSKn5Nw',
          'https://www.youtube.com/watch?v=zAMMUqtSsjM',
          'https://www.youtube.com/watch?v=PdgjdLESoiU'
        ]}
        width='100%'
        height='100%'
        style={{ marginBottom: '15px' }}
        controls
      />
      </MDBCol>
    </MDBRow>
  );
}

export default VideosPanel;
