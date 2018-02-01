<template>
  <div id="test-container">
    
  </div>
</template>

<script>
export default {
  method: {
    mouseClickAnimate: function(elementId) {
      var x, y
      elementId.onmousedown = function(event) {
        x = event.pageX
        y = event.pageY
      }
      elementId.onclick = function() {
        var top = this.offsetTop
        var left = this.offsetLeft
        x = x - left
        y = y - top
        var isExist = document.getElementById('sp')
        if (isExist) {
          elementId.removeChild(isExist)
        }
        var span = document.createElement('span')
        span.setAttribute('id', 'sp')
        elementId.appendChild(span)
        span.style.cssText += 'top:' + y + 'px;left:' + x + 'px;'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/global.scss";
div#test-container{
  position: fixed;
  overflow: hidden;
  width: 100px;
  height: 50px;
  right: 100px;
  top: 300px;
  background: #f5f2f5;
}
#sp {
  position: absolute;
  background: skyblue;
  width: 1px;
  height: 1px;
  -webkit-border-radius: 0.5px;
  -moz-border-radius: 0.5px;
  border-radius: 0.5px;
  animation: anima 1.5s;
}

@keyframes anima {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(400);
    opacity: 0;
  }
}
</style>
