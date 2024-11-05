import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";


const ViewBooks: React.FC = () => {

  return (
    <div>
      <div className="center-table-content">
        <div className="table-responsive">
          <table className="table table-bordered table-hover" style={{margin:'0 auto'}}>
            <thead className="thead-dark">
              <tr>
                <th>Book No</th>
                <th>Title</th>
                <th>Auther</th>
                <th>Discription</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Vender</td>
                <td>Henry</td>
                <td>India based</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
