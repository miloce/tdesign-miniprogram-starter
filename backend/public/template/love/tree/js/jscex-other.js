/*JS:jscex-builderbase.min.js*/
(function(){var j=function(){};j.prototype={Loop:function(b,c,a,d){return{next:function(e,i){var f=function(b){a.next(e,function(a,e){if(a=="normal"||a=="continue")g(b);else if(a=="throw"||a=="return")i(a,e);else if(a=="break")i("normal");else throw Error('Invalid type for "Loop": '+a);})},g=function(a){try{c&&!a&&c.call(e),!b||b.call(e)?f(!1):i("normal")}catch(d){i("throw",d)}};d?f(!0):g(!0)}}},Delay:function(b){return{next:function(c,a){try{b.call(c).next(c,a)}catch(d){a("throw",d)}}}},Combine:function(b,
c){return{next:function(a,d){b.next(a,function(b,i,f){if(b=="normal")try{c.next(a,d)}catch(g){d("throw",g)}else d(b,i,f)})}}},Return:function(b){return{next:function(c,a){a("return",b)}}},Normal:function(){return{next:function(b,c){c("normal")}}},Break:function(){return{next:function(b,c){c("break")}}},Continue:function(){return{next:function(b,c){c("continue")}}},Throw:function(b){return{next:function(c,a){a("throw",b)}}},Try:function(b,c,a){return{next:function(d,e){b.next(d,function(b,f,g){if(b!=
"throw"||!c)a?a.next(d,function(a,c,d){a=="normal"?e(b,f,g):e(a,c,d)}):e(b,f,g);else if(c){var h;try{h=c.call(d,f)}catch(j){a?a.next(d,function(a,b,c){a=="normal"?e("throw",j):e(a,b,c)}):e("throw",j)}h&&h.next(d,function(b,c,f){b=="throw"?a?a.next(d,function(a,d,g){a=="normal"?e(b,c,f):e(a,d,g)}):e(b,c,f):a?a.next(d,function(a,d,g){a=="normal"?e(b,c,f):e(a,d,g)}):e(b,c,f)})}else a.next(d,function(a,c,d){a=="normal"?e(b,f,g):e(a,c,d)})})}}}};var h=function(b){if(!b.modules)b.modules={};if(!b.modules.builderbase)b.modules.builderbase=
!0,b.BuilderBase=j},k=typeof define==="function"&&!define.amd,l=typeof require==="function"&&typeof define==="function"&&define.amd;if(typeof require==="function"&&typeof module!=="undefined"&&module.exports)module.exports.init=h;else if(k)define("jscex-builderbase",function(b,c,a){a.exports.init=h});else if(l)define("jscex-builderbase",function(){return{init:h}});else{if(typeof Jscex==="undefined")throw Error('Missing the root object, please load "jscex" module first.');h(Jscex)}})();


/*JS:jscex-async.min.js*/
(function(){var k=function(){};k.prototype={isCancellation:!0,message:"The task has been cancelled."};typeof __jscex__async__taskIdSeed==="undefined"&&(__jscex__async__taskIdSeed=0);var l=function(b){return typeof b.start==="function"&&typeof b.addEventListener==="function"&&typeof b.removeEventListener==="function"&&typeof b.complete==="function"},j=function(b){if(!b.modules.async){var d=function(){};d.prototype={register:function(a){this.isCancellationRequested&&a();if(!this._handlers)this._handlers=
[];this._handlers.push(a)},unregister:function(a){this._handlers&&(a=this._handlers.indexOf(a),a>=0&&this._handlers.splice(a,1))},cancel:function(){if(!this.isCancellationRequested){this.isCancellationRequested=!0;var a=this._handlers;delete this._handlers;for(var f=0;f<a.length;f++)try{a[f]()}catch(c){b.logger.warn("[WARNING] Cancellation handler threw an error: "+c)}}},throwIfCancellationRequested:function(){if(this.isCancellationRequested)throw new k;}};var e=function(a){this.id=++__jscex__async__taskIdSeed;
this._delegate=a;this._listeners={};this.status="ready"};e.prototype={start:function(){if(this.status!="ready")throw Error('Task can only be started in "ready" status.');this.status="running";this._delegate(this)},complete:function(a,f){if(this.status!="running")throw Error('The "complete" method can only be called in "running" status.');var c=this._listeners;delete this._listeners;if(a=="success")this.result=f,this.status="succeeded",this._notify("success",c.success);else if(a=="failure")this.error=
f,this.status=f.isCancellation?"canceled":"faulted",this._notify("failure",c.failure);else throw Error("Unsupported type: "+a);this._notify("complete",c.complete);this.error&&!c.failure&&!c.complete&&b.logger.warn("[WARNING] An unhandled error occurred: "+this.error)},_notify:function(a,f){if(f)for(var c=0;c<f.length;c++)try{f[c](this)}catch(i){b.logger.warn("[WARNING] The task's "+a+" listener threw an error: "+i)}},addEventListener:function(a,b){this._listeners&&(this._listeners[a]||(this._listeners[a]=
[]),this._listeners[a].push(b))},removeEventListener:function(a,b){if(this._listeners){var c=this._listeners[a];if(c){var i=c.indexOf(b);i>=0&&c.splice(i,1)}}}};e.create=function(a){return new e(a)};e.isTask=l;var h=function(){};h.prototype={Start:function(a,b){return e.create(function(c){b.next(a,function(a,b){if(a=="normal"||a=="return")c.complete("success",b);else if(a=="throw")c.complete("failure",b);else throw Error("Unsupported type: "+a);})})},Bind:function(a,b){return{next:function(c,e){var d=
function(a){if(a.error)e("throw",a.error);else{var d;try{d=b.call(c,a.result)}catch(h){e("throw",h);return}d.next(c,e)}};a.status=="ready"?(a.addEventListener("complete",d),a.start()):a.status=="running"?a.addEventListener("complete",d):d(a)}}}};for(var g in b.BuilderBase.prototype)h.prototype[g]=b.BuilderBase.prototype[g];if(!b.Async)b.Async={};g=b.Async;g.CancellationToken=d;g.CanceledError=k;g.Task=e;g.AsyncBuilder=h;if(!b.builders)b.builders={};b.binders.async="$await";b.builders.async=new h;
b.modules.async=!0}},m=typeof define==="function"&&!define.amd,n=typeof require==="function"&&typeof define==="function"&&define.amd;if(typeof require==="function"&&typeof module!=="undefined"&&module.exports)module.exports.init=function(b){if(!b.modules.builderbase){if(typeof __dirname==="string")try{require.paths.unshift(__dirname)}catch(d){try{module.paths.unshift(__dirname)}catch(e){}}require("jscex-builderbase").init(b)}j(b)};else if(m)define("jscex-async",["jscex-builderbase"],function(b,d,
e){e.exports.init=function(d){d.modules.builderbase||b("jscex-builderbase").init(d);j(d)}});else if(n)define("jscex-async",["jscex-builderbase"],function(b){return{init:function(d){d.modules.builderbase||b.init(d);j(d)}}});else{if(typeof Jscex==="undefined")throw Error('Missing the root object, please load "jscex" module first.');if(!Jscex.modules.builderbase)throw Error('Missing essential components, please initialize "builderbase" module first.');j(Jscex)}})();


/*JS:jscex-async-powerpack.min.js*/
(function(){var m=function(j){if(j.length<=1)return null;for(var f=[],h=1;h<j.length;h++)f.push(j[h]);return f},n=function(j,f){for(var h=[],k=0;k<j.length;k++)h.push(j[k]);for(;h.length<f;)h.push(void 0);return h},l=function(j){if(!j.modules["async-powerpack"]){if(!j.modules.async)throw Error('Missing essential components, please initialize "jscex-async" module first.');var f=j.Async,h=f.Task,k=f.CanceledError;f.sleep=function(a,b){return h.create(function(c){b&&b.isCancellationRequested&&c.complete("failure",
new k);var e,d;b&&(d=function(){clearTimeout(e);c.complete("failure",new k)});e=setTimeout(function(){b&&b.unregister(d);c.complete("success")},a);b&&b.register(d)})};f.onEvent=function(a,b,c){return h.create(function(e){c&&c.isCancellationRequested&&e.complete("failure",new k);var d=function(){a.removeEventListener?a.removeEventListener(b,g):a.removeListener?a.removeListener(b,g):a.detachEvent(b,g)},g,i;c&&(i=function(){d();e.complete("failure",new k)});g=function(a){c&&c.unregister(i);d();e.complete("success",
a)};a.addEventListener?a.addEventListener(b,g):a.addListener?a.addListener(b,g):a.attachEvent(b,g);c&&c.register(i)})};h.whenAll=function(){var a={},b;if(arguments.length==1){var c=arguments[0];h.isTask(c)?(a[0]=c,b=!0):(a=c,b=Object.prototype.toString.call(a)==="[object Array]")}else{for(c=0;c<arguments.length;c++)a[c]=arguments[c];b=!0}return h.create(function(e){var d={},g;for(g in a)if(a.hasOwnProperty(g)){var i=a[g];h.isTask(i)&&(d[i.id]=g)}for(var c in d)i=a[d[c]],i.status=="ready"&&i.start();
for(c in d)if(i=a[d[c]],i.error){e.complete("failure",i.error);return}var f=b?[]:{},j=function(b){if(b.error){for(var c in d)a[d[c]].removeEventListener("complete",j);e.complete("failure",b.error)}else f[d[b.id]]=b.result,delete d[b.id],k--,k==0&&e.complete("success",f)},k=0;for(c in d)g=d[c],i=a[g],i.status=="succeeded"?(f[g]=i.result,delete d[i.id]):(k++,i.addEventListener("complete",j));k==0&&e.complete("success",f)})};h.whenAny=function(){var a={};if(arguments.length==1){var b=arguments[0];h.isTask(b)?
a[0]=b:a=b}else for(b=0;b<arguments.length;b++)a[b]=arguments[b];return h.create(function(b){var e={},d;for(d in a)if(a.hasOwnProperty(d)){var g=a[d];h.isTask(g)&&(e[g.id]=d)}for(var i in e)g=a[e[i]],g.status=="ready"&&g.start();for(i in e)if(d=e[i],g=a[d],g.error||g.status=="succeeded"){b.complete("success",{key:d,task:g});return}var f=function(d){for(var g in e)a[e[g]].removeEventListener("complete",f);b.complete("success",{key:e[d.id],task:d})};for(i in e)a[e[i]].addEventListener("complete",f)})};
if(!f.Jscexify)f.Jscexify={};f=f.Jscexify;f.fromStandard=function(a){var b=m(arguments);return function(){var c=this,e=n(arguments,a.length-1);return h.create(function(d){e.push(function(a,c){if(a)d.complete("failure",a);else if(b){for(var e={},f=0;f<b.length;f++)e[b[f]]=arguments[f+1];return d.complete("success",e)}else d.complete("success",c)});a.apply(c,e)})}};f.fromCallback=function(a){var b=m(arguments);return function(){var c=this,e=n(arguments,a.length-1);return h.create(function(d){e.push(function(a){if(b){for(var c=
{},e=0;e<b.length;e++)c[b[e]]=arguments[e];d.complete("success",c)}else d.complete("success",a)});a.apply(c,e)})}};j.modules["async-powerpack"]=!0}},o=typeof define==="function"&&!define.amd,p=typeof require==="function"&&typeof define==="function"&&define.amd;if(typeof require==="function"&&typeof module!=="undefined"&&module.exports)module.exports.init=l;else if(o)define("jscex-async-powerpack",["jscex-async"],function(j,f,h){h.exports.init=l});else if(p)define("jscex-async-powerpack",["jscex-async"],
function(){return{init:l}});else{if(typeof Jscex==="undefined")throw Error('Missing the root object, please load "jscex" module first.');l(Jscex)}})();

/*JS:love.js*/
(function(window){

    function random(min, max) {
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    function bezier(cp, t) {  
        var p1 = cp[0].mul((1 - t) * (1 - t));
        var p2 = cp[1].mul(2 * t * (1 - t));
        var p3 = cp[2].mul(t * t); 
        return p1.add(p2).add(p3);
    }  

    function inheart(x, y, r) {
        // x^2+(y-(x^2)^(1/3))^2 = 1
        // http://www.wolframalpha.com/input/?i=x%5E2%2B%28y-%28x%5E2%29%5E%281%2F3%29%29%5E2+%3D+1
        var z = ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) * ((x / r) * (x / r) + (y / r) * (y / r) - 1) - (x / r) * (x / r) * (y / r) * (y / r) * (y / r);
        return z < 0;
    }

    function Point(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Point.prototype = {
        clone: function() {
            return new Point(this.x, this.y);
        },
        add: function(o) {
            p = this.clone();
            p.x += o.x;
            p.y += o.y;
            return p;
        },
        sub: function(o) {
            p = this.clone();
            p.x -= o.x;
            p.y -= o.y;
            return p;
        },
        div: function(n) {
            p = this.clone();
            p.x /= n;
            p.y /= n;
            return p;
        },
        mul: function(n) {
            p = this.clone();
            p.x *= n;
            p.y *= n;
            return p;
        }
    }

    function Heart() {
        // x = 16 sin^3 t
        // y = 13 cos t - 5 cos 2t - 2 cos 3t - cos 4t
        // http://www.wolframalpha.com/input/?i=x+%3D+16+sin%5E3+t%2C+y+%3D+(13+cos+t+-+5+cos+2t+-+2+cos+3t+-+cos+4t)
        var points = [], x, y, t;
        for (var i = 10; i < 30; i += 0.2) {
            t = i / Math.PI;
            x = 16 * Math.pow(Math.sin(t), 3);
            y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
            points.push(new Point(x, y));
        }
        this.points = points;
        this.length = points.length;
    }
    Heart.prototype = {
        get: function(i, scale) {
            return this.points[i].mul(scale || 1);
        }
    }

    function Seed(tree, point, scale, color) { 
        // console.log(point);
        this.tree = tree;

        var scale = scale || 1
        var color = color || '#FF0000';

        this.heart = {
            point  : point,
            scale  : scale,
            color  : color,
            figure : new Heart(), //新建一个heart
        }

        this.cirle = {
            point  : point,
            scale  : scale,
            color  : color,
            radius : 5,
        }
    }
    Seed.prototype = {
        draw: function() {
            this.drawHeart();
            this.drawText();
        },
        addPosition: function(x, y) {
            this.cirle.point = this.cirle.point.add(new Point(x, y));
        },
        canMove: function() {
            return this.cirle.point.y < (this.tree.height + 20); 
        },
        move: function(x, y) {
            this.clear();
            this.drawCirle();
            this.addPosition(x, y);
        },
        canScale: function() {
            return this.heart.scale > 0.2; //判断心是不是小于0.2了
        },
        setHeartScale: function(scale) {
            this.heart.scale *= scale;
        },
        scale: function(scale) {
            this.clear();
            this.drawCirle();
            this.drawHeart();
            this.setHeartScale(scale);
        },
        drawHeart: function() {
            var ctx = this.tree.ctx, heart = this.heart;
            var point = heart.point, color = heart.color, 
                scale = heart.scale;
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < heart.figure.length; i++) {
                var p = heart.figure.get(i, scale);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawCirle: function() {
            var ctx = this.tree.ctx, cirle = this.cirle;
            var point = cirle.point, color = cirle.color, 
                scale = cirle.scale, radius = cirle.radius;
            ctx.save();
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.beginPath();
            ctx.moveTo(0, 0);
    	    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        drawText: function() {
            var ctx = this.tree.ctx, heart = this.heart;
            var point = heart.point, color = heart.color, 
                scale = heart.scale;
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            ctx.translate(point.x, point.y);
            ctx.scale(scale, scale);
            ctx.moveTo(0, 0);
    	    ctx.lineTo(15, 15);
    	    ctx.lineTo(60, 15);
            ctx.stroke();

            ctx.moveTo(0, 0);
            ctx.scale(0.75, 0.75);
            ctx.font = "12px 微软雅黑,Verdana"; // 字号肿么没有用? (ˉ(∞)ˉ)
            ctx.fillText("点这里", 23, 10);
            ctx.restore();
        },
        clear: function() {
            var ctx = this.tree.ctx, cirle = this.cirle;
            var point = cirle.point, scale = cirle.scale, radius = 26;
            var w = h = (radius * scale);
            ctx.clearRect(point.x - w, point.y - h, 4 * w, 4 * h);
        },
        hover: function(x, y) {
            var ctx = this.tree.ctx;
            var pixel = ctx.getImageData(x, y, 1, 1);
            // console.log(pixel.data); //返回鼠标位置对应的RGBA值，只看是不是移到了心之上
            return pixel.data[3] == 255;
        }
    }

    function Footer(tree, width, height, speed) {
        this.tree = tree;
        this.point = new Point(tree.seed.heart.point.x, tree.height - height / 2);
        this.width = width;
        this.height = height;
        this.speed = speed || 2;
        this.length = 0;
    }
    Footer.prototype = {
        draw: function() {
            var ctx = this.tree.ctx, point = this.point;
            var len = this.length / 2;

            ctx.save();
            ctx.strokeStyle = 'rgb(35, 31, 32)';
            ctx.lineWidth = this.height;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.translate(point.x, point.y);
            ctx.beginPath();
            ctx.moveTo(0, 0);
    	    ctx.lineTo(len, 0);
    	    ctx.lineTo(-len, 0);
            ctx.stroke();
            ctx.restore();

            if (this.length < this.width) {
                this.length += this.speed;
            }
        }
    }

    function Tree(canvas, width, height, opt) { //把画布对象、宽高、属性传进来
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = width;
        this.height = height;
        this.opt = opt || {};

        this.record = {};
        
        this.initSeed();
        this.initFooter();
        this.initBranch();
        this.initBloom();
    }
    Tree.prototype = {
        initSeed: function() {
            // console.log(this);
            var seed = this.opt.seed || {};
            var x = seed.x || this.width / 2;
            var y = seed.y || this.height / 2; //如果没有传进y，就用画布的一半
            var point = new Point(x, y); //新建一个point
            var color = seed.color || '#FF0000'; //
            var scale = seed.scale || 1;

            this.seed = new Seed(this, point, scale, color); //实例化Seed，传入位置大小颜色
        },

        initFooter: function() {
            var footer = this.opt.footer || {}; //取得传入的宽高和速度
            var width = footer.width || this.width;
            var height = footer.height || 5;
            var speed = footer.speed || 2;
            this.footer = new Footer(this, width, height, speed);
        },

        initBranch: function() {
            var branchs = this.opt.branch || [];
            // console.log(branchs);
            this.branchs = []; //初始化树的树干为一个空数组
            this.addBranchs(branchs);
        },

        initBloom: function() {
            var bloom = this.opt.bloom || {};
            var cache = [],
                num = bloom.num || 500, 
                width = bloom.width || this.width,
                height = bloom.height || this.height,
                figure = this.seed.heart.figure;
            var r = 210, x, y;
            for (var i = 0; i < num; i++) { //做700个心，传入宽高，r是210，心形，然后存入cache
                cache.push(this.createBloom(width, height, r, figure));
            }
            this.blooms = []; //初始化一个bloom属性
            this.bloomsCache = cache; //初始化一个bloomsCache，值为700个心
        },

        toDataURL: function(type) {
            return this.canvas.toDataURL(type);
        },

        draw: function(k) {
            var s = this, ctx = s.ctx;
            var rec = s.record[k];
            if (!rec) {
                return ;
            }
            var point = rec.point,
                image = rec.image;

            ctx.save();
            ctx.putImageData(image, point.x, point.y);
        	ctx.restore();
        },

        addBranch: function(branch) {
        	this.branchs.push(branch);
            // console.log(this.branchs);
        },

        addBranchs: function(branchs){
            // console.log(branchs);
            var s = this, b, p1, p2, p3, r, l, c;
        	for (var i = 0; i < branchs.length; i++) {
                b = branchs[i]; //把第1层级的唯一取出来
                //把第2层级下的9个取出来
                // console.log(b[0]+'---'+b[1]);
                // console.log(b[2]+'---'+b[3]);
                // console.log(b[4]+'---'+b[5]);
                // console.log(b[6]);
                // console.log(b[7]);
                // console.log(b[8]); //c取得的是第3层级
                p1 = new Point(b[0], b[1]); 
                p2 = new Point(b[2], b[3]); 
                p3 = new Point(b[4], b[5]); 
                r = b[6]; 
                l = b[7]; 
                c = b[8]; 
                s.addBranch(new Branch(s, p1, p2, p3, r, l, c)); 
            }
        },

        removeBranch: function(branch) {
            var branchs = this.branchs;
        	for (var i = 0; i < branchs.length; i++) {
        		if (branchs[i] === branch) {
        			branchs.splice(i, 1);
                }
            }
        },

        canGrow: function() {
            return !!this.branchs.length;
        },
        grow: function() {
            var branchs = this.branchs;
    	    for (var i = 0; i < branchs.length; i++) {
                var branch = branchs[i];
                if (branch) {
                    branch.grow();
                }
            }
        },

        addBloom: function (bloom) {
            this.blooms.push(bloom);
        },

        removeBloom: function (bloom) {
            var blooms = this.blooms;
            for (var i = 0; i < blooms.length; i++) {
                if (blooms[i] === bloom) {
                    blooms.splice(i, 1);
                }
            }
        },

        //传入opt中bloom的宽高，r为210，心形
        createBloom: function(width, height, radius, figure, color, alpha, angle, scale, place, speed) {
            var x, y;
            while (true) {
                x = random(20, width - 20);
                y = random(20, height - 20);
                if (inheart(x - width / 2, height - (height - 40) / 2 - y, radius)) {                
                    return new Bloom(this, new Point(x, y), figure, color, alpha, angle, scale, place, speed);
                }
            }
        },
        
        canFlower: function() {
            return !!this.blooms.length;
        }, 
        flower: function(num) {
            var s = this, blooms = s.bloomsCache.splice(0, num);
            for (var i = 0; i < blooms.length; i++) {
                s.addBloom(blooms[i]);
            }
            blooms = s.blooms;
            for (var j = 0; j < blooms.length; j++) {
                blooms[j].flower();
            }
        },

        snapshot: function(k, x, y, width, height) {
            var ctx = this.ctx;
            var image = ctx.getImageData(x, y, width, height); 
            this.record[k] = {
                image: image,
                point: new Point(x, y),
                width: width,
                height: height
            }
        },
        setSpeed: function(k, speed) {
            this.record[k || "move"].speed = speed;
        },
        move: function(k, x, y) {
            var s = this, ctx = s.ctx;
            var rec = s.record[k || "move"];
            var point = rec.point,
                image = rec.image,
                // speed = rec.speed || 10,
                speed = 2,
                width = rec.width,
                height = rec.height; 

            i = point.x + speed < x ? point.x + speed : x;
            j = point.y + speed < y ? point.y + speed : y; 

            ctx.save();
            ctx.clearRect(point.x, point.y, width, height);
            ctx.putImageData(image, i, j);
        	ctx.restore();

            rec.point = new Point(i, j);
            rec.speed = speed * 0.95;

            if (rec.speed < 2) {
                rec.speed = 2;
            }
            return i < x || j < y;
        },

        jump: function() {
            var s = this, blooms = s.blooms;
            if (blooms.length) {
                for (var i = 0; i < blooms.length; i++) {
                    blooms[i].jump();
                }
            } 
            if ((blooms.length && blooms.length < 7) || !blooms.length) {
                var bloom = this.opt.bloom || {},
                    width = bloom.width || this.width,
                    height = bloom.height || this.height,
                    figure = this.seed.heart.figure;
                var r = 210, x, y;
                for (var i = 0; i < random(1,2); i++) {
                    blooms.push(this.createBloom(width / 2 + width, height, r, figure, null, 1, null, 1, new Point(random(0,680), 815), random(200,300)));
                }
            }
        }
    }

    function Branch(tree, point1, point2, point3, radius, length, branchs) {
        // console.log(this);
        this.tree = tree;
        this.point1 = point1;
        this.point2 = point2;
        this.point3 = point3;
        this.radius = radius;
        this.length = length || 100;    
        this.len = 0;
        this.t = 1 / (this.length - 1);   
        this.branchs = branchs || [];
    }

    Branch.prototype = {
        grow: function() {
            var s = this, p; 
            if (s.len <= s.length) {
                p = bezier([s.point1, s.point2, s.point3], s.len * s.t);
                s.draw(p);
                s.len += 1;
                s.radius *= 0.97;
            } else {
                s.tree.removeBranch(s);
                s.tree.addBranchs(s.branchs);
            }
        },
        draw: function(p) {
            var s = this;
            var ctx = s.tree.ctx;
            ctx.save();
        	ctx.beginPath();
        	ctx.fillStyle = 'rgb(35, 31, 32)';
            ctx.shadowColor = 'rgb(35, 31, 32)';
            ctx.shadowBlur = 2;
        	ctx.moveTo(p.x, p.y);
        	ctx.arc(p.x, p.y, s.radius, 0, 2 * Math.PI);
        	ctx.closePath();
        	ctx.fill();
        	ctx.restore();
        }
    }

    function Bloom(tree, point, figure, color, alpha, angle, scale, place, speed) {
        this.tree = tree;
        this.point = point;
        this.color = color || 'rgb(255,' + random(0, 255) + ',' + random(0, 255) + ')';
        this.alpha = alpha || random(0.3, 1);
        this.angle = angle || random(0, 360);
        this.scale = scale || 0.1;
        this.place = place;
        this.speed = speed;

        this.figure = figure;
    }
    Bloom.prototype = {
        setFigure: function(figure) {
            this.figure = figure;
        },
        flower: function() {
            var s = this;
            s.draw();
            s.scale += 0.1;
            if (s.scale > 1) {
                s.tree.removeBloom(s);
            }
        },
        draw: function() {
            var s = this, ctx = s.tree.ctx, figure = s.figure;

            ctx.save();
            ctx.fillStyle = s.color;
            ctx.globalAlpha = s.alpha;
            ctx.translate(s.point.x, s.point.y);
            ctx.scale(s.scale, s.scale);
            ctx.rotate(s.angle);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            for (var i = 0; i < figure.length; i++) {
                var p = figure.get(i);
                ctx.lineTo(p.x, -p.y);
            }
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        },
        jump: function() {
            var s = this, height = s.tree.height;            

            if (s.point.x < 0 || s.point.y > height-1) {
                s.tree.removeBloom(s);
            } else {
                s.draw();
                // console.log(s.place);
                s.point = s.place.sub(s.point).div(s.speed).add(s.point);
                s.angle += 0.05;
                s.speed -= 1;
            }
        }
    }

    window.random = random; //random是个普通函数
    window.bezier = bezier; //bezier是个普通函数
    window.Point = Point; //Point本身是个构造函数，是个类
    window.Tree = Tree; //Tree本身是个构造函数，是个类

})(window); 
//这以上整体是个匿名闭包函数，直接执行。
//执行的时候，把window传进去
