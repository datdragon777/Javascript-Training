function fetchData(url) {
  return fetch(url).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    } else {
      return response.json();
    }
  });
}

const fetchDataWithAsyncAwait = async () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    try {
        const data = await fetchData(url);
        console.log(data);
        printResults(data)
    } catch (err) {
        console.log(err);
    }
}

function printResults(data) {
    const postList = document.getElementById('post-list')
    for (let i = 0; i < data.length; i++) {
        const postItem = document.createElement('li')
        postItem.textContent += data[i].title
        postList.appendChild(postItem)
    }
}

fetchDataWithAsyncAwait();


