<template>
  <div :style="{ marginLeft: `${depth * 20}px`, backgroundColor: backgroundColor }">
    <div @click="toggleExpand">
      {{ item.title }} <span v-if="hasChildren">{{ isExpanded ? '[-]' : '[+]' }}</span>
    </div>
    <div v-if="isExpanded">
      <!-- Рекурсивное отображение дочерних элементов, если элемент раскрыт -->
      <TreeItem v-for="child in childItems" :key="child.id" :item="child" :depth="depth + 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';
import { useStore } from 'vuex';

// Интерфейс для описания структуры элемента дерева
interface TreeItem {
  id: string;
  title: string;
  parent_id: string | null;
}

export default defineComponent({
  props: {
    // Свойство для текущего элемента дерева
    item: {
      type: Object as PropType<TreeItem>,
      required: true,
    },
    // Свойство для текущей глубины вложенности элемента
    depth: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const store = useStore();

    const isExpanded = computed(() => store.state.expandedItems.has(props.item.id));
    const hasChildren = computed(() => store.getters.childItems(props.item.id).length > 0);

    // Вычисляемое свойство для получения дочерних элементов текущего элемента
    const childItems = computed(() => store.getters.childItems(props.item.id));

    // Вычисляемое свойство для чередования цвета фона в зависимости от глубины вложенности
    const backgroundColor = computed(() => props.depth % 2 === 0 ? '#f0f0f0' : '#ffffff');

    // Функция для переключения состояния раскрытия элемента
    const toggleExpand = () => {
      store.commit('toggleExpand', props.item.id);
    };

    return {
      isExpanded,
      hasChildren,
      childItems,
      toggleExpand,
      backgroundColor,
    };
  },
});
</script>

<style scoped>
div {
  cursor: pointer; 
  padding: 5px; 
}
</style>
