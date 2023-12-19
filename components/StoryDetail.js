import React, { useState } from "react";
import { useStories } from '../components/context/StoryProvider';
import { View, StyleSheet, Text, ScrollView, Alert } from "react-native";

import ShelveButton from "./ShelveButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextInputModal from "./TextInputModal";


export default function StoryDetail(props) {

    //otetaan propseina yksittäinen tarina
    const [story, setStory] = useState(props.route.params.story)

    //käytetään context provideria
    const { stories, setStories } = useStories();

    //Tekstieditori
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    //tekstin poistaminen
    const deleteNote = async () => {
        const result = await AsyncStorage.getItem('STORIES')

        if (result !== null) JSON.parse(result)
        // let stories = [];
        const ShelvedStories = stories.filter(s => s.id !== story.id)
        setStories(ShelvedStories)
        await AsyncStorage.setItem('STORIES', JSON.stringify(ShelvedStories))
        props.navigation.goBack();
    }

    //tekstin editoiminen
    const handleUpdate = async (desc) => {

        const result = await AsyncStorage.getItem('STORIES')
        let stories = [];
        if (result !== null) stories = JSON.parse(result)

        const shelvedStories = stories.filter(s => {
            if (s.id === story.id) {
                s.text = desc
                s.isUpdated = true

                setStory(s);
            }
            return s;
        })

        setStories(shelvedStories)
        await AsyncStorage.setItem('STORIES', JSON.stringify(shelvedStories))
    };

    //suljetaan editori
    const handleOnClose = () => {
        setShowModal(false)
    }

    //avataan editori
    const openEditModal = () => {
        setIsEdit(true);
        setShowModal(true);
    }

    //näytä alert, jos halutaan poistaa viesti
    const displayDeleteAlert = () => {
        Alert.alert('Are You sure!', 'This action will delete your story!', [
            {
                text: 'Delete',
                onPress: deleteNote
            },
            {
                text: 'No Thanks',
                onPress: () => console.log(' no thanks')
            }
        ], {

            cancelable: true,
        })
    }
    return (


        <>
            <ScrollView
                contentContainerStyle={[styles.container]}>

                <Text selectable={true} style={[styles.item, story.text.length > 635 && { height: undefined }]}>{story.text}</Text>


            </ScrollView>

            <View style={styles.btnContainer}>

                <ShelveButton antIconName='delete' style={{ backgroundColor: 'tomato', opacity: 0.9, marginBottom: 15 }}
                    onPress={displayDeleteAlert}
                />
                <ShelveButton antIconName='edit' style={{ backgroundColor: '#dcfcdc', opacity: 0.9, }}
                    onPress={openEditModal}
                />
            </View>
            <TextInputModal isEdit={isEdit}
                story={story.text} onClose={handleOnClose}
                onSubmit={handleUpdate} visible={showModal} />
        </>
    )

}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: 15,
        paddingVertical: 30,

    },
    item: {

        paddingTop: '12%',
        color: '#F9FBFF',
        fontSize: 23,
        height: 1000,

    },

    btnContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50,

    },

    postInput: {
        fontSize: 19.5,
        borderColor: '#42435b',
        borderWidth: 1,
        margin: 10,
        width: '98%',
        height: 180,
        color: '#F9FBFF',
        paddingLeft: 5,

    }

});
