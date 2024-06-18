import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Locations.css'; 

function Locations({ statistics, locations }) {
  return (
    <div className="locations">

      <div className="location-boxes">
        {locations.map((location, index) => (
          <div key={index} className="location-item">
            <Link to={`/location/${location}`} className="location-link">
              <div className="location-box">
              📍{location} ({statistics[location.toLowerCase().replace(/\s+/g, '')] || 0})
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

Locations.propTypes = {
  statistics: PropTypes.object.isRequired,
  locations: PropTypes.array.isRequired,
};

export default Locations;
