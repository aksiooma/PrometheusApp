# Prometheus
Prometheus is a minimalistic creative writing tool designed to enhance story creation and facilitate freewriting sessions for writers. It features a random writing prompt generator to spark creativity, a toggle button to hide these prompts if needed, and an basic, intuitive interface for saving, searching, editing, and managing written works.

<img src=https://res.cloudinary.com/dxlzstktn/image/upload/v1705488544/Prome/noob_qorphc.png alt="Main Screen">


## Quick Installation Guide

1. **Install Node.js and npm**: Ensure you have Node.js and npm installed on your machine. You can download them from [Node.js official website](https://nodejs.org/).

2. **Install Expo CLI**: Run the following command in your terminal:

```bash
npm install -g expo-cli
```
3. **Clone the Repository**: Clone the Prometheus project repository to your local machine.
4. **Install Dependencies**: Navigate to the project directory and run:
```bash
npm install -g expo-cli
```

5. **Set Up API Configuration**: 
- This project uses a backend to interact with the Reddit API. You need to specify the URL of your backend in an environment variable.
- Create a `.env` file in the root of the project and add the following line, replacing `your_backend_url` with the URL of your backend:
```env
API_URL=your_api_url
```
6. **Start the Expo App: Run the following command**:

```bash
npx expo start
```
7. **Expo Go**: To test the app, install the Expo Go app on your mobile device from your respective app store. The app works also with the test data without setting up the Reddit API.

## Key Features

- Minimalistic UI: Optimized for both iOS and Android devices.
- Quick Text Input: For sketching ideas, building stories, and freewriting, with a save feature.
- Random Writing Prompts: Stimulate writing using test-data based prompts (previously from Reddit Writing Prompts subreddit).
- Storybase: A central hub for all saved works, equipped with search functionality.
- Detailed Editing and Delete Workspace: For fine-tuning and managing single works.

## Technologies and Components
- **React Native**: Used for building the cross-platform mobile application.
- **Expo**: A framework and platform for universal React applications.
- **Fetch**: For network requests and data retrieval.
- **Async Storage**: For local storage of user data.
- **React Native Elements**: A cross-platform UI toolkit.
- **Test Data for Prompts**: Replacing the Reddit REST API.
- **React Navigation**: Includes Tab navigation and nested Stack navigation.
- **React Native Vector Icons**: Featuring Ionicons and AntDesign.
- **Other React Native Components**: Including Text, View, Modal, and more.

## Main Components
- **React Context API / Context Provider**: For state management.
- **Element Components**: Input, Button, etc.
- **Input, Editing, and Deleting Components**: For managing texts.
- **React Native FlatList Component**: For displaying saved texts.
- **Search Bar Component**: To easily locate texts.