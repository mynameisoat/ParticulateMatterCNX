<template>
  <div class="m-3">
    <Menubar :model="items">
      <template #start>
        <img
          alt="logo"
          src="../assets/img/icons8-protection-mask-96.png"
          height="40"
          class="mr-2"
        />
      </template>
    </Menubar>
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: "หน้าแรก",
          icon: "pi pi-home",
          to: "/",
        },
        {
          label: "ค่าฝุ่นวันนี้",
          icon: "pi pi-cloud",
          to: "/home",
        },
        {
          label: "ฝุ่นละอองคืออะไร ?",
          icon: "pi pi-question",
          to: "/about",
        },
      ],
    };
  },
};
</script>

<style>
.p-menubar{
  font-family: "Athiti", sans-serif;
}
</style>
