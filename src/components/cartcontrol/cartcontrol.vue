<template>
  <div class="cartcontrol">
    <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">-</div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">+</div>
  </div>
</template>

<script lang='babel' type="text/ecmascript-6">
    import Vue from 'vue'

    export default{
      props: {
        food: {
          type: Object
        }
      },
      data() {
        return {}
      },
      methods: {
        addCart(event) {
          if (!event._constructed) {
            return
          }
          if (!this.food.count) {
            // 这里的vue.set是在设置数据模型中的food，新增了一个count(数量)属性,默认1个
            Vue.set(this.food, 'count', 1)
          } else {
            this.food.count++
          }
          // $emit添加一个事件，会把事件对象源(event.target)传进去
          this.$emit('add', event.target)
        },
        decreaseCart(event) {
          if (!event._constructed) {
            return
          }
          if (this.food.count) {
            this.food.count--
          }
        }
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      opacity: 1;
      width: 18px;
      height: 18px;
      text-align: center;
      line-height: 15px;
      font-size: 18px;
      border-radius: 50% 50%;
      color: rgb(0, 160, 220);
      border: 1px solid rgb(0, 160, 220);
    }
    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 24px;
      line-height: 20px;
      text-align: center;
      font-size: 10px;
      color: rgb(147, 153, 159);
    }
    .cart-add{
      display: inline-block;
      width: 18px;
      height: 18px;
      text-align: center;
      line-height: 15px;
      font-size: 18px;
      border-radius: 50% 50%;
      background-color: rgb(0, 160, 220);
      color: white;
    }
  }
</style>
