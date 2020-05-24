import React from 'react';
import PropTypes from 'prop-types';

const LinearProgressBar = ({ percentage }) => {
  return (
    <div className='progress'>
      <div
        className='progress-bar progress-bar-striped bg-info' // bg-success
        role='progressbar'
        style={{ width: `${percentage}%` }}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        {percentage}%
      </div>
    </div>
  );
};

LinearProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default LinearProgressBar;
