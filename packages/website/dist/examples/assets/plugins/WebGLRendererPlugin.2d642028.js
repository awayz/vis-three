import"../modulepreload-polyfill.b7f2da20.js";import{o as l,M as g,B as h,a as p,P as u,L as k,b as w}from"../three.837c9bb0.js";import{W as y,C as S}from"../index.1d7ad8b9.js";import{d as E}from"../index.7d48aff8.js";const e=E({plugins:[y({antialias:!0,alpha:!0}),S()]}).setDom(document.getElementById("app")).setSize(),n=e.scene;n.background=new l("black");const t=new g(new h(10,10,10),new p({color:"rgb(255, 105, 100)"}));t.position.x=10;n.add(t);const i=new u("rgb(255, 255, 255)",1,300,0);i.position.y=30;n.add(i);const b=new k(t.geometry);n.add(b);const a=new w(t.geometry);a.position.x=-10;n.add(a);e.render();async function o(c,r,d){const m=await e.getScreenshot({width:r,height:d}),s=document.createElement("a");s.download=c+new Date().getTime(),s.href=m,s.click(),e.render()}document.getElementById("screenShot").onclick=()=>{o("vis-three")};document.getElementById("screenShot4k").onclick=async()=>{o("vis-three-4k",4096,2160)};document.getElementById("screenShot8k").onclick=async()=>{o("vis-three-8k",7680,4320)};document.getElementById("screenShot12k").onclick=async()=>{o("vis-three-12k",12288,6480)};window.addEventListener("resize",()=>{e.setSize()});
