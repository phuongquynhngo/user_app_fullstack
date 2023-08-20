<template>
  <div class="overflow-x-auto select-none">
    <table class="table min-w-full divide-y divide-gray-200 select-none">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Name</th>
          <th class="px-6 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Role</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Online Status</th>
          <th class="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="user in users" :key="user.id">
          <td class="px-6 py-4 whitespace-nowrap">{{ user.name }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ user.role }}</td>
          <td class="px-6 py-4 whitespace-nowrap">{{ user.online ? 'Online' : 'Offline' }}</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
            <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const users = ref([
  { id: 1, name: 'User 1', role: 'Admin', online: true },
  { id: 2, name: 'User 2', role: 'User', online: false },
  // ... other user data
]);

const editUser = (user) => {
  // Implement edit logic here
};

const deleteUser = (userId) => {
  // Implement delete logic here
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}
</style>