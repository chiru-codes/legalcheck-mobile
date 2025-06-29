import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';

export default function WelcomeScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logoFondo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Bienvenido a LegalCheck</Text>
            <Text style={styles.subtitle}>
                Tu aliado digital para tomar decisiones legales informadas.
            </Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.secondaryButtonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 160,
        height: 160,
        marginBottom: 24,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        color: '#000',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        marginBottom: 40,
    },
    buttonsContainer: {
        width: '100%',
        gap: 16,
    },
    primaryButton: {
        backgroundColor: '#0ea5e9',
        paddingVertical: 14,
        borderRadius: 32,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        borderColor: '#0ea5e9',
        borderWidth: 2,
        paddingVertical: 14,
        borderRadius: 32,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#0ea5e9',
        fontSize: 16,
        fontWeight: '600',
    },
});
