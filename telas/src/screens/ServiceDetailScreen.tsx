import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { API_URL } from '../config'; 

export default function ServiceDetailScreen({ navigation }: any) {
  const [userType, setUserType] = useState<string | null>(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  // Estados para o Modal de Agendamento
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  // Lista de horários disponíveis para o cliente escolher
  const listaHorarios = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadUserDataAndServices();
    }
  }, [isFocused]);

  const loadUserDataAndServices = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('@token_jwt');
      const storedUserType = await AsyncStorage.getItem('@user_type'); 
      setUserType(storedUserType);
      
      console.log("Perfil logado detectado no celular:", storedUserType);

      const response = await fetch(`${API_URL}/api/profissional/servicos`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true"
        }
      });

      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        Alert.alert("Erro", "Erro ao buscar serviços do backend.");
      }
    } catch (error) {
      Alert.alert("Erro de conexão", "Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleAbrirAgendamento = (servico: any) => {
    setSelectedService(servico);
    setModalVisible(true);
  };

  const handleConfirmarHorario = async (horarioEscolhido: string) => {
    try {
      const token = await AsyncStorage.getItem('@token_jwt');
      
      // Validação da URL para não duplicar barras com o Ngrok
      const urlFinal = API_URL.endsWith('/') ? `${API_URL}api/servicos/agendar` : `${API_URL}/api/servicos/agendar`;
      
      const response = await fetch(urlFinal, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          servicoId: Number(selectedService.id),
          horario: String(horarioEscolhido).trim()
        })
      });

      // Captura o texto bruto primeiro para checar se é HTML antes de parsear JSON
      const respostaTexto = await response.text();
      
      if (respostaTexto.startsWith("<!DOCTYPE") || respostaTexto.startsWith("<html")) {
        Alert.alert("Erro no Servidor 🖥️", "O backend devolveu uma página HTML. Verifique se a rota POST existe ou se há conflito de caminhos.");
        return;
      }

      const data = JSON.parse(respostaTexto);

      if (response.ok) {
        Alert.alert("Sucesso 🎉", "Seu horário foi agendado com sucesso!");
        setModalVisible(false);
      } else {
        Alert.alert("Horário Indisponível ❌", data.message || "Erro ao agendar.");
      }
    } catch (error: any) {
      Alert.alert("Erro Técnico Real 🛠️", error.message || String(error));
    }
  };

  const filteredServices = services.filter((s: any) => 
    s.nome?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar serviço..."
        value={search}
        onChangeText={setSearch}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#333" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={filteredServices}
          keyExtractor={(item: any) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 90 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.serviceName}>{item.nome}</Text>
                <Text style={styles.serviceDesc}>{item.descricao}</Text>
                <Text style={styles.servicePrice}>
                  R$ {parseFloat(item.preco).toFixed(2)} • <Text style={styles.serviceTime}>{item.tempoEstimado || item.tempo_estimado}</Text>
                </Text>
              </View>
              
              {/* Botão livre para testes: Sempre visível */}
              <TouchableOpacity style={styles.contractButton} onPress={() => handleAbrirAgendamento(item)}>
                <Text style={styles.contractButtonText}>Agendar</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Nenhum serviço disponível no momento.</Text>
          }
        />
      )}

      {/* MODAL PARA ESCOLHER HORÁRIOS */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha um Horário</Text>
            <Text style={styles.modalSubtitle}>Serviço: {selectedService?.nome}</Text>

            <View style={styles.gridHorarios}>
              {listaHorarios.map((horario) => (
                <TouchableOpacity 
                  key={horario} 
                  style={styles.horarioCard} 
                  onPress={() => handleConfirmarHorario(horario)}
                >
                  <Text style={styles.horarioText}>{horario}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Botão flutuante '+' visível apenas se for prestador */}
      {userType?.toLowerCase() === 'prestador' && (
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateProService')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 20, paddingTop: 10 },
  searchBar: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 20, marginTop: 10 },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#EAEAEA', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2, shadowOffset: { width: 0, height: 1 } },
  cardContent: { flex: 1, marginRight: 10 },
  serviceName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  serviceDesc: { fontSize: 13, color: '#666', marginVertical: 4 },
  servicePrice: { fontSize: 14, fontWeight: '700', color: '#444' },
  serviceTime: { fontWeight: 'normal', color: '#777' },
  contractButton: { backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  contractButtonText: { color: '#FFF', fontSize: 13, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 40 },
  fab: { position: 'absolute', width: 60, height: 60, right: 20, bottom: 20, backgroundColor: '#222', borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  fabText: { fontSize: 30, color: 'white', lineHeight: 32 },
  
  // Estilos do Modal Corrigidos
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 25, minHeight: 300 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 5, textAlign: 'center' },
  modalSubtitle: { fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' },
  gridHorarios: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 20 },
  horarioCard: { backgroundColor: '#EFEFEF', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, width: '28%', alignItems: 'center' },
  horarioText: { fontSize: 15, fontWeight: '600', color: '#333' },
  closeModalButton: { marginTop: 10, padding: 15, alignItems: 'center' },
  closeModalButtonText: { color: '#FF3B30', fontSize: 16, fontWeight: '600' }
});