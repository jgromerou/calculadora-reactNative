import { useRef, useState } from 'react';

export const useCalculadora = () => {
  const [numeroAnterior, setNumeroAnterior] = useState('0');
  const [numero, setNumero] = useState('100');

  const operadores = {
    sumar: '+',
    restar: '-',
    multiplicar: 'X',
    dividir: '/',
  };

  const ultimaOperacion = useRef();

  const limpiar = () => {
    setNumero('0');
    setNumeroAnterior('0');
  };

  const armarNumero = (numeroTexto) => {
    //Validaciones para armar el numero resultado
    //No aceptar doble punto
    if (numero.includes('.') && numeroTexto === '.') {
      return;
    }

    if (numero.startsWith('0') || numero.startsWith('-0')) {
      //Punto decimal
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);

        //Evaluar si es otro cero y hay un punto
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);

        //Evaluar si es != de cero y no tiene un punto
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);

        //Evitar el 000000.0
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const positivoNegativo = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  const btnDelete = () => {
    let negativo = '';
    let numeroTemp = numero;
    if (numero.includes('-')) {
      negativo = '-';
      numeroTemp = numero.substring(1);
    }

    if (numeroTemp.length > 1) {
      setNumero(negativo + numeroTemp.slice(0, -1));
    } else {
      setNumero('0');
    }
  };

  const cambiarNumeroPorAnterior = () => {
    if (numero.endsWith('.')) {
      setNumeroAnterior(numero.slice(0, -1));
    } else {
      setNumeroAnterior(numero);
    }
    setNumero('0');
  };

  const btnOperacion = (operador) => {
    cambiarNumeroPorAnterior();

    switch (operador) {
      case '/':
        ultimaOperacion.current = operadores.dividir;
        break;
      case 'X':
        ultimaOperacion.current = operadores.multiplicar;
        break;
      case '-':
        ultimaOperacion.current = operadores.restar;
        break;
      case '+':
        ultimaOperacion.current = operadores.sumar;
        break;
    }
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(numeroAnterior);

    switch (ultimaOperacion.current) {
      case operadores.sumar:
        setNumero(`${num1 + num2}`);
        break;

      case operadores.restar:
        setNumero(`${num2 - num1}`);
        break;

      case operadores.multiplicar:
        setNumero(`${num1 * num2}`);
        break;

      case operadores.dividir:
        setNumero(`${num2 / num1}`);
        break;

      default:
        break;
    }

    setNumeroAnterior('0');
  };

  return {
    numeroAnterior,
    numero,
    limpiar,
    positivoNegativo,
    btnDelete,
    btnOperacion,
    armarNumero,
    calcular,
  };
};
