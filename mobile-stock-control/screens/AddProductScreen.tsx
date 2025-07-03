import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker, ScrollView } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Product } from '../App';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  navigation: any;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

const categories = ['Bebidas', 'Limpeza', 'Alimentos', 'Outros'];

export default function AddProductScreen({ navigation, products, setProducts }: Props) {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [value, setValue] = useState('');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setCode(data);
    Alert.alert('Código escaneado', `Código: ${data}`);
  };

  const handleSave = () => {
    if (!code || !category || !value) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    const newProduct: Product = {
      id: uuidv4(),
      code,
      name,
      category,
      value: parseFloat(value),
    };
    setProducts([...products, newProduct]);
    navigation.goBack();
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para usar a câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!scanned ? (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      ) : (
        <>
          <Text style={styles.label}>Código do Produto</Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            placeholder="Código do produto"
          />
          <Text style={styles.label}>Nome do Produto</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome do produto (opcional)"
          />
          <Text style={styles.label}>Categoria</Text>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
            style={styles.picker}
          >
            {categories.map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={setValue}
            placeholder="Valor do produto"
            keyboardType="numeric"
          />
          <Button title="Salvar" onPress={handleSave} />
          <Button title="Escanear novamente" onPress={() => setScanned(false)} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#fff' },
  scanner: { height: 300, marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginTop: 4 },
  picker: { height: 50, width: '100%' },
});
