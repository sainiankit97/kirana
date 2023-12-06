import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowLeft: {
    height: 30,
    width: 30,
  },
  headingText: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -15,
  },
  bottomContainer: {
    padding: 15,
  },
  imageStyle: {
    height: 120,
    width: '32%',
    borderRadius: 4,
  },
  scrollContainerStyle: {
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'wrap',
    gap: 2,
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingBottom: 150,
  },
});
