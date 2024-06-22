function generateProductHTML(product) {
   
  const ratingStars = Array.from({ length: 5 }, (_, i) => 
      `<i class="material-icons ${i < product.rating.rate ? 'filled' : ''}">${i < product.rating.rate ? 'star' : 'star_border'}</i>`
    ).join('');

  //product
  const pro = document.createElement("div")
  pro.classList.add("top")

  

  //title
  const title = document.createElement("p")
  title.classList.add("name")
  title.textContent=product.title

  pro.append(title)

  //rating
  const rating =  document.createElement("div")
  rating.classList.add("rating")
  const count =  document.createElement("span")
  count.textContent="("+product.rating.count+")"
  rating.innerHTML=ratingStars
  rating.append(count)
  const stock = document.createElement("p")
  stock.textContent="In Stock"
  stock.classList.add("stock")
  rating.append(stock)

  pro.append(rating)

  //price
  const price = document.createElement("div")
  price.classList.add("price")
  price.textContent ="$"+ product.price

  pro.append(price)
  
  //description
  const description=document.createElement("p")
  description.classList.add("description")
  description.textContent = product.description
  
  pro.append(description)
  return pro
}
async function fetchProduct(id) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const products = await response.json();
  return products;
}
function getProductIdAndTitle(){
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id")
  const productTitle =urlParams.get("title")

  return {productId, productTitle}
}
(async function(){
  const object = getProductIdAndTitle();
  const {productId: id, productTitle: title} = object;
  
  const product = await fetchProduct(id);
  document.title=title;
  
  const top=document.getElementById("top")
  top.append(generateProductHTML(product))

  const second = document.getElementById("second_column")
  const img=document.createElement("img")
  img.src=product.image
  second.append(img)

  const path = document.getElementById("path")
  const yul = document.createElement("p")
  yul.textContent= product.title
  path.append(yul)
})()
document.addEventListener("DOMContentLoaded", function() {
    
  setTimeout(function() {
      document.getElementById('loaderOverlay').style.display = 'none';
  }, 1000);
});