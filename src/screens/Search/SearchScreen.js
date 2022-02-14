import React, {useEffect, useLayoutEffect, useState, useRef} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import {TextInput} from 'react-native-gesture-handler';
import {search} from '../../api';

export default function SearchScreen(props) {
  const {navigation} = props;

  const [value, setValue] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.searchContainer}>
          <TextInput
            ref={searchRef}
            style={styles.searchInput}
            onChangeText={handleSearch}
            value={value}
            placeholder="Search for meal.."
            placeholderTextColor={'#676767'}
          />
          {value == '' ? (
            <View style={{width: 20}} />
          ) : (
            <Pressable onPress={() => handleClear()}>
              <Image
                style={styles.searchIcon}
                source={require('../../../assets/icons/close.png')}
              />
            </Pressable>
          )}
        </View>
      ),
      headerRight: () => <View />,
    });
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      searchRef?.current?.focus();
    }, 400);
  }, []);

  const handleClear = () => {
    setData([]);
    setValue('');
  };

  const handleSearch = text => {
    if (!text) {
      setValue(text);
      setData([]);
      return;
    }
    setValue(text);
    setLoading(true);
    search(text)
      .then(function (res) {
        let recipeArray = res.data.meals;
        if (text == '') {
          setData([]);
        } else {
          setData(recipeArray);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };

  const onPressRecipe = item => {
    navigation.navigate('Recipe', {item});
  };

  const renderRecipes = ({item}) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,0.1)"
      onPress={() => onPressRecipe(item)}
      style={styles.container}>
      <>
        <Image style={styles.photo} source={{uri: item.strMealThumb}} />
        <Text style={styles.title}>{item.strMeal}</Text>
        <Text style={styles.category}>{item.strCategory}</Text>
      </>
    </TouchableHighlight>
  );

  return (
    <>
      {loading ? (
        <ActivityIndicator style={{height: 100}} color="#989898" size="large" />
      ) : (
        <FlatList
          vertical
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={data}
          renderItem={renderRecipes}
          keyExtractor={item => `${item.idMeal}`}
        />
      )}
    </>
  );
}
