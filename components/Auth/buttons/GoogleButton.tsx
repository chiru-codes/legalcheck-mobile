import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

interface GoogleButtonProps {
    onPress: () => void;
}

export function GoogleButton({ onPress }: GoogleButtonProps) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
            <Image
                source={{
                    uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png',
                }}
                style={styles.logo}
            />
            <Text style={styles.text}>Continuar con Google</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 999,
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        justifyContent: 'center',
        gap: 8,
    },
    logo: {
        width: 20,
        height: 20,
    },
    text: {
        fontWeight: '600',
        color: '#000',
        fontSize: 14,
    },
});
