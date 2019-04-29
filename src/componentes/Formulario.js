import React, { Component } from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda';
import Error from './Error'

class Formulario extends Component {
    state = { 
        criptomonedas : [],
        moneda : '',
        criptomoneda : '',
        error: false
     }

    async componentWillMount() {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        //const url = 'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=BTC&tsym=USD'
    
        await axios.get(url)
              .then(respuesta => {
                  this.setState({
                      criptomonedas : respuesta.data.Data
                  })
              })

    }

    // se ejecuta cada vez que el usuario elige una opción del select
    obtenerValor = e => {

        const {name, value} = e.target;
        this.setState({
            [name] : value
        })

    }

    // validar que el usuario elige una moneda
    cotizarMoneda = e => {
        e.preventDefault();

        const {moneda, criptomoneda } = this.state;

        // validar que se haya seleccionado algo
        if(moneda === '' || criptomoneda === '') {
            this.setState({
               error: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error: false
                    })
                }, 3000);
            })

            return;

        }

        //crear objeto
        const cotizacion = {
            moneda,
            criptomoneda
        }


        //enviar datos al componente App
        this.props.cotizarCriptomoneda(cotizacion);
    }


    render() { 

        const mensaje = (this.state.error) ? <Error mensaje="Ambos campos son obligatorios" /> : '';


        
        return (

            <form
                onSubmit ={this.cotizarMoneda}
            >
                {mensaje}
                <div className="row">
                    <label>Elige tu moneda</label>
                    <select
                        onChange={this.obtenerValor}
                        name="moneda"
                        className="u-full-width">
                            <option value="">Elige tu moneda</option>
                            <option value="EUR">Euros</option>
                            <option value="USD">Dolar Estadounidense</option>
                            <option value="GBP">Libras</option>
                            
                    </select>
                </div>

                <div className="row">
                <div>
                    <label>Elige tu criptomoneda</label>
                    <select
                        onChange={this.obtenerValor}
                        name="criptomoneda" 
                        className="u-full-width">
                        <option value="">Elige tu moneda</option>
                        {Object.keys(this.state.criptomonedas).map(key => (
                            <Criptomoneda
                                key={key}
                                criptomoneda={this.state.criptomonedas[key]}
                            />
                        ))}



                    </select>
                </div>
                </div>
                <input className="button-primary u-full-width" type="submit" value="Cotizar" />
            </form>




          );
    }
}
 
export default Formulario;