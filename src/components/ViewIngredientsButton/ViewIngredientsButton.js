import React from 'react';
import { TouchableHighlight, Image, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function ViewIngredientsButton(props) {
  return (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.1)" onPress={props.onPress} style={styles.container}>
      <Text style={styles.text}>View Ingredients</Text>
    </TouchableHighlight>
  );
}

ViewIngredientsButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string
};
