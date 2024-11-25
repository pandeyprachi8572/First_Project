// import React from "react";
// import "./App.css";
// import {
//   BrowserRouter as createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import Dashboard from "./components/Dashboard";
// import ProtectedRoute from "./components/ProtectedRoute";
// import ProjectTable from "./components/ProjectTable";
// import Employee from "./components/Employee";
// import Attendance from "./components/Attendance";
// import HourlyRate from "./components/HourlyRate";
// function App() {
//   const appRouter = createBrowserRouter([
//     {
//       path: "/dashboard",
//       element: (
//         <ProtectedRoute>
//           <Dashboard />
//         </ProtectedRoute>
//       ),
//       children: [
//         {
//           path: "/projects",
//           element: <ProjectTable />,
//         },
//         {
//           path: "/employee",
//           element: <Employee />,
//         },
//         {
//           path: "/attendance",
//           element: <Attendance />,
//         },
//         {
//           path: "/hourlyrate",
//           element: <HourlyRate />,
//         },
//       ],
//     },
//     {
//       path: "/login",
//       element: <Login />,
//     },
//     {
//       path: "/signup",
//       element: <Signup />,
//     },
//   ]);
//   return (
//     <>
//       <RouterProvider router={appRouter}></RouterProvider>
//     </>
//   );
// }
// export default App;

// {
//   /*<Router>
// <Routes>
// <Route path="/login" element={<Login />} />
// <Route path="/signup" element={<Signup />} />
// <Route path="/dashboard" element={
// <ProtectedRoute>
// <Dashboard />
// </ProtectedRoute>
//           }/>
// <Route path="/" element={ <Login />}/>
// <Route
//           path="/projects"
//           element={
//             <ProtectedRoute>
//               <ProjectTable />
//             </ProtectedRoute>
//           }/>
// <Route path="/employee"
//          element = {
// <Employee /> }/>
// <Route path="/attendance" element={<Attendance />} />
// <Route path="/hourlyrate" element={<HourlyRate />} />
// </Routes>
// </Router>*/
// }

import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectTable from "./components/ProjectTable";
import Employee from "./components/Employee";
import Attendance from "./components/Attendance";
import HourlyRate from "./components/HourlyRate";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "projects", 
          element: <ProjectTable />,
        },
        {
          path: "employee",
          element: <Employee />,
        },
        {
          path: "attendance",
          element: <Attendance />,
        },
        {
          path: "hourlyrate",
          element: <HourlyRate />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
}

export default App;
