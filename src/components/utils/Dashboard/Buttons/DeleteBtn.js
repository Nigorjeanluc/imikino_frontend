import React, { Component } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

export class DeleteBtn extends Component {
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
        style={{
          borderRadius: '50%',
          paddingLeft: '10px',
          paddingRight: '10px'
        }}
        outline
        color="danger"
        onClick={this.toggle}
      >
        <MDBIcon size="2x" icon="trash"/>
      </MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Delete Location</MDBModalHeader>
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

export default DeleteBtn;
