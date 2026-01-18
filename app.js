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
        source={{ uri: 'https://player.vimeo.com/progressive_redirect/download/1155615114/container/5d252cf9-d778-475a-9e1c-f59f0d3b0d39/9493f39e-44eae870/loading%20%281080p%29.mp4?expires=1768837911&loc=external&signature=3c7cdbb3b40d48a92e37d3c0623aa341a0317b6c7518004314a25779ab74c935' }}
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
