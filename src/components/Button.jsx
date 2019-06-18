import React from 'react'
import './Button.css'

export default props => { 
    let classes = 'button' //Verificando se alguns dos atributos abaixo esta no botão, assim adicionando a classe se estiver
    classes += props.operation ? ' operation' : ''
    classes += props.triple ? ' triple' : ''
    classes += props.double ? ' double' : ''

    return(
        <button 
            onClick={e => props.click && props.click(props.label)} //Quando clicar no botão, sera retornado o conteudo do atributo label do botão (props.click e verificado primeiro se esta presente, se não ira gerar um erro)
            className= {classes}>
            {props.label}
        </button>
    )
}

