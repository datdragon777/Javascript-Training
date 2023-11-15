function updatePrice() {
    let dropdown = document.getElementById('productDropdown')
    let priceEl = document.getElementById('price')
    let selectedOption = dropdown.options[dropdown.selectedIndex].value
    let price = getPrice(selectedOption)

    priceEl.textContent = `Price: $${price}`
    console.log(price);
}

function getPrice(productId) {
    if (productId === "1") {
        return 10000
    } else if (productId === "2") {
        return 500
    } else if (productId === "3") {
        return 2000
    } else {
        return 0
    }
}