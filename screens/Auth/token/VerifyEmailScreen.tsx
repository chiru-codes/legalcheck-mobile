import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlueButton } from '../../../components/Auth/buttons/BlueButton';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../types/navigation';
import * as SecureStore from 'expo-secure-store';
import { authService } from '../../../services/authService';

export default function VerifyEmailScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handlePendingLawyerData = async () => {
            setLoading(true);

            try {
                const lawyerJson = await SecureStore.getItemAsync('pendingLawyerData');
                if (lawyerJson) {
                    const lawyerData = JSON.parse(lawyerJson);
                    const me = await authService.getMe();
                    const userId = me.data.id;

                    await authService.updateLawyer(userId, {
                        tuitionNumber: lawyerData.tuitionNumber,
                        yearExperience: Number(lawyerData.yearExperience),
                        province: lawyerData.province,
                        specializations: lawyerData.specializations,
                        firstName: lawyerData.firstName,
                        lastName: lawyerData.lastName,
                        email: lawyerData.email,
                        phoneNumber: lawyerData.phoneNumber,
                    });

                    await SecureStore.deleteItemAsync('pendingLawyerData');
                    Alert.alert('Rol abogado registrado', 'Se completó exitosamente tu registro como abogado.');
                }
            } catch (err: any) {
                console.error('Error al completar registro de abogado:', err);
                Alert.alert(
                    'Error',
                    'Tu cuenta fue verificada, pero no se pudo completar tu registro como abogado.'
                );
            } finally {
                setLoading(false);
            }
        };

        handlePendingLawyerData();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Correo verificado con éxito!</Text>
            <Text style={styles.text}>Ahora puedes iniciar sesión.</Text>

            <BlueButton
                title={loading ? 'Cargando...' : 'Ir a Iniciar Sesión'}
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
                loading={loading}
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
