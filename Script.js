class Calculator{
    constructor(pervoiusOperandTextElement,CurrentOperandTextElement){
        this.pervoiusOperandTextElement = pervoiusOperandTextElement
        this.CurrentOperandTextElement = CurrentOperandTextElement
        this.clear()
    }

    clear(){
        this.CurrentOperand = ''
        this.pervoiusOperand = ''
        this.operation = undefined

    }

    delete(){
        this.CurrentOperand = this.CurrentOperand.toString().slice(0, -1)
    }

    appendnumber(number){
        if (number === "." && this.CurrentOperand.includes(".")) return
        this.CurrentOperand = this.CurrentOperand.toString() + number.toString()
    }

    chooseOperation(operation){
        if(this.CurrentOperand === "") return
        if (this.pervoiusOperand !== ""){
            this.compute()
        }
        this.operation = operation
        this.pervoiusOperand = this.CurrentOperand
        this.CurrentOperand = ""
    }

    compute(){
        let computation
        const prev = parseFloat(this.pervoiusOperand)
        const current = parseFloat(this.CurrentOperand)
        if (isNaN(prev) || isNaN(current))return
        switch (this.operation){
        case "+":
            computation = prev + current
            break

        case "-":
            computation = prev - current
            break

        case "*":
            computation = prev * current
            break

        case "/":
        computation = prev / current
        break

        default:
            return
        }
        this.CurrentOperand = computation
        this.operation = undefined
        this.pervoiusOperand = ""
    }

    getDisplayNumber(number){
        const stringNumber = number.toString()
        const intergerDigits = parseFloat(stringNumber.split(".")[0])
        const deciamlDigits = stringNumber.split(".")[1]
        let interDisplay
        if (isNaN(intergerDigits)){
            interDisplay = ""
        } else{
            interDisplay = intergerDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }
        if (deciamlDigits != null){
            return `${interDisplay}.${deciamlDigits}`
        } else{
            return interDisplay
        }
    }

    updateDisplay(){
        this.CurrentOperandTextElement.innerHTML = this.getDisplayNumber(this.CurrentOperand)
        if(this.operation != null){
            this.pervoiusOperandTextElement.innerHTML= 
            `${ this.getDisplayNumber(this.pervoiusOperand)} ${this.operation}`
        }else{
            this.pervoiusOperandTextElement.innerHTML = ""
        }
        
        
    }

}





const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const deleteButton = document.querySelector("[data-delete]")
const allClearButton = document.querySelector("[data-all-clear]")
const pervoiusOperandTextElement = document.querySelector("[data-Pervious-oprand]")
const CurrentOperandTextElement = document.querySelector("[data-current-oprand]")

const calculator = new Calculator(pervoiusOperandTextElement, CurrentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click",() => {
        calculator.appendnumber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click",() => {
        calculator.chooseOperation(button.innerHTML)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button =>{
    calculator.delete()
    calculator.updateDisplay()
})