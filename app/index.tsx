import { Link } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function MenuPrincipal() {
  return (
    <View style = {estilos.contenedor}>
      {/* LOGO DEL JUEGO */}
      <Image 
        source = {require('../assets/images/tictactoe2.png')}
        style = {estilos.logo} 
      />

      {/* TÍTULO */}
      <Text style = {estilos.titulo}>3 en Raya</Text>

      {/* BOTÓN NUEVA PARTIDA */}
      <Link href = "/configuracion" style = {estilos.boton}>
        <Text style = {estilos.textoBoton}>NUEVA PARTIDA</Text>
      </Link>

      {/* BOTÓN PUNTUACIONES */}
      <Link href = "/puntuaciones" style = {[estilos.boton, estilos.botonSecundario]}>
        <Text style = {estilos.textoBoton}>PUNTUACIONES</Text>
      </Link>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c3e50' },

  logo: { width: 200, height: 200, marginBottom: 10, resizeMode: 'contain' },

  titulo: { fontSize: 48, fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline', color: 'white', marginBottom: 120 },
  
  boton: { backgroundColor: '#27ae60', padding: 15, borderRadius: 10, width: '80%', marginVertical: 10, textAlign: 'center' },
  botonSecundario: { backgroundColor: '#2980b9' },
  textoBoton: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});
