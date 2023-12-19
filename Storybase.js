import React, { useState } from 'react';
import Story from './components/Story';
import { FlatList, StyleSheet, TouchableWithoutFeedback, View, Text } from 'react-native';
import { useStories } from './components/context/StoryProvider';
import SearchBar from './components/SearchBar';
import NotFound from './components/NotFound';

export default function Storybase({ navigation }) {

    //Search
    const [searchQuery, setSearchQuery] = useState('')
    const [resultNotFound, setResultNotFound] = useState(false);

    //Context Provider
    const { stories, setStories, findStories } = useStories();

    //Open the story
    const openStory = (story) => {
        navigation.navigate('StoryDetail', { story })
    }


    // Handle search function
    const handleOnSearchInput = async text => {
        setSearchQuery(text);
        if (!text.trim()) {
            setSearchQuery('');
            setResultNotFound(false);
            return await findStories();

        }
        //Search filter
        const filteredStories = stories.filter(story => {
            if (story.text.toLowerCase().includes(text.toLowerCase())) {
                return story;
            }
        });
        if (filteredStories.length) {
            setStories([...filteredStories]);
        } else {
            setResultNotFound(true);
        }
    };

    //  Handle X, clear button
    const handleOnClear = async () => {
        setSearchQuery('')
        setResultNotFound(false)
        await findStories()
    }

    return (
        <>
            <TouchableWithoutFeedback>
                <View style={styles.container}>

                    {stories.length ? (
                        <SearchBar value={searchQuery}
                            onChangeText={handleOnSearchInput}
                            containerStyle={{ color: '#F9FBFF', marginVertical: 25 }}
                            onClear={handleOnClear} />
                    ) : null}

                    {resultNotFound ? (
                        <NotFound style={{ color: '#F9FBFF' }} />
                    ) : (
                        <FlatList data={stories}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between', marginVertical: -7, paddingVertical: 5 }}
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item }) => <Story onPress={() => openStory(item)} item={item} />}
                        />
                    )}
                </View>
            </TouchableWithoutFeedback>
        </>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }

});
