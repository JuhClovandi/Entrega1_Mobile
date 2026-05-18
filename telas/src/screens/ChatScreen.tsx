import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Image } from 'react-native';

const CHATS = [
  { id: '1', name: 'Ana Matias', job: 'Técnica em TI', phone: '5531999990001', avatar: require('../../assets/images/FotoPerfil.png') },
  { id: '2', name: 'Felipe dos Anjos', job: 'Eletricista residencial', phone: '5531999990002', avatar: require('../../assets/images/FotoFelipe.png') },
  { id: '3', name: 'Jurandir Siqueira', job: 'Encanador', phone: '5531999990003', avatar: require('../../assets/images/FotoJurandir.png') },
  { id: '4', name: 'Gustavo Matos', job: 'Montador de móveis', phone: '5531999990004', avatar: require('../../assets/images/FotoGustavo.png') },
  { id: '5', name: 'Ana Clara', job: 'Diarista', phone: '5531999990005', avatar: require('../../assets/images/FotoAnaClara.png') },
  { id: '6', name: 'Ana Escura', job: 'Pintora', phone: '5531999990006', avatar: require('../../assets/images/FotoAnaEscura.png') },
  { id: '7', name: 'Pedro Antonio', job: 'Jardineiro', phone: '5531999990007', avatar: require('../../assets/images/FotoPedroAntonio.png') },
  { id: '8', name: 'Jose Maria', job: 'Técnico de ar condicionado', phone: '5531999990008', avatar: require('../../assets/images/FotoJose.png') },
  { id: '9', name: 'Maria Jose', job: 'Costureira', phone: '5531999990009', avatar: require('../../assets/images/FotoMariaJose.png') },
];

export default function ChatScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Digite o nome do contato"
            placeholderTextColor="#6E7681"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {CHATS.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.chatCard}
            onPress={() =>
              navigation.navigate('ChatDetail', {
                chatId: item.id,
                name: item.name,
                job: item.job,
                phone: item.phone,
              })
            }
            activeOpacity={0.8}
          >
            <Image source={item.avatar} style={styles.avatar} resizeMode="cover" />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatJob} numberOfLines={1}>{item.job}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A0A4AB',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  backButton: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  backIcon: { fontSize: 18, color: '#111', marginRight: 8 },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    height: 34,
    paddingHorizontal: 10,
  },
  searchIcon: { fontSize: 12, color: '#333', marginRight: 6 },
  searchInput: { flex: 1, fontSize: 12, color: '#333' },
  list: { padding: 10, paddingBottom: 20 },
  chatCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ccc', marginRight: 10 },
  chatInfo: { flex: 1 },
  chatName: { fontWeight: '600', fontSize: 12, color: '#111' },
  chatJob: { fontSize: 10, color: '#666', marginTop: 2 },
});