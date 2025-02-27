import {
  Route, 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider
} from "react-router-dom";

import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPages from "./pages/JobsPages";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

const App = () => {
  const addJob = async (newJob) => {
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body:JSON.stringify(newJob),
    });
    return;
  };

  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE'
    });
    return;
  };

  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PuT',
      headers: {
        'Content-type': 'application/json',
      },
      body:JSON.stringify(job),
    });
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={< MainLayout/>}>
        <Route index element={<HomePage />}/>
        <Route path="/jobs" element={<JobsPages />}/>
        <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob}/>} loader={jobLoader}/>
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob}/>}/>
        <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Route>
    )
  )
  return (
    <RouterProvider router={router} />
  )
};

export default App;
