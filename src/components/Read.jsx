import React, { useEffect, useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';
import './Read.css'
import { Link } from 'react-router-dom';

const Read = () => {

    const [employe ,SetEmployee]=useState([]);

    useEffect(()=>{
        axios.get("https://64bd3a002320b36433c783c4.mockapi.io/users").then(response=>{
            SetEmployee(response.data);
        })
        .catch(error=>{
            console.error("error fetching data",error);
        })
    },[]);

    const handleDelete = (id) => {
        swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this user!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            axios.delete(`https://64bd3a002320b36433c783c4.mockapi.io/users/${id}`)
              .then(response => {
                console.log("Data deleted successfully:", response.data);
    
                const updatedData = employe.filter(item => item.id !== id);
                SetEmployee(updatedData);
    
                swal("Poof! The user has been deleted!", {
                  icon: "success",
                });
              })
              .catch(error => {
                console.error('Error deleting data:', error);
                swal("Oops! Something went wrong.", "Please try again later.", "error");
              });
          } else {
            swal("The user is safe!");
          }
        });
      };


      const handleEdit = (id) => {
        swal({
          title: "Are you sure?",
          text: "You will be redirected to the update page.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willEdit) => {
          if (willEdit) {
            window.location.href = `/update/${id}`;
          } else {
            console.log("User chose not to proceed with update.");
          }
        });
      };


      const formatDate = (dateString) => {
        const options = {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
  return (
    <div className="mt-5">
 <Link to='/create'>   <input type="submit" value="Add New Employee" /></Link>
 <div className="table-container">

     <table class="striped-table" >
  <thead>
    <tr >
    <th>Id</th>
      <th>Name</th>
      <th>Father Name</th>
      <th>Salary</th>
      <th>Email </th>
      <th>Joining Date</th>

    </tr>
  </thead>
 
  <tbody>
  {employe && employe.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.fname}</td>
              <td>{item.salary}</td>
              <td>{item.email}</td>
              <td>{formatDate(item.createdAt)}</td>
              <button className="btn btn-danger" style={{ marginRight: 30 }} onClick={() => handleDelete(item.id)}>Delete</button>
              <button className="btn btn-warning pl-5" onClick={() => handleEdit(item.id)}>Edit</button>



            </tr>
          ))}
        </tbody>
</table>
    </div>
    </div>

  );
};

export default Read;
