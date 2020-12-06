import React from 'react';
import { 
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardFooter,
  MDBTable,
  MDBTableHead,
  MDBTableBody
 } from 'mdbreact';
import { SOCKET_URL } from '../../../redux/helpers/backendURLs';
import './Table.scss';

const Table = (props) => {
  const { league } = props;
  return (
    <>
    <MDBCard className="leagueTable">
      <MDBCardHeader className="tablesss">
        <h1><img src={`${SOCKET_URL}/uploads/leagues/${league.image}`} alt={league.id} /> {league.name}</h1>
      </MDBCardHeader>
      <MDBCardBody>
        <MDBTable>
          <MDBTableHead color="blue-grey lighten-4">
            <tr>
              <th>Team</th>
              <th>Pg</th>
              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>GF</th>
              <th>GA</th>
              <th>GD</th>
              <th>PTS</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
          {
            league.tables && league.tables.map(table => (
                            <tr style={{height: '50px'}} key={table.id}>
                              <td style={{fontSize: '16px'}}>
                                <img className='img-responsive' style={{width: '25px', height: '25px'}} src={`${SOCKET_URL}/uploads/teams/${table.team_image}`}  alt="tableImg"/> {table.team_name}
                              </td>
                              <td style={{fontSize: '16px'}}>{table.Pg}</td>
                              <td style={{fontSize: '16px'}}>{table.W}</td>
                              <td style={{fontSize: '16px'}}>{table.D}</td>
                              <td style={{fontSize: '16px'}}>{table.L}</td>
                              <td style={{fontSize: '16px'}}>{table.GF}</td>
                              <td style={{fontSize: '16px'}}>{table.GA}</td>
                              <td style={{fontSize: '16px'}}>{table.GA}</td>
                              <td style={{fontSize: '16px'}}>{table.PTS}</td>
                            </tr>
                          ))
                        }
          </MDBTableBody>
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
    </>
  );
}

export default Table;
