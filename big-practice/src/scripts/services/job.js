import { isSuccess } from "../helpers/base";
import { baseUrl } from "../constants/baseUrl"

const path = "jobs"

/**
 * Get job data from json-server
 * @returns {object}
 */
export const getJobsService = async () => {
  const response = await fetch(`${baseUrl}/${path}`);
  const jobs = await response.json();
  return jobs;
};

/**
 * Get job's information form json-server by ID
 * @param {string} id - id of job
 * @returns {object}
 */
export const getJobByIdService = async (id) => {
  const response = await fetch(`${baseUrl}/${path}/${id}`);
  const job = await response.json();
  return job;
};

/**
 * Add job and add to json-server
 * @param {object} jobData
 * @returns {function || null}
 */
export const addJobService = async (jobData) => {
  const response = await fetch(`${baseUrl}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  if (isSuccess(response)) {
    return await getJobsService();
  }
  return null;
};

/**
 * Update job's information by ID
 * @param {string} id - ID of job
 * @param {object} jobData - job value after updating
 * @returns {function || null}
 */
export const updateJobService = async (id, jobData) => {
  const response = await fetch(`${baseUrl}/${path}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });

  if (isSuccess(response)) {
    return await getJobsService();
  }
  return null;
};

/**
 * Delete job's information by ID
 * @param {string} id
 * @returns {function || null}
 */
export const deleteJobService = async (id) => {
  const response = await fetch(`${baseUrl}/${path}/${id}`, {
    method: "DELETE",
  });
  if (isSuccess(response)) {
    return await getJobsService();
  }
  return null;
};
