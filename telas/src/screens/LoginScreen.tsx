import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    setLoading(true);

    try {
      // 🔗 Conecta com o seu IP do backend na porta 3000
      const response = await fetch("http://192.168.1.5:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // 💾 SALVA O TOKEN E O PERFIL (usuario ou prestador) NO DISPOSITIVO
        await AsyncStorage.setItem('@token_usuario', data.token);
        await AsyncStorage.setItem('@perfil_usuario', data.perfil);

        Alert.alert("Sucesso", "Login realizado!");

        // 🔀 AJUSTADO: Aponta para 'Main' para carregar o Navigator de Abas (Tabs) do seu App.tsx
        if (data.perfil === 'prestador') {
          navigation.navigate('Main'); 
        } else {
          navigation.navigate('Main'); 
        }
      } else {
        Alert.alert("Erro de Login", data.message || "E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo de volta</Text>
      <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

      {/* Navega de volta para a RoleScreen caso o usuário mude de ideia e queira criar conta */}
      <TouchableOpacity onPress={() => navigation.navigate('RoleScreen')}>
        <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#333', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#DDD' },
  button: { backgroundColor: '#A0A4AB', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 10, height: 50, justifyContent: 'center' },
  buttonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#007AFF', textAlign: 'center', marginTop: 20, fontSize: 16 }
});