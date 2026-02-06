import * as SQLite from 'expo-sqlite';


// INICIAMOS Y/O CREAMOS LA BASE DE DATOS
export const db = SQLite.openDatabaseSync('tresraya.db');
export const iniciarBD = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS puntuaciones (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jugador TEXT NOT NULL,
      dificultad TEXT NOT NULL,
      puntos INTEGER NOT NULL,
      fecha TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

// MODELO DE LA BASE DE DATOS
export interface Puntuacion {
  id: number;
  jugador: string;
  dificultad: string;
  puntos: number;
  fecha: string;
}

// FUNCIÓN QUE REALIZA CONSULTA PARA OBTENER TOP-10
export const getMejoresPuntuaciones = (): Puntuacion[] => {
  return db.getAllSync<Puntuacion>(
    'SELECT * FROM puntuaciones ORDER BY puntos DESC LIMIT 10'
  );
};
