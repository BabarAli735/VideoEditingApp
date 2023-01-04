import React from 'react';
import {View, StatusBar, FlatList, Text} from 'react-native';
import Header from '../../../components/SimpleHeader';
import styles from './RequestCategory.style';
import Card from './components/card';

import Loader from '../../../components/loader';

import {WHITE_COLOR, BLACK_COLOR} from '../../../constants/color';
import {useQuery} from 'react-query';
import {getCategories} from '../../../services/api';

const RequestCategory = ({navigation}) => {
  const {
    isLoading,
    error,
    data: categories,
  } = useQuery('categories', getCategories);

  const navigateToSubCategory = item => {
    navigation.navigate('SubCategory', {
      categoryId: item.id,
      requestCategoryName: item.name,
    });
  };

  const renderItem = ({item}) => (
    <Card
      title={`${item.name} Request`}
      subTitle={''}
      onClick={() => navigateToSubCategory(item)}
    />
  );

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Something went wrong, please try again later</Text>
      </View>
    );
  }

  return (
    <View style={styles.safeContainer}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <Header
        title={'Your Request'}
        onPress={navigation.goBack}
        backgroundColor={WHITE_COLOR}
        titleColor={BLACK_COLOR}
        barStyle="light-content"
      />
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default RequestCategory;
