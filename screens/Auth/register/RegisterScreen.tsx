import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Switch } from 'react-native';
import { Input } from '../../../components/Auth/inputs/Input';
import { BlueButton } from '../../../components/Auth/buttons/BlueButton';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../types/navigation';
import { authService } from '../../../services/authService';
import * as SecureStore from 'expo-secure-store';

export default function RegisterScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isLawyer, setIsLawyer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleRegister = async () => {
        if (!firstName || !lastName || !email || !phoneNumber || !password) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await authService.register({
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
            });

            const { token } = response.data;

            if (token) {
                await SecureStore.setItemAsync('token', token);
                Alert.alert('¡Registro exitoso!', 'Revisa tu correo para verificar tu cuenta');
                navigation.navigate('Login');
            } else {
                setError('No se recibió token');
            }
        } catch (err: any) {
            console.error(err);
            Alert.alert('Error', err.response?.data?.message || 'No se pudo completar el registro');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Crea una cuenta</Text>

            <Input
                placeholder="Nombre"
                value={firstName}
                onChangeText={setFirstName}
            />
            <Input
                placeholder="Apellido"
                value={lastName}
                onChangeText={setLastName}
            />
            <Input
                placeholder="Correo electrónico"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <Input
                placeholder="Teléfono"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            <Input
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <Text style={{ marginRight: 10 }}>¿Eres abogado?</Text>
                <Switch value={isLawyer} onValueChange={setIsLawyer} />
            </View>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <BlueButton
                title={loading ? 'Cargando...' : 'Registrarse'}
                onPress={() => {
                    if (isLawyer) {
                        navigation.navigate('RegisterLawyer', {
                            firstName,
                            lastName,
                            email,
                            phoneNumber,
                            password,
                        });
                    } else {
                        handleRegister();
                    }
                }}
                loading={loading}
                disabled={loading}
            />

            <View style={styles.loginRedirect}>
                <Text style={styles.redirectText}>¿Ya tienes una cuenta?</Text>
                <Text
                    style={styles.redirectLink}
                    onPress={() => navigation.navigate('Login')}
                >
                    Inicia sesión
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        marginBottom: 24,
        color: '#000',
        textAlign: 'center',
    },
    loginRedirect: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    redirectText: {
        color: '#666',
        marginRight: 6,
    },
    redirectLink: {
        color: '#000',
        fontWeight: '600',
        textDecorationLine: 'underline',
    },
    error: {
        color: 'red',
        fontSize: 13,
        marginBottom: 12,
        textAlign: 'center',
    },
});
