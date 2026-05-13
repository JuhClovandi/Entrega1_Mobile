import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const CHAT_THREADS: Record<string, { name: string; messages: { from: 'me' | 'them'; text: string; time: string }[] }> = {
  '1': {
    name: 'Ana Matias',
    messages: [
      { from: 'them', text: 'Ola! Vi que voce solicitou um servico de TI. Como posso te ajudar?', time: '13:00' },
      { from: 'me', text: 'Oi! Meu computador nao esta conectando na rede, ja tentei reiniciar e nao resolveu.', time: '13:01' },
      { from: 'them', text: 'Entendi. A rede cabeada ou Wi-Fi? E aparece alguma mensagem de erro na tela?', time: '13:01' },
      { from: 'me', text: 'Wi-Fi. Aparece "sem acesso a internet" mas o roteador esta ligado.', time: '13:02' },
      { from: 'them', text: 'Provavelmente problema no driver ou configuracao de IP. Consigo resolver por acesso remoto ou presencialmente. Qual prefere?', time: '13:05' },
      { from: 'me', text: 'Presencial fica melhor. Tem disponibilidade hoje a tarde?', time: '13:07' },
      { from: 'them', text: 'Tenho sim! Posso ir as 16h. Me manda o endereco.', time: '13:07' },
      { from: 'me', text: 'Rua das Acacias, 342, Bairro Santo Andre, BH.', time: '13:11' },
      { from: 'them', text: 'Anotado! Estarei la as 16h. O valor da visita tecnica e R$80, e caso precise de pecas, passo o orcamento na hora. Ate logo!', time: '13:11' },
      { from: 'me', text: 'Otimo, obrigado! Te aguardo.', time: '13:12' },
    ],
  },
  '2': {
    name: 'Felipe dos Anjos',
    messages: [
      { from: 'them', text: 'Nao poderei amanha e depois...', time: '21:30' },
      { from: 'me', text: 'Tudo bem, podemos remarcar.', time: '21:31' },
    ],
  },
  '3': {
    name: 'Jurandir Siqueira',
    messages: [
      { from: 'them', text: 'Nao vi ainda como esta funcionando...', time: '12:54' },
      { from: 'me', text: 'Sem problema, me avise quando tiver retorno.', time: '12:55' },
    ],
  },
};

export default function ChatDetailScreen({ navigation, route }: any) {
  const chatId = route?.params?.chatId ?? '1';
  const chat = CHAT_THREADS[chatId] ?? CHAT_THREADS['1'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <View style={styles.avatar} />
        <Text style={styles.name}>{chat.name}</Text>
        <Text style={styles.callIcon}>📞</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.dayLabel}>Hoje</Text>
        {chat.messages.map((msg, index) => (
          <View
            key={`${msg.time}-${index}`}
            style={[styles.bubble, msg.from === 'me' ? styles.bubbleMe : styles.bubbleThem]}
          >
            <Text style={styles.bubbleText}>{msg.text}</Text>
            <Text style={styles.time}>{msg.time}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabBar}>
        {[
          { label: 'Home', icon: '🏠', screen: 'Home' },
          { label: 'Serviços', icon: '🗓️', screen: 'Serviços' },
          { label: 'Histórico', icon: '📋', screen: 'Histórico' },
          { label: 'Chat', icon: '💬', screen: 'Chat' },
          { label: 'Perfil', icon: '👤', screen: 'Perfil' },
        ].map((item) => (
          <TouchableOpacity
            key={item.screen}
            style={styles.tabItem}
            onPress={() => navigation.navigate('Main', { screen: item.screen })}
            activeOpacity={0.7}
          >
            <Text style={styles.tabIcon}>{item.icon}</Text>
            <Text style={styles.tabLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  backButton: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center', marginRight: 6 },
  backIcon: { fontSize: 18, color: '#111' },
  avatar: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#ccc', marginRight: 8 },
  name: { flex: 1, fontSize: 12, fontWeight: '600', color: '#111' },
  callIcon: { fontSize: 16, color: '#111' },
  content: { padding: 12, paddingBottom: 80 },
  dayLabel: { textAlign: 'center', fontSize: 11, color: '#666', marginBottom: 10 },
  bubble: {
    maxWidth: '78%',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  bubbleThem: { backgroundColor: '#D9D9D9', alignSelf: 'flex-start' },
  bubbleMe: { backgroundColor: '#E6E6E6', alignSelf: 'flex-end' },
  bubbleText: { fontSize: 11, color: '#111' },
  time: { fontSize: 9, color: '#666', marginTop: 4, alignSelf: 'flex-end' },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#A0A4AB',
    height: 62,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#90949B',
  },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  tabIcon: { fontSize: 18, color: '#111', marginBottom: 2 },
  tabLabel: { fontSize: 11, color: '#111' },
});
