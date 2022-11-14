---
title: "AcWing Web 应用课" # 标题
date: 2022-11-02T15:49:03+08:00 # 创建时间
author: ["Xan"] # 作者
tags: # 标签
- Tech
- AcWing
- Web
- 新技能
keywords: # 关键词
- Tech
- AcWing
- Web
- 新技能
description: "" # 描述
weight: # 输入1可以顶置文章，用来给文章展示排序，不填就默认按时间排序
slug: ""
draft: false # 是否为草稿
comments: true # 是否展示评论
showToc: true # 显示目录
TocOpen: true # 自动展开目录
hidemeta: false # 是否隐藏文章的元信息，如发布日期、作者等
disableShare: true # 底部不显示分享栏
showbreadcrumbs: true # 顶部显示当前路径
cover:
    image: "" #图片路径 例：posts/tech/123/picture.png
    caption: "" # 图片底部描述
    alt: ""
    relative: false
---

# AcWing Web 应用课
- [AcWing Web 应用课 | Colopen's blog](https://www.colopen-blog.com/Engineer/acw_web/)
- [AcWing Web 应用课](https://www.acwing.com/activity/content/punch_the_clock/1150/)
	- [HTML 基础标签](https://www.acwing.com/file_system/file/content/whole/index/content/4078555/)
	- [CSS](https://www.acwing.com/file_system/file/content/whole/index/content/4194723/)
	- [JavaScript](https://www.acwing.com/file_system/file/content/whole/index/content/4719082/)
	- [React](https://www.acwing.com/file_system/file/content/whole/index/content/5501588/)
	- [Vue3](https://www.acwing.com/file_system/file/content/whole/index/content/5639568/)
- [MDN官方文档](https://developer.mozilla.org/zh-CN/)
	- [Web 入门](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web)
	- [HTML —— 构建 Web](https://developer.mozilla.org/zh-CN/docs/Learn/HTML)
	- [CSS —— 设计Web](https://developer.mozilla.org/zh-CN/docs/Learn/CSS)
	- [JavaScript —— 用户端动态脚本](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript)
	- [React 入门](https://developer.mozilla.org/zh-CN/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_getting_started)
	- [Vue 入门](https://developer.mozilla.org/zh-CN/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Vue_getting_started)
	- [Canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
***
- `VSCode` 自动生成缺省的 `HTML` 代码框架
```HTML
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Document</title>

</head>

<body>

</body>

</html>
```

1. 输入`！`，接着输入 `tab` 键，自动生成缺省的 `HTML` 代码框架
2. 再按三下 `tab` 键，光标会移动到 `<body>` 与 `</body>` 之间的空行
***
## KOF
- [KOF](https://github.com/Xancoding/Leaning-jQuery)
- [AcWing Web 应用课 | 中期项目——拳皇（上） | Vedio](https://www.acwing.com/video/3830/) 
- [AcWing Web 应用课 | 中期项目——拳皇（下） | Vedio](https://www.acwing.com/video/3833/)
***
### 基础操作
```
操作如下：
角色一: w 跳 a 左移 d 右移 j 拳击 
角色二: ↑ 跳 ← 左移 → 右移 1 拳击
```
### 文件结构
```
|-- README.md
|-- static
|   |-- css
|   |   `-- base.css
|   |-- images
|   |   |-- background
|   |   |   `-- 0.gif
|   |   `-- player
|   |       `-- kyo
|   |           |-- 0.gif
|   |           |-- 1.gif
|   |           |-- 2.gif
|   |           |-- 3.gif
|   |           |-- 4.gif
|   |           |-- 5.gif
|   |           `-- 6.gif
|   `-- js
|       |-- ac_game_object
|       |   `-- base.js
|       |-- base.js
|       |-- controller
|       |   `-- base.js
|       |-- game_map
|       |   `-- base.js
|       |-- player
|       |   |-- base.js
|       |   `-- kyo.js
|       `-- utils
|           `-- gif.js
`-- templates
    `-- index.html
```
### 整体架构
![KOFStructure](https://bu.dusays.com/2022/11/02/63627b3105c46.png)
### 逻辑结构
<center> 
	<img style="border-radius: 0.3125em; box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" src="https://bu.dusays.com/2022/11/02/63627ace5a2f9.png">
	<br>
	<div style="color:orange; border-bottom: 1px solid #d9d9d9; 
	display: inline-block; 
	color: #999; 
	padding: 2px;">Retrieved from：https://www.acwing.com/solution/content/139831/</div> 
 </center>

### HTML
`templates/index.html`
```
<!DOCTYPE html>

<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>KOF</title>

  <link rel="stylesheet" href="../static/css/base.css">

  <script src="https://cdn.acwing.com/static/jquery/js/jquery-3.3.1.min.js"></script>

</head>

<body>

  <div id="kof"></div>

  

  <script type="module">

    import {KOF} from '../static/js/base.js';

  

    let kof = new KOF('kof');

  </script>

</body>

</html>
```
### CSS
`css/base.css`
```
#kof {

  width: 1280px;

  height: 720px;

  background-image: url('../images/background/0.gif');

  background-size: 200% 100%;

  background-position: top;

  position: absolute;

}

  

#kof>.kof-head {

  width: 100%;

  height: 80px;

  position: absolute;

  top: 0;

  display: flex;

  align-items: center;

}

  

#kof>.kof-head>.kof-head-hp-0 {

  height: 40px;

  width: calc(50% - 60px);

  margin-left: 20px;

  border: white 5px solid;

  box-sizing: border-box;

  border-right: none;

}

  

#kof>.kof-head>.kof-head-timer {

  height: 60px;

  width: 80px;

  background-color: orange;

  border: white 5px solid;

  box-sizing: border-box;

  color: white;

  font-size: 30px;

  font-weight: 800;

  text-align: center;

  line-height: 50px;

  user-select: none;

}

  

#kof>.kof-head>.kof-head-hp-1 {

  height: 40px;

  width: calc(50% - 60px);

  border: white 5px solid;

  box-sizing: border-box;

  border-left: none;

}

  

#kof>.kof-head>.kof-head-hp-0>div {

  background-color: red;

  height: 100%;

  width: 100%;

  float: right;

}

  

#kof>.kof-head>.kof-head-hp-1>div {

  background-color: red;

  height: 100%;

  width: 100%;

}

  

#kof>.kof-head>.kof-head-hp-0>div>div {

  background-color: lightgreen;

  height: 100%;

  width: 100%;

  float: right;

}

  

#kof>.kof-head>.kof-head-hp-1>div>div {

  background-color: lightgreen;

  height: 100%;

  width: 100%;

}
```
### JavaScript
#### 逻辑结构
![逻辑结构](https://bu.dusays.com/2022/11/03/63631ec3461ef.png)
#### KOF
`js/base.js`
```
import { GameMap } from '../js/game_map/base.js'

import { Kyo } from '../js/player/kyo.js';

  

export class KOF {

  constructor(id) {

    this.$kof = $('#' + id);

  

    this.game_map = new GameMap(this);

    this.players = [

      new Kyo(this, {

        id: 0,

        x: 200,

        y: 0,

        width: 120,

        height: 200,

        color: 'blue'

      }),

      new Kyo(this, {

        id: 1,

        x: 900,

        y: 0,

        width: 120,

        height: 200,

        color: 'red'

      })

    ]

  }

}
```
#### AcGameObject
`js/ac_game_object/base.js`
```
let AC_GAME_OBJECTS = [];

  

export class AcGameObject {

  constructor() {

    AC_GAME_OBJECTS.push(this);

  

    this.timedelta = 0;

    this.has_call_start = false;

  }

  

  start() {  // 初始化

  
  

  }

  

  update() {  // 每一帧执行一次

  

  }

  

  destory() {  // 删除当前对象

    for (let i in AC_GAME_OBJECTS) {

      if (AC_GAME_OBJECTS[i] === this) {

        AC_GAME_OBJECTS.splice(i, 1);

        break;

      }

    }

  }

}

  

let last_timestamp;   // 上一次执行函数时的时刻

  

/**

 * @description 该函数每一帧执行一次

 * @param {number} timestamp 当前执行函数时的时刻

 */

  

let AC_GAME_OBJECTS_FRAME = (timestamp) => {

  for (let obj of AC_GAME_OBJECTS) {

    if (!obj.has_call_start) {

      obj.start();

      obj.has_call_start = true;

    } else {

      obj.timedelta = timestamp - last_timestamp;

      obj.update();

    }

  }

  

  last_timestamp = timestamp;

  requestAnimationFrame(AC_GAME_OBJECTS_FRAME);

}

  

requestAnimationFrame(AC_GAME_OBJECTS_FRAME);
```
#### Controller
- `controller` 控制器，读取玩家的输入
`js/constroller/base.js`
```
export class Controller {   // 手动实现键盘触发事件——当前按住的按键（效果不同于keydown）

  constructor($canvas) {

    this.$canvas = $canvas;

    this.pressed_keys = new Set();    // Set 对象允许你存储任何类型的唯一值

    this.start();

  }

  

  start() {

    let outer = this;

    this.$canvas.keydown(function(e){   // keydown：某个键是否被按住，事件会连续触发

      outer.pressed_keys.add(e.key);

    });

  

    this.$canvas.keyup(function(e){   // keyup：某个按键是否被释放

      outer.pressed_keys.delete(e.key);

    });

  

  }

}
```
#### GameMap
`js/game_map/base.js`
```
import {AcGameObject} from '../ac_game_object/base.js'

import { Controller } from '../controller/base.js';

  

export class GameMap extends AcGameObject {

  constructor(root) {

    super();

  

    this.root = root;

    this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>');   // 构造一个jQuery对象  其中，tabindex="0"使<canvas>元素可以聚焦

    this.ctx = this.$canvas[0].getContext('2d');  // this.$canvas[0]是<canvas>元素的DOM对象   this.ctx用于画布的渲染

    this.root.$kof.append(this.$canvas);

    this.$canvas.focus();   // 聚焦，使之可以获取输入

  

    this.controller = new Controller(this.$canvas);

  

    // 加入血条

    this.root.$kof.append($(`

      <div class="kof-head">

        <div class="kof-head-hp-0"><div><div></div></div></div>

        <div class="kof-head-timer"></div>

        <div class="kof-head-hp-1"><div><div></div></div></div>

      </div>

    `));

  

    // 加入计时表

    this.time_left = 60000;  //单位：毫秒（因为定义的timedelta单位是ms）

    this.$timer = this.root.$kof.find('.kof-head-timer');

  }

  

  start() {

  

  }

  

  update() {

    this.update_time();

  

    this.render();

  }

  

  update_time() {

    this.time_left -= this.timedelta;

    if (this.time_left < 0) {   // 时间到，游戏结束

      this.time_left = 0;

  

      let [a, b] = this.root.players;

      if (a.status !== 6 && b.status !== 6) {

        a.statu = b.status = 6;

        a.frame_current_cnt = b.frame_current_cnt = 0;

        a.vx = b.vx = 0;

      }

    }

    this.$timer.text(parseInt(this.time_left / 1000));

  }

  

  render() {

    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

  }

}
```
#### Player
`js/player/base.js`
```
import { AcGameObject } from '../ac_game_object/base.js';

  

export class Player extends AcGameObject {

  constructor(root, info) {

    super();

  

    this.root = root;

    this.id = info.id;

    this.x = info.x;

    this.y = info.y;

    this.width = info.width;

    this.height = info.height;

    this.color = info.color;

  

    this.direction = 1;

  

    this.vx = 0;

    this.vy = 0;

  

    this.speedx = 400;  // 水平速度

    this.speedy = -1000;  // 跳跃初始速度

  

    this.gravity = 50;

  

    this.ctx = this.root.game_map.ctx;

    this.pressed_keys = this.root.game_map.controller.pressed_keys;

    this.status = 3;  // 0：静止， 1：向前，2：向后，3：跳跃，4：攻击，5：被攻击，6：死亡   随着项目的完善，动作会变的很多，这时用数组存储字符串代替this.status会更方便

    this.animations = new Map();  // 存储GIF动画的每一帧

    this.frame_current_cnt = 0;  // 记录当前的帧数

  

    this.hp = 100;

    this.$hp = this.root.$kof.find(`.kof-head-hp-${this.id}>div`);

    this.$hp_div = this.$hp.find('div');

  }

  start() {

  }

  

  update_control() {

    let w, a, d, j;

    if (this.id === 0) {

      w = this.pressed_keys.has('w');

      a = this.pressed_keys.has('a');

      d = this.pressed_keys.has('d');

      j = this.pressed_keys.has('j');

    } else {

      w = this.pressed_keys.has('ArrowUp');

      a = this.pressed_keys.has('ArrowLeft');

      d = this.pressed_keys.has('ArrowRight');

      j = this.pressed_keys.has('1');

    }

  

    if (this.status === 0 || this.status === 1) {   // 静止状态 || 移动状态

      if (j) {  // 攻击

        this.status = 4;

        this.vx = 0;

        this.frame_current_cnt = 0;

      } else if (w) {  // 跳跃

        if (d) {  // 向右跳

          this.vx = this.speedx;

        } else if (a) {  // 向左跳

          this.vx = -this.speedx;

        } else {  // 垂直跳

          this.vx = 0;

        }

        this.vy = this.speedy;

        this.status = 3;

        this.frame_current_cnt = 0; // 每次跳跃重新记录帧数，确保跳跃动画正常

  

      } else if (d) {  // 向右移动

        this.vx = this.speedx;

        this.status = 1;

      } else if (a) {  // 向左移动

        this.vx = - this.speedx;

        this.status = 1;

      } else {  // 静止

        this.vx = 0;

      }

    }

  

  }

  update_move() {

    this.vy += this.gravity;

  

    this.x += this.vx * this.timedelta / 1000;

    this.y += this.vy * this.timedelta / 1000;

  

    // 确保两个角色不会重叠   a 是自己、b 是对手

    // let [a, b] = this.root.players;

    // if (a !== this) [a,b] = [b, a];

  

    // let r1 = {

    //   x1: a.x,

    //   y1: a.y,

    //   x2: a.x + a.width,

    //   y2: a.x + a.height,

    // };

    // let r2 = {

    //   x1: b.x,

    //   y1: b.y,

    //   x2: b.x + b.width,

    //   y2: b.x + b.height,

    // };

  

    // if (this.is_collusion(r1, r2)) {

    //   b.x += this.vx * this.timedelta / 1000 / 2;

    //   b.y += this.vy * this.timedelta / 1000 / 2;

    //   a.x -= this.vx * this.timedelta / 1000 / 2;

    //   a.y -= this.vy * this.timedelta / 1000 / 2;

  

    //   if (this.status === 3) this.status = 0;

    // }

  

    // 落到平地上后静止

    if (this.y > 450) {

      this.y = 450;

      this.vy = 0;

      if (this.status === 3) this.status = 0;   // 因为任何时刻都有重力施加，不加这一句会导致状态只有静止状态

    }

  

    // 不能超出左右边界

    if (this.x < 0) {

      this.x = 0;

    } else if (this.x + this.width > this.root.game_map.$canvas.width()) {

      this.x = this.root.game_map.$canvas.width() - this.width;

    }

  

  }

  

  update_direction() {  // 确保两个角色始终相对

    if (this.status === 6) return;

  

    let players = this.root.players;

    if (players[0] && players[1]) {

      let me = this, you = players[1 - this.id];

      if (me.x < you.x) me.direction = 1;

      else me.direction = -1;

    }

  }

  

  is_collusion(r1, r2) {  // 判断两个矩阵是否有交集

    if (Math.max(r1.x1, r2.x1) > Math.min(r1.x2, r2.x2))

      return false;

    if (Math.max(r1.y1, r2.y1) > Math.min(r1.y2,r2.y2))

      return false;

    return true;

  }

  

  is_attack() {

    if (this.status === 6) return;  // 已经倒地，无法再被攻击

  

    this.status = 5;

    this.frame_current_cnt = 0;

  

    this.hp = Math.max(this.hp - 10, 0);

  

    this.$hp_div.animate({  // 血条减少，渐变

      width: this.$hp.parent().width() * this.hp / 100,

    }, 350);

  

    this.$hp.animate({  // 血条减少，渐变

      width: this.$hp.parent().width() * this.hp / 100,

    }, 600);

  

    if (this.hp <= 0) {

      this.status = 6;

      this.frame_current_cnt = 0;

      this.vx = 0;

    }

  }

  

  update_attack() {   // 判定是否被攻击到

    if (this.status === 4 && this.frame_current_cnt === 18) {   // 第18帧时动画挥出拳，判断此时是否拳头与对方有碰撞

      let me = this, you = this.root.players[1 - this.id];

      let r1;  // 攻击判定矩形

      let r2;  // 敌方人物矩形

      if (this.direction > 0) {

        r1 = {

          x1: me.x + 120,

          y1: me.y + 40,

          x2: me.x + 120 + 100,

          y2: me.y + 40 + 20,

        }

      } else {

        r1 = {

          x1: me.x + me.width - 120 - 100,

          y1: me.y + 40,

          x2: me.x + me.width - 120 - 100 + 100,

          y2: me.y + 40 + 20,

        }

      }

  

      r2 = {

        x1: you.x,

        y2: you.y,

        x2: you.x + you.width,

        y2: you.y + you.height

      };

  

      if (this.is_collusion(r1, r2)) {

        you.is_attack();

      }

    }

  }

  

  update() {

    this.update_attack();

    this.update_direction();

    this.update_control();

    this.update_move();

    this.render();

  }

  

  render() {

  

    let status = this.status;

  

    if (this.status === 1 && this.direction * this.vx < 0) status = 2;    // 后退状态

  

    let obj = this.animations.get(status);

    if (obj && obj.loaded) {    // GIF 已经加载完成

      if (this.direction > 0) {  // 正方向

        let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;  // 通过obj.frame_rate控制渲染动画的速率，方便控制动画，而不只是单纯的每一帧都渲染一次

        let image = obj.gif.frames[k].image;

        this.ctx.drawImage(image, this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);

      } else {  // 反方向   通过调整坐标系来翻转方向

        this.ctx.save();

        this.ctx.scale(-1, 1);

        this.ctx.translate(-this.root.game_map.$canvas.width(), 0);

  

        let k = parseInt(this.frame_current_cnt / obj.frame_rate) % obj.frame_cnt;

        let image = obj.gif.frames[k].image;

        this.ctx.drawImage(image, this.root.game_map.$canvas.width() - this.width - this.x, this.y + obj.offset_y, image.width * obj.scale, image.height * obj.scale);  // 不同于正方向时的渲染，因为此时坐标系改变，需要在对称的位置渲染

  

        this.ctx.restore();

      }

    }

  

    if (status === 4 || status === 5 || status === 6) {  // 确保不会一直循环GIF

      if (this.frame_current_cnt === obj.frame_rate * (obj.frame_cnt - 1)) {  // 确保此时已经播放完一次GIF动画

        if (status === 6) {   // 死亡倒地不起，这里的 -- 和 下面的 ++ 相抵消，使之在最后一帧不再变化

          this.frame_current_cnt--;

        } else {

          this.status = 0;

        }

      }

    }

  

    this.frame_current_cnt++;

  }

}
```
`js/player/kyo.js`
```
import { Player } from "../player/base.js";

import {GIF} from '../utils/gif.js'

  

export class Kyo extends Player {

  constructor(root, info) {

    super(root, info);

  

    this.init_animations();   // 初始化动画

  }

  

  init_animations() {

    let outer = this;

    let offsets = [0, -22, -22, -150, 0, 0, 0];   // 偏移量 不同的动画高度不同，因此需要借助竖直方向上的偏移量将他们调整至同一水平面

    for (let i = 0; i < 7; ++ i) {  // 7个动作

      let gif = GIF();

      gif.load(`/static/images/player/kyo/${i}.gif`);

      this.animations.set(i, {  // 动画

        gif: gif,

        frame_cnt: 0,  // GIF帧数

        frame_rate: 5,  // 每5帧过渡一次

        offset_y: offsets[i],  // y方向偏移量

        loaded: false,  // 是否加载完成

        scale: 2,  // 放大2倍

      });

  

      gif.onload = function() {   // 加载完成

        let obj = outer.animations.get(i);

        obj.frame_cnt = gif.frames.length;

        obj.loaded = true;

  

        if (i === 3) {  // 调整跳跃时GIF播放速率

          obj.frame_rate = 4;

        }

      }

    }

  }

}
```
#### GIF
- [Loading and playing GIF image to canvas](https://stackoverflow.com/questions/48234696/how-to-put-a-gif-with-canvas/48348567#48348567)    把玩家的`GIF`动画渲染在`canvas`上
***
`js/utils/gif.js`
```
const GIF = function () {

  // **NOT** for commercial use.

  var timerID;                          // timer handle for set time out usage

  var st;                               // holds the stream object when loading.

  var interlaceOffsets = [0, 4, 2, 1]; // used in de-interlacing.

  var interlaceSteps = [8, 8, 4, 2];

  var interlacedBufSize;  // this holds a buffer to de interlace. Created on the first frame and when size changed

  var deinterlaceBuf;

  var pixelBufSize;    // this holds a buffer for pixels. Created on the first frame and when size changed

  var pixelBuf;

  const GIF_FILE = { // gif file data headers

    GCExt: 0xF9,

    COMMENT: 0xFE,

    APPExt: 0xFF,

    UNKNOWN: 0x01, // not sure what this is but need to skip it in parser

    IMAGE: 0x2C,

    EOF: 59,   // This is entered as decimal

    EXT: 0x21,

  };

  // simple buffered stream used to read from the file

  var Stream = function (data) {

      this.data = new Uint8ClampedArray(data);

      this.pos = 0;

      var len = this.data.length;

      this.getString = function (count) { // returns a string from current pos of len count

          var s = "";

          while (count--) { s += String.fromCharCode(this.data[this.pos++]) }

          return s;

      };

      this.readSubBlocks = function () { // reads a set of blocks as a string

          var size, count, data = "";

          do {

              count = size = this.data[this.pos++];

              while (count--) { data += String.fromCharCode(this.data[this.pos++]) }

          } while (size !== 0 && this.pos < len);

          return data;

      }

      this.readSubBlocksB = function () { // reads a set of blocks as binary

          var size, count, data = [];

          do {

              count = size = this.data[this.pos++];

              while (count--) { data.push(this.data[this.pos++]); }

          } while (size !== 0 && this.pos < len);

          return data;

      }

  };

  // LZW decoder uncompressed each frames pixels

  // this needs to be optimised.

  // minSize is the min dictionary as powers of two

  // size and data is the compressed pixels

  function lzwDecode(minSize, data) {

      var i, pixelPos, pos, clear, eod, size, done, dic, code, last, d, len;

      pos = pixelPos = 0;

      dic = [];

      clear = 1 << minSize;

      eod = clear + 1;

      size = minSize + 1;

      done = false;

      while (!done) { // JavaScript optimisers like a clear exit though I never use 'done' apart from fooling the optimiser

          last = code;

          code = 0;

          for (i = 0; i < size; i++) {

              if (data[pos >> 3] & (1 << (pos & 7))) { code |= 1 << i }

              pos++;

          }

          if (code === clear) { // clear and reset the dictionary

              dic = [];

              size = minSize + 1;

              for (i = 0; i < clear; i++) { dic[i] = [i] }

              dic[clear] = [];

              dic[eod] = null;

          } else {

              if (code === eod) { done = true; return }

              if (code >= dic.length) { dic.push(dic[last].concat(dic[last][0])) }

              else if (last !== clear) { dic.push(dic[last].concat(dic[code][0])) }

              d = dic[code];

              len = d.length;

              for (i = 0; i < len; i++) { pixelBuf[pixelPos++] = d[i] }

              if (dic.length === (1 << size) && size < 12) { size++ }

          }

      }

  };

  function parseColourTable(count) { // get a colour table of length count  Each entry is 3 bytes, for RGB.

      var colours = [];

      for (var i = 0; i < count; i++) { colours.push([st.data[st.pos++], st.data[st.pos++], st.data[st.pos++]]) }

      return colours;

  }

  function parse() {        // read the header. This is the starting point of the decode and async calls parseBlock

      var bitField;

      st.pos += 6;

      gif.width = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);

      gif.height = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);

      bitField = st.data[st.pos++];

      gif.colorRes = (bitField & 0b1110000) >> 4;

      gif.globalColourCount = 1 << ((bitField & 0b111) + 1);

      gif.bgColourIndex = st.data[st.pos++];

      st.pos++;                    // ignoring pixel aspect ratio. if not 0, aspectRatio = (pixelAspectRatio + 15) / 64

      if (bitField & 0b10000000) { gif.globalColourTable = parseColourTable(gif.globalColourCount) } // global colour flag

      setTimeout(parseBlock, 0);

  }

  function parseAppExt() { // get application specific data. Netscape added iterations and terminator. Ignoring that

      st.pos += 1;

      if ('NETSCAPE' === st.getString(8)) { st.pos += 8 }  // ignoring this data. iterations (word) and terminator (byte)

      else {

          st.pos += 3;            // 3 bytes of string usually "2.0" when identifier is NETSCAPE

          st.readSubBlocks();     // unknown app extension

      }

  };

  function parseGCExt() { // get GC data

      var bitField;

      st.pos++;

      bitField = st.data[st.pos++];

      gif.disposalMethod = (bitField & 0b11100) >> 2;

      gif.transparencyGiven = bitField & 0b1 ? true : false; // ignoring bit two that is marked as  userInput???

      gif.delayTime = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);

      gif.transparencyIndex = st.data[st.pos++];

      st.pos++;

  };

  function parseImg() {                           // decodes image data to create the indexed pixel image

      var deinterlace, frame, bitField;

      deinterlace = function (width) {                   // de interlace pixel data if needed

          var lines, fromLine, pass, toline;

          lines = pixelBufSize / width;

          fromLine = 0;

          if (interlacedBufSize !== pixelBufSize) {      // create the buffer if size changed or undefined.

              deinterlaceBuf = new Uint8Array(pixelBufSize);

              interlacedBufSize = pixelBufSize;

          }

          for (pass = 0; pass < 4; pass++) {

              for (toLine = interlaceOffsets[pass]; toLine < lines; toLine += interlaceSteps[pass]) {

                  deinterlaceBuf.set(pixelBuf.subarray(fromLine, fromLine + width), toLine * width);

                  fromLine += width;

              }

          }

      };

      frame = {}

      gif.frames.push(frame);

      frame.disposalMethod = gif.disposalMethod;

      frame.time = gif.length;

      frame.delay = gif.delayTime * 10;

      gif.length += frame.delay;

      if (gif.transparencyGiven) { frame.transparencyIndex = gif.transparencyIndex }

      else { frame.transparencyIndex = undefined }

      frame.leftPos = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);

      frame.topPos = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);

      frame.width = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);

      frame.height = (st.data[st.pos++]) + ((st.data[st.pos++]) << 8);

      bitField = st.data[st.pos++];

      frame.localColourTableFlag = bitField & 0b10000000 ? true : false;

      if (frame.localColourTableFlag) { frame.localColourTable = parseColourTable(1 << ((bitField & 0b111) + 1)) }

      if (pixelBufSize !== frame.width * frame.height) { // create a pixel buffer if not yet created or if current frame size is different from previous

          pixelBuf = new Uint8Array(frame.width * frame.height);

          pixelBufSize = frame.width * frame.height;

      }

      lzwDecode(st.data[st.pos++], st.readSubBlocksB()); // decode the pixels

      if (bitField & 0b1000000) {                        // de interlace if needed

          frame.interlaced = true;

          deinterlace(frame.width);

      } else { frame.interlaced = false }

      processFrame(frame);                               // convert to canvas image

  };

  function processFrame(frame) { // creates a RGBA canvas image from the indexed pixel data.

      var ct, cData, dat, pixCount, ind, useT, i, pixel, pDat, col, frame, ti;

      frame.image = document.createElement('canvas');

      frame.image.width = gif.width;

      frame.image.height = gif.height;

      frame.image.ctx = frame.image.getContext("2d");

      ct = frame.localColourTableFlag ? frame.localColourTable : gif.globalColourTable;

      if (gif.lastFrame === null) { gif.lastFrame = frame }

      useT = (gif.lastFrame.disposalMethod === 2 || gif.lastFrame.disposalMethod === 3) ? true : false;

      if (!useT) { frame.image.ctx.drawImage(gif.lastFrame.image, 0, 0, gif.width, gif.height) }

      cData = frame.image.ctx.getImageData(frame.leftPos, frame.topPos, frame.width, frame.height);

      ti = frame.transparencyIndex;

      dat = cData.data;

      if (frame.interlaced) { pDat = deinterlaceBuf }

      else { pDat = pixelBuf }

      pixCount = pDat.length;

      ind = 0;

      for (i = 0; i < pixCount; i++) {

          pixel = pDat[i];

          col = ct[pixel];

          if (ti !== pixel) {

              dat[ind++] = col[0];

              dat[ind++] = col[1];

              dat[ind++] = col[2];

              dat[ind++] = 255;      // Opaque.

          } else

              if (useT) {

                  dat[ind + 3] = 0; // Transparent.

                  ind += 4;

              } else { ind += 4 }

      }

      frame.image.ctx.putImageData(cData, frame.leftPos, frame.topPos);

      gif.lastFrame = frame;

      if (!gif.waitTillDone && typeof gif.onload === "function") { doOnloadEvent() }// if !waitTillDone the call onload now after first frame is loaded

  };

  // **NOT** for commercial use.

  function finnished() { // called when the load has completed

      gif.loading = false;

      gif.frameCount = gif.frames.length;

      gif.lastFrame = null;

      st = undefined;

      gif.complete = true;

      gif.disposalMethod = undefined;

      gif.transparencyGiven = undefined;

      gif.delayTime = undefined;

      gif.transparencyIndex = undefined;

      gif.waitTillDone = undefined;

      pixelBuf = undefined; // dereference pixel buffer

      deinterlaceBuf = undefined; // dereference interlace buff (may or may not be used);

      pixelBufSize = undefined;

      deinterlaceBuf = undefined;

      gif.currentFrame = 0;

      if (gif.frames.length > 0) { gif.image = gif.frames[0].image }

      doOnloadEvent();

      if (typeof gif.onloadall === "function") {

          (gif.onloadall.bind(gif))({ type: 'loadall', path: [gif] });

      }

      if (gif.playOnLoad) { gif.play() }

  }

  function canceled() { // called if the load has been cancelled

      finnished();

      if (typeof gif.cancelCallback === "function") { (gif.cancelCallback.bind(gif))({ type: 'canceled', path: [gif] }) }

  }

  function parseExt() {              // parse extended blocks

      const blockID = st.data[st.pos++];

      if (blockID === GIF_FILE.GCExt) { parseGCExt() }

      else if (blockID === GIF_FILE.COMMENT) { gif.comment += st.readSubBlocks() }

      else if (blockID === GIF_FILE.APPExt) { parseAppExt() }

      else {

          if (blockID === GIF_FILE.UNKNOWN) { st.pos += 13; } // skip unknow block

          st.readSubBlocks();

      }

  

  }

  function parseBlock() { // parsing the blocks

      if (gif.cancel !== undefined && gif.cancel === true) { canceled(); return }

  

      const blockId = st.data[st.pos++];

      if (blockId === GIF_FILE.IMAGE) { // image block

          parseImg();

          if (gif.firstFrameOnly) { finnished(); return }

      } else if (blockId === GIF_FILE.EOF) { finnished(); return }

      else { parseExt() }

      if (typeof gif.onprogress === "function") {

          gif.onprogress({ bytesRead: st.pos, totalBytes: st.data.length, frame: gif.frames.length });

      }

      setTimeout(parseBlock, 0); // parsing frame async so processes can get some time in.

  };

  function cancelLoad(callback) { // cancels the loading. This will cancel the load before the next frame is decoded

      if (gif.complete) { return false }

      gif.cancelCallback = callback;

      gif.cancel = true;

      return true;

  }

  function error(type) {

      if (typeof gif.onerror === "function") { (gif.onerror.bind(this))({ type: type, path: [this] }) }

      gif.onload = gif.onerror = undefined;

      gif.loading = false;

  }

  function doOnloadEvent() { // fire onload event if set

      gif.currentFrame = 0;

      gif.nextFrameAt = gif.lastFrameAt = new Date().valueOf(); // just sets the time now

      if (typeof gif.onload === "function") { (gif.onload.bind(gif))({ type: 'load', path: [gif] }) }

      gif.onerror = gif.onload = undefined;

  }

  function dataLoaded(data) { // Data loaded create stream and parse

      st = new Stream(data);

      parse();

  }

  function loadGif(filename) { // starts the load

      var ajax = new XMLHttpRequest();

      ajax.responseType = "arraybuffer";

      ajax.onload = function (e) {

          if (e.target.status === 404) { error("File not found") }

          else if (e.target.status >= 200 && e.target.status < 300) { dataLoaded(ajax.response) }

          else { error("Loading error : " + e.target.status) }

      };

      ajax.open('GET', filename, true);

      ajax.send();

      ajax.onerror = function (e) { error("File error") };

      this.src = filename;

      this.loading = true;

  }

  function play() { // starts play if paused

      if (!gif.playing) {

          gif.paused = false;

          gif.playing = true;

          playing();

      }

  }

  function pause() { // stops play

      gif.paused = true;

      gif.playing = false;

      clearTimeout(timerID);

  }

  function togglePlay() {

      if (gif.paused || !gif.playing) { gif.play() }

      else { gif.pause() }

  }

  function seekFrame(frame) { // seeks to frame number.

      clearTimeout(timerID);

      gif.currentFrame = frame % gif.frames.length;

      if (gif.playing) { playing() }

      else { gif.image = gif.frames[gif.currentFrame].image }

  }

  function seek(time) { // time in Seconds  // seek to frame that would be displayed at time

      clearTimeout(timerID);

      if (time < 0) { time = 0 }

      time *= 1000; // in ms

      time %= gif.length;

      var frame = 0;

      while (time > gif.frames[frame].time + gif.frames[frame].delay && frame < gif.frames.length) { frame += 1 }

      gif.currentFrame = frame;

      if (gif.playing) { playing() }

      else { gif.image = gif.frames[gif.currentFrame].image }

  }

  function playing() {

      var delay;

      var frame;

      if (gif.playSpeed === 0) {

          gif.pause();

          return;

      } else {

          if (gif.playSpeed < 0) {

              gif.currentFrame -= 1;

              if (gif.currentFrame < 0) { gif.currentFrame = gif.frames.length - 1 }

              frame = gif.currentFrame;

              frame -= 1;

              if (frame < 0) { frame = gif.frames.length - 1 }

              delay = -gif.frames[frame].delay * 1 / gif.playSpeed;

          } else {

              gif.currentFrame += 1;

              gif.currentFrame %= gif.frames.length;

              delay = gif.frames[gif.currentFrame].delay * 1 / gif.playSpeed;

          }

          gif.image = gif.frames[gif.currentFrame].image;

          timerID = setTimeout(playing, delay);

      }

  }

  var gif = {                      // the gif image object

      onload: null,       // fire on load. Use waitTillDone = true to have load fire at end or false to fire on first frame

      onerror: null,       // fires on error

      onprogress: null,       // fires a load progress event

      onloadall: null,       // event fires when all frames have loaded and gif is ready

      paused: false,      // true if paused

      playing: false,      // true if playing

      waitTillDone: true,       // If true onload will fire when all frames loaded, if false, onload will fire when first frame has loaded

      loading: false,      // true if still loading

      firstFrameOnly: false,      // if true only load the first frame

      width: null,       // width in pixels

      height: null,       // height in pixels

      frames: [],         // array of frames

      comment: "",         // comments if found in file. Note I remember that some gifs have comments per frame if so this will be all comment concatenated

      length: 0,          // gif length in ms (1/1000 second)

      currentFrame: 0,          // current frame.

      frameCount: 0,          // number of frames

      playSpeed: 1,          // play speed 1 normal, 2 twice 0.5 half, -1 reverse etc...

      lastFrame: null,       // temp hold last frame loaded so you can display the gif as it loads

      image: null,       // the current image at the currentFrame

      playOnLoad: true,       // if true starts playback when loaded

      // functions

      load: loadGif,    // call this to load a file

      cancel: cancelLoad, // call to stop loading

      play: play,       // call to start play

      pause: pause,      // call to pause

      seek: seek,       // call to seek to time

      seekFrame: seekFrame,  // call to seek to frame

      togglePlay: togglePlay, // call to toggle play and pause state

  };

  return gif;

}

  

export {

  GIF

}
```
#### 状态机
<center> 
	<img style="border-radius: 0.3125em; box-shadow: 0 2px 4px 0 rgba(34,36,38,.12),0 2px 10px 0 rgba(34,36,38,.08);" src="https://bu.dusays.com/2022/11/03/6363d89220c15.png">
	<br>
	<div style="color:orange; border-bottom: 1px solid #d9d9d9; 
	display: inline-block; 
	color: #999; 
	padding: 2px;">0：静止    1：移动     3：跳跃    4：攻击</div> 
 </center>
