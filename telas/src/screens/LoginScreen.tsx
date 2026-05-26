import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !senha) {
      Alert.alert("Campos Obrigatórios", "Por favor, preencha o e-mail e a senha.");
      return;
    }

    try {
      setLoading(true); 

      const response = await fetch('https://predict-survey-shopping.ngrok-free.dev/api/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' 
        },
        body: JSON.stringify({ email: email.trim().toLowerCase(), senha: senha })
      });

      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch {
        console.log("Resposta inválida do servidor:", responseText);
        Alert.alert("Erro no Servidor", "Ocorreu um problema de comunicação com o backend.");
        setLoading(false);
        return;
      }

      if (response.ok) {
        // 💾 Gravando os dados da sessão com segurança no aparelho
        await AsyncStorage.setItem('@token_jwt', data.token);
        await AsyncStorage.setItem('@nome_usuario', data.nome);
        await AsyncStorage.setItem('@email_usuario', data.email);
        await AsyncStorage.setItem('@perfil_usuario', data.perfil);
        await AsyncStorage.setItem('@categoria_usuario', data.categoria || '');
        await AsyncStorage.setItem('@user_id', String(data.id));

        navigation.navigate('Main');

        Alert.alert("Sucesso", `Bem-vindo, ${data.nome}!`, [
          { 
            text: "OK", 
            onPress: () => {
              // 🚀 Redireciona para o navigator de abas ('Main'), onde está a HomeScreen
              navigation.navigate('Main');
            } 
          }
        ]);
        
      } else {
        Alert.alert("Acesso Negado", data.message || "E-mail ou senha incorretos.");
      }

    } catch (error) {
      console.error("Erro na requisição de login:", error);
      Alert.alert("Erro de Rede", "Não foi possível conectar ao backend. Verifique se o ngrok está online.");
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