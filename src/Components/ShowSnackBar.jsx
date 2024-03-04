import {showSnackBar} from '@prince8verma/react-native-snackbar';

const ShowSnackBar = (text, bgColor, confirmText = '') => {
  showSnackBar({
    message: `\n${text}`,
    backgroundColor: bgColor,
    duration: 4000,
    position: 'bottom',
    confirmText: confirmText,
    paddingTop: 100,
  });
};

export default ShowSnackBar;
