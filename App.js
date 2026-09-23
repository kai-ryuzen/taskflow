import { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TaskItem from './components/TaskItem';
import FilterTabs from './components/FilterTabs';

const STORAGE_KEY = '@taskflow/tasks_v1';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Done' },
];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const [loaded, setLoaded] = useState(false);

  // Load saved tasks once when the app starts.
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw !== null) {
          setTasks(JSON.parse(raw));
        }
      } catch (error) {
        console.warn('Could not load tasks:', error);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // Save tasks whenever they change (after the first load).
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((error) =>
      console.warn('Could not save tasks:', error)
    );
  }, [tasks, loaded]);

  const addTask = () => {
    const trimmed = text.trim();
    if (trimmed.length === 0) return;

    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };

    setTasks((prev) => [newTask, ...prev]);
    setText('');
    Keyboard.dismiss();
  };

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((task) => !task.completed));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;

  const counts = {
    all: tasks.length,
    active: activeCount,
    completed: completedCount,
  };

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
        <StatusBar style="dark" />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>TaskFlow</Text>
          <Text style={styles.subtitle}>
            {activeCount === 0
              ? 'All caught up. Great job!'
              : `You have ${activeCount} task${activeCount === 1 ? '' : 's'} left`}
          </Text>
        </View>

        {/* Add task input */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task..."
            placeholderTextColor="#9AA3B2"
            value={text}
            onChangeText={setText}
            onSubmitEditing={addTask}
            returnKeyType="done"
            maxLength={120}
          />
          <Pressable
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed,
            ]}
            onPress={addTask}
            accessibilityRole="button"
            accessibilityLabel="Add task"
          >
            <Text style={styles.addButtonText}>+</Text>
          </Pressable>
        </View>

        {/* Filter tabs */}
        <FilterTabs
          filters={FILTERS}
          active={filter}
          counts={counts}
          onChange={setFilter}
        />

        {/* Task list */}
        <FlatList
          data={visibleTasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          )}
          contentContainerStyle={
            visibleTasks.length === 0
              ? styles.listEmpty
              : styles.listContent
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>📝</Text>
              <Text style={styles.emptyTitle}>
                {filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'active'
                    ? 'No active tasks'
                    : 'No tasks yet'}
              </Text>
              <Text style={styles.emptyText}>
                Use the box above to add your first task.
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />

        {/* Footer */}
        {completedCount > 0 && (
          <Pressable
            style={styles.clearButton}
            onPress={clearCompleted}
            accessibilityRole="button"
            accessibilityLabel="Clear completed tasks"
          >
            <Text style={styles.clearButtonText}>
              Clear {completedCount} completed task
              {completedCount === 1 ? '' : 's'}
            </Text>
          </Pressable>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1F2937',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 14,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#3B5BDB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonPressed: {
    backgroundColor: '#3451C4',
    transform: [{ scale: 0.95 }],
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '600',
    marginTop: -2,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
  },
  listEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 14,
    color: '#8A93A3',
    textAlign: 'center',
  },
  clearButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginBottom: 8,
  },
  clearButtonText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
});
