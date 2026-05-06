import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import ServLinkLogo from './components/ServLinkLogo';

const { width } = Dimensions.get('window');

type Props = {
  navigation: any;
};

type Category = {
  id: string;
  label: string;
  icon: string;
};

type Professional = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  initials: string;
  color: string;
};

const CATEGORIES: Category[] = [
  { id: '1', label: 'Limpeza', icon: '🧹' },
  { id: '2', label: 'Manutenção', icon: '🔧' },
  { id: '3', label: 'Tecnologia', icon: '💻' },
  { id: '4', label: 'Aulas', icon: '📚' },
  { id: '5', label: 'Saúde', icon: '❤️' },
  { id: '6', label: 'Beleza', icon: '✂️' },
];

const PROFESSIONALS: Professional[] = [
  { id: '1', name: 'Ana', specialty: 'Limpeza residencial', rating: 4.8, reviews: 32, initials: 'AN', color: '#F4A261' },
  { id: '2', name: 'Maria', specialty: 'Manutenção elétrica', rating: 4.6, reviews: 18, initials: 'MA', color: '#4A90D9' },
  { id: '3', name: 'João', specialty: 'Aulas de reforço', rating: 4.9, reviews: 44, initials: 'JO', color: '#6B7280' },
  { id: '4', name: 'Lucas', specialty: 'Suporte TI', rating: 4.7, reviews: 27, initials: 'LU', color: '#10B981' },
];

const TAB_ITEMS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'services', label: 'Serviços', icon: '🔍' },
  { id: 'history', label: 'Histórico', icon: '📋' },
  { id: 'chat', label: 'Chat', icon: '💬' },
  { id: 'profile', label: 'Perfil', icon: '👤' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={{ fontSize: 11, color: i <= Math.round(rating) ? '#F59E0B' : '#D1D5DB' }}>
          ★
        </Text>
      ))}
    </View>
  );
}

export default function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProfessionals = PROFESSIONALS.filter((p) =>
    search.length === 0 ||
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const filteredByCategory = selectedCategory
    ? filteredProfessionals.filter((p) => {
        const cat = CATEGORIES.find((c) => c.id === selectedCategory);
        if (!cat) return true;
        return p.specialty.toLowerCase().includes(cat.label.toLowerCase());
      })
    : filteredProfessionals;

  return (
    <SafeAreaView style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <ServLinkLogo size="small" />
        <TouchableOpacity
          style={styles.loginBadge}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginBadgeText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
        {/* ── Barra de busca ── */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="O que você precisa?"
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.clearSearch}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Banner de boas-vindas ── */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Encontre o profissional{'\n'}ideal para você!</Text>
          <Text style={styles.bannerSub}>Conectando você ao serviço certo</Text>
        </View>

        {/* ── Categorias ── */}
        <Text style={styles.sectionTitle}>Categorias</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.categoryCard,
                selectedCategory === cat.id && styles.categoryCardActive,
              ]}
              onPress={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text style={[styles.categoryLabel, selectedCategory === cat.id && styles.categoryLabelActive]}>
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Profissionais Recomendados ── */}
        <Text style={styles.sectionTitle}>Profissionais Recomendados</Text>

        {filteredByCategory.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum profissional encontrado.</Text>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.profsScroll}>
            {filteredByCategory.map((prof) => (
              <View key={prof.id} style={styles.profCard}>
                <View style={[styles.profAvatar, { backgroundColor: prof.color }]}>
                  <Text style={styles.profInitials}>{prof.initials}</Text>
                </View>
                <Text style={styles.profName}>{prof.name}</Text>
                <StarRating rating={prof.rating} />
                <Text style={styles.profRating}>{prof.rating} ({prof.reviews})</Text>
                <Text style={styles.profSpecialty} numberOfLines={2}>{prof.specialty}</Text>
                <TouchableOpacity style={styles.profButton} activeOpacity={0.8}>
                  <Text style={styles.profButtonText}>Ver perfil</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        {/* ── Lista de profissionais vertical ── */}
        <Text style={styles.sectionTitle}>Mais próximos</Text>
        {filteredByCategory.map((prof) => (
          <View key={prof.id} style={styles.listCard}>
            <View style={[styles.listAvatar, { backgroundColor: prof.color }]}>
              <Text style={styles.profInitials}>{prof.initials}</Text>
            </View>
            <View style={styles.listInfo}>
              <Text style={styles.listName}>{prof.name}</Text>
              <Text style={styles.listSpecialty}>{prof.specialty}</Text>
              <StarRating rating={prof.rating} />
            </View>
            <View style={styles.listMeta}>
              <Text style={styles.listRating}>{prof.rating}</Text>
              <Text style={styles.listReviews}>{prof.reviews} av.</Text>
            </View>
          </View>
        ))}

        {/* ── CTA Cadastro ── */}
        <View style={styles.ctaBox}>
          <Text style={styles.ctaTitle}>Seja um profissional!</Text>
          <Text style={styles.ctaSub}>Cadastre-se e comece a receber chamados.</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('UserType')}>
            <Text style={styles.ctaButtonText}>Criar conta grátis</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ── Bottom Tab Bar ── */}
      <View style={styles.tabBar}>
        {TAB_ITEMS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => {
              setActiveTab(tab.id);
              if (tab.id === 'profile') navigation.navigate('Login');
            }}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabIcon, activeTab === tab.id && styles.tabIconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.tabLabel, activeTab === tab.id && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
  },
  loginBadge: {
    backgroundColor: '#4A90D9',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  loginBadgeText: { color: '#fff', fontWeight: '700', fontSize: 13 },

  // Search
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: { fontSize: 16, marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: '#1A1A2E' },
  clearSearch: { fontSize: 14, color: '#9CA3AF', paddingLeft: 8 },

  // Banner
  banner: {
    margin: 20,
    borderRadius: 16,
    backgroundColor: '#4A90D9',
    padding: 20,
    shadowColor: '#4A90D9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  bannerTitle: { fontSize: 18, fontWeight: '700', color: '#fff', lineHeight: 24 },
  bannerSub: { fontSize: 13, color: 'rgba(255,255,255,0.8)', marginTop: 6 },

  // Section title
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 12,
  },

  // Categories grid
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 10,
    marginBottom: 20,
  },
  categoryCard: {
    width: (width - 32 - 30) / 3,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  categoryCardActive: { borderColor: '#4A90D9', backgroundColor: '#EFF6FF' },
  categoryIcon: { fontSize: 28, marginBottom: 6 },
  categoryLabel: { fontSize: 11, fontWeight: '600', color: '#6B7280', textAlign: 'center' },
  categoryLabelActive: { color: '#4A90D9' },

  // Horizontal professionals scroll
  profsScroll: { paddingLeft: 20, marginBottom: 20 },
  profCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginRight: 14,
    width: 160,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  profAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  profInitials: { color: '#fff', fontWeight: '700', fontSize: 18 },
  profName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  profRating: { fontSize: 11, color: '#6B7280', marginTop: 2, marginBottom: 4 },
  profSpecialty: { fontSize: 11, color: '#9CA3AF', textAlign: 'center', marginBottom: 10 },
  profButton: {
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  profButtonText: { fontSize: 12, fontWeight: '600', color: '#4A90D9' },

  // Vertical list
  listCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  listAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  listInfo: { flex: 1 },
  listName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  listSpecialty: { fontSize: 12, color: '#6B7280', marginBottom: 4 },
  listMeta: { alignItems: 'flex-end' },
  listRating: { fontSize: 16, fontWeight: '700', color: '#F59E0B' },
  listReviews: { fontSize: 11, color: '#9CA3AF' },

  // CTA
  ctaBox: {
    margin: 20,
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: { fontSize: 18, fontWeight: '700', color: '#fff', marginBottom: 6 },
  ctaSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', textAlign: 'center', marginBottom: 18 },
  ctaButton: { backgroundColor: '#4A90D9', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 28 },
  ctaButtonText: { color: '#fff', fontWeight: '700', fontSize: 14 },

  // Empty
  emptyText: { textAlign: 'center', color: '#9CA3AF', fontSize: 14, marginVertical: 20 },

  // Tab Bar
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingVertical: 10,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  tabItem: { flex: 1, alignItems: 'center', gap: 3 },
  tabIcon: { fontSize: 20 },
  tabIconActive: { },
  tabLabel: { fontSize: 10, color: '#9CA3AF', fontWeight: '500' },
  tabLabelActive: { color: '#4A90D9', fontWeight: '700' },
});
