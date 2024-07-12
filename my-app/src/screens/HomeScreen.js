import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const addToCart = async (item) => {
        try {
            const cartItems = await AsyncStorage.getItem('cartItems');
            let updatedCart = [];
            if (cartItems) {
                updatedCart = JSON.parse(cartItems);
            }
            updatedCart.push(item);
            await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View>
            <FlatList
                data={products}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text>{item.title}</Text>
                        <Button
                            title="View Details"
                            onPress={() => navigation.navigate('ProductDetail', { product: item })}
                        />
                        <Button
                            title="Add to Cart"
                            onPress={() => addToCart(item)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default HomeScreen;
