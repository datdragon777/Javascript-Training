function fetchData(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw Error("Failed to fetch data");
    }
    return response.json();
  });
}

const fetchDataWithCallback = (callback) => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  fetchData(url)
    .then((data) => {
        callback(data)
        printResult(data)
    })
    .catch((err) => callback(err));
};

fetchDataWithCallback((data, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

function printResult(data) {
  const postList = document.getElementById("post-list");
  for (let i = 0; i < data.length; i++) {
    const postItem = document.createElement("li");
    postItem.innerHTML = data[i].title;
    postList.appendChild(postItem);
  }
}
