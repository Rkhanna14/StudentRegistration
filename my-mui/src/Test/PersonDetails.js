import React from 'react';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import PersonIcon from '@mui/icons-material/Person';

import "./PassTes.css";
import Mylearning from "./Learning";
import { useSelector } from 'react-redux';

const PersonDetails = ({showUserc}) => {

  const {username,_id}= useSelector((state)=> state.Course.userDetails);
  const checkUser= username === "admin" ? true : false;
  console.log(showUserc,"showUserc");

  return (<>
    <div className="person-info">
    <div className="grid-container">
      <div className="grid-item">
        {/* Arrow icon button */}
        <button className="icon-button">
          <span className="arrow-icon">
            <ArrowBackOutlinedIcon  sx={{ fontSize: '25px' }} /> {/* Arrow Circle Left Icon */}
          </span>
        </button>

        {/* Notification icon button */}
        <button className="icon-button"  onClick={()=>{console.log("test")}} >
          <span className="noti-icon">
            <NotificationsNoneOutlinedIcon   sx={{ fontSize: '37px' }}  /> {/* Notification Icon */}
          </span>
        </button>
      </div>

      <div className="grid-item">
        <div className="username-box">{username ? username :""}
          <p>{checkUser ? "admin" : "Student"}</p>
        </div>
        <div className="profile-icon"><PersonIcon   sx={{ fontSize: '42px' }}  /></div>
      </div>
    </div>
    <Mylearning/>
  </div>

</>  
  );
};

export default PersonDetails;