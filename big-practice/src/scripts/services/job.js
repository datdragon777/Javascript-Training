import { BASE_URL, PATH } from "../constants/base-url";

/**
 * Call API and check request
 * @param {string} path
 * @param {string} method
 * @param {object} data
 * @returns {object}
 */
const request = async (path, method, data) => {
  const url = `${BASE_URL}/${path}`;
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error while sending request");
  }
};

/**
 * Get list job
 * @returns {Function}
 */
export const getJobsService = () => {
  return request(`${PATH}`, "GET");
};

/**
 * Get job based on ID
 * @param {string} id
 * @returns {Function}
 */
export const getJobByIdService = (id) => {
  return request(`${PATH}/${id}`, "GET");
};

/**
 * Add job to list
 * @param {object} jobData
 * @returns {Function}
 */
export const addJobService = (jobData) => {
  return request(`${PATH}`, "POST", jobData);
};

/**
 * Update job based on ID
 * @param {string} id
 * @param {object} jobData
 * @returns {Function}
 */
export const updateJobService = (id, jobData) => {
  return request(`${PATH}/${id}`, "PUT", jobData);
};

/**
 * Delete job based on ID
 * @param {string} id
 * @returns {Function}
 */
export const deleteJobService = (id) => {
  return request(`${PATH}/${id}`, "DELETE");
};
