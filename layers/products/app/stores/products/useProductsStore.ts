import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAsyncData } from '#app'
import { z } from 'zod'
import { ProductSchema } from '#layers/shared/app/schemas/product'
import type { ProductFilter, ProductSort } from '../../schemas/filters'
import { filterProducts, sortProducts } from '../../utils/filters'

export const useProductsStore = defineStore('products', () => {
  // State
  const currentFilter = ref<ProductFilter>({
    search: undefined,
    category: 'all',
    inStock: false,
  })
  const currentSort = ref<ProductSort>('name-asc')

  // Fetch products with useAsyncData for SSR support
  const { data, status, error: fetchError } = useAsyncData(
    'products',
    async () => {
      try {
        // Fetch products from server API
        const response = await $fetch('/api/products')

        // Validate API response with Zod schema
        const validationResult = z.array(ProductSchema).safeParse(response)

        if (!validationResult.success) {
          // eslint-disable-next-line no-console
          console.error('API response validation failed:', validationResult.error.issues)
          throw new Error('Invalid product data received from API')
        }

        return validationResult.data
      }
      catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch products:', err)
        return []
      }
    },
    {
      default: () => [],
    },
  )

  // Use data directly as the products state
  const products = computed(() => data.value ?? [])

  // Computed for loading state
  const loading = computed(() => status.value === 'pending')

  // Computed for error state
  const error = computed(() => fetchError.value?.message ?? null)

  function setFilter(filter: ProductFilter) {
    currentFilter.value = filter
  }

  function setSort(sort: ProductSort) {
    currentSort.value = sort
  }

  function resetFilter() {
    currentFilter.value = {
      search: undefined,
      category: 'all',
      inStock: false,
    }
    currentSort.value = 'name-asc'
  }

  // Getters (computed)
  const filteredProducts = computed(() => {
    let result = filterProducts(products.value, currentFilter.value)
    result = sortProducts(result, currentSort.value)
    return result
  })

  const productById = computed(() => (id: string) =>
    products.value.find(p => p.id === id),
  )

  const categories = computed(() => {
    const cats = new Set(products.value.map(p => p.category))
    return Array.from(cats)
  })

  // Public API
  return {
    // State
    products,
    loading,
    error,
    currentFilter,
    currentSort,
    // Getters
    filteredProducts,
    productById,
    categories,
    // Actions
    setFilter,
    setSort,
    resetFilter,
  }
})
