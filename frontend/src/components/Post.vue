<script setup>
import { computed } from 'vue';
import { getUserId } from '@/lib/user-id.js';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
});

defineEmits(['follow', 'like', 'comment']);

const showFollow = computed(
  () => props.post.authorId !== getUserId(),
);
</script>

<template>
  <article>
    <p>
      User {{ post.authorId }}
      <button v-if="showFollow" type="button" @click="$emit('follow', post.authorId)">
        Follow
      </button>
    </p>
    <p>{{ post.content }}</p>
    <p>
      <button type="button" @click="$emit('like', post.id)">
        Like ({{ post.likeCount }})
      </button>
      <button type="button" @click="$emit('comment', post.id)">Comment</button>
    </p>
    <hr/>
    <br/>
  </article>
</template>
