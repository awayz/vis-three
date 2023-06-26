import{_ as e,o as s,c as a,O as n}from"./chunks/framework.a8fb2c59.js";const y=JSON.parse('{"title":"@vis-three/plugin-css3d-renderer","description":"","frontmatter":{},"headers":[],"relativePath":"library/plugins/plugin-css3d-renderer.md","filePath":"library/plugins/plugin-css3d-renderer.md"}'),r={name:"library/plugins/plugin-css3d-renderer.md"},l=n(`<h1 id="vis-three-plugin-css3d-renderer" tabindex="-1">@vis-three/plugin-css3d-renderer <a class="header-anchor" href="#vis-three-plugin-css3d-renderer" aria-label="Permalink to &quot;@vis-three/plugin-css3d-renderer&quot;">​</a></h1><p>css3D 渲染器插件。</p><p>此插件可以将 dom 通过 CSS3 的 transform 属性和 three.js 的变换能力结合，并且可以与 three.js 的物体处于同一变换体系和变换坐标下。</p><h2 id="最新版本" tabindex="-1">最新版本 <a class="header-anchor" href="#最新版本" aria-label="Permalink to &quot;最新版本&quot;">​</a></h2><img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-css3d-renderer"><h2 id="license" tabindex="-1">license <a class="header-anchor" href="#license" aria-label="Permalink to &quot;license&quot;">​</a></h2><img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-css3d-renderer?color=blue"><h2 id="插件名称" tabindex="-1">插件名称 <a class="header-anchor" href="#插件名称" aria-label="Permalink to &quot;插件名称&quot;">​</a></h2><p><code>CSS3DRendererPlugin</code></p><h2 id="插件依赖" tabindex="-1">插件依赖 <a class="header-anchor" href="#插件依赖" aria-label="Permalink to &quot;插件依赖&quot;">​</a></h2><p>无</p><h2 id="插件传参" tabindex="-1">插件传参 <a class="header-anchor" href="#插件传参" aria-label="Permalink to &quot;插件传参&quot;">​</a></h2><p>无</p><h2 id="引擎拓展" tabindex="-1">引擎拓展 <a class="header-anchor" href="#引擎拓展" aria-label="Permalink to &quot;引擎拓展&quot;">​</a></h2><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">interface</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CSS2DRendererEngine</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">extends</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Engine</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#FFAB70;">css2DRenderer</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">CSS2DRenderer</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">interface</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CSS2DRendererEngine</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">extends</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Engine</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#E36209;">css2DRenderer</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">CSS2DRenderer</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="css2drenderer" tabindex="-1">css2DRenderer <a class="header-anchor" href="#css2drenderer" aria-label="Permalink to &quot;css2DRenderer&quot;">​</a></h3><p>参照： <a href="https://threejs.org/docs/index.html?q=css#examples/zh/renderers/CSS3DRenderer" target="_blank" rel="noreferrer">https://threejs.org/docs/index.html?q=css#examples/zh/renderers/CSS3DRenderer</a></p>`,17),o=[l];function t(p,c,i,d,h,E){return s(),a("div",null,o)}const g=e(r,[["render",t]]);export{y as __pageData,g as default};
