/* eslint-disable no-console */

import { register } from "register-service-worker";

if (process.env.NODE_ENV === `production`) {
  register(`${process.env.BASE_URL}service-worker.js`, {
    registrationOptions: { scope: `./` },
    ready(reg) {
      console.debug(reg);
      console.log(
        `服务工作者正在从缓存中提供应用程序.\n有关更多详细信息，请访问 https://goo.gl/AFskqB`
      );
      reg.pushManager.getSubscription().then(() => {
        console.log(`getSubscription`);
      });
      return reg.sync.register(`sync-save-document`);
    },
    registered(reg) {
      console.debug(reg);
      console.log(`服务人员已注册。`);
    },
    cached(reg) {
      console.debug(reg);
      console.log(`内容已缓存以供脱机使用.`);
    },
    updatefound(reg) {
      console.debug(reg);
      console.log(`正在下载新内容.`);
    },
    updated(reg) {
      console.log(`有新内容可用；请刷新.`);
      reg.waiting && reg.waiting.postMessage({ type: `SKIP_WAITING` });
    },
    offline() {
      console.log(`找不到互联网连接。应用正在离线模式下运行.`);
    },
    error(error) {
      console.error(`服务人员注册期间出错:`, error);
    },
  });
}
