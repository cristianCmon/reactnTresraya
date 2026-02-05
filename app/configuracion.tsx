import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

const estilos = StyleSheet.create({
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
