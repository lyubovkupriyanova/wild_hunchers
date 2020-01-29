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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>

          <View style={styles.body}>
            <View style={styles.sectionHorizContainer}>

              <Text style={styles.sectionHeaderTitle}>Planting Trees</Text>
              <Image source={{uri: 'https://drive.google.com/uc?id=1NBaQU7BS9E-fMCV_B1YASFXO9LuTp3BP'}} style={{width: 70, height: 70, resizeMode: 'cover',
              backgroundColor: 'black'}} />

            </View>

            <View style={styles.sectionHorizContainer2}>
              <Image source={{uri: 'https://drive.google.com/uc?id=1VZEx10VtDfjAvLRN6YwoSB1RUp1kz0Ps'}} style={{width: 35, height: 35, resizeMode: 'cover',
              backgroundColor: 'white'}} />
              <Text style={styles.sectionTitle}>Project Description</Text>

            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Before</Text>
              <Text style={styles.sectionDescription}>
              pic related
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>After</Text>
              <Text style={styles.sectionDescription}>
              pic related
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
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
