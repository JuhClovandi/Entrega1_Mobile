import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.logoText}>ServLink</Text>
      <Text style={styles.title}>Recuperação{'\n'}de senha</Text>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail:</Text>
        <TextInput style={styles.input} keyboardType="email-address" />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', padding: 20 },
  logoText: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 40, marginBottom: 40 },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  form: { paddingHorizontal: 10 },
  label: { fontSize: 12, color: '#666', marginBottom: 5 },
  input: { backgroundColor: '#A0A4AB', borderRadius: 20, height: 45, marginBottom: 30 },
  button: { backgroundColor: '#A0A4AB', borderRadius: 25, height: 45, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '50%' },
  buttonText: { fontSize: 16 }
});