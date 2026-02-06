import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { estilos } from '../styles/css.index';


export default function MenuPrincipal() {
  return (
    <View style = {estilos.contenedor}>
      {/* LOGO DE LA APLICACIÓN */}
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
