(function () {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");
  const pass1 = document.querySelector("#password");
  const pass2 = document.querySelector("#confirmPassword");
  const stdID = document.querySelector("#studentID");
  Array.from(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        pass1.setCustomValidity(
          pass1.value.length < 6
            ? "Password must be at least 6 characters long"
            : ""
        );
        pass2.setCustomValidity(
          pass1.value !== pass2.value || pass2.value.length < 6
            ? "Passwords do not match."
            : ""
        );
        stdID.setCustomValidity(
          stdID.value.length <= 9 ? "Please Provide a valid Student ID." : ""
        );
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// const vv = document.querySelectorAll(".needs-validation");
// const pass1 = document.querySelector("#password");
// const pass2 = document.querySelector("#confirmPassword");

// pass1.addEventListener("blur", function () {
//   pass1.setCustomValidity(
//     pass1.value.length < 6 ? "Password must be at least 6 characters long" : ""
//   );
// });

// pass2.addEventListener("blur", function () {
//   pass2.setCustomValidity(
//     pass1.value != pass2.value ? "Passwords do not match." : ""
//   );
// });

// confirmPassword.setCustomValidity(password.value != confirmPassword.value ? "Passwords do not match." : "")

//   function passwordMatch(event) {
//     console.log(pass1.value);
//     console.log(pass2.value);
//     if (pass1.value !== pass2.value) {
//       event.preventDefault();
//       event.stopPropagation();
//     } else form.classList.add("was-validated");
//   }

// oninput='confirmPassword.setCustomValidity(password.value != confirmPassword.value ? "Passwords do not match." : "")'

// if (myInput.value.length >= 8) {
//   length.classList.remove("invalid");
//   length.classList.add("valid");
// } else {
//   length.classList.remove("valid");
//   length.classList.add("invalid");
// }
