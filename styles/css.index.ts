import { StyleSheet } from 'react-native';


export const estilos = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c3e50' },

  logo: { width: 200, height: 200, marginBottom: 10, resizeMode: 'contain' },

  titulo: { fontSize: 48, fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline', color: 'white', marginBottom: 120 },
  
  boton: { backgroundColor: '#27ae60', padding: 15, borderRadius: 10, width: '80%', marginVertical: 10, textAlign: 'center' },
  botonSecundario: { backgroundColor: '#2980b9' },
  textoBoton: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});