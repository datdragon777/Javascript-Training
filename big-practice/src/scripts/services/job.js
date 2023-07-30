import { isSuccess } from "../helpers/check-service";
import { BASE_URL, PATH } from "../constants/base-url";

/**
 * Get job data from json-server
 * @returns {object}
 */
export const getJobsService = async () => {
  const response = await fetch(`${BASE_URL}/${PATH}`);
  return response;
};

/**
 * Get job's information form json-server by ID
 * @param {string} id - id of job
 * @returns {object}
 */
export const getJobByIdService = async (id) => {
  const response = await fetch(`${BASE_URL}/${PATH}/${id}`);
  return response;
};

/**
 * Add job and add into json-server
 * @param {object} jobData
 * @returns {function || null}
 */
export const addJobService = async (jobData) => {
  const response = await fetch(`${BASE_URL}/${PATH}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return response;

  // if (isSuccess(response)) {
  //   return response;
  // }
  // return null;
};

/**
 * Update job's information by ID
 * @param {string} id - ID of job
 * @param {object} jobData - job value after updating
 * @returns {function || null}
 */
export const updateJobService = async (id, jobData) => {
  const response = await fetch(`${BASE_URL}/${PATH}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  return response;
};

/**
 * Delete job's information by ID
 * @param {string} id
 * @returns {function || null}
 */
export const deleteJobService = async (id) => {
  const response = await fetch(`${BASE_URL}/${PATH}/${id}`, {
    method: "DELETE",
  });
  return response;
};
