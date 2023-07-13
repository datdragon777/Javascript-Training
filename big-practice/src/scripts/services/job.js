const baseUrl = "http://localhost:3000/jobs";

export const getJobsService = async () => {
  const response = await fetch(baseUrl);
  const jobs = await response.json();
  return jobs;
};

export const getJobByIdService = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`);
  const job = await response.json();
  return job;
};

export const addJobService = async (jobData) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  const newJob = await response.json();
  return newJob;
};

export const updateJobService = async (id, jobData) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jobData),
  });
  const updatedJob = await response.json();
  return updatedJob;
};

export const deleteJob = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};
