import { defineStore } from 'pinia'
import { ref, computed, readonly } from 'vue'
import { initialModel, type ProductsModel, type ProductsMsg } from './useProductsStoreModel'
import { update } from './useProductsStoreUpdate'
import { fetchProducts as fetchProductsEffect } from './useProductsStoreEffects'
import { filterProducts, sortProducts } from '../../utils/filters'

export const useProductsStore = defineStore('products', () => {
  const model = ref<ProductsModel>(initialModel)

  function dispatch(msg: ProductsMsg) {
    model.value = update(model.value, msg)
  }

  async function fetchProducts() {
    await fetchProductsEffect(dispatch)
  }

  const products = computed(() => model.value.products)
  const loading = computed(() => model.value.loading)
  const error = computed(() => model.value.error)
  const currentFilter = computed(() => model.value.currentFilter)
  const currentSort = computed(() => model.value.currentSort)

  const filteredProducts = computed(() => {
    let result = filterProducts(model.value.products, model.value.currentFilter)
    result = sortProducts(result, model.value.currentSort)
    return result
  })

  const productById = computed(() => (id: string) =>
    model.value.products.find(p => p.id === id),
  )

  const categories = computed(() => {
    const cats = new Set(model.value.products.map(p => p.category))
    return Array.from(cats)
  })

  return {
    state: readonly({
      products,
      loading,
      error,
      currentFilter,
      currentSort,
      filteredProducts,
      productById,
      categories,
    }),

    dispatch,
    fetchProducts,
  }
})
