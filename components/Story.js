import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';

const Story = ({ item, onPress }) => {

    const { text } = item;

    return (
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text numberOfLines={4} style={styles.item}>{text}</Text>
        </TouchableOpacity>
    )
}

const width = Dimensions.get('window').width - 44;

const styles = StyleSheet.create({
    container: {
       
        backgroundColor: '#F9FBFF',
        alignItems: 'center',
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10,
        marginTop: '5%',
        marginLeft: '2%',
        marginRight: '2%'

    },
    item: {
        color: '#181818',
    }


});

export default Story;






