/* Meta Pixel 951602644571388 - PageView, ViewContent, AddToCart, InitiateCheckout, Purchase */
(function(){
  var PID="951602644571388";
  if (window.__mp_sth) return; window.__mp_sth=1;
  if (!window.fbq) {
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  }
  fbq("init", PID);
  function ev(name, data, opt){ try{ fbq("trackSingle", PID, name, data||{}, opt||{}); }catch(e){} }
  ev("PageView");
  var path=location.pathname;
  function productNo(){
    if (window.iProductNo) return String(window.iProductNo);
    var m=location.search.match(/product_no=(\d+)/) || path.match(/\/product\/[^\/]*\/(\d+)\//) || path.match(/\/(\d+)\/category\//);
    return m?m[1]:"";
  }
  var pn=(/\/product\/(detail\.html|[^\/]+\/\d+\/)/.test(path) || /product_no=/.test(location.search)) ? productNo() : "";
  if (pn) {
    ev("ViewContent", {content_ids: pn?[pn]:[], content_type:"product", currency:"KRW"});
    document.addEventListener("click", function(e){
      var el=e.target && e.target.closest ? e.target.closest("a,button,input,span,div") : null;
      for (var i=0; el && i<4; i++, el=el.parentElement) {
        var oc=(el.getAttribute && el.getAttribute("onclick"))||"", txt=(el.textContent||el.value||"").replace(/\s/g,"");
        if (/product_submit\(\s*2/.test(oc) || /장바구니/.test(txt) && txt.length<12 || /actionCart|btnBasket/i.test(el.id+" "+el.className)) {
          ev("AddToCart", {content_ids: pn?[pn]:[], content_type:"product", currency:"KRW"}); return;
        }
      }
    }, true);
  }
  if (/\/order\/orderform\.html/.test(path)) ev("InitiateCheckout", {currency:"KRW"});
  function purchase(){
    var d=window.EC_FRONT_EXTERNAL_SCRIPT_VARIABLE_DATA;
    if(!d||!d.order_id) return false;
    var key="mp_sth_tx_"+d.order_id;
    try{ if(localStorage.getItem(key)) return true; localStorage.setItem(key,"1"); }catch(e){}
    var ids=(d.order_product||[]).map(function(p){return String(p.product_no||p.product_code||"");});
    ev("Purchase", {value:Number(d.payed_amount||d.total_order_price||0), currency:"KRW", content_ids:ids, content_type:"product",
                    num_items:(d.order_product||[]).reduce(function(a,p){return a+Number(p.quantity||1);},0)},
       {eventID:"order_"+d.order_id});
    return true;
  }
  if (/\/order\/order_result\.html/.test(path)) {
    var n=0,t=setInterval(function(){ if(purchase()||++n>20) clearInterval(t); },500);
  }
})();
