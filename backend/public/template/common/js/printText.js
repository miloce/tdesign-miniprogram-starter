(function () {
    
    //接收主页面推送的新 views
    window.addEventListener("message", (event) => {
        console.log("接收主页面推送的新 views");
        if (event.data?.type === "updateViews") {
            const newViews = event.data.views;
    
            // 更新 dataInfo.views
            dataInfo.views = newViews;
            localStorage.setItem("templateDate", JSON.stringify(dataInfo));
            //info.text = info.text.replaceAll("[DJS:VIEWS]", newViews);
            document.getElementById("text-source").innerText = document.getElementById("text-source").innerText.replaceAll("[VIEWS]", newViews);
            console.log("iframe 已同步最新 views:", newViews);
        }
    });

    // 样式只注入一次
    const STYLE_ID = "tb-style-v1";
    const info = dataInfo?.plugin?.printText;
    if (!info || typeof info !== "object") return;

    // ✅ 如果 text-source 已存在，则跳过样式和 div 创建
    const hasTextSource = document.getElementById("text-source");
    if (!hasTextSource) {
        console.log("注入样式");
        // 注入样式
        if (!document.getElementById(STYLE_ID)) {
            const style = document.createElement("style");
            style.id = STYLE_ID;
            style.textContent = `.text-box{display:none;position:absolute;top:0;left:0;color:#FFF;z-index:999999;padding:${info.padding};width:auto;}#text-source{display:none;}#text-view{white-space:pre-line;height:90vh;overflow:auto;--print-ico:"💕";}@keyframes text-flicker{0%{opacity:0}49%{opacity:0}50%{opacity:1}}.cur-end{animation:text-flicker .8s infinite;}.print-init:after{content:"";}.print-ing:after{content:var(--print-ico);}.print-end:after{content:var(--print-ico);animation:text-flicker .8s infinite;}`;
            document.head.appendChild(style);
        }

        // 创建 HTML 结构
        const box = document.createElement("div");
        box.className = "text-box";
        box.innerHTML = `
            <div id="text-source"></div>
            <div id="text-view" class="print-init"></div>
        `;
        document.body.appendChild(box);
    }else{
        console.log("NO注入样式");
    }

    // 写入源文本（保留 <br> 字面量）
    //info.text = info.text.replaceAll("[DJS:VIEWS]", dataInfo.views)
    info.text = formatCountdownText(info.text);
    document.getElementById("text-source").innerText = info.text.replaceAll("\r\n", "<br>");
    let text = document.getElementById("text-source").textContent;

    // 如果自动打印，显示容器
    const box = document.querySelector(".text-box");
    if (text || (info.autoPrint && text)) box.style.display = "block";

    // 设置文字样式
    const textView = document.getElementById("text-view");
    textView.style.fontSize = info.fontSize;
    textView.style.lineHeight = info.lineHeight;
    textView.style.color = info.color;

    // 设置图标 ✅ 核心修复：直接给textView设置变量，而非找.print-ing类
    console.log("dataInfo.printIcon:" + dataInfo.printIcon);
    if (typeof dataInfo.printIcon !== "undefined") {
        // 直接操作textView（#text-view），它是固定存在的
        textView.style.setProperty(
            "--print-ico",
            `"${dataInfo.printIcon ? dataInfo.printIcon : "❤️"}"`
        );
    }

    // 状态
    let index = 0;
    let text2 = "";

    // 代理对检测（增补平面字符）
    function isSurrogatePair(str, i) {
        const hi = str.charCodeAt(i);
        const lo = str.charCodeAt(i + 1);
        return hi >= 0xD800 && hi <= 0xDBFF && lo >= 0xDC00 && lo <= 0xDFFF;
    }

    // 速度计算
    var fontSpeed = 140;
    if (dataInfo.fontSpeed > 1) {
        fontSpeed = (fontSpeed / dataInfo.fontSpeed) * (2 - dataInfo.fontSpeed);
    } else if (dataInfo.fontSpeed < 1) {
        fontSpeed = fontSpeed + fontSpeed * (1 - dataInfo.fontSpeed) * 3;
    }
    fontSpeed = Math.max(0, Math.round(fontSpeed));

    console.log(
        "fontSize：" + textView.style.fontSize +
        "\nfontSpeed：" + fontSpeed +
        "\nfontColor：" + textView.style.color
    );

    // 打字函数
    function printText(text_source_id = "text-source", text_view_id = "text-view") {
        const text = document.getElementById(text_source_id).textContent;
        const textView = document.getElementById(text_view_id);

        // 新增：开始打字时切换为print-ing，移除初始/结束样式
        textView.classList.remove("print-init", "print-end");
        textView.classList.add("print-ing");

        if (dataInfo.txtType == 1) {
            textView.textContent = text.replaceAll("<br>", "\r\n");
            textView.classList.remove("print-ing");
            textView.classList.add("print-end");
            return;
        }

        if (index < text.length) {
            const n4 = text.substr(index, 4);
            if (n4 === "<br>") {
                text2 += "\r\n";
                index += 4;
            } else if (isSurrogatePair(text, index)) {
                text2 += text.substr(index, 2);
                index += 2;
            } else {
                text2 += text.charAt(index);
                index += 1;
            }

            textView.textContent = text2;
            setTimeout(printText, fontSpeed);
        } else {
            textView.classList.remove("print-ing");
            textView.classList.add("print-end");
            const parentDoc = window.parent && window.parent.document;
        }
    }
    
    /**
     * 格式化倒计时文本：替换[DJS:YYYYMMDD]为"X天X小时X分钟"（自动移除0值单位）
     * @param {string} text - 包含倒计时占位符的原始文本
     * @returns {string} 替换后的文本
     */
    function formatCountdownText(text) {
      // 正则匹配 [DJS:8位日期] 格式，捕获日期字符串
      const countdownRegex = /\[DJS:(\d{8})\]/g;

      return text.replace(countdownRegex, (match, dateStr) => {
        // 解析日期字符串（YYYYMMDD → 年/月/日）
        const year = parseInt(dateStr.slice(0, 4));
        const month = parseInt(dateStr.slice(4, 6)) - 1; // Date月份是0-11，需减1
        const day = parseInt(dateStr.slice(6, 8));

        // 创建目标日期（当天00:00:00）
        const targetDate = new Date(year, month, day);
        const now = new Date(); // 当前时间

        // 容错处理：日期无效或已过期
        if (isNaN(targetDate.getTime()) || targetDate <= now) {
          return "0天0小时0分钟";
        }

        // 计算时间差（毫秒）
        const diffMs = targetDate - now;

        // 转换为天、时、分（向下取整，忽略秒数）
        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        // ✅ 核心修改：收集非0的时间片段，自动过滤0值单位
        const timeSegments = [];
        if (days > 0) {
          timeSegments.push(`${days}天`);
        }
        if (hours > 0) {
          timeSegments.push(`${hours}小时`);
        }
        if (minutes > 0) {
          timeSegments.push(`${minutes}分钟`);
        }

        // 拼接非0时间片段（确保至少返回一个有效值，理论上不会触发空数组）
        return timeSegments.join("") || "0分钟";
      });
    }

    // 暴露全局调用
    window.printText = printText;

    // 自动执行
    if (info.autoPrint) {
        printText();
    }
})();