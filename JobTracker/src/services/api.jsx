import axios from "axios";

const API_URL = "https://job-tracker-backend-1-kk7s.onrender.com/api";

const api = axios.create({
  baseURL: API_URL,
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export const register = (data) => api.post("/auth/register", data);
export const login = (data) => api.post("/auth/login", data);

export const addJob = (job, userId) =>
  api.post(`/jobs/add?userId=${userId}`, job);

export const getMyJobs = (userId) =>
  api.get(`/jobs/myjobs?userId=${userId}`);

export const getJobById = (id, userId) =>
  api.get(`/jobs/${id}?userId=${userId}`);

export const updateJob = (id, job, userId) =>
  api.put(`/jobs/update/${id}?userId=${userId}`, job);

export const deleteJob = (id, userId) =>
  api.delete(`/jobs/delete/${id}?userId=${userId}`);

export const searchByCompany = (name, userId) =>
  api.get(`/jobs/search/${name}?userId=${userId}`);

export const getJobsByStatus = (status, userId) =>
  api.get(`/jobs/status/${status}?userId=${userId}`);



// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response && err.response.status === 401) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       window.location.href = "/login";
//     }
//     return Promise.reject(err);
//   }
// );

// export const register = (data) => axios.post(`${API_URL}/auth/register`, data);

// export const login = (data) => axios.post(`${API_URL}/auth/login`, data);
// // export const register = (data) => axios.post("/auth/register", data);

// // export const login = (data) => axios.post("/auth/login", data);

// export const addJob = (job, userId) => api.post(`/jobs/add?userId=${userId}`, job);
// export const getMyJobs = (userId) => api.get(`/jobs/myjobs?userId=${userId}`);
// export const getJobById = (id, userId) => api.get(`/jobs/${id}?userId=${userId}`);
// export const updateJob = (id, job, userId) => api.put(`/jobs/update/${id}?userId=${userId}`, job);
// export const deleteJob = (id, userId) => api.delete(`/jobs/delete/${id}?userId=${userId}`);
// export const searchByCompany = (name, userId) => api.get(`/jobs/search/${name}?userId=${userId}`);
// export const getJobsByStatus = (status, userId) => api.get(`/jobs/status/${status}?userId=${userId}`);
