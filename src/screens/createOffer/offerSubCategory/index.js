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
import {WHITE_COLOR, BLACK_COLOR} from '../../../constants/color';
import styles from './OfferSubCategory.style';
import {List} from 'react-native-paper';
import Invitation from '../../../assets/invitation.png';
import FastImage from 'react-native-fast-image';
import {useRequestDetails} from '../../../stores/createRequest';

const OfferSubCategory = ({navigation, route}) => {
  const [expanded, setExpanded] = React.useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = React.useState(null);
  const setOffer = useRequestDetails(state => state.setOffer);

  const handlePress = id => {
    if (expanded) {
      setExpanded(false);
      setExpandedCategoryId(null);
    } else {
      setExpanded(!expanded);
      setExpandedCategoryId(id);
    }
  };

  const data = [
    {
      id: '1',
      name: 'Create Event Invitation',
    },
    {
      id: '2',
      name: 'Games',
    },
    {
      id: '3',
      name: 'Sports And Exercise',
    },
    {
      id: '4',
      name: 'Hangout',
    },
  ];

  const subSubCat = [
    {
      id: '1',
      name: 'Outdoors & Travel Invite',
    },
    {
      id: '2',
      name: 'Team Sports Invite',
    },
    {
      id: '1',
      name: 'Outdoors & Travel Invite',
    },
    {
      id: '2',
      name: 'Team Sports Invite',
    },
  ];

  const RenderSubSubCategory = ({item}) => {
    return (
      <Pressable
        style={styles.subSubCategorySubContainer}
        activeOpacity={0.6}
        onPress={() => navigateToSubCategory(item.name)}>
        <Text style={styles.subSubCategoryTitle}>{item?.name}</Text>
      </Pressable>
    );
  };

  const renderItem = ({item}) => {
    return (
      <List.Accordion
        expanded={expandedCategoryId === item.id}
        onPress={() => handlePress(item.id)}
        style={styles.accordianContainer}
        titleStyle={styles.accordianTitle}
        title={item.name}
        left={() => (
          <FastImage
            style={styles.accordianIcon}
            source={Invitation}
            resizeMode={'contain'}
          />
        )}>
        <View>
          {false && (
            <View style={styles.activityIndicator}>
              <ActivityIndicator size={'small'} color="#000" />
            </View>
          )}

          <View style={styles.subSubCategoryContainer}>
            {subSubCat.map((subSubCategory, Index) => (
              <RenderSubSubCategory key={Index} item={subSubCategory} />
            ))}
          </View>
        </View>
      </List.Accordion>
    );
  };

  const navigateToSubCategory = name => {
    setOffer(name);
    navigation.navigate('Root', {
      screen: 'requestDetailStack',
    });
  };

  return (
    <View style={styles.safeContainer}>
      <StatusBar backgroundColor={WHITE_COLOR} barStyle="dark-content" />
      <Header
        title={route.params.offerCategoryName}
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

export default OfferSubCategory;
