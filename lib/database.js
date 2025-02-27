import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

const openDB = () => {
    if (Platform.OS === 'web') {
        console.warn("🚨 SQLite não funciona no Web! Usando dados mockados.");
        return null;
    }
    return SQLite.openDatabase('db.db');
};

// Criar a tabela de utilizadores
export const createTable = () => {
    const db = openDB();
    if (!db) return; // Evita erro no Web

    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE,
                password TEXT
            );`,
            [],
            () => console.log('Tabela de utilizadores criada/verificada'),
            (_, error) => console.error('Erro ao criar/verificar tabela:', error)
        );
    });
};

// Adicionar um novo utilizador (Simula no Web)
export const addUser = (email, password, callback) => {
    const db = openDB();
    if (!db) {
        console.log(`🔹 (Web) Usuário ${email} registrado!`);
        if (callback) callback(true);
        return;
    }

    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO users (email, password) VALUES (?, ?);',
            [email, password],
            (_, results) => {
                console.log('Utilizador adicionado com sucesso:', results);
                if (callback) callback(true);
            },
            (_, error) => {
                console.error('Erro ao adicionar utilizador:', error);
                if (callback) callback(false);
            }
        );
    });
};

// Obter utilizador pelo email (Simula no Web)
export const getUserByEmail = (email, callback) => {
    const db = openDB();
    if (!db) {
        console.log(`🔹 (Web) Procurando usuário ${email}...`);
        callback(null);
        return;
    }

    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM users WHERE email = ?;',
            [email],
            (_, results) => {
                if (results.rows.length > 0) {
                    callback(results.rows.item(0));
                } else {
                    callback(null);
                }
            },
            (_, error) => {
                console.error('Erro ao buscar utilizador:', error);
                callback(null);
            }
        );
    });
};

export default openDB;
