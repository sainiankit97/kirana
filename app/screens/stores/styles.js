import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'grey',
  },
  listContainer: {
    flex: 1,
    paddingTop: 0,
    padding: 10,
  },
  flatList: {
    flex: 1,
    marginTop: 20,
  },
  nameStyles: {
    fontSize: 24,
    lineHeight: 36,
    fontWeight: 'bold',
    color: 'black',
  },
  logoutText: {
    color: 'black',
  },
  searchAndFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 20,
    // marginTop: -10,
  },
  searchContainer: {
    flex: 0.85,
  },
  filterIcon: {
    height: 30,
    width: 30,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: '60%',
  },
  filterText: {
    fontSize: 24,
    lineHeight: 32,
    color: 'black',
  },
  filterTextContainer: {
    borderBottomWidth: 1,
    padding: 15,
    borderColor: '#dfdfdf',
  },
  bottomContainer: {
    flexDirection: 'row',
    height: '80%',
  },
  leftContainer: {
    padding: 15,
    borderRightWidth: 1,
    borderColor: '#dfdfdf',
    height: '95%',
    gap: 20,
  },
  filterTypeText: {
    fontSize: 22,
    lineHeight: 28,
    color: 'black',
  },
  filterTypeContainer: {
    paddingBottom: 10,
  },
  rightContainer: {
    padding: 20,
  },
  filterItemText: {
    fontSize: 18,
  },
  filtersContainer: {
    gap: 10,
  },
  clearFilterText: {
    fontSize: 16,
    color: 'blue',
  },
});
