import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';

import { ViewPropTypes } from '../config';

const dimensions = Dimensions.get('window');
const windowWidth = dimensions.width;
const windowHeight = dimensions.height;

const Overlay = props => {
  const {
    children,
    isVisible,
    containerStyle,
    overlayStyle,
    windowBackgroundColor,
    overlayBackgroundColor,
    borderRadius,
    width,
    height,
    fullScreen,
    ...rest
  } = props;
  if (!isVisible) return null;
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: windowBackgroundColor },
        containerStyle,
      ]}
      {...rest}
    >
      <View
        style={[
          styles.overlay,
          {
            borderRadius,
            backgroundColor: overlayBackgroundColor,
            width,
            height,
          },
          fullScreen && { width: windowWidth, height: windowHeight },
          overlayStyle,
        ]}
      >
        {children}
      </View>
    </View>
  );
};

Overlay.propTypes = {
  children: PropTypes.any.isRequired,
  isVisible: PropTypes.bool.isRequired,
  containerStyle: ViewPropTypes.style,
  overlayStyle: ViewPropTypes.style,
  windowBackgroundColor: PropTypes.string,
  overlayBackgroundColor: PropTypes.string,
  borderRadius: PropTypes.number,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fullScreen: PropTypes.bool,
};

Overlay.defaultProps = {
  borderRadius: 3,
  fullScreen: false,
  windowBackgroundColor: 'rgba(0, 0, 0, .4)',
  overlayBackgroundColor: 'white',
  width: windowWidth - 80,
  height: windowHeight - 180,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  overlay: {
    borderRadius: 5,
    padding: 10,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});

export default Overlay;
