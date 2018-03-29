import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';

const BASE_URL = 'https://api.lyrics.ovh/v1/'

class App extends React.Component {
  state = { artist: '', title: '', lyrics: '' }

  getLyrics = () => {
    const { artist, title } = this.state;
    axios.get(`${ BASE_URL }${ artist }/${ title }`)
      .then(({ data }) => {
        this.setState({
          artist: '',
          title: '',
          lyrics: data.lyrics
        })
      }).catch(err => {
        const lyrics = `Could not find the song ${ title } by ${ artist }`
        this.setState({ lyrics })
      })
  }

  render() {
    const { artist, title, lyrics } = this.state;

    return (
      <View style={ styles.container }>
        <Text style={ styles.header }>
          Dotify
        </Text>
        <Text style={ styles.label }>Artist</Text>
        <TextInput
          value={ artist }
          style={ styles.input }
          onChangeText={ (artist) => this.setState({ artist }) }
        />
        <Text style={ styles.label }>Title</Text>
        <TextInput
          value={ title }
          style={ styles.input }
          onChangeText={ (title) => this.setState({ title }) }
        />
        { (artist !== '' && title !== '') &&
          <TouchableOpacity onPress={ this.getLyrics }>
            <Text style={ styles.button }>Get Lyrics</Text>
          </TouchableOpacity>
        }
        <ScrollView style={
          lyrics ? styles.lyrics : {}
        }>
          <Text style={ styles.lyricText }>
            { lyrics }
          </Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lyrics: {
    marginBottom: 30,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  lyricText: {
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#50C878',
    justifyContent: 'flex-start',
    paddingTop: 80,
  },
  button: {
    alignSelf: 'stretch',
    textAlign: 'center',
    height: 40,
    backgroundColor: 'black',
    color: 'white',
    fontSize: 30,
    margin: 5,
  },
  input: {
    height: 50,
    fontSize: 25,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 5,
    backgroundColor: '#fff',
  },
  label: {
    marginLeft: 5,
  },
  header: {
    fontSize: 50,
    textAlign: 'center',
  }
});



export default App