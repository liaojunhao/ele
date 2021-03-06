<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item,index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item" v-for="info in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang='babel' type="text/ecmascript-6">
    import star from '../star/star'
    import split from '../split/split'
    import BScroll from 'better-scroll'
    import {saveToLocal, loadFromLocal} from '../../common/js/store'

    export default {
      props: {
        seller: {
          type: Object
        }
      },
      data() {
        return {
          favorite: (() => {
            return loadFromLocal(this.seller.id, 'favorite', false)
          })()
        }
      },
      // mounted el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
      mounted() {
        this.$nextTick(() => {
          this._initScroll()
          this._initPics()
        })
      },
      // watch 监听数据的变化
      watch: {
        'seller'() {
          this.$nextTick(() => {
            this._initScroll()
            this._initPics()
          })
        }
      },
      // computed 计算属性
      computed: {
        favoriteText() {
          return this.favorite ? '已收藏' : '收藏'
        }
      },
      // created 实例已经创建完成之后被调用
      created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      },
      methods: {
        toggleFavorite(event) {
          if (!event._constructed) {
            return
          }
          this.favorite = !this.favorite
          saveToLocal(this.seller.id, 'favorite', this.favorite)
        },
        _initScroll() {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.seller, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        },
        _initPics() {
          if (this.seller.pics) {
            let picWidth = 120 // 图片宽度120
            let margin = 6     // 每张图边距6px
            let width = (picWidth + margin) * this.seller.pics.length - margin
            this.$refs.picList.style.width = width + 'px'
            this.$nextTick(() => {
              if (!this.picScroll) {
                this.picScroll = new BScroll(this.$refs.picWrapper, {
                  scrollX: true,
                  eventPassthrough: 'vertical'
                })
              } else {
                this.picScroll.refresh()
              }
            })
          }
        }
      },
      components: {
        star,
        split
      }
    }
</script>

<style lang="less" rel="stylesheet/less">
  .seller{
    position: absolute;
    top: 180px;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    .overview{
      position: relative;
      padding: 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .desc{
        padding-bottom: 18px;
        position: relative;
        font-size: 0;
        .star{
          display: inline-block;
          margin-right: 8px;
          vertical-align: top;
        }
        .text{
          display: inline-block;
          margin-right: 12px;
          line-height: 18px;
          vertical-align: top;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .desc:after{
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
      .remark{
        display: flex;
        padding-top: 18px;
        .block{
          flex: 1;
          text-align: center;
          border-right: 1px solid rgba(7, 17, 27, 0.1);
          &:last-child{
             border: none
          }
          h2{
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
          .content{
            line-height: 24px;
            font-size: 10px;
            color: rgb(7, 17, 27);
            .stress{
              font-size: 24px;
            }
          }
        }
      }
      .favorite{
        position: absolute;
        width: 50px;
        right: 11px;
        top: 18px;
        text-align: center;
        .icon-favorite{
          background: url("love.png") no-repeat center center;
          display: block;
          margin: 0 auto 4px auto;
          width: 24px;
          height: 24px;
          background-size: 100% 100%;
          &.active{
             background: url("love_hover.png") no-repeat center center;
             background-size: 100% 100%;
          }
        }
        .text{
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
    }
    .bulletin{
      padding: 18px 18px 0 18px;
      .title{
        margin-bottom: 8px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .content-wrapper{
        padding: 0 12px 16px 12px;
        position: relative;
        .content{
          line-height: 24px;
          font-size: 12px;
          color: rgb(240, 20, 20);
        }
      }
      .content-wrapper:after{
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
      .supports{
        .support-item{
          padding: 16px 12px;
          position: relative;
          font-size: 0;
          &:last-child:after{
            height: 0;
          }
        }
        .support-item:after{
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
        .icon{
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 6px;
          background-size: 16px 16px;
          background-repeat: no-repeat;
          &.decrease{
            background-image: url("decrease_4@2x.png");
          }
          &.discount{
             background-image: url("discount_4@2x.png");
          }
          &.guarantee{
             background-image: url("guarantee_4@2x.png");
          }
          &.invoice{
             background-image: url("invoice_4@2x.png");
          }
          &.special{
             background-image: url("special_4@2x.png");
          }
        }
        .text{
          line-height: 16px;
          font-size: 12px;
          color: rgb(7, 17, 27);
        }
      }
    }
    .pics{
      padding: 18px;
      .title{
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }
      .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child{
               margin: 0;
            }
          }
        }
      }
    }
    .info{
      padding: 18px 18px 0 18px;
      color: rgb(7, 17, 27);
      .title{
        padding-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        position: relative;
      }
      .title:after{
        position: absolute;
        content: '';
        width: 100%;
        left: 0;
        bottom: 0;
        height: 2px;
        background-color: rgba(7, 17, 27, 0.1);
        -webkit-transform: scale(1,.5);
        transform: scale(1,.5);
        -webkit-transform-origin: center bottom;
        transform-origin: center bottom;
      }
      .info-item{
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
        position: relative;
      }
      .info-item:after{
        position: absolute;
        content: '';
        width: 100%;
        left: 0;
        bottom: 0;
        height: 2px;
        background-color: rgba(7, 17, 27, 0.1);
        -webkit-transform: scale(1,.5);
        transform: scale(1,.5);
        -webkit-transform-origin: center bottom;
        transform-origin: center bottom;
      }
      .info-item:last-child:after{
        height: 0;
      }
    }
  }
</style>
