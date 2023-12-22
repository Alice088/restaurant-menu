<script setup lang="ts">
import TheButton from "@/components/ui/TheButton.vue";
import TheModalButton from "./components/TheModalButton.vue";
import TheInput from "@/components/ui/TheInput.vue";
import { useProductsStore } from "@/stores/useProductsStore";
import { useUserStore } from "@/stores/useUserStore";
import { formatToDollar } from "@/hooks/formatToDollar";
import { ref, onBeforeMount } from "vue";

const productsStore = useProductsStore();
const userStore = useUserStore();

const currentDisplayMode = ref("table");

const login = ref(null);
const password = ref(null);

onBeforeMount(productsStore.getProducts);
</script>

<template>
  <main class="main">
    <header class="main_header">
      <h1>BLACK MARKET</h1>
      <img src="@/assets/icons/156458.svg" alt="market's logo" />
    </header>

    <nav class="main_productsNav">
      <TheButton> products </TheButton>

      <TheModalButton> 
        <template v-slot:button>
          <TheButton> add new products  </TheButton>
        </template>

        <template v-slot:popUpContent>
          <form class="loginForm" v-if="userStore.user.id === 0">
            You aren't an Admin

            <TheInput 
              :modelValue="login"
              @update:model-value="newValue => login = newValue"
              placeholder="Login"
            />

            <TheInput 
              :modelValue="password"
              @update:model-value="newValue => password = newValue"
              placeholder="Password"
            />

            <TheButton @click="userStore.validAdmin"> login  </TheButton>
          </form>
        </template>
      </TheModalButton>
    </nav>

    <div class="main_userAccount">
      {{ userStore.user.login ?? "None" }}({{ userStore.user.id }})
    </div>

    <table class="table" v-if="currentDisplayMode === 'table'">
      <thead>
        <tr>
          <td colspan="4">
            <TheButton class="table_fetchButton" @click="productsStore.getProducts">
              <p v-if="!productsStore.fetching"> Fetch products </p>
              <p v-else> Fetching... </p>
            </TheButton>
          </td>
        </tr>

        <tr>
          <th>ID</th>
          <th>Category</th>
          <th>Price</th>
          <th>Name</th>
        </tr>
      </thead>

      <tbody class="table_body" v-if="productsStore.products.length !== 0">
        <TransitionGroup name="fade" appear>
          <tr class="table_row" v-for="product in productsStore.products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>{{ product.category }}</td>
            <td>{{ formatToDollar(product.price) }}</td>
            <td>{{ product.name }}</td>
          </tr>
        </TransitionGroup>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="4">Products not found :(</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="4">count of products: {{ productsStore.products.length }}</td>
        </tr>
      </tfoot>
    </table>

    <table class="table" v-if="currentDisplayMode === 'editTable'">
      <thead>
        <tr>
          <td colspan="4">
            <TheButton class="table_fetchButton" @click="productsStore.getProducts">
              <p v-if="!productsStore.fetching"> Fetch products </p>
              <p v-else> Fetching... </p>
            </TheButton>
          </td>
        </tr>

        <tr>
          <th>ID</th>
        </tr>
      </thead>

      <tbody class="table_body" v-if="productsStore.products.length !== 0">
        <TransitionGroup name="fade" appear>
          <tr class="table_row" v-for="product in productsStore.products" :key="product.id">
            <td>{{ product.id }}</td>
          </tr>
        </TransitionGroup>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="4">Products not found :(</td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td colspan="4">count of products: {{ productsStore.products.length }}</td>
        </tr>
      </tfoot>
    </table>
  </main>
</template>

<style lang="scss">
.main {
  background-color: black;
  min-height: fit-content;
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

  .main_userAccount {
    margin: 5px 0 5px 0;
    padding: 5px 0 5px 0;
    text-align: center;

    border: red solid;
    border-width: 1px 0 1px 0;
  }
}

.table {
  width: 100%;
  margin-top: 10px;

  overflow: scroll;
  border: 1px red solid;

  text-align: center;

  td, th {
    border: 1px red solid;
  }

  td:not(thead tr td), th {
    padding: 5px;
  }

  .table_fetchButton {
    width: 100%;
    border: none;
    border-radius: 0;
  }
}

.loginForm {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
