import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function HistoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Pesquisar pedidos anteriores" />
        <View style={styles.filters}>
          <Text style={styles.filterChip}>← Mais Antigos</Text>
          <Text style={styles.filterChip}>Mais Recentes →</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.grid}>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View key={item} style={styles.historyCard}>
            <Text style={styles.icon}>💻</Text>
            <Text style={styles.cardText}>Serviço de PC</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { padding: 20 },
  searchInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 25, height: 45, paddingHorizontal: 20, marginBottom: 15 },
  filters: { flexDirection: 'row', justifyContent: 'space-between' },
  filterChip: { backgroundColor: '#ccc', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, fontSize: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 15, justifyContent: 'space-between' },
  historyCard: { width: '45%', backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 20, alignItems: 'center', marginBottom: 15 },
  icon: { fontSize: 30, marginBottom: 10 },
  cardText: { fontSize: 12, textAlign: 'center' }
});