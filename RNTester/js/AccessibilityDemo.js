/**
* Copyright (c) Facebook, Inc. and its affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*
* @format
*/

'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {Image, StyleSheet, Text, View, TouchableOpacity, UIManager, findNodeHandle, Platform} = ReactNative;
const AccessibleSlider = require('./AccessibleSlider');
const Slider = require('./CustomSlider');

const checkImageSource = require('./check.png');
const uncheckImageSource = require('./uncheck.png');

class Checkbox extends React.Component {
  state = {
    checkboxState: this.props.defaultState,
  };

  _onCheckboxPress = () => {
    const checkboxState = this.state.checkboxState === 'checked' ?
      'unchecked' : 'checked'

    this.setState({
      checkboxState: checkboxState
    });

    if (Platform.OS === 'android') {
      UIManager.sendAccessibilityEvent(
        findNodeHandle(this),
        UIManager.AccessibilityEventTypes.typeViewClicked);
    }
  };

  render() {
    return (
      <TouchableOpacity
        style={{flex:1, flexDirection: 'row',}}
        onPress={this._onCheckboxPress}
        accessibilityLabel={this.props.name}
        accessibilityRole="checkbox"
        accessibilityStates={[this.state.checkboxState]}>
        <Image
          style={styles.image}
          source={this.state.checkboxState === 'checked' ? checkImageSource : uncheckImageSource}/>
        <Text>
          {this.props.name}
        </Text>
      </TouchableOpacity>
    );
  }
}

class CheckboxExample extends React.Component {
  render() {
    return (
      <View>
      <Text>Pizza Toppings</Text>
        <Checkbox
          name='Pepperoni'
          defaultState='checked'/>
        <Checkbox
          name='Cheese'
          defaultState='unchecked'/>
      </View>
    );
  }
}

class AccessibleSliderExample extends React.Component {
  state = {
    value: 0.2
  };

  render() {
    let valueText = 'Value: ' + (this.state.value * 100).toFixed(0) + '%';
    return (
      <View style={styles.container}>
        <AccessibleSlider
          accessibilityLabel={'Display Brightness.'}
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
        />
        <Text>
          {valueText}
        </Text>
      </View>
    );
  }
}

class NonaccessibleSliderExample extends React.Component {
  state = {
    value: 0.2
  };

  render() {
    return (
      <View style={styles.container}>
        <Slider
          value={this.state.value}
          onValueChange={value => this.setState({ value })}
        />
        <Text>
          Value: {(this.state.value * 100).toFixed(0) + '%'}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  },
});

exports.title = 'AccessibilityDemo';
exports.description = 'Examples of accessible elements.';
exports.examples = [
  {
    title: 'Checkbox Example',
    render(): React.Element<typeof CheckboxExample> {
      return <CheckboxExample />;
    },
  },
  {
    title: 'Nonaccessible Slider Example',
    render(): React.Element<typeof NonaccessibleSliderExample> {
      return <NonaccessibleSliderExample />;
    },
  },
  {
    title: 'Accessible Slider Example',
    render(): React.Element<typeof AccessibleSliderExample> {
      return <AccessibleSliderExample />;
    },
  },
];