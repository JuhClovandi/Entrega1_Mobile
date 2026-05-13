import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logoText}>ServLink</Text>
        <Text style={styles.subtitle}>Conectando você{'\n'}ao serviço certo</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoleScreen')}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 40 },
  content: { alignItems: 'center', marginTop: 40 },
  logoText: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 20, textAlign: 'center', color: '#666', marginBottom: 40 },
  buttons: { width: '100%', paddingHorizontal: 40, gap: 15 },
  button: { backgroundColor: '#A0A4AB', borderRadius: 25, height: 50, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#333', fontSize: 16 },
  footer: { fontSize: 10, color: '#666' }
});