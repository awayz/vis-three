import{t as o}from"./index.7d48aff8.js";import{a as s}from"./vis-three.plugin-object-helper.es.e2881d5c.js";import{b as a}from"./index.f4f5b765.js";const n="@vis-three/strategy-transform-controls-helper-filter",c=o(n),O=function(){return{name:c,condition:[a,s],exec(r){const t=[];r.transformControls.traverse(e=>{t.push(e)}),r.objectHelperManager.addFilteredObject(...t)},rollback(r){}}};export{O as T};
