export const ACTIVE_OPACITY = 0.6;
export const whoCanViewGender = ['Male', 'Female', 'Everyone'];

export const ASYNC_STORAGE_KEYS = {
  TOKEN: 'token',
  USER_ID: 'userSub',
  DB_USER: 'user',
  AUTH_USER: 'authUser',
  REQ_IDS: 'reqIds',
};

export const GENDER = {
  male: 'Male',
  female: 'Female',
  notToSay: 'Prefer not to say',
};

export const MARITAL_STATUS = {
  single: 'Single',
  married: 'Married',
  divorced: 'Divorced',
};

export const ERROR = 'Apple Sign-In failed - no identify token returned';

export const loginScreen = {
  TITLE: 'Login',
  GOOGLE_LOGIN_TITLE: 'Sign in With Google',
};
export const privacyPolicyCaller = {
  CONTINUE_TO_AGREE: 'By continuing, you agree to our ',
  TERMS: ' Terms of Services ',
  CHECK_TERMS_AND_POLICY: 'check our Terms of Service & ',
  ACKNOWLEDGE: 'and acknowledge to our',
  PRIVACY_POLICY: ' Privacy Policy',
  LEARN_HOW: ' to learn how',
  COLLECT_AND_SHARE_DATA: 'we collect, use and share your data',
};

export const PersonalScreen = {
  APPHEADER_TITLE: 'Personal Details',
  FULL_NAME: 'Full Name',
  FULL_NAME_PLACEHOLDER: 'Enter your full name',
  FULL_NAME_ICON: 'person',
  PROFESSION: 'Profession',
  DATE_OF_BIRTH: 'Date of birth',
  ADDRESS: 'Address',
  PROFESSION_PLACEHOLDER: 'Enter your profession',
  DATE_OF_BIRTH_PLACEHOLDER: 'Insert your date of birth',
  PROFESSION_ICON: 'profession',
  DATE_OF_BIRTH_ICON: 'birthday',
  ADDRESS_ICON: 'location',
  ADDRESS_PLACEHOLDER: 'Insert your home address',
  GENDER: 'Gender',
  RELATIONSHIP_STATUS: 'Relationship Status',
  PRIMARYBTN_Cancel: 'Cancel',
  PRIMARYBTN_DONE: 'Done',
  ALERT_TITLE: 'Kindly fill the form completely',
};

export const ProfileScreen = {
  APPHEADER_TITLE: 'Personal Detail',
  FULL_NAME: 'Full Name',
  FULL_NAME_PLACEHOLDER: 'Enter your full name',
  FULL_NAME_ICON: 'person',
  PROFESSION: 'Profession',
  DATE_OF_BIRTH: 'Date of birth',
  ADDRESS: 'Address',
  PROFESSION_PLACEHOLDER: 'Enter your profession',
  DATE_OF_BIRTH_PLACEHOLDER: 'Insert your date of birth',
  PROFESSION_ICON: 'profession',
  DATE_OF_BIRTH_ICON: 'birthday',
  ADDRESS_ICON: 'location',
  ADDRESS_PLACEHOLDER: 'Insert your home address',
  GENDER: 'Gender',
  RELATIONSHIP_STATUS: 'Relationship Status',
  PRIMARY_BTN_SIGN_OUT: 'Sign Out',
  PRIMARYBTN_DONE: 'Done',
  ALERT_TITLE: 'Kindly fill the form the completely',
  DELETE_ACCOUNT: 'Delete Account',
  SIGN_OUT_TITLE: 'SignOut of Nooberly?',
  CANCEL: 'Cancel',
  SIGN_OUT: 'SignOut',
};

export const googleSearch = {
  PLACEHOLDER: 'Enter your exact address',
  RESULT_NOT_FOUND: 'No results were found',
  BTN_TITLE: 'Save',
};
export const mapScreen = {
  ADDRESS_TITLE: 'Edit your Address',
  RESULT_NOT_FOUND: 'No results were found',
  BTN_TITLE: 'Save',
};
export const MAP_DIRECTION = {
  marker_title_you: 'You',
  marker_title_request: 'Request',
};

export const profileVideo = {
  CHANGE_VIDEO: 'Change Video',
  DELETE_ACCOUNT_HEADER: 'You Are About To Delete Your Account!',
  SIGN_OUT_HEADER: 'Sign out of Nooberly?',
  DELETE_ACCOUNT_BODY: 'Deleting your account may result in loss of record.',
  CANCEL: 'Cancel',
  DELETE: 'Delete',
  SIGN_OUT: 'Sign out',
};

export const RECORD_PROFILE_VIDEO = {
  successMsg: 'Your profile video has been updated',
  discardClip: 'Discard Clip?',
  bodyText: 'Do you really want to discard the clip?',
  cancel: 'Keep',
  discard: 'Discard',
};

export const LETS_CONNECT = {
  success: 'Your application has been submitted successfully!',
};

export const ON_BOARDING = {
  success: 'Welcome to Nooberly !!!',
};

export const ERROR_MESSAGES = {
  turnOnLocation:
    'To continue, turn on device location, which uses Google"s location service.',
};

export const LABELS = {
  alert: 'Alert',
  ok: 'OK',
  android: 'android',
  ios: 'ios',
  noLocation: 'No location',
};

export const REQUEST_DETAILS = {
  headerTitle: 'Request Details',
  request: 'Request',
  personalize: 'Personalize',
  edit: 'Edit',
  schedule: 'Schedule',
  done: 'Done',
  title: 'Title',
  offer: 'Offer',
  dateAndTime: 'Date & Time',
  expiryDateAndTime: 'Expiry Date & Time',
  whoCanView: 'Who can view',
  venue: 'Venue',
  add: 'Add',
  anyDayAnyTime: 'Anyday, AnyTime',
  acceptingApplicants: 'Accepting Applicants',
  insertTitle: 'Insert your title',
  modalHeader: 'Request Title',
  modalDescription: 'Enter a title of your own choosing for the request',
  modalButtonForTitle: 'Save',
  applicantsModalHeader: 'Accepting Applicants',
  applicantModalDescription:
    'Select the number of applicants you would be accepting',
  applicantsTitle: 'Applicants',
  applicantPlaceholder: 'Specify the number of applicants',
  minApplicants: 1,
  maxApplicants: 33,
  whoCanViewModalHeader: 'Who Can View?',
  whoCanViewModalDescription: 'Select people who can view your request',
  whoCanViewGender: 'Gender',
  whoCanViewAge: 'Age (in years) ',
  whoCanViewAgeMin: 16,
  whoCanViewAgeMax: 100,
  whoCanViewDistance: 'Display Range (in mile) ',
  whoCanViewDistanceMin: 1,
  whoCanViewDistanceMax: 33,
  whoCanViewAletTitle: 'Alert',
  whoCanViewAlertMsg: 'Please Select Gender',
  whoCanViewGenderDisplay: 'Gender',
  whoCanViewAgeDisplay: 'Age',
  whoCanViewYearDisplay: 'years',
  whoCanViewAreaDisplay: 'Area',
  whoCanViewCharAtDisplay: 'at ',
  whoCanViewMilesDisplay: ' miles',
  insertRequest: 'Insert your request',
  offerSubTitle: 'Insert your offer',
  applicantsSubTitle: 'Specify the number of applicants',
  dateAndTimeSubTitle: 'Select the date & time of your request',
  expirydateAndTimeSubTitle: 'Select the expiry date & time of your request',
  whoCanViewSubTitle: 'Gender, Age, Area',
  venueSubTitle: 'Enter the venue for the request',
  dateAndTimeTitleExpiry: 'Select expiry date and time',
  dateAndTimeTitle: 'Select date and time',
  alertTitle: 'Warning',
  alertMessage: 'Please complete the request',
};

export const OFFER_CATEGORY = {
  headerTitle: 'Your Offer',
};
export const DATE_TIME_FORMAT = {
  dateAndTimeFormate: 'MMMM Do YYYY, h:mm a',
};

export const DATE_FORMAT = 'MM/DD/YYYY';

export const SUCCESS = {
  success_application: 'Your application has been submitted successfully!',
};

export const REQUEST_SUMMARY = {
  headerTitle: 'Request Details',
  request: 'Request',
  title: 'Title',
  offer: 'Offer',
  applicants: 'Accepting Applicants',
  dateAndTime: 'Date & Time',
  expiryDateAndTime: 'Expiry Date & Time',
  whoCanView: 'Who can view',
  venue: 'Venue',
  next: 'Next',
  authorized: 'authorized',
};
