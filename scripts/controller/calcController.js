class CalcController {
    constructor() {
        this._lastOperator = "";
        this.lastNumber = "";
        this._operation = [];
        this._displayCalc = document.querySelector(".display");
        this.initialize();
        this.mouseEvents();
        this.KeyboardEvents();
    }

    initialize() {

        this.setLastNumberToDisplay();
    }

    // metodo para múltiplos eventos de mouse
    multipleEvents(element, events, fun) {

        events.split(' ').forEach(event => {

            element.addEventListener(event, fun, false);
        });
    }

    // método de captura dos eventos de mouse
    mouseEvents() {
        let buttons = document.querySelectorAll('.btn');

        buttons.forEach((btn, index) => {

            this.multipleEvents(btn, 'click drag', e => {

                let buttonValue = btn.value;

                this.selectOperation(buttonValue);

            });
        });
    }

    // método de captura de eventos de teclado
    KeyboardEvents() {

        document.addEventListener('keydown', e => {

            switch (e.key) {
                case 'Escape':
                case 'Delete':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearLastEntry();
                    break;
                case '+':
                case '-':
                case '/':
                case '*':
                case '%':
                    this.addOperation(e.key);
                    break;
                case 'Enter':
                    this.calcOperation();
                    break;
                case ".":
                case ",":
                    this.addDot();
                    break;
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    this.addOperation(parseInt(e.key));
                    break;
                case "c":
                    if (e.ctrlKey)
                        break;
            }
        });
    }

    // método para limpar todo o display
    clearAll() {

        this._operation = [];
        this.lastNumber = '';
        this.lastOperation = '';
        this.setLastNumberToDisplay();
    }

    // método para apagar a última entrada no display
    clearLastEntry() {

        this.setLastNumberToDisplay();
    }

    // método para retornar a última operação
    getLastOperation() {

        return this._operation[this._operation.length - 1];
    }

    // método para inserir a última operação
    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;
    }

    // método para verificar o tipo de operação
    operatorVerification(value) {

        return (["+", "-", "*", "/", ".", "%"].indexOf(value) > -1);
    }

    // método para inserir valores no array da memória
    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) {

            this.calcOperation()
        }
    }

    // método para tratar o resultado da operação
    getResult() {

        try {

            return eval(this._operation.join(" "));

        } catch (e) {

            setTimeout(() => {

                this.setError();

            }, 1)
        }
    }

    // método para calcular a operação
    calcOperation() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {

            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if (this._operation.length == 3) {

            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if (last == "%") {

            result /= 100   

            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);
        }

        this.setLastNumberToDisplay();
    }

    // método para verificar o último item iserido
    getLastItem(operatorVerification = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {

            if (this.operatorVerification(this._operation[i]) == operatorVerification) {
                lastItem = this._operation[i];
                break;
            }
        }

        if (!lastItem) {

            lastItem = (operatorVerification) ? this._lastOperator : this.lastNumber;
        }

        return lastItem;
    }

    // método para inseir os números no display
    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalculator = lastNumber

        return this._lastNumber
    }

    // método para adicionar uma operação
    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.operatorVerification(value)) {

                this.setLastOperation(value);

            } else {

                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }

        } else {

            if (this.operatorVerification(value)) {

                this.pushOperation(value);

            } else {

                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);

                this.setLastNumberToDisplay();
            }
        }
    }

    // método para enviar uma mensagem de erro
    setError() {

        this.displayCalc = "Error"
    }

    // método para inserir o ponto na operação
    addDot() {

        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.operatorVerification(lastOperation) || !lastOperation) {
            this.pushOperation("0.");

        } else {
            this.setLastOperation(lastOperation.toString() + ".");
        }
        this.setLastNumberToDisplay();
    }

    selectOperation(value) {

        switch (value) {
            case 'C':
                this.clearAll();
                break;
            case 'CE':
                this.clearLastEntry();
                break;
            case '+':
                this.addOperation('+');
                break;
            case '-':
                this.addOperation('-');
                break;
            case '*':
                this.addOperation('*');
                break;
            case '/':
                this.addOperation('/');
                break;
            case '%':
                this.addOperation('%');
                break;
            case '=':
                this.calcOperation();
                break;
            case ".":
                this.addDot();
                break;
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }

    get displayCalculator() {

        return this._displayCalc.innerHTML;
    }

    set displayCalculator(value) {

        if (value.toString().length > 10) {
            this.setError();
            return false;
        }

        this._displayCalc.innerHTML = value;
    }
}