const baseUrl = "http://localhost:3000/jobs";

export const getAllJobs = async() => {
  try {
    const response = await fetch(baseUrl);
    const jobs = await response.json();
    return jobs;
  } catch(err) {
    return err;
  }
};

export const getJobById = async(id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`);
    const job = await response.json();
    return job;
  } catch (err) {
    return err;
  }
};

export const createJob = async(jobData) => {
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData)
    })
    const newJob = await response.json()
    return newJob
  } catch(err) {
    return err
  }
}

export const updateJob = async(id, jobData) => {
  try {
    const response = await fetch(`${baseUrrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData)
    })
    const updatedJob = await response.json()
    return updatedJob
  } catch (error) {
    return err
  }
}

export const deleteJob = async(id) => {
  try {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    })
  } catch (error) {
    return err
  }
}
