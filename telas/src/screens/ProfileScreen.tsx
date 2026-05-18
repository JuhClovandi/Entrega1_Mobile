import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';

export default function ProfileScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerEdit} onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.headerEditText}>editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileBlock}>
          <Image
            source={require('../../assets/images/FotoPerfil.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Text style={styles.name}>Profissional</Text>
          <Text style={styles.subtitle}>Técnica de T.I especializada{`\n`}em hardware e redes</Text>
          <View style={styles.ratingBox}>
            <Text style={styles.stars}>☆ ☆ ☆ ☆</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Portfólio</Text>
          <View style={styles.portfolioGrid}>
            <Image
              source={require('../../assets/images/FotoPortifolio1.png')}
              style={styles.portfolioItem}
              resizeMode="cover"
            />
            <Image
              source={require('../../assets/images/FotoPortifolio2.png')}
              style={styles.portfolioItem}
              resizeMode="cover"
            />
            <Image
              source={require('../../assets/images/FotoPortifolio3.png')}
              style={styles.portfolioItem}
              resizeMode="cover"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.sectionText}>
            Técnica de T.I com 5 anos de experiência em manutenção de computadores, configuração de redes e suporte técnico residencial e empresarial. Atendo com agilidade e clareza, explicando tudo de forma simples para o cliente.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Serviço</Text>
          <Text style={styles.sectionText}>
            Instalação e configuração de redes Wi‑Fi e cabeadas, manutenção e formatação de computadores e notebooks, troca de peças (HD, memória RAM, fonte), configuração de impressoras e câmeras de segurança. Atendo em domicílio e empresas.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { paddingBottom: 30 },
  headerBar: {
    backgroundColor: '#A0A4AB',
    height: 70,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  backIcon: { fontSize: 18, color: '#111' },
  headerEdit: {
    backgroundColor: '#C9CCD1',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  headerEditText: { fontSize: 12, color: '#111' },
  profileBlock: { alignItems: 'center', marginTop: -28, marginBottom: 10 },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#A0A4AB',
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: { fontSize: 16, fontWeight: '600', color: '#111' },
  subtitle: { fontSize: 12, color: '#333', textAlign: 'center', marginTop: 6 },
  ratingBox: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  stars: { color: '#F2C94C', fontSize: 12 },
  section: { paddingHorizontal: 20, marginTop: 16 },
  sectionTitle: { fontSize: 14, fontWeight: '600', color: '#111', marginBottom: 8, textAlign: 'center' },
  portfolioGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  portfolioItem: {
    width: '30%',
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  sectionText: { color: '#333', fontSize: 12, lineHeight: 18, textAlign: 'center' },
});
