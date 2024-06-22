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
          <span class="flex justify-center">
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
          <span class="flex justify-center">
            <p class="font-black text-3xl">{{ Alldata.pollution_level }}</p>
          </span>
          <span class="grid grid-cols-3 gap-4">
            <div class="flex justify-content-center flex-wrap">
              <Knob
                v-model="valuepm1"
                :min="0"
                :max="300"
                :size="100"
                :valueColor="Color"
                :valueTemplate="value_pm1"
                readonly
              />
              <span> PM 1 </span>
            </div>
            <div class="flex justify-content-center flex-wrap">
              <Knob
                v-model="valuepm2_5"
                :min="0"
                :max="300"
                :size="100"
                :valueColor="Color"
                :valueTemplate="value_pm2_5"
                readonly
              />
              <span> PM 2.5 </span>
            </div>
            <div class="flex justify-content-center flex-wrap">
              <Knob
                v-model="valuepm10"
                :min="0"
                :max="300"
                :size="100"
                :valueColor="Color"
                :valueTemplate="value_pm10"
                readonly
              />
              <span> PM 10 </span>
            </div>
          </span>
          <h2 class="text-center">
            *สำหรับค่าของ PM 1 PM 2.5 และ PM 10 จะอยู่ในหน่วยของ มคก./ลบ.ม. หรือ
            µg./m3
          </h2>
        </div>
      </template>
    </Card>
    <Divider align="left">
      <div class="inline-flex align-items-center">
        <i class="pi pi-sun mr-2"></i>
        <b>ค่าฝุ่นละอองรายอำเภอ</b>
      </div>
    </Divider>
    {{ items }}
    <div class="grid grid-cols-3 gap-2">
      <CardCustom
        v-for="(item, index) in items"
        :key="index"
        :districtName="item.districtName"
        :timeStamp="item.timeStamp"
        :valueaqi="item.valueaqi"
        :pollutionlevel="item.pollutionlevel"
        :valuepm1="item.valuepm1"
        :valuepm2_5="item.valuepm2_5"
        :valuepm10="item.valuepm10"
        :image="item.image"
      />
    </div>
  </div>
</template>

<script>
import CardCustom from "~/components/CardCustom.vue";

export default {
  components: {
    CardCustom,
  },
  layout: "menubar",
  head: {
    title: "หน้าหลัก",
  },
  data() {
    return {
      imageUrl: require("@/assets/img/icons8-wat-phra-kaew-60.png"),
      Alldata: [],
      value: 0,
      valuepm1: 0,
      valuepm2_5: 0,
      valuepm10: 0,
      Color: [0],
      items: [],
    };
  },

  mounted() {
    this.fetchData();
    this.fetchDataChomThong();
    this.fetchDataChiangDao();
  },

  computed: {
    value_pm1() {
      const _valuepm1 = Math.ceil(this.valuepm1);
      return `${_valuepm1}`;
    },
    value_pm2_5() {
      const _valuepm2_5 = Math.ceil(this.valuepm2_5);
      return `${_valuepm2_5}`;
    },
    value_pm10() {
      const _valuepm10 = Math.ceil(this.valuepm10);
      return `${_valuepm10}`;
    },
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
          this.valuepm1 = data2[0].pm1;
          this.valuepm2_5 = data2[0].pm2_5;
          this.valuepm10 = data2[0].pm10;
          this.ColorControl();
        })
        .catch((error) => {
          this.Alldata = null;
        });
    },

    async fetchDataChomThong() {
      const proxyurl = "http://localhost:4000/Chom-Thong";
      await this.$axios.$get(`${proxyurl}`).then((response) => {
        const dataChomThong = response.result;
        const dataChomThong2 = dataChomThong.data;
        const dataChomThong3 = dataChomThong2;
        if (Array.isArray(dataChomThong3) && dataChomThong3.length > 0) {
          this.items[0] = dataChomThong3.map((item) => ({
            districtName: "จอมทอง",
            timeStamp: item.timestamp,
            valueaqi: item.aqi,
            pollutionlevel: item.pollution_level,
            valuepm1: Math.ceil(item.pm1),
            valuepm2_5: Math.ceil(item.pm2_5),
            valuepm10: Math.ceil(item.pm10),
            image:
              "https://img.icons8.com/?size=100&id=lPL6NCjQz9MV&format=png&color=000000",
          }));
          console.log(this.items);
        } else {
          console.error("dataChomThong3 is not an array or is empty");
          this.items = [];
        }
      });
    },

    async fetchDataChiangDao() {
      const proxyurl = "http://localhost:4000/Chiang-Dao";
      await this.$axios.$get(`${proxyurl}`).then((response) => {
        const dataChiangDao = response.result;
        const dataChiangDao2 = dataChiangDao.data;
        const dataChiangDao3 = dataChiangDao2;
        if (Array.isArray(dataChiangDao3) && dataChiangDao3.length > 0) {
          this.items[1] = dataChiangDao3.map((item) => ({
            districtName: "เชียงดาว",
            timeStamp: item.timestamp,
            valueaqi: item.aqi,
            pollutionlevel: item.pollution_level,
            valuepm1: Math.ceil(item.pm1),
            valuepm2_5: Math.ceil(item.pm2_5),
            valuepm10: Math.ceil(item.pm10),
            image:
              "https://img.icons8.com/?size=100&id=lPL6NCjQz9MV&format=png&color=000000",
          }));
          console.log(this.items);
        } else {
          console.error("dataChiangDao3 is not an array or is empty");
          this.items = [];
        }
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
