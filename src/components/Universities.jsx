import React, { useState, useEffect } from 'react';

const Universities = () => {
  const [countryInput, setCountryInput] = useState('');
  const [country, setCountry] = useState('Canada');
  const [universities, setUniversities] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetchUniversities(country);
  };

  const searchUniversities = () => {
    setCountry(countryInput);
    fetchUniversities(countryInput);
  };

  const fetchUniversities = (country) => {
    fetch(`http://universities.hipolabs.com/search?country=${country}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setUniversities(data);
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
        setUniversities([]);
        setErrorMessage('Oops something went wrong. Please try again later.');
      });
  };

  return (
    <div>
      <h1>University List</h1>
      <input
        placeholder="India, China ..."
        type="text"
        value={countryInput}
        onChange={(e) => setCountryInput(e.target.value)}
      />
      <button onClick={searchUniversities}>Search</button>
      <h2>Universities in <span id="un">{country}</span></h2>
      <ul>
        {errorMessage && (
          <li style={{ color: 'red' }}>{errorMessage}</li>
        )}
        {universities.map((university, index) => (
          <li key={index}>{university.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Universities;
