const loginMode = document.getElementById("loginMode");
const loginModeHead = document.getElementById("loginModeHead");
if(loginMode && loginModeHead){
  if(window.location.search === "?pathToRedirect=/admin"){
    loginMode.innerText = "Login as User >";
    loginMode.href = "login";
    loginModeHead.innerText = "Admin Login";
  }else{
    loginMode.innerText = "Login as Admin >";
    loginMode.href = "login?pathToRedirect=/admin";
    loginModeHead.innerText = "Login";
  }
}

const renderError = ({ errors }) => {
    const errorsElement = document.getElementById("errors-container");
  
    errorsElement.innerHTML = "";
  
    for (let i = 0; i < errors.length; i++) {
      const errorElement = document.createElement("div");
      errorElement.innerHTML = errors[i];
      errorsElement.appendChild(errorElement);
    }
  
    errorsElement.style.display = "block";
};

const moveToRegister = () => {
  window.location.href = "/login/newUser";
}
  
const handleRegister = () => {
    const username = $("#username").val();
    const password = $("#password").val();
    const email = $("#email").val();
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
  
    const clientSideValidationErrors = [];
    if(username.length < 2){
      clientSideValidationErrors.push(`The username must contain atleast 2 letters`);
    }
    if(password.length < 6){
      clientSideValidationErrors.push(`The password must contain atleast 6 letters`);
    }
    if(email === ''){
      clientSideValidationErrors.push(`Please use a vallid email!`);
    }
    if(firstName.length < 2){
      clientSideValidationErrors.push(`The first name must contain atleast 2 letters`);
    }
    if(lastName.length < 2){
        clientSideValidationErrors.push(`The last name must contain atleast 2 letters`);
    }
    if (clientSideValidationErrors.length > 0) {
      renderError({ errors: clientSideValidationErrors });
    } else {
      $.ajax({
        url: "/login/newUser",
        method: "POST",
        data: { username, password, email, firstName, lastName },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 200) {
            window.location.href = '/login';
          } else {
          }
        },
        error: function (error) {
          renderError(error.responseJSON);
        },
      });
    }
};

const handleLogin = () => {
  const username = $("#username").val();
  const password = $("#password").val();

  const clientSideValidationErrors = [];

  if (username.length == 0) {
    clientSideValidationErrors.push(`Username can't be empty`);
  }

  if (password.length == 0) {
    clientSideValidationErrors.push(`Password can't be empty`);
  }

  if (clientSideValidationErrors.length > 0) {
    renderError({ errors: clientSideValidationErrors });
  } else {
    const path = window.location.search;
    $.ajax({
      url: "/login",
      method: "POST",
      data: { username, password, path },
      followRedirects: true,
      xhrFields: { withCredentials: true },
      success: function (data, textStatus, jqXHR) {
        if (jqXHR.status == 200) {
          const path = window.location.search.split("=")[1];
          if(path === undefined){
            window.location.href = "/";
          }else{
            window.location.href = path;
          }
        } else {
        }
      },
      error: function (error) {
        renderError(error.responseJSON);
      },
    });
  }
};