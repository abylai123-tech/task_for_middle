import { createStore } from 'vuex';
import axios from 'axios';

// Интерфейс для элемента дерева
interface TreeItem {
  id: string;
  title: string;
  parent_id: string | null;
}

// Интерфейс для состояния Vuex
interface State {
  treeItems: TreeItem[];
  expandedItems: Set<string>;
}

// Создание хранилища Vuex
export default createStore<State>({
  state: {
    treeItems: [],
    expandedItems: new Set<string>(), 
  },
  mutations: {
    // Установка элементов дерева в состоянии
    setTreeItems(state, items: TreeItem[]) {
      state.treeItems = items;
    },
    // Переключение состояния раскрытия элемента
    toggleExpand(state, itemId: string) {
      if (state.expandedItems.has(itemId)) {
        state.expandedItems.delete(itemId);
      } else {
        state.expandedItems.add(itemId);
      }
    },
    // Установка состояния раскрытых элементов
    setExpandedItems(state, expandedItems: Set<string>) {
      state.expandedItems = expandedItems;
    },
  },
  actions: {
    // Действие для получения элементов дерева с сервера
    async fetchTreeItems({ commit }) {
      try {
        const response = await axios.get<TreeItem[]>('https://64b4c8450efb99d862694609.mockapi.io/tree/items');
        console.log('Извлеченные элементы дерева:', response.data);
        commit('setTreeItems', response.data); 
      } catch (error) {
        console.error('Не удалось получить элементы дерева', error);
      }
    }
  },
  getters: {
    // Геттер для получения корневых элементов дерева
    rootItems: (state) => state.treeItems.filter(item => item.parent_id === null),
    // Геттер для получения дочерних элементов
    childItems: (state) => (parentId: string) => state.treeItems.filter(item => item.parent_id === parentId),
  },
});
