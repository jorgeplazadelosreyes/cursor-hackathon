import axios from "axios";

const apiBaseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const api = axios.create({
  baseURL: apiBaseURL,
  timeout: 15000,
});

export default {
  async getQuote() {
    const res = await api.get("/api/quote");
    return res.data;
  },

  async getStats() {
    const res = await api.get("/api/stats");
    return res.data;
  },

  async searchJobs(q, location = "") {
    const res = await api.get("/api/jobs", {
      params: { q, location },
    });
    return res.data;
  },

  async getApplications() {
    const res = await api.get("/api/applications");
    return res.data;
  },

  async createApplication(payload) {
    const res = await api.post("/api/applications", payload);
    return res.data;
  },

  async updateApplication(id, payload) {
    const res = await api.put(`/api/applications/${id}`, payload);
    return res.data;
  },

  async deleteApplication(id) {
    const res = await api.delete(`/api/applications/${id}`);
    return res.data;
  },
};
