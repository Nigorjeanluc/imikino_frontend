import React, { Component } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

export class ApproveBtn extends Component {
  state = {
    modal: false
  }
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
    <>
      <MDBBtn
        outline
        color="light-blue"
        onClick={this.toggle}
        className="livescoreBtn"
      >
        <MDBIcon size="2x" icon="check"/>
      </MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Approve this post</MDBModalHeader>
        <MDBModalBody className="text-center">
          <h3>Do you really want to approve this post? <br/> <i><b>{this.props.title}</b></i></h3>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="danger" onClick={this.toggle}>Cancel</MDBBtn>
          <MDBBtn color="info" onClick={this.props.approve}>Yes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
    )
  }
}

export default ApproveBtn;
