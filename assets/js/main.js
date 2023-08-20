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
}