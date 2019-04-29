import React, { Component } from 'react';

const Resultado = ({resultado}) => {

   //console.log(resultado);
   if(Object.entries(resultado).length === 0) return null;
   
   return (  
        <div className="resultado">  
            <h2>Resultado</h2>
            <p className="precio">El precio es de: {resultado.PRICE}</p>

            <p>Precio más alto del día: {resultado.HIGHDAY}</p>
            <p>Precio más bajo del día: {resultado.LOWDAY}</p>
            <p>Variación últimas 24 horas: {resultado.CHANGEPCT24HOUR}%</p>
            <p>Última actualización: {resultado.LASTUPDATE}</p>
            <p> &nbsp; </p>
            <p> &nbsp; </p>
        </div>
    );
}
 
export default Resultado;