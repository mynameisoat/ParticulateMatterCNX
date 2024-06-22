<template>
  <div class="m-3">
    <Menubar :model="items">
      <template #start>
        <div>
          <img
            alt="logo"
            src="../assets/img/icons8-mask-48.png"
            class="mr-1"
          />
        </div>
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
          url: 'https://rguard.ntdigitalsolutions.com/info',
        },
      ],
    };
  },
};
</script>

<style>
.p-menubar{
  font-family: "Athiti", sans-serif;
  height: 9vh;
}
</style>
