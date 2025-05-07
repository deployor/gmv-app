import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';

interface RichTextEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ 
  initialContent, 
  onChange,
  placeholder 
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialContent);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handleContentChange = (text: string) => {
    setContent(text);
    onChange(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <View style={styles.toolbarGroup}>
          <TouchableOpacity style={styles.toolbarButton}>
            <Ionicons name="text" size={18} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Ionicons name="text-outline" size={22} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Ionicons name="contrast-outline" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.toolbarGroup}>
          <TouchableOpacity style={styles.toolbarButton}>
            <Ionicons name="list-outline" size={18} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Ionicons name="list" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.toolbarGroup}>
          <TouchableOpacity style={styles.toolbarButton}>
            <Ionicons name="link-outline" size={18} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toolbarButton}>
            <Ionicons name="image-outline" size={18} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.editorContainer}>
        <TextInput
          style={[
            styles.editor,
            { color: colors.text }
          ]}
          placeholder={placeholder}
          placeholderTextColor={colors.icon}
          multiline
          value={content}
          onChangeText={handleContentChange}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    justifyContent: 'space-between',
  },
  toolbarGroup: {
    flexDirection: 'row',
  },
  toolbarButton: {
    padding: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  editorContainer: {
    flex: 1,
  },
  editor: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
  },
}); 