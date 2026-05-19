import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
  const [historico, setHistorico] = useState([
    'Configuração de PC',
    'Limpeza',
    'Restauração',
    'Upgrade',
    'Montagem',
    'Tecnologia',
    'Baixar programas',
    'Instalação de cooler',
  ]);

  const handleClearHistory = () => {
    if (historico.length === 0) return;

    Alert.alert(
      "Limpar Histórico",
      "Tem certeza que deseja apagar todo o seu histórico de pedidos? Essa ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sim, Limpar",
          style: "destructive",
          onPress: () => setHistorico([])
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Pesquisar pedidos anteriores" />
        
        {/* Linha dos Filtros + Botão de Limpar */}
        <View style={styles.actionRow}>
          <View style={styles.filters}>
            <Text style={styles.filterChip}>← Mais Antigos</Text>
            <Text style={styles.filterChip}>Mais Recentes →</Text>
          </View>
          
          <TouchableOpacity onPress={handleClearHistory} disabled={historico.length === 0}>
            <Text style={[styles.clearButtonText, historico.length === 0 && styles.disabledText]}>
              Limpar
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={historico.length > 0 ? styles.grid : styles.emptyContainer}>
        {historico.length > 0 ? (
          historico.map((title, index) => (
            <View key={`${title}-${index}`} style={styles.historyCard}>
              <Text style={styles.icon}>💻</Text>
              <Text style={styles.cardText}>{title}</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyView}>
            <Text style={styles.emptyText}>Seu histórico está vazio.</Text>
          </View>
        )}
      </ScrollView>
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
  
  clearButtonText: { color: '#FF3B30', fontWeight: 'bold', fontSize: 14 },
  disabledText: { color: '#ccc' }, 

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, justifyContent: 'space-between' },
  historyCard: { width: '48%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 20, alignItems: 'center', marginBottom: 15 },
  icon: { fontSize: 30, marginBottom: 10 },
  cardText: { fontSize: 12, textAlign: 'center', fontWeight: '500', color: '#333' },
  
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyView: { alignItems: 'center', marginTop: 50 },
  emptyText: { fontSize: 16, color: '#888', fontWeight: 'bold' }
});