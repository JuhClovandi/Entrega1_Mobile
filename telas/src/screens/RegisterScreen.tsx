import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

export default function RegisterScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logoText}>ServLink</Text>
          <Text style={styles.title}>Criar Conta</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo:</Text>
          <TextInput style={styles.input} />

          <Text style={styles.label}>E-mail:</Text>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha:</Text>
          <TextInput style={styles.input} secureTextEntry />

          <Text style={styles.label}>Confirme a senha:</Text>
          <TextInput style={styles.input} secureTextEntry />

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FAFAFA" },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  header: { alignItems: "center", marginBottom: 20 },
  logoText: { fontSize: 32, fontWeight: "bold", marginBottom: 10 },
  title: { fontSize: 20, fontWeight: "bold" },
  form: { width: "100%", paddingHorizontal: 40 },
  label: { fontSize: 12, color: "#666", marginBottom: 5, marginLeft: 5 },
  input: {
    backgroundColor: "#A0A4AB",
    borderRadius: 20,
    height: 45,
    marginBottom: 15,
    paddingHorizontal: 15,
    color: "#fff",
  },
  button: {
    backgroundColor: "#A0A4AB",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#333", fontSize: 16, fontWeight: "bold" },
  footer: { fontSize: 10, color: "#666", textAlign: "center", marginTop: 20 },
});