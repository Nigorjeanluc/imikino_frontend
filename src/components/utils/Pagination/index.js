import React from 'react';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from 'mdbreact';
import './Pagination.scss';

const PaginationPage = (props) => {
  const {
    Next,
    Previous,
    nextPagination,
    prevPagination,
    currentPage
  } = props;
  return (
    <MDBRow className="align">
      <MDBCol className="text-center">
        <div className="alignment">
          <MDBPagination>
            { Previous.page ? (
            <MDBPageItem onClick={prevPagination}>
              <MDBPageNav aria-label="Previous">
                <span aria-hidden="true">Previous</span>
              </MDBPageNav>
            </MDBPageItem>
            ) : (
              <MDBPageItem disabled>
                <MDBPageNav aria-label="Previous">
                  <span aria-hidden="true">Previous</span>
                </MDBPageNav>
              </MDBPageItem>
            ) }
            <MDBPageItem>
              <MDBPageNav>
                {Next.page || Previous.page ? currentPage : 0}
              </MDBPageNav>
            </MDBPageItem>
            { Next.page ? (
              <MDBPageItem onClick={nextPagination}>
                <MDBPageNav aria-label="Next">
                  <span aria-hidden="true">Next</span>
                </MDBPageNav>
              </MDBPageItem>
              ) : (
                <MDBPageItem disabled>
                  <MDBPageNav aria-label="Next">
                    <span aria-hidden="true">Next</span>
                  </MDBPageNav>
                </MDBPageItem>)
            }
          </MDBPagination>
        </div>
      </MDBCol>
    </MDBRow>
  );
}

export default PaginationPage;
