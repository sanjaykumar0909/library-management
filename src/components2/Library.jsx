import React, { useState } from 'react';
import '../styles/AdminLibraryStyle.scss'; // Import CSS file for styling
import '../styles/AdminAddBooks.scss'
import axios from 'axios';
import { Navigate, useLocation } from 'react-router-dom';

export default function(){
  const {state} = useLocation()
  return<>
  {state? <BookForm />:<Navigate to={"/admin/"} />}
  </>
}
const BookForm = () => {
  
  // State to store form data
  const [formData, setFormData] = useState({
    bookId: '',
    bookName: '',
    author: '',
    publishDate: ''
  });
  const [toAdd, setBooks]= useState([])

  // Function to handle input changes and update state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const publishDate = new Date(formData.publishDate);
    const today = new Date();
    console.log("pattern:", /[^\d]/.test(formData.bookId))
    if(!(formData.bookId && formData.bookName && formData.author && formData.publishDate)){
      alert("Empty fields not allowed")
    }else if (/[^\d]/.test(formData.bookId)){
      alert("invalid id")
    }else if (publishDate > today) {
      alert("publish date in future not allowed")
    }
    else{
      let response = await axios.post("http://localhost:8000/can-add-book/",{"bookId":formData.bookId})
      console.log(response)
      if (!response.data.ok){
          alert("id already exist in DB")
      }else{
          setBooks(p=>[...p, formData])
          setFormData({
              bookId: '',
              bookName: '',
              author: '',
              publishDate: ''
          })
      }
    }
  };
  const addToDB = async ()=>{
    const response= await axios.post("http://localhost:8000/add-books/", toAdd)
    if (response.data.ok){
      alert("Books successfully registered in Database")
    }
    setBooks([])
  }

  return (<>
    <div className="form-container">
      <h2>Register new books</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookId">Book ID:</label>
          <input
            type="text"
            id="bookId"
            name="bookId"
            value={formData.bookId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bookName">Book Name:</label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={formData.bookName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="publishDate">Publish Date:</label>
          <input
            type="date"
            id="publishDate"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
    <div className='table-container'>
      <table className='table'>
        <thead>
          <tr>
            <th>Book ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Publish Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {toAdd.map((book, index) => (
            <tr key={index}>
              <td>{book.bookId}</td>
              <td>{book.bookName}</td>
              <td>{book.author}</td>
              <td>{book.publishDate}</td>
              <td><button onClick={()=>{
                setBooks(p=>p.filter(i=>i.bookId !== book.bookId))
              }}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <button onClick={addToDB}>Submit</button>
  </>);
};
