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
              <span :class="{ 'text-green-600': user.online, 'text-red-600': !user.online }">
                {{ user.online ? "Online" : "Offline" }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="openUserDetailsModal(user)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
              <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
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
        <h2 class="text-lg font-semibold mb-4">{{ isEditing ? "Edit User" : "User Details" }}</h2>
        <form @submit.prevent="saveUser">
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
              <input v-model="selectedUser.online" type="checkbox" id="editOnlineStatus" />
              <label for="editOnlineStatus" class="ml-2">{{ selectedUser.online ? "Online" : "Offline" }}</label>
            </div>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
              {{ isEditing ? "Save" : "Edit" }}
            </button>
            <button @click="closeUserDetailsModal" class="ml-2 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const users = ref([
  { id: 1, name: "User 1", role: "Admin", online: true },
  { id: 2, name: "User 2", role: "User", online: false },
  // ... other user data
]);

const deleteUser = (userId) => {
  // Implement delete logic here
};

const newUserName = ref("");
const newUserRole = ref("");
const isModalOpen = ref(false);

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  resetForm();
};

const createUser = () => {
  if (newUserName.value && newUserRole.value) {
    users.value.push({
      id: users.value.length + 1,
      name: newUserName.value,
      role: newUserRole.value,
      online: false, // New users are offline by default
    });
    closeModal();
  }
};

const resetForm = () => {
  newUserName.value = "";
  newUserRole.value = "";
};

const selectedUser = ref(null);
const isUserDetailsModalOpen = ref(false);
const isEditing = ref(false);


const openUserDetailsModal = (user) => {
  selectedUser.value = user;
  isUserDetailsModalOpen.value = true;
};

const closeUserDetailsModal = () => {
  selectedUser.value = null;
  isUserDetailsModalOpen.value = false;
};

const editSelectedUser = () => {
  if (selectedUser.value) {
    openEditModal(selectedUser.value);
  }
};

const saveUser = () => {
  isEditing.value = false;
};
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
