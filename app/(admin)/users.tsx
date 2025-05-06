import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from '../../hooks/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../context/AuthContext';

type User = {
  id: string;
  email: string;
  full_name: string | null;
  username: string | null;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  created_at: string;
};

export default function AdminUsersScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();
  
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // New user form state
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'student' as 'student' | 'teacher' | 'admin' | 'parent'
  });
  
  // Edit user form state
  const [editUser, setEditUser] = useState({
    full_name: '',
    role: 'student' as 'student' | 'teacher' | 'admin' | 'parent'
  });
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  useEffect(() => {
    if (searchQuery || selectedRole) {
      const filtered = users.filter(user => {
        const matchesSearch = searchQuery.trim() === '' || 
          (user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           user.username?.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const matchesRole = !selectedRole || user.role === selectedRole;
        
        return matchesSearch && matchesRole;
      });
      
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, selectedRole, users]);
  
  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        setUsers(data as User[]);
        setFilteredUsers(data as User[]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      Alert.alert('Error', 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAddUser = async () => {
    if (!newUser.email || !newUser.password || !newUser.full_name) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: newUser.email,
        password: newUser.password,
        email_confirm: true,
        user_metadata: {
          full_name: newUser.full_name,
          role: newUser.role
        }
      });
      
      if (authError) throw authError;
      
      if (authData.user) {
        // 2. Create profile (should be handled by database trigger, but we'll verify)
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') {
          // If not "no rows returned" error
          throw profileError;
        }
        
        if (!profileData) {
          // Create profile manually if trigger didn't work
          await supabase.from('profiles').insert({
            id: authData.user.id,
            email: newUser.email,
            full_name: newUser.full_name,
            role: newUser.role
          });
        }
        
        // Reset form and close modal
        setNewUser({
          email: '',
          password: '',
          full_name: '',
          role: 'student'
        });
        
        setIsAddUserModalVisible(false);
        
        // Refresh user list
        fetchUsers();
        
        Alert.alert('Success', 'User created successfully');
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      Alert.alert('Error', error.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditUser = async () => {
    if (!selectedUser || !editUser.full_name) {
      Alert.alert('Missing Fields', 'Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Update profile
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editUser.full_name,
          role: editUser.role
        })
        .eq('id', selectedUser.id);
        
      if (error) throw error;
      
      // Reset form and close modal
      setIsEditUserModalVisible(false);
      setSelectedUser(null);
      
      // Refresh user list
      fetchUsers();
      
      Alert.alert('Success', 'User updated successfully');
    } catch (error: any) {
      console.error('Error updating user:', error);
      Alert.alert('Error', error.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteUser = async (userId: string) => {
    // Prevent deleting yourself
    if (userId === user?.id) {
      Alert.alert('Cannot Delete', 'You cannot delete your own account');
      return;
    }
    
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this user? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              
              // Delete from auth (will cascade to profile due to foreign key)
              const { error } = await supabase.auth.admin.deleteUser(userId);
              
              if (error) throw error;
              
              // Refresh user list
              fetchUsers();
              
              Alert.alert('Success', 'User deleted successfully');
            } catch (error: any) {
              console.error('Error deleting user:', error);
              Alert.alert('Error', error.message || 'Failed to delete user');
            } finally {
              setLoading(false);
            }
          }
        }
      ]
    );
  };
  
  const openEditUserModal = (user: User) => {
    setSelectedUser(user);
    setEditUser({
      full_name: user.full_name || '',
      role: user.role
    });
    setIsEditUserModalVisible(true);
  };
  
  const renderRoleBadge = (role: string) => {
    let color;
    switch (role) {
      case 'admin':
        color = '#F44336'; // Red
        break;
      case 'teacher':
        color = '#FF9800'; // Orange
        break;
      case 'parent':
        color = '#9C27B0'; // Purple
        break;
      case 'student':
      default:
        color = '#2196F3'; // Blue
        break;
    }
    
    return (
      <View style={[styles.roleBadge, { backgroundColor: color + '20' }]}>
        <Text style={[styles.roleBadgeText, { color }]}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </Text>
      </View>
    );
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={[styles.userCard, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
      <View style={styles.userInfo}>
        <View style={styles.nameContainer}>
          <Text style={[styles.userName, { color: colors.text }]}>
            {item.full_name || 'No Name'}
          </Text>
          <Text style={[styles.userEmail, { color: colors.icon }]}>
            {item.email}
          </Text>
        </View>
        {renderRoleBadge(item.role)}
      </View>
      
      <View style={styles.userActions}>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.tint + '20' }]}
          onPress={() => openEditUserModal(item)}
        >
          <Ionicons name="create-outline" size={18} color={colors.tint} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: '#F44336' + '20' }]}
          onPress={() => handleDeleteUser(item.id)}
        >
          <Ionicons name="trash-outline" size={18} color="#F44336" />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const renderRoleFilter = () => {
    const roles = ['student', 'teacher', 'parent', 'admin'];
    
    return (
      <View style={styles.roleFilterContainer}>
        <TouchableOpacity 
          style={[
            styles.roleFilterButton, 
            selectedRole === null && { backgroundColor: colors.tint, borderColor: colors.tint }
          ]}
          onPress={() => setSelectedRole(null)}
        >
          <Text style={[
            styles.roleFilterText, 
            selectedRole === null && { color: 'white' }
          ]}>
            All
          </Text>
        </TouchableOpacity>
        
        {roles.map(role => (
          <TouchableOpacity 
            key={role}
            style={[
              styles.roleFilterButton, 
              selectedRole === role && { backgroundColor: colors.tint, borderColor: colors.tint }
            ]}
            onPress={() => setSelectedRole(prev => prev === role ? null : role)}
          >
            <Text style={[
              styles.roleFilterText, 
              selectedRole === role && { color: 'white' }
            ]}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  // Render Add User Modal
  const renderAddUserModal = () => (
    <Modal
      visible={isAddUserModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsAddUserModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalContainer}
      >
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Add New User</Text>
            <TouchableOpacity onPress={() => setIsAddUserModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalForm}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Full Name *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="Full Name"
              placeholderTextColor={colors.icon}
              value={newUser.full_name}
              onChangeText={(text) => setNewUser(prev => ({ ...prev, full_name: text }))}
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Email *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="Email"
              placeholderTextColor={colors.icon}
              value={newUser.email}
              onChangeText={(text) => setNewUser(prev => ({ ...prev, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Password *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="Password"
              placeholderTextColor={colors.icon}
              value={newUser.password}
              onChangeText={(text) => setNewUser(prev => ({ ...prev, password: text }))}
              secureTextEntry
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Role *</Text>
            <View style={styles.roleButtonsContainer}>
              {['student', 'teacher', 'parent', 'admin'].map(role => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleSelectButton,
                    newUser.role === role && { backgroundColor: colors.tint, borderColor: colors.tint }
                  ]}
                  onPress={() => setNewUser(prev => ({ ...prev, role: role as any }))}
                >
                  <Text
                    style={[
                      styles.roleSelectText,
                      newUser.role === role && { color: 'white' }
                    ]}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.tint }]}
              onPress={handleAddUser}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Create User</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
  
  // Render Edit User Modal
  const renderEditUserModal = () => (
    <Modal
      visible={isEditUserModalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsEditUserModalVisible(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalContainer}
      >
        <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Edit User</Text>
            <TouchableOpacity onPress={() => setIsEditUserModalVisible(false)}>
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.modalForm}>
            <Text style={[styles.inputLabel, { color: colors.text }]}>Full Name *</Text>
            <TextInput
              style={[styles.input, { borderColor: colors.icon, color: colors.text }]}
              placeholder="Full Name"
              placeholderTextColor={colors.icon}
              value={editUser.full_name}
              onChangeText={(text) => setEditUser(prev => ({ ...prev, full_name: text }))}
            />
            
            <Text style={[styles.inputLabel, { color: colors.text }]}>Role *</Text>
            <View style={styles.roleButtonsContainer}>
              {['student', 'teacher', 'parent', 'admin'].map(role => (
                <TouchableOpacity
                  key={role}
                  style={[
                    styles.roleSelectButton,
                    editUser.role === role && { backgroundColor: colors.tint, borderColor: colors.tint }
                  ]}
                  onPress={() => setEditUser(prev => ({ ...prev, role: role as any }))}
                >
                  <Text
                    style={[
                      styles.roleSelectText,
                      editUser.role === role && { color: 'white' }
                    ]}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: colors.tint }]}
              onPress={handleEditUser}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Update User</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>User Management</Text>
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.tint }]}
          onPress={() => setIsAddUserModalVisible(true)}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <View style={[styles.searchBar, { backgroundColor: colors === Colors.dark ? '#1E1E1E' : '#F5F5F5' }]}>
          <Ionicons name="search" size={20} color={colors.icon} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: colors.text }]}
            placeholder="Search users..."
            placeholderTextColor={colors.icon}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {renderRoleFilter()}
      
      {loading && users.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.tint} />
        </View>
      ) : (
        <FlatList
          data={filteredUsers}
          renderItem={renderUserItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.usersList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.text }]}>
                {searchQuery || selectedRole ? 'No users match your search' : 'No users found'}
              </Text>
            </View>
          }
        />
      )}
      
      {/* Modals */}
      {renderAddUserModal()}
      {renderEditUserModal()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 46,
    borderRadius: 23,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  roleFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  roleFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  roleFilterText: {
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  usersList: {
    padding: 20,
    paddingTop: 0,
  },
  userCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  nameContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
  },
  roleBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  userActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 30,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalForm: {
    padding: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  roleButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  roleSelectButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  roleSelectText: {
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 