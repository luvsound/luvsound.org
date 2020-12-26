<template>
<div class="release">
    <header>
        <section class="heading">
            <span class="cat-id">{{ release.cat_id }}</span>
            <h1 class="title">{{ release.title }}</h1>
            <h2 class="artist">by {{ release.artist }}</h2>
        </section>
        <img v-if="release.cover" :src="release.cover" />
    </header>

    <track-list :tracks="release.tracks"></track-list>

    <span class="release-date">{{ release_date }}</span>
    <div class="about"><vue-markdown :breaks="false" :source="release.about"></vue-markdown></div>
    <div class="credits"><vue-markdown :source="release.credits"></vue-markdown></div>
</div>
</template>

<script>
import duration from '../duration';
import moment from 'moment';
import TrackList from '@/components/track-list.vue';
//import VueMarkdown from 'vue-markdown';

export default {
    name: 'release',
    components: { TrackList, VueMarkdown },
    computed: {
        release: function() {
            return this.$store.state.releases.filter(release => { return release.cat_id === this.$route.params.cat_id })[0];
        }, 
        release_date: function() {
            return moment(this.release.release_date).format('MMMM Do YYYY');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "~@/vars.scss";

    .release {
        padding: 0 4vw;

        @media #{$big} {
            max-width: 40rem;
            margin: 0 auto;
        }
    }

    header {
        position: relative;
        overflow: hidden;
        padding: 2vw;
        background-color: darken(#9F00C5, 10%);
        display: flex;
        justify-content: space-between;
        color: #fff;

        .heading {
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            width: 50%;
        }

        span, h1, h2 {
            position: relative;
            z-index: 10;
            line-height: 1;
        }

        img {
            filter: brightness(0.6) sepia(100%) saturate(1000%) hue-rotate(230deg);
            width: 50%;
            -webkit-transition: 1s;
            transition: 1s;
            object-fit: contain;
            align-self: end;

            &:hover {
                filter: none;
            }
        }

        @media #{$big} {
            padding: 1rem;
        }
    }

    .about, .credits {
        font-size: 3vw;
        line-height: 1.5;

        @media #{$big} {
            font-size: 1.4rem;
        }
    }

    .credits {
        font-style: oblique;
    }

    .cat-id, 
    .release-date {
        display: block;
        font-size: 2vw;
        line-height: 1;
        margin: 0;
        padding: 0;

        @media #{$big} {
            font-size: 1.3rem;
        }
    }

    .release-date {
        margin-top: 5vw;
        margin-bottom: 0;

        @media #{$big} {
            margin-top: 1rem;
        }
    }

    .cat-id {
        margin-bottom: 0.5vw;

        @media #{$big} {
            margin-bottom: 0.5rem;
        }
    }

    .title {
        font-size: 5vw;
        line-height: 1;
        margin: 0;
        padding: 0;

        @media #{$big} {
            font-size: 2.2rem;
        }
    }

    .artist, 
    .cat-id {
        font-size: 3vw;
        font-weight: 200;
        line-height: 1;
        margin: 0;
        padding: 0;

        @media #{$big} {
            font-size: 1.3rem;
            margin-top: 0.5rem;
        }
    }
</style>
