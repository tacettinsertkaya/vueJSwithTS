<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include="/[a-zA-Z0-9]*Index/">
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>
