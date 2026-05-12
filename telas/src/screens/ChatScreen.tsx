import React from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextInput style={styles.searchInput} placeholder="Digite o nome do contato" />
      </View>

      <ScrollView>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <View key={item} style={styles.chatItem}>
            <View style={styles.avatar} />
            <View style={styles.chatInfo}>
              <Text style={styles.chatName}>Nome do Contato</Text>
              <Text style={styles.chatMessage} numberOfLines={1}>Última mensagem enviada aqui...</Text>
            </View>
            <View style={styles.metaInfo}>
              <Text style={styles.time}>20:12</Text>
              <View style={styles.badge}><Text style={styles.badgeText}>1</Text></View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  header: { padding: 20 },
  searchInput: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 25, height: 45, paddingHorizontal: 20 },
  chatItem: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#eee', alignItems: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc', marginRight: 15 },
  chatInfo: { flex: 1 },
  chatName: { fontWeight: 'bold', fontSize: 16, marginBottom: 3 },
  chatMessage: { fontSize: 12, color: '#666' },
  metaInfo: { alignItems: 'flex-end' },
  time: { fontSize: 10, color: '#999', marginBottom: 5 },
  badge: { backgroundColor: '#ccc', borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  badgeText: { fontSize: 10, color: '#333' }
});