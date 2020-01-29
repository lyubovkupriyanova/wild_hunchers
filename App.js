/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image
} from 'react-native';
import { Button } from 'native-base';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import GalleryPicker from './GalleryPicker';

class App extends React.Component {
  state={
    imagePickerIsOpened: false,
    image: ''
  }
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Button onPress={ ()=>{ this.setState({ imagePickerIsOpened: true }) }}>
        </Button>
        {this.state.imagePickerIsOpened &&
          <GalleryPicker
            title={ 'Hello from picker' }
            targetWidth_dpi={ 50 }
            targetHeight_dpi={ 50 }
            onChoosePhoto={ (base64)=>{ this.setState({ image: base64 })}}
            stopLoading={ ()=>{ this.setState({ imagePickerIsOpened: false })}}/>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionHorizContainer: {
    flexDirection: 'row',
    padding: 0,
    paddingHorizontal: 56,
  },
  sectionHorizContainer2: {
    flexDirection: 'row',
    padding: 0,
    paddingHorizontal: 20,
  },
  sectionHeaderTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'midnightblue',
    paddingHorizontal: 10,
    paddingRight: 1,
    padding: 40
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: 'midnightblue',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
