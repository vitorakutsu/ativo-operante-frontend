<template>
    <button 
        class="button-container" 
        :style="{ backgroundColor: color }"
        @click="handleClick"
    >
        <p class="button-content">{{ label }}</p>
    </button>
</template>

<script>
import "./button.styles.css";

export default {
    name: 'ButtonComponent',
    props: {
        label: {
            type: String,
        },
        color: {
            type: String,
        },
        onPress: {
            type: Function,
        }
    },
    methods: {
        handleClick() {
            this.onPress();
        }
    }
}
</script>
