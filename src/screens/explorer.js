import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Button,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Svg, {
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowCircleRight,
  faCircle,
  faTriangleExclamation,
  faUsers,
  faListCheck,
  faGaugeHigh,
  faFaceSmile,
} from '@fortawesome/free-solid-svg-icons';
import Attendace from './attendance';

const CircularProgressBar = ({progress, size = 100, strokeWidth = 10}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const halfSize = size / 2;
  const radius = halfSize - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const animatedStrokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: 'clamp',
  });

  return (
    <View style={{width: size, height: size, position: 'relative'}}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <Defs>
          <SvgLinearGradient id="grad" x1="10%" y1="-120%" x2="1%" y2="40%">
            <Stop offset="100%" stopColor="#1F7378" stopOpacity="1" />
            <Stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          </SvgLinearGradient>
        </Defs>
        <Circle
          stroke="#1F7378"
          fill="#2a7c90"
          cx={halfSize}
          cy={halfSize}
          r={radius}
          strokeWidth={strokeWidth}
          style={styles.baseCircle}
        />
        <AnimatedCircle
          stroke="#FFDB58"
          fill="none"
          cx={halfSize}
          cy={halfSize}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={animatedStrokeDashoffset}
          strokeLinecap="round"
        />
        <Circle
          stroke="none"
          fill="url(#grad)"
          cx={halfSize}
          cy={halfSize}
          r={radius - 20}
          strokeWidth="2"
        />
      </Svg>
      <View style={styles.progressTextContainer}>
        <Text style={styles.progressText}>{`${Math.round(progress)}%`}</Text>
      </View>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const Explorer = ({navigation}) => {
  const handleGoTo = screen => {
    navigation.navigate(screen);
  };

  const [progress, setProgress] = useState(0);
  const [todos, setTodos] = useState([]);
  const [fetching, setFetching] = useState(false); // State untuk menunjukkan apakah sedang fetching data
  const [fetchEnabled, setFetchEnabled] = useState(true); // State untuk mengontrol apakah fetching diizinkan atau tidak

  const increaseProgress = () => {
    setProgress(prev => (prev + 1 > 100 ? 100 : prev + 1));
  };

  const toggleFetch = () => {
    if (fetchEnabled) {
      fetchData();
    } else {
      setTodos([]);
    }
    setFetchEnabled(prev => !prev);
  };

  const fetchData = async () => {
    try {
      setFetching(true); // Mulai fetching data
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setFetching(false); // Selesai fetching data
    }
  };

  useEffect(() => {
    if (fetchEnabled) {
      fetchData();
    }
  }, [fetchEnabled]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#2a7c90', '#36b79a', '#00ff00']}
        start={{x: 0, y: 1}} // Posisi awal gradient (kiri)
        end={{x: 1.2, y: 1}} // Posisi akhir gradient (kanan)
        style={styles.gradient}>
        <View style={styles.content}>
          <View style={{width: 200, marginLeft: 36}}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{marginBottom: 12}}
              size={24}
              color="white"></FontAwesomeIcon>
            <Text
              style={{
                fontSize: 30,
                color: 'white',
                fontWeight: 'bold',
                letterSpacing: 1,
              }}>
              Task and Performance
            </Text>

            <View
              style={{
                flexDirection: 'row',
                margin: 12,
                gap: 24,
                marginTop: 30,
              }}>
              <View>
                <CircularProgressBar
                  style={{
                    shadowColor: '#000000',
                    shadowOffset: {
                      width: 0,
                      height: 18,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 20.0,
                    elevation: 24,
                  }}
                  progress={progress}
                  size={130}
                  strokeWidth={20}
                />
              </View>

              <View style={{flexDirection: 'row', gap: 12}}>
                <View>
                  <View style={{marginTop: 6}}>
                    <FontAwesomeIcon
                      icon={faUsers}
                      size={20}
                      color="white"></FontAwesomeIcon>
                  </View>
                  <View style={{marginTop: 18}}>
                    <FontAwesomeIcon
                      icon={faListCheck}
                      size={20}
                      color="white"></FontAwesomeIcon>
                  </View>
                  <View style={{marginTop: 18}}>
                    <FontAwesomeIcon
                      icon={faGaugeHigh}
                      size={20}
                      color="white"></FontAwesomeIcon>
                  </View>
                  <View style={{marginTop: 16}}>
                    <FontAwesomeIcon
                      icon={faFaceSmile}
                      size={20}
                      color="white"></FontAwesomeIcon>
                  </View>
                </View>

                <View>
                  <View>
                    <Text
                      style={{color: 'white', fontWeight: '500', fontSize: 12}}>
                      Refferal
                    </Text>
                    <Text style={{color: 'white', fontSize: 12}}>
                      50 // 1000
                    </Text>
                  </View>

                  <View style={{marginTop: 5}}>
                    <Text
                      style={{color: 'white', fontWeight: '500', fontSize: 12}}>
                      Quality
                    </Text>
                    <Text style={{color: 'white', fontSize: 12}}>
                      100 // 100
                    </Text>
                  </View>
                  <View style={{marginTop: 5}}>
                    <Text
                      style={{color: 'white', fontWeight: '500', fontSize: 12}}>
                      Speed
                    </Text>
                    <Text style={{color: 'white', fontSize: 12}}>
                      240 // 240
                    </Text>
                  </View>
                  <View style={{marginTop: 5}}>
                    <Text
                      style={{color: 'white', fontWeight: '500', fontSize: 12}}>
                      Attitude
                    </Text>
                    <Text style={{color: 'white', fontSize: 12}}>
                      4.0 // 5.0
                    </Text>
                  </View>
                </View>

                <View>
                  <View style={{marginTop: 6}}>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      size={20}
                      color="red"></FontAwesomeIcon>
                  </View>
                  <View style={{marginTop: 18}}>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      size={20}
                      color="red"></FontAwesomeIcon>
                  </View>
                  <View style={{marginTop: 18}}>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      size={20}
                      color="red"></FontAwesomeIcon>
                  </View>
                  <View style={{marginTop: 16}}>
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                      size={20}
                      color="red"></FontAwesomeIcon>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* <Button title="Increase Progress" onPress={increaseProgress} /> */}
          {/* <Button
            title={fetchEnabled ? 'Fetch Todos' : 'Clear Todos'}
            onPress={toggleFetch}
          /> */}

          {/* ScrollView hanya untuk daftar todos */}
          <View>
            <View
              style={{
                height: 400,
                width: '100%',
                backgroundColor: 'white',
                borderTopRightRadius: 100,
                width: '500',
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.23,
                shadowRadius: 12.81,
                elevation: 16,
                zIndex: 100,
                position: 'relative',
                marginTop: 12,
              }}>
              <View style={{marginLeft: 24, maxWidth: 300}}>
                <ScrollView style={styles.scrollView}>
                  <Text style={{color: 'black', fontSize: 20, padding: 12}}>
                    Task
                  </Text>
                  <FlatList
                    data={[
                      {key: 'Get more than 100 refferals'},
                      {
                        key: 'Recommended products to them for shopping and get commision',
                      },
                      {
                        key: 'Pick up orders that have been sorted by distribution point',
                      },
                      {
                        key: 'Organize, categorize, and separate the best products and materials to give them',
                      },
                      {key: 'Coordinate with your supervisor'},
                      {
                        key: 'Deliver the product to them and get commisions from their total transaction',
                      },
                    ]}
                    renderItem={({item}) => {
                      return (
                        <View style={{flexDirection: 'row'}}>
                          <View style={{marginBottom: 10}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: 'black',
                              }}>{`\u2022`}</Text>
                          </View>

                          <View style={{marginLeft: 4}}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: 'black',
                                fontWeight: '500',
                              }}>
                              {item.key}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                  {/* {fetching ? (
                  <Text style={styles.progressText}>Fetching data...</Text>
                ) : (
                  todos.map(todo => (
                    <View key={todo.id} style={styles.todoItem}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{color: 'black'}}>{todo.id}</Text>
                        <Text style={{color: 'black'}}>{todo.title}</Text>
                      </View>
                    </View>
                  ))
                )} */}
                </ScrollView>
              </View>
            </View>

            <View>
              <LinearGradient
                colors={['#2a7c90', '#36b79a', '#00ff00']}
                start={{x: 0, y: 1}} // Posisi awal gradient (kiri)
                end={{x: 1.2, y: 1}} // Posisi akhir gradient (kanan)
                style={{
                  height: 100,
                  width: 400,
                  zIndex: 100,
                  position: 'absolute',
                  borderTopRightRadius: 100,
                  bottom: -30,
                }}>
                {/* FOOTER */}
                <View style={{flexDirection: 'row'}}>
                  <View style={{padding: 25}}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: '500',
                      }}>
                      Income Statement
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: 25,
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      marginLeft: 90,
                    }}>
                    <View
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        left: 25,
                        bottom: 46,
                      }}>
                      <FontAwesomeIcon
                        icon={faCircle}
                        size={24}
                        color="#FFFFFF"></FontAwesomeIcon>
                    </View>

                    <View style={{zIndex: 4}}>
                      <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleGoTo('Attendance')}>
                        <View style={styles.iconContainer}>
                          <FontAwesomeIcon
                            icon={faArrowCircleRight}
                            size={24}
                            color="#3f8bc7"
                          />
                        </View>
                        <Text style={styles.buttonText}> </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 8,
    zIndex: 2,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    zIndex: 4,
  },
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '100%',
    marginTop: 20,
  },
  progressTextContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
  },
  baseCircle: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollView: {
    width: '100%', // Memenuhi lebar konten
    marginTop: 20, // Jarak dari elemen sebelumnya
    maxHeight: 500, // Maksimum tinggi agar tidak memakan layar penuh
  },
  todoItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

export default Explorer;
