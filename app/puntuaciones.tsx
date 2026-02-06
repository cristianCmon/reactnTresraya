import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { getMejoresPuntuaciones, Puntuacion } from '../basedatos/basedatos';
import { estilos } from '../styles/css.puntuaciones';


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
