import{S as q,i as c,a as v}from"./assets/vendor-527658dd.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const B=document.querySelector(".form"),d=document.querySelector(".gallery-grid"),f=document.querySelector(".loader"),g=document.querySelector(".js-load-more-btn");let M=new q(".gallery-grid a",{captionsData:"alt"});B.addEventListener("submit",P);g.addEventListener("click",$);let l=1,u,h=0;async function P(i){var o;if(i.preventDefault(),p(),d.innerHTML="",u=i.target.elements.query.value.trim(),y(),!u){d.innerHTML="",c.error({message:"Search field is empty",position:"topRight"}),a();return}try{l=1;const e=await b();if((o=e==null?void 0:e.hits)!=null&&o.length){a(),h=Math.ceil(e.totalHits/15),m(),L(e.hits);return}throw Error("Sorry, there are no images matching your search query. Please try again!")}catch(e){c.info({message:typeof e=="string"?e:"Something went wrong, sorry!",position:"topRight"})}finally{a()}i.target.reset()}async function $(i){var o;y(),p();try{l+=1;const e=await b();if((o=e==null?void 0:e.hits)!=null&&o.length){a(),m(),L(e.hits);const s=document.querySelector(".gallery-card").getBoundingClientRect().height;scrollBy({top:s*2,behavior:"smooth"});return}throw Error("Sorry, there are no images matching your search query. Please try again!")}catch(e){c.info({message:typeof e=="string"?e:"Something went wrong, sorry!",position:"topRight"})}i.target.reset()}function m(){h!==l?H():(p(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}function y(){f.style.display="inline-block"}function a(){f.style.display="none"}function H(){g.classList.remove("hidden")}function p(){g.classList.add("hidden")}async function b(){return(await v.get("https://pixabay.com/api/",{params:{key:"42157668-d969611c6fdd34526589fe987",q:u,image_type:"photo",orientation:"horizontal",safeSearch:!0,page:l,per_page:15}})).data}function L(i){const o=i.map(({webformatURL:e,largeImageURL:s,tags:t,likes:r,views:n,comments:S,downloads:w})=>`<a href="${s}" class="gallery-card">
      <img src="${e}" alt="${t}" >
      <div class="img-details-box">
      <p class="detail-item"><b>Likes:</b> ${r}</p>
      <p class="detail-item"><b>Views:</b> ${n}</p>
      <p class="detail-item"><b>Comments:</b> ${S}</p>
      <p class="detail-item"><b>Downloads:</b> ${w}</p></div>
      </a>`).join("");d.insertAdjacentHTML("beforeend",o),M.refresh()}
//# sourceMappingURL=commonHelpers.js.map
