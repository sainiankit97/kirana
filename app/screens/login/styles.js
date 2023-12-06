import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 40,
    // alignItems: 'center',
    // backgroundColor: 'yellow',
  },
  loginText: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  logo: {
    width: 200,
    marginTop: 100,
    alignSelf: 'center',
  },
  loginContainer: {
    borderWidth: 1,
    borderColor: '#dfdfdf',
    padding: 20,
    borderRadius: 12,
  },
  error: {
    fontSize: 12,
    lineHeight: 18,
    color: 'red',
    marginTop: 10,
  },
});
