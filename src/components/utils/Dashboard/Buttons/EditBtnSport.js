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

import { editSport, fetchSport } from '../../../../redux/actions/sport';

export class EditBtnSport extends Component {
  state = {
    modal: false,
    name: null
  }

  componentDidMount () {
    const { fetchSport, identify, sport, sportData } = this.props;
    this.setState({
      name: sportData.name
    });

    if(this.state.modal) {
      fetchSport(identify);
      this.setState({
        name: sport.name
      })
    }
  }
  
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value});
  }

  handleSubmit = (event) => {
    const { editSport, identify } = this.props;
    editSport(identify, this.state.name);
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
        <MDBModalHeader toggle={this.toggle}>Edit Sport</MDBModalHeader>
        <form onSubmit={this.handleSubmit}>
        <MDBModalBody>
              <div className="form-group">
                <label htmlFor="sport">Sport name</label>
                <input
                  style={{
                    height: '30px'
                  }}
                  onChange={this.handleChange}
                  value={this.state.name}
                  type="text"
                  className="form-control"
                  placeholder="Enter Sport Name"
                  id="sport"
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

const mapStateToProps = ({ sport }) => ({
  errors: sport.errors,
  loading: sport.loading,
  sport: sport.sport,
  getSport: sport.getSport
});

const mapDispatchToProps = (dispatch) => ({
  editSport: (id, data) => dispatch(editSport(id, data)),
  fetchSport: (id) => dispatch(fetchSport(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBtnSport);
