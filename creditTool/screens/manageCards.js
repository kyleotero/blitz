import React, { useState, useEffect } from 'react';
import {
    StatusBar,
    FlatList,
    StyleSheet,
    Button,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import pcImage from '../assets/pc.png';
import scotiaImg from '../assets/scotia.png';
import triImg from '../assets/triangle.png';
import amexImg from '../assets/amex.png';
import cibcImg from '../assets/cibc.png';

export default function ManageCards({ navigation }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const cardsData = [
                    { cardName: 'pc', checked: false, imageSource: pcImage },
                    { cardName: 'scotia', checked: false, imageSource: scotiaImg },
                    { cardName: 'triangle', checked: false, imageSource: triImg },
                    { cardName: 'amex', checked: false, imageSource: amexImg },
                    { cardName: 'cibc', checked: false, imageSource: cibcImg },
                ];

                const storedCards = await AsyncStorage.getItem('cards');
                if (storedCards !== null) {
                    const parsedCards = JSON.parse(storedCards);
                    const updatedData = cardsData.map((card) => ({
                        ...card,
                        checked: parsedCards[card.cardName].active,
                    }));
                    setData(updatedData);
                } else {
                    setData(cardsData);
                }
            } catch (error) {
                console.error('Error fetching cards from AsyncStorage:', error);
            }
        }

        fetchData();
    }, []);

    const toggleCheckbox = async (cardName) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.cardName === cardName
                    ? { ...item, checked: !item.checked }
                    : item
            )
        );

        try {
            const storedCards = await AsyncStorage.getItem('cards');
            if (storedCards !== null) {
                const updatedCards = JSON.parse(storedCards);
                updatedCards[cardName].active = !updatedCards[cardName].active;
                await AsyncStorage.setItem('cards', JSON.stringify(updatedCards));

                // Log the updated cards
                console.log('Updated Cards:', updatedCards);

            }
        } catch (error) {
            console.error('Error saving cards to AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={2}
                keyExtractor={(item) => item.cardName.toString()}
                contentContainerStyle={[styles.flatListContainer]}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => toggleCheckbox(item.cardName)}>
                        <View style={styles.imageWrapper}>
                            <Image
                                source={item.imageSource}
                                style={[
                                    styles.image,
                                    { opacity: item.checked ? 1 : 0.5 },
                                ]}
                                resizeMode="contain"
                            />
                            {item.checked && <View style={styles.checkbox} />}
                        </View>
                    </TouchableOpacity>
                )}
            />
            <Button
                title="Go to Best Card"
                onPress={() => navigation.navigate('Card Recommendation')}
                style={styles.button}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 100,
    },
    imageWrapper: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10,
        padding: 8,
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        backgroundColor: 'transparent', // Change color as needed
        position: 'absolute',
        top: 5,
        right: 5,
      },
    flatListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        bottom: 200,
    },
});
