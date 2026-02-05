import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../basedatos/basedatos';

type ValorCasilla = 'X' | 'O' | null;

export default function PantallaPartida() {
  const router = useRouter();
  // PARÁMETROS ENVIADOS DESDE configuracion.tsx
  const { jugador, dificultad } = useLocalSearchParams<{ jugador: string; dificultad: 'facil' | 'dificil' }>();

	// ESTADOS
  const [tablero, setTablero] = useState<ValorCasilla[]>(Array(9).fill(null));
  const [esTurnoJugador, setEsTurnoJugador] = useState(true); // El jugador siempre es 'X'
  const [finPartida, setFinPartida] = useState(false);
	const [ganadas, setGanadas] = useState(0);
	const [perdidas, setPerdidas] = useState(0);
	const [empatadas, setEmpatadas] = useState(0);
	const [puntuacionActual, setPuntuacionActual] = useState(0);

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
  }, [esTurnoJugador]);

  // CUANDO TERMINA LA PARTIDA SALTA UN MODAL (Alert)
  useEffect(() => {
    if (ganador === 'X') {
      // Alert.alert('¡Victoria!', `\nEnhorabuena ${jugador}, has ganado este duelo.\n`, [{ text: 'OK' }]);
			const sumaPuntos = dificultad === 'dificil' ? 300 : 50;
			setGanadas(anterior => anterior + 1);
			setPuntuacionActual(anterior => anterior + sumaPuntos);
			// SI SE GANA AUTOMÁTICAMENTE GUARDA LA PUNTUACIÓN
      // guardarPuntuacion();
      setFinPartida(true);

    } else if (ganador === 'O') {
      // Alert.alert('Derrota', '\nHas sido derrotado por la máquina, ¡espabila!\n', [{ text: 'OK' }]);
			const restaPuntos = dificultad === 'dificil' ? 150 : 25;
			setPerdidas(anterior => anterior + 1);
			setPuntuacionActual(anterior => Math.max(0, anterior - restaPuntos))
      setFinPartida(true);

    } else if (esEmpate) {
      // Alert.alert('Tablas', '\nNi ganador ni perdedor, esto es un empate.\n', [{ text: 'OK' }]);
			setEmpatadas(anterior => anterior + 1);
      setFinPartida(true);
    }
  }, [ganador, esEmpate]);

  const guardarPuntuacion = () => {
    const dificultadFormat = dificultad === 'dificil' ? 'Difícil' : 'Fácil';

    try {
      db.runSync('INSERT INTO puntuaciones (jugador, dificultad, puntos) VALUES (?, ?, ?)', [jugador, dificultadFormat, puntuacionActual]);

    } catch (error) {
      console.error("ERROR guardado", error);
    }
  };

  const manejarPulsacion = (index: number) => {
    if (tablero[index] || ganador || !esTurnoJugador) return;

    const nuevoTablero = [...tablero];
    nuevoTablero[index] = 'X';
    setTablero(nuevoTablero);
    setEsTurnoJugador(false);
  };

  const efectuarMovimientoIA = () => {
    const nuevoTablero = [...tablero];
    let mejorMovimiento: number | undefined = -1;

    if (dificultad === 'dificil') {
      // IA Difícil: Primero intenta ganar, luego intenta bloquear al jugador
      mejorMovimiento = buscarMovimientoGanador(nuevoTablero, 'O') || buscarMovimientoGanador(nuevoTablero, 'X');
    }

    // Si no hay movimiento crítico o nivel fácil, elige uno aleatorio
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

  const buscarMovimientoGanador = (s: ValorCasilla[], p: ValorCasilla): number | undefined => {
    const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

    for (const [a, b, c] of lines) {
      if (s[a] === p && s[b] === p && s[c] === null) return c;
      if (s[a] === p && s[c] === p && s[b] === null) return b;
      if (s[b] === p && s[c] === p && s[a] === null) return a;
    }

    return undefined;
  };

	function calcularGanador(casillas: ValorCasilla[]): ValorCasilla {
		const lines = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

		for (const [a, b, c] of lines) {
			if (casillas[a] && casillas[a] === casillas[b] && casillas[a] === casillas[c]) return casillas[a];
		}

		return null;
	}

	const renderizarCasilla = (i: number) => (
    <TouchableOpacity key = {i} style = {estilos.casilla} onPress={() => manejarPulsacion(i)}>
      <Text style = {[estilos.textoCasilla, { color: tablero[i] === 'X' ? '#22235B' : '#A1161F' }]}>
        {tablero[i]}
      </Text>
    </TouchableOpacity>
  );

	const manejarSalida = () => {
		if (finPartida && puntuacionActual > 0) {
			guardarPuntuacion();
		}

		router.replace('/')
	}

  return (
    <View style={estilos.contenedor}>
			{/* TRANSICIÓN SUAVE DESDE ABAJO*/}
			<Stack.Screen
				options = {{
					animation: 'slide_from_bottom',
					gestureEnabled: false,
				}} 
			/>

			{/* Cabecera con Nombre y Puntos Totales */}
			<View style = {estilos.cabecera}>
				<Text style = {estilos.textoJugador}>{jugador}</Text>
				<View style = {estilos.zonaPuntos}>
					<Text style = {estilos.textoZonaPuntos}>{puntuacionActual} puntos</Text>
				</View>
			</View>

			{/* Marcador de Victorias/Derrotas/Empates */}
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

			{/* INFO */}
      {/* <Text style = {estilos.participantes}>{jugador} (X) vs IA (O)</Text> */}
      <Text style = {estilos.dificultadPartida}>{dificultad === 'dificil' ? 'Difícil' : 'Fácil'}</Text>

      {/* TABLERO */}
      <View style = {estilos.tablero}>
        {[0, 1, 2].map(row => (
          <View key = {row} style = {estilos.row}>
            {[0, 1, 2].map(col => renderizarCasilla(row * 3 + col))}
          </View>
        ))}
      </View>

			{/* BOTONERA */}
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

const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#2c3e50', alignItems: 'center', justifyContent: 'center' },

	cabecera: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '80%', marginBottom: 20 },
  textoJugador: { fontSize: 24, color: 'white', fontWeight: 'bold' },
  zonaPuntos: { backgroundColor: '#f1c40f', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15 },
  textoZonaPuntos: { color: '#2c3e50', fontWeight: 'bold', fontSize: 18 },

  contenedorEstadisticas: { flexDirection: 'row', backgroundColor: '#34495e', borderRadius: 15, padding: 15, width: '90%', justifyContent: 'space-around', marginBottom: 15 },
  caja: { alignItems: 'center' },
  cantidad: { fontSize: 22, fontWeight: 'bold' },
  etiqueta: { color: '#bdc3c7', fontSize: 12, marginTop: 2 },
  // participantes: { fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 5 },

  dificultadPartida: { fontSize: 18, fontFamily: 'monospace', color: '#bdc3c7', marginBottom: 15 },
  tablero: { backgroundColor: '#B2A47E', padding: 10, borderRadius: 15 },
  row: { flexDirection: 'row' },
  casilla: { width: 90, height: 90, backgroundColor: '#DECD9C', margin: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 12 },
  textoCasilla: { fontSize: 60, fontWeight: 'bold', fontFamily: 'sans-serif' },

	botonReiniciarPartida: { marginTop: 30, backgroundColor: '#27ae60', paddingHorizontal: 40, paddingVertical: 15, borderRadius: 25, elevation: 5 },
  textoBotonReiniciarPartida: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  botonSalirPartida: { marginTop: 40, backgroundColor: '#c0392b', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 20 },
  textoBotonSalirPartida: { color: 'white', fontWeight: 'bold' }
});
