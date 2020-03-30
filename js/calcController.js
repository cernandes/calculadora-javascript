function key(value) {
    document.form.display.value = document.form.display.value + value;
}

function equal() {
    let exp = document.form.display.value;
    if (exp) {
        document.form.display.value = eval(exp);
    }
}

function clean() {
    document.form.display.value = '';
}

function back() {
    let exp = document.form.display.value;
    document.form.display.value = exp.substring(0, exp.length - 1);
}









