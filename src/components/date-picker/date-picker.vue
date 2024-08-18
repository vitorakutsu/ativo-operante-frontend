<template>
  <div class="date-picker-container">
    <p class="date-picker-label">{{ label }}</p>
    <input
      class="date-picker-content"
      :placeholder="placeholder"
      type="date"
      :value="modelValue"
      @input="updateValue"
      :min="new Date().toISOString()"
    />
  </div>
</template>

<script>
import "./date-picker.styles.css";
export default {
  name: "DatePickerComponent",
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
