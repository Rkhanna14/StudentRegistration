import React from 'react';
import './App.css';
import  { GetUserCourses } from '../src/Test/CourseList';
import MainPage from '../src/Test/Main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from '../src/Test/RegistrationPage';
import LoginPage, { GetAllCourses } from "../src/Test/Login";
import ErrorPage from '../src/Test/ErrorPage';


function App() {

  const router= createBrowserRouter([
    {
      path:"/",
      element:<RegisterPage/>,
    },
    {
      path:"/login",
      element:<LoginPage/>,
      loader:GetAllCourses
    },
    {
      path:"/course",
      element:<MainPage/>,
      loader:GetUserCourses,
    },{
      path:"*",
      element:<ErrorPage/>
    }
  ])





  return (<>

  <RouterProvider  router={router}></RouterProvider>

  
  
  </>
  );
}

export default App;