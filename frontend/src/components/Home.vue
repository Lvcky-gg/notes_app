<template>
  <input v-model="title" placeholder="Title" />
  <input v-model="content" placeholder="Content" />
  <button @click="createNote">Create Note</button>
  <p v-for="note in noteStore.notes" :key="note.id">
    <div>
    {{ note.title }} - {{ note.content }} - {{ note.id }}
  </div>

  <input v-model="note.title" placeholder="note.title"/>
  <input v-model="note.content" placeholder="note.content" />
  <button @click="updateNote(note.id, {title:note.title,content:note.content})">Update</button>
  <button @click="deleteNote(note.id)">Delete</button>
  </p>

</template>
<script setup lang="ts">
import { useNoteStore } from '../stores/noteStore'
import { onMounted, ref } from 'vue'
const noteStore = useNoteStore()
onMounted(() => {
  noteStore.fetchNotes()
})
const title = ref('')
const content = ref('')
const createNote = () => {
  const newNote = {
    id: Date.now(),
    title: title.value,
    content: content.value,
    createdAt: new Date(),
    updatedAt: new Date(),
    user_id: 1
  }
  noteStore.createNote(newNote)
  title.value = ''
  content.value = ''
}
const deleteNote = (id: number) => {
  noteStore.deleteNote(id)
}
const updateNote = (id : number, note: any) => {
  noteStore.updateNote(id, {
    title: note.title,
    content: note.content,
  })
}

</script>
