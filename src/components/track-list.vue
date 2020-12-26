<template>
<ol class="tracklist">
    <li v-for="(track, index) in tracks" class="track">
        <album-track :track="track" :index="index" :default_open="index === current_track"></album-track>
    </li>
</ol>
</template>

<script>
import duration from '../duration';
import track from '@/components/track.vue';

export default {
    name: 'track-list',
    props: ['tracks'], 
    components: { 'album-track': track },
    data() {
        return {
            current_track: 0,
        }
    },
}
</script>

<style lang="scss" scoped>
    .tracklist {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }
</style>
