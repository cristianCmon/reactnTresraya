import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { iniciarBD } from '../basedatos/basedatos';


export default function RootLayout() {
  useEffect(() => {
    // EJECUTA UNA ÚNICA VEZ LA BASE DE DATOS (AL INICIAR LA APLICACIÓN)
    iniciarBD();
  }, []);

  return (
    // ESTE View ENVUELVE TODA LA APLICACIÓN
    // TODAS LAS PANTALLAS CON EL MISMO COLOR DE FONDO PARA EVITAR DESTELLOS BLANCOS EN TRANSICIONES
    // Stack AÑADE TRANSICIÓN GLOBAL ENTRE PANTALLAS
    <View style={{ flex: 1, backgroundColor: '#2c3e50' }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#2c3e50' },
          animation: 'fade',
        }}
      >
        {/* REGISTRO DE TODAS LAS VISTAS ALOJADAS EN /app */}
        {/* LA PROPIEDAD name DEBE COINCIDIR EXACTAMENTE CON EL NOMBRE DEL ARCHIVO .tsx */}
        <Stack.Screen name="index" />
        <Stack.Screen name="configuracion" />
        <Stack.Screen name="juego" />
        <Stack.Screen name="puntuaciones" />
      </Stack>
    </View>
  );
}
