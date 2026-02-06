import { StyleSheet } from 'react-native';


export const estilos = StyleSheet.create({
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