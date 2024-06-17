// Locations.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


function Locations({ statistics }) {
  return (
    <div className="locations">
      <h2>Locations</h2>
      <div className="location-box">
        <Link to="/location/Living Room">Living Room ({statistics.livingRoom})</Link>
      </div>
      <div className="location-box">
        <Link to="/location/Bedroom">Bedroom ({statistics.bedroom})</Link>
      </div>
      <div className="location-box">
        <Link to="/location/Kitchen">Kitchen ({statistics.kitchen})</Link>
      </div>
      <div className="location-box">
        <Link to="/location/Garage">Garage ({statistics.garage})</Link>
      </div>
    </div>
  );
}

Locations.propTypes = {
  statistics: PropTypes.shape({
    livingRoom: PropTypes.number.isRequired,
    bedroom: PropTypes.number.isRequired,
    kitchen: PropTypes.number.isRequired,
    garage: PropTypes.number.isRequired,
  }).isRequired,
};

export default Locations;
