import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RoleScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logoText}>seraLink</Text>
        <Text style={styles.subtitle}>
          Conectando você{"\n"}ao serviço certo
        </Text>
        <Text style={styles.question}>Qual o seu perfil?</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RegisterClient")} // Nome da rota do Cliente
        >
          <Text style={styles.buttonText}>Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("RegisterPro")} // Nome da rota do Profissional
        >
          <Text style={styles.buttonText}>Profissional</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  content: { alignItems: "center", marginTop: 40 },
  logoText: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
  },
  question: { fontSize: 16, fontWeight: "bold" },
  buttons: { width: "100%", paddingHorizontal: 40, gap: 15 },
  button: {
    backgroundColor: "#A0A4AB",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#333", fontSize: 16 },
  footer: { fontSize: 10, color: "#666" },
});
