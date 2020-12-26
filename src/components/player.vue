<template>
    <div :class="{ hidden: !can_play }" class="player" v-on:click="seek">
        <span 
            v-on:click.stop="toggle_play"
            class="toggle"
        >
            <span v-if="!paused">&#9646;&#9646;</span>
            <span v-else>&#9654;</span>
        </span>

        <img v-if="track.waveform" class="waveform" :src="track.waveform" />
        <span class="playhead" :style="{ width: progress }"></span>
        <span class="current-time">
            <span v-if="!paused">&#9654;</span>
            <span v-else>&#9646;&#9646;</span>
            {{ current_formatted_time }}
        </span>
        <audio 
            ref="audio"
            v-on:loadedmetadata="loadedmetadata" 
            v-on:timeupdate="timeupdate" 
            v-on:pause="set_paused"
            v-on:play="set_paused"
            v-on:ended="ended"
        >
            <source v-for="media_source in media_sources" :src="media_source.src" :type="media_source.type" />
        </audio>
    </div>
</template>

<style lang="scss" scoped>
    @import "~@/vars.scss";

    .player {
        height: 8vw;
        background: #9F00C5;
        position: relative;
        overflow: hidden;

        @media #{$big} {
            height: 4rem;
        }
    }

    .hidden {
        display: none;
    }

    .toggle {
        font-size: 6vw;
        position: absolute;
        left: 2vw;
        z-index: 1000;
        cursor: pointer;
        -webkit-transition: 1s;
        transition: 1s;


        @media #{$big} {
            font-size: 3rem;
            left: 1rem;
        }
    }

    .waveform {
        position: absolute;
        opacity: 0.7;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        filter: invert(100%);
    }

    .current-time {
        display: block;
        position: absolute;
        background: #9F00C5;
        bottom: 0;
        right: 2vw;
        top: 0;
        color: #fff;
        font-size: 3vw;
        height: 3vw;
        font-weight: 800;
        line-height: 1;
        padding: 0.7vw 1vw;
        margin: auto;

        @media #{$big} {
            right: 1rem;
            font-size: 1.2rem;
            height: 1.2rem;
            padding: 0.25rem 0.35rem;

            span {
                position: relative;
                top: -0.1rem;
            }
        }
    }

    .playhead {
        position: absolute;
        z-index: 100;
        opacity: 0.6;
        left: 0;
        bottom: 0;
        top: 0;
        height: 100%;
        background: darken(#9F00C5, 20%);
        -webkit-transition: 0.1s;
        transition: 0.1s;
    }
</style>

<script>
import moment from 'moment';
import duration from '../duration';
import mediatypes from '../mediatypes';

export default {
    name: 'player', 
    props: ['track', 'player_id'], 
    data() {
        return {
            current_time: 0,
            duration: 0,
            paused: true,
            can_play: false,
        };
    },
    methods: {
        set_paused: function() {
            this.paused = this.$refs.audio.paused;
        },
        toggle_play: function(e) {
            if(this.$refs.audio.paused) {
                this.$refs.audio.play();
            } else {
                this.$refs.audio.pause();
            }
             
            this.paused = this.$refs.audio.paused;
        },
        seek: function(e) {
            let pos = e.offsetX / e.target.offsetWidth;
            let audio = this.$refs.audio;
            audio.currentTime = this.$refs.audio.duration * pos;
            if(this.$refs.audio.paused) { this.$refs.audio.play(); }
            this.paused = this.$refs.audio.paused;
        },
        loadedmetadata: function(e) {
            this.duration = (e.target.currentTime / e.target.duration) * 100;
            this.paused = e.target.paused;
            this.can_play = e.target.readyState;
        },
        timeupdate: function(e) {
            this.current_time = e.target.currentTime;
            this.duration = e.target.duration;
        },
        ended: function(e) {
            this.$store.commit('set_track', this.player_id + 1);
        }
    }, 
    computed: {
        media_sources: function() {
            return mediatypes.track_metadata(this.track);
        },
        progress: function() {
            return `${(this.current_time / this.duration) * 100}%`;
        }, 
        current_formatted_time: function() {
            return duration.format(this.current_time);
        }, 
        current_track: function() {
            return this.$store.state.current_track;
        },
    }, 
    watch: {
        current_track: function(newid, oldid) {
            if(this.player_id === newid) {
                this.$refs.audio.play();
            }
        }
    }
}
</script>
