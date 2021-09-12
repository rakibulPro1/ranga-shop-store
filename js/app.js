const loadProducts = () => {
  fetch("https://fakestoreapi.com/products/")
    .then((res) => res.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((product) => product);
  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
    <div class="single-product">
      <div>
        <img class="product-image" src=${image}></img>
      </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <p class='rate'><span class='warning'>${product.rating.rate}</span> Rating Out of <span class='warning'>5</span></p>
        <p class='reviews'><span class='warning'>${product.rating.count}</span> Customer Reviews</p>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
        <button id="details-btn" onclick="loadProductDetail('${product.id}')" class="btn btn-danger">Details</button>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = Math.round(total * 100) / 100;
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value * 100) / 100;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText =
    Math.round(grandTotal * 100) / 100;
};

// details of product
const loadProductDetail = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayproductDetail(data));
};

const displayproductDetail = (product) => {
  const productDetailContainer = document.getElementById("single-product");
  productDetailContainer.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `

    <img src="${product.image}" class="card-img-top single-product-img" alt="" />
    <div class="card-body">
      <h3 class="card-title">${product.title}</h3>
      <h5>Price: ${product.price}</h5>
      <p>${product.description}</p>
    </div>
  `;
  productDetailContainer.appendChild(div);
};
