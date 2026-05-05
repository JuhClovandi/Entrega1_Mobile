import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import ServLinkLogo from './components/ServLinkLogo';

type Props = {
  navigation: any;
};

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Validações ──────────────────────────────────────────────────
  const validarEmail = (): boolean => {
    const novoErros: Record<string, string> = {};
    if (!email.trim()) {
      novoErros.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novoErros.email = 'Informe um e-mail válido.';
    }
    setErrors(novoErros);
    return Object.keys(novoErros).length === 0;
  };

  const validarSenhas = (): boolean => {
    const novoErros: Record<string, string> = {};
    if (!novaSenha) {
      novoErros.novaSenha = 'A nova senha é obrigatória.';
    } else if (novaSenha.length < 6) {
      novoErros.novaSenha = 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (!confirmarSenha) {
      novoErros.confirmarSenha = 'Confirme sua nova senha.';
    } else if (novaSenha !== confirmarSenha) {
      novoErros.confirmarSenha = 'As senhas não coincidem.';
    }
    setErrors(novoErros);
    return Object.keys(novoErros).length === 0;
  };

  // ── Handlers ────────────────────────────────────────────────────
  const handleEnviarEmail = () => {
    if (!validarEmail()) return;
    setStep(2);
  };

  const handleRedefinirSenha = () => {
    if (!validarSenhas()) return;
    Alert.alert('Sucesso!', 'Sua senha foi redefinida com sucesso.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  // ── Render ──────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <ServLinkLogo size="medium" />

          {/* Título */}
          <Text style={styles.title}>
            {step === 1 ? 'Recuperação\nde senha' : 'Recuperação\nde senha'}
          </Text>

          {/* ─── ETAPA 1: E-mail ─── */}
          {step === 1 && (
            <View style={styles.form}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={[styles.input, errors.email ? styles.inputError : null]}
                placeholder="seu@email.com"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(t) => { setEmail(t); setErrors({}); }}
              />
              {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleEnviarEmail} activeOpacity={0.85}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* ─── ETAPA 2: Nova senha ─── */}
          {step === 2 && (
            <View style={styles.form}>
              <Text style={styles.label}>Nova senha</Text>
              <TextInput
                style={[styles.input, errors.novaSenha ? styles.inputError : null]}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={novaSenha}
                onChangeText={(t) => { setNovaSenha(t); setErrors({}); }}
              />
              {errors.novaSenha ? <Text style={styles.errorText}>{errors.novaSenha}</Text> : null}

              <Text style={styles.label}>Confirmar senha</Text>
              <TextInput
                style={[styles.input, errors.confirmarSenha ? styles.inputError : null]}
                placeholder="••••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={confirmarSenha}
                onChangeText={(t) => { setConfirmarSenha(t); setErrors({}); }}
              />
              {errors.confirmarSenha ? <Text style={styles.errorText}>{errors.confirmarSenha}</Text> : null}

              <TouchableOpacity style={styles.button} onPress={handleRedefinirSenha} activeOpacity={0.85}>
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Link voltar */}
          <TouchableOpacity onPress={() => step === 2 ? setStep(1) : navigation.navigate('Login')}>
            <Text style={styles.backLink}>
              {step === 2 ? '← Voltar' : 'Voltar para o Login'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  scroll: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 36, paddingTop: 60, paddingBottom: 30 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A1A2E',
    textAlign: 'center',
    marginTop: 28,
    marginBottom: 36,
    lineHeight: 34,
  },
  form: { width: '100%' },
  label: { fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6, marginLeft: 4 },
  input: {
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#1A1A2E',
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  inputError: { borderColor: '#EF4444' },
  errorText: { fontSize: 12, color: '#EF4444', marginBottom: 10, marginLeft: 4 },
  button: {
    backgroundColor: '#4A90D9',
    paddingVertical: 15,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#4A90D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  backLink: { marginTop: 24, fontSize: 14, color: '#4A90D9', fontWeight: '600' },
  footer: { textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginBottom: 20 },
});
