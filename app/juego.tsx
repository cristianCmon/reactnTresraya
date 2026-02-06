import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { db } from '../basedatos/basedatos';
import { estilos } from '../styles/css.juego';


// POSIBLES VALORES DE UNA CASILLA
type ValorCasilla = 'X' | 'O' | null;

export default function PantallaPartida() {
  // ACTIVA ENRUTAMIENTO ENTRE PANTALLAS (POSTERIORMENTE VOLVEREMOS AL MENÚ PRINCIPAL)
  const router = useRouter();
  // PARÁMETROS ENVIADOS DESDE configuracion.tsx
  const { jugador, dificultad } = useLocalSearchParams<{ jugador: string; dificultad: 'facil' | 'dificil' }>();

	// ESTADOS DE PARTIDA
  const [tablero, setTablero] = useState<ValorCasilla[]>(Array(9).fill(null));
  const [esTurnoJugador, setEsTurnoJugador] = useState(true); // El jugador siempre es 'X'
  const [finPartida, setFinPartida] = useState(false);
	const [ganadas, setGanadas] = useState(0);
	const [perdidas, setPerdidas] = useState(0);
	const [empatadas, setEmpatadas] = useState(0);
	const [puntuacionActual, setPuntuacionActual] = useState(0);

  // ESTADOS FINALES DE LA PARTIDA
  const ganador = calcularGanador(tablero);
  const esEmpate = !ganador && tablero.every(casilla => casilla !== null);

  // TURNO DE IA CON PEQUEÑO RETARDO 500ms
  useEffect(() => {
    if (!esTurnoJugador && !ganador && !esEmpate) {
      const timer = setTimeout(() => {
        efectuarMovimientoIA();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [esTurnoJugador]); // SE EJECUTA EN CADA CAMBIO DE TURNO

  // CUANDO TERMINA LA PARTIDA SE ACTUALIZA EL MARCADOR
  useEffect(() => {
    if (ganador === 'X') { // JUGADOR (SUMA 50 PTOS FÁCIL, 300 PTOS DIFÍCIL)
			const sumaPuntos = dificultad === 'dificil' ? 300 : 50;
			setGanadas(anterior => anterior + 1);
			setPuntuacionActual(anterior => anterior + sumaPuntos);
      setFinPartida(true);

    } else if (ganador === 'O') { // IA (RESTA 25 PTOS FÁCIL, 150 PTOS DIFÍCIL)
			const restaPuntos = dificultad === 'dificil' ? 150 : 25;
			setPerdidas(anterior => anterior + 1);
			setPuntuacionActual(anterior => Math.max(0, anterior - restaPuntos)) // FILTRO NÚMERO NEGATIVOS
      setFinPartida(true);

    } else if (esEmpate) {
			setEmpatadas(anterior => anterior + 1);
      setFinPartida(true);
    }
  }, [ganador, esEmpate]); // SE EJECUTA CUANDO SE GANA, PIERDE O EMPATA

  // INSERTA REGISTRO DE LA PARTIDA EN BD AL SALIR AL MENÚ PRINCIPAL
  const guardarPuntuacion = () => {
    const dificultadFormat = dificultad === 'dificil' ? 'Difícil' : 'Fácil';

    try {
      db.runSync('INSERT INTO puntuaciones (jugador, dificultad, puntos) VALUES (?, ?, ?)', [jugador, dificultadFormat, puntuacionActual]);

    } catch (error) {
      console.error("ERROR guardado", error);
    }
  };

  // PROCESA LA PULSACIÓN DEL USUARIO EN CASILLA DE TABLERO
  const manejarPulsacion = (index: number) => {
    if (tablero[index] || ganador || !esTurnoJugador) return;

    const nuevoTablero = [...tablero]; // SPREAD OPERATOR PARA COPIAR TABLERO
    nuevoTablero[index] = 'X';
    setTablero(nuevoTablero);
    setEsTurnoJugador(false);
  };

  // LÓGICA DE TOMA DE DECISIONES DE LA IA
  const efectuarMovimientoIA = () => {
    const nuevoTablero = [...tablero];
    let mejorMovimiento: number | undefined = -1;

    if (dificultad === 'dificil') {
      // EN DIFÍCIL INTENTA GANAR O BLOQUEAR AL JUGADOR
      mejorMovimiento = buscarMovimientoGanador(nuevoTablero, 'O') || buscarMovimientoGanador(nuevoTablero, 'X');
    }

    // EN FÁCIL O SIN JUGADA CRÍTICA ELIGE CASILLA AL AZAR
    if (mejorMovimiento === -1 || mejorMovimiento === undefined) {
      const movimientosDisponibles = nuevoTablero
        .map((val, idx) => val === null ? idx : null)
        .filter(val => val !== null);

      if (movimientosDisponibles.length > 0) {
        mejorMovimiento = movimientosDisponibles[Math.floor(Math.random() * movimientosDisponibles.length)] as number;
      }
    }

    if (mejorMovimiento !== undefined && mejorMovimiento !== -1) {
      nuevoTablero[mejorMovimiento] = 'O';
      setTablero(nuevoTablero);
      setEsTurnoJugador(true);
    }
  };

  // ALGORITMO PARA LA IA QUE COMPRUEBA SI HAY JUGADA QUE HAGA 3 EN RAYA
  const buscarMovimientoGanador = (s: ValorCasilla[], p: ValorCasilla): number | undefined => {
    const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (const [a, b, c] of lines) {
      if (s[a] === p && s[b] === p && s[c] === null) return c;
      if (s[a] === p && s[c] === p && s[b] === null) return b;
      if (s[b] === p && s[c] === p && s[a] === null) return a;
    }

    return undefined;
  };

  // ALGORITMO QUE COMPRUEBA SI HAY UN GANADOR
	function calcularGanador(casillas: ValorCasilla[]): ValorCasilla {
		const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

		for (const [a, b, c] of lines) {
			if (casillas[a] && casillas[a] === casillas[b] && casillas[a] === casillas[c]) return casillas[a];
		}

		return null;
	}

  // CREA LA FICHA DE CADA JUGADOR EN LA CASILLA QUE CORRESPONDA
	const renderizarCasilla = (i: number) => (
    <TouchableOpacity key = {i} style = {estilos.casilla} onPress={() => manejarPulsacion(i)}>
      <Text style = {[estilos.textoCasilla, { color: tablero[i] === 'X' ? '#22235B' : '#A1161F' }]}>
        {tablero[i]}
      </Text>
    </TouchableOpacity>
  );

  // CUANDO SE SALE AL MENÚ PRINCIPAL, SI EL JUGADOR TIENE PUNTOS, GUARDA LA PARTIDA
	const manejarSalida = () => {
		if (finPartida && puntuacionActual > 0) {
			guardarPuntuacion();
		}

		router.replace('/')
	}

  return (
    <View style={estilos.contenedor}>
			{/* TRANSICIÓN SUAVE DE PANTALLA DESDE ABAJO*/}
			<Stack.Screen
				options = {{
					animation: 'slide_from_bottom',
					gestureEnabled: false,
				}} 
			/>

			{/* CABECERA CON NOMBRE Y PUNTOS TOTALES */}
			<View style = {estilos.cabecera}>
				<Text style = {estilos.textoJugador}>{jugador}</Text>
				<View style = {estilos.zonaPuntos}>
					<Text style = {estilos.textoZonaPuntos}>{puntuacionActual} puntos</Text>
				</View>
			</View>

			{/* MARCADOR DE VICTORIAS/DERROTAS/EMPATES */}
			<View style = {estilos.contenedorEstadisticas}>
				<View style = {estilos.caja}>
					<Text style = {[estilos.cantidad, {color: '#2ecc71'}]}>{ganadas}</Text>
					<Text style = {estilos.etiqueta}>Victorias</Text>
				</View>
				<View style = {estilos.caja}>
					<Text style = {[estilos.cantidad, {color: '#e74c3c'}]}>{perdidas}</Text>
					<Text style = {estilos.etiqueta}>Derrotas</Text>
				</View>
				<View style = {estilos.caja}>
					<Text style = {[estilos.cantidad, {color: '#bdc3c7'}]}>{empatadas}</Text>
					<Text style = {estilos.etiqueta}>Empates</Text>
				</View>
			</View>

			{/* NIVEL DE DIFICULTAD SELECCIONADO */}
      <Text style = {estilos.dificultadPartida}>{dificultad === 'dificil' ? 'Difícil' : 'Fácil'}</Text>

      {/* TABLERO */}
      <View style = {estilos.tablero}>
        {[0, 1, 2].map(row => (
          <View key = {row} style = {estilos.row}>
            {[0, 1, 2].map(col => renderizarCasilla(row * 3 + col))}
          </View>
        ))}
      </View>

			{/* BOTONERA REINTENTAR/SALIR */}
			<TouchableOpacity
				disabled = {!finPartida}
				style={[
					estilos.botonReiniciarPartida,
					{ opacity: finPartida ? 1 : 0 } // INVISIBLE SI NO SE HA ACABADO
				]} 
				onPress={() => {
					setTablero(Array(9).fill(null));
					setEsTurnoJugador(true);
					setFinPartida(false);
				}}
			>
				<Text style={estilos.textoBotonReiniciarPartida}>ECHAR OTRA</Text>
			</TouchableOpacity>

      <TouchableOpacity style = {estilos.botonSalirPartida} onPress = {manejarSalida}>
        <Text style = {estilos.textoBotonSalirPartida}>{finPartida ? (puntuacionActual > 0 ? "GUARDAR Y SALIR" : "VOLVER AL MENÚ") : "ABANDONAR"}</Text>
      </TouchableOpacity>
    </View>
  );
}
