<template>
  <div class="overflow-x-auto">
    <div class="m-16">
      <!-- Button to open modal -->
      <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-4 rounded">Create New User</button>
      <table class="table min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Online Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ user.role }}</td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="{ 'text-green-600': user.online_status, 'text-red-600': !user.online_status }">
                {{ user.online_status ? "Online" : "Offline" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="fetchUserById(user.id)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
              <button @click="deleteUser(user.id)"  class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Modal -->
      <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-10">
        <div class="bg-white w-1/2 p-6 rounded-lg shadow-lg">
          <h2 class="text-lg font-semibold mb-4">Create New User</h2>
          <form @submit.prevent="createUser">
            <div class="mb-4">
              <label for="name" class="block text-gray-700">Name</label>
              <input v-model="newUserName" type="text" id="name" class="w-full border rounded p-2" />
            </div>
            <div class="mb-4">
              <label for="role" class="block text-gray-700">Role</label>
              <input v-model="newUserRole" type="text" id="role" class="w-full border rounded p-2" />
            </div>
            <div class="mb-4">
            <label class="block text-gray-700">Online Status:</label>
            <div>
              <input v-model="newUserStatus" type="checkbox" id="editOnlineStatus" />
              <label for="editOnlineStatus" class="ml-2">Online</label>
            </div>
          </div>
            <div class="flex justify-end">
              <button type="button" @click="closeModal" class="mr-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Cancel</button>
              <button type="submit" class="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- User Details / Edit Modal -->
    <div v-if="selectedUser" class="fixed inset-0 flex items-center justify-center z-10">
      <div class="bg-white w-1/2 p-6 rounded-lg shadow-lg">
        <h2 class="text-lg font-semibold mb-4"> User Details</h2>
        <form @submit.prevent="updateUser">
          <div class="mb-4">
            <label for="editName" class="block text-gray-700">Name:</label>
            <input v-model="selectedUser.name" type="text" id="editName" class="w-full border rounded p-2" />
          </div>
          <div class="mb-4">
            <label for="editRole" class="block text-gray-700">Role:</label>
            <input v-model="selectedUser.role" type="text" id="editRole" class="w-full border rounded p-2" />
          </div>
          <div class="mb-4">
            <label class="block text-gray-700">Online Status:</label>
            <div>
              <input v-model="selectedUser.online_status" type="checkbox" id="editOnlineStatus" />
              <label for="editOnlineStatus" class="ml-2">Online</label>
            </div>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
             Update
            </button>
            <button @click="closeUserDetailsModal" class="ml-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../api";
import { User } from "../../models/User.ts";

let users = ref<User[] | null>();
const newUserName = ref("");
const newUserRole = ref("");
const newUserStatus = ref(false);
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
};


// Function to create a new user using the configured Axios instance
const createUser = async () => {
  if (newUserName.value && newUserRole.value) {
    const newUser = {
      name: newUserName.value,
      role: newUserRole.value,
      online_status:  newUserStatus.value,
    };

    try {await api.post('/users', newUser, {
      headers: {
        "Content-Type": "application/json",
      },
      })
      .then(() => {
      fetchUsers();
      console.log(newUser);
      closeModal();
    })
     
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
};

const resetForm = () => {
  newUserName.value = "";
  newUserRole.value = "";
};

const selectedUser = ref<User | null>();
const isUserDetailsModalOpen = ref(false);

const fetchUserById = async (userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`);
    selectedUser.value = response.data; // Set the fetched user as the selectedUser
    openUserDetailsModal(selectedUser.value); // Open the update modal with the selected user's data
  } catch (error) {
    console.error('Error fetching user by ID:', error);
  }
};

const openUserDetailsModal = (user: User) => {
  selectedUser.value = user;
  isUserDetailsModalOpen.value = true;
};

const closeUserDetailsModal = () => {
  selectedUser.value = null;
  isUserDetailsModalOpen.value = false;
};

const updateUser = async () => {
  if (selectedUser.value) {
    const updatedUser = {
      name: selectedUser.value.name,
      role: selectedUser.value.role,
      online_status: selectedUser.value.online_status,
    };

    try {
      // Make the API request to update the user's details
       await api.put(`/users/${selectedUser.value.id}`, updatedUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update the user data locally and close the modal
      fetchUsers();
      closeUserDetailsModal();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }
};

const deleteUser = async (userId: string) => {
  try {
    await api.delete(`/users/${userId}`);
    users.value = users.value?.filter(user => user.id !== userId); // Remove the deleted user from the list
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};


// Function to fetch users using the configured Axios instance
const fetchUsers = async () => {
  try {
    const response = await api.get('/users');
    users.value = response.data;
    console.log("users.value", users.value);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};


onMounted(() => {
  Promise.all([fetchUsers()]);
});
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.text-green-600 {
  color: #3ab82a;
}

.text-red-600 {
  color: #f32939;
}
</style>
