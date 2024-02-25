import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Paginator from "./Paginator"
import useBookFilter from "./useBookFilter";
import "../styles/UserFilterForm.scss"

export default function(){
    let {state}= useLocation()
    return<>
        {state? <Library />: <Navigate to={"/"} />}
    </>
}
function Library() {
    const [data, setData] = useState(null); 
    let [filtered, ftrData]= useState([])
    let [formData, handleChange]= useBookFilter()
    let [flag, setFlag]= useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("exe?")
                const response = await axios.get('http://localhost:8000/library');
                setData(response.data); // Set the retrieved data to the state
                await new Promise((resolve) => {
                  setData(prev=>prev.map(book=>({...book, publishDate: book.publishDate.substring(0,10)})));
                  resolve();
                });
                setFlag(true)
                console.log("data",response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData(); // Call the fetchData function to make the GET request
    }, []);
    const handleSubmit = (e)=>{
        e.preventDefault()
        ftrData(data.filter(book=>{
            let b1= (formData.bookName !=="" && formData.bookName===book.bookName) || (formData.author!=="" && formData.author===book.author)
            let b2
            if (formData.startDate!=="" && formData.endDate!==""){
                let bookDate= new Date(book.publishDate)
                b2= bookDate >= new Date(formData.startDate) && bookDate <= new Date(formData.endDate)
            }
            return b1 || b2
        }))
    }
    return<>
    {flag?(<>
        <div className="form-container">
      <h2>Book Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="bookName">Book Name:</label>
          <input type="text" id="bookName" name="bookName" value={formData.bookName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" value={formData.author} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="startDate">Start Date:</label>
          <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date:</label>
          <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />
        </div>
        <button type="submit">Filter</button><button type="button" onClick={()=>ftrData(data)}>Browse All</button>
      </form>
    </div>
    <Paginator data={filtered} />
    </>):<h2>Loading...</h2>}

    {/* {flag?<Paginator data={data}/>:<h2>Loading..</h2>} */}
    </>
}