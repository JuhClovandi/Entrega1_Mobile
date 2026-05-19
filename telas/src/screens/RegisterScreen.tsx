import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
} from "react-native";

export default function RegisterScreen({ navigation }: any) {
  // Estados para capturar os inputs
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmeSenha, setConfirmeSenha] = useState("");

  const handleRegister = async () => {
    if (!nome || !email || !senha || !confirmeSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (senha !== confirmeSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.5:3000/api/register/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", "Conta criada com sucesso!");
        navigation.navigate("Main");
      } else {
        Alert.alert("Erro", data.message || "Erro ao criar conta.");
      }
    } catch (error) {
      console.error(error); // Evita o aviso do ESLint e ajuda no debug
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
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

          <Text style={styles.label}>Senha:</Text>
          <TextInput style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} />

          <Text style={styles.label}>Confirme a senha:</Text>
          <TextInput style={styles.input} secureTextEntry value={confirmeSenha} onChangeText={setConfirmeSenha} />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#FAFAFA" 
  },
  scrollContent: { 
    flexGrow: 1, 
    justifyContent: "space-between", 
    paddingVertical: 40 
  },
  header: { 
    alignItems: "center", 
    marginBottom: 20 
  },
  logoImage: { 
    width: 276, 
    height: 96, 
    marginBottom: 6 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold",
    color: "#000",
    marginTop: 10
  },
  form: { 
    width: "100%", 
    paddingHorizontal: 40 
  },
  label: { 
    fontSize: 14, 
    color: "#666", 
    marginBottom: 5, 
    marginLeft: 5 
  },
  input: { 
    backgroundColor: "#A0A4AB", 
    borderRadius: 25, 
    height: 48, 
    marginBottom: 15, 
    paddingHorizontal: 15, 
    color: "#222", 
    fontSize: 15
  },
  button: { 
    backgroundColor: "#A0A4AB", 
    borderRadius: 25, 
    height: 50, 
    justifyContent: "center", 
    alignItems: "center", 
    marginTop: 20 
  },
  buttonText: { 
    color: "#333", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  footer: { 
    fontSize: 11, 
    color: "#222", 
    textAlign: "center", 
    marginTop: 20 
  },
});