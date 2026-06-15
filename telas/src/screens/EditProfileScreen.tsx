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
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { API_URL } from '../config';

export default function EditProfileScreen({ navigation }: any) {
  const [nome, setNome] = useState('');
  const [biografia, setBiografia] = useState('');
  const [categoria, setCategoria] = useState('');
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [foto1, setFoto1] = useState<string | null>(null);
  const [foto2, setFoto2] = useState<string | null>(null);
  const [foto3, setFoto3] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    const loadCurrentData = async () => {
      try {
        // 🟢 Buscamos o ID do usuário logado para separar o perfil
        const userId = await AsyncStorage.getItem('id'); 
        
        const storedName = await AsyncStorage.getItem('nome');
        const storedCategory = await AsyncStorage.getItem('categoria');
        const storedFotoPerfil = await AsyncStorage.getItem('fotoPerfil');
        
        // 🟢 Chaves dinâmicas baseadas no ID do usuário logado
        const storedBio = userId ? await AsyncStorage.getItem(`biografia_${userId}`) : null;
        const f1 = userId ? await AsyncStorage.getItem(`foto1_${userId}`) : null;
        const f2 = userId ? await AsyncStorage.getItem(`foto2_${userId}`) : null;
        const f3 = userId ? await AsyncStorage.getItem(`foto3_${userId}`) : null;

        if (storedName) setNome(storedName);
        if (storedBio) setBiografia(storedBio);
        if (storedCategory) setCategoria(storedCategory);
        if (storedFotoPerfil) setFotoPerfil(storedFotoPerfil);
        if (f1) setFoto1(f1);
        if (f2) setFoto2(f2);
        if (f3) setFoto3(f3);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadCurrentData();
  }, []);

  const pickImage = async (tipo: 'perfil' | 1 | 2 | 3) => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permissão necessária", "Você precisa permitir o acesso à galeria.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets?.[0].uri) {
      const uri = result.assets[0].uri;

      if (tipo === 'perfil') {
        const base64 = await FileSystem.readAsStringAsync(uri, {
          encoding: 'base64',
        });
        const base64ComPrefix = `data:image/jpeg;base64,${base64}`;
        setFotoPerfil(base64ComPrefix);
      } else {
        if (tipo === 1) setFoto1(uri);
        if (tipo === 2) setFoto2(uri);
        if (tipo === 3) setFoto3(uri);
      }
    }
  };

  const handleSave = async () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "O campo Nome não pode ficar vazio.");
      return;
    }

    try {
      setSalvando(true);
      const token = await AsyncStorage.getItem('@token_jwt');
      const userId = await AsyncStorage.getItem('id'); // 🟢 Resgata o ID atual

      const response = await fetch(`${API_URL}/api/user/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({
          nome: nome.trim(),
          categoria,
          fotoPerfil: fotoPerfil ?? null,
          biografia,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Erro", data.message || "Erro ao atualizar perfil.");
        return;
      }

      // Salva dados básicos compartilhados ou atualizados pela API
      await AsyncStorage.setItem('nome', data.nome ?? nome);
      await AsyncStorage.setItem('categoria', data.categoria ?? categoria);
      if (data.fotoPerfil) await AsyncStorage.setItem('fotoPerfil', data.fotoPerfil);

      // 🟢 Salva as fotos e a biografia de forma exclusiva para ESTE usuário usando o ID dele
      if (userId) {
        await AsyncStorage.setItem(`biografia_${userId}`, data.biografia ?? biografia);
        if (foto1) await AsyncStorage.setItem(`foto1_${userId}`, foto1);
        if (foto2) await AsyncStorage.setItem(`foto2_${userId}`, foto2);
        if (foto3) await AsyncStorage.setItem(`foto3_${userId}`, foto3);
      }

      Alert.alert("Sucesso", "Perfil atualizado com sucesso!", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);

    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    } finally {
      setSalvando(false);
    }
  };

  const iniciais = nome ? nome.charAt(0).toUpperCase() : 'U';

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        
        <View style={styles.headerBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileSection}>
          <TouchableOpacity onPress={() => pickImage('perfil')} style={styles.avatarWrapper}>
            {fotoPerfil ? (
              <Image source={{ uri: fotoPerfil }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{iniciais}</Text>
              </View>
            )}
            <View style={styles.avatarEditBadge}>
              <Text style={styles.avatarEditText}>✏️</Text>
            </View>
          </TouchableOpacity>

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

        <TouchableOpacity
          style={[styles.saveButton, salvando && { opacity: 0.6 }]}
          onPress={handleSave}
          activeOpacity={0.8}
          disabled={salvando}
        >
          {salvando ? (
            <ActivityIndicator size="small" color="#111" />
          ) : (
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          )}
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
  avatarWrapper: { position: 'relative' },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#D1D5DB', borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  avatarImage: { width: 110, height: 110, borderRadius: 55, borderWidth: 2, borderColor: '#fff' },
  avatarText: { fontSize: 36, fontWeight: 'bold', color: '#4B5563' },
  avatarEditBadge: { position: 'absolute', bottom: 2, right: 2, backgroundColor: '#fff', borderRadius: 12, width: 24, height: 24, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  avatarEditText: { fontSize: 12 },
  nameInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#333', borderRadius: 18, width: 150, height: 36, paddingHorizontal: 12, marginTop: 8, color: '#111', textAlign: 'center' },
  section: { paddingHorizontal: 20, marginBottom: 20 },
  sectionTitle: { fontSize: 14, color: '#111', textAlign: 'center', marginBottom: 8 },
  sectionLabel: { fontSize: 14, color: '#111', textAlign: 'center', marginBottom: 8 },
  portfolioGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  portfolioBox: { width: '30%', aspectRatio: 1, borderWidth: 1, borderColor: '#333', borderRadius: 10, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' },
  imagePreview: { width: '100%', height: '100%' },
  plusText: { fontSize: 24, color: '#A0A4AB', fontWeight: 'bold' },
  textArea: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#333', borderRadius: 16, padding: 12, height: 120, fontSize: 12, color: '#111' },
  saveButton: { alignSelf: 'center', borderWidth: 1, borderColor: '#333', borderRadius: 20, paddingHorizontal: 18, paddingVertical: 8, backgroundColor: '#fff', marginTop: 10, minWidth: 140, alignItems: 'center' },
  saveButtonText: { fontSize: 12, color: '#111', fontWeight: 'bold' },
});