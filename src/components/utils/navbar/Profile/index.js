import React from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Profile.scss';
import { logout } from '../../../../redux/actions/user';

function Profile(props) {
  const handleClick = (e) => {
    const { logout } = props;
    logout();
  }

  return (
    <MDBDropdown>
      <MDBDropdownToggle className="dropdown-back" color="success">
        <div className="img-cover">
          <img className="img-style" alt="profile-image" src={props.img} />
        </div>
      </MDBDropdownToggle>
      <MDBDropdownMenu style={{
        width: '200px'
      }} basic>
        <MDBDropdownItem className="dropdown-font">My Account</MDBDropdownItem>
        <MDBDropdownItem className="dropdown-font">History</MDBDropdownItem>
        { props.role !== 'SIMPLE_USER' ? (
          props.role === 'ADMIN' ? (
            <Link to="/admin/dashboard"><MDBDropdownItem className="dropdown-font">Dashboard</MDBDropdownItem></Link>
          ) : (
            props.role === 'REPORTER' ? (
              <Link to="/reporter/dashboard"><MDBDropdownItem className="dropdown-font">Dashboard</MDBDropdownItem></Link>
            ) : null
          )) : null }
        <MDBDropdownItem className="dropdown-font">Favorites</MDBDropdownItem>
        <MDBDropdownItem divider />
        <MDBDropdownItem onClick={handleClick} className="dropdown-font">Logout</MDBDropdownItem>
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}

// export default LoginModal;
const mapStateToProps = ({
  user: {
    token,
    login: { profile, errors, message, loading }
  }
}) => ({
  token,
  errors,
  message,
  loading,
  profile
});

export default connect(mapStateToProps, { logout })(Profile);
