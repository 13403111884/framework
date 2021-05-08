<template>
  <div class="about">
    <button @click="notifications">推送窗口</button>
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const value = ref(true);
    const setValue = () => {
      value.value = !value.value;
    };
    const requestPermission = Notification.requestPermission();
    function randomNotification() {
      var notifTitle = `games[randomItem].name sss`;
      var notifBody = `Created by games[randomItem].author. sss`;
      var options = {
        requireInteraction: true,
        body: notifBody,
        // icon: notifImg
      };
      const notification = new Notification(notifTitle, options);
      notification.close();
      // setTimeout(randomNotification, 30000);
      notification.onshow = function () {
        console.log(`推送显示`);
      };

      notification.onclick = function (e) {
        console.debug(e);
        window.focus();
        const loglevel = localStorage.getItem(`loglevel:webpack-dev-server`);
        alert(`点击了弹窗`);
        console.log(`点击进入`, loglevel);
      };
      notification.onclose = function (e) {
        alert(`关闭了弹窗`);
        console.log(`点击关闭`, e);
      };
      notification.onerror = function (e) {
        console.log(`错误`, e);
      };
    }

    const notifications = () => {
      requestPermission.then(function (result) {
        if (result === `granted`) {
          randomNotification();
        }
      });
    };
    return {
      value,
      setValue,
      notifications,
    };
  },
});
</script>
