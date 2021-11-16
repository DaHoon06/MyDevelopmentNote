<template>
<div>
  <div id="test">
    <ul class="first">
      <li class="start"></li>
      <li>
        <p>하나</p>
      </li>
      <li>
        <p>둘</p>
      </li>
    </ul>
    <ul class="second">
      <li class="start"></li>
      <li>
        <p>셋</p>
      </li>
    </ul>
    <ul class="third">
      <li class="start"></li>
      <li>
        <p>넷</p>
      </li>
    </ul>
    <div class="hover"></div>
  </div>
</div>
</template>

<script>
export default {
  name: "test"
}
</script>

<style scoped>
#test{
  margin-left: 260px;
}
body {
  display: flex;
  flex-direction: row;
}

ul {
  width: 300px;
  height: 600px;
  margin: 10px;
  padding: 10px;

  background-color: #dddddd;
  border-radius: 10px;
}

li {
  list-style: none;
  padding: 10px;
  margin: 10px 0 10px 0;

  width: 280px;

  background-color: #888888;
  border-radius: 10px;

  text-align: center;
  color: #ffffff;
  user-select: none;
}

li.start {
  height: 0;
  border-radius: 0;
  padding: 0;
  margin: 0;
}

.hover {
  position: absolute;
  padding: 0;
  margin: 0;

  transform: rotate(-5deg);
}

.temp {
  opacity: 0.5;
}
</style>