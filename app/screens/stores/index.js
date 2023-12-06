import React, {useEffect, useState} from 'react';
import {FlatList, Image, Modal, Pressable, Text, View} from 'react-native';
import database from '@react-native-firebase/database';
import StoreTile from '../../components/storeTile';
import styles from './styles';
import Input from '../../components/input';
import Spinner from '../../components/spinner';
import FilterIcon from '../../assets/filter.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stores = ({navigation, route}) => {
  const {userId} = route.params;
  const [user, setUser] = useState({});
  const [stores, setStores] = useState({});
  const [areas, setAreas] = useState([]);
  const [types, setTypes] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [storesDataToShow, setStoresDataToShow] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilterType, setSelectedFilterType] = useState('area');
  const [filters, setFilters] = useState({
    area: '',
    route: '',
    type: '',
  });

  useEffect(() => {
    database()
      .ref(`/users/${userId}`)
      .once('value', snapshot => {
        setUser(snapshot.val());
      });
  }, [userId]);

  const getFilters = storesInfo => {
    let areas = [];
    let types = [];
    let routes = [];
    Object.keys(storesInfo).forEach(key => {
      const storeInfo = storesInfo[key];
      if (!areas.includes(storeInfo.area)) {
        areas.push(storeInfo.area);
      }
      if (!types.includes(storeInfo.type)) {
        types.push(storeInfo.type);
      }
      if (!routes.includes(storeInfo.route)) {
        routes.push(storeInfo.route);
      }
    });
    setAreas(areas);
    setRoutes(routes);
    setTypes(types);
  };

  useEffect(() => {
    setShowSpinner(true);
    database()
      .ref('/stores')
      .once('value', snapshot => {
        const storesInfo = snapshot.val();
        setStores(storesInfo);
        getFilters(storesInfo);
        setStoresDataToShow(storesInfo);
        setShowSpinner(false);
      });
  }, []);

  const searchStores = text => {
    const getData = setTimeout(() => {
      const filteredData = {};
      Object.keys(stores).forEach(key => {
        const storeInfo = stores[key];
        if (
          storeInfo.name.toLowerCase().includes(text.toLowerCase()) ||
          storeInfo.address.toLowerCase().includes(text.toLowerCase())
        ) {
          filteredData[key] = storeInfo;
        }
      });
      setStoresDataToShow(filteredData);
    }, 2000);

    return () => clearTimeout(getData);
  };

  useEffect(() => {
    const filteredData = {};
    if (!filters.area && !filters.route && !filters.type) {
      setStoresDataToShow(stores);
    } else {
      Object.keys(stores).forEach(key => {
        const storeInfo = stores[key];
        if (
          (filters.area && storeInfo.area === filters.area) ||
          (filters.route && storeInfo.route === filters.route) ||
          (filters.type && storeInfo.type === filters.type)
        ) {
          filteredData[key] = storeInfo;
        }
      });
      setStoresDataToShow(filteredData);
    }
  }, [filters]);

  const renderFilters = () => {
    if (selectedFilterType === 'area') {
      return (
        <View style={styles.filtersContainer}>
          {areas.map((area, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  if (filters.area === area) {
                    setFilters(prev => {
                      return {
                        ...prev,
                        area: '',
                      };
                    });
                  } else {
                    setFilters(prev => {
                      return {
                        ...prev,
                        area,
                      };
                    });
                  }
                }}>
                <Text
                  style={[
                    styles.filterItemText,
                    filters.area === area && {color: 'blue'},
                  ]}>
                  {area}
                </Text>
              </Pressable>
            );
          })}
        </View>
      );
    } else if (selectedFilterType === 'type') {
      return (
        <View style={styles.filtersContainer}>
          {types.map((type, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  if (filters.type === type) {
                    setFilters(prev => {
                      return {
                        ...prev,
                        type: '',
                      };
                    });
                  } else {
                    setFilters(prev => {
                      return {
                        ...prev,
                        type,
                      };
                    });
                  }
                }}>
                <Text
                  style={[
                    styles.filterItemText,
                    filters.type === type && {color: 'blue'},
                  ]}>
                  {type}
                </Text>
              </Pressable>
            );
          })}
        </View>
      );
    } else if (selectedFilterType === 'route') {
      return (
        <View style={styles.filtersContainer}>
          {routes.map((route, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => {
                  if (filters.route === route) {
                    setFilters(prev => {
                      return {
                        ...prev,
                        route: '',
                      };
                    });
                  } else {
                    setFilters(prev => {
                      return {
                        ...prev,
                        route,
                      };
                    });
                  }
                }}>
                <Text
                  style={[
                    styles.filterItemText,
                    filters.route === route && {color: 'blue'},
                  ]}>
                  {route}
                </Text>
              </Pressable>
            );
          })}
        </View>
      );
    }
    return null;
  };

  const handleLogout = () => {
    AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.nameStyles}>Hi, {user?.name || ''}</Text>
          <Pressable onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
        <View style={styles.listContainer}>
          <View style={styles.searchAndFilterContainer}>
            <View style={styles.searchContainer}>
              <Input placeholder="Search" onChangeText={searchStores} />
            </View>
            <Pressable
              onPress={() => {
                setShowFilters(true);
              }}>
              <Image source={FilterIcon} style={styles.filterIcon} />
            </Pressable>
          </View>
          <FlatList
            style={styles.flatList}
            data={user?.stores}
            showsVerticalScrollIndicator={false}
            renderItem={item => (
              <StoreTile
                storeId={item.item}
                storeInfo={storesDataToShow?.[item.item]}
                navigation={navigation}
              />
            )}
          />
        </View>
      </View>
      <Spinner visible={showSpinner} />
      <Modal transparent={true} animationType="fade" visible={showFilters}>
        <Pressable
          style={styles.modalView}
          onPress={() => {
            setShowFilters(false);
          }}></Pressable>
        <View style={styles.modalContainer}>
          <View style={styles.filterTextContainer}>
            <Text style={styles.filterText}>Filters</Text>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.leftContainer}>
              <Pressable
                style={styles.filterTypeContainer}
                onPress={() => {
                  setSelectedFilterType('area');
                }}>
                <Text
                  style={[
                    styles.filterTypeText,
                    selectedFilterType === 'area' && {color: 'blue'},
                  ]}>
                  Area
                </Text>
              </Pressable>
              <Pressable
                style={styles.filterTypeContainer}
                onPress={() => {
                  setSelectedFilterType('type');
                }}>
                <Text
                  style={[
                    styles.filterTypeText,
                    selectedFilterType === 'type' && {color: 'blue'},
                  ]}>
                  Type
                </Text>
              </Pressable>
              <Pressable
                style={styles.filterTypeContainer}
                onPress={() => {
                  setSelectedFilterType('route');
                }}>
                <Text
                  style={[
                    styles.filterTypeText,
                    selectedFilterType === 'route' && {color: 'blue'},
                  ]}>
                  Route
                </Text>
              </Pressable>
            </View>
            <View style={styles.rightContainer}>{renderFilters()}</View>
          </View>
          <View style={{paddingHorizontal: 10}}>
            <Pressable
              onPress={() => {
                setFilters({
                  area: '',
                  route: '',
                  type: '',
                });
              }}>
              <Text style={styles.clearFilterText}>Clear Filters</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Stores;
