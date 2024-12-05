import "./learning.css";
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Mylearning() {
  const [userCourses, setUserCourses] = useState([]);
  const { username, _id } = useSelector((state) => state.Course.userDetails); // User details from Redux store
  const toggleUserCourses = useSelector((state) => state.Course.toggleUserCourses);

  console.log(toggleUserCourses, "toggleUserCourses");
 
  // Fetch user courses from API
  const fetchUserCourses = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/users/courselist/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data, "loader");

      // Check if data is flattened (single level array)
      const isFlattened = Array.isArray(data) && data.every(item => !Array.isArray(item));

      if (isFlattened) {
        // If data is already flattened, use it directly
        setUserCourses(data);
      } else {
        // If data is nested, flatten it
        const flattenedData = data.flat();
        setUserCourses(flattenedData);
        console.log(flattenedData, "flattenedData");
      }
    } catch (err) {
      console.error("Error fetching courses:", err);
    }
  };

  useEffect(() => {
    // Trigger fetch on mount and when 'refresh' changes
    fetchUserCourses();
  }, [toggleUserCourses]); // Run when component mounts or 'refresh' changes

  const randomNumber = Math.floor(Math.random() * 100) + 1;

  return (
    <>
  
      <div className="myLearn">
        <p>My Learning</p>
        <div className="course-learn">
          {userCourses.length > 0 && userCourses.map((course) => (
            <div key={course.id} className="course-item">
                <div className="icon-user">icon
                    <div className="icon-name">
                      <div className="name">{course.courseName}</div>
                      <div className="descrp">{course.courseDescrp}</div>
                    </div>
                    <div className="prog-bar">
                      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                        <CircularProgress 
                          variant="determinate" 
                          value={randomNumber} 
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            '& .MuiCircularProgress-circle': {
                              stroke: '#FF5722', // Set custom stroke color
                            },
                          }} 
                        />
                        <Box
                          sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Typography variant="caption" component="div">
                            {randomNumber}%
                          </Typography>
                        </Box>
                      </Box>
                    </div>
                </div>
              </div>
          ))}
         {userCourses.length === 0 && username !== "admin" && (
  <p>No courses enrolled by the user</p>
)}
{username ==="admin"  &&<p>Admin don't have learning progress</p>}

        </div>
      </div>

    </>
  );
}

export default Mylearning;
