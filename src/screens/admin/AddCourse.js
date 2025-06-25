import { StyleSheet, Text, SafeAreaView, TextInput, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CoustomButton from '../../components/CoustomButton'; // Make sure the path is correct
import { insertCourses } from '../../db/Database'; // Path to your database file

const AddCourse = () => {
  const [name, setName] = useState('');
  const [fees, setFees] = useState('');

  const inputref = useRef(null);


  
    useEffect(() => {
      inputref.current?.focus();

    },[])
  const handleAddCourse = () => {
    if (!name.trim() || !fees.trim()) {
      Alert.alert('Validation Error', 'Please enter both course name and fees.');
      return;
    }

    Alert.alert('Button Clicked');


    insertCourses(
      name,
      parseInt(fees),
      res => {
        console.log('Response', res);
        Alert.alert('Success', 'Course added successfully!');
        setName('');
        setFees('');
      },
      error => {
        console.log('Error', error);
        Alert.alert('Insert Failed', error.message || 'Something went wrong');
      }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingtext}>Add Course</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Course Name"
        ref={inputref}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter Fees"
        value={fees}
        onChangeText={setFees}
        keyboardType="numeric"
      />

      <CoustomButton title="Submit Course" color="#000" onPress={handleAddCourse} />
    </SafeAreaView>
  );
};

export default AddCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  headingtext: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    backgroundColor: '#f2f2f2',
    height: 60,
    marginBottom: 30,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
