import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './form.css';

const FormComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [selectedOption, setSelectedOption] = useState(0);

  const handleNameChange = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleOptionChange = (event) => {
    event.preventDefault();
    setSelectedOption(event.target.value);
  };

  const handleCommentChange = (event) => {
    event.preventDefault();
    setComment(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Comment: ", comment);
    console.log("Selected Option:", selectedOption);

    const url = "http://localhost:6000/api/send";
    const body = {name, email, comment, cheatSheetId: selectedOption};
    const options = {
      method: 'post',
      body: JSON.stringify(body),
      headers: {'Content-Type': 'application/json'}
    }
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log("response: ", data);
        if (data && data.ok) alert("Thank you!\n Please visit again.")
      })
      .catch(error => {
        console.error(error);
        alert('Oops! Something went wrong.\nPlease try again later.');
      });
  };

  return (
    <div className="container md-3 mt-4">
      <h2 className='heading'>Fill up the details to access cheatsheet</h2>
      <form className='form-container' onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comment" className="form-label">Comment</label>
          <textarea
            className="form-control"
            id="comment"
            value={comment}
            onChange={handleCommentChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dropdown" className="form-label">Select Sheet</label>
          <select
            className="form-control"
            id="dropdown"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="0">Sheet 1</option>
            <option value="1">Sheet 2</option>
            <option value="2">Sheet 3</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
