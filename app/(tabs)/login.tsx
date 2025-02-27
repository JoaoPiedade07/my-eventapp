import { StyleSheet, TextInput, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { createTable, getUserByEmail } from '@/lib/database';

interface User {
    id: number;
    email: string;
    password: string;
}

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        console.log("📌 Criando/verificando tabela de usuários...");
        createTable();
    }, []);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        console.log("🔍 Buscando usuário com email:", email);
        getUserByEmail(email, (user: User | null) => {
            if (user) {
                console.log("✅ Usuário encontrado:", user);
                if (user.password === password) {
                    Alert.alert('✅ Login realizado com sucesso!');
                } else {
                    Alert.alert('❌ Senha incorreta.');
                }
            } else {
                console.log("⚠️ Usuário não encontrado.");
                Alert.alert('❌ Usuário não encontrado.');
            }
        });
    };

    return (
        <ScrollView keyboardShouldPersistTaps="handled">
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Bem-vindo ao Login!</ThemedText>
            </ThemedView>

            <ThemedView style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginVertical: 20,
        justifyContent: 'center',
    },
    formContainer: {
        padding: 16,
        gap: 12,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        borderRadius: 8,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
