import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context'; 
import { API_URL } from "../config"; 

export default function RegisterProScreen({ navigation }: any) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [categoria, setCategoria] = useState("");
  const [regiao, setRegiao] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegisterPro = async () => {
    if (!nome.trim() || !email.trim() || !categoria.trim() || !regiao.trim() || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/register/pro`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true", 
        },
        body: JSON.stringify({
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          categoria: categoria.trim(),
          regiao: regiao.trim(),
          senha: senha,
        }),
      });

      const responseText = await response.text();
      let data;

      try {
        data = JSON.parse(responseText);
      } catch {
        console.log("Resposta inválida do servidor:", responseText);
        Alert.alert("Erro no Servidor", "Ocorreu um problema inesperado no backend.");
        setLoading(false);
        return;
      }

      if (response.ok) {
        await AsyncStorage.setItem('@token_jwt', data.token || '');
        await AsyncStorage.setItem('@nome_usuario', data.nome || nome);
        await AsyncStorage.setItem('@email_usuario', data.email || email.trim().toLowerCase()); 
        await AsyncStorage.setItem('@perfil_usuario', 'prestador');
        await AsyncStorage.setItem('@categoria_usuario', data.categoria || categoria);

        Alert.alert("Sucesso", "Conta profissional criada com sucesso!", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Main");
            }
          }
        ]);
      } else {
        Alert.alert("Erro", data.message || "Erro ao criar conta profissional.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro de Rede", "Não foi possível conectar ao servidor. Verifique o backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/Logo.png')} style={styles.logoImage} resizeMode="contain" />
          <Text style={styles.title}>Criar Conta</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Categoria de Serviço:</Text>
          <TextInput style={styles.input} value={categoria} onChangeText={setCategoria} />

          <Text style={styles.label}>Região:</Text>
          <TextInput style={styles.input} value={regiao} onChangeText={setRegiao} />

          <Text style={styles.label}>Senha:</Text>
          <TextInput style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />

          <TouchableOpacity style={styles.button} onPress={handleRegisterPro} disabled={loading}>
            {loading ? <ActivityIndicator color="#333" /> : <Text style={styles.buttonText}>Cadastrar e Entrar</Text>}
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  scrollContent: { flexGrow: 1, justifyContent: "space-between", paddingVertical: 40 },
  header: { alignItems: "center", marginBottom: 20 },
  logoImage: { width: 276, height: 96, marginBottom: 6 },
  title: { fontSize: 24, fontWeight: "bold", color: "#000", marginTop: 10 },
  form: { width: "100%", paddingHorizontal: 40 },
  label: { fontSize: 14, color: "#666", marginBottom: 5, marginLeft: 5 },
  input: { backgroundColor: "#A0A4AB", borderRadius: 25, height: 48, marginBottom: 15, paddingHorizontal: 15, color: "#222", fontSize: 15 },
  button: { backgroundColor: "#A0A4AB", borderRadius: 25, height: 50, justifyContent: "center", alignItems: "center", marginTop: 20 },
  buttonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  footer: { fontSize: 11, color: "#222", textAlign: "center", marginTop: 20 },
});