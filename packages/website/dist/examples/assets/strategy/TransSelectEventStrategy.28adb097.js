import"../modulepreload-polyfill.b7f2da20.js";import{M as a,B as i,a as s,P as m,L as d,b as g}from"../three.837c9bb0.js";import{W as l,C as p}from"../index.1d7ad8b9.js";import{P as c}from"../vis-three.plugin-pointer-manager.es.86f17451.js";import{E as f}from"../index.ce95ade9.js";import{O as P}from"../vis-three.plugin-object-helper.es.e2881d5c.js";import{S as u,T as y}from"../index.f4f5b765.js";import{H as S}from"../index.6c1f5960.js";import{T as w}from"../index.012974ca.js";import{d as b}from"../index.7d48aff8.js";import{T as E}from"../index.c670ae85.js";import"../vis-three.convenient.es.83638baf.js";const e=b({plugins:[l({antialias:!0,alpha:!0}),p(),c(),f(),u(),P(),y()],strategy:[E(),S(),w()]}).setDom(document.getElementById("app")).setSize(),t=e.scene,n=new a(new i(10,10,10),new s({color:"rgb(255, 105, 100)"}));n.position.x=10;t.add(n);const r=new m("rgb(255, 255, 255)",1,300,0);r.position.y=15;t.add(r);const L=new d(n.geometry);t.add(L);const o=new g(n.geometry);o.position.x=-10;t.add(o);window.engine=e;e.render();e.addEventListener("selected",h=>{e.render()});e.transformControls.addEventListener("objectChange",()=>{e.render()});
