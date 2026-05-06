import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import ServLinkLogo from './components/ServLinkLogo';

type Props = {
  navigation: any;
};

export default function UserTypeScreen({ navigation }: Props) {
  const handleSelect = (type: 'Cliente' | 'Profissional') => {
    navigation.navigate('Register', { userType: type });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <ServLinkLogo size="medium" />
        <Text style={styles.subtitle}>Conectando você ao serviço certo</Text>

        <Text style={styles.question}>Qual o seu perfil?</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.clienteButton]}
            onPress={() => handleSelect('Cliente')}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonIcon}>👤</Text>
            <Text style={styles.buttonText}>Cliente</Text>
            <Text style={styles.buttonSub}>Estou buscando serviços</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.profButton]}
            onPress={() => handleSelect('Profissional')}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonIcon}>🔧</Text>
            <Text style={styles.buttonText}>Profissional</Text>
            <Text style={styles.buttonSub}>Ofereço meus serviços</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 36 },
  subtitle: { fontSize: 15, textAlign: 'center', color: '#6B7280', marginTop: 12, marginBottom: 40 },
  question: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 24 },
  buttonContainer: { width: '100%', gap: 14 },
  button: {
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  clienteButton: { backgroundColor: '#4A90D9', shadowColor: '#4A90D9' },
  profButton: { backgroundColor: '#1A1A2E', shadowColor: '#1A1A2E' },
  buttonIcon: { fontSize: 28, marginBottom: 6 },
  buttonText: { fontSize: 17, fontWeight: '700', color: '#fff' },
  buttonSub: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  footer: { textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginBottom: 20 },
});