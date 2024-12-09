import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  PermissionsAndroid,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import TouchID from 'react-native-touch-id';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClockRotateLeft,
  faListCheck,
  faGaugeHigh,
  faSackDollar,
  faMoneyBillTransfer,
  faRightFromBracket,
  faLocationDot,
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

// Geocoder.init(
//   'LN8f3JOtvLr3u9Apod27T4ILqVVHScfsFIDro0rXISvf1GlALCyIbwfkPAJLhYgM',
// );
const Attendance = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [locationName, setLocationName] = useState('');

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const optionalConfigObject = {
    title: 'Authentication Required',
    sensorDescription: 'Touch sensor',
    cancelText: 'Cancel',
    fallbackLabel: 'Show Passcode',
    unifiedErrors: false,
    passcodeFallback: false,
  };

  const [supported, setSupported] = useState(null);
  const [name, setName] = useState('anonim');

  useEffect(() => {
    TouchID.isSupported()
      .then(success => {
        setSupported(true);
      })
      .catch(error => {
        console.log('ERROR TOUCH:', error);
        Alert.alert('Touch ID not supported');
      });

    const updateDateTime = () => {
      const date = new Date();
      const wibOffset = 7 * 60; // WIB is UTC + 7
      const localOffset = date.getTimezoneOffset();
      const wibTime = new Date(
        date.getTime() + (wibOffset + localOffset) * 60000,
      );

      const hours = wibTime.getHours().toString().padStart(2, '0');
      const minutes = wibTime.getMinutes().toString().padStart(2, '0');
      const seconds = wibTime.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);

      const dayNames = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const day = dayNames[wibTime.getDay()];
      const dateNum = wibTime.getDate().toString().padStart(2, '0');
      const month = monthNames[wibTime.getMonth()];
      const year = wibTime.getFullYear();

      setCurrentDate(`${day}, ${dateNum} ${month} ${year}`);
    };

    const interval = setInterval(updateDateTime, 1000);
    updateDateTime();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Request location permission on Android
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'This app needs access to your location to display your current location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('You can use the location');
          } else {
            console.log('Location permission denied');
            setLocationError('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    // Get current location
    const fetchCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          setLocation({latitude, longitude});
          // fetchLocationName(latitude, longitude);
          setLocationError(null);
        },
        error => {
          console.log(error.code, error.message);
          setLocationError(error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    // Fetch location name based on latitude and longitude
    // const fetchLocationName = async (latitude, longitude) => {
    //   try {
    //     const response = await Geocoder.from(latitude, longitude);
    //     const address = response.results[0].formatted_address;
    //     setLocationName(address);
    //   } catch (error) {
    //     console.error('Geocoding error:', error);
    //     // Handle error accordingly
    //   }
    // };

    // Update current date and time
    const updateDateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);

      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const month = monthNames[now.getMonth()];
      const day = now.getDate();
      const year = now.getFullYear();
      setCurrentDate(
        `${now.toLocaleDateString('en-US', {
          weekday: 'long',
        })}, ${day} ${month} ${year}`,
      );
    };

    requestLocationPermission();
    fetchCurrentLocation();
    updateDateTime();
  }, []);

  const handleBiometric = () => {
    const config = {
      title: 'Absensi Karyawan',
      color: 'yellow',
      sensorDescription: 'Tempelkan sidik jari ke sensor perangkat anda',
      fallbackLabel: 'Show Passcode',
      unifiedErrors: false,
      passcodeFallback: false,
    };
    TouchID.authenticate('Absensi', config)
      .then(success => {
        const action = authenticated ? 'Check Out' : 'Check In';
        alert(
          `${action} Date: ${currentDate}\nTime: ${currentTime}\nLocation: ${location.latitude}, ${location.longitude} Success`,
        );
        setAuthenticated(prevState => !prevState);
      })
      .catch(error => {
        console.log('Authentication failed', error);
      });
  };

  const headers = [
    {
      header: (
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faClockRotateLeft} />
          <Text style={{marginLeft: 12, color: 'black', fontWeight: 'bold'}}>
            Attendance History
          </Text>
        </View>
      ),
      content: (
        <View style={{backgroundColor: '#F5F5F5', padding: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Date</Text>
              <Text style={styles.textItem}>dd/mm/yy</Text>
              <Text style={styles.textItem}>dd/mm/yy</Text>
              <Text style={styles.textItem}>dd/mm/yy</Text>
              <Text style={styles.textItem}>dd/mm/yy</Text>
              <Text style={styles.textItem}>dd/mm/yy</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Location</Text>
              <Text style={styles.textItem}>Add By Google</Text>
              <Text style={styles.textItem}>Add By Google</Text>
              <Text style={styles.textItem}>Add By Google</Text>
              <Text style={styles.textItem}>Add By Google</Text>
              <Text style={styles.textItem}>Add By Google</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Check In</Text>
              <Text style={styles.textItem}>hh:mm</Text>
              <Text style={styles.textItem}>hh:mm</Text>
              <Text style={styles.textItem}>hh:mm</Text>
              <Text style={styles.textItem}>hh:mm</Text>
              <Text style={styles.textItem}>hh:mm</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.headerText}>Check Out</Text>
              <Text style={styles.textItem}>hh:mm</Text>
              <Text style={styles.textItem}>hh:mm</Text>
              <Text style={styles.textItem}>hh:mm</Text>
              <Text style={styles.textItem}>hh:mm</Text>
              <Text style={styles.textItem}>hh:mm</Text>
            </View>
          </View>
        </View>
      ),
    },
    {
      header: (
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faListCheck} />
          <Text style={{marginLeft: 12, color: 'black', fontWeight: 'bold'}}>
            Task
          </Text>
        </View>
      ),
      content: (
        <View style={styles.contentContainer}>
          <Text style={styles.textItem}>
            Terms and conditions content goes here.
          </Text>
        </View>
      ),
    },
    {
      header: (
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faGaugeHigh} />
          <Text style={{marginLeft: 12, color: 'black', fontWeight: 'bold'}}>
            Performance
          </Text>
        </View>
      ),
      content: (
        <View style={styles.contentContainer}>
          <Text style={styles.textItem}>
            Terms and conditions content goes here.
          </Text>
        </View>
      ),
    },
    {
      header: (
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faSackDollar} />
          <Text style={{marginLeft: 12, color: 'black', fontWeight: 'bold'}}>
            Income
          </Text>
        </View>
      ),
      content: (
        <View style={styles.contentContainer}>
          <Text style={styles.textItem}>
            Terms and conditions content goes here.
          </Text>
        </View>
      ),
    },
    {
      header: (
        <View style={{flexDirection: 'row'}}>
          <FontAwesomeIcon icon={faMoneyBillTransfer} />
          <Text style={{marginLeft: 12, color: 'black', fontWeight: 'bold'}}>
            Deposit
          </Text>
        </View>
      ),
      content: (
        <View style={styles.contentContainer}>
          <Text style={styles.textItem}>
            Terms and conditions content goes here.
          </Text>
        </View>
      ),
    },
  ];

  return (
    <View style={styles.container}>
      <Image
        style={styles.imgHeader}
        source={require('../../assets/bgheaderattendance.png')}
      />
      <Image
        style={styles.circleHeader}
        source={require('../../assets/circleheader.png')}
      />
      <Image
        style={styles.imgProfile}
        source={{
          uri: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg',
        }}
      />

      <View style={{marginBottom: 24}}>
        <Text style={{color: 'black', fontSize: 16}}>Company Name</Text>
      </View>
      <View>
        <Text style={{color: 'black', fontSize: 30}}>{currentTime} </Text>
      </View>
      <View>
        <Text style={{color: 'black'}}>{currentDate}</Text>
      </View>
      <LinearGradient
        colors={['#2a7c90', '#36b79a', '#00ff00']}
        start={{x: 0, y: 1}}
        end={{x: 1.2, y: 1}}
        style={styles.fingerprintContainer}>
        <TouchableOpacity onPress={handleBiometric}>
          <Image
            source={require('../../assets/fingerscanner.png')}
            style={styles.fingerprintImage}
          />
          <View style={{position: 'absolute', top: 90, left: 25}}>
            <Text style={{color: 'white'}}>
              {authenticated ? 'CHECK OUT' : 'CHECK IN'}
            </Text>
          </View>
        </TouchableOpacity>
      </LinearGradient>
      <View style={{flexDirection: 'row', gap: 8, margin: 24}}>
        <FontAwesomeIcon icon={faLocationDot} color="red" />
        {location ? (
          <Text
            style={{
              color: 'black',
            }}>
            {`Lat: ${location.latitude}, Lon: ${location.longitude}`}
          </Text>
        ) : (
          <Text style={{color: 'black'}}>
            {locationError || 'Fetching location...'}
          </Text>
        )}
      </View>
      <ScrollView style={{width: '90%'}}>
        {headers.map((item, i) => (
          <Item key={i} header={item.header} content={item.content} />
        ))}
        <View style={styles.item}>
          <View style={styles.list}>
            <View style={{flexDirection: 'row'}}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              <Text
                style={{marginLeft: 12, color: 'black', fontWeight: 'bold'}}>
                Resign
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

function Item({header, content}) {
  const [open, setOpen] = useState(false);

  const onPress = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(!open);
  };

  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={1}>
      <View style={styles.list}>
        {header}
        <FontAwesomeIcon icon={open ? faChevronDown : faChevronRight} />
      </View>
      {open && <View>{content}</View>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 100,
  },
  textContainer: {
    justifyContent: 'space-between',
  },
  headerText: {
    color: 'black',
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 11,
    textAlign: 'center',
  },
  textItem: {
    marginVertical: 2,
    color: 'black',
    textAlign: 'center',
    fontSize: 10,
  },
  fingerprintContainer: {
    borderWidth: 0,
    borderColor: '#3f8bc7',
    borderRadius: 75,
    padding: 20,
    margin: 24,
    width: 150,
    height: 150,
    elevation: 10,
  },
  fingerprintImage: {
    width: 70,
    height: 70,
    objectFit: 'contain',
    margin: 22,
    bottom: 12,
  },
  item: {
    width: '95%',
    borderWidth: 0,
    paddingHorizontal: 20,
    overflow: 'hidden',
    paddingVertical: 10,
    marginBottom: 5,
    borderRadius: 10,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
  },
  imgHeader: {
    position: 'absolute',
    top: -10,
    left: 0,
  },
  circleHeader: {
    position: 'absolute',
    top: 90,
    left: 60,
  },
  imgProfile: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    position: 'absolute',
    top: 50,
    right: 20,
  },
});

export default Attendance;
