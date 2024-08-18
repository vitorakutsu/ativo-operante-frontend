<template>
  <div class="text-area-container">
    <p class="text-area-label">{{ label }}</p>
    <textarea
      class="text-area-content"
      :value="modelValue"
      :placeholder="placeholder"
      @change="updateValue"
    />
  </div>
</template>

<script>
import "./text-area.styles.css";

export default {
  name: "TextAreaComponent",
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
    onChange: {
      type: Function,
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
