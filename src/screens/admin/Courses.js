import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { deleteCourse, getCourses, initDB } from '../../db/Database';

const Courses = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getCourselist();
  }, [isFocused]);

  const getCourselist = () => {
    getCourses(result => {
      console.log('Response', result);
      setCourses(result);
    });
  };

  renderItem = ({ item, index }) => {
    return (
      <View style={styles.courseitem}>
        <View>
          <Text style={styles.coursename}>{item.name}</Text>
          <Text style={styles.feestext}>{'INR ' + item.fees}</Text>
        </View>

        <View style={{ gap: 20 }}>
          <TouchableOpacity
            onPress={() => {
              deleteCourse(
                item.id,
                () => {
                  Alert.alert('Deleted', 'Course deleted successfully');
                  getCourselist();
                },
                err => {
                  Alert.alert('Error', err.message); // or use JSON.stringify(err)
                },
              );
            }}
          >
            <Image
              source={require('../../images/delete.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
          navigation.navigate('AddCourse',{type:"edit", data:item})

            
          }}>
            <Image
              source={require('../../images/editing.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={courses} renderItem={renderItem} />
      <TouchableOpacity
        style={styles.addbutton}
        onPress={() => 
          navigation.navigate('AddCourse',{type:"new"})
        }
      >
        <Text style={styles.btntext}>+ Add Course </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Courses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addbutton: {
    width: '60%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    padding: 20,
    right: 20,
    bottom: 50,
    position: 'absolute',
  },
  btntext: {
    color: 'white',
    fontSize: 20,
  },
  courseitem: {
    width: '90%',
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  coursename: {
    fontSize: 30,
    fontWeight: '300',
  },
  feestext: {
    fontSize: 20,
    fontWeight: '600',
    color: 'green',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
