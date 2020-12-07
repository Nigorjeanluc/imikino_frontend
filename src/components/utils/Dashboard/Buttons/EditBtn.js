import React, { Component } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';
import { connect } from 'react-redux';

import { editLocation, fetchLocation } from '../../../../redux/actions/location';

export class EditBtnLocation extends Component {
  state = {
    modal: false,
    name: ''
  }

  componentWillMount () {
    const { fetchLocation, location, identify} = this.props;
    fetchLocation(identify);
      this.setState({
        name: location.name,
      })
  }
  
  toggle = async () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value});
  }

  handleSubmit = (event) => {
    const { editLocation, identify } = this.props;
    editLocation(identify, this.state.name);
    event.preventDefault();
    this.toggle();
  }

  render() {
    return (
    <>
      <MDBBtn
        style={{
          borderRadius: '50%',
          paddingLeft: '10px',
          paddingRight: '8px'
        }}
        outline
        color="info"
        onClick={this.toggle}
      >
        <MDBIcon size="2x" icon="edit"/>
      </MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Edit Location</MDBModalHeader>
        <form onSubmit={this.handleSubmit}>
        <MDBModalBody>
              <div className="form-group">
                <label htmlFor="location">Location name</label>
                <input
                  style={{
                    height: '30px'
                  }}
                  onChange={this.handleChange}
                  value={this.state.name}
                  type="text"
                  className="form-control"
                  placeholder="Enter Location Name"
                  id="location"
                />
              </div>
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="danger" onClick={this.toggle}>Cancel</MDBBtn>
          <MDBBtn type="submit" color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
        </form>
      </MDBModal>
    </>
    );
  }
}

const mapStateToProps = ({ location }) => ({
  errors: location.errors,
  loading: location.loading,
  location: location.location,
  getLocation: location.getLocation
});

const mapDispatchToProps = (dispatch) => ({
  editLocation: (id, data) => dispatch(editLocation(id, data)),
  fetchLocation: (id) => dispatch(fetchLocation(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBtnLocation);
