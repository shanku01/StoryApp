import React, { useState, useRef } from 'react';
import {Keyboard, KeyboardAvoidingView, StyleSheet} from 'react-native';

import { actions } from './services/data';
import Header from './components/Header';
import CustomTextInput from './components/CustomTextInput';
import Popup from './components/Popup';

export default function App() {
  const [popupVisible, setPopupVisible] = useState(false);
  const [agastyaMode, setAgastyaMode] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [filteredActions, setFilteredActions] = useState(actions);
  const [selectedOption, SetSelectedOption] = useState({});
  const [inputText, setInputText] = useState('');

  const [inputState, setInputState] = useState({
    title: '',
    subtitle: '',
    body: '',
    selectedText: ''
  });
  const [selectedInput, setSelectedInput] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  const titleInputRef = useRef(null);
  const subtitleInputRef = useRef(null);
  const bodyInputRef = useRef(null);

  const handleAgastyaAction = () => {
    if(selectedOption){
      const loremIpsumResponse = selectedOption.title+' This is a response from AI.';
      setResponseText(loremIpsumResponse);
    }
  };

  const handleAgastyaOption = (action) => {
    SetSelectedOption(action);
  };

  const handleKeyboardIconPress = () => {
    if (selectedInput && selectedInput.current) {
      selectedInput.current.focus();
    }
    setAgastyaMode(false);
    setPopupVisible(true);
  };

  const handleAgastyaMode = () => {
    setAgastyaMode(true);
    Keyboard.dismiss();
  }

  const handleInputFocus = (inputRef,name) => {
    setPopupVisible(true);
    setAgastyaMode(false);
    setSelectedInput(inputRef);
    setFocusedField(name);
  };

  const filterActions = (text) => {
    setInputText(text);
    const filtered = actions.filter(action =>
      action.title.toLowerCase().includes(text.toLowerCase())
    );
    setResponseText('');
    setFilteredActions(filtered);
  };
  
  const handleCancel = () => {
    setResponseText('');
  }

  const handleContinue = () => {
    switch (focusedField) {
      case 'title':
        setInputState(prevState => ({
          ...prevState,
          title: prevState.title.replace(prevState.selectedText,responseText)
        }));
        break;
      case 'subtitle':
        setInputState(prevState => ({
          ...prevState,
          subtitle: prevState.subtitle.replace(prevState.selectedText,responseText)
        }));
        break;
      case 'body':
        setInputState(prevState => ({
          ...prevState,
          body: prevState.body.replace(prevState.selectedText,responseText)
        }));
        break;
      default:
        break;
    }
    setInputState(prevState => ({
      ...prevState,
      selectedText: ''
    }));
    setResponseText('');
  }

  const handleSelectionChange = (event, fieldName) => {
    const { start, end } = event.nativeEvent.selection;
    setInputState(prevState => {
      const newSelectedText = prevState[fieldName].substring(start, end);
      return {
        ...prevState,
        selectedText: newSelectedText
      };
    });
  };

  const handleChangeText = (text, fieldName) => {
    setInputState(prevState => ({
      ...prevState,
      [fieldName]: text
    }));
  };

  return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
        <Header title='Write New Story'/>
        <CustomTextInput
          inputRef={titleInputRef}
          inputState={inputState.title}
          handleChangeText={handleChangeText}
          handleInputFocus={handleInputFocus}
          handleSelectionChange={handleSelectionChange}
          placeholder='Title'
          name ='title'
        />
        <CustomTextInput
          inputRef={subtitleInputRef}
          inputState={inputState.subtitle}
          handleChangeText={handleChangeText}
          handleInputFocus={handleInputFocus}
          handleSelectionChange={handleSelectionChange}
          placeholder='Sub Title'
          name='subtitle'
        />
        <CustomTextInput
          inputRef={bodyInputRef}
          inputState={inputState.body}
          handleChangeText={handleChangeText}
          handleInputFocus={handleInputFocus}
          handleSelectionChange={handleSelectionChange}
          placeholder='Write your story...'
          name='body'
          multiline ={true}
        />
        <Popup
          popupVisible={popupVisible}
          agastyaMode={agastyaMode}
          inputText={inputText}
          responseText={responseText}
          filteredActions={filteredActions}
          handleKeyboardIconPress={handleKeyboardIconPress}
          handleAgastyaMode={handleAgastyaMode}
          handleAgastyaAction={handleAgastyaAction}
          filterActions={filterActions}
          handleCancel={handleCancel}
          handleContinue={handleContinue}
          handleAgastyaOption= {handleAgastyaOption}
          selectedOption={selectedOption}
        />
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

