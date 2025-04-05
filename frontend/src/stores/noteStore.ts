import { defineStore } from "pinia";
import axios from "axios";

export const useNoteStore = defineStore("noteStore", {
  state: () => ({
    notes: [] as Array<{
      id: number;
      title: string;
      content: string;
      user_id: number;
    }>,
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchNotes() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("http://localhost:8000/notes/");
        this.notes = response.data;
      } catch (err) {
        this.error = (err as Error)?.message ?? "Failed to fetch notes.";
      } finally {
        this.loading = false;
      }
    },

    async createNote(note: {
      title: string;
      content: string;
      user_id: number;
    }) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.post("http://localhost:8000/notes/", note);
        this.notes.push(response.data?.note);
      } catch (err) {
        this.error = (err as Error)?.message ?? "Failed to create note.";
      } finally {
        this.loading = false;
      }
    },
    async deleteNote(noteId: number) {
      this.loading = true;
      this.error = null;
      try {
        await axios.delete(`http://localhost:8000/notes/${noteId}/`);
        this.notes = this.notes.filter((note) => note.id !== noteId);
      } catch (err) {
        this.error = (err as Error)?.message;
      } finally {
        this.loading = false;
      }
    },

    async updateNote(
      noteId: number,
      updatedNote: { title?: string; content?: string }
    ) {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.put(
          `http://localhost:8000/notes/${noteId}/`,
          updatedNote
        );
        const index = this.notes.findIndex((note) => note.id === noteId);
        if (index !== -1) {
          this.notes[index] = {
            ...this.notes[index],
            ...(response.data?.note ?? {}),
          };
        }
      } catch (err) {
        this.error = (err as Error)?.message ?? "Failed to update note.";
      } finally {
        this.loading = false;
      }
    },
  },
});
