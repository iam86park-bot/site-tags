/* 네이버 애널리틱스 + 구매 전환 — 스테아핀 (사이트 ID 88045255c92640). */
(function(){
  if (window.__nwa_loaded) return; window.__nwa_loaded=1;
  var s=document.createElement("script"); s.async=1; s.src="https://wcs.naver.net/wcslog.js";
  s.onload=function(){
    if(!window.wcs_add) window.wcs_add={};
    wcs_add["wa"]="88045255c92640";
    if(!window._nasa) window._nasa={};
    var d=window.EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA;
    if(/\/order\/order_result\.html/.test(location.pathname) && d && d.order_id){
      _nasa["cnv"]=wcs.cnv("1",String(Math.round(Number(d.payed_amount||d.total_order_price||0))));
    }
    if(window.wcs){ wcs.inflow && wcs.inflow("stheaphin.com"); wcs_do(_nasa); }
  };
  document.head.appendChild(s);
})();
