import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";


const DeleteBooks: React.FC = () => {
  
  return (
    <div>
      <div className="center-table-content">
        <div className="table-responsive">
        <table className="table table-bordered table-hover" style={{margin:'0 auto'}}>
        <thead className="thead-dark">
              <tr>
                <th>Book No</th>
                <th>Title</th>
                <th>Author</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>groom</td>
                <td>Richard</td>
                <td>headin to north america</td>

                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic radio toggle button group"
                  >
                    
                    <button className="btn btn-outline-danger">Delete</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DeleteBooks;
