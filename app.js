import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, Dimensions, StatusBar, BackHandler } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Lock to landscape orientation
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

    // Auto-play video
    if (videoRef.current) {
      videoRef.current.playAsync();
    }

    return () => {
      // Unlock orientation on cleanup
      ScreenOrientation.unlockAsync();
    };
  }, []);

  const handlePlaybackStatusUpdate = (status) => {
    // When video finishes, close the app
    if (status.didJustFinish) {
      BackHandler.exitApp();
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Video
        ref={videoRef}
        source={{ uri: 'https://download1640.mediafire.com/yafk06ilevzgQ8maoWV-6bS0tAffKtirtHVZljHCcGl70uwsmQRoW-SO4xRgg6qCvmUJa6-lvs5HNFxrjP6DTjzoW3kiwTfJf3F0QbJQAQpydNRMlXr0f20OyGO-SYCLrgq970fWC5LA34Gq-bXZiUqmFO5fqg9mpgy0WbXrCAf4fPU/5dg233z5peg3cq5/loading.mp4' }}
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});