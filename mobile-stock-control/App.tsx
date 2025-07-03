import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StockScreen from './screens/StockScreen';
import AddProductScreen from './screens/AddProductScreen';

const Stack = createStackNavigator();

export type Product = {
  id: string;
  code: string;
  name: string;
  category: string;
  value: number;
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Estoque">
          {props => <StockScreen {...props} products={products} setProducts={setProducts} />}
        </Stack.Screen>
        <Stack.Screen name="Adicionar Produto">
          {props => <AddProductScreen {...props} products={products} setProducts={setProducts} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
