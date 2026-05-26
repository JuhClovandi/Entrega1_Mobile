 import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [userData, setUserData] = useState({ nome: '', email: '', categoria: '', id: '' });
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const nome = await AsyncStorage.getItem('nome') || 'Usuário';
        const email = await AsyncStorage.getItem('email') || '';
        const categoria = await AsyncStorage.getItem('categoria') || '';
        const id = await AsyncStorage.getItem('userId') || '';
        setUserData({ nome, email, categoria, id });
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };
    
    // Atualiza os dados sempre que a tela ganhar foco
    if (isFocused) {
      loadUserData();
    }
  }, [isFocused]);

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Excluir Conta",
      "Tem certeza que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Excluir", 
          style: "destructive",
          onPress: async () => {
            try {
              // Lembre-se de ajustar o IP/URL para o seu backend local
              const response = await fetch('http://SEU_IP_AQUI:3000/users', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: userData.id })
              });

              if (response.ok) {
                await AsyncStorage.clear();
                navigation.navigate('LoginScreen' as never);
              } else {
                Alert.alert("Erro", "Não foi possível excluir a conta no momento.");
              }
            } catch (error) {
              Alert.alert("Erro de Conexão", "Falha na comunicação com o servidor.");
            }
          }
        }
      ]
    );
  };

  // Pega a primeira letra do nome para o avatar
  const getInitial = (name: string) => name ? name.charAt(0).toUpperCase() : '?';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitial(userData.nome)}</Text>
        </View>
        <Text style={styles.name}>{userData.nome}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        {userData.categoria ? <Text style={styles.category}>{userData.categoria}</Text> : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Biografia</Text>
        <Text style={styles.bioText}>Adicione uma biografia aqui...</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfólio</Text>
        <View style={styles.portfolioPlaceholder}>
          <Text style={styles.portfolioText}>Nenhuma foto adicionada.</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.editButton} 
        onPress={() => navigation.navigate('EditProfile' as never)}
      >
        <Text style={styles.editButtonText}>Editar Perfil</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Excluir Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center'
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#A0A4AB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold'
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333'
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginTop: 5
  },
  category: {
    fontSize: 14,
    color: '#0066cc',
    marginTop: 5,
    fontWeight: '600'
  },
  section: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2, // Sombra suave para Android
    shadowColor: '#000', // Sombra suave para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333'
  },
  bioText: {
    fontSize: 14,
    color: '#666'
  },
  portfolioPlaceholder: {
    height: 100,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  portfolioText: {
    color: '#888'
  },
  editButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#333',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  deleteButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#ff4444',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});