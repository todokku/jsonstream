(function(t){function e(e){for(var i,a,o=e[0],l=e[1],c=e[2],d=0,p=[];d<o.length;d++)a=o[d],r[a]&&p.push(r[a][0]),r[a]=0;for(i in l)Object.prototype.hasOwnProperty.call(l,i)&&(t[i]=l[i]);u&&u(e);while(p.length)p.shift()();return s.push.apply(s,c||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,o=1;o<n.length;o++){var l=n[o];0!==r[l]&&(i=!1)}i&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var i={},r={app:0},s=[];function a(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=i,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)a.d(n,i,function(e){return t[e]}.bind(null,i));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"21bb":function(t,e,n){"use strict";var i=n("bcc9"),r=n.n(i);r.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var i=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fadeIn animated",class:this.$router.currentRoute.name,attrs:{id:"app"}},[n("router-view")],1)},s=[],a=n("2877"),o={},l=Object(a["a"])(o,r,s,!1,null,null,null),c=l.exports,u=n("8c4f"),d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("div",{staticClass:"divider"}),n("div",{staticClass:"row noflex fullheight"},[n("div",{staticClass:"shape triangle"}),n("div",{staticClass:"shape triangle"}),n("div",{staticClass:"cover"},[t._v("\n            "+t._s(t.cover)+"\n        ")])]),n("div",{staticClass:"row"},[n("div",{staticClass:"inner"},[n("span",[t._v("GET Endpoints")]),t._l(this.feed,function(e,i){return n("div",{key:i,staticClass:"container"},[n("Item",{attrs:{title:e.title,description:e.description},on:{activated:t.handle}})],1)})],2),n("div",{staticClass:"inner info"},[n("div",{staticClass:"textfield"},[n("div",{staticClass:"display"},[t._v(t._s(this.text))])])])])])},p=[],f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"item",on:{click:function(e){return t.release(e.currentTarget)}}},[n("div",{staticClass:"texts"},[n("div",{staticClass:"title"},[t._v("\n            "+t._s(this.title)+"\n        ")]),n("div",{staticClass:"description"},[t._v("\n            "+t._s(this.description)+"\n        ")])])])},v=[],m={name:"Item",props:{title:String,description:String},methods:{release:function(t){this.$emit("activated","jsonstream.herokuapp.com"+t.children[0].children[0].innerHTML.trim())}}},h=m,g=(n("83d2"),Object(a["a"])(h,f,v,!1,null,null,null)),y=g.exports,b=n("f6f8"),w=n.n(b),C={name:"home",components:{Item:y},data:function(){return{feed:w.a.items,text:"API",cover:"jsonstream"}},methods:{handle:function(t){this.text=t}},mounted:function(){var t=[document.getElementsByClassName("triangle")[0].offsetTop,document.getElementsByClassName("triangle")[1].offsetTop];window.onscroll=function(){document.getElementsByClassName("divider")[0].offsetHeight>0&&(window.onscroll=""),document.getElementsByClassName("triangle")[0].style.top=t[0]+window.scrollY/3+"px",document.getElementsByClassName("triangle")[0].style.transform="rotate("+(window.scrollY/50-20)+"deg)",document.getElementsByClassName("triangle")[1].style.top=t[1]+window.scrollY/10+"px"}}},_=C,k=(n("21bb"),Object(a["a"])(_,d,p,!1,null,null,null)),x=k.exports;i["a"].use(u["a"]);var j=new u["a"]({routes:[{path:"/",name:"home",component:x}]}),O=n("2f62");i["a"].use(O["a"]);var E=new O["a"].Store({state:{},mutations:{},actions:{}});i["a"].config.productionTip=!1,new i["a"]({router:j,store:E,render:function(t){return t(c)}}).$mount("#app")},6595:function(t,e,n){},"83d2":function(t,e,n){"use strict";var i=n("6595"),r=n.n(i);r.a},bcc9:function(t,e,n){},f6f8:function(t,e){t.exports={items:[{title:"/api/get",description:"Get global value."},{title:"/api/get/:key",description:"Get keyed value."},{title:"/api/set/:value",description:"Set global value."},{title:"/api/set/:value/:key",description:"Set keyed value."},{title:"/api/remove/:key",description:"Remove keyed value."},{title:"/api/list",description:"List all data."},{title:"/kick",description:"Redirect to global value."},{title:"/kick/:key",description:"Redirect to keyed value."}]}}});
//# sourceMappingURL=app.0b179a64.js.map