/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * @flow
 */

'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {AccessibilityInfo, Text, View, TouchableOpacity, Alert} = ReactNative;

class AccessibilityIOSExample extends React.Component<{}> {
  render() {
    return (
      <View>
        <View
          onAccessibilityTap={() =>
            Alert.alert('Alert', 'onAccessibilityTap success')
          }
          accessible={true}>
          <Text>Accessibility normal tap example</Text>
        </View>
        <View
          onMagicTap={() => Alert.alert('Alert', 'onMagicTap success')}
          accessible={true}>
          <Text>Accessibility magic tap example</Text>
        </View>
        <View
          onAccessibilityEscape={() => alert('onAccessibilityEscape success')}
          accessible={true}>
          <Text>Accessibility escape example</Text>
        </View>
        <View accessibilityLabel="Some announcement" accessible={true}>
          <Text>Accessibility label example</Text>
        </View>
        <View
          accessibilityRole="button"
          accessibilityStates={['selected']}
          accessible={true}>
          <Text>Accessibility traits example</Text>
        </View>
        <Text>
          Text's accessibilityLabel is the raw text itself unless it is set
          explicitly.
        </Text>
        <Text accessibilityLabel="Test of accessibilityLabel" accessible={true}>
          This text component's accessibilityLabel is set explicitly.
        </Text>
        <View
          accessibilityLabel="Test of accessibilityHint"
          accessibilityHint="The hint provides more info than the label does"
          accessible={true}>
          <Text>
            This view component has both an accessibilityLabel and an
            accessibilityHint explicitly set.
          </Text>
        </View>
        <Text
          accessibilityLabel="Test of accessibilityHint"
          accessibilityHint="The hint provides more info than the label does">
          This text component has both an accessibilityLabel and an
          accessibilityHint explicitly set.
        </Text>
        <TouchableOpacity
          accessibilityLabel="Test of accessibilityHint"
          accessibilityHint="The hint provides more info than the label does">
          <View>
            <Text>
              This button has both an accessibilityLabel and an
              accessibilityHint explicitly set.
            </Text>
          </View>
        </TouchableOpacity>
        <View accessibilityElementsHidden={true}>
          <Text>
            This view's children are hidden from the accessibility tree
          </Text>
        </View>
      </View>
    );
  }
}

class ScreenReaderStatusExample extends React.Component<{}, $FlowFixMeState> {
  state = {
    screenReaderEnabled: false,
  };

  componentDidMount() {
    AccessibilityInfo.addEventListener(
      'change',
      this._handleScreenReaderToggled,
    );
    AccessibilityInfo.fetch().done(isEnabled => {
      this.setState({
        screenReaderEnabled: isEnabled,
      });
    });
  }

  componentWillUnmount() {
    AccessibilityInfo.removeEventListener(
      'change',
      this._handleScreenReaderToggled,
    );
  }

  _handleScreenReaderToggled = isEnabled => {
    this.setState({
      screenReaderEnabled: isEnabled,
    });
  };

  render() {
    return (
      <View>
        <Text>
          The screen reader is{' '}
          {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}.
        </Text>
      </View>
    );
  }
}

class AccessibilityRoleAndStateExample extends React.Component<{}> {
  render() {
    return (
      <View>
        <View
            //accessibilityRole="alert"
            accessible={true}>
            <Text>Alert example</Text>
        </View>
        <View
            //accessibilityRole="checkbox"
            //accessibilityStates={['checked']}
            accessible={true}>
            <Text>Checkbox example</Text>
        </View>
        <View
            //accessibilityRole="combobox"
            accessible={true}>
            <Text>Combobox example</Text>
        </View>
        <View
            //accessibilityRole="editabletext"
            accessible={true}>
            <Text>Editable text example</Text>
        </View>
        <View
            //accessibilityRole="menu"
            accessible={true}>
            <Text>Menu example</Text>
        </View>
        <View
            //accessibilityRole="menubar"
            accessible={true}>
            <Text>Menu bar example</Text>
        </View>
        <View
            //accessibilityRole="menuitem"
            accessible={true}>
            <Text>Menu item example</Text>
        </View>
        <View
            //accessibilityRole="progressbar"
            accessible={true}>
            <Text>Progress bar example</Text>
        </View>
        <View
            //accessibilityRole="radiobutton"
            accessible={true}>
            <Text>Progress bar example</Text>
        </View>
        <View
            //accessibilityRole="radiogroup"
            accessible={true}>
            <Text>Progress bar example</Text>
        </View>
        <View
            //accessibilityRole="scrollbar"
            accessible={true}>
            <Text>Scrollbar example</Text>
        </View>
        <View
            //accessibilityRole="spinbutton"
            accessible={true}>
            <Text>Spin button example</Text>
        </View>
        <View
            //accessibilityRole="switch"
            //accessibilityStates={["on"]}
            accessible={true}>
            <Text>Switch example</Text>
        </View>
        <View
            //accessibilityRole="tab"
            accessible={true}>
            <Text>Tab example</Text>
        </View>
        <View
            //accessibilityRole="tablist"
            accessible={true}>
            <Text>Tab list example</Text>
        </View>
        <View
            //accessibilityRole="timer"
            accessible={true}>
            <Text>Timer example</Text>
        </View>
        <View
            //accessibilityRole="toolbar"
            accessible={true}>
            <Text>Toolbar example</Text>
        </View>
      </View>
    );
  }
}
exports.title = 'AccessibilityIOS';
exports.description = "Interface to show iOS' accessibility samples";
exports.examples = [
  {
    title: 'Accessibility elements',
    render(): React.Element<any> {
      return <AccessibilityIOSExample />;
    },
  },
  {
    title: 'Check if the screen reader is enabled',
    render(): React.Element<any> {
      return <ScreenReaderStatusExample />;
    },
  },
    {
    title: 'New accessibility roles and states',
    render(): React.Element<any> {
      return <AccessibilityRoleAndStateExample />;
    },
  },
];
