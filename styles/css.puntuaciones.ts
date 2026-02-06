import { StyleSheet } from 'react-native';


export const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#2c3e50', padding: 20, paddingTop: 60 },

  titulo: { fontSize: 30, fontWeight: 'bold', color: '#f1c40f', textAlign: 'center', marginBottom: 30 },

  lista: { width: '100%' },
  registro: { flexDirection: 'row', backgroundColor: '#34495e', padding: 15, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  puesto: { color: '#bdc3c7', fontSize: 18, fontWeight: 'bold', width: 35 },
  nombreJugador: { color: 'white', fontSize: 18, flex: 1 },
	nivelDificultad: { color: 'white', fontSize: 18, fontStyle: 'italic', flex: 1 },
  puntuacionJugador: { color: '#2ecc71', fontSize: 18, fontWeight: 'bold' },

  contenedorVacio: { flex: 1, justifyContent: 'center' },
  textoVacio: { color: '#bdc3c7', textAlign: 'center', fontSize: 18 },
	
  botonVolver: { backgroundColor: '#e74c3c', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20,marginBottom: 20},
  textoBotonVolver: { color: 'white', fontWeight: 'bold', fontSize: 16 }
});