import React, { Component } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

export class DeleteBtnMatch extends Component {
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
        onClick={this.toggle}
        color="danger"
        outline
      >
        Delete Match
      </MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Delete {this.props.title}</MDBModalHeader>
        <MDBModalBody className="text-center">
          <h3>Do you really want to delete this {this.props.title}?</h3>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="danger" onClick={this.toggle}>Cancel</MDBBtn>
          <MDBBtn color="info" onClick={this.props.delete}>Yes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
    )
  }
}

export default DeleteBtnMatch;
