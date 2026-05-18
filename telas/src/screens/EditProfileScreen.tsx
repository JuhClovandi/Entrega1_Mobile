import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function EditProfileScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatar} />
          <TextInput style={styles.nameInput} placeholder="nome" textAlign="center" />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insira as imagens</Text>
          <View style={styles.portfolioGrid}>
            <TouchableOpacity style={styles.portfolioBox} />
            <TouchableOpacity style={styles.portfolioBox} />
            <TouchableOpacity style={styles.portfolioBox} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Sobre</Text>
          <TextInput
            style={styles.textArea}
            placeholder=""
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Serviço</Text>
          <TextInput
            style={styles.textArea}
            placeholder=""
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={() => navigation.navigate('Main', { screen: 'Perfil' })}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { paddingBottom: 40 },
  headerBar: {
    backgroundColor: '#A0A4AB',
    height: 70,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  backButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 18, color: '#111' },
  profileSection: { alignItems: 'center', marginTop: -28, marginBottom: 20 },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#A0A4AB',
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 0,
    zIndex: 1,
  },
  nameInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 18,
    width: 150,
    height: 36,
    paddingHorizontal: 12,
    paddingTop: 3,
    paddingBottom: 5,
    marginTop: 8,
    textAlignVertical: 'center',
    zIndex: 2,
  },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 14, color: '#111', textAlign: 'center', marginBottom: 8 },
  sectionLabel: { fontSize: 14, color: '#111', textAlign: 'center', marginBottom: 8 },
  portfolioGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  portfolioBox: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  textArea: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 16,
    padding: 12,
    height: 120,
    fontSize: 12,
  },
  saveButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  saveButtonText: { fontSize: 12, color: '#111' },
});
