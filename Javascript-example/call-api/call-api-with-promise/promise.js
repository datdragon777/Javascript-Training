function fetchData(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failded to fetch data");
    } else {
      return response.json();
    }
  });
}

const fetchDataWithPromise = () => {
  const url = "https://jsonplaceholder.typicode.com/posts";
  return fetchData(url);
};

fetchDataWithPromise()
  .then((data) => {
    console.log(data);
    setTimeout(() => {
      printResult(data);
    }, 5000);
  })
  .catch((err) => {
    console.log(err);
  });

function printResult(data) {
  const postList = document.getElementById("post-list");
  for (let i = 0; i < data.length; i++) {
    const postItem = document.createElement("li");
    postItem.textContent += data[i].title;
    postList.appendChild(postItem);
  }
}
