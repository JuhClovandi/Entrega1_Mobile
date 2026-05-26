import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const [userData, setUserData] = useState({ 
    nome: '', 
    email: '', 
    categoria: '', 
    id: '',
    biografia: '',
    foto1: null as string | null,
    foto2: null as string | null,
    foto3: null as string | null
  });
  
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    const loadUserData = async () => {
  try {
    const nome = await AsyncStorage.getItem('@nome_usuario') || 'Usuário';
    const email = await AsyncStorage.getItem('@email_usuario') || '';
    const categoria = await AsyncStorage.getItem('@categoria_usuario') || '';
    const id = await AsyncStorage.getItem('@user_id') || '';
    const biografia = await AsyncStorage.getItem('biografia') || 'Adicione uma biografia aqui...';
    
    const foto1 = await AsyncStorage.getItem('foto1');
    const foto2 = await AsyncStorage.getItem('foto2');
    const foto3 = await AsyncStorage.getItem('foto3');

    setUserData({ nome, email, categoria, id, biografia, foto1, foto2, foto3 });
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
};
    
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
            console.log("🔴 ID sendo enviado:", userData.id);

            if (!userData.id) {
              Alert.alert("Erro", "ID do usuário não encontrado. Faça login novamente.");
              return;
            }

            const response = await fetch('https://predict-survey-shopping.ngrok-free.dev/api/user/delete', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'ngrok-skip-browser-warning': 'true'
              },
              body: JSON.stringify({ id: userData.id })
            });

            const responseText = await response.text();
            console.log("🔴 Resposta do servidor:", responseText);

            if (response.ok) {
              await AsyncStorage.clear();
              navigation.navigate('LoginScreen' as never);
              Alert.alert("Sucesso", "Conta excluída com sucesso!");
            } else {
              Alert.alert("Erro", `Não foi possível excluir a conta. ${responseText}`);
            }
          } catch (error) {
            console.error("Erro ao ligar ao servidor:", error);
            Alert.alert("Erro", "Não foi possível excluir a conta.");
          }
        }
      }
    ]
  );
};

  const getInitial = (name: string) => name ? name.charAt(0).toUpperCase() : '?';

  // Verifica se há pelo menos uma foto para exibir na grade
  const hasPhotos = userData.foto1 || userData.foto2 || userData.foto3;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Título da Tela */}
      <Text style={styles.pageTitle}>Meu Perfil</Text>

      {/* Cabeçalho do Perfil (Avatar e Infos) */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitial(userData.nome)}</Text>
        </View>
        <Text style={styles.name}>{userData.nome}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        
        {/* Badge da Categoria igual ao da foto */}
        {userData.categoria ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{userData.categoria}</Text>
          </View>
        ) : null}
      </View>

      {/* Seção de Biografia */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Biografia / Descrição</Text>
        <Text style={styles.bioText}>{userData.biografia}</Text>
      </View>

      {/* Seção de Portfólio */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Portfólio</Text>
        
        {hasPhotos ? (
          <View style={styles.portfolioGrid}>
            {userData.foto1 && <Image source={{ uri: userData.foto1 }} style={styles.portfolioImage} />}
            {userData.foto2 && <Image source={{ uri: userData.foto2 }} style={styles.portfolioImage} />}
            {userData.foto3 && <Image source={{ uri: userData.foto3 }} style={styles.portfolioImage} />}
          </View>
        ) : (
          <View style={styles.portfolioPlaceholder}>
            <Text style={styles.portfolioPlaceholderText}>Nenhuma foto adicionada.</Text>
          </View>
        )}
      </View>

      {/* Botões de Ação */}
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
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#9e9e9e',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  avatarText: {
    fontSize: 50,
    color: '#333',
    fontWeight: 'bold'
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333'
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginTop: 5
  },
  categoryBadge: {
    backgroundColor: '#777',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 16,
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
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  portfolioPlaceholderText: {
    color: '#888'
  },
  portfolioGrid: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    gap: 10 // Espaçamento entre as fotos
  },
  portfolioImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  editButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#555',
    borderRadius: 30,
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
    backgroundColor: '#b71c1c',
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  }
});