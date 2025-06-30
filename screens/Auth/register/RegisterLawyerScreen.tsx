import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet } from 'react-native';
import { Input } from '../../../components/Auth/inputs/Input';
import { BlueButton } from '../../../components/Auth/buttons/BlueButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Province, LawyerSpecialization } from '../../../types/enums';
import { SPECIALIZATION_LABELS, PROVINCE_LABELS } from '../../../types/labels';
import { RadioButton } from 'react-native-paper';
import { authService } from '../../../services/authService';
import * as SecureStore from 'expo-secure-store';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../types/navigation';
import type { RouteProp } from '@react-navigation/native';

export default function RegisterLawyerScreen() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, 'RegisterLawyer'>>();
    const { firstName, lastName, email, phoneNumber, password } = route.params;

    const [tuitionNumber, setTuitionNumber] = useState('');
    const [yearExperience, setYearExperience] = useState('');
    const [province, setProvince] = useState<Province | ''>('');
    const [specializations, setSpecializations] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const toggleSpecialization = (spec: string) => {
        setSpecializations(prev =>
            prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
        );
    };

    const handleSubmit = async () => {
        if (
            !tuitionNumber.trim() ||
            !yearExperience.trim() ||
            !province ||
            !(province in Province) ||
            specializations.length === 0
        ) {
            Alert.alert('Error', 'Completa todos los campos y selecciona al menos una especialización.');
            return;
        }

        const parsedYearExperience = parseInt(yearExperience, 10);
        if (isNaN(parsedYearExperience) || parsedYearExperience < 0) {
            Alert.alert('Error', 'Años de experiencia debe ser un número válido.');
            return;
        }

        setLoading(true);

        try {
            await authService.register({
                firstName,
                lastName,
                email,
                phoneNumber,
                password,
            });

            const lawyerData = {
                tuitionNumber: tuitionNumber.trim(),
                yearExperience: parsedYearExperience,
                province,
                specializations,
                firstName,
                lastName,
                email,
                phoneNumber,
            };

            console.log('[DEBUG] Guardando datos de abogado:', lawyerData);

            await SecureStore.setItemAsync('pendingLawyerData', JSON.stringify(lawyerData));
            await SecureStore.setItemAsync('pendingLawyerEmail', email);
            await SecureStore.setItemAsync('pendingLawyerPassword', password);

            Alert.alert(
                'Revisa tu correo',
                'Te hemos enviado un enlace para verificar tu cuenta. Después de hacerlo, inicia sesión.'
            );

            navigation.navigate('VerifyEmail');
        } catch (err: any) {
            console.error('[SecureStore ERROR]', err);
            Alert.alert('Error', 'No se pudo guardar la información localmente o falló el registro.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro como Abogado</Text>

            <Input
                placeholder="Número de colegiatura"
                value={tuitionNumber}
                onChangeText={setTuitionNumber}
            />
            <Input
                placeholder="Años de experiencia"
                value={yearExperience}
                onChangeText={setYearExperience}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Provincia</Text>
            <RadioButton.Group onValueChange={value => setProvince(value as Province)} value={province}>
                {Object.entries(PROVINCE_LABELS).map(([key, label]) => (
                    <View key={key} style={styles.radioItem}>
                        <RadioButton.Item label={label} value={key} />
                    </View>
                ))}
            </RadioButton.Group>

            <Text style={styles.label}>Especializaciones</Text>
            {Object.keys(SPECIALIZATION_LABELS).map((spec) => (
                <View key={spec} style={styles.checkboxRow}>
                    <Text
                        onPress={() => toggleSpecialization(spec)}
                        style={[
                            styles.checkboxText,
                            specializations.includes(spec) && styles.checked,
                        ]}
                    >
                        {specializations.includes(spec) ? '☑' : '☐'} {SPECIALIZATION_LABELS[spec as LawyerSpecialization]}
                    </Text>
                </View>
            ))}

            <BlueButton
                title={loading ? 'Guardando...' : 'Guardar y continuar'}
                onPress={handleSubmit}
                loading={loading}
                disabled={loading}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
        flexGrow: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#000',
        marginBottom: 24,
        textAlign: 'center',
    },
    label: {
        fontWeight: '600',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    checkboxRow: {
        marginBottom: 6,
    },
    checkboxText: {
        fontSize: 15,
        color: '#333',
    },
    checked: {
        fontWeight: '700',
        color: '#0ea5e9',
    },
    radioItem: {
        paddingVertical: 2,
        paddingLeft: 0,
        marginBottom: 0,
    },
});
