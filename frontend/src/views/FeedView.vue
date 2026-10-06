<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import PostCard from '@/components/Post.vue';
import { api } from '@/lib/api.js';

const posts = ref([]);
const loading = ref(true);
const error = ref('');

async function loadFeed() {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await api.get('/posts/feed');
    posts.value = data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      error.value = `Could not load feed (${err.response.status})`;
    } else {
      error.value = 'Could not load feed';
    }
  } finally {
    loading.value = false;
  }
}

async function onFollow(authorId) {
  await api.post(`/users/${authorId}/follow`);
}

async function onLike(postId) {
  await api.post(`/posts/${postId}/like`);
  await loadFeed();
}

function onComment(_postId) {
  // Comments modal — next slice
}

onMounted(loadFeed);
</script>

<template>
  <div>
    <h1>Feed</h1>
    <p v-if="loading">Loading…</p>
    <p v-else-if="error">{{ error }}</p>
    <template v-else>
      <p v-if="posts.length === 0">No posts in your feed.</p>
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @follow="onFollow"
        @like="onLike"
        @comment="onComment"
      />
    </template>
  </div>
</template>
