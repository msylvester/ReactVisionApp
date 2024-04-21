import {StyleSheet} from 'react-native';

const homeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffe0',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  projectButtonsContainer: {
    flex: 1,
  },
  bottomButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    color: '#ff0000',
  },
});

export default homeScreenStyles;
