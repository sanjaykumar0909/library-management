import React, {useState} from "react";
export default function useBookFilter(){
    const [formData, setFormData] = useState({
        bookName: '',
        author: '',
        startDate: '',
        endDate: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      return [formData, handleChange]
}