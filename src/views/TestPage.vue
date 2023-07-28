<script lang='ts' setup>
import {
  InfiniteScrollCustomEvent,
  IonButton,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  RefresherCustomEvent,
  useIonRouter
} from '@ionic/vue';
import {chevronDownCircleOutline} from 'ionicons/icons';
import {reactive, ref} from "vue";

const router = useIonRouter();

const items = reactive<string[]>([]);
const loading = ref(false);

const generateItems = () => {
  const count = items.length + 1;
  for (let i = 0; i < 40; i++) {
    items.push(`Item ${count + i}`);
  }
};

const onRefresh = (ev: RefresherCustomEvent) => {
  setTimeout(() => {
    items.length = 0;
    generateItems();
    loading.value = false;
    ev.target.complete();
  }, 1000);
};

const ionInfinite = (ev: InfiniteScrollCustomEvent) => {
  setTimeout(() => {
    generateItems();
    ev.target.complete();
  }, 500);
};

generateItems();

</script>

<template>
  <ion-page>
    <ion-content :scroll-y="false">
      <ion-refresher slot='fixed' @ionRefresh='onRefresh($event)' :pull-factor='0.5' :pull-min='100' :pull-max='200'>
        <ion-refresher-content :pulling-icon='chevronDownCircleOutline' refreshing-spinner='circles'
                               pulling-text='下拉刷新' refreshing-text='刷新中...'/>
      </ion-refresher>
      <recycle-scroller class='ion-content-scroll-host scroller'
                       :items='items' :min-item-size='54'>
        <template v-slot='{item,index}'>
          <ion-item>
            <ion-button @click="router.push('/product')">前往产品</ion-button>
            <p>{{ item }}+{{ index + 1 }}</p>
          </ion-item>
        </template>

        <template #after>
          <ion-infinite-scroll @ionInfinite='ionInfinite'>
            <ion-infinite-scroll-content loadingSpinner='bubbles' loadingText='正在加载更多数据……'/>
          </ion-infinite-scroll>
        </template>
      </recycle-scroller>
    </ion-content>
  </ion-page>
</template>

<style scoped>
.scroller {
  height: 100%;
}
</style>
