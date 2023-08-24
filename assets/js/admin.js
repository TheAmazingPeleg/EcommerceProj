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
          } else {
          }
        },
        error: function () {
          alert("You don't habe permissions to delete this Admin");
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
          } else {
          }
        },
        error: function () {
            alert("You don't habe permissions to change this Admin's password");
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
          } else {
          }
        },
        error: function () {
          alert("The Admin is already exists!");
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
          } else {
          }
        },
        error: function () {
          alert("You can't delete this user!");
        },
    });
}



function createProduct() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const priceBeforeDiscount = document.getElementById('priceBeforeDiscount').value;
    const price = document.getElementById('priceAfterDiscount').value;
    let images = [];
    const selectedCat = categories.filter((cat) => {
        if(document.getElementById(cat) && document.getElementById(cat).checked)
            return true;
        return false;
    });
    const imgUrl1 = document.getElementById('imgUrl1').value;
    if(document.getElementById('imgUrl2').value){
        images.push(document.getElementById('imgUrl2').value);
    }
    if(document.getElementById('imgUrl3').value){
        images.push(document.getElementById('imgUrl3').value);
    }
    if(document.getElementById('imgUrl4').value){
        images.push(document.getElementById('imgUrl4').value);
    }
    if(document.getElementById('imgUrl5').value){
        images.push(document.getElementById('imgUrl5').value);
    }
    //const publishToFacebook = document.getElementById("publish-to-fb-page");

    if (name === '' || description === '' || selectedCat.length == 0 || imgUrl1 === '' || price === '' || priceBeforeDiscount === '' || price < priceBeforeDiscount) {
        alert("Please fill all the fields");
        return;
    }

    const data = {
        name,
        description,
        selectedCat,
        images,
        price,
        priceBeforeDiscount
    }

    $.ajax({
        url: `/api/movies`,
        method: "POST",
        dataType: "json",
        data: data,
        success: function (response) {
            updateProducts();
            loadPanel('admin/manageMoviesForm')
            let alertStr = "Product was updated successfuly";
            /*if (publishToFacebook.checked) {
                postToFacebook(name);
                alertStr += " & published to CinemaWorld facebook page."
            }*/
            alert(alertStr);
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}

/*
function updateProducts() {
    $.ajax({
        url: `api/products`,
        method: "GET",
        dataType: "json",
        success: function (response) {
            products = response;
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}

function updateCategories() {
    $.ajax({
        url: `api/categories`,
        method: "GET",
        dataType: "json",
        success: function (response) {
            categories = response;
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}
*/
function updateAdmins() {
    $.ajax({
        url: `admin/api`,
        method: "GET",
        dataType: "json",
        success: function (response) {
            admins = response;
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}

function loadPanel(panelUrl) {
    const adminPanel = document.getElementById('admin-panel');
    $.ajax({
        url: panelUrl,
        method: "GET",
        success: function (response) {
            adminPanel.innerHTML = response;
            loadPanelElements(panelUrl)
        },
        error: function (xhr, status, error) {
            console.log("AJAX request failed: " + error);
        },
    });
}

function loadUnchangeableProductRow(product) {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = product.name;
    row.appendChild(nameCell);

    const descCell = document.createElement("td");
    nameCell.textContent = product.descrition;
    row.appendChild(descCell);

    const catCell = document.createElement("td");
    catCell.textContent = product.categories.join(", ");
    row.appendChild(catCell);

    const priceCell = document.createElement("td");
    nameCell.textContent = "<de>" + product.priceBeforeDiscount + "</del> - <u>" + product.price + "</u>";
    row.appendChild(priceCell);

    const imgCell = document.createElement("td");
    imgCell.textContent = '';
    product.images.forEach((img) => {
        imgCell.textContent += "<img src=\"" + img + "\" height=\"50px\" width=\"50px\"/>";
    });
    row.appendChild(imgCell);

    return row;
}

// function loadChangeableMoviesRow(movie) {
//     const row = document.createElement("tr");

//     const nameCell = document.createElement("td");
//     const nameTB = document.createElement("input");
//     nameTB.id = "movie-name-textbox-" + movie._id;
//     nameTB.type = "text";
//     nameTB.value = movie.name;
//     nameCell.appendChild(nameTB);
//     row.appendChild(nameCell);

//     const releaseDateCell = document.createElement("td");
//     const releaseDateTB = document.createElement("input");
//     releaseDateTB.id = "release-date-textbox-" + movie._id;
//     releaseDateTB.type = "text";
//     releaseDateTB.value = movie.releaseDate;
//     releaseDateCell.appendChild(releaseDateTB);
//     row.appendChild(releaseDateCell);

//     const genreCell = document.createElement("td");
//     const genreTB = document.createElement("input");
//     genreTB.id = "genre-textbox-" + movie._id;
//     genreTB.type = "text";
//     genreTB.value = movie.genre.join(", ");
//     genreCell.appendChild(genreTB);
//     row.appendChild(genreCell);

//     const durationCell = document.createElement("td");
//     const durationTB = document.createElement("input");
//     durationTB.id = "duration-textbox-" + movie._id;
//     durationTB.type = "text";
//     durationTB.value = movie.duration;
//     durationCell.appendChild(durationTB);
//     row.appendChild(durationCell);

//     const imgCell = document.createElement("td");
//     const imgTB = document.createElement("input");
//     imgTB.id = "img-textbox-" + movie._id;
//     imgTB.type = "text";
//     imgTB.value = movie.img;
//     imgCell.appendChild(imgTB);
//     row.appendChild(imgCell);

//     return row;
// }

// function loadMovieTable() {
//     var tableBody = document.querySelector("#movie-table tbody");
//     tableBody.innerHTML = "";
//     movies.forEach(function (movie) {
//         let row = (movie._id === editableMovieId)? 
//         loadChangeableMoviesRow(movie): 
//         loadUnchangeableMoviesRow(movie);

//         var oprCell = document.createElement("td");
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Delete";
//         deleteButton.onclick = () => { deleteMovie(movie._id) }
//         oprCell.appendChild(deleteButton);

//         const editButton = document.createElement("button");
//         editButton.textContent = (editableMovieId !== movie._id)? "Edit": "Update";
//         editButton.onclick = () => { editMovie(editButton, movie._id) }
//         editButton.classList = ['editBtn'];
//         oprCell.appendChild(editButton);

//         row.appendChild(oprCell);

//         tableBody.appendChild(row);
//     });
// }

// function loadCreateScreenForm() {
//     let selectMovie = document.getElementById('create-screen-select-movie');
//     selectMovie.innerHTML = "<option selected value=''>choose a movie</option>";
//     movies.forEach(movie => {
//         const movieOption = document.createElement("option");
//         movieOption.value = movie._id;
//         movieOption.text = `${movie._id} - ${movie.name}`
//         selectMovie.appendChild(movieOption);
//     });
//     let selectHall = document.getElementById('create-screen-select-hall');
//     selectHall.innerHTML = "<option selected value=''>choose a hall</option>";
//     halls.forEach(hall => {
//         const hallOption = document.createElement("option");
//         hallOption.value = hall._id;
//         hallOption.text = `No.${hall.number}`
//         selectHall.appendChild(hallOption);
//     });
// }


// function loadScreensTable() {
//     var tableBody = document.querySelector("#screens-table tbody");
//     tableBody.innerHTML = "";
//     movies.forEach(function (movie) {
//         movie.screens.forEach(function (screen) {
//             var row = document.createElement("tr");
//             var movieCell = document.createElement("td");
//             movieCell.textContent = movie.name;
//             row.appendChild(movieCell);
    
//             var timeCell = document.createElement("td");
//             timeCell.textContent = screen.time;
//             row.appendChild(timeCell);
    
//             var hallCell = document.createElement("td");
//             const hall = halls.find(hall => hall._id == screen.hall._id);
//             hallCell.textContent = hall.number;
//             row.appendChild(hallCell);
    
//             var oprCell = document.createElement("td");
//             const button = document.createElement("button");
//             button.textContent = "Delete";
//             button.onclick = () => { deleteScreen(movie._id, screen._id) }
//             oprCell.appendChild(button);
//             row.appendChild(oprCell);
    
//             tableBody.appendChild(row);
//         });
//     });
// }

// function loadUnchangeableHallsRow(hall) {
//     var row = document.createElement("tr");
//     var numberCell = document.createElement("td");
//     numberCell.textContent = hall.number;
//     row.appendChild(numberCell);

//     var rowsCell = document.createElement("td");
//     rowsCell.textContent = hall.rows;
//     row.appendChild(rowsCell);

//     var columnsCell = document.createElement("td");
//     columnsCell.textContent = hall.columns;
//     row.appendChild(columnsCell);

//     return row;
// }

// function loadChangeableHallsRow(hall) {
//     var row = document.createElement("tr");
//     var numberCell = document.createElement("td");
//     var numberInput = document.createElement("input");
//     numberInput.type = "text";
//     numberInput.id = "number-textbox-" + hall._id;
//     numberInput.classList = ["edit-textbox"];
//     numberInput.value = hall.number;
//     numberCell.appendChild(numberInput);
//     row.appendChild(numberCell);

//     var rowsCell = document.createElement("td");
//     var rowsInput = document.createElement("input");
//     rowsInput.type = "text";
//     rowsInput.id = "rows-textbox-" + hall._id;
//     rowsInput.classList = ["edit-textbox"];
//     rowsInput.value = hall.rows;
//     rowsCell.appendChild(rowsInput);
//     row.appendChild(rowsCell);

//     var columnsCell = document.createElement("td");
//     var columnsInput = document.createElement("input");
//     columnsInput.type = "text";
//     columnsInput.id = "columns-textbox-" + hall._id;
//     columnsInput.classList = ["edit-textbox"];
//     columnsInput.value = hall.columns;
//     columnsCell.appendChild(columnsInput);
//     row.appendChild(columnsCell);

//     return row;
// }

// function loadHallsTable() {
//     var tableBody = document.querySelector("#halls-table tbody");
//     tableBody.innerHTML = "";
//     halls.forEach(function (hall) {
//         let row = (hall._id === editableHallId)? 
//         loadChangeableHallsRow(hall): 
//         loadUnchangeableHallsRow(hall);

//         var oprCell = document.createElement("td");
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Delete";
//         deleteButton.onclick = () => { deleteHall(hall._id) }
//         oprCell.appendChild(deleteButton);

//         const editButton = document.createElement("button");
//         editButton.textContent = (editableHallId !== hall._id)? "Edit": "Update";
//         editButton.onclick = () => { editHall(editButton, hall._id) }
//         editButton.classList = ['editBtn'];
//         oprCell.appendChild(editButton);

//         row.appendChild(oprCell);

//         tableBody.appendChild(row);
//     });
// }

// function loadUnchangeableBranchesRow(branch) {
//     var row = document.createElement("tr");
//     var nameCell = document.createElement("td");
//     nameCell.textContent = branch.name;
//     row.appendChild(nameCell);

//     var locationCell = document.createElement("td");
//     locationCell.textContent = branch.location;
//     row.appendChild(locationCell);
//     return row;
// }

// function loadChangeableBranchesRow(branch) {
//     var row = document.createElement("tr");
//     var nameCell = document.createElement("td");
//     var nameInput = document.createElement("input");
//     nameInput.type = "text";
//     nameInput.id = "branch-name-textbox-" + branch._id;
//     nameInput.classList = ["edit-textbox"];
//     nameInput.value = branch.name;
//     nameCell.appendChild(nameInput);
//     row.appendChild(nameCell);
    
//     var locationCell = document.createElement("td");
//     var locationInput = document.createElement("input");
//     locationInput.type = "text";
//     locationInput.id = "location-textbox-" + branch._id;
//     locationInput.classList = ["edit-textbox"];
//     locationInput.value = branch.location;
//     locationCell.appendChild(locationInput);
//     row.appendChild(locationCell);
//     return row;
// }

// function loadBranchesTable() {
//     var tableBody = document.querySelector("#branches-table tbody");
//     tableBody.innerHTML = "";
//     branches.forEach(function (branch) {
//         let row = (branch._id === editableBranchId)? 
//         loadChangeableBranchesRow(branch): 
//         loadUnchangeableBranchesRow(branch);

//         var oprCell = document.createElement("td");
//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Delete";
//         deleteButton.onclick = () => { deleteBranch(branch._id) }
//         oprCell.appendChild(deleteButton);

//         const editButton = document.createElement("button");
//         editButton.textContent = (editableBranchId !== branch._id)? "Edit": "Update";
//         editButton.onclick = () => { editBranch(editButton, branch._id) }
//         editButton.classList = ['editBtn'];
//         oprCell.appendChild(editButton);

//         row.appendChild(oprCell);

//         tableBody.appendChild(row);
//     });
// }

// function loadAdminsTable() {
//     var tableBody = document.querySelector("#admins-table tbody");
//     tableBody.innerHTML = "";
//     admins.forEach(function (admin) {
//         var row = document.createElement("tr");
//         var usernameCell = document.createElement("td");
//         usernameCell.textContent = admin.username;
//         row.appendChild(usernameCell);

//         var passwordCell = document.createElement("td");
//         passwordCell.textContent = admin.password + " (hashed)";
//         row.appendChild(passwordCell);
        
//         var oprCell = document.createElement("td");
//         const button = document.createElement("button");
//         button.textContent = "Delete";
//         button.onclick = () => { deleteAdmin(admin._id) }
//         oprCell.appendChild(button);
//         row.appendChild(oprCell);

//         tableBody.appendChild(row);
//     });
// }



// function deleteMovie(movieId) {
//     $.ajax({
//         url: `api/movies/${movieId}`,
//         method: "DELETE",
//     });
//     const movieIndex = movies.findIndex(movie => movie._id === movieId);
//     if (movieIndex > -1) {
//         movies.splice(movieIndex, 1);
//         loadMovieTable();
//     }
// }

// function deleteScreen(movieId, screenId) {
//     $.ajax({
//         url: '/screen',
//         method: "DELETE",
//         data: {
//             movieId: movieId,
//             screenId: screenId
//         }
//     });
//     const movieIndex = movies.findIndex(movie => movie._id === movieId);
//     if (movieIndex > -1) {
//         const screenIndex = movies[movieIndex].screens.findIndex(screen => screen._id === screenId);
//         if (screenIndex > -1) {
//             movies[movieIndex].screens.splice(screenIndex, 1);
//             loadScreensTable();
//         }
//     }
// }

// function deleteHall(hallId) {
//     $.ajax({
//         url: `halls/${hallId}`,
//         method: "DELETE",
//     });
//     const hallIndex = halls.findIndex(hall => hall._id === hallId);
//     if (hallIndex > -1) {
//         halls.splice(hallIndex, 1);
//         loadHallsTable();
//     }
// }

// function deleteBranch(branchId) {
//     $.ajax({
//         url: `branch/${branchId}`,
//         method: "DELETE",
//     });
//     const branchIndex = branches.findIndex(branch => branch._id === branchId);
//     if (branchIndex > -1) {
//         branches.splice(branchIndex, 1);
//         loadBranchesTable();
//     }
// }

// function deleteAdmin(adminId) {
//     $.ajax({
//         url: `admin/api/${adminId}`,
//         method: "DELETE",
//     });
//     const adminIndex = admins.findIndex(admins => admins._id === adminId);
//     if (adminIndex > -1) {
//         admins.splice(adminIndex, 1);
//         loadAdminsTable();
//     }
// }

// function editMovie(button, movieId) {
//     if (editableMovieId !== movieId) {
//         editableMovieId = movieId;
//         button.textContent = "Update";
//         loadMovieTable();
//         return;
//     }
//     button.textContent = "Edit";
//     editableMovieId = undefined;

//     const nameTB = document.getElementById("movie-name-textbox-" + movieId);
//     const releaseDateTB = document.getElementById("release-date-textbox-" + movieId);
//     const genreTB = document.getElementById("genre-textbox-" + movieId);
//     const durationTB = document.getElementById("duration-textbox-" + movieId);
//     const imgTB = document.getElementById("img-textbox-" + movieId);

//     const movie = {
//         _id: movieId,
//         name: nameTB.value,
//         releaseDate: releaseDateTB.value,
//         genre: genreTB.value.split(","),
//         duration: parseInt(durationTB.value),
//         img: imgTB.value,
//     }

//     $.ajax({
//         url: `api/movies/${movieId}`,
//         method: "PUT",
//         data: movie
//     });

//     const movieIndex = movies.findIndex(m => m._id === movieId);
//     if (movieIndex > -1) {
//         movies[movieIndex] = movie;
//         loadMovieTable();
//     }
// }

// function editHall(button, hallId) {
//     if (editableHallId !== hallId) {
//         editableHallId = hallId;
//         button.textContent = "Update";
//         loadHallsTable();
//         return;
//     }
//     button.textContent = "Edit";
//     editableHallId = undefined;

//     const numberTB = document.getElementById("number-textbox-" + hallId);
//     const rowsTB = document.getElementById("rows-textbox-" + hallId);
//     const columnsTB = document.getElementById("columns-textbox-" + hallId);

//     const hall = {
//         _id: hallId,
//         number: numberTB.value,
//         rows: rowsTB.value,
//         columns: columnsTB.value,
//     }

//     $.ajax({
//         url: `halls/${hallId}`,
//         method: "PUT",
//         data: hall
//     });
//     const hallIndex = halls.findIndex(hall => hall._id === hallId);
//     if (hallIndex > -1) {
//         halls[hallIndex].number = hall.number;
//         halls[hallIndex].rows = hall.rows;
//         halls[hallIndex].columns = hall.columns;
//         loadHallsTable();
//     }
// }

// function editBranch(button, branchId) {
//     if (editableBranchId !== branchId) {
//         editableBranchId = branchId;
//         button.textContent = "Update";
//         loadBranchesTable();
//         return;
//     }
//     button.textContent = "Edit";
//     editableBranchId = undefined;

//     const nameTB = document.getElementById("branch-name-textbox-" + branchId);
//     const locationTB = document.getElementById("location-textbox-" + branchId);

//     const branch = {
//         _id: branchId,
//         name: nameTB.value,
//         location: locationTB.value,
//     }

//     $.ajax({
//         url: `branch/${branchId}`,
//         method: "PUT",
//         data: branch
//     });
//     const branchIndex = branches.findIndex(branch => branch._id === branchId);
//     if (branchIndex > -1) {
//         branches[branchIndex].name = branch.name;
//         branches[branchIndex].location = branch.location;
//         loadBranchesTable();
//     }
// }

// function addScreen() {
//     const movieId = document.getElementById('create-screen-select-movie').value;
//     const time = document.getElementById('time').value;
//     const hallId = document.getElementById('create-screen-select-hall').value;

//     if (movieId === '' || time === '' || hallId === '') {
//         alert("Please fill all fields");
//         return;
//     }

//     const screen = {
//         movieId: movieId,
//         time: time,
//         hallId: hallId,
//     }

//     $.ajax({
//         url: `/screen`,
//         method: "POST",
//         dataType: "json",
//         data: screen,
//         success: function (response) {
//             updateMovies();
//             loadPanel('admin/manageScreensForm')
//             alert("Screen was updated successfuly");
//         },
//         error: function (xhr, status, error) {
//             console.log("AJAX request failed: " + error);
//         },
//     });
// }

// function addHall() {
//     const number = document.getElementById('hall-number-field').value;
//     const rows = document.getElementById('hall-rows-field').value;
//     const columns = document.getElementById('hall-columns-field').value;

//     if (number === '' || rows === '' || columns === '') {
//         alert("Please fill all fields");
//         return;
//     }

//     const hall = {
//         number: number,
//         rows: rows,
//         columns: columns,
//     }

//     $.ajax({
//         url: `/halls`,
//         method: "POST",
//         dataType: "json",
//         data: hall,
//         success: function (response) {
//             updateHalls();
//             loadPanel('admin/manageHallsForm')
//             alert("Screen was updated successfuly");
//         },
//         error: function (xhr, status, error) {
//             console.log("AJAX request failed: " + error);
//         },
//     });
// }

// function addBranch() {
//     const branchName = document.getElementById('branch-name-field').value;
//     const branchLocation = document.getElementById('branch-location-field').value;

//     if (branchName === '' || branchLocation === '') {
//         alert("Please fill all fields");
//         return;
//     }

//     const branch = {
//         name: branchName,
//         location: branchLocation,
//     }

//     $.ajax({
//         url: `/branch`,
//         method: "POST",
//         dataType: "json",
//         data: branch,
//         success: function (response) {
//             updateBranches();
//             loadPanel('admin/manageBranchesForm')
//             alert("Branch was updated successfuly");
//         },
//         error: function (xhr, status, error) {
//             console.log("AJAX request failed: " + error);
//         },
//     });
// }

// function addAdmin() {
//     const username = document.getElementById('username-field').value;
//     const password = document.getElementById('password-field').value;

//     if (username === '' || password === '') {
//         alert("Please fill all fields");
//         return;
//     }

//     const admin = {
//         username,
//         password
//     }

//     $.ajax({
//         url: `/admin/api`,
//         method: "POST",
//         dataType: "json",
//         data: admin,
//         success: function (response) {
//             updateAdmins();
//             loadPanel('admin/manageAdminsForm')
//             alert("Admin was created successfuly");
//         },
//         error: function (xhr, status, error) {
//             console.log("AJAX request failed: " + error);
//         },
//     });
// }

// function postToFacebook(movieName) {
//     const postMessage = `Attention all movie lovers! The wait is finally over - the highly anticipated ${movieName} is now showing at CinemaWorld!
//     Come and experience this amazing film on our luxurious screens and state-of-the-art sound systems. Our team of experienced projectionists and sound engineers have worked tirelessly to ensure that every detail is perfect, so you can immerse yourself fully in this captivating movie.`;

//     $.ajax({
//         url: "https://graph.facebook.com/v16.0/100754812981720/feed",
//         method: "POST",
//         data: {
//           message: postMessage,
//           access_token: facebookToken
//         },
//         success: function(response) {
//           console.log(response);
//         },
//         error: function(error) {
//           console.log(error);
//         }
//       });
// }

// function onSelectGenre(event) {
//     const genreCheckboxes = document.querySelectorAll('.genre-checkbox');
//     selectedGenres.length = 0;
  
//     genreCheckboxes.forEach((checkbox) => {
//       if (checkbox.checked) {
//         selectedGenres.push(checkbox.value);
//       }
//     });
//   }

// updateMovies();
// updateHalls();
// updateBranches();
// updateAdmins();
// loadPanel('admin/createMovieForm');

// postToFacebook("avatar");