import React from 'react';
import {View, StatusBar, FlatList} from 'react-native';
import Header from '../../../components/SimpleHeader';
import styles from './OfferCategory.style';
import Card from './components/card';
import {WHITE_COLOR, BLACK_COLOR} from '../../../constants/color';
import {OFFER_CATEGORY} from '../../../constants/constants';

const OfferCategory = ({navigation}) => {
  const data = [
    {
      id: '1',
      name: 'Social Request',
    },
    {
      id: '2',
      name: 'Social Request',
    },
    {
      id: '3',
      name: 'Social Request',
    },
    {
      id: '4',
      name: 'Social Request',
    },
    {
      id: '5',
      name: 'Social Request',
    },
    {
      id: '6',
      name: 'Social Request',
    },
    {
      id: '7',
      name: 'Social Request',
    },
  ];
  const navigateToOfferSubCategory = item => {
    navigation.navigate('OfferSubCategory', {
      offerCategoryName: item.name,
    });
  };
  const renderItem = ({item}) => (
    <Card
      title={item.name}
      subTitle={'Sports, Date, Pray, walk ..'}
      onClick={() => navigateToOfferSubCategory(item)}
    />
  );
  return (
    <View style={styles.safeContainer}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <Header
        title={OFFER_CATEGORY.headerTitle}
        onPress={navigation.goBack}
        backgroundColor={WHITE_COLOR}
        titleColor={BLACK_COLOR}
        barStyle="light-content"
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};
export default OfferCategory;
