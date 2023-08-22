$(document).ready(function(){
    // Initialize Tooltip
    $('[data-toggle="tooltip"]').tooltip(); 
    
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function(event) {
  
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
  
        // Prevent default anchor click behavior
        event.preventDefault();
  
        // Store hash
        var hash = this.hash;
  
        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 900, function(){
     
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        });
      } // End if
    });
  })
  let products = [];
    $.ajax({
      url: "/api/products/",
      method: "GET",
      success: function (response) {
        response.forEach((item) => {
          products.push(item);
        });
      },
      error: function (xhr, status, error) {
        console.log("AJAX request failed: " + error);
      },
    });
  let click = 0;
  const searchInit = () => {
    const searchButton = document.getElementById('searchButton');
    searchButton.className = "glyphicon glyphicon-remove";
    const searchElem = document.getElementById('searchElem');
    if(click % 2){
      const searchForm = document.createElement("form");
      const searchInput = document.createElement("input");
      searchInput.addEventListener('input', searchBar);
      searchInput.setAttribute('id','searchInput');
      const searchRows = document.createElement("div");
      searchRows.setAttribute('id','searchRows');
      searchRows.style.display = "none";
      searchForm.appendChild(searchInput);
      searchElem.appendChild(searchForm);
      searchElem.appendChild(searchRows);
    }else{
      searchElem.innerHTML = "";
      searchButton.className = "glyphicon glyphicon-search";
    }
    click ++;
  }
  const searchBar = (e) => {
    const rows = document.getElementById('searchRows');
    if(e.target.value === ''){
      rows.style.display ="none";
    }else{
      rows.style.display ="block";
      const filteredRows = products.filter((item) => { 
        let flag = 0;
        item.categories.forEach((cat) => {
          if(cat.includes(e.target.value))
            flag ++;
        });
          return flag || item.name.includes(e.target.value) || item.description.includes(e.target.value);
      });
      if(filteredRows.length === 0){
        rows.innerHTML = "There is no matching product for `" + e.target.value + "`";
      }else{
        rows.innerHTML = "";
        rows.appendChild(document.createElement("ul"));
        let index = 0;
        filteredRows.forEach((item) => {
          if(index === 5)
            return;
          let rowItem = document.createElement("li");
          rowItem.innerHTML = "<a href=\"/" + item.categories[0] + "/" + item._id + "\"><img src=\"" + item.images[0] + "\" height=\"50px\" width=\"50px\" /> " + item.name + "</a>";
          rows.appendChild(rowItem);
          index ++;
        });
      }
    }
  }
  function addToCart() {
    // Get values from input elements using name attributes
    const id = document.getElementsByName('productId')[0].value;
    const color = document.getElementsByName('productColor')[0].value;
    const size = document.getElementsByName('productSize')[0].value;
    const amount = parseInt(document.getElementsByName('productAmount')[0].value);
    const filteredRows = products.filter((item) => {
        if(item._id === id)
            return true;
        return false;
    });
    if(filteredRows.length === 1){
        if( amount > 0){
            const item = filteredRows[0];
            if(color === ''){
                alert('Please select a color!');
                return;
            }
            if(size === ''){
                alert('Please select a size!');
                return;
            }
            if(item.amount < amount){
                alert('We left only ' + item.amount + ' in stock!');
                return;
            }
            let flag = 0;
            item.colors.forEach((color) => {
            if(color.includes(color))
                flag ++;
            });
            if(flag === 0){
                alert('The color is unavailable!');
                return;
            }
            flag = 0;
            item.sizes.forEach((size) => {
            if(size.includes(size))
                flag ++;
            });
            if(flag === 0){
                alert('The size is unavailable!');
                return;
            }
        }else{
            alert('Select amount!');
            return;
        }
    }else{
        alert('Unknown Product!');
        return;
    }
    // Get existing cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Create a new item object
    let newItem = {
        id: id,
        name: filteredRows[0].name,
        category: filteredRows[0].categories[0],
        image: filteredRows[0].images[0],
        price: filteredRows[0].price,
        color: color,
        size: size,
        amount: amount
    };
    let isOnCart = false;
    cart.forEach((cartItem) => {
        if(cartItem.id === id && cartItem.color === color && cartItem.size === size){
            isOnCart = true;
            cartItem.amount += amount;
        }
    });

    // Add the new item to the cart array
    if(!isOnCart)
        cart.push(newItem);

    // Update the cart data in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(newItem.name + 'added to the cart!');
    initCart();
}

let cart = [];
const cartAmount = document.getElementById('cartAmount');
const productsInCart = document.getElementById('productsInCart'); 
const fullCart = document.getElementById('fullCart'); 
const navBarCart = document.getElementById('navBarCart');
const removeFromCart = (id, size, color) => {
    const filteredCart = cart.filter((item) => {
        if(item.id === id && item.size === size && item.color === color)
            return false;
        return true;
    });
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    initCart();
}
const goToCart = () => {
    window.location.pathname = "/cart";
}
const initCart = () => {
    navBarCart.innerHTML = '';
    if(localStorage.getItem('cart') == 'undefined'){
        localStorage.removeItem('cart');
    }
    if(localStorage.getItem('cart')){
        cart = JSON.parse(localStorage.getItem('cart'));
        if(cart.length !== 0){
            if(productsInCart)
                productsInCart.innerText = cart.length;
            cartAmount.innerText = cart.length;
            let total = 0;
            cart.forEach((item) => {
                total += item.amount * item.price;
                let itemElem = document.createElement('li');
                itemElem.style.width = "100%";
                itemElem.style.position = "relative";
                itemElem.style.display = "flex";
                itemElem.innerHTML = "<a style=\"width: 100%; padding-right: 50px;\" href=\"\\" + item.category + "\\"+ item.id +"\"><img src=\"" + item.image + "\" height=\"30px\" width=\"30px\"/>" + item.name + " '" + item.size + "' - " + item.amount + ": <p style=\"float: left; border: 1px solid black; border-radius: 10px; margin-top: 10px; width: 10px; height: 10px; background: #" + item.color + "\"></p> <em style=\"font-size: 12px;\">&#8362;" + item.price * (item.amount) + "<em></a><span class=\"glyphicon glyphicon-remove\" style=\"position: absolute; top: 12px; right: 0px;\" onclick=\"removeFromCart('" + item.id + "','" + item.size + "','" + item.color + "')\">";
                navBarCart.appendChild(itemElem);
            });
            const itemElem = document.createElement('li');
            itemElem.style.textAlign = "center";
            itemElem.innerHTML = "<em>Total: &#8362;" + total + "</em>";
            navBarCart.prepend(itemElem);
            if(fullCart){
                cart.forEach((item) => {
                    let itemElem = document.createElement('li');
                    itemElem.classList = "list-group-item d-flex justify-content-between lh-condensed";
                    itemElem.innerHTML = "<a style=\"display: flex\" href=\"\\" + item.category + "\\"+ item.id +"\"><img src=\"" + item.image + "\" height=\"30px\" width=\"30px\"/><em style=\"margin: 0px 10px\">" + item.name + "</em><p style=\"border: 1px solid black; border-radius: 10px; margin-top: 10px; width: 10px; height: 10px; background: #" + item.color + "\"></p><p style=\"margin: 0px 10px;\">'" + item.size + "' - " + item.amount + "</p><span>&#8362;" + item.price * (item.amount) + "<span></a><span class=\"glyphicon glyphicon-remove\" style=\"position: absolute; top: 16px; right: 5px;\" onclick=\"removeFromCart('" + item.id + "','" + item.size + "','" + item.color + "')\">";
                    fullCart.appendChild(itemElem);
                });
                const itemElem = document.createElement('li');
                itemElem.style.textAlign = "center";
                itemElem.classList = "list-group-item d-flex justify-content-between lh-condensed";
                itemElem.innerHTML = "<em>Total: &#8362;" + total + "</em>";
                fullCart.prepend(itemElem);
            }
        }else{
            cartEmpty();
        }
    }else{
        cartEmpty();
    }
    const goToCart = document.createElement('li');
    goToCart.style.textAlign = "center";
    goToCart.innerHTML = "<div class=\"btn btn-primary\" onclick=\"goToCart()\">Cart</div>";
    navBarCart.appendChild(goToCart);
}
const cartEmpty = () => {
    if(productsInCart)
        productsInCart.innerText = 0;
    cartAmount.innerText = 0;
    let noItems = document.createElement('li');
    noItems.style.textAlign = "center";
    noItems.innerText = "No items in cart";
    navBarCart.appendChild(noItems);
    if(fullCart){
        fullCart.innerHTML = '';
        let itemElem = document.createElement('li');
        itemElem.style.textAlign = "center";
        itemElem.classList = "list-group-item d-flex justify-content-between lh-condensed";
        itemElem.innerHTML = "No items in cart";
        fullCart.appendChild(itemElem);
    }
}
initCart();