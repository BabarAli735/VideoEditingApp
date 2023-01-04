import React from 'react';
import {
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Text,
  Pressable,
} from 'react-native';
import Header from '../../../components/SimpleHeader';
import {
  WHITE_COLOR,
  BLACK_COLOR,
  APP_PRIMARY_COLOR,
} from '../../../constants/color';
import styles from './SubCategory.style';
import {List} from 'react-native-paper';
import Invitation from '../../../assets/invitation.png';
import FastImage from 'react-native-fast-image';
import {useRequestDetails} from '../../../stores/createRequest';
import {useQuery} from 'react-query';
import {getSubCategories, getSubSubCategories} from '../../../services/api';
import Loader from '../../../components/loader';

const RenderSubSubCategory = ({item, onPress}) => {
  return (
    <Pressable
      style={styles.subSubCategorySubContainer}
      activeOpacity={0.6}
      onPress={() => onPress(item.name)}>
      <Text style={styles.subSubCategoryTitle}>{item.name}</Text>
    </Pressable>
  );
};

const ExpandedSubCategories = ({categoryId, subCategoryId, onPress}) => {
  const {
    isLoading,
    error,
    data: subSubCategories,
  } = useQuery(subCategoryId, () =>
    getSubSubCategories(categoryId, subCategoryId),
  );

  if (isLoading) {
    return <ActivityIndicator color={APP_PRIMARY_COLOR} size={'small'} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Something went wrong, please try again later</Text>
      </View>
    );
  }

  return (
    <View>
      {false && (
        <View style={styles.activityIndicator}>
          <ActivityIndicator size={'small'} color="#000" />
        </View>
      )}

      <View style={styles.subSubCategoryContainer}>
        <View style={styles.subSubInnerCategoryContainer}>
          {subSubCategories &&
            subSubCategories.map(subSubCategory => (
              <RenderSubSubCategory
                key={subSubCategory.id}
                item={subSubCategory}
                onPress={onPress}
              />
            ))}
        </View>
      </View>
    </View>
  );
};

const SubCategory = ({navigation, route}) => {
  const requestCategoryName = route.params.requestCategoryName;
  const categoryId = route.params.categoryId;
  const {
    isLoading,
    error,
    data: subCategories,
  } = useQuery(categoryId, () => getSubCategories(categoryId));

  const [expanded, setExpanded] = React.useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = React.useState(null);
  const setRequest = useRequestDetails(state => state.setRequest);

  const handlePress = id => {
    if (expanded) {
      setExpanded(false);
      setExpandedCategoryId(null);
      return;
    }
    setExpanded(!expanded);
    setExpandedCategoryId(id);
  };

  const navigateToSubCategory = item => {
    setRequest(item);
    navigation.navigate('Root', {
      screen: 'requestDetailStack',
    });
  };

  const renderItem = ({item}) => {
    return (
      <List.Accordion
        expanded={expandedCategoryId === item.id}
        onPress={() => handlePress(item.id)}
        style={styles.accordionContainer}
        titleStyle={styles.accordionTitle}
        title={item.name}
        left={() => (
          <FastImage
            style={styles.accordionIcon}
            source={Invitation}
            resizeMode={'contain'}
          />
        )}>
        <ExpandedSubCategories
          categoryId={categoryId}
          subCategoryId={item.id}
          onPress={navigateToSubCategory}
        />
      </List.Accordion>
    );
  };

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
        title={requestCategoryName}
        onPress={navigation.goBack}
        backgroundColor={WHITE_COLOR}
        titleColor={BLACK_COLOR}
        barStyle="light-content"
      />
      <FlatList
        data={subCategories}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default SubCategory;
