import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
}

export function BlueButton({ title, onPress, loading, disabled }: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, (disabled || loading) && styles.disabled]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        marginTop: 16,
        backgroundColor: '#0ea5e9',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
    disabled: {
        opacity: 0.5,
    },
});
