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
        <p class="font-light text-base">
          อัพเดทเมื่อ : {{ Alldata.timestamp | formatDateTime }}
        </p>
      </template>
      <template #content>
        <div class="space-y-4">
          <span class="block flex justify-center">
            <Knob
              v-model="value"
              :min="0"
              :max="300"
              :size="200"
              :valueColor="Color"
              valueTemplate="{value}AQI"
              readonly
            />
          </span>
          <span class="block flex justify-center">
            <p class="font-black text-3xl ">{{ Alldata.pollution_level }}</p>
          </span>
          <span class="block">3</span>
        </div>
        <p>{{ Alldata }}</p>
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
      Color: [0],
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      // const url =
      //   "https://rguard.ntdigitalsolutions.com/api/province/Chiang Mai/hourly-aqi";
      // const CROS = `https://cors-anywhere.herokuapp.com`;
      // const apiKey = "DjZXKQP5F7vH9A8CSOHtVUB5trVeR9Un";
      const proxyurl = "http://localhost:4000/api/";
      this.$axios
        .$get(
          `${proxyurl}`
          // ,{
          //   headers: {
          //     apikey: apiKey,
          //   },
          // }
        )
        .then((response) => {
          const data = response.result;
          const data2 = data.data;
          this.Alldata = data2[0];
          this.value = data2[0].aqi;
          this.ColorControl();
        })
        .catch((error) => {
          this.Alldata = null;
        });
    },

    ColorControl() {
      function isInRange(number, min, max) {
        return number >= min && number <= max;
      }
      const number = this.value;

      if (isInRange(number, 0, 25)) {
        this.Color = "#3879BE";
      } else if (isInRange(number, 26, 50)) {
        this.Color = "#52CB94";
      } else if (isInRange(number, 51, 100)) {
        this.Color = "#FEBA01";
      } else if (isInRange(number, 101, 200)) {
        this.Color = "#E58839";
      } else {
        this.Color = "#E25452";
      }
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

.p-knob-text {
  font-size: medium;
}
</style>
