(function () {
    "use strict";

    const forms = document.querySelectorAll(".needs-validation");
    const pass1 = document.querySelector("#password");
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
                stdID.setCustomValidity(
                    stdID.value.length <= 9 || stdID.value.length > 12 ? "Please Provide a valid Student ID." : ""
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