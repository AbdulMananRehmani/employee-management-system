import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Update.css'
const Update = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    fname: "",
    email: "",
    salary: "",
  });
  useEffect(() => {
    axios
      .get(`https://64bd3a002320b36433c783c4.mockapi.io/users/${userId}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `https://64bd3a002320b36433c783c4.mockapi.io/users/${userId}`,
        formData
      )
      .then((response) => {
        console.log("User data updated successfully:", response.data);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error updating user data:", error);
      });
  };

  return (
    <div className="form-container">

      <h1>Update Employee</h1>
      <blockquote>
        <cite>Keep it secret. Keep it safe.</cite>
      </blockquote>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Enter Name </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <label htmlFor="fname">Enter Father Name </label>
        <input
          type="text"
          name="fname"
          value={formData.fname}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <label htmlFor="email">Enter Email </label>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <label htmlFor="salary">Enter Salary </label>
        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
              <div className="button-container">

          <input type="submit" value="Update" style={{ marginRight: "1rem" }} />
          <Link to="/">
            <button className="btn btn-warning">Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Update;
