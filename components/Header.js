import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';



const Header = ({ title}) => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton}>
        <FontAwesome style={styles.backArrow} name='angle-left' size={24} color='black' />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
      },
      headerButton: {
        padding: 10,
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginLeft: 10,
      }
})



export default Header;