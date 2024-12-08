
import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width, height } = Dimensions.get('window');

const Index = () => {
  const [devices, setDevices] = useState([]);
  const [filteredDevices, setFilteredDevices] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation(); // Get navigation object

  // Fetch device data
  const fetchDevices = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://openbekeniot.github.io/webapp/devices.json');
      const data = await response.json();
      setDevices(data.devices);
      setFilteredDevices(data.devices);
    } catch (error) {
      console.error('Error fetching devices:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input
  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = devices.filter((device) => {
      const combinedText = [
        device.name || '',
        device.model || '',
        device.chip || '',
        device.keywords ? device.keywords.join(' ') : '',
      ]
        .join(' ')
        .toLowerCase();
      return combinedText.includes(query.toLowerCase());
    });
    setFilteredDevices(filtered);
    setPage(0);
  };

  // Load more devices for infinite scrolling
  const loadMoreImages = () => {
    if (loading) return;
    const pageSize = 5;
    const startIndex = page * pageSize;
    const nextBatch = filteredDevices.slice(startIndex, startIndex + pageSize);
    if (nextBatch.length > 0) {
      setFilteredDevices((prev) => [...prev, ...nextBatch]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>

    <View style={styles.container}>
      {/* Search & Menu Section */}
      <View style={styles.searchContainer}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <Ionicons name={menuVisible ? 'menu' : 'close'} size={24} color="black" />
        </TouchableOpacity>

        {menuVisible && (
          <TextInput
            style={styles.searchInput}
            placeholder="Search devices..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
        )}
      </View>

      {!menuVisible && (
        <>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>OpenBeken IoT Devices Teardowns Database</Text>
          </View>

          {/* Static Content */}
          <View style={styles.staticContainer}>
            <ScrollView contentContainerStyle={styles.staticContent}>
              <Text style={styles.text}>
                Powered by Elektroda.com teardowns section. Submit your teardowns or browse our tutorials!
              </Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Have a device? Submit a teardown here!</Text>
              </TouchableOpacity>

              <Text style={styles.text}>
                Want cloud-free devices? Flash OpenBeken firmware on BK7231N, BK7231T, and more.
              </Text>

              <Text style={styles.text}>
                Donate to support our teardown projects! Every $1 helps us buy more devices.
              </Text>
            </ScrollView>
          </View>
        </>
      )}

      {/* Dynamic List */}
      <View style={styles.listContainer}>
        <FlatList
          data={filteredDevices.slice(0, (page + 1) * 5)}
          keyExtractor={(item, index) => index.toString()}
   
          renderItem={({ item }) => {
            // console.log(item); // Log each item to check if data is available
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('inside', { device: item })}
              >
                <Image source={{ uri: item.image }} style={styles.image} />
              </TouchableOpacity>
            );
          }}
          onEndReached={loadMoreImages}
          onEndReachedThreshold={0.5}
          keyboardShouldPersistTaps="handled"
          ListFooterComponent={loading ? <ActivityIndicator style={styles.loader} /> : null}
        />
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: height * 0.1, // 10% of the screen height for the header
    backgroundColor: '#1e90ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: width > 400 ? 24 : 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  staticContainer: {
    height: height * 0.2, // 20% of the screen height for static content
  },
  staticContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: width > 400 ? 16 : 14,
    color: '#333',
    marginBottom: 10,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#32cd32',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  menuIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: '100%',
    height: height * 0.5,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  loader: {
    marginVertical: 20,
  },
  safeArea: {
    flex: 1,
    // paddingTop: 40,}
  }
});

export default Index;
