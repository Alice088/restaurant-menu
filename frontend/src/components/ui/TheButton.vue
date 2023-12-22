<template>
  <button class="theButton">
    <slot />
  </button>
</template>

<script setup lang="ts"></script>

<style lang="scss">
  .theButton {
    color: red;
    transition: 300ms all ease-in-out;
    border-radius: 5px;


    border: 1px red solid;
    padding: 5px;

    &:hover {
      background-color: red;
      color: black;
    }
  }
</style>