import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';
import { iniciarBD } from '../basedatos/basedatos';


export default function RootLayout() {
  useEffect(() => {
    // INICIA BASE DE DATOS AL INICIAR LA APLICACIÓN
    iniciarBD();
  }, []);

  return (
    // View envolvente para evitar destellos al cargar
    <View style={{ flex: 1, backgroundColor: '#2c3e50' }}>
      <Stack
        screenOptions={{
          headerShown: false,
          // Esto cambia el fondo de la transición de todas las pantallas
          contentStyle: { backgroundColor: '#2c3e50' }, 
          // Opcional: Esto hace que la animación sea un fundido suave en lugar de un deslizamiento
          animation: 'fade', 
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="configuracion" />
        <Stack.Screen name="juego" />
        <Stack.Screen name="puntuaciones" />
      </Stack>
    </View>
  );
}