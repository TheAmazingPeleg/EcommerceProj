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

const changePassword = () => {
  window.location.href = "/user/password";
}

const handleUpdateUser = () => {
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const address = $("#address").val();
    const city = $("#city").val();
    const country = $("#country").val();
    const zip = $("#zip").val();
  
    const clientSideValidationErrors = [];
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
        url: "/user",
        method: "POST",
        data: { firstName, lastName, address, city, country, zip },
        followRedirects: true,
        xhrFields: { withCredentials: true },
        success: function (data, textStatus, jqXHR) {
          if (jqXHR.status == 200) {
            alert("User updated!");
          } else {
          }
        },
        error: function (error) {
          renderError(error.responseJSON);
        },
      });
    }
};

const handleChangePassword = () => {
  const oldPassword = $("#oldPassword").val();
  const password = $("#password").val();
  const clientSideValidationErrors = [];
  if(password.length < 6){
    clientSideValidationErrors.push(`The password must contain atleast 6 letters`);
  }
  if (clientSideValidationErrors.length > 0) {
    renderError({ errors: clientSideValidationErrors });
  } else {
    $.ajax({
      url: "/user/password",
      method: "POST",
      data: { oldPassword, password },
      followRedirects: true,
      xhrFields: { withCredentials: true },
      success: function (data, textStatus, jqXHR) {
        if (jqXHR.status == 200) {
          alert("Password Changed!");
        } else {
        }
      },
      error: function (error) {
        renderError(error.responseJSON);
      },
    });
  }
};