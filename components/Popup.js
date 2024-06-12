// components/Popup.js
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

const Popup = ({
  popupVisible,
  agastyaMode,
  inputText,
  responseText,
  filteredActions,
  handleKeyboardIconPress,
  handleAgastyaMode,
  handleAgastyaAction,
  filterActions,
  handleCancel,
  handleContinue,
  handleAgastyaOption,
  selectedOption
}) => {
  if (!popupVisible) {
    return null;
  }

  const optionItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleAgastyaOption(item)} style={selectedOption.id===item.id?[styles.selectedOption,styles.option]:styles.option}>
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.popup}>
      <View style={styles.iconBox}>
        <TouchableOpacity onPress={handleKeyboardIconPress} style={styles.iconButton}>
          <FontAwesome name='keyboard-o' size={30} color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleAgastyaMode} style={styles.iconButton}>
          <Ionicons style={styles.aiIcon} name='sparkles' size={15} color='white' />
        </TouchableOpacity>
      </View>
      {!agastyaMode ? (
        <>
        </>
      ) : (
        <View style={styles.agastyaContent}>
          <View style={styles.agastayaHeaderContent}>
            <Text style={styles.agastyaText}>Ask Agastya AI</Text>
            <TouchableOpacity onPress={handleAgastyaAction}>
              <FontAwesome name='long-arrow-right' size={16} style={styles.agastyaButton} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.agastyaInput}
            placeholder='Ask me or choose an option'
            value={inputText}
            onChangeText={filterActions}
          />
          {responseText ? (
            <>
              <Text style={styles.responseText}>{responseText}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity onPress={handleCancel} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleContinue} style={styles.actionButton}>
                  <Text style={styles.actionButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <FlatList
              data={filteredActions}
              renderItem={optionItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.agastyaActions}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    popup: {
        flexDirection: 'colomn',
        alignItems: 'center',
        padding: 8,
        position: 'absolute',
        bottom: 0,
        left:16,
        width: '100%',
        backgroundColor:'white'
      },
      iconBox:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width:'100%'
      },
      iconButton: {
        padding: 10,
      },
      aiIcon:{
        backgroundColor:'black',
        padding:5,
        borderRadius:5
      },
      agastyaContent: {
        width:'100%',
        padding:8
      },
      agastayaHeaderContent:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:16
      },
      agastyaText:{
        fontSize: 16,
        fontWeight:'500'
      },
      agastyaButton:{
        borderColor:'rgba(100,100,100,0.2)',
        borderWidth:1,
        padding:12,
        borderRadius:10,
      },
      agastyaInput: {
        height: 60,
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
        paddingLeft:15,
        borderRadius:10,
        borderColor:'#FFD700',
        fontSize:14,
        color:'rgba(0,0,0,0.7)',
        fontWeight:'500'
      },
      agastyaActions: {
        flexDirection: 'column',
      },
      optionText:{
        fontSize: 14,
        fontWeight:'500',
      },
      option:{
        marginBottom:20
      },
      selectedOption:{
        backgroundColor:'rgba(100,100,100,0.2)',
        borderRadius:10,
        padding:8,
        flexDirection:'column',
        justifyContent:'center'
      },
      responseText: {
        paddingHorizontal:16,
        fontFamily:'sans-serif-light',
        fontSize:14
      },
      actionButtons:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:8
      },
      actionButton:{
        width:'40%',
        paddingVertical:12,
        backgroundColor:'rgba(100,100,100,0.1)',
        alignItems:'center',
        borderRadius:10
      },
      actionButtonText:{
        fontSize:14,
        fontWeight:'500'
      }
});

export default Popup;
