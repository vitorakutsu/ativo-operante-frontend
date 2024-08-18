<template>
  <div class="input-container">
    <p class="input-label">{{ label }}</p>
    <input
      class="input-content"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      :required="required"
      :maxlength="Number(maxLength)"
    />
  </div>
</template>

<script>
import "./input.styles.css";

export default {
  name: "InputComponent",
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
      type: [String, Number],
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: Number,
      default: 100,
    },
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>
