var errorNoVal,
    errorConfirm,
    errorEngVal,
    errorLeng,
    errorTypeint,
    errorTypedoub,
    errorEmail,
    errorNum,
    errorUrl,
    errorDate,
    Languages;
function Localization(language) {
    switch (language) {
        case "ru":
            errorNoVal = "Это поле необходимо заполнить.";
            errorEngVal = "Это поле необходимо заполнить.(Aнглийскими буквами)";
            errorConfirm = "Пароли не совпадают.";
            errorTypeint = "Должно быть целое число.";
            errorTypedoub = "Должно быть число с плавающей точкой.";
            errorEmail = "Пожалуйста, введите корректный адрес электронной почты.";
            errorNum = "Пожалуйста, вводите только цифры.";
            errorUrl = "Пожалуйста, введите корректный URL.";
            errorDate = "Пожалуйста, введите корректную дату.";
            break;
        case "uk":
            errorNoVal = "Це поле необхідно заповнити.";
            errorEngVal = "Будь ласка, введіть значення (Англійськими літерами).";
            errorConfirm = "Паролі не співпадають.";
            errorTypeint = "Має бути цілим числом.";
            errorTypedoub = "Має бути дробове число.";
            errorEmail = "Будь ласка, введіть коректну адресу електронної пошти.";
            errorNum = "Вводити потрібно лише цифри.";
            errorUrl = "Будь ласка, введіть коректний URL.";
            errorDate = "Будь ласка, введіть коректну дату.";
            break;
        case "en":
            errorNoVal = "Please enter a value.";
            errorEngVal = "Please enter value(English letters).";
            errorConfirm = "Passwords do not match.";
            errorTypeint = "Must be an integer.";
            errorTypedoub = "Must be double.";
            errorEmail = "Is not a valid email.";
            errorNum = "Numbers only, please.";
            errorUrl = "Please enter a valid URL.";
            errorDate = "Please enter a valid date.";
            break;
    }
}
function Validation(o, form, language) {
    Localization(language);
    Languages = language;
    for (var all = 0; all < form[0].children.length; all++) {
        form[0].children[all].classList.remove('has-success');
        form[0].children[all].classList.remove('Success-Val');
        form[0].children[all].classList.remove('has-error');
        form[0].children[all].classList.remove('Error-Val');
    }
    for (var all = 0; all < form[0].children.length; all++) {
        form[0].children[all].classList.add('has-success');
        form[0].children[all].classList.add('Success-Val');
    }
    var InptValid = true;
    $("div").remove(".EroorRow");
    for (var k in o) {
        var input = $(o[k].id),
            val = input.val(),
            formGroup = input.parents('.form-group');
        if (o[k].presence != null) {
            if (o[k].presence == true) {
                if (presence(val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].minlength != null) {
            var num = o[k].minlength;
            if (minlength(val, formGroup, num) == false) {
                InptValid = false;
                continue;
            }
        }
        if (o[k].maxlength != null) {
            var num = o[k].maxlength;
            if (maxlength(val, formGroup, num) == false) {
                InptValid = false;
                continue;
            }
        }
        if (o[k].equalTo != null) {
            var equal = $(o[k].equalTo),
                eqval = equal.val();
            if (equalTo(val, formGroup, eqval) == false) {
                InptValid = false;
                continue;
            }
        }
        if (o[k].isInteger != null) {
            if (o[k].isInteger == true) {
                if (isInteger(val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isDouble != null) {
            if (o[k].isDouble == true) {
                if (isDouble(val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isMail != null) {
            if (o[k].isMail == true) {
                if (isMail(val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isNumber != null) {
            if (o[k].isNumber == true) {
                if (isNumber(val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isUrl != null) {
            if (o[k].isUrl == true) {
                if (isUrl(val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isDate != null) {
            if (o[k].isDate == true) {
                if (isDate(val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isValidInputENg != null) {
            if (o[k].isValidInputENg == true) {
                if (isValidInputENg(val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].greaterThanOrEqualTo != null) {
            var num = o[k].greaterThanOrEqualTo;
            if (greaterThanOrEqualTo(val, formGroup, num) == false) {
                InptValid = false;
                continue;
            }
        }
        if (o[k].lessThanOrEqualTo != null) {
            var num = o[k].lessThanOrEqualTo;
            if (lessThanOrEqualTo(val, formGroup, num) == false) {
                InptValid = false;
                continue;
            }
        }
    }
    return InptValid;
}

//*********************************************************
//    presence validation
//*********************************************************
function presence(val, formGroup) {
    var StatusCurentValidation = true;
    formGroup[0].id = 'thatOne';
    if (val.length === 0) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorNoVal+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}

//*********************************************************
//    minlength validation
//*********************************************************
function minlength(val, formGroup, num) {
    var StatusCurentValidation = true;

    switch (Languages) {
        case "ru":
            errorLeng = "Слишком короткое значени ( минимально " + num + " символов )";
            break;
        case "uk":
            errorLeng = "Будь ласка, введіть не менше " + num + " символів.";
            break;
        case "en":
            errorLeng = "Is too short (minimum is " + num + " characters)";
            break;
    }
    formGroup[0].id = 'thatOne';
    if (val.length < num) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorLeng+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');

    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}

//*********************************************************
//    maxlength validation
//*********************************************************
function maxlength(val, formGroup, num) {
    var StatusCurentValidation = true;

    switch (Languages) {
        case "ru":
            errorLeng = "Слишком длинное значение ( максимально " + num + " символов)";
            break;
        case "uk":
            errorLeng = "Будь ласка, введіть не більше " + num + " символів.";
            break;
        case "en":
            errorLeng = "Is too long (maximum is " + num + " characters)";
            break;
    }
    formGroup[0].id = 'thatOne';
    if (val.length > num) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorLeng+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');

    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}

//*********************************************************
//    equate validation
//*********************************************************
function equalTo(val, formGroup, eqval) {
    var StatusCurentValidation = true;

    formGroup[0].id = 'thatOne';
    if (val != eqval) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorConfirm+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}

//*********************************************************
//    integer validation
//*********************************************************
function isInteger(val, formGroup) {
    var StatusCurentValidation = true;
    formGroup[0].id = 'thatOne';
    if (+val != val || val.indexOf(".") != -1) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorTypeint+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}

//*********************************************************
//    Double validation
//*********************************************************
function isDouble(val, formGroup) {
    var StatusCurentValidation = true;

    formGroup[0].id = 'thatOne';
    if (+val != val || val.indexOf(".") != -1) {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    else {

        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorTypedoub+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}
//*********************************************************
//    Email validation
//*********************************************************
function isMail(val, formGroup) {
    var StatusCurentValidation = true;

    var atpos = val.indexOf("@");
    var dotpos = val.lastIndexOf(".");
    formGroup[0].id = 'thatOne';
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= val.length) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorEmail+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}
//*********************************************************
//    Number validation
//*********************************************************
function isNumber(val, formGroup) {
    var StatusCurentValidation = true;

    formGroup[0].id = 'thatOne';
    if (!/^[0-9]+$/.test(val)) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorNum+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}

//*********************************************************
//    Url validation
//*********************************************************
function isUrl(val, formGroup) {
    var StatusCurentValidation = true;

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    var regexp = new RegExp(expression);
    formGroup[0].id = 'thatOne';
    if (regexp.test(val) == false) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorUrl+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}

//*********************************************************
//    date validation
//*********************************************************
function isDate(val, formGroup) {
    var StatusCurentValidation = true;

    formGroup[0].id = 'thatOne';
    if (/^(?:(0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])[\- \/.](19|20)[0-9]{2})$/.test(val) == false) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorDate+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}


//*********************************************************
//    EditValidation(eng) validation
//*********************************************************
function isValidInputENg(val, formGroup) {
    var StatusCurentValidation = true;

    formGroup[0].id = 'thatOne';
    if (/^[a-zA-Z0-9]+$/.test(val) == false) {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorEngVal+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");

        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}


//*********************************************************
//    greaterThanOrEqualTo(eng) validation
//*********************************************************
function greaterThanOrEqualTo(val, formGroup, num) {
    var StatusCurentValidation = true;

    switch (Languages) {
        case "ru":
            var errorgreater = "Значение больше чем :" + num;
            break;
        case "uk":
            var errorgreater = "Значення більше ніж :" + num;
            break;
        case "en":
            var errorgreater = "The value is greater than :" + num;
            break;
    }
    formGroup[0].id = 'thatOne';
    if (val >= num) {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    else {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorgreater+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}
//*********************************************************
//    lessThanOrEqualTo(eng) validation
//*********************************************************
function lessThanOrEqualTo(val, formGroup, num) {
    var StatusCurentValidation = true;

    switch (Languages) {
        case "ru":
            var errorles = "Значение меньше чем :" + num;
            break;
        case "uk":
            var errorles = "Значення менше ніж :" + num;
            break;
        case "en":
            var errorles = "The value is less than :" + num;
            break;
    }
    formGroup[0].id = 'thatOne';
    if (val <= num) {
        document.getElementById("thatOne").style.height = "50px";
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');

    }
    else {
        var getidval = document.getElementById("thatOne");
        $(`<div class="form-group EroorRow Error-Val">
            <label for="exampleInputEmail1"> `+errorles+` </label>
        </div>`).fadeIn(300).insertAfter("#thatOne");
        document.getElementById("thatOne").style.height = "45px";
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;

    }
    formGroup[0].id = '';
    return StatusCurentValidation;
}