'use strict';

import React, { Component } from 'react'
import {
  AlertIOS,
  AppRegistry,
  processColor,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

import SafariView from 'react-native-safari-view';

console.log(SafariView)

class SafariViewExample extends Component {
  componentDidMount() {
    this.showSubscription= () => {
      console.log("SafariView onShow")
      StatusBar.setBarStyle("light-content");
    };
    this.dismissSubscription = () => {
      console.log("SafariView onDismiss");
      StatusBar.setBarStyle("default");
    };
    SafariView.addEventListener("onShow", this.showSubscription);
    SafariView.addEventListener("onDismiss", this.dismissSubscription);
  }

  componentWillUnmount() {
    SafariView.removeEventListener("onShow", this.showSubscription);
    SafariView.removeEventListener("onDismiss", this.dismissSubscription);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          react-native-safari-view
        </Text>
        <Text style={styles.instructions}>
          github.com/naoufal/react-native-safari-view
        </Text>
        <TouchableHighlight
          style={styles.btn}
          onPress={this._clickHandler}
          underlayColor="#0380BE"
          activeOpacity={1}
        >
          <Text style={{
            color: '#fff',
            fontWeight: '600'
          }}>
            Show Safari View
          </Text>
        </TouchableHighlight>
      </View>
    );
  }

  _clickHandler() {
    SafariView.show({
      url: 'http://twitter.com/naoufal',
      readerMode: true,
      tintColor: "rgb(0, 0, 0)",
      fromBottom: true
    });
  }

  _isAvailable() {
    SafariView.isAvailable()
      .then(success => {
        AlertIOS.alert('SFSafariView available.');
      })
      .catch(error => {
        AlertIOS.alert('SFSafariView not available.');
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    margin: 10,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center'
  },
  instructions: {
    marginBottom: 5,
    color: '#333333',
    fontSize: 13,
    textAlign: 'center'
  },
  btn: {
    borderRadius: 3,
    marginTop: 200,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#0391D7'
  }
});

AppRegistry.registerComponent('SafariViewExample', () => SafariViewExample);
