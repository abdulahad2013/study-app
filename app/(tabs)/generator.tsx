import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

export default function GeneratorScreen() {
  const [subject, setSubject] = useState('maths');
  const [difficulty, setDifficulty] = useState('medium');
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerated(true);
    // API call will go here
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>⚡ Question Generator</Text>
      <Text style={styles.subtitle}>Generate past paper-style questions</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Subject</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={subject}
            onValueChange={(itemValue) => setSubject(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Maths" value="maths" />
            <Picker.Item label="Additional Maths" value="add-maths" />
            <Picker.Item label="Chemistry" value="chemistry" />
            <Picker.Item label="Computer Science" value="cs" />
          </Picker>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Difficulty Level</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={difficulty}
            onValueChange={(itemValue) => setDifficulty(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Hard" value="hard" />
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
        <Text style={styles.generateText}>Generate Questions</Text>
      </TouchableOpacity>

      {generated && (
        <View style={styles.resultsCard}>
          <Text style={styles.resultsTitle}>Generated Questions</Text>
          <Text style={styles.resultText}>
            Questions coming soon! This will use OpenAI to generate realistic past paper questions.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },
  generateButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  generateText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultsCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
