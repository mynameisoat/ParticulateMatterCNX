<template>
  <div>
    <Card>
      <template #title>
        <Avatar :image="image" class="mr-2" size="large" shape="circle" />
        {{ districtName }}
        <p class="font-light text-base">
          อัพเดทเมื่อ : {{ timeStamp | formatDateTime }}
        </p>
      </template>
      <template #content>
        <div class="flex justify-center">
          <Knob
            v-model="valueaqi"
            :min="0"
            :max="300"
            :size="200"
            :valueColor="Color"
            :valueTemplate="AQI"
            readonly
          />
        </div>
        <div class="flex justify-center">
          <p class="font-black text-3xl">{{ pollutionlevel }}</p>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div class="flex justify-center flex-wrap pt-3">
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
          <div class="flex justify-center flex-wrap pt-3">
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
          <div class="flex justify-center flex-wrap pt-3">
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
        </div>
        <div>
          <h2 class="mt-3 text-center">
            *สำหรับค่าของ PM 1 PM 2.5 และ PM 10 จะอยู่ในหน่วยของ มคก./ลบ.ม. หรือ
            µg./m3
          </h2>
        </div>
      </template>
    </Card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Color: {},
    };
  },

  props: {
    districtName: {
      type: String,
      required: true,
    },
    valueaqi: {
      type: Number,
      required: true,
    },
    pollutionlevel: {
      type: String,
      required: true,
    },
    valuepm1: {
      type: Number,
      required: true,
    },
    valuepm2_5: {
      type: Number,
      required: true,
    },
    valuepm10: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    timeStamp: {
      type: String,
      required: true,
    },
  },

  mounted() {
    this.ColorControl();
  },

  computed: {
    AQI() {
      const AQIScore = this.valueaqi;
      return `${AQIScore}AQI`;
    },
    value_pm1() {
      const value_pm1 = this.valuepm1;
      return `${value_pm1}`;
    },
    value_pm2_5() {
      const value_pm2_5 = this.valuepm2_5;
      return `${value_pm2_5}`;
    },
    value_pm10() {
      const value_pm10 = this.valuepm10;
      return `${value_pm10}`;
    },
  },

  methods: {
    ColorControl() {
      function isInRange(number, min, max) {
        return number >= min && number <= max;
      }
      const number = this.valueaqi;

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
  width: 500px; /* กำหนดความกว้างของกรอบ */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); /* เพิ่มเงาใต้กรอบ */
  margin: 40px auto; /*จัดตำแหน่งกรอบตรงกลาง*/
}

.p-knob-text {
  font-size: medium;
}
</style>
