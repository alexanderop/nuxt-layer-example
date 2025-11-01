/**
 * Products feature store
 *
 * Demonstrates:
 * - Feature-specific state management
 * - Importing from shared layer (Product type)
 * - Mock data for demonstration purposes
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Product } from '~/types/product'
import type { ProductFilter, ProductSort } from '../types'
import { filterProducts, sortProducts } from '../utils/filters'

/** API delay simulation in milliseconds */
const API_DELAY_MS = 500

/**
 * Mock product data
 */
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
    price: 19999, // $199.99
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    stock: 15,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
    price: 24999, // $249.99
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    stock: 8,
    rating: 4.2,
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Durable backpack with padded laptop compartment, fits up to 15" laptops',
    price: 5999, // $59.99
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    stock: 22,
    rating: 4.7,
  },
  {
    id: '4',
    name: 'Classic Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt, available in multiple colors',
    price: 1999, // $19.99
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    stock: 50,
    rating: 4.0,
  },
  {
    id: '5',
    name: 'Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning',
    price: 8999, // $89.99
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    stock: 12,
    rating: 4.6,
  },
  {
    id: '6',
    name: 'The Design of Everyday Things',
    description: 'Classic book on design principles by Don Norman',
    price: 1899, // $18.99
    category: 'books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
    stock: 30,
    rating: 4.8,
  },
  {
    id: '7',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle keeps drinks cold for 24 hours',
    price: 2999, // $29.99
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
    stock: 40,
    rating: 4.4,
  },
  {
    id: '8',
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness and color temperature',
    price: 3999, // $39.99
    category: 'home',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
    stock: 18,
    rating: 4.3,
  },
  {
    id: '9',
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat with carrying strap, 6mm thick',
    price: 3499, // $34.99
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400',
    stock: 25,
    rating: 4.5,
  },
  {
    id: '10',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe, brews 12 cups',
    price: 7999, // $79.99
    category: 'home',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400',
    stock: 10,
    rating: 4.1,
  },
  {
    id: '11',
    name: 'Denim Jacket',
    description: 'Classic denim jacket with a modern fit',
    price: 6999, // $69.99
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400',
    stock: 14,
    rating: 4.2,
  },
  {
    id: '12',
    name: 'JavaScript: The Good Parts',
    description: 'Essential guide to JavaScript programming by Douglas Crockford',
    price: 2499, // $24.99
    category: 'books',
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400',
    stock: 20,
    rating: 4.7,
  },
]

/**
 * Products store using Pinia composition API
 */
export const useProductsStore = defineStore('products', () => {
  // State
  const products = ref<Product[]>(MOCK_PRODUCTS)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentFilter = ref<ProductFilter>({
    category: 'all',
    inStock: false,
  })
  const currentSort = ref<ProductSort>('name-asc')

  // Getters
  const filteredProducts = computed(() => {
    let result = filterProducts(products.value, currentFilter.value)
    result = sortProducts(result, currentSort.value)
    return result
  })

  const productById = computed(() => (id: string) => products.value.find(p => p.id === id))

  const categories = computed(() => {
    const cats = new Set(products.value.map(p => p.category))
    return Array.from(cats)
  })

  // Actions
  function setFilter(filter: ProductFilter) {
    currentFilter.value = filter
  }

  function setSort(sort: ProductSort) {
    currentSort.value = sort
  }

  function resetFilter() {
    currentFilter.value = {
      category: 'all',
      inStock: false,
    }
    currentSort.value = 'name-asc'
  }

  /**
   * Simulate fetching products from API
   */
  async function fetchProducts() {
    loading.value = true
    error.value = null

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, API_DELAY_MS))

      // In a real app, this would be an API call
      // products.value = await $fetch('/api/products')

      // For now, we're using mock data already set
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch products'
    }
    finally {
      loading.value = false
    }
  }

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
    fetchProducts,
  }
})
