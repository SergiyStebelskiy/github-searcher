import axios from "./axios";

export const searchUser = async (name) => {
  try {
    return await axios.get(`/users/${name}`);
  } catch (error) {
    throw error;
  }
};

export const getUser = async (id) => {
  try {
    return await axios.get(`/user/${id}`);
  } catch (error) {
    throw error;
  }
};

export const getUserRepos = async (id) => {
  try {
    return await axios.get(`/user/${id}/repos`);
  } catch (error) {
    throw error;
  }
};

export const searchUserRepo = async (login, repoName) => {
  try {
    return await axios.get(`/repos/${login}/${repoName}`);
  } catch (error) {
    throw error;
  }
};
