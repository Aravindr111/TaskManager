import React, { useState } from 'react';
import axios from 'axios';
import './Search.css'
import { Link} from 'react-router-dom';
import Header from './header';

const SearchEvents = () => {
  const [searchParams, setSearchParams] = useState({
    city: '',
    sport: '',
    eventName: '',
  });
  const [results, setResults] = useState([]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { city, sport, eventName } = searchParams;
      const response = await axios.get('http://localhost:3000/api/events/search', {
        params: { city, sport, eventName },
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <>
    <Header/>
    <div id='homecontainer'>
    <Link to="/Home" id="Homebutton">Home</Link>
    </div>
    <h2 id='searchhead'>Search Events</h2>
    <div className="search-container">
      
      <form onSubmit={handleSearch}>
        <div className="input-group">
          <label>City:</label>
          <input
            type="text"
            name="city"
            value={searchParams.city}
            onChange={handleInputChange}
            placeholder="Search by city"
          />
        </div>

        <div className="input-group">
          <label>Sport:</label>
          <input
            type="text"
            name="sport"
            value={searchParams.sport}
            onChange={handleInputChange}
            placeholder="Search by sport"
          />
        </div>

        <div className="input-group">
          <label>Event Name:</label>
          <input
            type="text"
            name="eventName"
            value={searchParams.eventName}
            onChange={handleInputChange}
            placeholder="Search by event name"
          />
        </div>

        <button type="submit">Search</button>
      </form>

     
    </div>
    <div className="search-results">
        <h2>Results</h2>
       {/* {results.length > 0 ? (
          <ul>
            {results.map((event) => (
              <li key={event._id}>
                <strong>{event.name}</strong> - {event.game} - {event.location} -{' '}
                {new Date(event.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events found</p>
        )}
          */}
         <div className="events-grid">
  {results.length > 0 ? (
    results.map((event) => (
      <div key={event._id} className="event-card">
        <h2>{event.name}</h2>
        <h3>Sport: {event.game}</h3>
        <p>{event.description}</p>
        <p>Location: {event.location}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
      </div>
    ))
  ) : (
    <p>No events found</p>
  )}
</div>

        
      </div>
      
    </>
  );
};

export default SearchEvents;