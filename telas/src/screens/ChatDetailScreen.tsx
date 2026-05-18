import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity, Linking, Image } from 'react-native';

const PROFILES: Record<string, { name: string; job: string; phone: string; avatar: any }> = {
  '1': { name: 'Ana Matias', job: 'Técnica em TI', phone: '5531999990001', avatar: require('../../assets/images/FotoPerfil.png') },
  '2': { name: 'Felipe dos Anjos', job: 'Eletricista residencial', phone: '5531999990002', avatar: require('../../assets/images/FotoFelipe.png') },
  '3': { name: 'Jurandir Siqueira', job: 'Encanador', phone: '5531999990003', avatar: require('../../assets/images/FotoJurandir.png') },
  '4': { name: 'Gustavo Matos', job: 'Montador de móveis', phone: '5531999990004', avatar: require('../../assets/images/FotoGustavo.png') },
  '5': { name: 'Ana Clara', job: 'Diarista', phone: '5531999990005', avatar: require('../../assets/images/FotoAnaClara.png') },
  '6': { name: 'Ana Escura', job: 'Pintora', phone: '5531999990006', avatar: require('../../assets/images/FotoAnaEscura.png') },
  '7': { name: 'Pedro Antonio', job: 'Jardineiro', phone: '5531999990007', avatar: require('../../assets/images/FotoPedroAntonio.png') },
  '8': { name: 'Jose Maria', job: 'Técnico de ar condicionado', phone: '5531999990008', avatar: require('../../assets/images/FotoJose.png') },
  '9': { name: 'Maria Jose', job: 'Costureira', phone: '5531999990009', avatar: require('../../assets/images/FotoMariaJose.png') },
};

export default function ChatDetailScreen({ navigation, route }: any) {
  const chatId = route?.params?.chatId ?? '1';
  const profile = PROFILES[chatId] ?? PROFILES['1'];
  const name = route?.params?.name ?? profile.name;
  const job = route?.params?.job ?? profile.job;
  const phone = route?.params?.phone ?? profile.phone;
  const avatar = route?.params?.avatar ?? profile.avatar;

  const openWhatsApp = () => {
    const digitsOnly = String(phone).replace(/\D/g, '');
    const url = `https://wa.me/${digitsOnly}`;
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={avatar} style={styles.avatar} resizeMode="cover" />
        <Text style={styles.name}>{name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.roleLabel}>{job}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.sectionText}>Perfil do profissional com descrição e detalhes do serviço.</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contato</Text>
          <Text style={styles.sectionText}>Telefone: {phone}</Text>
        </View>
        <TouchableOpacity style={styles.whatsButton} onPress={openWhatsApp} activeOpacity={0.8}>
          <Text style={styles.whatsButtonText}>Abrir WhatsApp</Text>
        </TouchableOpacity>
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
  content: { padding: 16, paddingBottom: 80 },
  roleLabel: { fontSize: 12, color: '#666', marginBottom: 14, textAlign: 'center' },
  section: { marginBottom: 16, backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#333' },
  sectionTitle: { fontSize: 12, fontWeight: '600', color: '#111', marginBottom: 6 },
  sectionText: { fontSize: 11, color: '#333' },
  whatsButton: {
    backgroundColor: '#25D366',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  whatsButtonText: { color: '#fff', fontSize: 12, fontWeight: '600' },
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
