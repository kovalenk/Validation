function Validation_Vg() {
    var language = "en";
    var form = $("#myform");
    var validelem = {
        presence: {
            id: "#presence",
            presence: true
        },
        Password: {
            id: "#Password",
            presence: true
        },
        RePassword: {
            id: "#RePassword",
            equalTo: "#Password"
        },
        Email: {
            id: "#Email",
            isMail: true
        },
        NumberValid: {
            id: "#NumberValid",
            minlength: 5,
            maxlength: 10,
            isNumber:true,
            isInteger: true,
            isDouble: false,
            greaterThanOrEqualTo: 55545,
            lessThanOrEqualTo: 300000
        },
        Date: {
            id: "#Date",
            isDate: true
        },
        Url: {
            id: "#Url",
            isUrl: true
        }
    };
    if (Validation(validelem, form, language) == true) {
        alert("dsdgsdgsdgsd");
        $("div").remove(".EroorRow");
        for (var all = 0; all < form[0].children.length; all++) {
            form[0].children[all].classList.remove('has-success');
            form[0].children[all].classList.remove('Success-Val');
            form[0].children[all].classList.remove('has-error');
            form[0].children[all].classList.remove('Error-Val');
        }
        $("#presence").val("");
        $("#Password").val("");
        $("#RePassword").val("");
        $("#Email").val("");
        $("#NumberValid").val("");
        $("#Date").val("");
        $("#Url").val("");
    }
}