import { StyleSheet, Text, SafeAreaView, TextInput, Alert } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import CoustomButton from '../../components/CoustomButton'; // Make sure the path is correct
import { insertCourses, updateCourse } from '../../db/Database'; // Path to your database file
import { useNavigation, useRoute } from '@react-navigation/native';

const AddCourse = () => {
  const route = useRoute();
  const [name, setName] = useState(
    route.params.type == 'edit' ? route.params.data.name : '',
  );
  const [fees, setFees] = useState(
    route.params.type == 'edit' ? route.params.data.fees + ' ' : '',
  );
  const [message, setMessage] = useState({ type: '', msg: '' });

  const navigation = useNavigation();
  useEffect(() => {
    if (route.params.type == 'edit') {
      navigation.setOptions({
        title: 'Update Course',
      });
    }
  }, [route.params.type]);

  const inputref = useRef(null);

  useEffect(() => {
    inputref.current?.focus();
  }, []);
  const handleAddCourse = () => {
    if (!name.trim() || !fees.trim()) {
      Alert.alert(
        'Validation Error',
        'Please enter both course name and fees.',
      );
      return;
    }

    Alert.alert('Button Clicked');
    if (route.params.type == 'new') {
      insertCourses(
        name,
        parseInt(fees),
        res => {
          console.log('Response', res);
          Alert.alert('Success', 'Course added successfully!');
          setName('');
          setFees('');
          setMessage({ type: 'Success', msg: 'Course Added' }); // or use JSON.stringify(err)
        },
        error => {
          setMessage({ type: 'Error', msg: error }); // or use JSON.stringify(err)

          console.log('Error', error);

          Alert.alert('Insert Failed', error.message || 'Something went wrong');
        },
      );
    } else {
      updateCourse(route.params.data.id, name, parseInt(fees), res => {
        setMessage({ type: 'Success', msg: 'Course Updated Successfully' });
      }, err => {
        setMessage({ type: 'error', msg: err });

      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headingtext}>
        {route.params.type == 'edit' ? 'Update Course' : 'Add Course'}
      </Text>

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
      {message.msg != '' && (
        <Text
          style={{
            color: message.type == 'error' ? 'green' : 'red',
            alignSelf: 'flex-start',
            marginLeft: 100,
            marginTop: 10,
          }}
        >
          {message.msg}
        </Text>
      )}

      <CoustomButton
        title={route.params.type == 'edit' ? 'Update Course' : 'Submit Course'}
        color="#000"
        onPress={handleAddCourse}
      />
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
