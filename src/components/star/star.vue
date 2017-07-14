<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasDecimal = score % 1 !== 0
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDecimal) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-48{
       .star-item{
         width: 20px;
         height: 20px;
         margin-right: 22px;
         background-size: 20px 20px;
         &:last-child{
            margin-right: 0
         }
         &.on{
            background: url('star48_on@3x.png');
            background-size: 20px 20px;
         }
         &.half{
            background: url('star48_half@3x.png');
            background-size: 20px 20px;
         }
         &.off{
            background: url('star48_off@3x.png');
            background-size: 20px 20px;
         }
       }
    }
    &.star-36{
      .star-item{
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-size: 15px 15px;
      &:last-child{
         margin-right: 0
       }
      &.on{
         background: url('star36_on@3x.png');
         background-size: 15px 15px;
       }
      &.half{
         background: url('star36_half@3x.png');
         background-size: 15px 15px;
       }
      &.off{
         background: url('star36_off@3x.png');
         background-size: 15px 15px;
       }
      }
    }
    &.star-24{
      .star-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
      &:last-child{
         margin-right: 0
       }
      &.on{
         background: url('star24_on@3x.png');
         background-size: 10px 10px;
       }
      &.half{
         background: url('star24_half@3x.png');
         background-size: 10px 10px;
       }
      &.off{
         background: url('star24_off@3x.png');
         background-size: 10px 10px;
       }
      }
    }
  }

</style>
