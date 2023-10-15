import React, { useState, useEffect } from 'react';
import { StatusBar, FlatList, StyleSheet, Button, View, Image, TouchableOpacity } from 'react-native';
import pcImage from '../assets/pc.png';
import scotiaImg from '../assets/scotia.png';
import triImg from '../assets/triangle.png';
import amexImg from '../assets/amex.png';
import cibcImg from '../assets/cibc.png';
import cards from './cards.json';

export default function ManageCards({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const activeCards = Object.keys(cards).filter(cardName => !cards[cardName].active);

        const cardsData = activeCards.map(cardName => ({
            cardName: cardName,
            checked: false,
            imageSource: getImageSource(cardName)
        }));

        setData(cardsData);
    }, []);

    const getImageSource = (cardName) => {
        switch (cardName) {
            case "pc":
                return pcImage;
            case "scotia":
                return scotiaImg;
            case "triangle":
                return triImg;
            case "amex":
                return amexImg;
            case "cibc":
                return cibcImg;
            default:
                return null;
        }
    };

    const toggleCheckbox = (cardName) => {
        setData(prevData => prevData.map(item =>
            item.cardName === cardName ? { ...item, checked: !item.checked } : item
        ));

        const updatedCards = { ...cards, [cardName]: { ...cards[cardName], active: true } };
        // Save updatedCards back to the cards.json file or wherever you're storing it.
        
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item) => item.cardName.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleCheckbox(item.cardName)}>
                        <View style={styles.gridItem}>
                            <View style={styles.imageWrapper}>
                                <Image source={item.imageSource} style={styles.image} />
                                {item.checked && <View style={styles.checkbox} />}
                            </View>

                        </View>
                    </TouchableOpacity>
                )}
            />
            <Button
                title="Go to Best Card"
                onPress={() => navigation.navigate("Card Recommendation")}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'flex',
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10
    },
    gridItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 150,
        height: 100,
        resizeMode: 'contain',
    },
    imageWrapper: {
        shadowColor: "black", // Shadow color
        shadowOffset: { width: 10, height: 10 }, // Offset (x, y)
        shadowOpacity: 1, // Opacity (0 to 1)
        shadowRadius: 10, // Radius
        padding: 8,
        alignItems: 'center'
      },
    checkbox: {
        width: 20,
        height: 20,
        backgroundColor: 'blue', // Change color as needed
        position: 'absolute',
        top: 5,
        right: 5,
    },
});