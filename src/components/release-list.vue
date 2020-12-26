<template>
<ol class="release-list">
    <li v-for="release in releases">
        <router-link :to="{ name: 'release', params: { cat_id: release.cat_id }}" class="release">
            <p class="cat-id">{{ release.cat_id }}</p> 
            <p class="title"><strong>{{ release.artist }}</strong> &mdash; {{ release.title }}</p>
        </router-link>
    </li>
</ol>
</template>

<script>

export default {
    name: 'release-list',
    computed: {
        releases: function() {
            return this.$store.state.releases;
        }
    }
}
</script>

<style lang="scss">
@import "~@/vars.scss";

.release-list {
    list-style-type: none;
    margin: 0;
    padding: 0 4vw;
    padding-top: 4.5vw;

    .release {
        display: block;
        text-decoration: none;    
        color: #000;
        -webkit-transition: 1s;
        transition: 1s;
        margin: 0;
        padding: 0;
        margin-bottom: 10vw;

        &:hover {
            color: #9F00C5;
        }
    }

    .title {
        font-size: 6vw;
        display: inline-block;
        font-weight: 200;
        line-height: 1;
        margin: 0;
        padding: 0;
    }

    .cat-id {
        font-size: 3vw;
        display: block;
        line-height: 1;
        font-weight: 200;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    @media #{$big} {
        max-width: 40rem;
        margin: 0 auto;
        padding: 0 2rem;
        padding-top: 4rem;

        .title {
            font-size: 2.4rem;
        }
        
        .cat-id {
            font-size: 1.2rem;
        }

        .release {
            margin-bottom: 3rem;
        }
    }


}

</style>
