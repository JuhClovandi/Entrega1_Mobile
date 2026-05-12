import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function ListingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Concerto de PC" />
        <View style={styles.filters}>
          <Text style={styles.filterChip}>Melhor avaliados</Text>
          <Text style={styles.filterChip}>Mais próximos</Text>
        </View>
      </View>

      <ScrollView style={styles.list}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.name}>Ana <Text style={styles.rating}>⭐ 4.9</Text></Text>
                <Text style={styles.distance}>a 1.8km de você</Text>
                <Text style={styles.description}>Técnica de T.I especializada em hardware e redes.</Text>
              </View>
            </View>
            <View style={styles.cardFooter} />
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
  filters: { flexDirection: 'row', justifyContent: 'space-around' },
  filterChip: { backgroundColor: '#ccc', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 15, fontSize: 12 },
  list: { paddingHorizontal: 20 },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 15, marginBottom: 15 },
  cardHeader: { flexDirection: 'row' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc', marginRight: 15 },
  info: { flex: 1 },
  name: { fontWeight: 'bold', fontSize: 16 },
  rating: { fontSize: 12, fontWeight: 'normal', color: '#F2C94C' },
  distance: { fontSize: 10, color: '#999', position: 'absolute', right: 0 },
  description: { fontSize: 12, color: '#666', marginTop: 5 },
  cardFooter: { height: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 10, marginTop: 10 }
});