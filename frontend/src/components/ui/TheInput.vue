<script setup lang="ts">
const props = defineProps<{
	modelValue: any,
}>();

defineEmits(["update:modelValue"]);
</script>

<template>
 <input :value="props.modelValue"
        @input.stop="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
	      class="input"
 />
</template>

<style scoped lang="scss">
.input {
	width: 100%;
	height: fit-content;
	border-radius: 5px;
	padding: 3px;
	text-align: center;
	font-size: 17px;
  border: 1px red solid;

	outline: none !important;
	background-color: black;
	color: red;

	&::placeholder {
		color: red;
		text-align: center;
	}
}
</style>