import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import { useStories } from './components/context/StoryProvider';
import testdata from './Testdata'

export default function WritePrometheus({ navigation }) {

  const { setStories, stories } = useStories();

  const [state, setState] = useState({
    isLoaded: false,
  })

  //Input text
  const [text, setText] = useState('')

  //Fetch/SetPosts
  const [posts, setPosts] = useState([]);

  //Set WritingPrompt`
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');

  //Handle text, setStory
  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === 'story') setStory(text)
  }

  //Input Reference
  const inputRef = useRef();

  //Clear textarea when story is stored
  const pressed = () => {
    inputRef.current.clear();
  };

  //Hide Title toggle
  const ToggleDisplay = () => {

    if (state.isLoaded) {
      return (
        setState({
          isLoaded: false,
        }))
    } else
      setState({
        isLoaded: true,
      })

  }

  // For fetching subreddit once.
  useEffect(() => {
    const fetchData = async () => {
      const url = `https://prometheus-backend-api.vercel.app/api/reddit?subreddit=${process.env.SUBREDDIT_NAME}&sort=hot`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setPosts(result);
      } catch (error) {
        console.error('Fetching error: ', error);
        setPosts(testdata);
      }
    };

    fetchData();
  }, []);

  //Function that selects random WP
  const titleSearcher = () => {
    if (posts && posts.data && posts.data.posts && posts.data.posts.length > 0) {
      const randomIndex = Math.floor(Math.random() * posts.data.posts.length);
      const randomPost = posts.data.posts[randomIndex];

      if (randomPost && randomPost.title) {
        setTitle(randomPost.title);
      }
    }
  };


  //Store the story in the storage
  const handleShelving = async (story) => {
    if (story.trim().length < 10) { Alert.alert('Story length is under 10 characters, Story is not shelved') }
    else {
      Alert.alert('Story is shelved')
      pressed();
      const title = {
        id: Date.now(), time: Date.now(),
        text: story
      };

      const shelvedStories = [...stories, title];
      setStories(shelvedStories);
      await AsyncStorage.setItem("STORIES", JSON.stringify(shelvedStories))
      setText('');
      setStory('');
    }
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" hidden={true} />

      <View style={[{ flex: 0, margin: 'auto', marginTop: '2%', marginBottom: '2%', padding: '2%', width: '97%', display: 'none', }, !state.isLoaded && { display: 'flex', }]} >
        <TouchableOpacity>
          <Text selectable={true} style={{ color: '#F9FBFF', margin: 'auto', fontSize: 19 }}>
            {title.substr(4).replace("[WP]", "")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', color: 'white', margin: 'auto', marginTop: '1%', marginBottom: '-1%' }}>
        <Button title=' New Title' onPress={() => titleSearcher()}

          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 1,
            borderColor: '#F9FBFF',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 140,
            marginHorizontal: 26,
            marginVertical: 5,
          }}
          titleStyle={{ fontWeight: 'bold' }}
          icon={{
            name: 'fire',
            type: 'font-awesome',
            size: 20,
            color: 'white',
          }}
        />
        <Button title=' Toggle' onPress={() => ToggleDisplay()}
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 1,
            borderColor: '#F9FBFF',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 140,
            marginHorizontal: 26,
            marginVertical: 5,
          }}
          titleStyle={{ fontWeight: 'bold' }}
          icon={{
            name: 'arrow-up',
            type: 'font-awesome',
            size: 20,
            color: 'white',
          }}
        />
      </View>
      <ScrollView
        keyboardDismissMode="on-drag"
        style={styles.view}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.inputContainer}>
            <Input
              ref={inputRef}
              onChangeText={(text) => handleOnChangeText(text, 'story')}
              style={[styles.postInput, state.isLoaded && { height: 320, }]}
              multiline={true}
              numberOfLines={100}
              placeholder="Man as Prometheus, who stole fire, must today receive his punishment in the shape of melting ice fields, rising sea levels, heatwaves and a lack of oxygen."
              require={true} />

          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={{ color: 'white', margin: 'auto', marginBottom: '3%' }}>
        <Button title=' Shelve' onPress={() => handleShelving(story)}
          buttonStyle={{
            backgroundColor: 'black',
            borderWidth: 1,
            borderColor: '#F9FBFF',
            borderRadius: 30,
          }}
          containerStyle={{
            width: 130,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: 'bold' }}
          icon={{
            name: 'cloud',
            type: 'font-awesome',
            size: 18,
            color: 'white',
          }}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {

    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    backgroundColor: "transparent",

  },

  postInput: {
    fontSize: 19.5,
    borderColor: '#42435b',
    borderWidth: 1,
    margin: 10,
    width: '98%',
    height: 130,
    color: '#F9FBFF',
    paddingLeft: 5,
    textAlignVertical: 'top'

  }

});
