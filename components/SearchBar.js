import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({ containerStyle, value, onClear, onChangeText }) => {

    //Hakukenttä
    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={styles.searchBar}
                placeholder='Search here...'
                placeholderTextColor='#F9FBFF'
            />
            {value ? (
                <AntDesign
                    name='close'
                    size={25}
                    color={'tomato'}
                    onPress={onClear}
                    style={styles.clearIcon}
                />
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        color: '#F9FBFF',
        borderWidth: 0.5,
        height: 40,
        borderColor: '#F9FBFF',
        borderRadius: 40,
        paddingLeft: 15,
        fontSize: 20,
        width: 200
    },
    container: {
        justifyContent: 'center',

    },
    clearIcon: {
        position: 'absolute',
        right: 15,
        color: 'tomato',
        paddingHorizontal: 10,
    },
});

export default SearchBar;