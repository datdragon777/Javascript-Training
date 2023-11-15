function httpGetAsync(theUrl, resolve) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      resolve(xmlHttp);
    }
  };
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send(null);
}

const currentpromise = new Promise((resolve, reject) => {
  httpGetAsync("https://picsum.photos/200/300", resolve);
});

const promise02 = new Promise((resolve, reject) => {
  httpGetAsync("https://picsum.photos/200/300", resolve);
});

const promise03 = new Promise((resolve, reject) => {
  httpGetAsync("https://picsum.photos/200/300", resolve);
});

const executeAsync = async () => {
  try {
    const response = await currentpromise;
    document.getElementById("img_1").setAttribute("src", response.responseURL);

    const response02 = await promise02;
    document.getElementById("img_2").setAttribute("src", response02.responseURL);

    const response03 = await promise03;
    document.getElementById("img_3").setAttribute("src", response03.responseURL);
  } catch (err) {
    console.log({err});
  }
};
executeAsync();

//   currentpromise
//     .then((data) => {
//       document.getElementById("img_1").setAttribute("src", data.responseURL);
//       return promise02;
//     })
//     .then((data) => {
//       document.getElementById("img_2").setAttribute("src", data.responseURL);
//       return promise03;
//     })
//     .then((data) => {
//       document.getElementById("img_3").setAttribute("src", data.responseURL);
//       // return promise03;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
