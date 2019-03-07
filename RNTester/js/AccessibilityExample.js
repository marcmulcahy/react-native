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
const {AccessibilityInfo, Text, View, TouchableOpacity, Alert} = ReactNative;

const RNTesterBlock = require('./RNTesterBlock');

class AccessibilityExample extends React.Component {
  render() {
    return (
      <View>
        <RNTesterBlock title="TextView without label">
          <Text>
            Text's accessibilityLabel is the raw text itself unless it is set
            explicitly.
          </Text>
        </RNTesterBlock>

        <RNTesterBlock title="TextView with label">
          <Text accessibilityLabel="I have label, so I read it instead of embedded text.">
            This text component's accessibilityLabel is set explicitly.
          </Text>
        </RNTesterBlock>

        <RNTesterBlock title="Nonaccessible view with TextViews">
          <View>
            <Text style={{color: 'green'}}>This is text one.</Text>
            <Text style={{color: 'blue'}}>This is text two.</Text>
          </View>
        </RNTesterBlock>

        <RNTesterBlock title="Accessible view with TextViews wihout label">
          <View accessible={true}>
            <Text style={{color: 'green'}}>This is text one.</Text>
            <Text style={{color: 'blue'}}>This is text two.</Text>
          </View>
        </RNTesterBlock>

        <RNTesterBlock title="Accessible view with TextViews with label">
          <View
            accessible={true}
            accessibilityLabel="I have label, so I read it instead of embedded text.">
            <Text style={{color: 'green'}}>This is text one.</Text>
            <Text style={{color: 'blue'}}>This is text two.</Text>
          </View>
        </RNTesterBlock>

        {/* Android screen readers will say the accessibility hint instead of the text
        since the view doesn't have a label. */}
        <RNTesterBlock title="Accessible view with TextViews with hint">
          <View accessibilityHint="Accessibility hint." accessible={true}>
            <Text style={{color: 'green'}}>This is text one.</Text>
            <Text style={{color: 'blue'}}>This is text two.</Text>
          </View>
        </RNTesterBlock>

        <RNTesterBlock title="Accessible view TextViews with label and hint">
          <View
            accessibilityLabel="Accessibility label."
            accessibilityHint="Accessibility hint."
            accessible={true}>
            <Text style={{color: 'green'}}>This is text one.</Text>
            <Text style={{color: 'blue'}}>This is text two.</Text>
          </View>
        </RNTesterBlock>

        <RNTesterBlock title="Text with accessibilityRole = header">
          <Text accessibilityRole="header">This is a title.</Text>
        </RNTesterBlock>

        <RNTesterBlock title="Touchable with accessibilityRole = link">
          <TouchableOpacity
            onPress={() => Alert.alert('Link has been clicked!')}
            accessibilityRole="link">
            <View>
              <Text>Click me</Text>
            </View>
          </TouchableOpacity>
        </RNTesterBlock>

        <RNTesterBlock title="Touchable with accessibilityRole = button">
          <TouchableOpacity
            onPress={() => Alert.alert('Button has been pressed!')}
            accessibilityRole="button">
            <Text>Click me</Text>
          </TouchableOpacity>
        </RNTesterBlock>

        <RNTesterBlock title="Disabled Touchable with role">
          <TouchableOpacity
            onPress={() => Alert.alert('Button has been pressed!')}
            accessibilityRole="button"
            accessibilityStates={['disabled']}
            disabled={true}>
            <View>
              <Text>
                I am disabled. Clicking me will not trigger any action.
              </Text>
            </View>
          </TouchableOpacity>
        </RNTesterBlock>

        <RNTesterBlock title="View with multiple states">
          <View
            accessible={true}
            accessibilityStates={['selected', 'disabled']}>
            <Text>This view is selected and disabled.</Text>
          </View>
        </RNTesterBlock>

        <RNTesterBlock title="View with label, hint, role, and state">
          <View
            accessible={true}
            accessibilityLabel="Accessibility label."
            accessibilityRole="button"
            accessibilityStates={['selected']}
            accessibilityHint="Accessibility hint.">
            <Text>Accessible view with label, hint, role, and state</Text>
          </View>
        </RNTesterBlock>
      </View>
    );
  }
}

class AccessibilityActionsExample extends React.Component {
  render() {
    return (
      <View>
        <RNTesterBlock title="Non-touchable with activate action">
          <View
            accessible={true}
            accessibilityActions={[{name: 'activate'}]}
            onAccessibilityAction={event => {
              switch (event.nativeEvent.actionName) {
                case 'activate':
                  Alert.alert('Alert', 'View is clicked');
                  break;
              }
            }}>
            <Text>Click me</Text>
          </View>
        </RNTesterBlock>

        <RNTesterBlock title="View with multiple actions">
          <View
            accessible={true}
            accessibilityActions={[
              {name: 'cut', label: 'cut label'},
              {name: 'copy', label: 'copy label'},
              {name: 'paste', label: 'paste label'},
            ]}
            onAccessibilityAction={event => {
              switch (event.nativeEvent.actionName) {
                case 'cut':
                  Alert.alert('Alert', 'cut action success');
                  break;
                case 'copy':
                  Alert.alert('Alert', 'copy action success');
                  break;
                case 'paste':
                  Alert.alert('Alert', 'paste action success');
                  break;
              }
            }}>
            <Text>This view supports many actions.</Text>
          </View>
        </RNTesterBlock>

        <RNTesterBlock title="Adjustable with increment/decrement actions">
          <View
            accessible={true}
            accessibilityRole="adjustable"
            accessibilityActions={[{name: 'increment'}, {name: 'decrement'}]}
            onAccessibilityAction={event => {
              switch (event.nativeEvent.actionName) {
                case 'increment':
                  Alert.alert('Alert', 'increment action success');
                  break;
                case 'decrement':
                  Alert.alert('Alert', 'decrement action success');
                  break;
              }
            }}>
            <Text>Slider</Text>
          </View>
        </RNTesterBlock>
      </View>
    );
  }
}

class ScreenReaderStatusExample extends React.Component<{}> {
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

exports.title = 'Accessibility';
exports.description = 'Examples of using Accessibility APIs.';
exports.examples = [
  {
    title: 'Accessibility elements',
    render(): React.Element<typeof AccessibilityExample> {
      return <AccessibilityExample />;
    },
  },
  {
    title: 'Accessibility action examples',
    render(): React.Element<typeof AccessibilityActionsExample> {
      return <AccessibilityActionsExample />;
    },
  },
  {
    title: 'Check if the screen reader is enabled',
    render(): React.Element<typeof ScreenReaderStatusExample> {
      return <ScreenReaderStatusExample />;
    },
  },
];
