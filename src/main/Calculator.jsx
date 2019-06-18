import React, {Component} from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = { //Estado inicial da calculadora
    displayValue: '0', //Valor que esta sendo exibido no display
    clearDisplay: false, //Propriedade que define se o display precisa ser limpo
    operation: null, //Variavel que armazenara o sinal de operação
    values: [0,0], // armazenando os dois valores que seram digitados para o calculo
    current: 0 //Define o indice do valor que esta sendo manipulado no momento (da variavel values)
}

export default class Calculator extends Component {

    state = {...initialState} //state recebe inicialmente todos atributos e valores da variavel

    constructor(props) { // Garantindo que o this esteja apontando pro escopo correto
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit= this.addDigit.bind(this)
    }

    clearMemory() { //Função para zerar a calculadora
        this.setState({...initialState}) //Quando for acionado, os atributor voltaram para o state inicial
    }

    setOperation(operation) { //Função para colocar a operação (*,-,+,/)
        if(this.state.current === 0) { //Se o indice atual for 0 mudar para 1
            //Para armazenar o proximo valor quando clicar em uma operação sera preciso mudar o valor de current (indice) assim os dois valores estaram dentro do array
            //Sera armazenado o simbolo da operação, e setar o clear para true para limpar o display quando digitar o proximo digito
            this.setState({operation:operation, current:1, clearDisplay: true})
        }else { //Caso o current não seja mais o 0 (Quando se faz varias operações em seguida)
            const equals = operation === '=' //Identificando se a operação é um igual
            const currentOperation = this.state.operation //Pega a operação atual

            const values = [...this.state.values] //Clonando os valores
            switch(currentOperation){ //Calculando o resultado
                case '+':
                    values[0] = values[0] + values[1]
                break
                case '-':
                values[0] = values[0] - values[1]
                break
                case '*':
                values[0] = values[0] * values[1]
                break
                case '/':
                values[0] = values[0] / values[1]
                break
                    
                default:
            }
            values[1] = 0 //Zerando indice 1

            this.setState({
                displayValue: values[0], //Colocando o resultado
                operation: equals ? null : operation, //Se operação for '=' deixar nullo , do contrario colocar operação digitada
                current: equals ? 0 : 1, //Se for clicado '=' a operação terminara, do controrio continuara , assim mantendo o indice 1
                clearDisplay: !equals, //Se for diferente de '=' continuar operação
                values:values //Colocando valores atuais
            })
            console.log(values) //Teste
            console.log(operation) //Teste
        }
    }

    addDigit(n) { //Função para adicionar digitos
        if (n === '.' && this.state.displayValue.includes('.')){ //Se clicar no ponto, e o display se tiver incluido um ponto, não retorna nada
            return
        }

        const clearDisplay = this.state.displayValue === '0' // Identificando se o display vai precisar ser limpo antes de adionar o novo digito (Limpar se o valor atual for 0 (Para não ser digitado varios zeros em seguida '00006') ou o atributo clearDisplay for true)
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue //Se a algumas das situações acima for verdadeira o valor do currentValue(valor corrente) sera vazio, do contrario sera o valor atual do display
        const displayValue = currentValue + n //O novo valor do display, sera o valor corrente mais o novo digito
        this.setState({displayValue: displayValue, clearDisplay: false}) //Atribuindo o novo valor do display, e setando clearDisplay como false ()

        if(n !== '.') { //Se o digito digitado for diferente de ponto
            const i = this.state.current //identificando o indice que esta sendo mexido
            const newValue = parseFloat(displayValue) //convertendo o valor do display em Float
            const values = [...this.state.values]
            values[i] = newValue //Adicionando o nova valor ao array
            this.setState({values : values}) //Adicionando o novo array //ou this.setState({values}) //Pois a variavel tem o mesmo nome do atributo do state
            console.log(values) //Teste
        }
    }

    render(){//renderizando
        return(
            <div className="calculator"> {/* No jsx utilizase className para referenciar uma classe */}
                <Display value = {this.state.displayValue}/> {/*Definindo o value do Display */}
                <Button label="AC" click={this.clearMemory} triple/>
                <Button label="/" click={this.setOperation} operation/> {/* Quando é chamada a função, é passada como parametro automaticamente o valor do botão */}
                <Button label="7" click={this.addDigit}/>
                <Button label="8" click={this.addDigit}/>
                <Button label="9" click={this.addDigit}/>
                <Button label="*" click={this.setOperation} operation/>
                <Button label="4" click={this.addDigit}/>
                <Button label="5" click={this.addDigit}/>
                <Button label="6" click={this.addDigit}/>
                <Button label="-" click={this.setOperation} operation/>
                <Button label="1" click={this.addDigit}/>
                <Button label="2" click={this.addDigit}/>
                <Button label="3" click={this.addDigit}/>
                <Button label="+" click={this.setOperation} operation/>
                <Button label="0" click={this.addDigit} double/>
                <Button label="." click={this.addDigit}/>
                <Button label="=" click={this.setOperation} operation/>
            </div>
        )
    }
}