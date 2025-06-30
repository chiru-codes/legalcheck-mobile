import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlueButton } from '../../../components/Auth/buttons/BlueButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../types/navigation';

export default function VerifyEmailScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Correo verificado con éxito!</Text>
            <Text style={styles.text}>
                Ahora puedes iniciar sesión desde la app.
            </Text>

            <BlueButton
                title="Ir a Iniciar Sesión"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#007AFF',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 24,
    },
});
