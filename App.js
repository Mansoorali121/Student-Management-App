import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import MainNavigator from './src/navigation/MainNavigator';
import { initDB } from './src/db/Database';

const App = () => {
  useEffect(() => {
    initDB();

  },[])
  return (
    <MainNavigator />
  )
}

export default App;

const styles = StyleSheet.create({})