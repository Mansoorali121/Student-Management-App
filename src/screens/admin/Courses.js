import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getCourses, initDB } from '../../db/Database';

const Courses = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getCourses(result => {
      console.log('Response', result);
      setCourses(result);
    });
  }, []); 

  renderItem = ({item,index}) => {
    return (
      <View style={styles.courseitem}>
        <Text style={styles.coursename}>{item.name}</Text>
                <Text style={styles.feestext}>{"INR "+ item.fees}</Text>


      </View>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={courses} renderItem={renderItem} />
      <TouchableOpacity
        style={styles.addbutton}
        onPress={() => navigation.navigate('AddCourse')}
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
  courseitem:{
    width:"90%",
    height:100,
    borderRadius:10,
    alignSelf:"center",
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#f2f2f2",
    marginTop:20

  },
  coursename:{
    fontSize:30,
    fontWeight:"300"
  },
  feestext:{
    fontSize:20,
    fontWeight:"600",
    color:"green"
  }
});
