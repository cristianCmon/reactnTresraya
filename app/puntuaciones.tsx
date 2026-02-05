import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getMejoresPuntuaciones, Puntuacion } from '../basedatos/basedatos';

export default function PantallaPuntuaciones() {
  const router = useRouter();
  const [puntuaciones, setPuntuaciones] = useState<Puntuacion[]>([]);

  // CADA VEZ QUE ESTA VISTA GANA EL FOCO HACE LA PETICIÓN A LA BD
  useFocusEffect(
    useCallback(() => {
      const data = getMejoresPuntuaciones();
      setPuntuaciones(data);
    }, [])
  );

  // Componente para cada fila de la lista
  const renderizarRegistro = ({ item, index }: { item: Puntuacion; index: number }) => (
    <View style = {estilos.registro}>
      <Text style = {estilos.puesto}>{index + 1}.</Text>
      <Text style = {estilos.nombreJugador}>{item.jugador}</Text>
			<Text style = {estilos.nivelDificultad}>{item.dificultad}</Text>
      <Text style = {estilos.puntuacionJugador}>{item.puntos} ptos</Text>
    </View>
  );

  return (
    <View style = {estilos.contenedor}>
      <Text style = {estilos.titulo}>🏆  Top 10  🏆</Text>

      {puntuaciones.length > 0 ? (
        <FlatList
          data = {puntuaciones}
          renderItem = {renderizarRegistro}
          keyExtractor = {(item) => item.id.toString()}
          style = {estilos.lista}
        />
      ) : (
        <View style = {estilos.contenedorVacio}>
          <Text style = {estilos.textoVacio}>Aún no hay puntuaciones 🫢.</Text>
        </View>
      )}

      {/* <TouchableOpacity style={estilos.backButton} onPress={() => router.back()}> */}
      <TouchableOpacity style = {estilos.botonVolver} onPress={() => router.replace('/')}>
        <Text style = {estilos.textoBotonVolver}>VOLVER</Text>
      </TouchableOpacity>
    </View>
  );
}

const estilos = StyleSheet.create({
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
