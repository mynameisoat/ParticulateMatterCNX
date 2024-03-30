<template>
  <div>
    <Divider align="left">
      <div class="inline-flex align-items-center">
        <i class="pi pi-sun mr-2"></i>
        <b>ค่าฝุ่นละอองโดยรวมวันนี้</b>
      </div>
    </Divider>
    <Card>
      <template #header> </template>
      <template #title>
        <Avatar :image="imageUrl" class="mr-2" size="large" shape="circle" />
        เชียงใหม่
      </template>
      <template #content>
        <Knob v-model="value" :min="0" :max="300" :size="200" :valueColor="Color" />
        <p> {{ Alldata }} </p>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  layout: "menubar",
  head: {
    title: "หน้าหลัก",
  },
  data() {
    return {
      imageUrl: require("@/assets/img/icons8-wat-phra-kaew-60.png"),
      Alldata: [],
      value: 0,
      Color: '',
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      const url =
        "https://rguard.ntdigitalsolutions.com/api/province/Chiang Mai/hourly-aqi";
      const CROS = `https://cors-anywhere.herokuapp.com`;
      const apiKey = "DjZXKQP5F7vH9A8CSOHtVUB5trVeR9Un";
      this.$axios
        .$get(`${CROS}/${url}`, {
          headers: {
            apikey: apiKey,
          },
        })
        .then((response) => {
          const data = response.result;
          const data2 = data.data;
          this.Alldata = data2[0];
          this.value = data2[0].aqi;
        })
        .catch((error) => {
          this.Alldata = null;
        });
    },
  },
};
</script>

<style>
.p-card {
  font-family: "Athiti", sans-serif;
  background-color: #f5f5f5; /* สีพื้นหลังโปร่งใส */
  backdrop-filter: blur(10px); /* ใช้เทคนิค backdrop-filter เพื่อเบลอพื้นหลัง */
  border-radius: 10px; /* กำหนดรูปร่างของกรอบ */
  padding: 20px; /* กำหนดระยะห่างภายในกรอบ */
  max-width: 500px; /* กำหนดความกว้างของกรอบ */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); /* เพิ่มเงาใต้กรอบ */
  margin: 40px auto; /*จัดตำแหน่งกรอบตรงกลาง*/
}

.p-divider {
  font-family: "Athiti", sans-serif;
}
</style>
