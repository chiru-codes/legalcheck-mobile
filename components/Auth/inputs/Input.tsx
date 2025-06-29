import React from 'react';
import { TextInput, StyleSheet, TextInputProps } from 'react-native';

interface PrimaryInputProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    disabled?: boolean;
}

export function Input({ value, onChangeText, disabled, ...props }: PrimaryInputProps) {
    return (
        <TextInput
            style={[styles.input, disabled && styles.disabled]}
            value={value}
            onChangeText={onChangeText}
            editable={!disabled}
            {...props}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        width: '100%',
        marginTop: 4,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#0ea5e9',
        color: '#000000',
    },
    disabled: {
        opacity: 0.5,
    },
});
