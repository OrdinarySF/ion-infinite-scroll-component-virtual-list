<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ $route.params.id }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <strong class="capitalize">{{ $route.params.id }}</strong>
        <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI
          Components</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import {IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, isPlatform} from '@ionic/vue';
import {Example} from "@capacitor/plugin-demo";
import {WebSocket} from "@ordinary/capacitor-websocket-client";
import {onMounted} from "vue";

onMounted(async () => {
  const echo = await Example.echo({
    value: "123"
  })
  console.log('echo', echo)

  const openMap = await Example.openMap({
    latitude: 1,
    longitude: 2
  })
  console.log('openMap', openMap)

  const m3 = await Example.method3((message, err) => {
    console.log('m3', JSON.stringify(message), JSON.stringify(err))
  })
  console.log('m3 newConnect:', m3)
  const url = "ws://36.134.58.29:8899/chat/jackson"
  let url2
  if (isPlatform('android'))
    url2 = "ws://10.0.2.2:8080/chat/jackson"
  else
    url2 = "ws://localhost:8080/chat/jackson"

  const myPluginEventListener = await Example.addListener(
      "onMessage",
      (data) => {
        console.log('myPluginEvent was fired', JSON.stringify(data));
      },
  );
  //
  // const onOpen = await WebSocket.onOpen((message, err) => {
  //   console.log("onOpen message: ", JSON.stringify(message))
  //   console.log("onOpen err: ", err?.toString())
  // })
  // console.log("onOpen result:", JSON.stringify(onOpen))
  //
  // await WebSocket.onMessage((message, err) => {
  //   //do something...
  //   console.log(`received message content: ${message?.data}`)
  // })
  //
  // const newConnect = await WebSocket.connect({url})
  //
  // console.log("newConnect result: ", JSON.stringify(newConnect))
  //
  // setTimeout(async () => {
  //   await WebSocket.send({data: "hello worl!"})
  // }, 2000)
  // await Example.onOpen({id: "123"}, (message, err) => {
  //   console.log("onOpen event have a bug: ", JSON.stringify(message), err?.toString())
  // })

  await WebSocket.onClose({}, (message, err) => {
    //do something...
    console.log("onClose event have : ", JSON.stringify(message))
    console.log("onClose event have a bug: ", err?.toString())
  })

  await WebSocket.connect({url: url2})

  setTimeout(async () => {
    await WebSocket.send({data: "hello world!"})
    await WebSocket.close()
  }, 2000);
})
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
