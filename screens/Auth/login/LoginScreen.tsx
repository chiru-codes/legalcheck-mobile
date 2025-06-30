import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { BlueButton } from '../../../components/Auth/buttons/BlueButton';
import { GoogleButton } from '../../../components/Auth/buttons/GoogleButton';
import { authService } from '../../../services/authService';
import { useAuth } from '../../../hooks/useAuth';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../types/navigation';

export default function LoginScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { login: loginContext } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setError('Por favor completa todos los campos');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await authService.login({ username, password });
            const token = response.data.token;

            if (!token) {
                setError('No se recibió token');
                return;
            }

            await SecureStore.setItemAsync('token', token);

            const userResponse = await authService.getMe();
            const userData = userResponse.data;

            await SecureStore.setItemAsync('user', JSON.stringify(userData));
            loginContext(userData);

            const rawLawyerData = await SecureStore.getItemAsync('pendingLawyerData');
            if (rawLawyerData) {
                const lawyerData = JSON.parse(rawLawyerData);

                await authService.requestLawyer(lawyerData);

                await SecureStore.deleteItemAsync('pendingLawyerData');
                await SecureStore.deleteItemAsync('pendingLawyerEmail');
                await SecureStore.deleteItemAsync('pendingLawyerPassword');

                Alert.alert('¡Listo!', 'Se completó tu solicitud como abogado :D');
            }

            console.log('Login exitoso!');
            navigation.navigate('Home');
        } catch (err: any) {
            console.error('Login error:', err?.response?.data || err.message);
            setError(err.response?.data?.message || 'Error inesperado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido de vuelta</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Correo electrónico</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    editable={!loading}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    editable={!loading}
                    secureTextEntry
                />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <BlueButton
                title={loading ? 'Cargando...' : 'Iniciar sesión'}
                onPress={handleLogin}
                disabled={loading}
            />

            <View style={styles.separator}>
                <View style={styles.line} />
                <Text style={styles.orText}>o continúa con</Text>
                <View style={styles.line} />
            </View>

            <GoogleButton onPress={() => Alert.alert('Google Login aún no implementado')} />

            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.footer}
            >
                <Text style={styles.footerText}>¿No tienes una cuenta?</Text>
                <Text style={styles.footerLink}>Regístrate</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#000',
        marginBottom: 32,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        color: '#555',
        marginBottom: 4,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#38bdf8',
        paddingVertical: 8,
        paddingHorizontal: 4,
        color: '#000',
    },
    error: {
        color: 'red',
        fontSize: 13,
        marginBottom: 12,
    },
    separator: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 24,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    orText: {
        marginHorizontal: 8,
        color: '#777',
        fontSize: 13,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 28,
    },
    footerText: {
        color: '#777',
        marginRight: 6,
    },
    footerLink: {
        color: '#000',
        fontWeight: '600',
    },
});
