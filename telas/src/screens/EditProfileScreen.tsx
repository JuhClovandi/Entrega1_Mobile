import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function EditProfileScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho com botão de voltar */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>{"<"}</Text>
          </TouchableOpacity>
        </View>

        {/* Seção da Foto de Perfil e Nome */}
        <View style={styles.profileSection}>
          {/* O avatar ficaria aqui. Usando View como placeholder */}
          <View style={styles.avatar} />

          <TextInput
            style={styles.nameInput}
            placeholder="nome"
            textAlign="center"
          />
        </View>

        {/* Seção de Portfólio */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfólio</Text>
          <Text style={styles.sectionSubtitle}>Insira as imagens</Text>

          <View style={styles.portfolioGrid}>
            {/* Quadrados para inserir as imagens */}
            <TouchableOpacity style={styles.portfolioBox} />
            <TouchableOpacity style={styles.portfolioBox} />
            <TouchableOpacity style={styles.portfolioBox} />
          </View>
        </View>

        {/* Seção Sobre Mim */}
        <View style={styles.section}>
          <TextInput
            style={styles.textArea}
            placeholder="me conte mais sobre você:"
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top" // Faz o texto começar do topo no Android
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  backText: {
    fontSize: 24,
    color: "#333",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#A0A4AB", // Cor de placeholder
    marginBottom: -15, // Para o input sobrepor um pouco, como no protótipo
    zIndex: 1,
  },
  nameInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    width: 150,
    height: 40,
    paddingHorizontal: 15,
    zIndex: 2, // Garante que fique por cima da imagem
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#333",
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  portfolioGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  portfolioBox: {
    width: "30%",
    aspectRatio: 1, // Mantém o elemento sempre quadrado
    borderWidth: 1,
    borderColor: "#A0A4AB",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#A0A4AB",
    borderRadius: 15,
    padding: 15,
    height: 120, // Altura maior para a caixa de texto
    fontSize: 14,
  },
});
