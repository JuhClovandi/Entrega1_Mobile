import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Qual servico voce precisa?"
            placeholderTextColor="#6E7681"
          />
        </View>

        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categoriesGrid}>
          {[
            { label: 'Limpeza', icon: '🧹' },
            { label: 'Manutencao', icon: '🛠️' },
            { label: 'Tecnologia', icon: '💻' },
            { label: 'Aulas', icon: '📚' },
          ].map((item) => (
            <View key={item.label} style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>{item.icon}</Text>
              <Text style={styles.categoryLabel}>{item.label}</Text>
            </View>
          ))}
          <View style={styles.categoryCardWide}>
            <Text style={styles.categoryIcon}>❤️</Text>
            <Text style={styles.categoryLabel}>Saude</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Profissionais Recomendados</Text>
        <View style={styles.recommendedRow}>
          {[{ rating: '4.8' }, { rating: '4.9' }].map((p, index) => (
            <View key={index} style={styles.recommendedCard}>
              <View style={styles.recommendedAvatar} />
              <View style={styles.recommendedRating}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.ratingText}>{p.rating}</Text>
              </View>
              <Text style={styles.recommendedName}>Nome</Text>
              <View style={styles.profileButton}>
                <Text style={styles.profileButtonText}>Ver perfil</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { padding: 20, paddingBottom: 30 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 25,
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: { fontSize: 14, color: '#333', marginRight: 8 },
  searchInput: { flex: 1, fontSize: 12, color: '#333' },
  sectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 10, color: '#333' },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  categoryCardWide: {
    width: '60%',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  categoryIcon: { fontSize: 22, marginBottom: 6 },
  categoryLabel: { fontSize: 12, color: '#333' },
  recommendedRow: { flexDirection: 'row', gap: 12 },
  recommendedCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  recommendedAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 8,
  },
  recommendedRating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  star: { fontSize: 12, color: '#F2C94C' },
  ratingText: { fontSize: 12, color: '#333' },
  recommendedName: { fontSize: 12, marginTop: 6, color: '#333' },
  profileButton: {
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  profileButtonText: { fontSize: 11, color: '#333' },
});
