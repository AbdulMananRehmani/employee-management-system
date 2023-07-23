import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const navigate=useNavigate();

    const[emploeedata,  SetEmployeeData]=useState({
        name:"",
        fname:"",
        email:"",
        salary:"",


    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        SetEmployeeData({
          ...emploeedata,
          [name]: value
        });
      };

   
    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post("https://64bd3a002320b36433c783c4.mockapi.io/users", emploeedata)
        .then(response => {
          console.log("Data posted successfully:", response.data);
          SetEmployeeData({
            name: '',
            fname: '',
            email: '',
            salary: '',
          });
  
          swal({
            title: "Good job!",
            text: "User data has been created successfully!",
            icon: "success",
            button: "Ok!",
          });
          navigate('/')

        })
        .catch(error => {
          console.error('Error posting data:', error);
        });
    };
    

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection:"column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <blockquote>
            <h1>Add New Employee</h1>

            <cite>Keep it secret. Keep it safe.</cite>

          </blockquote>{" "}
         <Link to='/'>   <input type="submit" value="View All Emploees" /></Link>
<hr />
         <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Name </label>
        <input type="text" name="name" value={emploeedata.name} style={{ width: "30rem" }} onChange={handlechange}  />{" "}
        <label htmlFor="name">Father Name </label>
        <input type="text" name="fname" value={emploeedata.fatherName} onChange={handlechange} style={{ width: "30rem" }}  />{" "}
        <label htmlFor="email">Enter Email </label>
        <input type="email" name="email" value={emploeedata.email} style={{ width: "30rem" }} onChange={handlechange} />{" "}
        <label htmlFor="name">Enter Salary </label>
        <input type="number" name="salary" value={emploeedata.salary} style={{ width: "30rem" }} onChange={handlechange}  />
       
        <input type="submit" value="Add" />
      </form>
      </div>
    </div>
  );
};

export default Create;
