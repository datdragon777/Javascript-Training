const article = document.querySelector("#content")
const button = document.querySelector("button")

function showMore() {
    if (article.className == "open") {
        article.className = ""
        button.innerHTML = "Show More"
    } else {
        article.className = "open"
        button.innerHTML = "Show Less"
    }
}
