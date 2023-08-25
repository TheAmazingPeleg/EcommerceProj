let products = [];
let categories = [];
let admins = [];

function deleteAdmin(id) {
    $.ajax({
        url: "/admin/manageAdminsForm",
        method: "DELETE",
        data: { id },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 201) {
            alert("Admin Removed!");
            location.reload();
          } else {
          }
        },
        error: function () {
          alert("You don't habe permissions to delete this Admin");
        },
    });
}

function deleteProduct(id) {
    $.ajax({
        url: "/admin/manageProductsForm",
        method: "DELETE",
        data: { id },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 201) {
            alert("Product Removed!");
            location.reload();
          } else {
          }
        },
        error: function () {
          alert("Unable to delete the product");
        },
    });
}

function deleteCategory(id) {
    $.ajax({
        url: "/admin/manageCategoriesForm",
        method: "DELETE",
        data: { id },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 201) {
            alert("Category Removed!");
            location.reload();
          } else {
          }
        },
        error: function () {
          alert("Unable to delete the category");
        },
    });
}

const handleChangeAdminPassword = (id) => {
    const password = $("#" + id + "password").val();
    $.ajax({
        url: "/admin/manageAdminsForm",
        method: "POST",
        data: { id, password },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 200) {
            alert("Password Changed!");
            location.reload();
          } else {
          }
        },
        error: function () {
            alert("You don't habe permissions to change this Admin's password");
        },
    });
};

const updateOrder = (id) => {
  const status = $("#" + id + "status").val();
  $.ajax({
      url: "/admin/manageOrdersForm",
      method: "POST",
      data: { id, status },
      followRedirects: true,
      xhrFields: { withCredentials: true },
      success: function (data, textStatus, jqXHR) {
        if (jqXHR.status == 200) {
          alert("Status Changed!");
          location.reload();
        } else {
        }
      },
      error: function () {
          alert("Unable to update order's status!");
      },
  });
};

const createAdmin = () => {
    const username = $("#username").val();
    const image = $("#image").val();
    const password = $("#password").val();
    $.ajax({
        url: "/admin/createAdminForm",
        method: "POST",
        data: { username, image, password },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 201) {
            alert("Admin Created!");
            location.reload();
          } else {
          }
        },
        error: function () {
          alert("The Admin is already exists!");
        },
    });
};

const createCategory = () => {
    const name = $("#name").val();
    const image = $("#image").val();
    const slogan = $("#slogan").val();
    $.ajax({
        url: "/admin/createCategoryForm",
        method: "POST",
        data: { name, image, slogan },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 201) {
            alert("Category Created!");
            location.reload();
          } else {
          }
        },
        error: function () {
          alert("Unable to create category!");
        },
    });
};

const updateUser = (id) => {
    const username = $("#"+ id +"username").val();
    const email = $("#"+ id +"email").val();
    const firstName = $("#"+ id +"firstName").val();
    const lastName = $("#"+ id +"lastName").val();
    const address = $("#"+ id +"address").val();
    const city = $("#"+ id +"city").val();
    const country = $("#"+ id +"country").val();
    const zip = $("#"+ id +"zip").val();
  
    $.ajax({
        url: "/admin/manageUsersForm",
        method: "POST",
        data: { id, username, email, firstName, lastName, address, city, country, zip },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 200) {
            alert("User updated!");
            location.reload();
          } else {
          }
        },
        error: function () {
            alert("User didn't updated!");
        },
    });
};

const handleChangeUserPassword = (id) => {
    const password = $("#" + id + "password").val();
    $.ajax({
        url: "/admin/manageUsersForm",
        method: "PUT",
        data: { id, password },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 200) {
            alert("Password Changed!");
            location.reload();
          } else {
          }
        },
        error: function () {
            alert("User didn't updated!");
        },
    });
};

function deleteUser(id) {
    $.ajax({
        url: "/admin/manageUsersForm",
        method: "DELETE",
        data: { id },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 201) {
            alert("User Removed!");
            location.reload();
          } else {
          }
        },
        error: function () {
          alert("You can't delete this user!");
        },
    });
}

function createProduct(colors, images) {
  console.log(images);
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const amount = document.getElementById('amount').value;
    const priceBeforeDiscount = document.getElementById('priceBeforeDiscount').value;
    const price = document.getElementById('price').value;
    const categoryCheckboxes = document.querySelectorAll('.categoryCheck');
    const productCategories = [];
    categoryCheckboxes.forEach((cat) => {
        var nameValue = cat.getAttribute('name');
        if(cat.checked)
            productCategories.push(nameValue);
    });
    const productImages = [], productSizes = [], productSex = [], productColors = [];
    for(let i = 1; i <= images; i ++){
        let image = document.getElementById('img'+i);
        if(image.value !== '')
            productImages.push(image.value);
    }
    if(document.getElementById('s').checked)
        productSizes.push('S');
    if(document.getElementById('m').checked)
        productSizes.push('M');
    if(document.getElementById('l').checked)
        productSizes.push('L');
    if(document.getElementById('male').checked)
        productSex.push('Male');
    if(document.getElementById('female').checked)
        productSex.push('Female');
    if(productSex.length === 0)
        productSex.push('Unisex');
    for(let j = 1; j <= colors; j ++){
        let color = document.getElementById('color'+j);
        if(color.value !== '')
            productColors.push(color.value);
    }
    const data = {
        name,
        description,
        categories: productCategories,
        images: productImages,
        priceBeforeDiscount,
        price,
        amount,
        sizes: productSizes,
        colors: productColors,
        sex: productSex,
    }

    $.ajax({
        url: `/admin/createProductForm`,
        method: "POST",
        data: data,
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 201) {
            alert("Product Added!");
            location.reload();
          } else {
          }
        },
        error: function () {
            alert("Unable to create the product!");
        },
    });
}