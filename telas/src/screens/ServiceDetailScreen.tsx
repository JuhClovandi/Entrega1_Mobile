import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config';

export default function ServiceDetailScreen({ route, navigation }: any) {
  const { service } = route.params;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    Alert.alert("Excluir", "Tem certeza que deseja remover este serviço?", [
      { text: "Cancelar" },
      { text: "Excluir", style: "destructive", onPress: confirmDelete }
    ]);
  };

  const confirmDelete = async () => {
  setLoading(true);
  try {
    const token = await AsyncStorage.getItem('@token_jwt');
    
    // Adicionamos os headers necessários (incluindo o ngrok se estiver usando)
    const response = await fetch(`${API_URL}/api/profissional/servicos/${service.id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true' 
      }
    });

    if (response.ok) {
      Alert.alert("Sucesso", "Serviço removido.");
      navigation.goBack();
    } else {
      const errorData = await response.text(); 
      console.log("Erro do servidor:", errorData);
      Alert.alert("Erro", "O servidor recusou a exclusão.");
    }
  } catch (error) {
    console.error(error);
    Alert.alert("Erro", "Falha de conexão.");
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{service.nome}</Text>
      <Text style={styles.price}>R$ {service.preco}</Text>
      <Text style={styles.label}>Descrição:</Text>
      <Text style={styles.desc}>{service.descricao}</Text>

      {/* Botão de Excluir */}
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={handleDelete}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.deleteText}>Excluir Serviço</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#FFF' },
  title: { fontSize: 24, fontWeight: 'bold' },
  price: { fontSize: 20, color: '#27AE60', marginVertical: 10 },
  label: { fontWeight: 'bold', marginTop: 20 },
  desc: { fontSize: 16, color: '#444' },
  deleteButton: { backgroundColor: '#FF4D4D', padding: 15, borderRadius: 10, marginTop: 40, alignItems: 'center' },
  deleteText: { color: '#FFF', fontWeight: 'bold' }
});