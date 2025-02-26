import { Image, StyleSheet, Text, Modal, View, FlatList} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Calendar, DateData } from 'react-native-calendars';

export default function HomeScreen() {

  const dados = [
    {id: '1', nome: 'Evento 1 - Conferência de Programação'},
    {id: '2', nome: 'Evento 2 - Taste Wine'},
    {id: '3', nome: 'Evento 3 - Meetup'},
    {id: '4', nome: 'Evento 4 - Hackathon'},
  ];

  const [open, setOpen] = useState(false); //Open and close the calendar

  function handleOpen() {
    setOpen(!open);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome! To the Event App</ThemedText>
      </ThemedView>
      <View style={styles.container}>
        <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem = {({item}) => (
          <View style={styles.item}>
            <Text>{item.nome}</Text>
          </View>
        )}
        />
      </View>
      <button style={styles.button} onClick={handleOpen}>
        <Text style={styles.buttonText}>Open Calender</Text>
      </button>

      <Modal
      animationType='slide'
      transparent={true}
      visible={open}>
        <View style={styles.centerView}>
          <View style={styles.modalView}>

          <ThemedView style={styles.calendarContainer}>
            <Calendar 
              onDayPress={(day: DateData) => console.log('Selected day:', day)}
              markedDates={{ 
              '25/02/2025': {selected: true, marked: true, selectedColor: 'blue'},
              }}
            />
          </ThemedView>

          <button style={styles.button} onClick={handleOpen}>
        <Text style={styles.buttonText}>Close Calender</Text>
      </button>

          </View>
        </View>
      </Modal>

       
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  container: {
    flex: 1,
    padding: 20,
    marginTop: 8,
  },
  item: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  calendarContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
  },
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#007bff',
},
buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},
});
