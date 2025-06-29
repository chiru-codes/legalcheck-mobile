import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function HomeScreen() {
    const { user, logout } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HolaaaAoA, {user?.firstName || 'Usuario'}</Text>
            <Text style={styles.subtitle}>Bienvenido a tu panel de LegalCheck</Text>

            <TouchableOpacity style={styles.secondaryButton} onPress={logout}>
                <Text style={styles.secondaryButtonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#444',
        marginBottom: 32,
    },
    primaryButton: {
        backgroundColor: '#0ea5e9',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 32,
        marginBottom: 16,
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
        paddingHorizontal: 32,
        borderRadius: 32,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#0ea5e9',
        fontSize: 16,
        fontWeight: '600',
    },
});
