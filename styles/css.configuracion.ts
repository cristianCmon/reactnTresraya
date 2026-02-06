import { StyleSheet } from 'react-native';


export const estilos = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#2c3e50', padding: 20, justifyContent: 'center' },

  titulo: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 40 },

  formulario: { backgroundColor: '#34495e', padding: 20, borderRadius: 15, elevation: 5 },
  etiqueta: { color: '#bdc3c7', fontSize: 16, marginBottom: 10, marginTop: 15 },
  input: { backgroundColor: '#ecf0f1', padding: 12, borderRadius: 8, fontSize: 18, color: '#2c3e50' },
  contenedorDificultad: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  botonDificultad: { flex: 1, padding: 12, marginHorizontal: 5, borderRadius: 8, backgroundColor: '#7f8c8d', alignItems: 'center' },
  colorFacil: { backgroundColor: '#27ae60' },
  colorDificil: { backgroundColor: '#de1d1d' },
  textoDificultad: { color: 'white', fontWeight: 'bold' },

  botonEmpezarPartida: { backgroundColor: '#f1c40f', padding: 18, borderRadius: 30, marginTop: 60, alignItems: 'center' },
  textoBotonEmpezarPartida: { color: '#2c3e50', fontSize: 20, fontWeight: 'bold' },
	botonVolver: { backgroundColor: '#2980b9', padding: 18, borderRadius: 25, marginTop: 60, alignItems: 'center' },
	textoBotonVolver: { color: 'white', fontSize: 20, fontWeight: 'bold' }
});