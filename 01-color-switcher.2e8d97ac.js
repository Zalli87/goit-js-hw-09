const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]")};let e=null;t.startBtn.addEventListener("click",(function(){t.startBtn.disabled=!0,t.stopBtn.disabled=!1,e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.stopBtn.addEventListener("click",(function(){t.stopBtn.disabled=!0,t.startBtn.disabled=!1,clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.2e8d97ac.js.map
