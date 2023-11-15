// Example using only a event
const btn_event = document.getElementById('btn-event')
btn_event.addEventListener('click', () => {
    console.log("Hello, It's just a click event");
})

// Example using event delegation
const product_list = document.getElementById('product-list')
product_list.addEventListener('click', (event) => {
    if(event.target.classList.contains("btn-add")) {
        let product = event.target.closest('li').querySelector('span').textContent
        addToCart(product)
    }
})

function addToCart(product) {
    console.log(`Added product ${product} to cart`)
}

// Example using event bubbling
const parent = document.getElementById('parent')
const child = document.getElementById('child')
const grandChild = document.getElementById('grand-child')

parent.addEventListener('click', (event) => { console.log("parent was click!"); })
child.addEventListener('click', (event) => { console.log("child was click!"); })
grandChild.addEventListener('click', (event) => { console.log("grand-child was click!"); })