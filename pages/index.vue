<template>
  <div class="container">
    <div class="modal">
      <vue-typed-js
        :strings="['เว็บไซต์ตรวจสอบค่าฝุ่นละอองในอากาศในจังหวัดเชียงใหม่']"
      >
        <h2 class="typing"></h2>
      </vue-typed-js>

      <div class="text">
        <div>
          <p>สนับสนุนด้านข้อมูลโดย</p>
          <p>บริษัท โทรคมนาคมแห่งชาติ จำกัด (มหาชน)</p>
        </div>

        <a href="/home">
          <button class="button">เข้าสู่เว็บไซต์</button>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: "ยินดีต้อนรับ",
  },
};
</script>

<style>
body {
  margin: 0;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/img/bg2.jpg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.modal {
  max-width: 50%;
  padding: 1rem 2rem;
  -webkit-backdrop-filter: blur(15px);
  backdrop-filter: blur(15px);
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 0.25rem;
}

.text {
  text-align: center;
  font-weight: 600;
}

.button {
  font-family: "Athiti", sans-serif;
  font-weight: 500;
  border: none;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  background-color: transparent;
  color: black;
  border: 2px solid #555555;
  transition: 1s;
}
.button:hover {
  background-color: black;
  color: white;
}
</style>
