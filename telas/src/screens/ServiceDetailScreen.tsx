import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, Alert, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { API_URL } from '../config'; 

const CHIPS_CATEGORIAS = [
  { id: 'todos', label: 'Todos ✨' },
  { id: 'limpeza', label: 'Limpeza 🧹' },
  { id: 'manutencao', label: 'Manutenção 🛠️' },
  { id: 'tecnologia', label: 'Tecnologia 💻' },
  { id: 'ensino', label: 'Ensino 📚' },
  { id: 'saude', label: 'Saúde 🩺' }
];

export default function ServiceDetailScreen({ route, navigation }: any) {
  const [userType, setUserType] = useState<string | null>(null);
  const [services, setServices] = useState([]);
  const [bookings, setBookings] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [subAbaAtiva, setSubAbaAtiva] = useState<'servicos' | 'agendamentos'>('servicos');

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const listaHorarios = ["08:00", "09:30", "11:00", "14:00", "15:30", "17:00"];
  const isFocused = useIsFocused();

  useEffect(() => {
    if (route?.params?.categoriaSelecionada) {
      setCategoriaAtiva(route.params.categoriaSelecionada);
      setSubAbaAtiva('servicos'); 
    } else {
      setCategoriaAtiva('todos');
    }
  }, [route?.params?.categoriaSelecionada, isFocused]);

  useEffect(() => {
    if (isFocused) {
      const loadAllData = async () => {
        try {
          setLoading(true);
          const token = await AsyncStorage.getItem('@token_jwt');
          const storedUserType = await AsyncStorage.getItem('@user_type'); 
          setUserType(storedUserType);

          if (subAbaAtiva === 'servicos') {
            const response = await fetch(`${API_URL}/api/profissional/servicos`, {
              method: "GET",
              headers: { "Authorization": `Bearer ${token}`, "ngrok-skip-browser-warning": "true" }
            });
            if (response.ok) setServices(await response.json());
          } else {
            const response = await fetch(`${API_URL}/api/servicos/agendados`, {
              method: "GET",
              headers: { "Authorization": `Bearer ${token}`, "ngrok-skip-browser-warning": "true" }
            });
            if (response.ok) setBookings(await response.json());
          }
        } catch (err) {
          console.error("Erro ao carregar dados do servidor:", err);
        } finally {
          setLoading(false);
        }
      };

      loadAllData();
    }
  }, [isFocused, subAbaAtiva]); 

  const handleAbrirAgendamento = (servico: any) => {
    setSelectedService(servico);
    setModalVisible(true);
  };

  const handleConfirmarHorario = async (horarioEscolhido: string) => {
    try {
      const token = await AsyncStorage.getItem('@token_jwt');
      const urlFinal = API_URL.endsWith('/') ? `${API_URL}api/servicos/agendar` : `${API_URL}/api/servicos/agendar`;
      
      const response = await fetch(urlFinal, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          servicoId: Number(selectedService.id),
          horario: String(horarioEscolhido).trim()
        })
      });

      if (response.ok) {
        Alert.alert("Sucesso 🎉", "Seu horário foi agendado com sucesso!");
        setModalVisible(false);
        setSubAbaAtiva('agendamentos'); 
      } else {
        Alert.alert("Horário Indisponível ❌", "Erro ao agendar.");
      }
    } catch (err) {
      Alert.alert("Erro Técnico", "Falha ao processar a requisição de agendamento.");
    }
  };

  const handleExcluirServico = async (servicoId: number) => {
    Alert.alert("Excluir Serviço", "Deseja remover este serviço permanentemente do catálogo?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('@token_jwt');
            const response = await fetch(`${API_URL}/api/profissional/servicos/${servicoId}`, {
              method: "DELETE",
              headers: { "Authorization": `Bearer ${token}`, "ngrok-skip-browser-warning": "true" }
            });
            if (response.ok) {
              Alert.alert("Sucesso 🎉", "Serviço excluído.");
              // Simula um toggle rápido para re-disparar o useEffect de carregamento
              setSubAbaAtiva('servicos');
            }
          } catch (err) { 
            Alert.alert("Erro", "Falha na conexão com o servidor."); 
          }
        }
      }
    ]);
  };

  const handleCancelarAgendamento = async (agendamentoId: number) => {
    Alert.alert("Cancelar Agendamento", "Deseja remover permanentemente este horário agendado?", [
      { text: "Voltar", style: "cancel" },
      { text: "Confirmar", style: "destructive", onPress: async () => {
          try {
            const token = await AsyncStorage.getItem('@token_jwt');
            const response = await fetch(`${API_URL}/api/servicos/agendar/${agendamentoId}`, {
              method: "DELETE",
              headers: { "Authorization": `Bearer ${token}`, "ngrok-skip-browser-warning": "true" }
            });
            if (response.ok) {
              Alert.alert("Cancelado 🟢", "Agendamento excluído com sucesso.");
              // Simula um toggle rápido para re-disparar o useEffect de carregamento
              setSubAbaAtiva('agendamentos');
            } else {
              Alert.alert("Erro", "Não foi possível cancelar o agendamento.");
            }
          } catch (err) { 
            Alert.alert("Erro", "Falha na conexão com o servidor."); 
          }
        }
      }
    ]);
  };

  const filteredServices = services.filter((s: any) => {
    const matchTexto = s.nome?.toLowerCase().includes(search.toLowerCase());
    const matchCategoria = categoriaAtiva === 'todos' || 
      (s.categoria && s.categoria.toLowerCase().trim() === categoriaAtiva.toLowerCase().trim());
    return matchTexto && matchCategoria;
  });

  return (
    <View style={styles.container}>
      
      {/* SELETOR DE SUB-ABAS SUPERIOR */}
      <View style={styles.subAbaContainer}>
        <TouchableOpacity 
          style={[styles.subAbaButton, subAbaAtiva === 'servicos' && styles.subAbaButtonActive]}
          onPress={() => setSubAbaAtiva('servicos')}
        >
          <Text style={[styles.subAbaText, subAbaAtiva === 'servicos' && styles.subAbaTextActive]}>Serviços</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.subAbaButton, subAbaAtiva === 'agendamentos' && styles.subAbaButtonActive]}
          onPress={() => setSubAbaAtiva('agendamentos')}
        >
          <Text style={[styles.subAbaText, subAbaAtiva === 'agendamentos' && styles.subAbaTextActive]}>Agendamentos 🗓️</Text>
        </TouchableOpacity>
      </View>

      {subAbaAtiva === 'servicos' ? (
        <>
          <TextInput
            style={styles.searchBar}
            placeholder="Buscar serviço por nome..."
            value={search}
            onChangeText={setSearch}
          />

          {/* BARRA DE SELEÇÃO DE FILTROS HORIZONTAL */}
          <View style={{ maxHeight: 50, marginBottom: 15 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterContainer}>
              {CHIPS_CATEGORIAS.map((chip) => {
                const isSelected = categoriaAtiva === chip.id;
                return (
                  <TouchableOpacity
                    key={chip.id}
                    style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                    onPress={() => setCategoriaAtiva(chip.id)}
                  >
                    <Text style={[styles.filterText, isSelected && styles.filterTextSelected]}>
                      {chip.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

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
                    {item.categoria && (
                      <View style={styles.badgeContainer}>
                        <Text style={styles.categoryBadge}>{item.categoria.toUpperCase()}</Text>
                      </View>
                    )}
                    <Text style={styles.serviceDesc}>{item.descricao}</Text>
                    <Text style={styles.servicePrice}>
                      R$ {parseFloat(item.preco).toFixed(2)} • <Text style={styles.serviceTime}>{item.tempoEstimado || item.tempo_estimado}</Text>
                    </Text>
                  </View>
                  
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity style={styles.contractButton} onPress={() => handleAbrirAgendamento(item)}>
                      <Text style={styles.contractButtonText}>Agendar</Text>
                    </TouchableOpacity>

                    {userType?.toLowerCase() === 'prestador' && (
                      <TouchableOpacity style={[styles.contractButton, styles.deleteButton]} onPress={() => handleExcluirServico(item.id)}>
                        <Text style={styles.contractButtonText}>Excluir 🗑️</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
              ListEmptyComponent={<Text style={styles.emptyText}>Nenhum serviço encontrado.</Text>}
            />
          )}
        </>
      ) : (
        /* SUB-ABA DE LISTAGEM DE AGENDAMENTOS MUDADA PARA SER DINÂMICA */
        loading ? (
          <ActivityIndicator size="large" color="#333" style={{ flex: 1 }} />
        ) : (
          <FlatList
            data={bookings}
            keyExtractor={(item: any) => String(item.agendamentos?.id || item.id)}
            contentContainerStyle={{ paddingBottom: 90 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardContent}>
                  
                  {/* Busca as variações do join do banco relacional para mostrar o nome real do serviço marcado */}
                  <Text style={styles.serviceName}>
                    {item.nomeServico || item.servicos?.nome || item.servico?.nome || (item.nome ? item.nome : "Serviço Contratado")}
                  </Text>
                  
                  <Text style={styles.serviceDesc}>
                    ⏰ Horário Marcado: {item.agendamentos?.horario || item.horario}
                  </Text>
                  
                  <Text style={[
                    styles.bookingStatus, 
                    (item.agendamentos?.status === 'agendado' || item.status === 'agendado') && { color: '#22C55E' }
                  ]}>
                    STATUS: {(item.agendamentos?.status || item.status || 'CONFIRMADO').toUpperCase()}
                  </Text>
                </View>
                
                <View style={styles.actionsContainer}>
                  <TouchableOpacity 
                    style={[styles.contractButton, styles.deleteButton]} 
                    onPress={() => handleCancelarAgendamento(item.agendamentos?.id || item.id)}
                  >
                    <Text style={styles.contractButtonText}>Cancelar ❌</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum horário marcado encontrado.</Text>}
          />
        )
      )}

      {/* MODAL PARA ESCOLHER HORÁRIOS */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Escolha um Horário</Text>
            <Text style={styles.modalSubtitle}>Serviço: {selectedService?.nome}</Text>

            <View style={styles.gridHorarios}>
              {listaHorarios.map((horario) => (
                <TouchableOpacity key={horario} style={styles.horarioCard} onPress={() => handleConfirmarHorario(horario)}>
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

      {userType?.toLowerCase() === 'prestador' && subAbaAtiva === 'servicos' && (
        <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateProService')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', paddingHorizontal: 20, paddingTop: 10 },
  subAbaContainer: { flexDirection: 'row', backgroundColor: '#E0E4EC', borderRadius: 10, padding: 4, marginBottom: 15, marginTop: 5 },
  subAbaButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  subAbaButtonActive: { backgroundColor: '#FFF', elevation: 2 },
  subAbaText: { fontSize: 14, fontWeight: '600', color: '#666' },
  subAbaTextActive: { color: '#111', fontWeight: 'bold' },
  searchBar: { backgroundColor: '#FFF', padding: 15, borderRadius: 15, borderWidth: 1, borderColor: '#E0E0E0', marginBottom: 15 },
  filterContainer: { paddingHorizontal: 5, gap: 10, height: 40, alignItems: 'center' },
  filterChip: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#DDD', justifyContent: 'center' },
  filterChipSelected: { backgroundColor: '#333', borderColor: '#333' },
  filterText: { color: '#555', fontSize: 13, fontWeight: '500' },
  filterTextSelected: { color: '#FFF', fontWeight: 'bold' },
  badgeContainer: { flexDirection: 'row', marginTop: 4, marginBottom: 4 },
  categoryBadge: { fontSize: 10, fontWeight: 'bold', color: '#FFF', backgroundColor: '#333', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 5 },
  card: { backgroundColor: '#FFF', padding: 15, borderRadius: 12, marginBottom: 15, borderWidth: 1, borderColor: '#EAEAEA', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', elevation: 1 },
  cardContent: { flex: 1, marginRight: 10 },
  serviceName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  serviceDesc: { fontSize: 13, color: '#666', marginVertical: 4 },
  servicePrice: { fontSize: 14, fontWeight: '700', color: '#444' },
  serviceTime: { fontWeight: 'normal', color: '#777' },
  bookingStatus: { fontSize: 12, fontWeight: 'bold', color: '#007AFF', marginTop: 5 },
  actionsContainer: { gap: 8, minWidth: 95, alignItems: 'center' },
  contractButton: { backgroundColor: '#007AFF', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, width: '100%', alignItems: 'center' },
  deleteButton: { backgroundColor: '#FF3B30' },
  contractButtonText: { color: '#FFF', fontSize: 12, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 40 },
  fab: { position: 'absolute', width: 60, height: 60, right: 20, bottom: 20, backgroundColor: '#222', borderRadius: 30, alignItems: 'center', justifyContent: 'center', elevation: 5 },
  fabText: { fontSize: 30, color: 'white', lineHeight: 32 },
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