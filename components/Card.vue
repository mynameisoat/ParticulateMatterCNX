<template>
  <div>
    <Card>
      <template #header> </template>
      <template #title>
        <Avatar :image="imageUrl" class="mr-2" size="large" shape="circle" />
        {{ districtName }}
        <p class="font-light text-base">
          อัพเดทเมื่อ : {{ timeData | formatDateTime }}
        </p>
      </template>
      <template #content>
        <div class="space-y-4">
          <span class="block justify-center">
            <Knob
              :v-model="valueaqi"
              :min="0"
              :max="300"
              :size="200"
              :valueColor="Color"
              :valueTemplate="valueaqi"
              readonly
            />
          </span>
          <span class="block justify-center">
            <p class="font-black text-3xl">{{ pollution_level }}</p>
          </span>
          <span class="grid grid-cols-3 gap-4">
            <div class="flex justify-content-center flex-wrap">
              <Knob
                :v-model="valuepm1"
                :min="0"
                :max="300"
                :size="100"
                :valueColor="Color"
                :valueTemplate="valuepm1"
                readonly
              />
              <span> PM 1 </span>
            </div>
            <div class="flex justify-content-center flex-wrap">
              <Knob
                :v-model="valuepm2_5"
                :min="0"
                :max="300"
                :size="100"
                :valueColor="Color"
                :valueTemplate="valuepm2_5"
                readonly
              />
              <span> PM 2.5 </span>
            </div>
            <div class="flex justify-content-center flex-wrap">
              <Knob
                :v-model="valuepm10"
                :min="0"
                :max="300"
                :size="100"
                :valueColor="Color"
                :valueTemplate="valuepm10"
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
  </div>
</template>

<script>
export default {
  props: {
    districtName: {
      type: String,
      default: "โปรดใส่ชื่ออำเภอ",
    },
    timeData: {
      type: String,
      default: "",
    },
    valueaqi: {
      type: String,
      default: "โปรดใส่ชื่ออำเภอ",
    },
    pollution_level: {
      type: String,
      default: "โปรดใส่ชื่ออำเภอ",
    },
    valuepm1: {
      type: String,
      default: "โปรดใส่ชื่ออำเภอ",
    },
    valuepm2_5: {
      type: String,
      default: "โปรดใส่ชื่ออำเภอ",
    },
    valuepm10: {
      type: String,
      default: "โปรดใส่ชื่ออำเภอ",
    },
    Color: {
      type: String,
      default: "โปรดใส่ชื่ออำเภอ",
    },
    imageUrl: {
      type: String,
      default: "",
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

.p-knob-text {
  font-size: medium;
}
</style>
