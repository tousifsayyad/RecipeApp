import React from "react";
import { TouchableOpacity, Image } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default function SearchImage(props) {
    return (
        <TouchableOpacity style={styles.headerButtonContainer} onPress={props.onPress}>
            <Image style={styles.headerButtonImage} source={require("../../../assets/icons/search.png")} />
        </TouchableOpacity>
    );
}

SearchImage.propTypes = {
    onPress: PropTypes.func,
};
