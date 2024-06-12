import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ inputState, handleChangeText, handleInputFocus, handleSelectionChange, inputRef, placeholder ,name, multiline}) => {
    const style = [styles.input]
    switch(name){
        case 'subtitle':
            style.push(styles.subTitle)
            break;
        case 'body':
            style.push(styles.bodyInput)
        default:
            break;
    }
    return (
        <TextInput
        ref={inputRef}
        style={style}
        placeholder={placeholder}
        value={inputState}
        onChangeText={(text) => handleChangeText(text,name)}
        onFocus={() => handleInputFocus(inputRef, name)}
        onSelectionChange={(event) => handleSelectionChange(event,name)}
        multiline = {multiline?multiline:false}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginBottom: 12,
        padding: 8,
        borderWidth:0,
        fontSize:18,
        fontWeight:'500',
        opacity:0.8
    },
    subTitle:{
      fontSize:16,
      opacity:1
    },
    bodyInput: {
      height: '100%',
      marginBottom: 12,
      padding: 8,
      textAlignVertical: 'top',
      borderWidth:0,
      fontSize:14
    }
});

export default CustomTextInput;