import React, { useState } from 'react';
import ManageBooks from './ManageBooks';
import "../styles/ManageBooks.scss"
const TableWithPagination = ({ data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, select] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);

  const currentPageData = data.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th className="table-header">Book id</th>
            <th className="table-header">Book name</th>
            <th className="table-header">Author</th>
            <th className="table-header">Publish date</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {/* Render rows for the current page */}
          {currentPageData.map((item, index) => (
            <tr key={item.bookId} className="table-row">
              <td className="table-data">{item.bookId}</td>
              <td className="table-data">{item.bookName}</td>
              <td className="table-data">{item.author}</td>
              <td className="table-data">{item.publishDate}</td>
              <td className="table-data">
                <button
                  className="rent-button"
                  // onClick={() => select((p) => [...p, item.bookId])}
                  onClick={()=>alert("Book Added to cart")}
                >
                  Add to cart
                </button>
              </td>
              {/* Render more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-text">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
      <br />
      <ManageBooks data={data} selected={selected} />
    </div>
  );
};

const App = ({ data }) => {
  return (
    <div className="app-container">
      <h1>Library</h1>
      <TableWithPagination data={data} itemsPerPage={5} />
    </div>
  );
};

export default App;