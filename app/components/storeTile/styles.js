import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  tileContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#dfdfdf',
  },
  storeName: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '500',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  storeType: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'right',
    color: 'black',
  },
  storeAddress:{
    marginTop:20
  }
});
