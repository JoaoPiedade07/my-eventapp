import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({
    name: 'db',
    location: 'default',
    },
    () => console.log('Database opened successfully'),
    error => console.log('Error opening the Database', error)
    );

export default db;

export const createTable = () => {
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, phone TEXT, password TEXT)',
        );
    });
};

export const addUser = (email, password) => {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
        (tx, results) => console.log('Usuário adicionado com sucesso:', results),
        (tx, error) => console.log('Erro ao adicionar usuário:', error)
    });
};

export const getUsers = (email, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM users WHERE email = ?;',
            [email],
            (tx, results) => {
                if (results.rows.length > 0) {
                    callback(results.rows.item(0)); // Retorna o usuário encontrado
                } else {
                    callback(null); // Usuário não encontrado
                }
            },
            (tx, error) => {
                console.error("Erro ao buscar usuário:", error);
                callback(null);
            }
        );
    });
};