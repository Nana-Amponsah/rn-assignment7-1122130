// src/screens/CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        getCartItems();
    }, []);

    const getCartItems = async () => {
        try {
            const items = await AsyncStorage.getItem('cartItems');
            if (items !== null) {
                setCartItems(JSON.parse(items));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const removeFromCart = async (item) => {
        const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
        setCartItems(updatedCart);
        await AsyncStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    return (
        <View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.title}</Text>
                        <Button
                            title="Remove from Cart"
                            onPress={() => removeFromCart(item)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default CartScreen;
