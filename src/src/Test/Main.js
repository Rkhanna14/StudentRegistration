import './../App.css';
import Sidebar from "./Sidebar";
import CourseList from "./CourseList";
import { useState } from 'react';
import Test from './PassTes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import  PersonDetails from './PersonDetails';



// Define theme using createTheme
export const theme = createTheme({
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: '#f5f5f5',
      },
      text: {
        primary: '#000',
        secondary: '#757575',
      },
    },
});

const MainPage = () => {
    const [showCourse, setShowCourse] = useState(false);

    function ShowCourseHandler(val) {
        setShowCourse(val);
    }

    return (
        <div className="root">
            <ThemeProvider theme={theme}>
                <Sidebar onCourse={ShowCourseHandler} />
                <div className="content">
                    <CourseList show={showCourse} className="course-list" />
                </div>
                <PersonDetails/>
            </ThemeProvider>
        </div>
    );
}

export default MainPage;
