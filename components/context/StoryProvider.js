import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const StoryContext = createContext();
const StoryProvider = ({ children }) => {
    const [stories, setStories] = useState([]);

    
    //Search
    const findStories = async () => {
        const result = await AsyncStorage.getItem('STORIES');
        if (result !== null) setStories(JSON.parse(result));
    };

    useEffect(() => {
        findStories();
    }, []); 

    return (
        <StoryContext.Provider value={{ stories, setStories, findStories }}>
            {children}
        </StoryContext.Provider>
    );
};

export const useStories = () => useContext(StoryContext);

export default StoryProvider;