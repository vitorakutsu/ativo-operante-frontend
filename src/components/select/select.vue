<template>
  <div class="select-container">
    <p class="select-label">{{ label }}</p>
    <select
      class="select-content"
      v-model="selectedValue"
      @change="updateValue"
      required="true"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.id"
      >
        {{ option.nome }}
      </option>
    </select>
  </div>
</template>

<script>
import "./select.styles.css";
export default {
  name: "SelectComponent",
  props: {
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    selectedValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
