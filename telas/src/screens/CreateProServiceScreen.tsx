import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../config'; 

export default function CreateProServiceScreen({ navigation }: any) {
  const [nomeServico, setNomeServico] = useState('');
  const [precoBase, setPrecoBase] = useState('');
  const [tempoEstimado, setTempoEstimado] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSaveService = async () => {
    if (!nomeServico.trim() || !precoBase.trim() || !tempoEstimado.trim() || !descricao.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos para catalogar seu serviço.");
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('@token_jwt');
      const precoConvertido = parseFloat(precoBase.replace(',', '.'));
      
      if (isNaN(precoConvertido)) {
        Alert.alert("Erro", "Por favor, insira um valor numérico válido para o preço.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/profissional/servicos`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        },
        body: JSON.stringify({ 
          nome: nomeServico.trim(), 
          preco: precoConvertido, 
          tempo_estimado: tempoEstimado.trim(), 
          descricao: descricao.trim()
        }),
      });

      const textResponse = await response.text(); 
      let data;
      
      try {
        data = JSON.parse(textResponse);
      } catch {
        console.error("⚠️ Erro no parsing. Resposta bruta do servidor:\n", textResponse);
        Alert.alert("Erro no Servidor", "Ocorreu um problema ao salvar os dados no banco backend.");
        setLoading(false);
        return;
      }

      if (response.ok) {
        Alert.alert("Sucesso", "Serviço adicionado ao seu catálogo com sucesso!");
        
        const newProfessional = {
          id: data?.id ? String(data.id) : String(Date.now()), 
          name: nomeServico.trim(), 
          description: descricao.trim(),
          rating: '5.0', 
          distance: 'Preço: R$ ' + precoConvertido.toFixed(2), 
          avatar: null
        };

        // Limpa o formulário antes de voltar
        setNomeServico('');
        setPrecoBase('');
        setTempoEstimado('');
        setDescricao('');
        
        // 🚀 SOLUÇÃO BLINDADA: Em vez de adivinhar o nome da tela anterior, passamos os parâmetros
        // para a rota que chamou esta tela usando navigate({ merge: true }) combinado com goBack()
        navigation.navigate({
          name: navigation.getState().routes[navigation.getState().index - 1]?.name, 
          params: { newProfessional },
          merge: true,
        });

      } else {
        Alert.alert("Erro", data.message || "Não foi possível salvar o serviço.");
      }
    } catch (error) {
      console.error("Erro na requisição de salvar serviço:", error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Oferecer Novo Serviço</Text>
      <Text style={styles.subtitle}>Adicione serviços ao seu perfil para que os clientes possam te contratar</Text>

      <Text style={styles.label}>Nome do Serviço</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Vulcanização de Pneu, Alinhamento"
        value={nomeServico}
        onChangeText={setNomeServico}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Preço Base (R$)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 80,00"
            value={precoBase}
            onChangeText={setPrecoBase}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.column}>
          <Text style={styles.label}>Tempo Estimado</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 40 min, 2h"
            value={tempoEstimado}
            onChangeText={setTempoEstimado} 
          />
        </View>
      </View>

      <Text style={styles.label}>O que está incluso no serviço?</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Explique detalhadamente o que você faz neste serviço, garantia, ou se atende a domicílio..."
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveService} disabled={loading}>
        {loading ? <ActivityIndicator color="#333" /> : <Text style={styles.buttonText}>Adicionar ao meu Perfil</Text>}
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelButtonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f5f5f5', flexGrow: 1, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', marginTop: 10 },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 25, paddingHorizontal: 15 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 5, marginLeft: 5 },
  input: { backgroundColor: '#FFF', padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#DDD' },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 15 },
  column: { flex: 1 },
  textArea: { height: 110, textAlignVertical: 'top' },
  button: { backgroundColor: '#A0A4AB', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 10, height: 50, justifyContent: 'center' },
  buttonText: { color: '#333', fontSize: 16, fontWeight: 'bold' },
  cancelButton: { alignItems: 'center', marginTop: 15 },
  cancelButtonText: { color: '#666', fontSize: 15 }
});