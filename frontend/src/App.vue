<script setup lang="ts">
import TheButton from '@/components/ui/TheButton.vue';
</script>

<template>
  <main class="main">
    <header class="main_header">
      <h1>BLACK MARKET</h1>
      <img src="@/assets/icons/156458.svg" alt="market's logo" />
    </header>

    <nav class="main_productsNav">
      <TheButton> products </TheButton>
      <TheButton> add new products </TheButton>
    </nav>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Price</th>
          <th>Name</th>
        </tr>
      </thead>

      <tbody class="table_body">
        <tr class="table_row">
          <td>1</td>
          <td>Human</td>
          <td>2999$</td>
          <td>Head of human</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style lang="scss">
.main {
  background-color: black;
  min-height: 100vh;
  color: red;

  .main_header {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: clamp(20px, 9vw, 40px);
    height: 150px;

    img {
      height: clamp(20px, 9vw, 40px);
      width: clamp(20px, 9vw, 40px);
    }
  }

  .main_productsNav {
    display: flex;
    justify-content: center;

    border: red double;
    border-width: 2px 0 2px 0;
    padding: 10px;

    column-gap: clamp(40px, 9vw, 50vw);
  }
}

.table {
  width: 100%;
  height: fit-content;
  margin: 10px 0 10px 0;

  overflow: scroll;
  border: 1px red solid;

  text-align: center;

  * {
    border: 1px red solid;
  }
}
</style>
