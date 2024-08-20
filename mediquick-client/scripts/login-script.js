//let usersAPI = "https://proj.ruppin.ac.il/cgroup58/test2/tar1/api/Users"
let usersAPI = localHostAPI + "api/Users"

$("#sign-up-form").submit(suFormSubmit)
$("#login-form").submit(loginFormSubmit)

function suFormSubmit() {
    if(!validateForm()) {
        return false;
    }
    
    newUser = {
        firstName: $("#first-name").val(),
        lastName: $("#last-name").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        phoneNumber: $("#phone-number").val(),
        isActive: true
    }
    ajaxCall("POST", usersAPI, JSON.stringify(newUser), suPostSCB, suPostECB)
    return false;
}

function loginFormSubmit() {
    email = $("#emailText").val();
    email = encodeURIComponent(email);
    password = $("#passwordText").val();


    let usersLoginAPI = usersAPI + "/" + email;
    try {
        ajaxCall("POST", usersLoginAPI, JSON.stringify(password), loginPostSCB, loginPostECB)
    } catch (error) {
        alert(error)
    }
    
    return false;
}



function validateForm() {
    var email = $("#email").val();
    var firstName = $("#first-name").val();
    var lastName = $("#last-name").val();
    var phoneNumber = $("#phone-number").val();
    var password = $("#password").val();
    var confirmPassword = $("#confirm-password").val();

    // Email validation using regex
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
        alert("Invalid email address. Example: ex@123.com");
        return false;
    }

    // First Name and Last Name validation using regex
    var nameRegex = /^[A-Za-z]+$/;
    if (!firstName.match(nameRegex)) {
        alert("Invalid First Name. Name should contain only letters");
        return false;
    }
    if (!lastName.match(nameRegex)) {
        alert("Invalid Last Name. Name should contain only letters");
        return false;
    }

    // Phone Number validation using regex
    var phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
    if (!phoneNumber.match(phoneRegex)) {
        alert("Invalid phone number. Number shuld contain 10 digits only");
        return false;
    }

    // Password validation using regex
    // At least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!password.match(passwordRegex)) {
        alert("Invalid password. Password should cotain at least 1 capital latter, 1 regular latter, 1 number, 1 symbol and atleast 8 characters");
        return false;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return false;
    }

    return true;
}


function suPostSCB(user) {
    executeLogIn(user);
}

function suPostECB(err) {
    alert("ההרשמה נכשלה" + err.status);
}

function loginPostSCB(user) {
    executeLogIn(user);
    // Clear previous error messages
    $("#emailError").text("");
    $("#passwordError").text("");

}

function loginPostECB(err) {
    document.getElementById("passwordError").style.display = "block";
} 

function resetForm() {
    $("#sign-up-form")[0].reset();
}

function executeLogIn(user) {
    if (user) {
        if (user.isActive) {
            userConnected = $("#emailText").val();
            sessionStorage.setItem('user', userConnected);
            sessionStorage.setItem('id', user.userID);
            if (user.isAdmin) {
                window.location.href = "admin.html";
            } else {
                window.location.href = "main-page.html";
            }
        } else {
            alert("This user is not active, Please contact the admin");
        }
    } else {
        alert("Log in failed");
    }
}

function toggleLoginPassword(element) {
    const box = element.parentElement.firstElementChild;
    if (box.type === 'password') {
      box.type = 'text';
      element.src = "./../images/icons/eye-closed.svg";
    } else {
      box.type = 'password';
      element.src = "./../images/icons/eye-open.svg";
    }
  }