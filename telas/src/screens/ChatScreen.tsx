import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const CHATS = [
  { id: '1', name: 'Ana Matias', message: 'Entendi...', time: '20:12', unread: '1' },
  { id: '2', name: 'Felipe dos Anjos', message: 'Nao poderei amanha e depois...', time: '21:30', unread: '' },
  { id: '3', name: 'Jurandir Siqueira', message: 'Nao vi ainda como esta funci...', time: '12:54', unread: '1' },
  { id: '4', name: 'Gustavo Matos', message: 'ate amanha te darei a resp...', time: '13:40', unread: '1' },
  { id: '5', name: 'Ana Clara', message: 'So estou disponivel em 5 dias...', time: '13:43', unread: '1' },
  { id: '6', name: 'Ana Escura', message: 'Verei como sera feito', time: '14:23', unread: '1' },
  { id: '7', name: 'Pedro Antonio', message: 'Ainda nao tive resposta dele...', time: '16:20', unread: '1' },
  { id: '8', name: 'Jose Maria', message: 'Sera que dara certo?', time: '17:13', unread: '1' },
  { id: '9', name: 'Maria Jose', message: 'Ola vamos prosseguir com o...', time: '18:12', unread: '1' },
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
            onPress={() => navigation.navigate('ChatDetail', { chatId: item.id })}
            activeOpacity={0.8}
          >
            <View style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage} numberOfLines={1}>{item.message}</Text>
            </View>
            <View style={styles.metaInfo}>
              <Text style={styles.time}>{item.time}</Text>
              {item.unread ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.unread}</Text>
                </View>
              ) : null}
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
  chatMessage: { fontSize: 10, color: '#666', marginTop: 2 },
  metaInfo: { alignItems: 'flex-end' },
  time: { fontSize: 10, color: '#333', marginBottom: 4 },
  badge: {
    backgroundColor: '#A0A4AB',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { fontSize: 10, color: '#111' },
});