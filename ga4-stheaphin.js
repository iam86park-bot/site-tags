/* GA4 — 스테아핀. 페이지 조회 + 카페24 주문완료 페이지 구매(purchase) 이벤트. */
(function(){
  var ID="G-6QLBKM2YQ0";
  if (window.__ga4_loaded) return; window.__ga4_loaded=1;
  var s=document.createElement("script"); s.async=1; s.src="https://www.googletagmanager.com/gtag/js?id="+ID;
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){dataLayer.push(arguments);};
  gtag("js",new Date()); gtag("config",ID);
  function purchase(){
    var d=window.EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA;
    if(!d||!d.order_id) return false;
    var key="ga4_tx_"+d.order_id;
    try{ if(localStorage.getItem(key)) return true; localStorage.setItem(key,"1"); }catch(e){}
    var items=(d.order_product||[]).map(function(p){return {item_id:String(p.product_no||p.product_code||""),item_name:p.product_name,price:Number(p.product_price||0),quantity:Number(p.quantity||1)};});
    gtag("event","purchase",{transaction_id:String(d.order_id),value:Number(d.payed_amount||d.total_order_price||0),currency:"KRW",items:items});
    return true;
  }
  if (/\/order\/order_result\.html/.test(location.pathname)) {
    var n=0,t=setInterval(function(){ if(purchase()||++n>20) clearInterval(t); },500);
  }
})();
