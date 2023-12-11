import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Colors from "./Colors";
export default NetworkStyles=StyleSheet.create(
    {
      loginFieldContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 18,
        marginVertical:10,
        borderColor:"#aaa",
        paddingRight:15
      },
      textboxtext:{
        color:Colors.mainColor,
        textAlign:"right",
        height:20
      },
      
      button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 10,
          height: 14,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 12,
        borderRadius: 22,
        backgroundColor: Colors.mainColor,
        padding:0,
        height:50,
        marginHorizontal:4
      },

    });
          

