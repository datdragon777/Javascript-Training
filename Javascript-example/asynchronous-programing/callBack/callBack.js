// function test() {
//   setTimeout(() => {
//     console.log("1"), 0;
//   });
//   console.log("2");
//   console.log("3");
// }
// test();


function httpGetAsync(theUrl, callBack) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      callBack(xmlHttp);
    }
  };
  xmlHttp.open("GET", theUrl, true);
  xmlHttp.send(null);
}

httpGetAsync("https://picsum.photos/200/300", (data) => {
  console.log(data);
  document.getElementById("img_1").setAttribute("src", data.responseURL);

  httpGetAsync("https://picsum.photos/200/300", (data) => {
    document.getElementById("img_2").setAttribute("src", data.responseURL);

    httpGetAsync("https://picsum.photos/200/300", (data) => {
      document.getElementById("img_3").setAttribute("src", data.responseURL);
    });
  });
});

