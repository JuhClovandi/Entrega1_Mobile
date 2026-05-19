import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
// Import correto para evitar avisos de depreciação no terminal do Expo
import { SafeAreaView } from 'react-native-safe-area-context';

const PROFESSIONALS = [
  {
    id: '1',
    name: 'Ana',
    rating: '4.9',
    distance: 'a 1.8km de você',
    description: 'Técnica de T.I especializada em hardware e redes.',
    avatar: require('../../assets/images/FotoPerfil.png'),
  },
  {
    id: '2',
    name: 'Maria',
    rating: '4.8',
    distance: 'a 2.5km de você',
    description: 'Especialista em manutenção de computadores.',
    avatar: require('../../assets/images/FotoMaria.png'),
  },
  {
    id: '3',
    name: 'Marcos',
    rating: '4.5',
    distance: 'a 3.2km de você',
    description: 'Assistência técnica para PC’s e instalação de computadores.',
    avatar: require('../../assets/images/FotoMarcos.png'),
  },
];

export default function ListingScreen({ navigation }: any) {
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
        {PROFESSIONALS.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              {item.avatar ? (
                <Image source={item.avatar} style={styles.avatar} resizeMode="cover" />
              ) : (
                <View style={styles.avatar} />
              )}
              <View style={styles.info}>
                <Text style={styles.name}>
                  {item.name} <Text style={styles.rating}>⭐ {item.rating}</Text>
                </Text>
                <Text style={styles.distance}>{item.distance}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.cardFooter}
              onPress={() => navigation.navigate('RequestService')}
              activeOpacity={0.8}
            >
              <Text style={styles.cardFooterText}>Solicitar serviço</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* ➕ BOTÃO FLUTUANTE (FAB) PARA O PROFISSIONAL CRIAR SEU SERVIÇO */}
      <TouchableOpacity 
        style={styles.fabButton} 
        onPress={() => navigation.navigate('CreateProService')}
        activeOpacity={0.7}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
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
  cardFooter: {
    height: 26,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 13,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center' // 🔑 CORRIGIDO: Fechamento de aspas simples que faltava
  },
  cardFooterText: { fontSize: 12, color: '#333' },
  
  // Estilização do Botão Flutuante (FAB) integrado ao seu tema
  fabButton: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#333', // Cor escura para contrastar bem com o fundo claro
    borderRadius: 28,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 28,
    color: '#FFF',
    fontWeight: 'bold',
    lineHeight: 28,
    marginBottom: 2
  },
});