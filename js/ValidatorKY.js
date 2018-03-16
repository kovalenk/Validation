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
var status;
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
status = false;
function Validation(o, form, language) {
    Localization(language);
    Languages = language;
    var Counter = 0;
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
    $("div").remove(".tooltiptext");
    for (var k in o) {
        Counter ++;
        var input = $(o[k].id),
            val = input.val(),
            formGroup = input.parents('.form-group');
        if(status == "false")
        {
            formGroup.append(`<div class="Mtooltip" id="Mytooltip`+Counter+`"></div>`);
            $(o[k].id).detach();
            $('#Mytooltip'+Counter+'').append(input);
        }
        if (o[k].presence != null) {
            if (o[k].presence == true) {
                if (presence(input, val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].minlength != null) {
            var num = o[k].minlength;
            if (minlength(input, val, formGroup, num) == false) {
                InptValid = false;
                continue;
            }
        }
        if (o[k].maxlength != null) {
            var num = o[k].maxlength;
            if (maxlength(input, val, formGroup, num) == false) {
                InptValid = false;
                continue;
            }
        }
        if (o[k].equalTo != null) {
            var equal = $(o[k].equalTo),
                eqval = equal.val();
            if (equalTo(input, val, formGroup, eqval) == false) {
                InptValid = false;
                continue;
            }
        }
        if (o[k].isInteger != null) {
            if (o[k].isInteger == true) {
                if (isInteger(input, val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isDouble != null) {
            if (o[k].isDouble == true) {
                if (isDouble(input, val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isMail != null) {
            if (o[k].isMail == true) {
                if (isMail(input, val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isNumber != null) {
            if (o[k].isNumber == true) {
                if (isNumber(input, val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isUrl != null) {
            if (o[k].isUrl == true) {
                if (isUrl(input, val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isDate != null) {
            if (o[k].isDate == true) {
                if (isDate(input, val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].isValidInputENg != null) {
            if (o[k].isValidInputENg == true) {
                if (isValidInputENg(input, val, formGroup) == false) {
                    InptValid = false;
                    continue;
                }
            }
        }
        if (o[k].greaterThanOrEqualTo != null) {
            var num = o[k].greaterThanOrEqualTo;
            if (greaterThanOrEqualTo(input, val, formGroup, num) == false) {
                InptValid = false;
                continue;
            }
        }
        if (o[k].lessThanOrEqualTo != null) {
            var num = o[k].lessThanOrEqualTo;
            if (lessThanOrEqualTo(input, val, formGroup, num) == false) {
                InptValid = false;
                continue;
            }
        }
    }
    status = true;
    return InptValid;
}

//*********************************************************
//    presence validation
//*********************************************************
function presence(input, val, formGroup) {
    var StatusCurentValidation = true;
    if (val.length === 0) {
        $(`<div class="tooltiptext"><span>`+errorNoVal+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    return StatusCurentValidation;
}

//*********************************************************
//    minlength validation
//*********************************************************
function minlength(input, val, formGroup, num) {
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
    if (val.length < num) {
        $(`<div class="tooltiptext"><span>`+errorLeng+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');

    }
    return StatusCurentValidation;
}

//*********************************************************
//    maxlength validation
//*********************************************************
function maxlength(input, val, formGroup, num) {
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
    if (val.length > num) {
        $(`<div class="tooltiptext"><span>`+errorLeng+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');

    }
    return StatusCurentValidation;
}

//*********************************************************
//    equate validation
//*********************************************************
function equalTo(input, val, formGroup, eqval) {
    var StatusCurentValidation = true;
    if (val != eqval) {
        $(`<div class="tooltiptext"><span>`+errorConfirm+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    return StatusCurentValidation;
}

//*********************************************************
//    integer validation
//*********************************************************
function isInteger(input, val, formGroup) {
    var StatusCurentValidation = true;
    if (+val != val || val.indexOf(".") != -1) {
        $(`<div class="tooltiptext"><span>`+errorTypeint+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    return StatusCurentValidation;
}

//*********************************************************
//    Double validation
//*********************************************************
function isDouble(input, val, formGroup) {
    var StatusCurentValidation = true;
    if (+val != val || val.indexOf(".") != -1) {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    else {
        $(`<div class="tooltiptext"><span>`+errorTypedoub+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    return StatusCurentValidation;
}
//*********************************************************
//    Email validation
//*********************************************************
function isMail(input, val, formGroup) {
    var StatusCurentValidation = true;
    var atpos = val.indexOf("@");
    var dotpos = val.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= val.length) {
        $(`<div class="tooltiptext"><span>`+errorEmail+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    return StatusCurentValidation;
}
//*********************************************************
//    Number validation
//*********************************************************
function isNumber(input, val, formGroup) {
    var StatusCurentValidation = true;
    if (!/^[0-9]+$/.test(val)) {
        $(`<div class="tooltiptext"><span>`+errorNum+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    return StatusCurentValidation;
}

//*********************************************************
//    Url validation
//*********************************************************
function isUrl(input, val, formGroup) {
    var StatusCurentValidation = true;
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    var regexp = new RegExp(expression);
    if (regexp.test(val) == false) {
        $(`<div class="tooltiptext"><span>`+errorUrl+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    return StatusCurentValidation;
}

//*********************************************************
//    date validation
//*********************************************************
function isDate(input, val, formGroup) {
    var StatusCurentValidation = true;
    if (/^(?:(0[1-9]|1[012])[\- \/.](0[1-9]|[12][0-9]|3[01])[\- \/.](19|20)[0-9]{2})$/.test(val) == false) {
        $(`<div class="tooltiptext"><span>`+errorDate+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    return StatusCurentValidation;
}


//*********************************************************
//    EditValidation(eng) validation
//*********************************************************
function isValidInputENg(input, val, formGroup) {
    var StatusCurentValidation = true;
    if (/^[a-zA-Z0-9]+$/.test(val) == false) {
        $(`<div class="tooltiptext"><span>`+errorEngVal+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    else {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    return StatusCurentValidation;
}


//*********************************************************
//    greaterThanOrEqualTo(eng) validation
//*********************************************************
function greaterThanOrEqualTo(input, val, formGroup, num) {
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
    if (val >= num) {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    else {
        $(`<div class="tooltiptext"><span>`+errorgreater+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    return StatusCurentValidation;
}
//*********************************************************
//    lessThanOrEqualTo(eng) validation
//*********************************************************
function lessThanOrEqualTo(input, val, formGroup, num) {
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
    if (val <= num) {
        formGroup.addClass('has-success').removeClass('has-error');
        formGroup.addClass('Success-Val').removeClass('Error-Val');
    }
    else {
        $(`<div class="tooltiptext"><span>`+errorles+`</span></div>`).fadeIn(300).insertAfter(input);
        formGroup.addClass('has-error').removeClass('has-success');
        formGroup.addClass('Error-Val').removeClass('Success-Val');
        StatusCurentValidation = false;
    }
    return StatusCurentValidation;
}