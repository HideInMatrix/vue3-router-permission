
<script setup lang="ts">

export interface SvgIconProps {
  name: string
}

const props = defineProps<SvgIconProps>()

const styles = useCssModule()
const attrs = useAttrs()

const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  const className = [styles['svg-icon']]
  if (props.name) className.push(`icon-${props.name}`)
  return className
})
</script>

<template>
  <svg :class="svgClass" v-bind="attrs">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<style module>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  vertical-align: middle;
  overflow: hidden;
}
</style>