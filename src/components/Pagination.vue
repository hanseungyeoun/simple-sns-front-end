<template>
  <ul class="pagination-list">
    <li class="pagination-item prev">
      <button @click="() => onChange(prev)" :disabled="prev <= 0">이전</button>
    </li>

    <li v-for="page in pages" :key="page" class="pagination-item" @click="() => onChange(page)">
      <a :class="`pagination-link ${page === currentPage && 'is-active'}`">
        {{ page }}
      </a>
    </li>

    <li class="pagination-item next">
      <button @click="() => onChange(next)" :disabled="lastNumber >= totalPages">다음</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      pages: [],
      pageCount: 5,
      firstNumber: 0,
      lastNumber: 0,
      next: 0,
      prev: 0
    }
  },

  props: ['currentPage', 'totalCount', 'pageSize', 'totalPages', 'onChange'],

  watch: {
    totalCount() {
      let pageGroup = Math.ceil((this.currentPage) / this.pageCount)
      this.lastNumber = pageGroup * this.pageCount
      if (this.lastNumber > this.totalPages) {
        this.lastNumber = this.totalPages
      }
      this.firstNumber = this.lastNumber - (this.pageCount - 1)

      if (this.firstNumber < 1) {
        this.firstNumber = 1;
      }

      this.next = this.lastNumber + 1;
      this.prev = this.firstNumber - 1;

      this.pages = [];
      for (let i = this.firstNumber; i <= this.lastNumber; i++) {
        this.pages.push(i)
      }
    }
  }
};
</script>