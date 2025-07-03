import React from 'react';
import { View, Text, SectionList, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../App';

type Props = {
  navigation: any;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

type Section = {
  title: string;
  data: Product[];
};

export default function StockScreen({ navigation, products }: Props) {
  // Group products by category
  const grouped = products.reduce((acc: {[key: string]: Product[]}, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const sections: Section[] = Object.keys(grouped).map(category => ({
    title: category,
    data: grouped[category],
  }));

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name || 'Sem nome'}</Text>
            <Text style={styles.value}>R$ {item.value.toFixed(2)}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Nenhum produto cadastrado.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('Adicionar Produto')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  header: { fontSize: 18, fontWeight: 'bold', backgroundColor: '#eee', padding: 8 },
  item: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderColor: '#ccc' },
  name: { fontSize: 16 },
  value: { fontSize: 16, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  addButtonText: { color: '#fff', fontSize: 36, lineHeight: 36 },
});
