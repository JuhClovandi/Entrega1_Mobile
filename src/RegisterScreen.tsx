import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import ServLinkLogo from './components/ServLinkLogo';

type Props = {
  navigation: any;
  route: any;
};

const CATEGORIAS = [
  'Limpeza',
  'Manutenção',
  'Tecnologia',
  'Aulas',
  'Saúde',
  'Beleza',
  'Outro',
];

const REGIOES = [
  'Centro',
  'Norte',
  'Sul',
  'Leste',
  'Oeste',
  'Zona Rural',
];

export default function RegisterScreen({ navigation, route }: Props) {
  const userType: string = route?.params?.userType ?? 'Cliente';

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [categoria, setCategoria] = useState('');
  const [regiao, setRegiao] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);
  const [showRegioes, setShowRegioes] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ── Validação ─────────────────────────────────────────────────────
  const validar = (): boolean => {
    const novoErros: Record<string, string> = {};

    if (!nome.trim()) novoErros.nome = 'O nome completo é obrigatório.';
    if (!email.trim()) {
      novoErros.email = 'O e-mail é obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      novoErros.email = 'Informe um e-mail válido.';
    }
    if (userType === 'Profissional' && !categoria) {
      novoErros.categoria = 'Selecione uma categoria de serviço.';
    }
    if (!regiao) novoErros.regiao = 'Selecione uma região.';
    if (!senha) {
      novoErros.senha = 'A senha é obrigatória.';
    } else if (senha.length < 6) {
      novoErros.senha = 'A senha deve ter pelo menos 6 caracteres.';
    }
    if (!confirmarSenha) {
      novoErros.confirmarSenha = 'Confirme sua senha.';
    } else if (senha !== confirmarSenha) {
      novoErros.confirmarSenha = 'As senhas não coincidem.';
    }

    setErrors(novoErros);
    return Object.keys(novoErros).length === 0;
  };

  const handleCadastrar = () => {
    if (!validar()) return;
    Alert.alert('Cadastro realizado!', `Bem-vindo(a), ${nome}!`, [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  // ── Dropdown helper ───────────────────────────────────────────────
  const Dropdown = ({
    label,
    value,
    options,
    visible,
    onToggle,
    onSelect,
    error,
  }: {
    label: string;
    value: string;
    options: string[];
    visible: boolean;
    onToggle: () => void;
    onSelect: (v: string) => void;
    error?: string;
  }) => (
    <View style={{ width: '100%', marginBottom: 8 }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[styles.dropdown, error ? styles.inputError : null]}
        onPress={onToggle}
        activeOpacity={0.8}
      >
        <Text style={value ? styles.dropdownValue : styles.dropdownPlaceholder}>
          {value || `Selecione ${label.toLowerCase()}`}
        </Text>
        <Text style={styles.dropdownArrow}>{visible ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {visible && (
        <View style={styles.dropdownList}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={styles.dropdownItem}
              onPress={() => { onSelect(opt); setErrors({}); }}
            >
              <Text style={[styles.dropdownItemText, value === opt && styles.dropdownItemActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <ServLinkLogo size="medium" />

          <Text style={styles.title}>Criar Conta</Text>

          {/* Badge de tipo */}
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{userType}</Text>
          </View>

          <View style={styles.form}>
            {/* Nome */}
            <Text style={styles.label}>Nome Completo:</Text>
            <TextInput
              style={[styles.input, errors.nome ? styles.inputError : null]}
              placeholder="Seu nome completo"
              placeholderTextColor="#9CA3AF"
              value={nome}
              onChangeText={(t) => { setNome(t); setErrors({}); }}
            />
            {errors.nome ? <Text style={styles.errorText}>{errors.nome}</Text> : null}

            {/* E-mail */}
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

            {/* Categoria de Serviço (só para profissional) */}
            {userType === 'Profissional' && (
              <Dropdown
                label="Categoria de Serviço:"
                value={categoria}
                options={CATEGORIAS}
                visible={showCategorias}
                onToggle={() => { setShowCategorias(!showCategorias); setShowRegioes(false); }}
                onSelect={(v) => { setCategoria(v); setShowCategorias(false); }}
                error={errors.categoria}
              />
            )}

            {/* Região */}
            <Dropdown
              label="Região:"
              value={regiao}
              options={REGIOES}
              visible={showRegioes}
              onToggle={() => { setShowRegioes(!showRegioes); setShowCategorias(false); }}
              onSelect={(v) => { setRegiao(v); setShowRegioes(false); }}
              error={errors.regiao}
            />

            {/* Senha */}
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

            {/* Confirmar Senha */}
            <Text style={styles.label}>Confirme a senha:</Text>
            <TextInput
              style={[styles.input, errors.confirmarSenha ? styles.inputError : null]}
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!senhaVisivel}
              value={confirmarSenha}
              onChangeText={(t) => { setConfirmarSenha(t); setErrors({}); }}
            />
            {errors.confirmarSenha ? <Text style={styles.errorText}>{errors.confirmarSenha}</Text> : null}
          </View>

          {/* Botão Cadastrar */}
          <TouchableOpacity style={styles.button} onPress={handleCadastrar} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </TouchableOpacity>

          {/* Link Login */}
          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Já tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Entrar</Text>
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
  scroll: { alignItems: 'center', paddingHorizontal: 36, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 26, fontWeight: '700', color: '#1A1A2E', marginTop: 28, marginBottom: 10 },
  typeBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#BFDBFE',
  },
  typeBadgeText: { color: '#4A90D9', fontWeight: '700', fontSize: 13 },
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
  // Dropdown
  dropdown: {
    backgroundColor: '#E5E7EB',
    borderRadius: 14,
    height: 50,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdownValue: { fontSize: 15, color: '#1A1A2E' },
  dropdownPlaceholder: { fontSize: 15, color: '#9CA3AF' },
  dropdownArrow: { fontSize: 11, color: '#6B7280' },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginTop: 4,
    marginBottom: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  dropdownItem: { paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  dropdownItemText: { fontSize: 14, color: '#374151' },
  dropdownItemActive: { color: '#4A90D9', fontWeight: '700' },
  // Buttons
  button: {
    backgroundColor: '#4A90D9',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 28,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#4A90D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700', letterSpacing: 0.5 },
  loginRow: { flexDirection: 'row', alignItems: 'center', marginTop: 20 },
  loginText: { fontSize: 14, color: '#6B7280' },
  loginLink: { fontSize: 14, color: '#4A90D9', fontWeight: '700' },
  footer: { textAlign: 'center', fontSize: 12, color: '#9CA3AF', marginBottom: 20 },
});