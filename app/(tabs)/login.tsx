import { StyleSheet, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <ScrollView>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title">Welcome to the Login Screen!</ThemedText>
            </ThemedView>

            {/* Campos de entrada de dados */}
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
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Botão para o Login */}
                <TouchableOpacity style={styles.button} onPress={() => console.log(`Email: ${email}, Password: ${password}`)}>
                    <Text style={styles.buttonText}>Log In</Text>
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
        paddingHorizontal: 10,
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