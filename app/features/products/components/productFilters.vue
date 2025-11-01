<script setup lang="ts">
/**
 * ProductFilters component
 *
 * Provides filtering UI for products
 */

import { ref } from 'vue'
import type { ProductFilter, ProductSort } from '../types'
import type { ProductCategory } from '~/types/product'

interface Props {
  filter: ProductFilter
  sort: ProductSort
  categories: ProductCategory[]
}

type UpdateFilterEmit = (eventName: 'update:filter', filter: ProductFilter) => void
type UpdateSortEmit = (eventName: 'update:sort', sort: ProductSort) => void
type ResetEmit = (eventName: 'reset') => void
type Emits = UpdateFilterEmit & UpdateSortEmit & ResetEmit

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

const searchQuery = ref(props.filter.search || '')
const selectedCategory = ref<ProductCategory | 'all'>(props.filter.category || 'all')
const inStockOnly = ref(props.filter.inStock || false)
const selectedSort = ref(props.sort)

function applyFilters() {
  emit('update:filter', {
    category: selectedCategory.value,
    inStock: inStockOnly.value,
    search: searchQuery.value || undefined,
  })
  emit('update:sort', selectedSort.value)
}

function handleReset() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  inStockOnly.value = false
  selectedSort.value = 'name-asc'
  emit('reset')
}

// Apply filters when values change
function handleSearchInput() {
  applyFilters()
}

function handleCategoryChange() {
  applyFilters()
}

function handleStockChange() {
  applyFilters()
}

function handleSortChange() {
  applyFilters()
}
</script>

<template>
  <div class="filters-container">
    <div class="filters-header">
      <h2 class="filters-title">
        Filters
      </h2>
      <button
        type="button"
        class="reset-btn"
        @click="handleReset"
      >
        Reset
      </button>
    </div>

    <div class="filters-content">
      <!-- Search -->
      <div class="filter-group">
        <label
          for="search"
          class="filter-label"
        >Search</label>
        <input
          id="search"
          v-model="searchQuery"
          type="text"
          class="filter-input"
          placeholder="Search products..."
          @input="handleSearchInput"
        >
      </div>

      <!-- Category -->
      <div class="filter-group">
        <label
          for="category"
          class="filter-label"
        >Category</label>
        <select
          id="category"
          v-model="selectedCategory"
          class="filter-select"
          @change="handleCategoryChange"
        >
          <option value="all">
            All Categories
          </option>
          <option
            v-for="cat in categories"
            :key="cat"
            :value="cat"
          >
            {{ cat.charAt(0).toUpperCase() + cat.slice(1) }}
          </option>
        </select>
      </div>

      <!-- Sort -->
      <div class="filter-group">
        <label
          for="sort"
          class="filter-label"
        >Sort By</label>
        <select
          id="sort"
          v-model="selectedSort"
          class="filter-select"
          @change="handleSortChange"
        >
          <option value="name-asc">
            Name (A-Z)
          </option>
          <option value="name-desc">
            Name (Z-A)
          </option>
          <option value="price-asc">
            Price (Low to High)
          </option>
          <option value="price-desc">
            Price (High to Low)
          </option>
          <option value="rating-desc">
            Rating (High to Low)
          </option>
        </select>
      </div>

      <!-- In Stock -->
      <div class="filter-group-checkbox">
        <label class="checkbox-label">
          <input
            v-model="inStockOnly"
            type="checkbox"
            class="filter-checkbox"
            @change="handleStockChange"
          >
          <span>In stock only</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters-title {
  font-size: 18px;
  font-weight: 600;
  color: #111827;
  margin: 0;
}

.reset-btn {
  padding: 6px 12px;
  background: transparent;
  color: #3b82f6;
  border: 1px solid #3b82f6;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: #3b82f6;
  color: white;
}

.filters-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.filter-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.filter-input,
.filter-select {
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background: white;
  transition: border-color 0.2s;
}

.filter-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #3b82f6;
}

.filter-group-checkbox {
  padding-top: 8px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
}

.filter-checkbox {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

@media (max-width: 768px) {
  .filters-container {
    padding: 16px;
  }
}
</style>
