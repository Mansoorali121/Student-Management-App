import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CoustomButton = ({title, onPress, color}) => {
  return (
    <Pressable onPress={onPress} style={{width:"60%", padding:20, backgroundColor:"#f4c2d4", borderRadius:20}}>
        <Text style={{color:color, textAlign:"center", fontWeight:"bold", fontSize:18}}>{title}</Text>
    </Pressable>
  )
}

export default CoustomButton;

const styles = StyleSheet.create({})