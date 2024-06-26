import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faEye, faCog, faTimes } from '@fortawesome/free-solid-svg-icons';

import '../styles/Popup.css';

const UserPopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleClick = (event) => {
      onClose();
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };


  return (
    <div className="user-popup" onClick={handleClick}>
      <div className='user-header'>
          {/* Render profile image here */}
          { user.imageUrl ?
          <img src={`http://localhost:5001/${user.imageUrl}`}/>
          :
          <FontAwesomeIcon icon={faUser} className="profile-image"/>
          }
          <span className="username">{user.fullName}</span>
          <FontAwesomeIcon icon={faTimes} className='close-btn' onClick={onClose}/>
      </div>

      <ul className="user-options">
        <li>
          <Link to="/user-profile">
            <FontAwesomeIcon icon={faEye} /> Profile
          </Link>
        </li>
        <li>
          <Link to="/main/account-settings">
            <FontAwesomeIcon icon={faCog} /> Settings
          </Link>
        </li>
        <li>
          <Link onClick={() => handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserPopup;
