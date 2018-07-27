# React Native Safari View

[![react-native version](https://img.shields.io/badge/react--native-0.40-blue.svg?style=flat-square)](http://facebook.github.io/react-native/releases/0.40)
[![npm version](https://img.shields.io/npm/v/react-native-safari-view.svg?style=flat-square)](https://www.npmjs.com/package/react-native-safari-view)
[![npm downloads](https://img.shields.io/npm/dm/react-native-safari-view.svg?style=flat-square)](https://www.npmjs.com/package/react-native-safari-view)
[![Code Climate](https://img.shields.io/codeclimate/github/naoufal/react-native-safari-view.svg?style=flat-square)](https://codeclimate.com/github/naoufal/react-native-safari-view)

React Native Safari View is a [Safari View Controller](https://developer.apple.com/videos/wwdc/2015/?id=504) wrapper for [React Native](https://facebook.github.io/react-native/).

![react-native-safari-view](https://cloud.githubusercontent.com/assets/1627824/8345135/ed5f7fc4-1ab8-11e5-814a-a3e9df0ede06.gif)

## Documentation
- [Install](https://github.com/naoufal/react-native-safari-view#install)
- [Usage](https://github.com/naoufal/react-native-safari-view#usage)
- [Example](https://github.com/naoufal/react-native-safari-view#example)
- [Methods](https://github.com/naoufal/react-native-safari-view#methods)
- [Events](https://github.com/naoufal/react-native-safari-view#events)
- [License](https://github.com/naoufal/react-native-safari-view#license)

## Install
```shell
npm i --save react-native-safari-view
```

## Support
Due to the rapid changes being made in the React Native ecosystem, we are not officially going to support this module on anything but the latest version of React Native. The current supported version is indicated on the React Native badge at the top of this README.  If it's out of date, we encourage you to submit a pull request!

## Usage
### Linking the Library
In order to use Safari View, you must first link the library your project.  There's excellent documentation on how to do this in the [React Native Docs](https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content).

### Displaying the Safari View
Once you've linked the library, you'll want to make it available to your app by requiring it:

```js
var SafariView = require('react-native-safari-view');
```

Displaying the Safari View is as simple as calling:
```js
SafariView.show({
  url: 'https://github.com/naoufal'
});
```

### URL Change Notifications
There isn't an API for retrieving URL changes provided by SFSafariViewController or its delegate in iOS, so there's no way to know where the user is navigating to. However, it is possible to get a notification when the Safari View navigates to an URL scheme specified by your app (e.g. `your-app-name://`). This is especially useful for implementing callback oriented flows such as in OAuth2 / OpenID Connect.

To get URL notifications for your URL scheme you'll need to:
 1. Register an [URL scheme](https://developer.apple.com/library/content/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/Inter-AppCommunication/Inter-AppCommunication.html#//apple_ref/doc/uid/TP40007072-CH6-SW10) in your Xcode Project
 2. Make sure you've set up [Linking](https://facebook.github.io/react-native/docs/linking.html) in your react-native project.
 3. Listen for URL changes in your react-native code (i.e. `Linking.addEventListener('url', eventHandler)`);


## Example
Using Safari View in your app will usually look like this:
```js
import React, { Component } from "react";
import SafariView from "react-native-safari-view";

class YourComponent extends Component {
  constructor(props) {
    super(props);
  }

  _pressHandler() {
    SafariView.isAvailable()
      .then(SafariView.show({
        url: "https://github.com/naoufal"
      }))
      .catch(error => {
        // Fallback WebView code for iOS 8 and earlier
      });
  }

  render() {
    return (
      <View>
        ...
        <Button onPress={this._pressHandler}>
          Show Safari View
        </Button>
      </View>
    );
  }
}
```

## Methods

### show(safariOptions)
Displays a Safari View with the provided url.

__Arguments__
- `safariOptions` - An `Object` containing a `url` key and optionally a `readerMode` key, a `tintColor`, and/or a `barTintColor`.

__safariOptions__
- `url` - A `String` containing the url you want to load in the Safari View
- `readerMode` - A `Boolean` indicating to use Safari's Reader Mode if available
- `tintColor` - A `String` containing a hex, rgba or rgba color to use for the browser controls
- `barTintColor` - A `String` containing a hex, rgba or rgba color to use for the background of the browser controls (only available on iOS 10 and higher)
- `fromBottom` - A 'Boolean' indicating to open the Safari View from the bottom
- `dismissButtonStyle` - A `String` indicating which dismiss button style to use (iOS 11+ only). Options are `"Close"`, `"Cancel"` and `"Done"` (default)

__Examples__
```js
SafariView.show({
  url: "http://facebook.github.io/react/blog/2015/03/26/introducing-react-native.html",
  readerMode: true, // optional
  tintColor: "#000", // optional
  barTintColor: "#fff", // optional
  dismissButtonStyle: "Close", // optional
});
```

### isAvailable()
Checks if Safari View is available on the device.

__Example__
```js
SafariView.isAvailable()
  .then(available => {
    console.log("SafariView is available.");
  })
  .catch(error => {
    console.log(error);
  });
```

### dismiss()
Dismisses the currently active Safari View.

__Example__
```js
SafariView.dismiss()
```

## Events
The following events are fired by the Safari View.

### onShow
__Example__
```js
let showSubscription = SafariView.addEventListener(
  "onShow",
  () => {
    StatusBar.setBarStyle("light-content");
  }
);
```

### onDismiss
__Example__
```js
let dismissSubscription = SafariView.addEventListener(
  "onDismiss",
  () => {
    StatusBar.setBarStyle("default");
  }
);
```

## License
Copyright (c) 2015, [Naoufal Kadhom](http://naoufal.com)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

