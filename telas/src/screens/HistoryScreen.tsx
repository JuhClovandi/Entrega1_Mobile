import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { API_URL } from '../config';

export default function HistoryScreen() {
  const [historico, setHistorico] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadHistory();
    }
  }, [isFocused]);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('@token_jwt');
      
      const response = await fetch(`${API_URL}/api/profissional/servicos`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setHistorico(data);
      }
    } catch (error) {
      console.error("Erro ao buscar histórico do banco:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelarAgendamento = async (agendamentoId: number) => {
    Alert.alert(
      "Cancelar Agendamento",
      "Tem certeza que deseja cancelar este serviço agendado?",
      [
        { text: "Voltar", style: "cancel" },
        {
          text: "Sim, Cancelar",
          style: "destructive",
          onPress: async () => {
            try {
              const token = await AsyncStorage.getItem('@token_jwt');
              const response = await fetch(`${API_URL}/api/servicos/agendar/${agendamentoId}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  "ngrok-skip-browser-warning": "true"
                }
              });

              if (response.ok) {
                Alert.alert("Cancelado 🎉", "O agendamento foi removido com sucesso.");
                loadHistory(); // Dá um reload na tela automaticamente
              } else {
                Alert.alert("Erro", "Não foi possível cancelar o agendamento no servidor.");
              }
            } catch (error) {
              console.error("Erro na requisição de cancelamento:", error);
              Alert.alert("Erro de Conexão", "Falha ao conectar com o backend.");
            }
          }
        }
      ]
    );
  };

  const filteredHistory = historico.filter((item: any) => 
    (item.nome || `Serviço #${item.id}`).toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          style={styles.searchInput} 
          placeholder="Pesquisar agendamentos anteriores" 
          value={search}
          onChangeText={setSearch}
        />
        
        {/* Linha dos Filtros */}
        <View style={styles.actionRow}>
          <View style={styles.filters}>
            <Text style={styles.filterChip}>← Mais Antigos</Text>
            <Text style={styles.filterChip}>Mais Recentes →</Text>
          </View>
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#333" style={{ flex: 1 }} />
      ) : (
        <ScrollView contentContainerStyle={filteredHistory.length > 0 ? styles.grid : styles.emptyContainer}>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item: any) => (
              <View key={String(item.id)} style={styles.historyCard}>
                {}
                <TouchableOpacity 
                  style={styles.closeCardButton} 
                  onPress={() => handleCancelarAgendamento(item.id)}
                >
                  <Text style={styles.closeCardText}>❌</Text>
                </TouchableOpacity>

                <Text style={styles.icon}>💻</Text>
                <Text style={styles.cardText}>{item.nome || `Serviço #${item.id}`}</Text>
                {item.horario && <Text style={styles.cardTime}>{item.horario}</Text>}
                {item.status && (
                  <Text style={[styles.cardStatus, item.status === 'agendado' && styles.statusActive]}>
                    {item.status.toUpperCase()}
                  </Text>
                )}
              </View>
            ))
          ) : (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>Nenhum agendamento encontrado.</Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { padding: 20 },
  searchInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 25, height: 45, paddingHorizontal: 20, marginBottom: 15 },
  
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  filters: { flexDirection: 'row', gap: 10 }, 
  filterChip: { backgroundColor: '#ccc', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, fontSize: 12 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, justifyContent: 'space-between' },
  historyCard: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 20, alignItems: 'center', marginBottom: 15, position: 'relative' },
  
  closeCardButton: { position: 'absolute', top: 8, right: 8, padding: 4 },
  closeCardText: { fontSize: 10 },

  icon: { fontSize: 30, marginBottom: 10 },
  cardText: { fontSize: 12, textAlign: 'center', fontWeight: '500', color: '#333', marginBottom: 4 },
  cardTime: { fontSize: 11, color: '#666', marginBottom: 4 },
  cardStatus: { fontSize: 10, fontWeight: 'bold', color: '#007AFF' },
  statusActive: { color: '#22C55E' },

  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyView: { alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#888', fontWeight: 'bold' }
});