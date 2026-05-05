import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import ServLinkLogo from './components/ServLinkLogo';

type Props = {
  navigation: any;
};

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ServLinkLogo size="large" />
        <Text style={styles.subtitle}>Conectando você ao serviço certo</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('UserType')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>Criar conta</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryButtonText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 64,
    lineHeight: 24,
  },
  buttonContainer: { width: '100%', gap: 14 },
  button: {
    padding: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#4A90D9',
    shadowColor: '#4A90D9',
  },
  primaryButtonText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
  },
  secondaryButtonText: { fontSize: 16, fontWeight: '600', color: '#1A1A2E' },
  footer: { textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginBottom: 20 },
});