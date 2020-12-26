<template>
  <div id="gui" :class="$route.name">
    <router-link :to="{ name: 'index' }">
        <img class="logo" :class="{ homepage: $route.name === 'index' }" src="/static/luvsound-black.svg">
    </router-link>

    <p class="motto" :class="{ homepage: $route.name === 'index' }">
        Time ripens the creatures. Time rots them. And time again puts out 
        the Time that burns down the creatures.
    </p>

    <div class="content">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gui'
}
</script>

<style lang="scss">
@import "~@/vars.scss";
@import "~@/fonts.scss";

html, body {
    margin: 0;
    padding: 0;
    background-color: #fff;
    padding-bottom: 4vw;
}

* {
    font-family: "signika";
}

#gui {
    -webkit-transition: 1s ease;
    transition: 1s ease;
}

.content {
    position: relative;
}

.fade-enter-active,
.fade-leave-active {
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    transition: opacity 2s ease;
}

.fade-enter, 
.fade-leave-to {
    opacity: 0;
}

.motto {
    font-family: "signika";
    text-align: center;
    color: #000;
    border: none;
    width: 55vw;
    margin: 0 auto;
    margin-bottom: 5vw;
    font-size: 3vw;
    opacity: 0;
    height: 0;
    -webkit-transition: 1s ease;
    transition: 1s ease;

    &.homepage {
        opacity: 1;
        height: initial;
    }

    @media #{$big} {
        margin-top: 2rem;
        margin-bottom: 0;
        width: 18rem;
        font-size: 1rem;
    }
}

.logo {
    margin: 0;
    padding: 0;
    padding: 3vw 0;
    margin-left: 4vw;
    display: block;

    width: 12vw;
    -webkit-transition: 0.5s ease;
    transition: 0.5s ease;

    &.homepage {
        padding: 8vw 0;
        margin: 0 auto;
        width: 70vw;
    }

    @media #{$big} {
        padding: 2rem 0;
        margin: 0 auto;
        width: 8rem;

        &.homepage {
            padding: 0;
            padding-top: 3.5rem;
            margin: 0 auto;
            width: 20rem;
        }
    }
}
</style>
