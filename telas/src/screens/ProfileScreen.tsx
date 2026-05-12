import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <Text style={styles.name}>Profissional</Text>
          <Text style={styles.stars}>⭐ ⭐ ⭐ ⭐</Text>
          
          {}
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.editButtonText}>Editar Perfil</Text>
          </TouchableOpacity>
          {}

        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfólio</Text>
          <View style={styles.portfolioGrid}>
            <View style={styles.portfolioItem} />
            <View style={styles.portfolioItem} />
            <View style={styles.portfolioItem} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.placeholderText}>
            Aqui fica a descrição do profissional.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Avaliações</Text>
          <Text style={styles.placeholderText}>
            Nenhuma avaliação ainda.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FAFAFA' 
  },
  header: { 
    alignItems: 'center', 
    padding: 20, 
    borderBottomWidth: 1, 
    borderColor: '#eee' 
  },
  avatar: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#A0A4AB', 
    marginBottom: 10 
  },
  name: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#333'
  },
  stars: { 
    color: '#F2C94C', 
    marginTop: 5,
    marginBottom: 15
  },
  // Estilos do novo botão
  editButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  editButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold'
  },
  section: { 
    padding: 20 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginBottom: 10,
    color: '#333'
  },
  portfolioGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  portfolioItem: { 
    width: '30%', 
    aspectRatio: 1,
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  placeholderText: {
    color: '#999',
    fontSize: 14
  }
});