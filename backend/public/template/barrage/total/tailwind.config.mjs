<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title></title>
	<link rel="stylesheet" href="/template/css/main.css?v1005">
	<link rel="stylesheet" href="//at.alicdn.com/t/c/font_3300257_wbsl9bthm4.css">
</head>
<body>
<div id="container">
	<iframe id="myframe" class="iframe-div" loading="lazy" width="100%" src="" style="width:100%;height:100vh;border:0;display:block;" sandbox="allow-scripts allow-same-origin allow-popups" referrerpolicy="no-referrer" ></iframe>
    
    <a id="moreLink" href="#">更多</a>
	<a id="makeLink" href="#">制作</a>

    <div id="musicBtn" style="display:block;">
		<img class="roll" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAQAAAC0jZKKAAAELElEQVRIx72X7UtbdxTHP/femCVprVm2dI4MMZpEUDqYMKJtHG6zCsJ84QZb90KRFTryeuk/kb2WFQpWC7Ww1kKhGwuOleqqebFS5xBifKISdKazUbs8iDd3L3LVqPfmoWw7eZN7zu9+cu7J73fu9wgUMcVNIw04sGMC0sSJEWFOiBa+TyiI7KRNtmhHpSQThPTxOmClmX7ZWexpQFpmWHhSIlipwy979q9WUlM7j3dm0wu7iSxYRZfxnOl8ZWtlrfkAPs+gsFQUrLQSkA0AqexYfDAeTmvn6jX57b12swgg7REUpgqClc/kvty30Y1AbF0uXIhqKei4dFbNe0S4owtW+uVPAdYyA4vjyeIVBuiwDNW//RqAdFcY1gTvZzu91bO4mS0NC2AT79e3VB3PWjysbQ4b2myPloOFzWx7NLQJIPcprcfASh2BXLbdS3u6iO8//M6r5d+je2l6C4CAUnc0Y79sgLVMz2Kh3Gps772jF+tZXMuAbMCfB1aac/t2oEhtE0lPjX5BBhYBZI/SfJhxP8DoRrGdsJqwWt8y6kXHk6MbhzQRFLfshFQ2EKOIbWfg0Zf68UAslQXZqbhzGXcCjMWLHQcwCOBxhrr14uvyWBxyRBFoAxiMF8MCyHtw0Xv/ol5cpbSBqLhlC6yk9HpCvjmqbox/PbSy+olPe9tBOL2SAtmiuEUaAaZ2SsnXVLGdubbivH7v0ZXu3mod9DYAjSINAFMvSypE1lIB0Pvz3MLty9prfv0bgAYRB8DvqVLAh9Z0s6LiqkcropIcInaAhd3ywBBZ+uq8ll8l2UVMAImy2g5AeMFo0PKrJJNYFi3PnidfFPzDRdIA1rJ/oMoU39byq6S0SBzAZSyDCUB15R/rWn6VFBeJAbxrLoMJgNl4LaLlV0kxkQjAhVPlYa96Esl5zV6okiIicwDeM6XgXiTNBoDTUofr+qz2GpU0ZxCiSlK21Jq9Jv1u0WLtc9e8/izhsoefAZySbsz8qNm0vKZaM0hJIWoAJugCvz28qo0d/eDzjwT1bT7yFODP3Vs6vdtvB2Ai1zZDAL32aklr6YOuLz4WDkRCZUWhUlVLvTlwCEQQotIymMWg4+TSK7XdRw7ub5uFwEGHWQRpWYjuv/OGAS6d7TghWS+/n3/1+Okvf+lj2y2q3BoGFSw8keYBhuptx05gKLKb2f9Mz1y4p4+1iTfrAaT5nKxVq6fU8a1sgOktXxGlrmeT7pYqkPb4Jidp1QyFJYIALVU/1L0K9oEzp94I7ivlg0cXpqQRgE7bQ5etrJZkEx+6ut4AkEYOVXIeQrgj3QXwWWea2i2lYtstM00+K4A0lq+Q/z3hfUu4nR/7v0YFODnchLcnX86mF3afy/Cm5DKeM/lOe8+UPdyo8P9iHDuAu+nCV2CAnOSnsgfII/hXGnn/AachjVCELR1AAAAAAElFTkSuQmCC">
        <audio id="music" src="" loop="loop"></audio>
	</div>
</div>      

<script src="/template/common/js/jquery-2.1.1.min.js"></script>
<script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.3.2.js"></script>
<script src="/template/js/mp.js?v1500"></script>
<script src="/template/js/main.js?v1505"></script>
<script src="/template/js/script.js?v1500"></script>
<script>
    
    var nowurl = window.location.href;
    let host = window.location.hostname;
    
    var _hmt = _hmt || []; (function() {
    var tid = "29ed580a9fc7e9d0b473275c95038792";//we
    if(!host.startsWith('wechat.3') && !host.startsWith('60')){
        if(nid && nid.length < 6){
            tid = "d81bfb1df3f5cf849885666dc86e89b9";//data
        }else{
            tid = "158369ef91661a5a4ec934bd36cc871b";//user
        }
    }
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?" + tid;
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();
</script>
</body>
</html>
