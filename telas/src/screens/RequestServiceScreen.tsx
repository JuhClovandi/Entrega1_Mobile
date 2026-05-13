import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function RequestServiceScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solicitar Servico</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatar} />
          <View style={styles.profileInfo}>
            <View style={styles.profileRow}>
              <Text style={styles.name}>Ana</Text>
              <Text style={styles.rating}>* 4.9</Text>
            </View>
            <Text style={styles.desc}>Tecnica de T.I especializada em hardware e redes.</Text>
          </View>
          <Text style={styles.distance}>a 1.8km de voce</Text>
        </View>

        <Text style={styles.label}>O que voce precisa? *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          placeholder="Descreva com detalhes o servico que voce precisa..."
          placeholderTextColor="#6E7681"
        />

        <Text style={styles.label}>Anexo de midia:</Text>
        <View style={styles.mediaBox} />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Data:</Text>
            <TextInput
              style={styles.inputSmall}
              placeholder="00/00/0000"
              placeholderTextColor="#6E7681"
            />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Horario:</Text>
            <TextInput
              style={styles.inputSmall}
              placeholder="00:00"
              placeholderTextColor="#6E7681"
            />
          </View>
        </View>

        <Text style={styles.label}>Local do Servico:</Text>
        <TextInput
          style={[styles.input, styles.locationBox]}
          multiline
          placeholderTextColor="#6E7681"
        />

        <Text style={styles.termsText}>Ao enviar, voce concorda com os Termos de Uso</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Main', { screen: 'Chat' })}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Solicitar Orcamento</Text>
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
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#3B82F6',
  },
  backButton: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
  backIcon: { fontSize: 18, color: '#333' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#333' },
  headerSpacer: { width: 36 },
  content: { padding: 20 },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 14,
    padding: 10,
    marginBottom: 20,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#ccc', marginRight: 10 },
  profileInfo: { flex: 1 },
  profileRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  name: { fontWeight: '600', fontSize: 14, color: '#111' },
  rating: { fontSize: 12, color: '#F2C94C' },
  desc: { fontSize: 11, color: '#666', marginTop: 2 },
  distance: { fontSize: 10, color: '#666' },
  label: { fontSize: 12, color: '#666', marginBottom: 6, marginLeft: 4 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    paddingHorizontal: 16,
    color: '#333',
    marginBottom: 16,
  },
  textArea: { height: 70, paddingTop: 12 },
  mediaBox: { backgroundColor: '#A0A4AB', height: 50, borderRadius: 20, marginBottom: 16 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfWidth: { width: '48%' },
  inputSmall: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 20,
    height: 36,
    textAlign: 'center',
    color: '#333',
    paddingTop: 4,
    marginBottom: 16,
  },
  locationBox: { height: 70, paddingTop: 12 },
  termsText: { fontSize: 11, textAlign: 'center', color: '#666', marginTop: 6, marginBottom: 14 },
  button: {
    backgroundColor: '#A0A4AB',
    borderRadius: 24,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: { fontSize: 14, color: '#333' },
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