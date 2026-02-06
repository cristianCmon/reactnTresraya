import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { estilos } from '../styles/css.configuracion';


export default function PantallaConfiguracionPartida() {
  const router = useRouter();
  
  // ESTADOS FORMULARIO
  const [nombreJugador, setNombreJugador] = useState('');
  const [dificultad, setDificultad] = useState<'facil' | 'dificil'>('facil');

  const inicioPartida = () => {
    // VALIDACIÓN NOMBRE VACÍO
    if (nombreJugador.trim().length === 0) {
      Alert.alert('¡Te has despistado!', '\nDebes introducir un nombre para iniciar la partida.\n');
      return;
    }

    // NAVEGAMOS A juego.tsx PASANDO PARÁMETROS
    router.push({
      pathname: '/juego',
      params: { 
        jugador: nombreJugador.trim(), 
        dificultad: dificultad 
      }
    });
  };

  return (
    <View style = {estilos.contenedor}>
      <Text style = {estilos.titulo}>Nueva Partida</Text>

      <View style = {estilos.formulario}>
        <Text style = {estilos.etiqueta}>Nombre Jugador:</Text>
        <TextInput
          style = {estilos.input}
          placeholder = "Ej. Pepito"
          placeholderTextColor = "#95a5a6"
          value = {nombreJugador}
          onChangeText = {setNombreJugador} // Actualiza el estado al escribir
          maxLength = {10}
        />

        <Text style = {estilos.etiqueta}>Dificultad:</Text>
        <View style = {estilos.contenedorDificultad}>
          <TouchableOpacity 
            style = {[estilos.botonDificultad, dificultad === 'facil' && estilos.colorFacil]} 
            onPress = {() => setDificultad('facil')}
          >
            <Text style = {estilos.textoDificultad}>Fácil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style = {[estilos.botonDificultad, dificultad === 'dificil' && estilos.colorDificil]} 
            onPress = {() => setDificultad('dificil')}
          >
            <Text style = {estilos.textoDificultad}>Difícil</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style = {estilos.botonEmpezarPartida} onPress = {inicioPartida}>
        <Text style = {estilos.textoBotonEmpezarPartida}>EMPEZAR PARTIDA</Text>
      </TouchableOpacity>

      <TouchableOpacity style = {estilos.botonVolver} onPress = {() => router.replace('/')}>
        <Text style = {estilos.textoBotonVolver}>Volver al menú</Text>
      </TouchableOpacity>
    </View>
  );
}
