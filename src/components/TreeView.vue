<template>
  <div>
    <button @click="rerenderComponent">Ререндер</button>
    <!-- Цикл для отображения корневых элементов дерева -->
    <div v-for="item in rootItems" :key="item.id">
      <TreeItem :item="item" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import TreeItem from './TreeItem.vue';

export default defineComponent({
  components: {
    TreeItem,
  },
  setup() {
    const store = useStore();
    // Получение корневых элементов дерева из хранилища Vuex
    const rootItems = ref(store.getters.rootItems);

    // Функция для ререндера компонента
    const rerenderComponent = () => {
      console.log('Перед рендерингом:', store.state.expandedItems);
      // Коммит для обновления состояния раскрытых элементов
      store.commit('setExpandedItems', new Set([...store.state.expandedItems]));
      console.log('После рендеринга:', store.state.expandedItems);
      // Обновление rootItems после коммита
      rootItems.value = store.getters.rootItems;
    };

    // Эффект для выполнения действия при изменении зависимостей
    watchEffect(() => {
      // Диспатч для получения данных дерева с сервера
      store.dispatch('fetchTreeItems').then(() => {
        // Обновление rootItems после получения данных
        rootItems.value = store.getters.rootItems;
      });
    });

    return {
      rootItems,
      rerenderComponent,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
