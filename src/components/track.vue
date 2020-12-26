<template>
<div class="track-inner" :class="{ expanded: expanded }">
    <p @click="is_expanded = !is_expanded" class="track-title">
        <span v-if="expanded" class="details-toggle expanded">&#9662;</span>
        <span v-else class="details-toggle">&#9656;</span>
        {{ track.title }} &mdash; 
        <span class="track-length">
            {{ format_time(track.length) }}
        </span>
    </p>

    <div class="track-details" :class="{ hidden: !expanded }">
        <player :track="track" :player_id="index"></player>
        <a 
            v-for="media_source in media_sources" 
            target="_new" 
            download
            :href="media_source.src"
            class="download-link"
        >{{ media_source.name }}</a>
    </div>
</div>
</template>

<script>
import duration from '../duration';
import mediatypes from '../mediatypes';
import player from '@/components/player.vue';

export default {
    name: 'album-track',
    props: ['track', 'index', 'default_open'], 
    components: { player },
    data() {
        return {
            is_expanded: this.default_open,
        }
    },
    methods: {
        format_time: function(seconds) {
            return duration.format(seconds);
        },
    }, 
    computed: {
        expanded: function() {
            if(this.$store.state.current_track === this.index) {
                this.is_expanded = true;
            }
                
            return this.is_expanded;
        },
        media_sources: function() {
            return mediatypes.track_metadata(this.track);
        },
    }
}
</script>

<style lang="scss" scoped>
    @import "~@/vars.scss";
    .hidden {
        display: none;
    }

    .track-inner {
        padding: 2vw;
        margin: 0;
        -webkit-transition: 1s ease;
        transition: 1s ease;

        p {
            font-size: 3.5vw;
        }

        &.expanded {
            background: darken(#9F00C5, 30%);
            color: #fff;
        }

        @media #{$big} {
            padding: 1rem;

            p {
                font-size: 1.3rem;
            }
        }
    }

    .download-link {
        display: inline-block;
        margin: 0;
        padding: 1.5vw 2vw;
        font-weight: 800;
        margin-top: 1.5vw;
        margin-right: 0.75vw;
        background: darken(#9F00C5, 20%);
        border: none;
        outline: none;
        font-size: 3vw;
        cursor: pointer;
        -webkit-transition: 1s;
        transition: 1s;
        text-decoration: none;
        color: #fff;

        &:hover {
            background: #fff;
            color: #000;
        }

        @media #{$big} {
            font-size: 1rem;
            padding: 0.25rem 0.5rem;
            margin-top: 0.5rem;
            margin-right: 0.5rem;
        }
    }

    .details-toggle {
        opacity: 0.6;
        display: none;

        &.expanded {
            opacity: 0.4;
        }
    }

    .track-details {
        padding: 2vw 0;
        padding-bottom: 0;

        @media #{$big} {
            padding: 1rem 0;
            padding-bottom: 0;
        }
    }

    .track-title {
        font-weight: 400;
        margin: 0;
        padding: 0;
    }

    .track-length {
        font-weight: 800;
    }
</style>
