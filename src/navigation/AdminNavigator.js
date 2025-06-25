import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Courses from '../screens/admin/Courses';
import Addsubject from '../screens/admin/Addsubject';
import Addcourse from "../screens/admin/AddCourse"

const Stack = createStackNavigator();
const AdminNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Courses" component={Courses} />
      <Stack.Screen name="AddCourse" component={Addcourse} />
      <Stack.Screen name="AddSubject" component={Addsubject} />
    </Stack.Navigator>
  );
};

export default AdminNavigator;

const styles = StyleSheet.create({});
