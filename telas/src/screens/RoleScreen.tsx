import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoleScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/Logo.png')} 
          style={styles.logoImage} 
          resizeMode="contain" 
        />
        <Text style={styles.title}>Como você deseja utilizar o app?</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('RegisterClient')} // Nome exato do Stack
        >
          <Text style={styles.buttonText}>Quero Contratar Serviços</Text>
          <Text style={styles.buttonSubText}>Buscar profissionais e fazer orçamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('RegisterPro')} // Nome exato do Stack
        >
          <Text style={styles.buttonText}>Quero Oferecer Serviços</Text>
          <Text style={styles.buttonSubText}>Divulgar meu trabalho e conseguir clientes</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Voltar para o início</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 40 },
  content: { alignItems: 'center', marginTop: 20 },
  logoImage: { width: 230, height: 80, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#111', paddingHorizontal: 30, marginTop: 20 },
  buttons: { width: '100%', paddingHorizontal: 30, gap: 20 },
  button: { backgroundColor: '#A0A4AB', borderRadius: 15, padding: 20, alignItems: 'center', borderWidth: 1, borderColor: '#8A8E95' },
  buttonText: { color: '#222', fontSize: 18, fontWeight: 'bold' },
  buttonSubText: { color: '#555', fontSize: 12, marginTop: 4, textAlign: 'center' },
  linkText: { color: '#007AFF', fontSize: 15, fontWeight: '600' }
});