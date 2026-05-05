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

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Validação ────────────────────────────────────────────────────
  const validar = (): boolean => {
    const novoErros: Record<string, string> = {};
    if (!email.trim()) {
      novoErros.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novoErros.email = 'Informe um e-mail válido.';
    }
    if (!senha) {
      novoErros.senha = 'A senha é obrigatória.';
    } else if (senha.length < 6) {
      novoErros.senha = 'A senha deve ter pelo menos 6 caracteres.';
    }
    setErrors(novoErros);
    return Object.keys(novoErros).length === 0;
  };

  // ── Handler ──────────────────────────────────────────────────────
  const handleLogin = () => {
    if (!validar()) return;
    Alert.alert('Login', `Entrando com: ${email}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <ServLinkLogo size="medium" />

          <Text style={styles.title}>Login</Text>

          {/* ─── Formulário ─── */}
          <View style={styles.form}>
            <Text style={styles.label}>E-mail:</Text>
            <TextInput
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholder="seu@email.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(t) => { setEmail(t); setErrors({}); }}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

            <Text style={styles.label}>Senha:</Text>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.input, styles.passwordInput, errors.senha ? styles.inputError : null]}
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!senhaVisivel}
                value={senha}
                onChangeText={(t) => { setSenha(t); setErrors({}); }}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setSenhaVisivel(!senhaVisivel)}
              >
                <Text style={styles.eyeIcon}>{senhaVisivel ? '🙈' : '👁️'}</Text>
              </TouchableOpacity>
            </View>
            {errors.senha ? <Text style={styles.errorText}>{errors.senha}</Text> : null}

            {/* Esqueceu a senha */}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>

          {/* Botão Entrar */}
          <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          {/* Link Criar conta */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>Não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserType')}>
              <Text style={styles.registerLink}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  scroll: { flexGrow: 1, alignItems: 'center', paddingHorizontal: 36, paddingTop: 60, paddingBottom: 30 },
  title: { fontSize: 26, fontWeight: '700', color: '#1A1A2E', marginTop: 28, marginBottom: 32 },
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
    width: '100%',
  },
  inputError: { borderColor: '#EF4444' },
  errorText: { fontSize: 12, color: '#EF4444', marginBottom: 10, marginLeft: 4 },
  passwordWrapper: { position: 'relative', width: '100%' },
  passwordInput: { paddingRight: 50 },
  eyeButton: { position: 'absolute', right: 14, top: 12 },
  eyeIcon: { fontSize: 18 },
  forgotText: { fontSize: 13, color: '#4A90D9', textDecorationLine: 'underline', marginBottom: 28, marginLeft: 4 },
  button: {
    backgroundColor: '#4A90D9',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#4A90D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  registerRow: { flexDirection: 'row', alignItems: 'center', marginTop: 22 },
  registerText: { fontSize: 14, color: '#6B7280' },
  registerLink: { fontSize: 14, color: '#4A90D9', fontWeight: '700' },
  footer: { textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginBottom: 20 },
});