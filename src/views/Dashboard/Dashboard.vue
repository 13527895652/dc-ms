<template>
  <div id="dashboard">
    <header id="header">
      <router-link class="brand" to="/"><img class="brand" src="@/assets/logo.png" @click="activeMenu"/></router-link>
      <div class="title">
        <div class="main">智慧南沙公共信息资源服务平台</div>
        <div class="sub">Nansha Public Information Resources Service Platform</div>
      </div>
      <nav id="help">
        <div id="message" class="nav" @click="activeMessage">
          <img src="/static/icon/tones.png">
        </div>
        <div class="message-list-container" :class="[{active:isMessageActive()}]">
          <ul class="message-list">
            <li class="message-list-item"></li>
            <li class="message-list-item" v-for="msgList of msgLists" :key="msgList.id" @click="message(msgList)">
               <span class="message-content">{{msgList.msgContent}}</span>
               <span class="message-time">{{msgList.time}}</span>
            </li>
          </ul>
        </div>
        <div id="config" class="nav" @click="activeConfig">
          <img src="/static/icon/user.png">
        </div>
        <div class="config-list-container" :class="[{active:isConfigActive()}]">
          <ul class="config-list">
            <li class="config-list-item"></li>
            <li class="config-list-item" v-for="configList of configLists" :key="configList.id" @click="config(configList)">
              <span class="config-name">{{configList.configName}}</span>
            </li>
          </ul>
        </div>
      </nav>
      <div id="search">
        <img class="search" src="/static/icon/search_.png"/>
        <input type="text" placeholder="搜索">
      </div>
    </header>
    <nav id="navs" :class="[{active: isMenuActive()}]">
      <div class="menu-tabs">
        <div class="menu-tab" :class="[{active: isMenuTabActive(menu.id)}]" v-for="menu of menus" :key="menu.id" @click="activeMenuTab(menu.id)">{{menu.name}}</div>
      </div>
      <div class="menu-contents">
        <div class="menu-content" :class="[{active: isMenuTabActive(menu.id)}]" v-for="menu of menus" :key="menu.id">
          <div class="menu-item" :class="[{active: isMenuItemActive(item.id)}]" v-for="item of menu.children" :key="item.id" @click="activeMenuItem(item.id)">
            <div class="menu-item-name">{{item.name}}</div>
            <div class="menu-item-desc">{{item.desc}}</div>
          </div>
        </div>
      </div>
      <img src="@/assets/logo.png">
    </nav>
    <router-view id="content"/>
  </div>
</template>

<script>
import dashboardStore from '@/store/dashboard/dashboard'
import hCard from '@/components/hCard'
import router from '../../router'
import authStore from '@/store/auth/auth'

export default {
  name: 'dashboard',
  data: function() {
    return {
      menus: dashboardStore.state.menus,
      msgLists: dashboardStore.state.msgLists,
      configLists: dashboardStore.state.configLists
    }
  },
  methods: {
    config: function(configList) {
      switch (configList.id) {
        case 'user_info':
          console.log(configList.configName)
          break
        case 'logout':
          console.log(configList.configName)
          console.log('token_value: ' + sessionStorage.getItem('token'))
          // sessionStorage.removeItem('token')
          authStore.commit('logout')
          router.push('/superfuck')
          break
      }
    },
    message: function(msgList) {
      switch (msgList.id) {
        case 'msgItem1':
          console.log(msgList.msgContent)
          break
        case 'msgItem2':
          console.log(msgList.msgContent)
          break
        case 'msgItem3':
          console.log(msgList.msgContent)
          break
      }
    },
    activeConfig: function(event) {
      event.stopPropagation()
      dashboardStore.commit('activeConfig')
      if (dashboardStore.state.isMessageActive) {
        dashboardStore.commit('activeMessage')
      }
    },
    isConfigActive: function() {
      return dashboardStore.state.isConfigActive
    },
    activeMessage: function(event) {
      event.stopPropagation()
      dashboardStore.commit('activeMessage')
      if (dashboardStore.state.isConfigActive) {
        dashboardStore.commit('activeConfig')
      }
    },
    isMessageActive: function() {
      return dashboardStore.state.isMessageActive
    },

    activeMenu: function() {
      dashboardStore.commit('activeMenu')
    },
    activeMenuTab: function(id) {
      dashboardStore.commit('activeMenuTab', id)
    },
    activeMenuItem: function(id) {
      this.activeMenu()
      dashboardStore.commit('activeMenuItem', id)
    },
    isMenuActive: function() {
      return dashboardStore.state.isMenuActive
    },
    isMenuTabActive: function(id) {
      return dashboardStore.state.activeMenuTabId === id
    },
    isMenuItemActive: function(id) {
      return dashboardStore.state.activeMenuItemId === id
    }
  },
  components: {
    hCard
  },
  mounted() {
    document.addEventListener('click', function() {
      if (dashboardStore.state.isConfigActive) {
        dashboardStore.commit('activeConfig')
      } else if (dashboardStore.state.isMessageActive) {
        dashboardStore.commit('activeMessage')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/global.scss";

$header-height: 60px;
$sidebar-width: 250px;
$sidebar-toggle-width: 25px;
$sidebar-menu-item-height: 40px;
$search-bar-height:40px;
$color-search-font:#B9BEC9;
$color-nav-style: rgb(7,8,9);
$li-height:35px;
$sharp-width:20px;

@mixin sharp-style{
  width:0px;  
  height:0px;  
  border-left:$sharp-width /2 solid $color-nav-style;  
  border-right:$sharp-width /2 solid $color-nav-style;  
  border-bottom:$sharp-width /2 solid $color-f;
}

@mixin dropdown-list-ul-style{
  list-style: none;
  font-size: 12px;
  box-shadow: 0px 0px 2px rgba($color-nav-style, 0.3);
}

@mixin dropdown-list-li-style{
  height: $li-height;
  line-height: $li-height;
  width: 100%;
  color: $color-nav-style;
  background-color: $color-f;
  box-shadow: 1px 0px 3px rgba($color-nav-style, 0.3);
  cursor: pointer;
}

@mixin dropdown-list-li-state{
  &:hover{
    background-color: $color-grass;
    color: $color-f;
    }

  &:active{
    background-color: darken($color-grass,10%);
    }
}

@mixin dropdown-list-border-radius{
  &:nth-child(2){
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  &:last-child{
    border-bottom-left-radius: 3px;
    border-bottom-right-radius:3px;
  }
}

*{
  padding: 0px;
  margin: 0px;
}
header#header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: $header-height;
  box-shadow: 0 0 20px rgba($color-0, 0.5);
  z-index: 200;
  min-width: 1440px;
  background: linear-gradient(to top right, darken($color-steel, 5%), lighten($color-steel, 5%));

  &>a.brand {
    float: left;
    margin: 5px;
  }

  &>div.title {
    float: left;
    cursor: default;

    &>div.main {
      color: lighten($color-steel, 60%);
      text-shadow: 3px 0 3px $color-0;
      font: {
        size: 25px;
        family: 'simhei';
      }
      height: $header-height * 0.4;
      line-height: $header-height * 0.8;
    }
    &>div.sub {
      font: {
        style: italic;
        size: 14px;
        family: 'Verdana';
      }
      color: orange;
      transition: color 200ms;
      text-shadow: 1px 2px 3px darken($color-steel, 10%);
      height: $header-height * 0.4;
      line-height: $header-height * 0.7;

      &:hover {
        color: orangered;
      }
    }
  }

  &>nav#help {
    height: $header-height;
    float: right;
    font-size: 0;

    &>div.nav{
      border-left: solid 1px darken($color-steel, 5%);
      position: relative;
      overflow: hidden;
      width: $header-height;
      height: $header-height;
      display: inline-block;
      cursor: pointer;

      &>img {
        filter: drop-shadow($color-steel-font 100px 0);
        position: absolute;
        top: 14px;
        left: -86px;
        width: 32px;
        height: 32px;
      }
      &:hover{
        background-color: $color-grass;

        &>img{
            filter: drop-shadow(white 100px 0);
        }
      }
      &:active{
        background-color: darken($color-grass,10%);
      }
    }

    &>div.message-list-container{
      position: fixed;
      top: 61px;
      right: $header-height;
      display: none;
      animation: show .5s;

      &.active{
        display: block;
      }

      &>ul.message-list{
        width: $header-height * 6;
        @include dropdown-list-ul-style;

        &>li.message-list-item{
          @include dropdown-list-li-style;
          @include dropdown-list-li-state;
          @include dropdown-list-border-radius;

          &>span.message-content{
            display: inline-block;
            margin-left: 10px;
          }
          &>span.message-time{
            float: right;
            margin-right: 5px;
          }

          &:first-child{
            @include sharp-style;
            margin-left: ($header-height - $sharp-width)/2 + $header-height * 5;
          }
        }
      }
    }

    &>div.config-list-container{
      position: fixed;
      top: 61px;
      right: 0px;
      animation: show .5s;
      display: none;

      &.active{
        display: block;
      }

      &>ul.config-list{
        width: $header-height * 2;
        @include dropdown-list-ul-style;

        &>li.config-list-item{
          @include dropdown-list-li-style;
          @include dropdown-list-li-state;
          @include dropdown-list-border-radius;
          text-align: center;

          &:first-child{
            @include sharp-style;
            margin-left: ($header-height - $sharp-width)/2 + $header-height;
          }
        }
      }
    }
  }
 
  &>div#search{
    float: right;
    width: 180px;
    height: $search-bar-height;
    margin-top: ($header-height - $search-bar-height) / 2;
    margin-right: 10px;
    box-shadow:0px 0px 999px $color-nav-style inset;
    transition: all 500ms ease;

    &:hover{
      width: 300px;
      border-bottom: 1px solid $color-grass;

      &>input{
         width: 260px;
      }
    }
        
    &>input{
      display: inline-block;
      width: 140px;
      height: $search-bar-height;
      line-height: $search-bar-height;
      margin-left: $search-bar-height;
      outline: none;
      color:$color-search-font;
      font-size: 16px;
      border: 0px solid $color-nav-style;
      background: $color-nav-style;
      transition: all 500ms ease;
    }

    &>img.search{
      position: absolute;
      height: 20px;
      width: 20px;
      margin: ($search-bar-height - 20px) / 2;
    }

  }  
}
nav#navs {
  position: fixed;
  top: $header-height;
  left: 0;
  right: 0;
  padding: 10px 50px;
  background: linear-gradient(to bottom right, darken($color-steel, 5%), darken($color-steel, 15%));
  border-bottom: solid 1px lighten($color-steel, 5%);
  display: none;
  z-index: 150;
  min-width: 1280px;
  overflow: hidden;

  &.active {
    display: block;
  }

  &>img {
    filter: grayscale(60%);
    position: absolute;
    right: 0;
    top: calc(50% - 250px);
    width: 400px;
    height: 500px;
    opacity: 0.1;
  }

  &>div.menu-tabs {
    font-size: 14px;
    float: left;
    padding-right: 20px;
    border-right: solid 1px lighten($color-steel, 5%);

    &>div.menu-tab {
      cursor: pointer;
      margin: 20px 0;
      padding: 10px 50px;
      color: $color-steel-font;
      background-color: lighten($color-steel, 5%);
      box-shadow: 0 4px 12px rgba($color-0, 0.4);
      transition: color 200ms, background-color 200ms;

      &:hover, &.active {
        color: $color-f;
        background-color: $color-grass;
      }
    }
  }

  &>div.menu-contents {
    float: left;
    margin-left: -1px;
    padding-left: 10px;
    font-size: 13px;
    border-left: solid 1px lighten($color-steel, 5%);
    width: 800px;

    &>div.menu-content {
      display: none;

      &.active {
        display: block;
      }
      &>div.menu-item {
        position: relative;
        float: left;
        cursor: pointer;
        margin: 10px;
        padding: 5px 20px;
        color: $color-steel-font;
        background-color: lighten($color-steel, 5%);
        box-shadow: 0 4px 12px rgba($color-0, 0.4);
        transition: color 200ms, background-color 200ms;
        width: 300px;
        height: 60px;
        
        &:hover, &.active {
          color: $color-f;
          background-color: $color-sea;
        }

        &>div.menu-item-name {
          height: 40px;
          line-height: 35px;
          font-size: 20px;
        }
        &>div.menu-item-desc {
          height: 20px;
          line-height: 15px;
          font-size: 13px;
        }
        &>div.menu-item-icon {
          position: absolute;
          top: 0;
          right: 0;
          height: 70px;
          width: 70px;
          overflow: hidden;
        }
      }
    }
  }

  @include clearfix;
}
div#content {
  position: fixed;
  top: $header-height;
  left: 0;
  right: 0;
  bottom: 0;
}
@keyframes show{
  0% {top: 61px;}
  50% {top: 71px;}
  100% {top: 61px;}
}

@-moz-keyframes show 
{
  0% {top: 61px;}
  50% {top: 71px;}
  100% {top: 61px;}
}

@-webkit-keyframes show {
  0% {top: 61px;}
  50% {top: 71px;}
  100% {top: 61px;}
}

@-o-keyframes show {
  0% {top: 61px;}
  50% {top: 71px;}
  100% {top: 61px;}
}

</style>
