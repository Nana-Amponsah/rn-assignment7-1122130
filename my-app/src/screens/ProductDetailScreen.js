// ProductDetailScreen.js
import React from 'react';
import { View, Text } from 'react-native';

const ProductDetailsScreen = ({ route }) => {
    const { product } = route.params;

    return (
        <View>
            <Text>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text>${product.price}</Text>
        </View>
    );
};

export default ProductDetailsScreen;
