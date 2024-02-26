import React, { useState } from "react";
import axios from "axios";
export default function({data, selected}){
    // let [staged, setBooks]= useState([]) 

    const filteredData = data.filter(row => selected.includes(row.bookId));
    console.log(data)
    console.log(selected)
    const sendToBkend = async ()=>{
        try {
            const response = await axios.post('https://library-mgmt-deploy.onrender.com/submit-books/', filteredData);
            
            console.log(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (<>
        <table>
            <thead>
                <tr>
                    <th>Book id</th>
                    <th>Book name</th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map(row => (
                    <tr key={row.bookId}>
                        <td>{row.bookId}</td>
                        <td>{row.bookName}</td>
                        
                    </tr>
                ))}
            </tbody>
        </table>
        <button onClick={sendToBkend}>Submit</button>
        </>);
}