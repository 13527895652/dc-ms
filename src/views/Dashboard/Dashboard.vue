<template>
  <div id="dashboard">
    <header id="header">
      <router-link class="brand" to="/"><img class="brand" src="@/assets/logo.png" @click="activeMenu"/></router-link>
      <div class="title">
        <div class="main">智慧南沙公共信息资源服务平台</div>
        <div class="sub">Nansha Public Information Resources Service Platform</div>
      </div>
      <nav id="help">
        <div id="message" class="nav">
          <img src="/static/icon/tones.png">
        </div>
        <div class="message-list-container">
          <ul class="message-list">
            <li class="message-list-item"></li>
            <li class="message-list-item">22222222</li>
            <li class="message-list-item">333333333</li>
            <li class="message-list-item">444444444K</li>
            <li class="message-list-item">55555555555</li>
          </ul>
        </div>
        <div id="config" class="nav">
          <img src="/static/icon/user.png">
        </div>
        <div class="config-list-container" @click="activeList" :class="[{active:isActiveList()}]">
          <ul class="config-list">
            <li class="config-list-item"></li>
            <li class="config-list-item">退出登录</li>
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

export default {
  name: 'dashboard',
  data: function() {
    return {
      menus: dashboardStore.state.menus
    }
  },
  methods: {
    activeList: function() {
      dashboardStore.commit('activeList')
    },
    isActiveList: function() {
      return dashboardStore.state.isActiveList
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
        right: 60px;

      &>ul.message-list{
        width: 150px;
        list-style: none;
        font-size: 14px;

        &:hover{
          &>li.message-list-item:first-child{
              border-bottom:10px solid $color-grass;
          }
        }

        &>li.message-list-item{
          height: 35px;
          line-height: 35px;
          width: 100%;
          text-align: center;
          color: $color-nav-style;
          background-color: $color-f;
          cursor: pointer;

           &:first-child{
            width:0px;  
            height:0px;  
            border-left:10px solid $color-nav-style;  
            border-right:10px solid $color-nav-style;  
            border-bottom:10px solid $color-f;
            margin-left: 110px;
          }

          &:hover{
            background-color: $color-grass;
            color: $color-f;
          }

          &:active{
            background-color: darken($color-grass,10%);
          }

        }
      }
     
    }

    &>div.config-list-container{
      position: fixed;
      top: 61px;
      right: 0px;
      visibility: hidden;

      &.active{
        visibility: visible;
      }

      &>ul.config-list{
        list-style: none;
        font-size: 14px;
        width: 120px;

        &:hover{
          &>li.config-list-item:first-child{
               border-bottom:10px solid $color-grass;
          }
        }

        &>li.config-list-item{
          height: 35px;
          line-height: 35px;
          width: 100%;
          text-align: center;
          color: $color-nav-style;
          background-color: $color-f;
          cursor: pointer;

          &:first-child{
            width:0px;  
            height:0px;  
            border-left:10px solid $color-nav-style;  
            border-right:10px solid $color-nav-style;  
            border-bottom:10px solid $color-f;
            margin-left: 80px;
          }

          &:hover{
            background-color: $color-grass;
            color: $color-f;
          }

          &:active{
            background-color: darken($color-grass,10%);
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

</style>
