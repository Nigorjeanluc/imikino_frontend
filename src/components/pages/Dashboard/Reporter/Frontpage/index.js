import React, { Component } from 'react';
import { MDBCol, MDBRow, MDBBadge } from 'mdbreact';
import { connect } from 'react-redux';

import Dashboard from '../index';
import BreadcrumSection from '../../../../utils/Sections/BreadcrumSection';
import AdminCardSection3 from '../../../../utils/Sections/AdminCardSection3';
import { getAuthorPosts } from '../../../../../redux/actions/posts';
import ChartSection1 from '../../../../utils/Sections/ChartSection1';
import TableSection from '../../../../utils/Sections/TableSection';
import ChartSection2 from '../../../../utils/Sections/ChartSection2';
// import MapSection from '../../../../utils/Sections/MapSection';
import ModalSection from '../../../../utils/Sections/ModalSection';
import AdminCardSection2 from '../../../../utils/Sections/AdminCardSection2';

class Frontpage2 extends Component {
  componentDidMount() {
    const {
      getAuthorPosts
    } = this.props;
    getAuthorPosts(1, 2000);
  }

  render() {
    const {
      listOfPosts,
    } = this.props;
    const totalPosts = listOfPosts && listOfPosts.length ? listOfPosts.length : 0;
    return (
      <Dashboard {...this.props}>
        <BreadcrumSection pageTitle="Dashboard" />
        <AdminCardSection3
          countPosts={totalPosts}
        />
        {/* <ChartSection1 /> */}
        {/* <TableSection />
        <ChartSection2 /> */}
        {/* <MDBRow className="mb-4"> */}
            {/* <MapSection /> */}
            {/* <ModalSection /> */}
        {/* </MDBRow> */}
        {/* <AdminCardSection2 /> */}
      </Dashboard>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  Next: posts.Next,
  Previous: posts.Previous,
  errors: posts.errors,
  loading: posts.loading,
  listOfPosts: posts.listOfPosts,
  getPosts: posts.getPosts,
});

const mapDispatchToProps = (dispatch) => ({
  getAuthorPosts: (page, limit) => dispatch(getAuthorPosts(page, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Frontpage2);
