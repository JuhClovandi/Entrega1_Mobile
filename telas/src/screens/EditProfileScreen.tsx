import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; 

export default function EditProfileScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [biografia, setBiografia] = useState('');
  const [categoria, setCategoria] = useState('');

  const [foto1, setFoto1] = useState<string | null>(null);
  const [foto2, setFoto2] = useState<string | null>(null);
  const [foto3, setFoto3] = useState<string | null>(null);

  useEffect(() => {
    const loadCurrentData = async () => {
      try {
        // Ajustado para usar as MESMAS chaves do ProfileScreen e do Login
        const storedName = await AsyncStorage.getItem('nome');
        const storedBio = await AsyncStorage.getItem('biografia');
        const storedCategory = await AsyncStorage.getItem('categoria');
        
        const f1 = await AsyncStorage.getItem('foto1');
        const f2 = await AsyncStorage.getItem('foto2');
        const f3 = await AsyncStorage.getItem('foto3');

        if (storedName) setNome(storedName);
        if (storedBio) setBiografia(storedBio);
        if (storedCategory) setCategoria(storedCategory);
        if (f1) setFoto1(f1);
        if (f2) setFoto2(f2);
        if (f3) setFoto3(f3);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadCurrentData();
  }, []);

  const pickImage = async (numeroFoto: number) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria para adicionar fotos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets?.[0].uri) {
      const selectedUri = result.assets[0].uri;
      if (numeroFoto === 1) setFoto1(selectedUri);
      if (numeroFoto === 2) setFoto2(selectedUri);
      if (numeroFoto === 3) setFoto3(selectedUri);
    }
  };

  const handleSave = async () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "O campo Nome Completo não pode ficar vazio.");
      return;
    }

    try {
      // Ajustado para usar as MESMAS chaves do ProfileScreen
      await AsyncStorage.setItem('nome', nome);
      await AsyncStorage.setItem('biografia', biografia);
      await AsyncStorage.setItem('categoria', categoria);
      
      if (foto1) await AsyncStorage.setItem('foto1', foto1);
      if (foto2) await AsyncStorage.setItem('foto2', foto2);
      if (foto3) await AsyncStorage.setItem('foto3', foto3);

      // Colocando o goBack DENTRO do botão de OK do Alerta
      Alert.alert(
        "Sucesso", 
        "Perfil atualizado com sucesso!",
        [
          { 
            text: "OK", 
            onPress: () => navigation.goBack() 
          }
        ]
      );
      
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{nome ? nome.charAt(0).toUpperCase() : 'U'}</Text>
          </View>
          <TextInput 
            style={styles.nameInput} 
            placeholder="Nome" 
            textAlign="center"
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insira as imagens</Text>
          <View style={styles.portfolioGrid}>
            
            <TouchableOpacity style={styles.portfolioBox} onPress={() => pickImage(1)}>
              {foto1 ? <Image source={{ uri: foto1 }} style={styles.imagePreview} /> : <Text style={styles.plusText}>+</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.portfolioBox} onPress={() => pickImage(2)}>
              {foto2 ? <Image source={{ uri: foto2 }} style={styles.imagePreview} /> : <Text style={styles.plusText}>+</Text>}
            </TouchableOpacity>

            <TouchableOpacity style={styles.portfolioBox} onPress={() => pickImage(3)}>
              {foto3 ? <Image source={{ uri: foto3 }} style={styles.imagePreview} /> : <Text style={styles.plusText}>+</Text>}
            </TouchableOpacity>

          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Sobre</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Fale um pouco sobre você..."
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={biografia}
            onChangeText={setBiografia}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Serviço</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Qual o seu serviço principal ou categoria?"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            value={categoria}
            onChangeText={setCategoria}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { paddingBottom: 40 },
  headerBar: { backgroundColor: '#A0A4AB', height: 70, paddingHorizontal: 16, justifyContent: 'center' },
  backButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  backText: { fontSize: 18, color: '#111' },
  profileSection: { alignItems: 'center', marginTop: -28, marginBottom: 20 },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#D1D5DB', borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#4B5563' },
  nameInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#333', borderRadius: 18, width: 150, height: 36, paddingHorizontal: 12, marginTop: 8, color: '#111', textAlign: 'center' },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 14, color: '#111', textAlign: 'center', marginBottom: 8 },
  sectionLabel: { fontSize: 14, color: '#111', textAlign: 'center', marginBottom: 8 },
  portfolioGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  portfolioBox: { width: '30%', aspectRatio: 1, borderWidth: 1, borderColor: '#333', borderRadius: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  imagePreview: { width: '100%', height: '100%' },
  plusText: { fontSize: 24, color: '#A0A4AB', fontWeight: 'bold' },
  textArea: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#333', borderRadius: 16, padding: 12, height: 120, fontSize: 12, color: '#111' },
  saveButton: { alignSelf: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8, backgroundColor: '#fff', marginTop: 10 },
  saveButtonText: { fontSize: 12, color: '#111', fontWeight: 'bold' },
});