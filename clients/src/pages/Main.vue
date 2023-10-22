<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          Конструктор тестового контента игры Save Henry Duck
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left" v-model="tabs">
        <q-route-tab name="create" to="/create" label="Создать тест" />
        <q-route-tab name="edit" to="/edit" label="Редактировать тест" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  setup() {
    return {
    };
  },
  data() {
    return {
      tabs: "create"
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped>
#q-app {
  position: relative;
  height: 100%;
  width: 100%;
}

#map {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 100%;
}
</style>
