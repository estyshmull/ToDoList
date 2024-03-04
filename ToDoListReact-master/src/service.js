import axios from 'axios';

// Set the default api address using Config Defaults
axios.defaults.baseURL = "http://localhost:5062";

// Add an interceptor to catch errors in the response and write to the log
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.error('Request failed:', error.message);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    try {
      const result = await axios.get("/items");
      return result.data;
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  },


  addTask: async (name) => {
    console.log('addTask', name);
    try {
      console.log('addTask', name)
      const result = await axios.post("/tasks", { name });
      return result.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete });
    try {
        const result = await axios.put(`/items/${id}`, { isComplete });
        return result.data;
    } catch (error) {
        console.error('Error in setCompleted:', error);
        return {};
    }
  },

  deleteTask: async (id) => {
    console.log('deleteTask', id);
    try {
      await axios.delete(`/items/${id}`);
      console.log('Task deleted successfully');
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};
