async function fetchProducts() {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    return products;
  }

function generateProductHTML(product) {
   
    const ratingStars = Array.from({ length: 5 }, (_, i) => 
        `<i class="material-icons ${i < product.rating.rate ? 'filled' : ''}">${i < product.rating.rate ? 'star' : 'star_border'}</i>`
      ).join('');

    //product
    const pro = document.createElement("div")
    pro.classList.add("product")
    
    const imgLink = document.createElement("a")
    imgLink.href=`product.html?id=${product.id}&title=${product.title}`

    //img
    const imgBox = document.createElement("div")
    imgBox.classList.add("product-img-box")

    
    const img = document.createElement("img");
    img.src = product.image; 
    
    imgBox.append(img)

    imgLink.append(imgBox)
    
    pro.append(imgLink)

    //title
    const title = document.createElement("div")
    title.classList.add("product-title")
    title.textContent=product.title

    pro.append(title)

    //product details
    const productDetails = document.createElement("div")
    productDetails.classList.add("product-details")

    const price = document.createElement("div")
    price.classList.add("product-price")
    price.textContent ="$"+ product.price

    const rating =  document.createElement("div")
    rating.classList.add("product-rating")
    const count =  document.createElement("span")
    count.textContent="("+product.rating.count+")"
    rating.innerHTML=ratingStars
    rating.append(count)

    productDetails.append(price)
    productDetails.append(rating)

    pro.append(productDetails)

    //product actions
    const actions =  document.createElement("div")
    actions.classList.add("product-actions")

    const fav =  document.createElement("button")
    fav.classList.add("favourite-btn")
    fav.onclick = function(){
       fav.classList.toggle("red")
    }
    const icon =  document.createElement("i")
    icon.classList.add("fa-regular")
    icon.classList.add("fa-heart")
    
    fav.append(icon)

    actions.append(fav)
    
    const link = document.createElement("a")
    link.href = `product.html?id=${product.id}&title=${product.title}`
    const icon2= document.createElement("i")
    icon2.classList.add("fa-solid")
    icon2.classList.add("fa-eye")
    
    link.append(icon2)

    actions.append(link)
    
    pro.append(actions)
    return pro
  }

async function displayProducts() {
    const products = await fetchProducts();
    const productsSection = document.getElementById('container');
    const section = document.createElement("div")
    section.classList.add("products-container")
    products.forEach(product => {
        section.append(generateProductHTML(product))
        
        
    });
    const view = document.querySelector(".view")
    productsSection.insertBefore(section,view)
    
    
  }
  document.addEventListener("DOMContentLoaded", function() {
    
    setTimeout(function() {
        document.getElementById('loaderOverlay').style.display = 'none';
    }, 1000);
});
displayProducts();
(async function () {
  const hasToken = checkToken()
  if (hasToken==false){
    redirect("/login.html")
  }
  const products = await fetchProducts();
  renderProducts(products);
})();




  

