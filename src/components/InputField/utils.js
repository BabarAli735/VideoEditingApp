import profession_icon from '../../assets/profession_icon.png';
import birthday_icon from '../../assets/birthday_icon.png';
import location_icon from '../../assets/Location_Pin.png';
import person from '../../assets/person.png';
import searchIcon from '../../assets/searchIcon.png';

export const getIcon = icon => {
  switch (icon) {
    case 'profession':
      return profession_icon;
    case 'birthday':
      return birthday_icon;
    case 'location':
      return location_icon;
    case 'person':
      return person;
    case 'search':
      return searchIcon;
    default:
      break;
  }
};
