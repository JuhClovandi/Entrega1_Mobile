import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config'; 

export default function ListingScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca os serviços no Backend
 const loadServices = async () => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem('@token_jwt');
    
    const response = await fetch(`${API_URL}/api/profissional/servicos`, {
      method: 'GET', // Garanta que o método seja GET
      headers: { 
        'Authorization': `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
        'Content-Type': 'application/json'
      }
    });
    
    // VERIFICAÇÃO DE RESPOSTA
    if (!response.ok) {
      // Se não for 200-299, lança um erro com o status
      throw new Error(`Erro ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();
    setServices(data);
  } catch (error: any) {
    console.error("DETALHE DO ERRO:", error); // ISSO VAI MOSTRAR O ERRO NO SEU TERMINAL
    Alert.alert("Erro de Conexão", `Não foi possível carregar: ${error.message}`);
  } finally {
    setLoading(false);
  }
};

  useFocusEffect(useCallback(() => { loadServices(); }, []));

  const filtered = services.filter(s => s.nome.toLowerCase().includes(search.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Buscar serviço..." 
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {loading ? <ActivityIndicator size="large" color="#333" /> : (
          filtered.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.card}
              onPress={() => navigation.navigate('ServiceDetail', { service: item })}
            >
              <Text style={styles.name}>{item.nome}</Text>
              <Text style={styles.price}>R$ {item.preco}</Text>
              <Text style={styles.description} numberOfLines={2}>{item.descricao}</Text>
              <Text style={styles.link}>Toque para ver detalhes</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fabButton} onPress={() => navigation.navigate('CreateProService')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20 },
  searchInput: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#DDD' },
  listContent: { padding: 20, paddingBottom: 100 },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 16, marginBottom: 16, elevation: 3 },
  name: { fontSize: 18, fontWeight: 'bold' },
  price: { color: '#27AE60', fontWeight: 'bold', marginVertical: 4 },
  description: { color: '#666', fontSize: 14 },
  link: { fontSize: 12, color: '#333', marginTop: 10, textAlign: 'right', textDecorationLine: 'underline' },
  fabButton: { position: 'absolute', width: 56, height: 56, borderRadius: 28, backgroundColor: '#333', right: 20, bottom: 20, alignItems: 'center', justifyContent: 'center' },
  fabIcon: { fontSize: 28, color: '#FFF' }
});