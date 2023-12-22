<script setup lang="ts">
import { ref } from "vue";

const isVisibleModal = ref(false);
</script>

<template>
	<div @click="isVisibleModal = true">
		<slot name="button" />
	</div>

	<teleport to="body">
		<div @click.self="isVisibleModal = false" v-if="isVisibleModal" class="popUpBox">
			<div class="popUpBox__popUp">
				<slot name="popUpContent" />

				<TheButton @click="isVisibleModal = false" class="popUpBox__closeButton">
					Close
				</TheButton>
			</div>
		</div>
	</teleport>
</template>

<style scoped lang="scss">
* {
	transition: background-color 300ms ease-in-out;
	transition-property: background-color, color, transform;
}

.popUpBox {
	position: fixed;
	inset: 0;

	display: flex;
	justify-content: center;
	align-items: center;
  text-align: center;

	backdrop-filter: brightness(20%) blur(3px);
}

.popUpBox__popUp {
	display: flex;
	flex-direction: column;
	row-gap: 40px;
	justify-content: center;
	align-items: center;

	padding: 20px;
	border-radius: 5px;
	min-width: 80%;

	background-color: black;
  color: red;
  border: 1px red solid;
}

.popUpBox__closeButton {
	background-color: red;
	color: black;
  cursor: pointer;

	padding: 3px;
	border-radius: 5px;
	width: 100%;
}
</style>