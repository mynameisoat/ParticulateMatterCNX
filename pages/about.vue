<template>
  <div class="mt-3">
    <Accordion :multiple="true" :activeIndex="[0]">
      <AccordionTab header="Header I"> Content </AccordionTab>
      <AccordionTab header="Header II"> Content </AccordionTab>
      <AccordionTab header="Header III"> Content </AccordionTab>
    </Accordion>
  </div>
</template>

<script>
export default {
  layout: "menubar",
  head: {
    title: "ฝุ่นคืออะไร?",
  },
};
</script>

<style></style>
