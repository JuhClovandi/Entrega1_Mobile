import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native'; // 👈 IMPORTANTE: Monitora o retorno para esta tela

export default function WelcomeScreen({ navigation }: any) {
  const isFocused = useIsFocused();

  useEffect(() => {
  const verificarSessao = async () => {
    const token = await AsyncStorage.getItem('@token_jwt');
    if (token) {
      navigation.navigate('main'); 
    }
  };

  if (isFocused) {
    verificarSessao();
  }
}, [isFocused, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image 
          source={require('../../assets/images/Logo.png')} 
          style={styles.logoImage} 
          resizeMode="contain" 
        />
        <Text style={styles.subtitle}>Conectando você{'\n'}ao serviço certo</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RoleScreen')}>
          <Text style={styles.buttonText}>Criar conta</Text>
        </TouchableOpacity>

        {/* 🛠️ Ajustado para bater no nome correto da sua tela de Login */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Termos de uso | Política de privacidade</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 40 },
  content: { alignItems: 'center', marginTop: 40 },
  logoImage: { width: 276, height: 96, marginBottom: 10 },
  subtitle: { fontSize: 35, textAlign: 'center', color: '#111', marginTop: 35, marginBottom: 40 },
  buttons: { width: '100%', paddingHorizontal: 40, gap: 15 },
  button: { backgroundColor: '#A0A4AB', borderRadius: 25, height: 50, justifyContent: 'center', alignItems: 'center' },
  buttonText: { color: '#333', fontSize: 16 },
  footer: { fontSize: 10, color: '#666' }
});