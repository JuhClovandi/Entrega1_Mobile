import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

export default function RequestServiceScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.headerTitle}>Solicitar Serviço</Text>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
           <View style={styles.avatar} />
           <View>
             <Text style={styles.name}>Ana <Text style={styles.rating}>⭐ 4.9</Text></Text>
             <Text style={styles.desc}>Técnica de T.I</Text>
           </View>
        </View>

        <Text style={styles.label}>O que você precisa? *</Text>
        <TextInput style={[styles.input, styles.textArea]} multiline placeholder="Descreva com detalhes..." />

        <Text style={styles.label}>Anexo de mídia:</Text>
        <View style={styles.mediaBox} />

        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Data:</Text>
            <TextInput style={styles.input} placeholder="00/00/0000" />
          </View>
          <View style={styles.halfWidth}>
            <Text style={styles.label}>Horário:</Text>
            <TextInput style={styles.input} placeholder="00:00" />
          </View>
        </View>

        <Text style={styles.label}>Local do Serviço:</Text>
        <TextInput style={[styles.input, { height: 80 }]} multiline />

        <Text style={styles.termsText}>Ao enviar, você concorda com os Termos de Uso</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Solicitar Orçamento</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  content: { padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  profileCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc', marginRight: 15 },
  name: { fontWeight: 'bold', fontSize: 16 },
  rating: { fontSize: 12, color: '#F2C94C' },
  desc: { fontSize: 12, color: '#666' },
  label: { fontSize: 12, color: '#666', marginBottom: 5 },
  input: { backgroundColor: '#A0A4AB', borderRadius: 15, paddingHorizontal: 15, marginBottom: 15, color: '#fff' },
  textArea: { height: 80, paddingTop: 10 },
  mediaBox: { backgroundColor: '#A0A4AB', height: 60, borderRadius: 15, marginBottom: 15 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfWidth: { width: '48%' },
  termsText: { fontSize: 10, textAlign: 'center', color: '#666', marginTop: 10, marginBottom: 10 },
  button: { backgroundColor: '#A0A4AB', borderRadius: 25, height: 50, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 16 }
});