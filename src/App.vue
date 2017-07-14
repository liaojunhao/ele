<template>
  <div id="app">
    <v-head v-bind:seller="seller"></v-head>
    <div class="tab">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>
<script lang='babel' type="text/ecmascript-6">
  import head from './components/header/head'
  import {queryURLParameter} from './common/js/util'

  const ERR_OK = 0

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = queryURLParameter()
            return queryParam.id
          })()
        }
      }
    },
    created() {
      this.$http.get('api/seller?id=' + this.seller.id).then(response => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data)
        }
      })
    },
    name: 'app',
    components: {
      'v-head': head
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  #app{
    .tab{
      display: flex;
      width: 100%;
      height:40px;
      line-height: 40px;
      position: relative;
      .tab-item{
        flex: 1;
        text-align: center;
        >a{
          display: block;
          font-size: 14px;
          color: rgb(77,85,93);
          &.router-link-active{
            color: red;
          }
        }
      }
    }
    .tab:before{
      position: absolute;
      content: '';
      width: 100%;
      left: 0;
      bottom: 0;
      height: 1px;
      background-color: rgba(7, 17, 27, 0.1);
      -webkit-transform: scale(1,.5);
      transform: scale(1,.5);
      -webkit-transform-origin: center bottom;
      transform-origin: center bottom;
    }
  }
</style>
