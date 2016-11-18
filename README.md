# React Native Safari View

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

__Examples__
```js
SafariView.show({
  url: "http://facebook.github.io/react/blog/2015/03/26/introducing-react-native.html",
  readerMode: true // optional,
  tintColor: "#000" // optional
  barTintColor: "#fff" // optional
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
    StatusBarIOS.setStyle("light-content");
  }
);
```

### onDismiss
__Example__
```js
let dismissSubscription = SafariView.addEventListener(
  "onDismiss",
  () => {
    StatusBarIOS.setStyle("default");
  }
);
```

## License
Copyright (c) 2015, [Naoufal Kadhom](http://naoufal.com)

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

