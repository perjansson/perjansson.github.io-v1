var app=function(){"use strict";function e(){}function t(e,t){for(const n in t)e[n]=t[n];return e}function n(e){return e()}function o(){return Object.create(null)}function i(e){e.forEach(n)}function a(e){return"function"==typeof e}function s(e,t){return e!=e?t==t:e!==t||e&&"object"==typeof e||"function"==typeof e}function r(e,t){e.appendChild(t)}function l(e,t,n){e.insertBefore(t,n||null)}function c(e){e.parentNode.removeChild(e)}function d(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function p(e){return document.createElement(e)}function u(e){return document.createTextNode(e)}function m(){return u(" ")}function h(e,t,n,o){return e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)}function g(e,t,n){null==n?e.removeAttribute(t):e.setAttribute(t,n)}function f(e,t){t=""+t,e.data!==t&&(e.data=t)}let v;function b(e){v=e}function w(e){(function(){if(!v)throw new Error("Function called outside component initialization");return v})().$$.on_mount.push(e)}const y=[],k=[],j=[],$=[],x=Promise.resolve();let S=!1;function _(e){j.push(e)}function T(){const e=new Set;do{for(;y.length;){const e=y.shift();b(e),A(e.$$)}for(;k.length;)k.pop()();for(let t=0;t<j.length;t+=1){const n=j[t];e.has(n)||(n(),e.add(n))}j.length=0}while(y.length);for(;$.length;)$.pop()();S=!1}function A(e){e.fragment&&(e.update(e.dirty),i(e.before_update),e.fragment.p(e.dirty,e.ctx),e.dirty=null,e.after_update.forEach(_))}const B=new Set;let E;function q(e,t){e&&e.i&&(B.delete(e),e.i(t))}function z(e,t,n){if(e&&e.o){if(B.has(e))return;B.add(e),E.callbacks.push(()=>{B.delete(e),n&&(e.d(1),n())}),e.o(t)}}function D(e,t){const n={},o={},i={$$scope:1};let a=e.length;for(;a--;){const s=e[a],r=t[a];if(r){for(const e in s)e in r||(o[e]=1);for(const e in r)i[e]||(n[e]=r[e],i[e]=1);e[a]=r}else for(const e in s)i[e]=1}for(const e in o)e in n||(n[e]=void 0);return n}function I(e,t,o){const{fragment:s,on_mount:r,on_destroy:l,after_update:c}=e.$$;s.m(t,o),_(()=>{const t=r.map(n).filter(a);l?l.push(...t):i(t),e.$$.on_mount=[]}),c.forEach(_)}function C(e,t){e.$$.fragment&&(i(e.$$.on_destroy),e.$$.fragment.d(t),e.$$.on_destroy=e.$$.fragment=null,e.$$.ctx={})}function M(e,t){e.$$.dirty||(y.push(e),S||(S=!0,x.then(T)),e.$$.dirty=o()),e.$$.dirty[t]=!0}function P(t,n,a,s,r,l){const c=v;b(t);const d=n.props||{},p=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:r,bound:o(),on_mount:[],on_destroy:[],before_update:[],after_update:[],context:new Map(c?c.$$.context:[]),callbacks:o(),dirty:null};let u=!1;var m;p.ctx=a?a(t,d,(e,n)=>{p.ctx&&r(p.ctx[e],p.ctx[e]=n)&&(p.bound[e]&&p.bound[e](n),u&&M(t,e))}):d,p.update(),u=!0,i(p.before_update),p.fragment=s(p.ctx),n.target&&(n.hydrate?p.fragment.l((m=n.target,Array.from(m.childNodes))):p.fragment.c(),n.intro&&q(t.$$.fragment),I(t,n.target,n.anchor),T()),b(c)}class L{$destroy(){C(this,1),this.$destroy=e}$on(e,t){const n=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return n.push(t),()=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1)}}$set(){}}var H={me:{name:"Per Jansson",title:"Fullstack Web Developer",contacts:[{medium:"GitHub",url:"https://github.com/perjansson"},{medium:"LinkedIn",url:"https://www.linkedin.com/in/pichdude"},{medium:"Medium",url:"https://medium.com/@perjansson"},{medium:"Stack Overflow",url:"https://stackoverflow.com/users/274426/per-jansson"},{medium:"Twitter",url:"https://www.twitter.com/per_jansson"},{medium:"Instagram",url:"https://instagram.com/per_jansson"},{medium:"Facebook",url:"https://www.facebook.com/pichdude"},{medium:"Email",url:"mailto:per.r.jansson@gmail.com"}],short:"Hi I'm Per, a <strong>curious</strong> software developer with a passion to <strong>build great stuff</strong> and help others do the same.",long:"My core skills are in fullstack <strong>web development</strong> and, although I’m no stranger to backend, I’ve always been drawn to the <strong>frontend</strong> side. I like the things that are visual and that a user interacts with and I have many years of experience in how to build systems and applications that are a good mix of <strong>quality, robustness and ease of use</strong>. I really enjoy working with <strong>Node, React and JavaScript</strong> in general, but I also have done a lot of Java previously together with both Android och iOS development. I addition to that I also like the architectural part of how a solid frontend is created together with making the <strong>Developer Experience</strong> really good for the current team so it’s a joy to work with."},projects:[{title:"Panasonic Avionics Corporation",description:"Platform to enable airplane passengers to attain wireless internet connectivity.",me:"Software developer helping Panasonic developing new services to enable airplane passengers to attain wireless internet connectivity. Daily work consists of implementing new features and at the same time gradually modernizing the technical solution as well as helping the development team build a solution that will be a solid platform for the future.",tags:["typescript","react","redux","material-ui","storybook","jest","react-testing-library","cypress","node","npm","lerna","gitlab","docker"]},{title:"HBO GO app",description:"HBO GO client in US for TV platforms: Samsung Orsay, TiVo set-top box and Hotels (LG and Enseo devices). A web application using HTML, CSS, and TypeScript. Frameworks and libraries used are React, Redux, Styled Components and Ramda. It is built using Grunt and Browserify.",me:"Software developer of the HBO GO app for different platforms and devices. Daily work consists of both developing new features in a shiny new codebase but also maintaining and solving tricky problems in a legacy codebase. Fun and challenging!",tags:["typescript","react","redux","styled-components","storybook","jest","enzyme","node","npm","git","jenkins","vs code"]},{title:"Unibet Frontend for Kindred Group",description:"Several different betting websites built using web technologies and using configuration of a headless CMS to create the final experience for the client.",me:"Frontend developer in a team responsible for Unibet, Storspelare, Bingo.com and Bohemia Casino. Development of mostly new features build with the latest technologies but also maintaining legacy code. Trying daily to contribute to team becoming more efficient both in programming but also in team work and good development practices.",tags:["javascript","react","redux","reselect","styled-components","jest","enzyme","storybook","storyshots","webpack","babel","html","sass","node","yarn","cypress","codemods","jscodeshift","git","jenkins","vs code"]},{title:"Insourcing Matchmaking Tool for EY",description:"A web application that act as a matchmaking tool to find the best candidate of insourced consultants and employees for a given client and project. Also a back-office module for administrators and consultants to manage their skills, CVs, personal video, details etc.",me:"Responsible for building the full experience, ie. the client, a responsive web app that's both fast and intuitive to use, and the server with business logic, a nodejs app with mongodb as persistence.",tags:["javascript","angular","ngxs","react","graphql","apollo","sass","animate.css","express","jwt","passport","lodash","node","npm","webpack","typescript","mongodb","heroku","aws s3","mlab","papertrail","pushover"]},{title:"New Admin web for Leadenhancer",description:"Web application for back office of company that bridges the gap between known and anonymous web visitors by identifying and segmenting the companies visiting a website, and providing detailed, targetable business attributes in real-time.",me:"Frontend responsible to build a new admin web to support the needs of the admin users of Leadenhancer. Involves everything from architecture and build and deploy pipeline, REST api design to coding the bits and pieces that are a modern web application.",tags:["javascript","angular","node","npm","sass","eslint","prettier","webpack"]},{title:"Digitalization and Advisory Cockpit Tool for Nordea Bank",description:"Advisory Cockpit Tool to be used by advisors and help digitize an advisor's everyday. The bar was set very high and the application should not only contain a lot of functionality to simplify the days of an advisor, but the end result will also be a great user experience.",me:"Development and architecture of the frontend and BFF part of the application. Setting up fast and solid development experience and in general building the foundation of an easy to develop and maintain system. Daily work with building pages and components together with API design.",tags:["javascript","react","redux","reselect","express","node","npm","webpack","babel","lodash","html","material-ui","sass","css modules","standardjs","mocha","chai","sinon","enzyme","faker.js","moment","postman","java","spring","jackson","scrum","tdd","jenkins"]},{title:"Mindmend prototype",description:"A prototype for a digital platform for KBT treatment.",me:"Developer of a responsive web app, everything from Sketch to running in the cloud.",tags:["javascript","html","jquery","materialize","sass","animate.css","express","node","npm","webpack","heroku","agile"]},{title:"Nordic portfolio system for Nordea Bank",description:"A brand new back office solution along with enhancing and introducing an existing portfolio system in the Nordic countries",me:"Coding frontend architect developing the frontend tier, setting up fast and solid development practices/processes/style guides and build system together with being a happy team player working very close to the end user to guarantee the best result.",tags:["javascript","angularjs","es2015","node","npm","gulp","bower","jquery","underscore","html","bootstrap","sass","jshint","csslint","htmlhint","karma","protractor","mocha","chai","sinon","java","spring","hibernate","dozer","flying saucer","intellij","git","maven","jenkins","sonarqube","sql server","tdd","ddd","kanban","xp"]},{title:"Risk Calculator for Nordea Bank",description:"A system for calculating risk and return, both based on a customer's current portfolio but also on a better allocated portfolio that will be recommended to the customer.",me:"Full stack developer of the entire system, although primarily responsible for frontend and API, together with being a happy team player working very close to the end user to guarantee the best result.",tags:["angularjs","html","css","boostrap","karma","protractor","java","spring","hibernate","thymeleaf","flying Saucer","jensoft","dozer","intellij","git","maven","jenkins","sonarqube","sql server","tdd","ddd","scrum","xp"]},{title:"Multi portfolio for Nordea Bank",description:"Portfolio analysis system extended to support structuring a customer's total engagement in different portfolios to be able to twist and turn the customers current assets.",me:"Development and Scrum Master making sure that the team delivers what the end user expects with good code quality.",tags:["gwt","java","spring","hibernate","apache camel","dozer","html","css","javascript","intellij","svn","maven","jenkins","sonarqube","sql Server","tdd","ddd","scrum","xp"]},{title:"Customized analysis and recommendation for Nordea Bank",description:"A system for doing customized analysis, optimization and recommendation of customer's current portfolio to be able to recommend a better portfolio that can give a higher return with a lower risk. <a href='https://medium.com/@perjansson/offshoring-from-the-scream-to-friendship-and-success-5b409c30d287' target='_blank' rel='noopener noreferrer'>Blog post about project on Medium</a>.",me:"Development and architecture of the system. Being UX and front end responsible to make the system easy and fast to use. Be proactive in efforts to get a distributed team between Sweden, Denmark and India to work.",tags:["gwt","java","spring","hibernate","dozer","html","css","javascript","eclipse","svn","maven","jenkins","sonarqube","sql Server","tdd","ddd","scrum","xp","lean"]},{title:"Portfolio for advisors for Nordea Bank",description:'A web application for advisors to use when doing analysis of a customers holdings, for instance asset allocation, current and previous holdings, transactions, performance and profit and loss. <a href="https://medium.com/@perjansson/how-we-invented-and-introduced-drama-driven-demo-9cc564bc741f" target="_blank" rel="noopener noreferrer">Blog post about project on Medium</a>.',me:"Development and UX making sure the system makes sense and is easy to use, looks nice and is quick and responsive. Advocate efficient software development practices such as pair programming, TDD, code reviews and brown bag lunches.",tags:["gwt","java","spring","hibernate","dozer","html","css","javascript","eclipse","svn","maven","jenkins","sonarqube","sql Server","tdd","ddd","scrum","xp","lean"]},{title:"App on Android for Swedish Pharmacy",description:"An Android app to view the current pollen level at a given location as well as recommended treatments and view closest pharmacy.",me:"Develop the Apoteket (swedish pharmacy) application for Android. Took the project from requirements and development to testing and release on Google Play.",tags:["android","java","android studio","scrum"]},{title:"App on Android for Statoil",description:"An Android app to view the closest Statoil gas station as well as book trailers, vans etc.",me:"Develop the Swedish Statoil application for Android. Took the project from requirements and development to testing and release on Google Play.",tags:["android","java","android studio","scrum"]},{title:"Planning and sorting system for Swedish Postal Service",description:"A system to improve the planning and sorting of incoming and outgoing parcels for the Swedish postal service.",me:"Development with frontend responsibility to make sure the system was intuitive and easy to use. Held workshops with end users about how the interface should look like.",tags:["jsf","richfaces","seam","html","css","javascript","java ee","ejb2","bibernate","sculptur","eclipse","svn","maven","hudson","tdd","ddd","rup"]},{title:"Automatic Payments for Länsförsäkringar Bank",description:"Change several existing bank systems to make sure they worked after a backend system for automatic payments was updated.",me:"Technical project manager and developer which involved planning and being part of the implementation.",tags:["jsf","struts","java","spring","hibernate","eclipse","svn","maven","jenkins","xp","scrum"]},{title:"Proof Of Concept new Internet bank for SEB (Bank)",description:"A Proof of concept application to prove that a current internet banking solution could be modified to work for another bank.",me:"Developer and development lead to show how we worked with planning, analysis, design, development, test and release.",tags:["jsf","myfaces","html","css","javascript","java","spring","hibernate","eclipse","svn","maven","xp","rup"]},{title:"New Internet Bank for Länsförsäkringar Bank",description:"Build a new shiny internet bank with new technologies, frameworks and most importantly new functionality. ",me:"Developer and front end specialist to make sure that the selected technologies played well together when both rebuilding existing functionality but also when adding new.",tags:["jsf","myfaces","shale","html","css","javascript","java","spring","hibernate","eclipse","svn","maven","apache continuum","xp","rup"]},{title:"Change bank application for Länsförsäkringar Bank",description:"A system to support bank officers help new customers move all of their existing engagement from other banks to Länsförsäkringar Bank.",me:"Developer with front end responsibility.",tags:["jsf","myfaces","shale","html","css","javascript","java","spring","hibernate","eclipse","svn","maven","apache continuum","xp","rup"]},{title:"Bank officers secure communication for Länsförsäkringar Bank",description:"a system to enable a secure communication channel between bank officers and bank customers via the internet bank and an internal bank officer application.",me:"Developer with front end responsibility.",tags:["struts","html","css","javascript","java ee","ejb 3","hibernate","eclipse","cvs","ant","rup"]},{title:"Internet bank for SEB (Bank) in Germany",description:"A new internet bank for SEB in Germany.",me:"Developer with fullstack responsibility.",tags:["struts","html","css","javascript","java ee","ejb 3","hibernate","eclipse","cvs","ant","rup"]}]};function N(e,t,n){const o=Object.create(e);return o.tag=t[n],o}function O(e){var t,n,o=e.tag;return{c(){t=p("span"),n=u(o),g(t,"class","svelte-zxwe2o")},m(e,o){l(e,t,o),r(t,n)},p(e,t){e.tags&&o!==(o=t.tag)&&f(n,o)},d(e){e&&c(t)}}}function R(t){for(var n,o=t.tags,i=[],a=0;a<o.length;a+=1)i[a]=O(N(t,o,a));return{c(){n=p("div");for(var e=0;e<i.length;e+=1)i[e].c();g(n,"class","tags svelte-zxwe2o")},m(e,t){l(e,n,t);for(var o=0;o<i.length;o+=1)i[o].m(n,null)},p(e,t){if(e.tags){o=t.tags;for(var a=0;a<o.length;a+=1){const s=N(t,o,a);i[a]?i[a].p(e,s):(i[a]=O(s),i[a].c(),i[a].m(n,null))}for(;a<i.length;a+=1)i[a].d(1);i.length=o.length}},i:e,o:e,d(e){e&&c(n),d(i,e)}}}function F(e,t,n){let{tags:o}=t;return e.$set=(e=>{"tags"in e&&n("tags",o=e.tags)}),{tags:o}}class G extends L{constructor(e){super(),P(this,e,F,R,s,["tags"])}}function U(e){var t,n,o,i,a,s,d,h,v,b,w,y,k,j,$,x,S=new G({props:{tags:e.tags}});return{c(){t=p("div"),n=p("div"),o=u(e.title),i=m(),a=p("div"),(s=p("span")).textContent="Desc:",d=m(),h=p("noscript"),v=m(),b=p("div"),(w=p("span")).textContent="Me:",y=m(),k=u(e.me),j=m(),S.$$.fragment.c(),g(n,"class","title svelte-38kuhg"),g(s,"class","prefix svelte-38kuhg"),g(a,"class","description svelte-38kuhg"),g(w,"class","prefix svelte-38kuhg"),g(b,"class","me svelte-38kuhg"),g(t,"class","project-container svelte-38kuhg"),g(t,"id",$=`project-${e.id}-container`)},m(c,p){l(c,t,p),r(t,n),r(n,o),r(t,i),r(t,a),r(a,s),r(a,d),r(a,h),h.insertAdjacentHTML("afterend",e.description),r(t,v),r(t,b),r(b,w),r(b,y),r(b,k),r(t,j),I(S,t,null),x=!0},p(e,n){x&&!e.title||f(o,n.title),x&&!e.description||(!function(e){for(;e.nextSibling;)e.parentNode.removeChild(e.nextSibling)}(h),h.insertAdjacentHTML("afterend",n.description)),x&&!e.me||f(k,n.me);var i={};e.tags&&(i.tags=n.tags),S.$set(i),x&&!e.id||$===($=`project-${n.id}-container`)||g(t,"id",$)},i(e){x||(q(S.$$.fragment,e),x=!0)},o(e){z(S.$$.fragment,e),x=!1},d(e){e&&c(t),C(S)}}}function J(e,t,n){let{id:o,title:i,description:a,me:s,tags:r}=t;return setTimeout(()=>{ScrollReveal().reveal("[id^='project-']",{distance:"25%",origin:"bottom",scale:.8,duration:1e3})},500),e.$set=(e=>{"id"in e&&n("id",o=e.id),"title"in e&&n("title",i=e.title),"description"in e&&n("description",a=e.description),"me"in e&&n("me",s=e.me),"tags"in e&&n("tags",r=e.tags)}),{id:o,title:i,description:a,me:s,tags:r}}class V extends L{constructor(e){super(),P(this,e,J,U,s,["id","title","description","me","tags"])}}function K(e,t,n){const o=Object.create(e);return o.project=t[n],o.i=n,o}function W(e){var n,o,i,a=[{id:e.i},e.project];let s={};for(var d=0;d<a.length;d+=1)s=t(s,a[d]);var u=new V({props:s});return{c(){n=p("li"),u.$$.fragment.c(),o=m()},m(e,t){l(e,n,t),I(u,n,null),r(n,o),i=!0},p(e,t){var n=e.projects?D(a,[{id:t.i},t.project]):{};u.$set(n)},i(e){i||(q(u.$$.fragment,e),i=!0)},o(e){z(u.$$.fragment,e),i=!1},d(e){e&&c(n),C(u)}}}function X(e){for(var t,n,o,a,s,u,f=e.projects,v=[],b=0;b<f.length;b+=1)v[b]=W(K(e,f,b));const w=e=>z(v[e],1,()=>{v[e]=null});return{c(){t=p("div"),(n=p("div")).innerHTML='<div class="bounce svelte-1xk6ecc">Stuff I\'ve done ▼▼</div>',o=m(),a=p("ol");for(var i=0;i<v.length;i+=1)v[i].c();g(n,"class","header svelte-1xk6ecc"),g(a,"class","list svelte-1xk6ecc"),g(t,"class","projects-container svelte-1xk6ecc"),u=h(n,"click",e.scrollToHeader)},m(i,c){l(i,t,c),r(t,n),e.div1_binding(n),r(t,o),r(t,a);for(var d=0;d<v.length;d+=1)v[d].m(a,null);e.div2_binding(t),s=!0},p(e,t){if(e.projects){f=t.projects;for(var n=0;n<f.length;n+=1){const o=K(t,f,n);v[n]?(v[n].p(e,o),q(v[n],1)):(v[n]=W(o),v[n].c(),q(v[n],1),v[n].m(a,null))}for(E={remaining:0,callbacks:[]},n=f.length;n<v.length;n+=1)w(n);E.remaining||i(E.callbacks)}},i(e){if(!s){for(var t=0;t<f.length;t+=1)q(v[t]);s=!0}},o(e){v=v.filter(Boolean);for(let e=0;e<v.length;e+=1)z(v[e]);s=!1},d(n){n&&c(t),e.div1_binding(null),d(v,n),e.div2_binding(null),u()}}}function Y(e,t,n){let o,i,{projects:a}=t;w(()=>{setTimeout(()=>{ScrollReveal().reveal(o),ScrollReveal().reveal(i,{scale:.8,duration:1e3,delay:3e3})},500)});return e.$set=(e=>{"projects"in e&&n("projects",a=e.projects)}),{projects:a,containerEl:o,header:i,scrollToHeader:()=>zenscroll.to(i),div1_binding:function(e){k[e?"unshift":"push"](()=>{n("header",i=e)})},div2_binding:function(e){k[e?"unshift":"push"](()=>{n("containerEl",o=e)})}}}class Q extends L{constructor(e){super(),P(this,e,Y,X,s,["projects"])}}function Z(e,t,n){const o=Object.create(e);return o.c=t[n],o}function ee(e){var t,n,o,i=e.c.medium;return{c(){t=p("a"),n=u(i),g(t,"target","_blank"),g(t,"rel","noopener noreferrer"),g(t,"href",o=e.c.url),g(t,"class","svelte-1wdqiqn")},m(e,o){l(e,t,o),r(t,n)},p(e,a){e.contacts&&i!==(i=a.c.medium)&&f(n,i),e.contacts&&o!==(o=a.c.url)&&g(t,"href",o)},d(e){e&&c(t)}}}function te(t){for(var n,o=t.contacts,i=[],a=0;a<o.length;a+=1)i[a]=ee(Z(t,o,a));return{c(){for(var e=0;e<i.length;e+=1)i[e].c();n=u("")},m(e,t){for(var o=0;o<i.length;o+=1)i[o].m(e,t);l(e,n,t)},p(e,t){if(e.contacts){o=t.contacts;for(var a=0;a<o.length;a+=1){const s=Z(t,o,a);i[a]?i[a].p(e,s):(i[a]=ee(s),i[a].c(),i[a].m(n.parentNode,n))}for(;a<i.length;a+=1)i[a].d(1);i.length=o.length}},i:e,o:e,d(e){d(i,e),e&&c(n)}}}function ne(e,t,n){let{contacts:o}=t;return e.$set=(e=>{"contacts"in e&&n("contacts",o=e.contacts)}),{contacts:o}}class oe extends L{constructor(e){super(),P(this,e,ne,te,s,["contacts"])}}function ie(t){var n,o,i,a,s,d,v,b=t.isShowingShortText?t.short:t.long,w=t.isShowingShortText?"►":"◄";return{c(){n=p("div"),o=p("div"),i=m(),a=p("div"),s=u(w),g(o,"class","description svelte-1pnp0qz"),g(a,"class","more svelte-1pnp0qz"),g(n,"class",d=(t.isShowingShortText?"wrapper short":"wrapper long")+" svelte-1pnp0qz"),v=h(a,"click",t.toggle)},m(e,c){l(e,n,c),r(n,o),o.innerHTML=b,t.div0_binding(o),r(n,i),r(n,a),r(a,s),t.div1_binding(a),t.div2_binding(n)},p(e,t){(e.isShowingShortText||e.short||e.long)&&b!==(b=t.isShowingShortText?t.short:t.long)&&(o.innerHTML=b),e.isShowingShortText&&w!==(w=t.isShowingShortText?"►":"◄")&&f(s,w),e.isShowingShortText&&d!==(d=(t.isShowingShortText?"wrapper short":"wrapper long")+" svelte-1pnp0qz")&&g(n,"class",d)},i:e,o:e,d(e){e&&c(n),t.div0_binding(null),t.div1_binding(null),t.div2_binding(null),v()}}}function ae(e,t,n){let o,i,a,{short:s,long:r}=t,l=!0;w(()=>{setTimeout(()=>{ScrollReveal().reveal(i,{scale:.9,duration:1e3,delay:1e3}),ScrollReveal().reveal(a,{scale:0,duration:1e3,delay:1e3})},500)});return e.$set=(e=>{"short"in e&&n("short",s=e.short),"long"in e&&n("long",r=e.long)}),{short:s,long:r,wrapperEl:o,descriptionEl:i,moreEl:a,isShowingShortText:l,toggle:()=>{o.style.opacity=0,n("wrapperEl",o),setTimeout(()=>{n("isShowingShortText",l=!l),o.style.opacity=1,n("wrapperEl",o)},500)},div0_binding:function(e){k[e?"unshift":"push"](()=>{n("descriptionEl",i=e)})},div1_binding:function(e){k[e?"unshift":"push"](()=>{n("moreEl",a=e)})},div2_binding:function(e){k[e?"unshift":"push"](()=>{n("wrapperEl",o=e)})}}}class se extends L{constructor(e){super(),P(this,e,ae,ie,s,["short","long"])}}function re(e){var t,n,o,i,a,s,d,h,v,b,w,y,k=new oe({props:{contacts:e.contacts}}),j=new se({props:{short:e.short,long:e.long}});return{c(){t=p("div"),n=p("div"),o=p("div"),i=u(e.name),a=m(),s=p("div"),d=u(e.title),h=m(),v=p("div"),k.$$.fragment.c(),b=m(),w=p("div"),j.$$.fragment.c(),g(o,"class","name svelte-k26bw8"),g(s,"class","title svelte-k26bw8"),g(n,"class","header svelte-k26bw8"),g(v,"class","contacts svelte-k26bw8"),g(w,"class","content svelte-k26bw8"),g(t,"class","me-container svelte-k26bw8")},m(c,p){l(c,t,p),r(t,n),r(n,o),r(o,i),r(n,a),r(n,s),r(s,d),e.div2_binding(n),r(t,h),r(t,v),I(k,v,null),e.div3_binding(v),r(t,b),r(t,w),I(j,w,null),e.div5_binding(t),y=!0},p(e,t){y&&!e.name||f(i,t.name),y&&!e.title||f(d,t.title);var n={};e.contacts&&(n.contacts=t.contacts),k.$set(n);var o={};e.short&&(o.short=t.short),e.long&&(o.long=t.long),j.$set(o)},i(e){y||(q(k.$$.fragment,e),q(j.$$.fragment,e),y=!0)},o(e){z(k.$$.fragment,e),z(j.$$.fragment,e),y=!1},d(n){n&&c(t),e.div2_binding(null),C(k),e.div3_binding(null),C(j),e.div5_binding(null)}}}function le(e,t,n){let o,i,a,{name:s,title:r,contacts:l,short:c,long:d}=t;return w(()=>{setTimeout(()=>{const e=(()=>window.matchMedia("(max-width: 480px)").matches)()?.85:.8;o.style.height=window.innerHeight*e+"px",n("containerEl",o),ScrollReveal().reveal(i,{distance:"150%",origin:"top",duration:1e3}),ScrollReveal().reveal(a,{distance:"20%",origin:"left",scale:.9,duration:1e3,delay:1500})},500)}),e.$set=(e=>{"name"in e&&n("name",s=e.name),"title"in e&&n("title",r=e.title),"contacts"in e&&n("contacts",l=e.contacts),"short"in e&&n("short",c=e.short),"long"in e&&n("long",d=e.long)}),{name:s,title:r,contacts:l,short:c,long:d,containerEl:o,headerEl:i,contactsEl:a,div2_binding:function(e){k[e?"unshift":"push"](()=>{n("headerEl",i=e)})},div3_binding:function(e){k[e?"unshift":"push"](()=>{n("contactsEl",a=e)})},div5_binding:function(e){k[e?"unshift":"push"](()=>{n("containerEl",o=e)})}}}class ce extends L{constructor(e){super(),P(this,e,le,re,s,["name","title","contacts","short","long"])}}function de(e){var n,o,i,a=[H.me];let s={};for(var d=0;d<a.length;d+=1)s=t(s,a[d]);var u=new ce({props:s}),h=new Q({props:{projects:H.projects}});return{c(){n=p("main"),u.$$.fragment.c(),o=m(),h.$$.fragment.c(),g(n,"class","main-container svelte-zsn735")},m(e,t){l(e,n,t),I(u,n,null),r(n,o),I(h,n,null),i=!0},p(e,t){var n=e.content?D(a,[H.me]):{};u.$set(n);var o={};e.content&&(o.projects=H.projects),h.$set(o)},i(e){i||(q(u.$$.fragment,e),q(h.$$.fragment,e),i=!0)},o(e){z(u.$$.fragment,e),z(h.$$.fragment,e),i=!1},d(e){e&&c(n),C(u),C(h)}}}return new class extends L{constructor(e){super(),P(this,e,null,de,s,[])}}({target:document.body})}();
//# sourceMappingURL=bundle.js.map
