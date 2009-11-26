// Prototype + Scriptaculous | Prototype JavaScript framework, version 1.4.0 (c) 2005 Sam Stephenson <sam@conio.net> | Prototype is freely distributable under the terms of an MIT-style license. For details, see the Prototype web site: http://prototype.conio.net/ | Copyright (c) 2005 Thomas Fuchs (http://script.aculo.us, http://mir.aculo.us). Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
var Prototype={Version:"1.6.0.3",Browser:{IE:!!(window.attachEvent&&navigator.userAgent.indexOf("Opera")===-1),Opera:navigator.userAgent.indexOf("Opera")>-1,WebKit:navigator.userAgent.indexOf("AppleWebKit/")>-1,Gecko:navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")===-1,MobileSafari:!!navigator.userAgent.match(/Apple.*Mobile.*Safari/)},BrowserFeatures:{XPath:!!document.evaluate,SelectorsAPI:!!document.querySelector,ElementExtensions:!!window.HTMLElement,SpecificElementExtensions:document.createElement("div")["__proto__"]&&document.createElement("div")["__proto__"]!==document.createElement("form")["__proto__"]},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(A){return A}};if(Prototype.Browser.MobileSafari){Prototype.BrowserFeatures.SpecificElementExtensions=false}var Class={create:function(){var E=null,D=$A(arguments);if(Object.isFunction(D[0])){E=D.shift()}function A(){this.initialize.apply(this,arguments)}Object.extend(A,Class.Methods);A.superclass=E;A.subclasses=[];if(E){var B=function(){};B.prototype=E.prototype;A.prototype=new B;E.subclasses.push(A)}for(var C=0;C<D.length;C++){A.addMethods(D[C])}if(!A.prototype.initialize){A.prototype.initialize=Prototype.emptyFunction}A.prototype.constructor=A;return A}};Class.Methods={addMethods:function(G){var C=this.superclass&&this.superclass.prototype;var B=Object.keys(G);if(!Object.keys({toString:true}).length){B.push("toString","valueOf")}for(var A=0,D=B.length;A<D;A++){var F=B[A],E=G[F];if(C&&Object.isFunction(E)&&E.argumentNames().first()=="$super"){var H=E;E=(function(I){return function(){return C[I].apply(this,arguments)}})(F).wrap(H);E.valueOf=H.valueOf.bind(H);E.toString=H.toString.bind(H)}this.prototype[F]=E}return this}};var Abstract={};Object.extend=function(A,C){for(var B in C){A[B]=C[B]}return A};Object.extend(Object,{inspect:function(A){try{if(Object.isUndefined(A)){return"undefined"}if(A===null){return"null"}return A.inspect?A.inspect():String(A)}catch(B){if(B instanceof RangeError){return"..."}throw B}},toJSON:function(A){var C=typeof A;switch(C){case"undefined":case"function":case"unknown":return ;case"boolean":return A.toString()}if(A===null){return"null"}if(A.toJSON){return A.toJSON()}if(Object.isElement(A)){return }var B=[];for(var E in A){var D=Object.toJSON(A[E]);if(!Object.isUndefined(D)){B.push(E.toJSON()+": "+D)}}return"{"+B.join(", ")+"}"},toQueryString:function(A){return $H(A).toQueryString()},toHTML:function(A){return A&&A.toHTML?A.toHTML():String.interpret(A)},keys:function(A){var B=[];for(var C in A){B.push(C)}return B},values:function(B){var A=[];for(var C in B){A.push(B[C])}return A},clone:function(A){return Object.extend({},A)},isElement:function(A){return !!(A&&A.nodeType==1)},isArray:function(A){return A!=null&&typeof A=="object"&&"splice" in A&&"join" in A},isHash:function(A){return A instanceof Hash},isFunction:function(A){return typeof A=="function"},isString:function(A){return typeof A=="string"},isNumber:function(A){return typeof A=="number"},isUndefined:function(A){return typeof A=="undefined"}});Object.extend(Function.prototype,{argumentNames:function(){var A=this.toString().match(/^[\s\(]*function[^(]*\(([^\)]*)\)/)[1].replace(/\s+/g,"").split(",");return A.length==1&&!A[0]?[]:A},bind:function(){if(arguments.length<2&&Object.isUndefined(arguments[0])){return this}var A=this,C=$A(arguments),B=C.shift();return function(){return A.apply(B,C.concat($A(arguments)))}},bindAsEventListener:function(){var A=this,C=$A(arguments),B=C.shift();return function(D){return A.apply(B,[D||window.event].concat(C))}},curry:function(){if(!arguments.length){return this}var A=this,B=$A(arguments);return function(){return A.apply(this,B.concat($A(arguments)))}},delay:function(){var A=this,B=$A(arguments),C=B.shift()*1000;return window.setTimeout(function(){return A.apply(A,B)},C)},defer:function(){var A=[0.01].concat($A(arguments));return this.delay.apply(this,A)},wrap:function(B){var A=this;return function(){return B.apply(this,[A.bind(this)].concat($A(arguments)))}},methodize:function(){if(this._methodized){return this._methodized}var A=this;return this._methodized=function(){return A.apply(null,[this].concat($A(arguments)))}}});Date.prototype.toJSON=function(){return'"'+this.getUTCFullYear()+"-"+(this.getUTCMonth()+1).toPaddedString(2)+"-"+this.getUTCDate().toPaddedString(2)+"T"+this.getUTCHours().toPaddedString(2)+":"+this.getUTCMinutes().toPaddedString(2)+":"+this.getUTCSeconds().toPaddedString(2)+'Z"'};var Try={these:function(){var C;for(var B=0,D=arguments.length;B<D;B++){var A=arguments[B];try{C=A();break}catch(E){}}return C}};RegExp.prototype.match=RegExp.prototype.test;RegExp.escape=function(A){return String(A).replace(/([.*+?^=!:${}()|[\]\/\\])/g,"\\$1")};var PeriodicalExecuter=Class.create({initialize:function(B,A){this.callback=B;this.frequency=A;this.currentlyExecuting=false;this.registerCallback()},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000)},execute:function(){this.callback(this)},stop:function(){if(!this.timer){return }clearInterval(this.timer);this.timer=null},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;this.execute()}finally{this.currentlyExecuting=false}}}});Object.extend(String,{interpret:function(A){return A==null?"":String(A)},specialChar:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"}});Object.extend(String.prototype,{gsub:function(E,C){var A="",D=this,B;C=arguments.callee.prepareReplacement(C);while(D.length>0){if(B=D.match(E)){A+=D.slice(0,B.index);A+=String.interpret(C(B));D=D.slice(B.index+B[0].length)}else{A+=D,D=""}}return A},sub:function(C,A,B){A=this.gsub.prepareReplacement(A);B=Object.isUndefined(B)?1:B;return this.gsub(C,function(D){if(--B<0){return D[0]}return A(D)})},scan:function(B,A){this.gsub(B,A);return String(this)},truncate:function(B,A){B=B||30;A=Object.isUndefined(A)?"...":A;return this.length>B?this.slice(0,B-A.length)+A:String(this)},strip:function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")},stripTags:function(){return this.replace(/<\/?[^>]+>/gi,"")},stripScripts:function(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"")},extractScripts:function(){var B=new RegExp(Prototype.ScriptFragment,"img");var A=new RegExp(Prototype.ScriptFragment,"im");return(this.match(B)||[]).map(function(C){return(C.match(A)||["",""])[1]})},evalScripts:function(){return this.extractScripts().map(function(script){return eval(script)})},escapeHTML:function(){var A=arguments.callee;A.text.data=this;return A.div.innerHTML},unescapeHTML:function(){var A=new Element("div");A.innerHTML=this.stripTags();return A.childNodes[0]?(A.childNodes.length>1?$A(A.childNodes).inject("",function(B,C){return B+C.nodeValue}):A.childNodes[0].nodeValue):""},toQueryParams:function(B){var A=this.strip().match(/([^?#]*)(#.*)?$/);if(!A){return{}}return A[1].split(B||"&").inject({},function(E,F){if((F=F.split("="))[0]){var C=decodeURIComponent(F.shift());var D=F.length>1?F.join("="):F[0];if(D!=undefined){D=decodeURIComponent(D)}if(C in E){if(!Object.isArray(E[C])){E[C]=[E[C]]}E[C].push(D)}else{E[C]=D}}return E})},toArray:function(){return this.split("")},succ:function(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1)},times:function(A){return A<1?"":new Array(A+1).join(this)},camelize:function(){var D=this.split("-"),A=D.length;if(A==1){return D[0]}var C=this.charAt(0)=="-"?D[0].charAt(0).toUpperCase()+D[0].substring(1):D[0];for(var B=1;B<A;B++){C+=D[B].charAt(0).toUpperCase()+D[B].substring(1)}return C},capitalize:function(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase()},underscore:function(){return this.gsub(/::/,"/").gsub(/([A-Z]+)([A-Z][a-z])/,"#{1}_#{2}").gsub(/([a-z\d])([A-Z])/,"#{1}_#{2}").gsub(/-/,"_").toLowerCase()},dasherize:function(){return this.gsub(/_/,"-")},inspect:function(B){var A=this.gsub(/[\x00-\x1f\\]/,function(C){var D=String.specialChar[C[0]];return D?D:"\\u00"+C[0].charCodeAt().toPaddedString(2,16)});if(B){return'"'+A.replace(/"/g,'\\"')+'"'}return"'"+A.replace(/'/g,"\\'")+"'"},toJSON:function(){return this.inspect(true)},unfilterJSON:function(A){return this.sub(A||Prototype.JSONFilter,"#{1}")},isJSON:function(){var A=this;if(A.blank()){return false}A=this.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,"");return(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(A)},evalJSON:function(sanitize){var json=this.unfilterJSON();try{if(!sanitize||json.isJSON()){return eval("("+json+")")}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+this.inspect())},include:function(A){return this.indexOf(A)>-1},startsWith:function(A){return this.indexOf(A)===0},endsWith:function(A){var B=this.length-A.length;return B>=0&&this.lastIndexOf(A)===B},empty:function(){return this==""},blank:function(){return/^\s*$/.test(this)},interpolate:function(A,B){return new Template(this,B).evaluate(A)}});if(Prototype.Browser.WebKit||Prototype.Browser.IE){Object.extend(String.prototype,{escapeHTML:function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},unescapeHTML:function(){return this.stripTags().replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")}})}String.prototype.gsub.prepareReplacement=function(B){if(Object.isFunction(B)){return B}var A=new Template(B);return function(C){return A.evaluate(C)}};String.prototype.parseQuery=String.prototype.toQueryParams;Object.extend(String.prototype.escapeHTML,{div:document.createElement("div"),text:document.createTextNode("")});String.prototype.escapeHTML.div.appendChild(String.prototype.escapeHTML.text);var Template=Class.create({initialize:function(A,B){this.template=A.toString();this.pattern=B||Template.Pattern},evaluate:function(A){if(Object.isFunction(A.toTemplateReplacements)){A=A.toTemplateReplacements()}return this.template.gsub(this.pattern,function(D){if(A==null){return""}var F=D[1]||"";if(F=="\\"){return D[2]}var B=A,G=D[3];var E=/^([^.[]+|\[((?:.*?[^\\])?)\])(\.|\[|$)/;D=E.exec(G);if(D==null){return F}while(D!=null){var C=D[1].startsWith("[")?D[2].gsub("\\\\]","]"):D[1];B=B[C];if(null==B||""==D[3]){break}G=G.substring("["==D[3]?D[1].length:D[0].length);D=E.exec(G)}return F+String.interpret(B)})}});Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;var $break={};var Enumerable={each:function(C,B){var A=0;try{this._each(function(E){C.call(B,E,A++)})}catch(D){if(D!=$break){throw D}}return this},eachSlice:function(D,C,B){var A=-D,E=[],F=this.toArray();if(D<1){return F}while((A+=D)<F.length){E.push(F.slice(A,A+D))}return E.collect(C,B)},all:function(C,B){C=C||Prototype.K;var A=true;this.each(function(E,D){A=A&&!!C.call(B,E,D);if(!A){throw $break}});return A},any:function(C,B){C=C||Prototype.K;var A=false;this.each(function(E,D){if(A=!!C.call(B,E,D)){throw $break}});return A},collect:function(C,B){C=C||Prototype.K;var A=[];this.each(function(E,D){A.push(C.call(B,E,D))});return A},detect:function(C,B){var A;this.each(function(E,D){if(C.call(B,E,D)){A=E;throw $break}});return A},findAll:function(C,B){var A=[];this.each(function(E,D){if(C.call(B,E,D)){A.push(E)}});return A},grep:function(D,C,B){C=C||Prototype.K;var A=[];if(Object.isString(D)){D=new RegExp(D)}this.each(function(F,E){if(D.match(F)){A.push(C.call(B,F,E))}});return A},include:function(A){if(Object.isFunction(this.indexOf)){if(this.indexOf(A)!=-1){return true}}var B=false;this.each(function(C){if(C==A){B=true;throw $break}});return B},inGroupsOf:function(B,A){A=Object.isUndefined(A)?null:A;return this.eachSlice(B,function(C){while(C.length<B){C.push(A)}return C})},inject:function(A,C,B){this.each(function(E,D){A=C.call(B,A,E,D)});return A},invoke:function(B){var A=$A(arguments).slice(1);return this.map(function(C){return C[B].apply(C,A)})},max:function(C,B){C=C||Prototype.K;var A;this.each(function(E,D){E=C.call(B,E,D);if(A==null||E>=A){A=E}});return A},min:function(C,B){C=C||Prototype.K;var A;this.each(function(E,D){E=C.call(B,E,D);if(A==null||E<A){A=E}});return A},partition:function(D,B){D=D||Prototype.K;var C=[],A=[];this.each(function(F,E){(D.call(B,F,E)?C:A).push(F)});return[C,A]},pluck:function(B){var A=[];this.each(function(C){A.push(C[B])});return A},reject:function(C,B){var A=[];this.each(function(E,D){if(!C.call(B,E,D)){A.push(E)}});return A},sortBy:function(B,A){return this.map(function(D,C){return{value:D,criteria:B.call(A,D,C)}}).sort(function(F,E){var D=F.criteria,C=E.criteria;return D<C?-1:D>C?1:0}).pluck("value")},toArray:function(){return this.map()},zip:function(){var B=Prototype.K,A=$A(arguments);if(Object.isFunction(A.last())){B=A.pop()}var C=[this].concat(A).map($A);return this.map(function(E,D){return B(C.pluck(D))})},size:function(){return this.toArray().length},inspect:function(){return"#<Enumerable:"+this.toArray().inspect()+">"}};Object.extend(Enumerable,{map:Enumerable.collect,find:Enumerable.detect,select:Enumerable.findAll,filter:Enumerable.findAll,member:Enumerable.include,entries:Enumerable.toArray,every:Enumerable.all,some:Enumerable.any});function $A(C){if(!C){return[]}if(C.toArray){return C.toArray()}var B=C.length||0,A=new Array(B);while(B--){A[B]=C[B]}return A}if(Prototype.Browser.WebKit){$A=function(C){if(!C){return[]}if(!(typeof C==="function"&&typeof C.length==="number"&&typeof C.item==="function")&&C.toArray){return C.toArray()}var B=C.length||0,A=new Array(B);while(B--){A[B]=C[B]}return A}}Array.from=$A;Object.extend(Array.prototype,Enumerable);if(!Array.prototype._reverse){Array.prototype._reverse=Array.prototype.reverse}Object.extend(Array.prototype,{_each:function(B){for(var A=0,C=this.length;A<C;A++){B(this[A])}},clear:function(){this.length=0;return this},first:function(){return this[0]},last:function(){return this[this.length-1]},compact:function(){return this.select(function(A){return A!=null})},flatten:function(){return this.inject([],function(B,A){return B.concat(Object.isArray(A)?A.flatten():[A])})},without:function(){var A=$A(arguments);return this.select(function(B){return !A.include(B)})},reverse:function(A){return(A!==false?this:this.toArray())._reverse()},reduce:function(){return this.length>1?this:this[0]},uniq:function(A){return this.inject([],function(D,C,B){if(0==B||(A?D.last()!=C:!D.include(C))){D.push(C)}return D})},intersect:function(A){return this.uniq().findAll(function(B){return A.detect(function(C){return B===C})})},clone:function(){return[].concat(this)},size:function(){return this.length},inspect:function(){return"["+this.map(Object.inspect).join(", ")+"]"},toJSON:function(){var A=[];this.each(function(B){var C=Object.toJSON(B);if(!Object.isUndefined(C)){A.push(C)}});return"["+A.join(", ")+"]"}});if(Object.isFunction(Array.prototype.forEach)){Array.prototype._each=Array.prototype.forEach}if(!Array.prototype.indexOf){Array.prototype.indexOf=function(C,A){A||(A=0);var B=this.length;if(A<0){A=B+A}for(;A<B;A++){if(this[A]===C){return A}}return -1}}if(!Array.prototype.lastIndexOf){Array.prototype.lastIndexOf=function(B,A){A=isNaN(A)?this.length:(A<0?this.length+A:A)+1;var C=this.slice(0,A).reverse().indexOf(B);return(C<0)?C:A-C-1}}Array.prototype.toArray=Array.prototype.clone;function $w(A){if(!Object.isString(A)){return[]}A=A.strip();return A?A.split(/\s+/):[]}if(Prototype.Browser.Opera){Array.prototype.concat=function(){var E=[];for(var B=0,C=this.length;B<C;B++){E.push(this[B])}for(var B=0,C=arguments.length;B<C;B++){if(Object.isArray(arguments[B])){for(var A=0,D=arguments[B].length;A<D;A++){E.push(arguments[B][A])}}else{E.push(arguments[B])}}return E}}Object.extend(Number.prototype,{toColorPart:function(){return this.toPaddedString(2,16)},succ:function(){return this+1},times:function(B,A){$R(0,this,true).each(B,A);return this},toPaddedString:function(C,B){var A=this.toString(B||10);return"0".times(C-A.length)+A},toJSON:function(){return isFinite(this)?this.toString():"null"}});$w("abs round ceil floor").each(function(A){Number.prototype[A]=Math[A].methodize()});function $H(A){return new Hash(A)}var Hash=Class.create(Enumerable,(function(){function A(B,C){if(Object.isUndefined(C)){return B}return B+"="+encodeURIComponent(String.interpret(C))}return{initialize:function(B){this._object=Object.isHash(B)?B.toObject():Object.clone(B)},_each:function(C){for(var B in this._object){var D=this._object[B],E=[B,D];E.key=B;E.value=D;C(E)}},set:function(B,C){return this._object[B]=C},get:function(B){if(this._object[B]!==Object.prototype[B]){return this._object[B]}},unset:function(B){var C=this._object[B];delete this._object[B];return C},toObject:function(){return Object.clone(this._object)},keys:function(){return this.pluck("key")},values:function(){return this.pluck("value")},index:function(C){var B=this.detect(function(D){return D.value===C});return B&&B.key},merge:function(B){return this.clone().update(B)},update:function(B){return new Hash(B).inject(this,function(C,D){C.set(D.key,D.value);return C})},toQueryString:function(){return this.inject([],function(D,E){var C=encodeURIComponent(E.key),B=E.value;if(B&&typeof B=="object"){if(Object.isArray(B)){return D.concat(B.map(A.curry(C)))}}else{D.push(A(C,B))}return D}).join("&")},inspect:function(){return"#<Hash:{"+this.map(function(B){return B.map(Object.inspect).join(": ")}).join(", ")+"}>"},toJSON:function(){return Object.toJSON(this.toObject())},clone:function(){return new Hash(this)}}})());Hash.prototype.toTemplateReplacements=Hash.prototype.toObject;Hash.from=$H;var ObjectRange=Class.create(Enumerable,{initialize:function(C,A,B){this.start=C;this.end=A;this.exclusive=B},_each:function(A){var B=this.start;while(this.include(B)){A(B);B=B.succ()}},include:function(A){if(A<this.start){return false}if(this.exclusive){return A<this.end}return A<=this.end}});var $R=function(C,A,B){return new ObjectRange(C,A,B)};var Ajax={getTransport:function(){return Try.these(function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new ActiveXObject("Microsoft.XMLHTTP")})||false},activeRequestCount:0};Ajax.Responders={responders:[],_each:function(A){this.responders._each(A)},register:function(A){if(!this.include(A)){this.responders.push(A)}},unregister:function(A){this.responders=this.responders.without(A)},dispatch:function(D,B,C,A){this.each(function(E){if(Object.isFunction(E[D])){try{E[D].apply(E,[B,C,A])}catch(F){}}})}};Object.extend(Ajax.Responders,Enumerable);Ajax.Responders.register({onCreate:function(){Ajax.activeRequestCount++},onComplete:function(){Ajax.activeRequestCount--}});Ajax.Base=Class.create({initialize:function(A){this.options={method:"post",asynchronous:true,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:"",evalJSON:true,evalJS:true};Object.extend(this.options,A||{});this.options.method=this.options.method.toLowerCase();if(Object.isString(this.options.parameters)){this.options.parameters=this.options.parameters.toQueryParams()}else{if(Object.isHash(this.options.parameters)){this.options.parameters=this.options.parameters.toObject()}}}});Ajax.Request=Class.create(Ajax.Base,{_complete:false,initialize:function($super,B,A){$super(A);this.transport=Ajax.getTransport();this.request(B)},request:function(B){this.url=B;this.method=this.options.method;var D=Object.clone(this.options.parameters);if(!["get","post"].include(this.method)){D._method=this.method;this.method="post"}this.parameters=D;if(D=Object.toQueryString(D)){if(this.method=="get"){this.url+=(this.url.include("?")?"&":"?")+D}else{if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){D+="&_="}}}try{var A=new Ajax.Response(this);if(this.options.onCreate){this.options.onCreate(A)}Ajax.Responders.dispatch("onCreate",this,A);this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous);if(this.options.asynchronous){this.respondToReadyState.bind(this).defer(1)}this.transport.onreadystatechange=this.onStateChange.bind(this);this.setRequestHeaders();this.body=this.method=="post"?(this.options.postBody||D):null;this.transport.send(this.body);if(!this.options.asynchronous&&this.transport.overrideMimeType){this.onStateChange()}}catch(C){this.dispatchException(C)}},onStateChange:function(){var A=this.transport.readyState;if(A>1&&!((A==4)&&this._complete)){this.respondToReadyState(this.transport.readyState)}},setRequestHeaders:function(){var E={"X-Requested-With":"XMLHttpRequest","X-Prototype-Version":Prototype.Version,Accept:"text/javascript, text/html, application/xml, text/xml, */*"};if(this.method=="post"){E["Content-type"]=this.options.contentType+(this.options.encoding?"; charset="+this.options.encoding:"");if(this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005){E.Connection="close"}}if(typeof this.options.requestHeaders=="object"){var C=this.options.requestHeaders;if(Object.isFunction(C.push)){for(var B=0,D=C.length;B<D;B+=2){E[C[B]]=C[B+1]}}else{$H(C).each(function(F){E[F.key]=F.value})}}for(var A in E){this.transport.setRequestHeader(A,E[A])}},success:function(){var A=this.getStatus();return !A||(A>=200&&A<300)},getStatus:function(){try{return this.transport.status||0}catch(A){return 0}},respondToReadyState:function(A){var C=Ajax.Request.Events[A],B=new Ajax.Response(this);if(C=="Complete"){try{this._complete=true;(this.options["on"+B.status]||this.options["on"+(this.success()?"Success":"Failure")]||Prototype.emptyFunction)(B,B.headerJSON)}catch(D){this.dispatchException(D)}var E=B.getHeader("Content-type");if(this.options.evalJS=="force"||(this.options.evalJS&&this.isSameOrigin()&&E&&E.match(/^\s*(text|application)\/(x-)?(java|ecma)script(;.*)?\s*$/i))){this.evalResponse()}}try{(this.options["on"+C]||Prototype.emptyFunction)(B,B.headerJSON);Ajax.Responders.dispatch("on"+C,this,B,B.headerJSON)}catch(D){this.dispatchException(D)}if(C=="Complete"){this.transport.onreadystatechange=Prototype.emptyFunction}},isSameOrigin:function(){var A=this.url.match(/^\s*https?:\/\/[^\/]*/);return !A||(A[0]=="#{protocol}//#{domain}#{port}".interpolate({protocol:location.protocol,domain:document.domain,port:location.port?":"+location.port:""}))},getHeader:function(A){try{return this.transport.getResponseHeader(A)||null}catch(B){return null}},evalResponse:function(){try{return eval((this.transport.responseText||"").unfilterJSON())}catch(e){this.dispatchException(e)}},dispatchException:function(A){(this.options.onException||Prototype.emptyFunction)(this,A);Ajax.Responders.dispatch("onException",this,A)}});Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"];Ajax.Response=Class.create({initialize:function(C){this.request=C;var D=this.transport=C.transport,A=this.readyState=D.readyState;if((A>2&&!Prototype.Browser.IE)||A==4){this.status=this.getStatus();this.statusText=this.getStatusText();this.responseText=String.interpret(D.responseText);this.headerJSON=this._getHeaderJSON()}if(A==4){var B=D.responseXML;this.responseXML=Object.isUndefined(B)?null:B;this.responseJSON=this._getResponseJSON()}},status:0,statusText:"",getStatus:Ajax.Request.prototype.getStatus,getStatusText:function(){try{return this.transport.statusText||""}catch(A){return""}},getHeader:Ajax.Request.prototype.getHeader,getAllHeaders:function(){try{return this.getAllResponseHeaders()}catch(A){return null}},getResponseHeader:function(A){return this.transport.getResponseHeader(A)},getAllResponseHeaders:function(){return this.transport.getAllResponseHeaders()},_getHeaderJSON:function(){var A=this.getHeader("X-JSON");if(!A){return null}A=decodeURIComponent(escape(A));try{return A.evalJSON(this.request.options.sanitizeJSON||!this.request.isSameOrigin())}catch(B){this.request.dispatchException(B)}},_getResponseJSON:function(){var A=this.request.options;if(!A.evalJSON||(A.evalJSON!="force"&&!(this.getHeader("Content-type")||"").include("application/json"))||this.responseText.blank()){return null}try{return this.responseText.evalJSON(A.sanitizeJSON||!this.request.isSameOrigin())}catch(B){this.request.dispatchException(B)}}});Ajax.Updater=Class.create(Ajax.Request,{initialize:function($super,A,C,B){this.container={success:(A.success||A),failure:(A.failure||(A.success?null:A))};B=Object.clone(B);var D=B.onComplete;B.onComplete=(function(E,F){this.updateContent(E.responseText);if(Object.isFunction(D)){D(E,F)}}).bind(this);$super(C,B)},updateContent:function(D){var C=this.container[this.success()?"success":"failure"],A=this.options;if(!A.evalScripts){D=D.stripScripts()}if(C=$(C)){if(A.insertion){if(Object.isString(A.insertion)){var B={};B[A.insertion]=D;C.insert(B)}else{A.insertion(C,D)}}else{C.update(D)}}}});Ajax.PeriodicalUpdater=Class.create(Ajax.Base,{initialize:function($super,A,C,B){$super(B);this.onComplete=this.options.onComplete;this.frequency=(this.options.frequency||2);this.decay=(this.options.decay||1);this.updater={};this.container=A;this.url=C;this.start()},start:function(){this.options.onComplete=this.updateComplete.bind(this);this.onTimerEvent()},stop:function(){this.updater.options.onComplete=undefined;clearTimeout(this.timer);(this.onComplete||Prototype.emptyFunction).apply(this,arguments)},updateComplete:function(A){if(this.options.decay){this.decay=(A.responseText==this.lastText?this.decay*this.options.decay:1);this.lastText=A.responseText}this.timer=this.onTimerEvent.bind(this).delay(this.decay*this.frequency)},onTimerEvent:function(){this.updater=new Ajax.Updater(this.container,this.url,this.options)}});function $(B){if(arguments.length>1){for(var A=0,D=[],C=arguments.length;A<C;A++){D.push($(arguments[A]))}return D}if(Object.isString(B)){B=document.getElementById(B)}return Element.extend(B)}if(Prototype.BrowserFeatures.XPath){document._getElementsByXPath=function(F,A){var C=[];var E=document.evaluate(F,$(A)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);for(var B=0,D=E.snapshotLength;B<D;B++){C.push(Element.extend(E.snapshotItem(B)))}return C}}if(!window.Node){var Node={}}if(!Node.ELEMENT_NODE){Object.extend(Node,{ELEMENT_NODE:1,ATTRIBUTE_NODE:2,TEXT_NODE:3,CDATA_SECTION_NODE:4,ENTITY_REFERENCE_NODE:5,ENTITY_NODE:6,PROCESSING_INSTRUCTION_NODE:7,COMMENT_NODE:8,DOCUMENT_NODE:9,DOCUMENT_TYPE_NODE:10,DOCUMENT_FRAGMENT_NODE:11,NOTATION_NODE:12})}(function(){var A=this.Element;this.Element=function(D,C){C=C||{};D=D.toLowerCase();var B=Element.cache;if(Prototype.Browser.IE&&C.name){D="<"+D+' name="'+C.name+'">';delete C.name;return Element.writeAttribute(document.createElement(D),C)}if(!B[D]){B[D]=Element.extend(document.createElement(D))}return Element.writeAttribute(B[D].cloneNode(false),C)};Object.extend(this.Element,A||{});if(A){this.Element.prototype=A.prototype}}).call(window);Element.cache={};Element.Methods={visible:function(A){return $(A).style.display!="none"},toggle:function(A){A=$(A);Element[Element.visible(A)?"hide":"show"](A);return A},hide:function(A){A=$(A);A.style.display="none";return A},show:function(A){A=$(A);A.style.display="";return A},remove:function(A){A=$(A);A.parentNode.removeChild(A);return A},update:function(A,B){A=$(A);if(B&&B.toElement){B=B.toElement()}if(Object.isElement(B)){return A.update().insert(B)}B=Object.toHTML(B);A.innerHTML=B.stripScripts();B.evalScripts.bind(B).defer();return A},replace:function(B,C){B=$(B);if(C&&C.toElement){C=C.toElement()}else{if(!Object.isElement(C)){C=Object.toHTML(C);var A=B.ownerDocument.createRange();A.selectNode(B);C.evalScripts.bind(C).defer();C=A.createContextualFragment(C.stripScripts())}}B.parentNode.replaceChild(C,B);return B},insert:function(C,E){C=$(C);if(Object.isString(E)||Object.isNumber(E)||Object.isElement(E)||(E&&(E.toElement||E.toHTML))){E={bottom:E}}var D,F,B,G;for(var A in E){D=E[A];A=A.toLowerCase();F=Element._insertionTranslations[A];if(D&&D.toElement){D=D.toElement()}if(Object.isElement(D)){F(C,D);continue}D=Object.toHTML(D);B=((A=="before"||A=="after")?C.parentNode:C).tagName.toUpperCase();G=Element._getContentFromAnonymousElement(B,D.stripScripts());if(A=="top"||A=="after"){G.reverse()}G.each(F.curry(C));D.evalScripts.bind(D).defer()}return C},wrap:function(B,C,A){B=$(B);if(Object.isElement(C)){$(C).writeAttribute(A||{})}else{if(Object.isString(C)){C=new Element(C,A)}else{C=new Element("div",C)}}if(B.parentNode){B.parentNode.replaceChild(C,B)}C.appendChild(B);return C},inspect:function(B){B=$(B);var A="<"+B.tagName.toLowerCase();$H({id:"id",className:"class"}).each(function(F){var E=F.first(),C=F.last();var D=(B[E]||"").toString();if(D){A+=" "+C+"="+D.inspect(true)}});return A+">"},recursivelyCollect:function(A,C){A=$(A);var B=[];while(A=A[C]){if(A.nodeType==1){B.push(Element.extend(A))}}return B},ancestors:function(A){return $(A).recursivelyCollect("parentNode")},descendants:function(A){return $(A).select("*")},firstDescendant:function(A){A=$(A).firstChild;while(A&&A.nodeType!=1){A=A.nextSibling}return $(A)},immediateDescendants:function(A){if(!(A=$(A).firstChild)){return[]}while(A&&A.nodeType!=1){A=A.nextSibling}if(A){return[A].concat($(A).nextSiblings())}return[]},previousSiblings:function(A){return $(A).recursivelyCollect("previousSibling")},nextSiblings:function(A){return $(A).recursivelyCollect("nextSibling")},siblings:function(A){A=$(A);return A.previousSiblings().reverse().concat(A.nextSiblings())},match:function(B,A){if(Object.isString(A)){A=new Selector(A)}return A.match($(B))},up:function(B,D,A){B=$(B);if(arguments.length==1){return $(B.parentNode)}var C=B.ancestors();return Object.isNumber(D)?C[D]:Selector.findElement(C,D,A)},down:function(B,C,A){B=$(B);if(arguments.length==1){return B.firstDescendant()}return Object.isNumber(C)?B.descendants()[C]:Element.select(B,C)[A||0]},previous:function(B,D,A){B=$(B);if(arguments.length==1){return $(Selector.handlers.previousElementSibling(B))}var C=B.previousSiblings();return Object.isNumber(D)?C[D]:Selector.findElement(C,D,A)},next:function(C,D,B){C=$(C);if(arguments.length==1){return $(Selector.handlers.nextElementSibling(C))}var A=C.nextSiblings();return Object.isNumber(D)?A[D]:Selector.findElement(A,D,B)},select:function(){var A=$A(arguments),B=$(A.shift());return Selector.findChildElements(B,A)},adjacent:function(){var A=$A(arguments),B=$(A.shift());return Selector.findChildElements(B.parentNode,A).without(B)},identify:function(B){B=$(B);var C=B.readAttribute("id"),A=arguments.callee;if(C){return C}do{C="anonymous_element_"+A.counter++}while($(C));B.writeAttribute("id",C);return C},readAttribute:function(C,A){C=$(C);if(Prototype.Browser.IE){var B=Element._attributeTranslations.read;if(B.values[A]){return B.values[A](C,A)}if(B.names[A]){A=B.names[A]}if(A.include(":")){return(!C.attributes||!C.attributes[A])?null:C.attributes[A].value}}return C.getAttribute(A)},writeAttribute:function(E,C,F){E=$(E);var B={},D=Element._attributeTranslations.write;if(typeof C=="object"){B=C}else{B[C]=Object.isUndefined(F)?true:F}for(var A in B){C=D.names[A]||A;F=B[A];if(D.values[A]){C=D.values[A](E,F)}if(F===false||F===null){E.removeAttribute(C)}else{if(F===true){E.setAttribute(C,C)}else{E.setAttribute(C,F)}}}return E},getHeight:function(A){return $(A).getDimensions().height},getWidth:function(A){return $(A).getDimensions().width},classNames:function(A){return new Element.ClassNames(A)},hasClassName:function(A,B){if(!(A=$(A))){return }var C=A.className;return(C.length>0&&(C==B||new RegExp("(^|\\s)"+B+"(\\s|$)").test(C)))},addClassName:function(A,B){if(!(A=$(A))){return }if(!A.hasClassName(B)){A.className+=(A.className?" ":"")+B}return A},removeClassName:function(A,B){if(!(A=$(A))){return }A.className=A.className.replace(new RegExp("(^|\\s+)"+B+"(\\s+|$)")," ").strip();return A},toggleClassName:function(A,B){if(!(A=$(A))){return }return A[A.hasClassName(B)?"removeClassName":"addClassName"](B)},cleanWhitespace:function(B){B=$(B);var C=B.firstChild;while(C){var A=C.nextSibling;if(C.nodeType==3&&!/\S/.test(C.nodeValue)){B.removeChild(C)}C=A}return B},empty:function(A){return $(A).innerHTML.blank()},descendantOf:function(B,A){B=$(B),A=$(A);if(B.compareDocumentPosition){return(B.compareDocumentPosition(A)&8)===8}if(A.contains){return A.contains(B)&&A!==B}while(B=B.parentNode){if(B==A){return true}}return false},scrollTo:function(A){A=$(A);var B=A.cumulativeOffset();window.scrollTo(B[0],B[1]);return A},getStyle:function(B,C){B=$(B);C=C=="float"?"cssFloat":C.camelize();var D=B.style[C];if(!D||D=="auto"){var A=document.defaultView.getComputedStyle(B,null);D=A?A[C]:null}if(C=="opacity"){return D?parseFloat(D):1}return D=="auto"?null:D},getOpacity:function(A){return $(A).getStyle("opacity")},setStyle:function(B,C){B=$(B);var E=B.style,A;if(Object.isString(C)){B.style.cssText+=";"+C;return C.include("opacity")?B.setOpacity(C.match(/opacity:\s*(\d?\.?\d*)/)[1]):B}for(var D in C){if(D=="opacity"){B.setOpacity(C[D])}else{E[(D=="float"||D=="cssFloat")?(Object.isUndefined(E.styleFloat)?"cssFloat":"styleFloat"):D]=C[D]}}return B},setOpacity:function(A,B){A=$(A);A.style.opacity=(B==1||B==="")?"":(B<0.00001)?0:B;return A},getDimensions:function(C){C=$(C);var G=C.getStyle("display");if(G!="none"&&G!=null){return{width:C.offsetWidth,height:C.offsetHeight}}var B=C.style;var F=B.visibility;var D=B.position;var A=B.display;B.visibility="hidden";B.position="absolute";B.display="block";var H=C.clientWidth;var E=C.clientHeight;B.display=A;B.position=D;B.visibility=F;return{width:H,height:E}},makePositioned:function(A){A=$(A);var B=Element.getStyle(A,"position");if(B=="static"||!B){A._madePositioned=true;A.style.position="relative";if(Prototype.Browser.Opera){A.style.top=0;A.style.left=0}}return A},undoPositioned:function(A){A=$(A);if(A._madePositioned){A._madePositioned=undefined;A.style.position=A.style.top=A.style.left=A.style.bottom=A.style.right=""}return A},makeClipping:function(A){A=$(A);if(A._overflow){return A}A._overflow=Element.getStyle(A,"overflow")||"auto";if(A._overflow!=="hidden"){A.style.overflow="hidden"}return A},undoClipping:function(A){A=$(A);if(!A._overflow){return A}A.style.overflow=A._overflow=="auto"?"":A._overflow;A._overflow=null;return A},cumulativeOffset:function(B){var A=0,C=0;do{A+=B.offsetTop||0;C+=B.offsetLeft||0;B=B.offsetParent}while(B);return Element._returnOffset(C,A)},positionedOffset:function(B){var A=0,D=0;do{A+=B.offsetTop||0;D+=B.offsetLeft||0;B=B.offsetParent;if(B){if(B.tagName.toUpperCase()=="BODY"){break}var C=Element.getStyle(B,"position");if(C!=="static"){break}}}while(B);return Element._returnOffset(D,A)},absolutize:function(B){B=$(B);if(B.getStyle("position")=="absolute"){return B}var D=B.positionedOffset();var F=D[1];var E=D[0];var C=B.clientWidth;var A=B.clientHeight;B._originalLeft=E-parseFloat(B.style.left||0);B._originalTop=F-parseFloat(B.style.top||0);B._originalWidth=B.style.width;B._originalHeight=B.style.height;B.style.position="absolute";B.style.top=F+"px";B.style.left=E+"px";B.style.width=C+"px";B.style.height=A+"px";return B},relativize:function(A){A=$(A);if(A.getStyle("position")=="relative"){return A}A.style.position="relative";var C=parseFloat(A.style.top||0)-(A._originalTop||0);var B=parseFloat(A.style.left||0)-(A._originalLeft||0);A.style.top=C+"px";A.style.left=B+"px";A.style.height=A._originalHeight;A.style.width=A._originalWidth;return A},cumulativeScrollOffset:function(B){var A=0,C=0;do{A+=B.scrollTop||0;C+=B.scrollLeft||0;B=B.parentNode}while(B);return Element._returnOffset(C,A)},getOffsetParent:function(A){if(A.offsetParent){return $(A.offsetParent)}if(A==document.body){return $(A)}while((A=A.parentNode)&&A!=document.body){if(Element.getStyle(A,"position")!="static"){return $(A)}}return $(document.body)},viewportOffset:function(D){var A=0,C=0;var B=D;do{A+=B.offsetTop||0;C+=B.offsetLeft||0;if(B.offsetParent==document.body&&Element.getStyle(B,"position")=="absolute"){break}}while(B=B.offsetParent);B=D;do{if(!Prototype.Browser.Opera||(B.tagName&&(B.tagName.toUpperCase()=="BODY"))){A-=B.scrollTop||0;C-=B.scrollLeft||0}}while(B=B.parentNode);return Element._returnOffset(C,A)},clonePosition:function(B,D){var A=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});D=$(D);var E=D.viewportOffset();B=$(B);var F=[0,0];var C=null;if(Element.getStyle(B,"position")=="absolute"){C=B.getOffsetParent();F=C.viewportOffset()}if(C==document.body){F[0]-=document.body.offsetLeft;F[1]-=document.body.offsetTop}if(A.setLeft){B.style.left=(E[0]-F[0]+A.offsetLeft)+"px"}if(A.setTop){B.style.top=(E[1]-F[1]+A.offsetTop)+"px"}if(A.setWidth){B.style.width=D.offsetWidth+"px"}if(A.setHeight){B.style.height=D.offsetHeight+"px"}return B}};Element.Methods.identify.counter=1;Object.extend(Element.Methods,{getElementsBySelector:Element.Methods.select,childElements:Element.Methods.immediateDescendants});Element._attributeTranslations={write:{names:{className:"class",htmlFor:"for"},values:{}}};if(Prototype.Browser.Opera){Element.Methods.getStyle=Element.Methods.getStyle.wrap(function(D,B,C){switch(C){case"left":case"top":case"right":case"bottom":if(D(B,"position")==="static"){return null}case"height":case"width":if(!Element.visible(B)){return null}var E=parseInt(D(B,C),10);if(E!==B["offset"+C.capitalize()]){return E+"px"}var A;if(C==="height"){A=["border-top-width","padding-top","padding-bottom","border-bottom-width"]}else{A=["border-left-width","padding-left","padding-right","border-right-width"]}return A.inject(E,function(F,G){var H=D(B,G);return H===null?F:F-parseInt(H,10)})+"px";default:return D(B,C)}});Element.Methods.readAttribute=Element.Methods.readAttribute.wrap(function(C,A,B){if(B==="title"){return A.title}return C(A,B)})}else{if(Prototype.Browser.IE){Element.Methods.getOffsetParent=Element.Methods.getOffsetParent.wrap(function(C,B){B=$(B);try{B.offsetParent}catch(E){return $(document.body)}var A=B.getStyle("position");if(A!=="static"){return C(B)}B.setStyle({position:"relative"});var D=C(B);B.setStyle({position:A});return D});$w("positionedOffset viewportOffset").each(function(A){Element.Methods[A]=Element.Methods[A].wrap(function(E,C){C=$(C);try{C.offsetParent}catch(G){return Element._returnOffset(0,0)}var B=C.getStyle("position");if(B!=="static"){return E(C)}var D=C.getOffsetParent();if(D&&D.getStyle("position")==="fixed"){D.setStyle({zoom:1})}C.setStyle({position:"relative"});var F=E(C);C.setStyle({position:B});return F})});Element.Methods.cumulativeOffset=Element.Methods.cumulativeOffset.wrap(function(B,A){try{A.offsetParent}catch(C){return Element._returnOffset(0,0)}return B(A)});Element.Methods.getStyle=function(A,B){A=$(A);B=(B=="float"||B=="cssFloat")?"styleFloat":B.camelize();var C=A.style[B];if(!C&&A.currentStyle){C=A.currentStyle[B]}if(B=="opacity"){if(C=(A.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/)){if(C[1]){return parseFloat(C[1])/100}}return 1}if(C=="auto"){if((B=="width"||B=="height")&&(A.getStyle("display")!="none")){return A["offset"+B.capitalize()]+"px"}return null}return C};Element.Methods.setOpacity=function(B,E){function F(G){return G.replace(/alpha\([^\)]*\)/gi,"")}B=$(B);var A=B.currentStyle;if((A&&!A.hasLayout)||(!A&&B.style.zoom=="normal")){B.style.zoom=1}var D=B.getStyle("filter"),C=B.style;if(E==1||E===""){(D=F(D))?C.filter=D:C.removeAttribute("filter");return B}else{if(E<0.00001){E=0}}C.filter=F(D)+"alpha(opacity="+(E*100)+")";return B};Element._attributeTranslations={read:{names:{"class":"className","for":"htmlFor"},values:{_getAttr:function(A,B){return A.getAttribute(B,2)},_getAttrNode:function(A,C){var B=A.getAttributeNode(C);return B?B.value:""},_getEv:function(A,B){B=A.getAttribute(B);return B?B.toString().slice(23,-2):null},_flag:function(A,B){return $(A).hasAttribute(B)?B:null},style:function(A){return A.style.cssText.toLowerCase()},title:function(A){return A.title}}}};Element._attributeTranslations.write={names:Object.extend({cellpadding:"cellPadding",cellspacing:"cellSpacing"},Element._attributeTranslations.read.names),values:{checked:function(A,B){A.checked=!!B},style:function(A,B){A.style.cssText=B?B:""}}};Element._attributeTranslations.has={};$w("colSpan rowSpan vAlign dateTime accessKey tabIndex encType maxLength readOnly longDesc frameBorder").each(function(A){Element._attributeTranslations.write.names[A.toLowerCase()]=A;Element._attributeTranslations.has[A.toLowerCase()]=A});(function(A){Object.extend(A,{href:A._getAttr,src:A._getAttr,type:A._getAttr,action:A._getAttrNode,disabled:A._flag,checked:A._flag,readonly:A._flag,multiple:A._flag,onload:A._getEv,onunload:A._getEv,onclick:A._getEv,ondblclick:A._getEv,onmousedown:A._getEv,onmouseup:A._getEv,onmouseover:A._getEv,onmousemove:A._getEv,onmouseout:A._getEv,onfocus:A._getEv,onblur:A._getEv,onkeypress:A._getEv,onkeydown:A._getEv,onkeyup:A._getEv,onsubmit:A._getEv,onreset:A._getEv,onselect:A._getEv,onchange:A._getEv})})(Element._attributeTranslations.read.values)}else{if(Prototype.Browser.Gecko&&/rv:1\.8\.0/.test(navigator.userAgent)){Element.Methods.setOpacity=function(A,B){A=$(A);A.style.opacity=(B==1)?0.999999:(B==="")?"":(B<0.00001)?0:B;return A}}else{if(Prototype.Browser.WebKit){Element.Methods.setOpacity=function(A,B){A=$(A);A.style.opacity=(B==1||B==="")?"":(B<0.00001)?0:B;if(B==1){if(A.tagName.toUpperCase()=="IMG"&&A.width){A.width++;A.width--}else{try{var D=document.createTextNode(" ");A.appendChild(D);A.removeChild(D)}catch(C){}}}return A};Element.Methods.cumulativeOffset=function(B){var A=0,C=0;do{A+=B.offsetTop||0;C+=B.offsetLeft||0;if(B.offsetParent==document.body){if(Element.getStyle(B,"position")=="absolute"){break}}B=B.offsetParent}while(B);return Element._returnOffset(C,A)}}}}}if(Prototype.Browser.IE||Prototype.Browser.Opera){Element.Methods.update=function(B,C){B=$(B);if(C&&C.toElement){C=C.toElement()}if(Object.isElement(C)){return B.update().insert(C)}C=Object.toHTML(C);var A=B.tagName.toUpperCase();if(A in Element._insertionTranslations.tags){$A(B.childNodes).each(function(D){B.removeChild(D)});Element._getContentFromAnonymousElement(A,C.stripScripts()).each(function(D){B.appendChild(D)})}else{B.innerHTML=C.stripScripts()}C.evalScripts.bind(C).defer();return B}}if("outerHTML" in document.createElement("div")){Element.Methods.replace=function(C,E){C=$(C);if(E&&E.toElement){E=E.toElement()}if(Object.isElement(E)){C.parentNode.replaceChild(E,C);return C}E=Object.toHTML(E);var D=C.parentNode,B=D.tagName.toUpperCase();if(Element._insertionTranslations.tags[B]){var F=C.next();var A=Element._getContentFromAnonymousElement(B,E.stripScripts());D.removeChild(C);if(F){A.each(function(G){D.insertBefore(G,F)})}else{A.each(function(G){D.appendChild(G)})}}else{C.outerHTML=E.stripScripts()}E.evalScripts.bind(E).defer();return C}}Element._returnOffset=function(B,C){var A=[B,C];A.left=B;A.top=C;return A};Element._getContentFromAnonymousElement=function(C,B){var D=new Element("div"),A=Element._insertionTranslations.tags[C];if(A){D.innerHTML=A[0]+B+A[1];A[2].times(function(){D=D.firstChild})}else{D.innerHTML=B}return $A(D.childNodes)};Element._insertionTranslations={before:function(A,B){A.parentNode.insertBefore(B,A)},top:function(A,B){A.insertBefore(B,A.firstChild)},bottom:function(A,B){A.appendChild(B)},after:function(A,B){A.parentNode.insertBefore(B,A.nextSibling)},tags:{TABLE:["<table>","</table>",1],TBODY:["<table><tbody>","</tbody></table>",2],TR:["<table><tbody><tr>","</tr></tbody></table>",3],TD:["<table><tbody><tr><td>","</td></tr></tbody></table>",4],SELECT:["<select>","</select>",1]}};(function(){Object.extend(this.tags,{THEAD:this.tags.TBODY,TFOOT:this.tags.TBODY,TH:this.tags.TD})}).call(Element._insertionTranslations);Element.Methods.Simulated={hasAttribute:function(A,C){C=Element._attributeTranslations.has[C]||C;var B=$(A).getAttributeNode(C);return !!(B&&B.specified)}};Element.Methods.ByTag={};Object.extend(Element,Element.Methods);if(!Prototype.BrowserFeatures.ElementExtensions&&document.createElement("div")["__proto__"]){window.HTMLElement={};window.HTMLElement.prototype=document.createElement("div")["__proto__"];Prototype.BrowserFeatures.ElementExtensions=true}Element.extend=(function(){if(Prototype.BrowserFeatures.SpecificElementExtensions){return Prototype.K}var A={},B=Element.Methods.ByTag;var C=Object.extend(function(F){if(!F||F._extendedByPrototype||F.nodeType!=1||F==window){return F}var D=Object.clone(A),E=F.tagName.toUpperCase(),H,G;if(B[E]){Object.extend(D,B[E])}for(H in D){G=D[H];if(Object.isFunction(G)&&!(H in F)){F[H]=G.methodize()}}F._extendedByPrototype=Prototype.emptyFunction;return F},{refresh:function(){if(!Prototype.BrowserFeatures.ElementExtensions){Object.extend(A,Element.Methods);Object.extend(A,Element.Methods.Simulated)}}});C.refresh();return C})();Element.hasAttribute=function(A,B){if(A.hasAttribute){return A.hasAttribute(B)}return Element.Methods.Simulated.hasAttribute(A,B)};Element.addMethods=function(C){var I=Prototype.BrowserFeatures,D=Element.Methods.ByTag;if(!C){Object.extend(Form,Form.Methods);Object.extend(Form.Element,Form.Element.Methods);Object.extend(Element.Methods.ByTag,{FORM:Object.clone(Form.Methods),INPUT:Object.clone(Form.Element.Methods),SELECT:Object.clone(Form.Element.Methods),TEXTAREA:Object.clone(Form.Element.Methods)})}if(arguments.length==2){var B=C;C=arguments[1]}if(!B){Object.extend(Element.Methods,C||{})}else{if(Object.isArray(B)){B.each(H)}else{H(B)}}function H(F){F=F.toUpperCase();if(!Element.Methods.ByTag[F]){Element.Methods.ByTag[F]={}}Object.extend(Element.Methods.ByTag[F],C)}function A(L,K,F){F=F||false;for(var N in L){var M=L[N];if(!Object.isFunction(M)){continue}if(!F||!(N in K)){K[N]=M.methodize()}}}function E(L){var F;var K={OPTGROUP:"OptGroup",TEXTAREA:"TextArea",P:"Paragraph",FIELDSET:"FieldSet",UL:"UList",OL:"OList",DL:"DList",DIR:"Directory",H1:"Heading",H2:"Heading",H3:"Heading",H4:"Heading",H5:"Heading",H6:"Heading",Q:"Quote",INS:"Mod",DEL:"Mod",A:"Anchor",IMG:"Image",CAPTION:"TableCaption",COL:"TableCol",COLGROUP:"TableCol",THEAD:"TableSection",TFOOT:"TableSection",TBODY:"TableSection",TR:"TableRow",TH:"TableCell",TD:"TableCell",FRAMESET:"FrameSet",IFRAME:"IFrame"};if(K[L]){F="HTML"+K[L]+"Element"}if(window[F]){return window[F]}F="HTML"+L+"Element";if(window[F]){return window[F]}F="HTML"+L.capitalize()+"Element";if(window[F]){return window[F]}window[F]={};window[F].prototype=document.createElement(L)["__proto__"];return window[F]}if(I.ElementExtensions){A(Element.Methods,HTMLElement.prototype);A(Element.Methods.Simulated,HTMLElement.prototype,true)}if(I.SpecificElementExtensions){for(var J in Element.Methods.ByTag){var G=E(J);if(Object.isUndefined(G)){continue}A(D[J],G.prototype)}}Object.extend(Element,Element.Methods);delete Element.ByTag;if(Element.extend.refresh){Element.extend.refresh()}Element.cache={}};document.viewport={getDimensions:function(){var A={},C=Prototype.Browser;$w("width height").each(function(E){var B=E.capitalize();if(C.WebKit&&!document.evaluate){A[E]=self["inner"+B]}else{if(C.Opera&&parseFloat(window.opera.version())<9.5){A[E]=document.body["client"+B]}else{A[E]=document.documentElement["client"+B]}}});return A},getWidth:function(){return this.getDimensions().width},getHeight:function(){return this.getDimensions().height},getScrollOffsets:function(){return Element._returnOffset(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft,window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)}};var Selector=Class.create({initialize:function(A){this.expression=A.strip();if(this.shouldUseSelectorsAPI()){this.mode="selectorsAPI"}else{if(this.shouldUseXPath()){this.mode="xpath";this.compileXPathMatcher()}else{this.mode="normal";this.compileMatcher()}}},shouldUseXPath:function(){if(!Prototype.BrowserFeatures.XPath){return false}var A=this.expression;if(Prototype.Browser.WebKit&&(A.include("-of-type")||A.include(":empty"))){return false}if((/(\[[\w-]*?:|:checked)/).test(A)){return false}return true},shouldUseSelectorsAPI:function(){if(!Prototype.BrowserFeatures.SelectorsAPI){return false}if(!Selector._div){Selector._div=new Element("div")}try{Selector._div.querySelector(this.expression)}catch(A){return false}return true},compileMatcher:function(){var e=this.expression,ps=Selector.patterns,h=Selector.handlers,c=Selector.criteria,le,p,m;if(Selector._cache[e]){this.matcher=Selector._cache[e];return }this.matcher=["this.matcher = function(root) {","var r = root, h = Selector.handlers, c = false, n;"];while(e&&le!=e&&(/\S/).test(e)){le=e;for(var i in ps){p=ps[i];if(m=e.match(p)){this.matcher.push(Object.isFunction(c[i])?c[i](m):new Template(c[i]).evaluate(m));e=e.replace(m[0],"");break}}}this.matcher.push("return h.unique(n);\n}");eval(this.matcher.join("\n"));Selector._cache[this.expression]=this.matcher},compileXPathMatcher:function(){var E=this.expression,F=Selector.patterns,B=Selector.xpath,D,A;if(Selector._cache[E]){this.xpath=Selector._cache[E];return }this.matcher=[".//*"];while(E&&D!=E&&(/\S/).test(E)){D=E;for(var C in F){if(A=E.match(F[C])){this.matcher.push(Object.isFunction(B[C])?B[C](A):new Template(B[C]).evaluate(A));E=E.replace(A[0],"");break}}}this.xpath=this.matcher.join("");Selector._cache[this.expression]=this.xpath},findElements:function(A){A=A||document;var C=this.expression,B;switch(this.mode){case"selectorsAPI":if(A!==document){var D=A.id,E=$(A).identify();C="#"+E+" "+C}B=$A(A.querySelectorAll(C)).map(Element.extend);A.id=D;return B;case"xpath":return document._getElementsByXPath(this.xpath,A);default:return this.matcher(A)}},match:function(H){this.tokens=[];var L=this.expression,A=Selector.patterns,E=Selector.assertions;var B,D,F;while(L&&B!==L&&(/\S/).test(L)){B=L;for(var I in A){D=A[I];if(F=L.match(D)){if(E[I]){this.tokens.push([I,Object.clone(F)]);L=L.replace(F[0],"")}else{return this.findElements(document).include(H)}}}}var K=true,C,J;for(var I=0,G;G=this.tokens[I];I++){C=G[0],J=G[1];if(!Selector.assertions[C](H,J)){K=false;break}}return K},toString:function(){return this.expression},inspect:function(){return"#<Selector:"+this.expression.inspect()+">"}});Object.extend(Selector,{_cache:{},xpath:{descendant:"//*",child:"/*",adjacent:"/following-sibling::*[1]",laterSibling:"/following-sibling::*",tagName:function(A){if(A[1]=="*"){return""}return"[local-name()='"+A[1].toLowerCase()+"' or local-name()='"+A[1].toUpperCase()+"']"},className:"[contains(concat(' ', @class, ' '), ' #{1} ')]",id:"[@id='#{1}']",attrPresence:function(A){A[1]=A[1].toLowerCase();return new Template("[@#{1}]").evaluate(A)},attr:function(A){A[1]=A[1].toLowerCase();A[3]=A[5]||A[6];return new Template(Selector.xpath.operators[A[2]]).evaluate(A)},pseudo:function(A){var B=Selector.xpath.pseudos[A[1]];if(!B){return""}if(Object.isFunction(B)){return B(A)}return new Template(Selector.xpath.pseudos[A[1]]).evaluate(A)},operators:{"=":"[@#{1}='#{3}']","!=":"[@#{1}!='#{3}']","^=":"[starts-with(@#{1}, '#{3}')]","$=":"[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']","*=":"[contains(@#{1}, '#{3}')]","~=":"[contains(concat(' ', @#{1}, ' '), ' #{3} ')]","|=":"[contains(concat('-', @#{1}, '-'), '-#{3}-')]"},pseudos:{"first-child":"[not(preceding-sibling::*)]","last-child":"[not(following-sibling::*)]","only-child":"[not(preceding-sibling::* or following-sibling::*)]",empty:"[count(*) = 0 and (count(text()) = 0)]",checked:"[@checked]",disabled:"[(@disabled) and (@type!='hidden')]",enabled:"[not(@disabled) and (@type!='hidden')]",not:function(B){var H=B[6],G=Selector.patterns,A=Selector.xpath,E,C;var F=[];while(H&&E!=H&&(/\S/).test(H)){E=H;for(var D in G){if(B=H.match(G[D])){C=Object.isFunction(A[D])?A[D](B):new Template(A[D]).evaluate(B);F.push("("+C.substring(1,C.length-1)+")");H=H.replace(B[0],"");break}}}return"[not("+F.join(" and ")+")]"},"nth-child":function(A){return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ",A)},"nth-last-child":function(A){return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ",A)},"nth-of-type":function(A){return Selector.xpath.pseudos.nth("position() ",A)},"nth-last-of-type":function(A){return Selector.xpath.pseudos.nth("(last() + 1 - position()) ",A)},"first-of-type":function(A){A[6]="1";return Selector.xpath.pseudos["nth-of-type"](A)},"last-of-type":function(A){A[6]="1";return Selector.xpath.pseudos["nth-last-of-type"](A)},"only-of-type":function(A){var B=Selector.xpath.pseudos;return B["first-of-type"](A)+B["last-of-type"](A)},nth:function(E,C){var F,G=C[6],B;if(G=="even"){G="2n+0"}if(G=="odd"){G="2n+1"}if(F=G.match(/^(\d+)$/)){return"["+E+"= "+F[1]+"]"}if(F=G.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(F[1]=="-"){F[1]=-1}var D=F[1]?Number(F[1]):1;var A=F[2]?Number(F[2]):0;B="[((#{fragment} - #{b}) mod #{a} = 0) and ((#{fragment} - #{b}) div #{a} >= 0)]";return new Template(B).evaluate({fragment:E,a:D,b:A})}}}},criteria:{tagName:'n = h.tagName(n, r, "#{1}", c);      c = false;',className:'n = h.className(n, r, "#{1}", c);    c = false;',id:'n = h.id(n, r, "#{1}", c);           c = false;',attrPresence:'n = h.attrPresence(n, r, "#{1}", c); c = false;',attr:function(A){A[3]=(A[5]||A[6]);return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}", c); c = false;').evaluate(A)},pseudo:function(A){if(A[6]){A[6]=A[6].replace(/"/g,'\\"')}return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(A)},descendant:'c = "descendant";',child:'c = "child";',adjacent:'c = "adjacent";',laterSibling:'c = "laterSibling";'},patterns:{laterSibling:/^\s*~\s*/,child:/^\s*>\s*/,adjacent:/^\s*\+\s*/,descendant:/^\s/,tagName:/^\s*(\*|[\w\-]+)(\b|$)?/,id:/^#([\w\-\*]+)(\b|$)/,className:/^\.([\w\-\*]+)(\b|$)/,pseudo:/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|(?=\s|[:+~>]))/,attrPresence:/^\[((?:[\w]+:)?[\w]+)\]/,attr:/\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\4]*?)\4|([^'"][^\]]*?)))?\]/},assertions:{tagName:function(A,B){return B[1].toUpperCase()==A.tagName.toUpperCase()},className:function(A,B){return Element.hasClassName(A,B[1])},id:function(A,B){return A.id===B[1]},attrPresence:function(A,B){return Element.hasAttribute(A,B[1])},attr:function(B,C){var A=Element.readAttribute(B,C[1]);return A&&Selector.operators[C[2]](A,C[5]||C[6])}},handlers:{concat:function(B,A){for(var C=0,D;D=A[C];C++){B.push(D)}return B},mark:function(A){var D=Prototype.emptyFunction;for(var B=0,C;C=A[B];B++){C._countedByPrototype=D}return A},unmark:function(A){for(var B=0,C;C=A[B];B++){C._countedByPrototype=undefined}return A},index:function(A,D,G){A._countedByPrototype=Prototype.emptyFunction;if(D){for(var B=A.childNodes,E=B.length-1,C=1;E>=0;E--){var F=B[E];if(F.nodeType==1&&(!G||F._countedByPrototype)){F.nodeIndex=C++}}}else{for(var E=0,C=1,B=A.childNodes;F=B[E];E++){if(F.nodeType==1&&(!G||F._countedByPrototype)){F.nodeIndex=C++}}}},unique:function(B){if(B.length==0){return B}var D=[],E;for(var C=0,A=B.length;C<A;C++){if(!(E=B[C])._countedByPrototype){E._countedByPrototype=Prototype.emptyFunction;D.push(Element.extend(E))}}return Selector.handlers.unmark(D)},descendant:function(A){var D=Selector.handlers;for(var C=0,B=[],E;E=A[C];C++){D.concat(B,E.getElementsByTagName("*"))}return B},child:function(A){var E=Selector.handlers;for(var D=0,C=[],F;F=A[D];D++){for(var B=0,G;G=F.childNodes[B];B++){if(G.nodeType==1&&G.tagName!="!"){C.push(G)}}}return C},adjacent:function(A){for(var C=0,B=[],E;E=A[C];C++){var D=this.nextElementSibling(E);if(D){B.push(D)}}return B},laterSibling:function(A){var D=Selector.handlers;for(var C=0,B=[],E;E=A[C];C++){D.concat(B,Element.nextSiblings(E))}return B},nextElementSibling:function(A){while(A=A.nextSibling){if(A.nodeType==1){return A}}return null},previousElementSibling:function(A){while(A=A.previousSibling){if(A.nodeType==1){return A}}return null},tagName:function(A,H,C,B){var I=C.toUpperCase();var E=[],G=Selector.handlers;if(A){if(B){if(B=="descendant"){for(var F=0,D;D=A[F];F++){G.concat(E,D.getElementsByTagName(C))}return E}else{A=this[B](A)}if(C=="*"){return A}}for(var F=0,D;D=A[F];F++){if(D.tagName.toUpperCase()===I){E.push(D)}}return E}else{return H.getElementsByTagName(C)}},id:function(B,A,H,F){var G=$(H),D=Selector.handlers;if(!G){return[]}if(!B&&A==document){return[G]}if(B){if(F){if(F=="child"){for(var C=0,E;E=B[C];C++){if(G.parentNode==E){return[G]}}}else{if(F=="descendant"){for(var C=0,E;E=B[C];C++){if(Element.descendantOf(G,E)){return[G]}}}else{if(F=="adjacent"){for(var C=0,E;E=B[C];C++){if(Selector.handlers.previousElementSibling(G)==E){return[G]}}}else{B=D[F](B)}}}}for(var C=0,E;E=B[C];C++){if(E==G){return[G]}}return[]}return(G&&Element.descendantOf(G,A))?[G]:[]},className:function(B,A,C,D){if(B&&D){B=this[D](B)}return Selector.handlers.byClassName(B,A,C)},byClassName:function(C,B,F){if(!C){C=Selector.handlers.descendant([B])}var H=" "+F+" ";for(var E=0,D=[],G,A;G=C[E];E++){A=G.className;if(A.length==0){continue}if(A==F||(" "+A+" ").include(H)){D.push(G)}}return D},attrPresence:function(C,B,A,G){if(!C){C=B.getElementsByTagName("*")}if(C&&G){C=this[G](C)}var E=[];for(var D=0,F;F=C[D];D++){if(Element.hasAttribute(F,A)){E.push(F)}}return E},attr:function(A,I,H,J,C,B){if(!A){A=I.getElementsByTagName("*")}if(A&&B){A=this[B](A)}var K=Selector.operators[C],F=[];for(var E=0,D;D=A[E];E++){var G=Element.readAttribute(D,H);if(G===null){continue}if(K(G,J)){F.push(D)}}return F},pseudo:function(B,C,E,A,D){if(B&&D){B=this[D](B)}if(!B){B=A.getElementsByTagName("*")}return Selector.pseudos[C](B,E,A)}},pseudos:{"first-child":function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(Selector.handlers.previousElementSibling(E)){continue}C.push(E)}return C},"last-child":function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(Selector.handlers.nextElementSibling(E)){continue}C.push(E)}return C},"only-child":function(B,G,A){var E=Selector.handlers;for(var D=0,C=[],F;F=B[D];D++){if(!E.previousElementSibling(F)&&!E.nextElementSibling(F)){C.push(F)}}return C},"nth-child":function(B,C,A){return Selector.pseudos.nth(B,C,A)},"nth-last-child":function(B,C,A){return Selector.pseudos.nth(B,C,A,true)},"nth-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,false,true)},"nth-last-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,true,true)},"first-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,false,true)},"last-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,true,true)},"only-of-type":function(B,D,A){var C=Selector.pseudos;return C["last-of-type"](C["first-of-type"](B,D,A),D,A)},getIndices:function(B,A,C){if(B==0){return A>0?[A]:[]}return $R(1,C).inject([],function(D,E){if(0==(E-A)%B&&(E-A)/B>=0){D.push(E)}return D})},nth:function(A,L,N,K,C){if(A.length==0){return[]}if(L=="even"){L="2n+0"}if(L=="odd"){L="2n+1"}var J=Selector.handlers,I=[],B=[],E;J.mark(A);for(var H=0,D;D=A[H];H++){if(!D.parentNode._countedByPrototype){J.index(D.parentNode,K,C);B.push(D.parentNode)}}if(L.match(/^\d+$/)){L=Number(L);for(var H=0,D;D=A[H];H++){if(D.nodeIndex==L){I.push(D)}}}else{if(E=L.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(E[1]=="-"){E[1]=-1}var O=E[1]?Number(E[1]):1;var M=E[2]?Number(E[2]):0;var P=Selector.pseudos.getIndices(O,M,A.length);for(var H=0,D,F=P.length;D=A[H];H++){for(var G=0;G<F;G++){if(D.nodeIndex==P[G]){I.push(D)}}}}}J.unmark(A);J.unmark(B);return I},empty:function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(E.tagName=="!"||E.firstChild){continue}C.push(E)}return C},not:function(A,D,I){var G=Selector.handlers,J,C;var H=new Selector(D).findElements(I);G.mark(H);for(var F=0,E=[],B;B=A[F];F++){if(!B._countedByPrototype){E.push(B)}}G.unmark(H);return E},enabled:function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(!E.disabled&&(!E.type||E.type!=="hidden")){C.push(E)}}return C},disabled:function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(E.disabled){C.push(E)}}return C},checked:function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(E.checked){C.push(E)}}return C}},operators:{"=":function(B,A){return B==A},"!=":function(B,A){return B!=A},"^=":function(B,A){return B==A||B&&B.startsWith(A)},"$=":function(B,A){return B==A||B&&B.endsWith(A)},"*=":function(B,A){return B==A||B&&B.include(A)},"$=":function(B,A){return B.endsWith(A)},"*=":function(B,A){return B.include(A)},"~=":function(B,A){return(" "+B+" ").include(" "+A+" ")},"|=":function(B,A){return("-"+(B||"").toUpperCase()+"-").include("-"+(A||"").toUpperCase()+"-")}},split:function(B){var A=[];B.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/,function(C){A.push(C[1].strip())});return A},matchElements:function(F,G){var E=$$(G),D=Selector.handlers;D.mark(E);for(var C=0,B=[],A;A=F[C];C++){if(A._countedByPrototype){B.push(A)}}D.unmark(E);return B},findElement:function(B,C,A){if(Object.isNumber(C)){A=C;C=false}return Selector.matchElements(B,C||"*")[A||0]},findChildElements:function(E,G){G=Selector.split(G.join(","));var D=[],F=Selector.handlers;for(var C=0,B=G.length,A;C<B;C++){A=new Selector(G[C].strip());F.concat(D,A.findElements(E))}return(B>1)?F.unique(D):D}});if(Prototype.Browser.IE){Object.extend(Selector.handlers,{concat:function(B,A){for(var C=0,D;D=A[C];C++){if(D.tagName!=="!"){B.push(D)}}return B},unmark:function(A){for(var B=0,C;C=A[B];B++){C.removeAttribute("_countedByPrototype")}return A}})}function $$(){return Selector.findChildElements(document,$A(arguments))}var Form={reset:function(A){$(A).reset();return A},serializeElements:function(G,B){if(typeof B!="object"){B={hash:!!B}}else{if(Object.isUndefined(B.hash)){B.hash=true}}var C,F,A=false,E=B.submit;var D=G.inject({},function(H,I){if(!I.disabled&&I.name){C=I.name;F=$(I).getValue();if(F!=null&&I.type!="file"&&(I.type!="submit"||(!A&&E!==false&&(!E||C==E)&&(A=true)))){if(C in H){if(!Object.isArray(H[C])){H[C]=[H[C]]}H[C].push(F)}else{H[C]=F}}}return H});return B.hash?D:Object.toQueryString(D)}};Form.Methods={serialize:function(B,A){return Form.serializeElements(Form.getElements(B),A)},getElements:function(A){return $A($(A).getElementsByTagName("*")).inject([],function(B,C){if(Form.Element.Serializers[C.tagName.toLowerCase()]){B.push(Element.extend(C))}return B})},getInputs:function(G,C,D){G=$(G);var A=G.getElementsByTagName("input");if(!C&&!D){return $A(A).map(Element.extend)}for(var E=0,H=[],F=A.length;E<F;E++){var B=A[E];if((C&&B.type!=C)||(D&&B.name!=D)){continue}H.push(Element.extend(B))}return H},disable:function(A){A=$(A);Form.getElements(A).invoke("disable");return A},enable:function(A){A=$(A);Form.getElements(A).invoke("enable");return A},findFirstElement:function(B){var C=$(B).getElements().findAll(function(D){return"hidden"!=D.type&&!D.disabled});var A=C.findAll(function(D){return D.hasAttribute("tabIndex")&&D.tabIndex>=0}).sortBy(function(D){return D.tabIndex}).first();return A?A:C.find(function(D){return["input","select","textarea"].include(D.tagName.toLowerCase())})},focusFirstElement:function(A){A=$(A);A.findFirstElement().activate();return A},request:function(B,A){B=$(B),A=Object.clone(A||{});var D=A.parameters,C=B.readAttribute("action")||"";if(C.blank()){C=window.location.href}A.parameters=B.serialize(true);if(D){if(Object.isString(D)){D=D.toQueryParams()}Object.extend(A.parameters,D)}if(B.hasAttribute("method")&&!A.method){A.method=B.method}return new Ajax.Request(C,A)}};Form.Element={focus:function(A){$(A).focus();return A},select:function(A){$(A).select();return A}};Form.Element.Methods={serialize:function(A){A=$(A);if(!A.disabled&&A.name){var B=A.getValue();if(B!=undefined){var C={};C[A.name]=B;return Object.toQueryString(C)}}return""},getValue:function(A){A=$(A);var B=A.tagName.toLowerCase();return Form.Element.Serializers[B](A)},setValue:function(A,B){A=$(A);var C=A.tagName.toLowerCase();Form.Element.Serializers[C](A,B);return A},clear:function(A){$(A).value="";return A},present:function(A){return $(A).value!=""},activate:function(A){A=$(A);try{A.focus();if(A.select&&(A.tagName.toLowerCase()!="input"||!["button","reset","submit"].include(A.type))){A.select()}}catch(B){}return A},disable:function(A){A=$(A);A.disabled=true;return A},enable:function(A){A=$(A);A.disabled=false;return A}};var Field=Form.Element;var $F=Form.Element.Methods.getValue;Form.Element.Serializers={input:function(A,B){switch(A.type.toLowerCase()){case"checkbox":case"radio":return Form.Element.Serializers.inputSelector(A,B);default:return Form.Element.Serializers.textarea(A,B)}},inputSelector:function(A,B){if(Object.isUndefined(B)){return A.checked?A.value:null}else{A.checked=!!B}},textarea:function(A,B){if(Object.isUndefined(B)){return A.value}else{A.value=B}},select:function(C,F){if(Object.isUndefined(F)){return this[C.type=="select-one"?"selectOne":"selectMany"](C)}else{var B,D,G=!Object.isArray(F);for(var A=0,E=C.length;A<E;A++){B=C.options[A];D=this.optionValue(B);if(G){if(D==F){B.selected=true;return }}else{B.selected=F.include(D)}}}},selectOne:function(B){var A=B.selectedIndex;return A>=0?this.optionValue(B.options[A]):null},selectMany:function(D){var A,E=D.length;if(!E){return null}for(var C=0,A=[];C<E;C++){var B=D.options[C];if(B.selected){A.push(this.optionValue(B))}}return A},optionValue:function(A){return Element.extend(A).hasAttribute("value")?A.value:A.text}};Abstract.TimedObserver=Class.create(PeriodicalExecuter,{initialize:function($super,A,B,C){$super(C,B);this.element=$(A);this.lastValue=this.getValue()},execute:function(){var A=this.getValue();if(Object.isString(this.lastValue)&&Object.isString(A)?this.lastValue!=A:String(this.lastValue)!=String(A)){this.callback(this.element,A);this.lastValue=A}}});Form.Element.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.Element.getValue(this.element)}});Form.Observer=Class.create(Abstract.TimedObserver,{getValue:function(){return Form.serialize(this.element)}});Abstract.EventObserver=Class.create({initialize:function(A,B){this.element=$(A);this.callback=B;this.lastValue=this.getValue();if(this.element.tagName.toLowerCase()=="form"){this.registerFormCallbacks()}else{this.registerCallback(this.element)}},onElementEvent:function(){var A=this.getValue();if(this.lastValue!=A){this.callback(this.element,A);this.lastValue=A}},registerFormCallbacks:function(){Form.getElements(this.element).each(this.registerCallback,this)},registerCallback:function(A){if(A.type){switch(A.type.toLowerCase()){case"checkbox":case"radio":Event.observe(A,"click",this.onElementEvent.bind(this));break;default:Event.observe(A,"change",this.onElementEvent.bind(this));break}}}});Form.Element.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.Element.getValue(this.element)}});Form.EventObserver=Class.create(Abstract.EventObserver,{getValue:function(){return Form.serialize(this.element)}});if(!window.Event){var Event={}}Object.extend(Event,{KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,KEY_INSERT:45,cache:{},relatedTarget:function(B){var A;switch(B.type){case"mouseover":A=B.fromElement;break;case"mouseout":A=B.toElement;break;default:return null}return Element.extend(A)}});Event.Methods=(function(){var A;if(Prototype.Browser.IE){var B={0:1,1:4,2:2};A=function(D,C){return D.button==B[C]}}else{if(Prototype.Browser.WebKit){A=function(D,C){switch(C){case 0:return D.which==1&&!D.metaKey;case 1:return D.which==1&&D.metaKey;default:return false}}}else{A=function(D,C){return D.which?(D.which===C+1):(D.button===C)}}}return{isLeftClick:function(C){return A(C,0)},isMiddleClick:function(C){return A(C,1)},isRightClick:function(C){return A(C,2)},element:function(E){E=Event.extend(E);var D=E.target,C=E.type,F=E.currentTarget;if(F&&F.tagName){if(C==="load"||C==="error"||(C==="click"&&F.tagName.toLowerCase()==="input"&&F.type==="radio")){D=F}}if(D.nodeType==Node.TEXT_NODE){D=D.parentNode}return Element.extend(D)},findElement:function(D,F){var C=Event.element(D);if(!F){return C}var E=[C].concat(C.ancestors());return Selector.findElement(E,F,0)},pointer:function(E){var D=document.documentElement,C=document.body||{scrollLeft:0,scrollTop:0};return{x:E.pageX||(E.clientX+(D.scrollLeft||C.scrollLeft)-(D.clientLeft||0)),y:E.pageY||(E.clientY+(D.scrollTop||C.scrollTop)-(D.clientTop||0))}},pointerX:function(C){return Event.pointer(C).x},pointerY:function(C){return Event.pointer(C).y},stop:function(C){Event.extend(C);C.preventDefault();C.stopPropagation();C.stopped=true}}})();Event.extend=(function(){var A=Object.keys(Event.Methods).inject({},function(B,C){B[C]=Event.Methods[C].methodize();return B});if(Prototype.Browser.IE){Object.extend(A,{stopPropagation:function(){this.cancelBubble=true},preventDefault:function(){this.returnValue=false},inspect:function(){return"[object Event]"}});return function(B){if(!B){return false}if(B._extendedByPrototype){return B}B._extendedByPrototype=Prototype.emptyFunction;var C=Event.pointer(B);Object.extend(B,{target:B.srcElement,relatedTarget:Event.relatedTarget(B),pageX:C.x,pageY:C.y});return Object.extend(B,A)}}else{Event.prototype=Event.prototype||document.createEvent("HTMLEvents")["__proto__"];Object.extend(Event.prototype,A);return Prototype.K}})();Object.extend(Event,(function(){var B=Event.cache;function C(J){if(J._prototypeEventID){return J._prototypeEventID[0]}arguments.callee.id=arguments.callee.id||1;return J._prototypeEventID=[++arguments.callee.id]}function G(J){if(J&&J.include(":")){return"dataavailable"}return J}function A(J){return B[J]=B[J]||{}}function F(L,J){var K=A(L);return K[J]=K[J]||[]}function H(K,J,L){var O=C(K);var N=F(O,J);if(N.pluck("handler").include(L)){return false}var M=function(P){if(!Event||!Event.extend||(P.eventName&&P.eventName!=J)){return false}Event.extend(P);L.call(K,P)};M.handler=L;N.push(M);return M}function I(M,J,K){var L=F(M,J);return L.find(function(N){return N.handler==K})}function D(M,J,K){var L=A(M);if(!L[J]){return false}L[J]=L[J].without(I(M,J,K))}function E(){for(var K in B){for(var J in B[K]){B[K][J]=null}}}if(window.attachEvent){window.attachEvent("onunload",E)}if(Prototype.Browser.WebKit){window.addEventListener("unload",Prototype.emptyFunction,false)}return{observe:function(L,J,M){L=$(L);var K=G(J);var N=H(L,J,M);if(!N){return L}if(L.addEventListener){L.addEventListener(K,N,false)}else{L.attachEvent("on"+K,N)}return L},stopObserving:function(L,J,M){L=$(L);var O=C(L),K=G(J);if(!M&&J){F(O,J).each(function(P){L.stopObserving(J,P.handler)});return L}else{if(!J){Object.keys(A(O)).each(function(P){L.stopObserving(P)});return L}}var N=I(O,J,M);if(!N){return L}if(L.removeEventListener){L.removeEventListener(K,N,false)}else{L.detachEvent("on"+K,N)}D(O,J,M);return L},fire:function(L,K,J){L=$(L);if(L==document&&document.createEvent&&!L.dispatchEvent){L=document.documentElement}var M;if(document.createEvent){M=document.createEvent("HTMLEvents");M.initEvent("dataavailable",true,true)}else{M=document.createEventObject();M.eventType="ondataavailable"}M.eventName=K;M.memo=J||{};if(document.createEvent){L.dispatchEvent(M)}else{L.fireEvent(M.eventType,M)}return Event.extend(M)}}})());Object.extend(Event,Event.Methods);Element.addMethods({fire:Event.fire,observe:Event.observe,stopObserving:Event.stopObserving});Object.extend(document,{fire:Element.Methods.fire.methodize(),observe:Element.Methods.observe.methodize(),stopObserving:Element.Methods.stopObserving.methodize(),loaded:false});(function(){var B;function A(){if(document.loaded){return }if(B){window.clearInterval(B)}document.fire("dom:loaded");document.loaded=true}if(document.addEventListener){if(Prototype.Browser.WebKit){B=window.setInterval(function(){if(/loaded|complete/.test(document.readyState)){A()}},0);Event.observe(window,"load",A)}else{document.addEventListener("DOMContentLoaded",A,false)}}else{document.write("<script id=__onDOMContentLoaded defer src=//:><\/script>");$("__onDOMContentLoaded").onreadystatechange=function(){if(this.readyState=="complete"){this.onreadystatechange=null;A()}}}})();Hash.toQueryString=Object.toQueryString;var Toggle={display:Element.toggle};Element.Methods.childOf=Element.Methods.descendantOf;var Insertion={Before:function(A,B){return Element.insert(A,{before:B})},Top:function(A,B){return Element.insert(A,{top:B})},Bottom:function(A,B){return Element.insert(A,{bottom:B})},After:function(A,B){return Element.insert(A,{after:B})}};var $continue=new Error('"throw $continue" is deprecated, use "return" instead');var Position={includeScrollOffsets:false,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},within:function(B,A,C){if(this.includeScrollOffsets){return this.withinIncludingScrolloffsets(B,A,C)}this.xcomp=A;this.ycomp=C;this.offset=Element.cumulativeOffset(B);return(C>=this.offset[1]&&C<this.offset[1]+B.offsetHeight&&A>=this.offset[0]&&A<this.offset[0]+B.offsetWidth)},withinIncludingScrolloffsets:function(B,A,D){var C=Element.cumulativeScrollOffset(B);this.xcomp=A+C[0]-this.deltaX;this.ycomp=D+C[1]-this.deltaY;this.offset=Element.cumulativeOffset(B);return(this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+B.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+B.offsetWidth)},overlap:function(B,A){if(!B){return 0}if(B=="vertical"){return((this.offset[1]+A.offsetHeight)-this.ycomp)/A.offsetHeight}if(B=="horizontal"){return((this.offset[0]+A.offsetWidth)-this.xcomp)/A.offsetWidth}},cumulativeOffset:Element.Methods.cumulativeOffset,positionedOffset:Element.Methods.positionedOffset,absolutize:function(A){Position.prepare();return Element.absolutize(A)},relativize:function(A){Position.prepare();return Element.relativize(A)},realOffset:Element.Methods.cumulativeScrollOffset,offsetParent:Element.Methods.getOffsetParent,page:Element.Methods.viewportOffset,clone:function(B,C,A){A=A||{};return Element.clonePosition(C,B,A)}};if(!document.getElementsByClassName){document.getElementsByClassName=function(B){function A(C){return C.blank()?null:"[contains(concat(' ', @class, ' '), ' "+C+" ')]"}B.getElementsByClassName=Prototype.BrowserFeatures.XPath?function(C,E){E=E.toString().strip();var D=/\s/.test(E)?$w(E).map(A).join(""):A(E);return D?document._getElementsByXPath(".//*"+D,C):[]}:function(E,F){F=F.toString().strip();var G=[],H=(/\s/.test(F)?$w(F):null);if(!H&&!F){return G}var C=$(E).getElementsByTagName("*");F=" "+F+" ";for(var D=0,J,I;J=C[D];D++){if(J.className&&(I=" "+J.className+" ")&&(I.include(F)||(H&&H.all(function(K){return !K.toString().blank()&&I.include(" "+K+" ")})))){G.push(Element.extend(J))}}return G};return function(D,C){return $(C||document.body).getElementsByClassName(D)}}(Element.Methods)}Element.ClassNames=Class.create();Element.ClassNames.prototype={initialize:function(A){this.element=$(A)},_each:function(A){this.element.className.split(/\s+/).select(function(B){return B.length>0})._each(A)},set:function(A){this.element.className=A},add:function(A){if(this.include(A)){return }this.set($A(this).concat(A).join(" "))},remove:function(A){if(!this.include(A)){return }this.set($A(this).without(A).join(" "))},toString:function(){return $A(this).join(" ")}};Object.extend(Element.ClassNames.prototype,Enumerable);Element.addMethods();var Scriptaculous={Version:"1.8.2",require:function(A){document.write('<script type="text/javascript" src="'+A+'"><\/script>')},REQUIRED_PROTOTYPE:"1.6.0.3",load:function(){function A(B){var C=B.replace(/_.*|\./g,"");C=parseInt(C+"0".times(4-C.length));return B.indexOf("_")>-1?C-1:C}if((typeof Prototype=="undefined")||(typeof Element=="undefined")||(typeof Element.Methods=="undefined")||(A(Prototype.Version)<A(Scriptaculous.REQUIRED_PROTOTYPE))){throw ("script.aculo.us requires the Prototype JavaScript framework >= "+Scriptaculous.REQUIRED_PROTOTYPE)}}};Scriptaculous.load();var Builder={NODEMAP:{AREA:"map",CAPTION:"table",COL:"table",COLGROUP:"table",LEGEND:"fieldset",OPTGROUP:"select",OPTION:"select",PARAM:"object",TBODY:"table",TD:"table",TFOOT:"table",TH:"table",THEAD:"table",TR:"table"},node:function(A){A=A.toUpperCase();var F=this.NODEMAP[A]||"div";var B=document.createElement(F);try{B.innerHTML="<"+A+"></"+A+">"}catch(E){}var D=B.firstChild||null;if(D&&(D.tagName.toUpperCase()!=A)){D=D.getElementsByTagName(A)[0]}if(!D){D=document.createElement(A)}if(!D){return }if(arguments[1]){if(this._isStringOrNumber(arguments[1])||(arguments[1] instanceof Array)||arguments[1].tagName){this._children(D,arguments[1])}else{var C=this._attributes(arguments[1]);if(C.length){try{B.innerHTML="<"+A+" "+C+"></"+A+">"}catch(E){}D=B.firstChild||null;if(!D){D=document.createElement(A);for(attr in arguments[1]){D[attr=="class"?"className":attr]=arguments[1][attr]}}if(D.tagName.toUpperCase()!=A){D=B.getElementsByTagName(A)[0]}}}}if(arguments[2]){this._children(D,arguments[2])}return $(D)},_text:function(A){return document.createTextNode(A)},ATTR_MAP:{className:"class",htmlFor:"for"},_attributes:function(A){var B=[];for(attribute in A){B.push((attribute in this.ATTR_MAP?this.ATTR_MAP[attribute]:attribute)+'="'+A[attribute].toString().escapeHTML().gsub(/"/,"&quot;")+'"')}return B.join(" ")},_children:function(B,A){if(A.tagName){B.appendChild(A);return }if(typeof A=="object"){A.flatten().each(function(C){if(typeof C=="object"){B.appendChild(C)}else{if(Builder._isStringOrNumber(C)){B.appendChild(Builder._text(C))}}})}else{if(Builder._isStringOrNumber(A)){B.appendChild(Builder._text(A))}}},_isStringOrNumber:function(A){return(typeof A=="string"||typeof A=="number")},build:function(B){var A=this.node("div");$(A).update(B.strip());return A.down()},dump:function(B){if(typeof B!="object"&&typeof B!="function"){B=window}var A=("A ABBR ACRONYM ADDRESS APPLET AREA B BASE BASEFONT BDO BIG BLOCKQUOTE BODY BR BUTTON CAPTION CENTER CITE CODE COL COLGROUP DD DEL DFN DIR DIV DL DT EM FIELDSET FONT FORM FRAME FRAMESET H1 H2 H3 H4 H5 H6 HEAD HR HTML I IFRAME IMG INPUT INS ISINDEX KBD LABEL LEGEND LI LINK MAP MENU META NOFRAMES NOSCRIPT OBJECT OL OPTGROUP OPTION P PARAM PRE Q S SAMP SCRIPT SELECT SMALL SPAN STRIKE STRONG STYLE SUB SUP TABLE TBODY TD TEXTAREA TFOOT TH THEAD TITLE TR TT U UL VAR").split(/\s+/);A.each(function(C){B[C]=function(){return Builder.node.apply(Builder,[C].concat($A(arguments)))}})}};String.prototype.parseColor=function(){var A="#";if(this.slice(0,4)=="rgb("){var C=this.slice(4,this.length-1).split(",");var B=0;do{A+=parseInt(C[B]).toColorPart()}while(++B<3)}else{if(this.slice(0,1)=="#"){if(this.length==4){for(var B=1;B<4;B++){A+=(this.charAt(B)+this.charAt(B)).toLowerCase()}}if(this.length==7){A=this.toLowerCase()}}}return(A.length==7?A:(arguments[0]||this))};Element.collectTextNodes=function(A){return $A($(A).childNodes).collect(function(B){return(B.nodeType==3?B.nodeValue:(B.hasChildNodes()?Element.collectTextNodes(B):""))}).flatten().join("")};Element.collectTextNodesIgnoreClass=function(A,B){return $A($(A).childNodes).collect(function(C){return(C.nodeType==3?C.nodeValue:((C.hasChildNodes()&&!Element.hasClassName(C,B))?Element.collectTextNodesIgnoreClass(C,B):""))}).flatten().join("")};Element.setContentZoom=function(A,B){A=$(A);A.setStyle({fontSize:(B/100)+"em"});if(Prototype.Browser.WebKit){window.scrollBy(0,0)}return A};Element.getInlineOpacity=function(A){return $(A).style.opacity||""};Element.forceRerendering=function(A){try{A=$(A);var C=document.createTextNode(" ");A.appendChild(C);A.removeChild(C)}catch(B){}};var Effect={_elementDoesNotExistError:{name:"ElementDoesNotExistError",message:"The specified DOM element does not exist, but is required for this effect to operate"},Transitions:{linear:Prototype.K,sinoidal:function(A){return(-Math.cos(A*Math.PI)/2)+0.5},reverse:function(A){return 1-A},flicker:function(A){var A=((-Math.cos(A*Math.PI)/4)+0.75)+Math.random()/4;return A>1?1:A},wobble:function(A){return(-Math.cos(A*Math.PI*(9*A))/2)+0.5},pulse:function(B,A){return(-Math.cos((B*((A||5)-0.5)*2)*Math.PI)/2)+0.5},spring:function(A){return 1-(Math.cos(A*4.5*Math.PI)*Math.exp(-A*6))},none:function(A){return 0},full:function(A){return 1}},DefaultOptions:{duration:1,fps:100,sync:false,from:0,to:1,delay:0,queue:"parallel"},tagifyText:function(A){var B="position:relative";if(Prototype.Browser.IE){B+=";zoom:1"}A=$(A);$A(A.childNodes).each(function(C){if(C.nodeType==3){C.nodeValue.toArray().each(function(D){A.insertBefore(new Element("span",{style:B}).update(D==" "?String.fromCharCode(160):D),C)});Element.remove(C)}})},multiple:function(B,C){var E;if(((typeof B=="object")||Object.isFunction(B))&&(B.length)){E=B}else{E=$(B).childNodes}var A=Object.extend({speed:0.1,delay:0},arguments[2]||{});var D=A.delay;$A(E).each(function(G,F){new C(G,Object.extend(A,{delay:F*A.speed+D}))})},PAIRS:{slide:["SlideDown","SlideUp"],blind:["BlindDown","BlindUp"],appear:["Appear","Fade"]},toggle:function(B,C){B=$(B);C=(C||"appear").toLowerCase();var A=Object.extend({queue:{position:"end",scope:(B.id||"global"),limit:1}},arguments[2]||{});Effect[B.visible()?Effect.PAIRS[C][1]:Effect.PAIRS[C][0]](B,A)}};Effect.DefaultOptions.transition=Effect.Transitions.sinoidal;Effect.ScopedQueue=Class.create(Enumerable,{initialize:function(){this.effects=[];this.interval=null},_each:function(A){this.effects._each(A)},add:function(B){var C=new Date().getTime();var A=Object.isString(B.options.queue)?B.options.queue:B.options.queue.position;switch(A){case"front":this.effects.findAll(function(D){return D.state=="idle"}).each(function(D){D.startOn+=B.finishOn;D.finishOn+=B.finishOn});break;case"with-last":C=this.effects.pluck("startOn").max()||C;break;case"end":C=this.effects.pluck("finishOn").max()||C;break}B.startOn+=C;B.finishOn+=C;if(!B.options.queue.limit||(this.effects.length<B.options.queue.limit)){this.effects.push(B)}if(!this.interval){this.interval=setInterval(this.loop.bind(this),15)}},remove:function(A){this.effects=this.effects.reject(function(B){return B==A});if(this.effects.length==0){clearInterval(this.interval);this.interval=null}},loop:function(){var C=new Date().getTime();for(var B=0,A=this.effects.length;B<A;B++){this.effects[B]&&this.effects[B].loop(C)}}});Effect.Queues={instances:$H(),get:function(A){if(!Object.isString(A)){return A}return this.instances.get(A)||this.instances.set(A,new Effect.ScopedQueue())}};Effect.Queue=Effect.Queues.get("global");Effect.Base=Class.create({position:null,start:function(A){function B(D,C){return((D[C+"Internal"]?"this.options."+C+"Internal(this);":"")+(D[C]?"this.options."+C+"(this);":""))}if(A&&A.transition===false){A.transition=Effect.Transitions.linear}this.options=Object.extend(Object.extend({},Effect.DefaultOptions),A||{});this.currentFrame=0;this.state="idle";this.startOn=this.options.delay*1000;this.finishOn=this.startOn+(this.options.duration*1000);this.fromToDelta=this.options.to-this.options.from;this.totalTime=this.finishOn-this.startOn;this.totalFrames=this.options.fps*this.options.duration;this.render=(function(){function C(E,D){if(E.options[D+"Internal"]){E.options[D+"Internal"](E)}if(E.options[D]){E.options[D](E)}}return function(D){if(this.state==="idle"){this.state="running";C(this,"beforeSetup");if(this.setup){this.setup()}C(this,"afterSetup")}if(this.state==="running"){D=(this.options.transition(D)*this.fromToDelta)+this.options.from;this.position=D;C(this,"beforeUpdate");if(this.update){this.update(D)}C(this,"afterUpdate")}}})();this.event("beforeStart");if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).add(this)}},loop:function(C){if(C>=this.startOn){if(C>=this.finishOn){this.render(1);this.cancel();this.event("beforeFinish");if(this.finish){this.finish()}this.event("afterFinish");return }var B=(C-this.startOn)/this.totalTime,A=(B*this.totalFrames).round();if(A>this.currentFrame){this.render(B);this.currentFrame=A}}},cancel:function(){if(!this.options.sync){Effect.Queues.get(Object.isString(this.options.queue)?"global":this.options.queue.scope).remove(this)}this.state="finished"},event:function(A){if(this.options[A+"Internal"]){this.options[A+"Internal"](this)}if(this.options[A]){this.options[A](this)}},inspect:function(){var A=$H();for(property in this){if(!Object.isFunction(this[property])){A.set(property,this[property])}}return"#<Effect:"+A.inspect()+",options:"+$H(this.options).inspect()+">"}});Effect.Parallel=Class.create(Effect.Base,{initialize:function(A){this.effects=A||[];this.start(arguments[1])},update:function(A){this.effects.invoke("render",A)},finish:function(A){this.effects.each(function(B){B.render(1);B.cancel();B.event("beforeFinish");if(B.finish){B.finish(A)}B.event("afterFinish")})}});Effect.Tween=Class.create(Effect.Base,{initialize:function(C,F,E){C=Object.isString(C)?$(C):C;var B=$A(arguments),D=B.last(),A=B.length==5?B[3]:null;this.method=Object.isFunction(D)?D.bind(C):Object.isFunction(C[D])?C[D].bind(C):function(G){C[D]=G};this.start(Object.extend({from:F,to:E},A||{}))},update:function(A){this.method(A)}});Effect.Event=Class.create(Effect.Base,{initialize:function(){this.start(Object.extend({duration:0},arguments[0]||{}))},update:Prototype.emptyFunction});Effect.Opacity=Class.create(Effect.Base,{initialize:function(B){this.element=$(B);if(!this.element){throw (Effect._elementDoesNotExistError)}if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){this.element.setStyle({zoom:1})}var A=Object.extend({from:this.element.getOpacity()||0,to:1},arguments[1]||{});this.start(A)},update:function(A){this.element.setOpacity(A)}});Effect.Move=Class.create(Effect.Base,{initialize:function(B){this.element=$(B);if(!this.element){throw (Effect._elementDoesNotExistError)}var A=Object.extend({x:0,y:0,mode:"relative"},arguments[1]||{});this.start(A)},setup:function(){this.element.makePositioned();this.originalLeft=parseFloat(this.element.getStyle("left")||"0");this.originalTop=parseFloat(this.element.getStyle("top")||"0");if(this.options.mode=="absolute"){this.options.x=this.options.x-this.originalLeft;this.options.y=this.options.y-this.originalTop}},update:function(A){this.element.setStyle({left:(this.options.x*A+this.originalLeft).round()+"px",top:(this.options.y*A+this.originalTop).round()+"px"})}});Effect.MoveBy=function(B,A,C){return new Effect.Move(B,Object.extend({x:C,y:A},arguments[3]||{}))};Effect.Scale=Class.create(Effect.Base,{initialize:function(B,C){this.element=$(B);if(!this.element){throw (Effect._elementDoesNotExistError)}var A=Object.extend({scaleX:true,scaleY:true,scaleContent:true,scaleFromCenter:false,scaleMode:"box",scaleFrom:100,scaleTo:C},arguments[2]||{});this.start(A)},setup:function(){this.restoreAfterFinish=this.options.restoreAfterFinish||false;this.elementPositioning=this.element.getStyle("position");this.originalStyle={};["top","left","width","height","fontSize"].each(function(B){this.originalStyle[B]=this.element.style[B]}.bind(this));this.originalTop=this.element.offsetTop;this.originalLeft=this.element.offsetLeft;var A=this.element.getStyle("font-size")||"100%";["em","px","%","pt"].each(function(B){if(A.indexOf(B)>0){this.fontSize=parseFloat(A);this.fontSizeType=B}}.bind(this));this.factor=(this.options.scaleTo-this.options.scaleFrom)/100;this.dims=null;if(this.options.scaleMode=="box"){this.dims=[this.element.offsetHeight,this.element.offsetWidth]}if(/^content/.test(this.options.scaleMode)){this.dims=[this.element.scrollHeight,this.element.scrollWidth]}if(!this.dims){this.dims=[this.options.scaleMode.originalHeight,this.options.scaleMode.originalWidth]}},update:function(A){var B=(this.options.scaleFrom/100)+(this.factor*A);if(this.options.scaleContent&&this.fontSize){this.element.setStyle({fontSize:this.fontSize*B+this.fontSizeType})}this.setDimensions(this.dims[0]*B,this.dims[1]*B)},finish:function(A){if(this.restoreAfterFinish){this.element.setStyle(this.originalStyle)}},setDimensions:function(A,D){var E={};if(this.options.scaleX){E.width=D.round()+"px"}if(this.options.scaleY){E.height=A.round()+"px"}if(this.options.scaleFromCenter){var C=(A-this.dims[0])/2;var B=(D-this.dims[1])/2;if(this.elementPositioning=="absolute"){if(this.options.scaleY){E.top=this.originalTop-C+"px"}if(this.options.scaleX){E.left=this.originalLeft-B+"px"}}else{if(this.options.scaleY){E.top=-C+"px"}if(this.options.scaleX){E.left=-B+"px"}}}this.element.setStyle(E)}});Effect.Highlight=Class.create(Effect.Base,{initialize:function(B){this.element=$(B);if(!this.element){throw (Effect._elementDoesNotExistError)}var A=Object.extend({startcolor:"#ffff99"},arguments[1]||{});this.start(A)},setup:function(){if(this.element.getStyle("display")=="none"){this.cancel();return }this.oldStyle={};if(!this.options.keepBackgroundImage){this.oldStyle.backgroundImage=this.element.getStyle("background-image");this.element.setStyle({backgroundImage:"none"})}if(!this.options.endcolor){this.options.endcolor=this.element.getStyle("background-color").parseColor("#ffffff")}if(!this.options.restorecolor){this.options.restorecolor=this.element.getStyle("background-color")}this._base=$R(0,2).map(function(A){return parseInt(this.options.startcolor.slice(A*2+1,A*2+3),16)}.bind(this));this._delta=$R(0,2).map(function(A){return parseInt(this.options.endcolor.slice(A*2+1,A*2+3),16)-this._base[A]}.bind(this))},update:function(A){this.element.setStyle({backgroundColor:$R(0,2).inject("#",function(B,C,D){return B+((this._base[D]+(this._delta[D]*A)).round().toColorPart())}.bind(this))})},finish:function(){this.element.setStyle(Object.extend(this.oldStyle,{backgroundColor:this.options.restorecolor}))}});Effect.ScrollTo=function(C){var B=arguments[1]||{},A=document.viewport.getScrollOffsets(),D=$(C).cumulativeOffset();if(B.offset){D[1]+=B.offset}return new Effect.Tween(null,A.top,D[1],B,function(E){scrollTo(A.left,E.round())})};Effect.Fade=function(C){C=$(C);var A=C.getInlineOpacity();var B=Object.extend({from:C.getOpacity()||1,to:0,afterFinishInternal:function(D){if(D.options.to!=0){return }D.element.hide().setStyle({opacity:A})}},arguments[1]||{});return new Effect.Opacity(C,B)};Effect.Appear=function(B){B=$(B);var A=Object.extend({from:(B.getStyle("display")=="none"?0:B.getOpacity()||0),to:1,afterFinishInternal:function(C){C.element.forceRerendering()},beforeSetup:function(C){C.element.setOpacity(C.options.from).show()}},arguments[1]||{});return new Effect.Opacity(B,A)};Effect.Puff=function(B){B=$(B);var A={opacity:B.getInlineOpacity(),position:B.getStyle("position"),top:B.style.top,left:B.style.left,width:B.style.width,height:B.style.height};return new Effect.Parallel([new Effect.Scale(B,200,{sync:true,scaleFromCenter:true,scaleContent:true,restoreAfterFinish:true}),new Effect.Opacity(B,{sync:true,to:0})],Object.extend({duration:1,beforeSetupInternal:function(C){Position.absolutize(C.effects[0].element)},afterFinishInternal:function(C){C.effects[0].element.hide().setStyle(A)}},arguments[1]||{}))};Effect.BlindUp=function(A){A=$(A);A.makeClipping();return new Effect.Scale(A,0,Object.extend({scaleContent:false,scaleX:false,restoreAfterFinish:true,afterFinishInternal:function(B){B.element.hide().undoClipping()}},arguments[1]||{}))};Effect.BlindDown=function(B){B=$(B);var A=B.getDimensions();return new Effect.Scale(B,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:0,scaleMode:{originalHeight:A.height,originalWidth:A.width},restoreAfterFinish:true,afterSetup:function(C){C.element.makeClipping().setStyle({height:"0px"}).show()},afterFinishInternal:function(C){C.element.undoClipping()}},arguments[1]||{}))};Effect.SwitchOff=function(B){B=$(B);var A=B.getInlineOpacity();return new Effect.Appear(B,Object.extend({duration:0.4,from:0,transition:Effect.Transitions.flicker,afterFinishInternal:function(C){new Effect.Scale(C.element,1,{duration:0.3,scaleFromCenter:true,scaleX:false,scaleContent:false,restoreAfterFinish:true,beforeSetup:function(D){D.element.makePositioned().makeClipping()},afterFinishInternal:function(D){D.element.hide().undoClipping().undoPositioned().setStyle({opacity:A})}})}},arguments[1]||{}))};Effect.DropOut=function(B){B=$(B);var A={top:B.getStyle("top"),left:B.getStyle("left"),opacity:B.getInlineOpacity()};return new Effect.Parallel([new Effect.Move(B,{x:0,y:100,sync:true}),new Effect.Opacity(B,{sync:true,to:0})],Object.extend({duration:0.5,beforeSetup:function(C){C.effects[0].element.makePositioned()},afterFinishInternal:function(C){C.effects[0].element.hide().undoPositioned().setStyle(A)}},arguments[1]||{}))};Effect.Shake=function(D){D=$(D);var B=Object.extend({distance:20,duration:0.5},arguments[1]||{});var E=parseFloat(B.distance);var C=parseFloat(B.duration)/10;var A={top:D.getStyle("top"),left:D.getStyle("left")};return new Effect.Move(D,{x:E,y:0,duration:C,afterFinishInternal:function(F){new Effect.Move(F.element,{x:-E*2,y:0,duration:C*2,afterFinishInternal:function(G){new Effect.Move(G.element,{x:E*2,y:0,duration:C*2,afterFinishInternal:function(H){new Effect.Move(H.element,{x:-E*2,y:0,duration:C*2,afterFinishInternal:function(I){new Effect.Move(I.element,{x:E*2,y:0,duration:C*2,afterFinishInternal:function(J){new Effect.Move(J.element,{x:-E,y:0,duration:C,afterFinishInternal:function(K){K.element.undoPositioned().setStyle(A)}})}})}})}})}})}})};Effect.SlideDown=function(C){C=$(C).cleanWhitespace();var A=C.down().getStyle("bottom");var B=C.getDimensions();return new Effect.Scale(C,100,Object.extend({scaleContent:false,scaleX:false,scaleFrom:window.opera?0:1,scaleMode:{originalHeight:B.height,originalWidth:B.width},restoreAfterFinish:true,afterSetup:function(D){D.element.makePositioned();D.element.down().makePositioned();if(window.opera){D.element.setStyle({top:""})}D.element.makeClipping().setStyle({height:"0px"}).show()},afterUpdateInternal:function(D){D.element.down().setStyle({bottom:(D.dims[0]-D.element.clientHeight)+"px"})},afterFinishInternal:function(D){D.element.undoClipping().undoPositioned();D.element.down().undoPositioned().setStyle({bottom:A})}},arguments[1]||{}))};Effect.SlideUp=function(C){C=$(C).cleanWhitespace();var A=C.down().getStyle("bottom");var B=C.getDimensions();return new Effect.Scale(C,window.opera?0:1,Object.extend({scaleContent:false,scaleX:false,scaleMode:"box",scaleFrom:100,scaleMode:{originalHeight:B.height,originalWidth:B.width},restoreAfterFinish:true,afterSetup:function(D){D.element.makePositioned();D.element.down().makePositioned();if(window.opera){D.element.setStyle({top:""})}D.element.makeClipping().show()},afterUpdateInternal:function(D){D.element.down().setStyle({bottom:(D.dims[0]-D.element.clientHeight)+"px"})},afterFinishInternal:function(D){D.element.hide().undoClipping().undoPositioned();D.element.down().undoPositioned().setStyle({bottom:A})}},arguments[1]||{}))};Effect.Squish=function(A){return new Effect.Scale(A,window.opera?1:0,{restoreAfterFinish:true,beforeSetup:function(B){B.element.makeClipping()},afterFinishInternal:function(B){B.element.hide().undoClipping()}})};Effect.Grow=function(C){C=$(C);var B=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.full},arguments[1]||{});var A={top:C.style.top,left:C.style.left,height:C.style.height,width:C.style.width,opacity:C.getInlineOpacity()};var G=C.getDimensions();var H,F;var E,D;switch(B.direction){case"top-left":H=F=E=D=0;break;case"top-right":H=G.width;F=D=0;E=-G.width;break;case"bottom-left":H=E=0;F=G.height;D=-G.height;break;case"bottom-right":H=G.width;F=G.height;E=-G.width;D=-G.height;break;case"center":H=G.width/2;F=G.height/2;E=-G.width/2;D=-G.height/2;break}return new Effect.Move(C,{x:H,y:F,duration:0.01,beforeSetup:function(I){I.element.hide().makeClipping().makePositioned()},afterFinishInternal:function(I){new Effect.Parallel([new Effect.Opacity(I.element,{sync:true,to:1,from:0,transition:B.opacityTransition}),new Effect.Move(I.element,{x:E,y:D,sync:true,transition:B.moveTransition}),new Effect.Scale(I.element,100,{scaleMode:{originalHeight:G.height,originalWidth:G.width},sync:true,scaleFrom:window.opera?1:0,transition:B.scaleTransition,restoreAfterFinish:true})],Object.extend({beforeSetup:function(J){J.effects[0].element.setStyle({height:"0px"}).show()},afterFinishInternal:function(J){J.effects[0].element.undoClipping().undoPositioned().setStyle(A)}},B))}})};Effect.Shrink=function(C){C=$(C);var B=Object.extend({direction:"center",moveTransition:Effect.Transitions.sinoidal,scaleTransition:Effect.Transitions.sinoidal,opacityTransition:Effect.Transitions.none},arguments[1]||{});var A={top:C.style.top,left:C.style.left,height:C.style.height,width:C.style.width,opacity:C.getInlineOpacity()};var F=C.getDimensions();var E,D;switch(B.direction){case"top-left":E=D=0;break;case"top-right":E=F.width;D=0;break;case"bottom-left":E=0;D=F.height;break;case"bottom-right":E=F.width;D=F.height;break;case"center":E=F.width/2;D=F.height/2;break}return new Effect.Parallel([new Effect.Opacity(C,{sync:true,to:0,from:1,transition:B.opacityTransition}),new Effect.Scale(C,window.opera?1:0,{sync:true,transition:B.scaleTransition,restoreAfterFinish:true}),new Effect.Move(C,{x:E,y:D,sync:true,transition:B.moveTransition})],Object.extend({beforeStartInternal:function(G){G.effects[0].element.makePositioned().makeClipping()},afterFinishInternal:function(G){G.effects[0].element.hide().undoClipping().undoPositioned().setStyle(A)}},B))};Effect.Pulsate=function(C){C=$(C);var B=arguments[1]||{},A=C.getInlineOpacity(),E=B.transition||Effect.Transitions.linear,D=function(F){return 1-E((-Math.cos((F*(B.pulses||5)*2)*Math.PI)/2)+0.5)};return new Effect.Opacity(C,Object.extend(Object.extend({duration:2,from:0,afterFinishInternal:function(F){F.element.setStyle({opacity:A})}},B),{transition:D}))};Effect.Fold=function(B){B=$(B);var A={top:B.style.top,left:B.style.left,width:B.style.width,height:B.style.height};B.makeClipping();return new Effect.Scale(B,5,Object.extend({scaleContent:false,scaleX:false,afterFinishInternal:function(C){new Effect.Scale(B,1,{scaleContent:false,scaleY:false,afterFinishInternal:function(D){D.element.hide().undoClipping().setStyle(A)}})}},arguments[1]||{}))};Effect.Morph=Class.create(Effect.Base,{initialize:function(C){this.element=$(C);if(!this.element){throw (Effect._elementDoesNotExistError)}var A=Object.extend({style:{}},arguments[1]||{});if(!Object.isString(A.style)){this.style=$H(A.style)}else{if(A.style.include(":")){this.style=A.style.parseStyle()}else{this.element.addClassName(A.style);this.style=$H(this.element.getStyles());this.element.removeClassName(A.style);var B=this.element.getStyles();this.style=this.style.reject(function(D){return D.value==B[D.key]});A.afterFinishInternal=function(D){D.element.addClassName(D.options.style);D.transforms.each(function(E){D.element.style[E.style]=""})}}}this.start(A)},setup:function(){function A(B){if(!B||["rgba(0, 0, 0, 0)","transparent"].include(B)){B="#ffffff"}B=B.parseColor();return $R(0,2).map(function(C){return parseInt(B.slice(C*2+1,C*2+3),16)})}this.transforms=this.style.map(function(G){var F=G[0],E=G[1],D=null;if(E.parseColor("#zzzzzz")!="#zzzzzz"){E=E.parseColor();D="color"}else{if(F=="opacity"){E=parseFloat(E);if(Prototype.Browser.IE&&(!this.element.currentStyle.hasLayout)){this.element.setStyle({zoom:1})}}else{if(Element.CSS_LENGTH.test(E)){var C=E.match(/^([\+\-]?[0-9\.]+)(.*)$/);E=parseFloat(C[1]);D=(C.length==3)?C[2]:null}}}var B=this.element.getStyle(F);return{style:F.camelize(),originalValue:D=="color"?A(B):parseFloat(B||0),targetValue:D=="color"?A(E):E,unit:D}}.bind(this)).reject(function(B){return((B.originalValue==B.targetValue)||(B.unit!="color"&&(isNaN(B.originalValue)||isNaN(B.targetValue))))})},update:function(A){var D={},B,C=this.transforms.length;while(C--){D[(B=this.transforms[C]).style]=B.unit=="color"?"#"+(Math.round(B.originalValue[0]+(B.targetValue[0]-B.originalValue[0])*A)).toColorPart()+(Math.round(B.originalValue[1]+(B.targetValue[1]-B.originalValue[1])*A)).toColorPart()+(Math.round(B.originalValue[2]+(B.targetValue[2]-B.originalValue[2])*A)).toColorPart():(B.originalValue+(B.targetValue-B.originalValue)*A).toFixed(3)+(B.unit===null?"":B.unit)}this.element.setStyle(D,true)}});Effect.Transform=Class.create({initialize:function(A){this.tracks=[];this.options=arguments[1]||{};this.addTracks(A)},addTracks:function(A){A.each(function(B){B=$H(B);var C=B.values().first();this.tracks.push($H({ids:B.keys().first(),effect:Effect.Morph,options:{style:C}}))}.bind(this));return this},play:function(){return new Effect.Parallel(this.tracks.map(function(A){var D=A.get("ids"),C=A.get("effect"),B=A.get("options");var E=[$(D)||$$(D)].flatten();return E.map(function(F){return new C(F,Object.extend({sync:true},B))})}).flatten(),this.options)}});Element.CSS_PROPERTIES=$w("backgroundColor backgroundPosition borderBottomColor borderBottomStyle borderBottomWidth borderLeftColor borderLeftStyle borderLeftWidth borderRightColor borderRightStyle borderRightWidth borderSpacing borderTopColor borderTopStyle borderTopWidth bottom clip color fontSize fontWeight height left letterSpacing lineHeight marginBottom marginLeft marginRight marginTop markerOffset maxHeight maxWidth minHeight minWidth opacity outlineColor outlineOffset outlineWidth paddingBottom paddingLeft paddingRight paddingTop right textIndent top width wordSpacing zIndex");Element.CSS_LENGTH=/^(([\+\-]?[0-9\.]+)(em|ex|px|in|cm|mm|pt|pc|\%))|0$/;String.__parseStyleElement=document.createElement("div");String.prototype.parseStyle=function(){var B,A=$H();if(Prototype.Browser.WebKit){B=new Element("div",{style:this}).style}else{String.__parseStyleElement.innerHTML='<div style="'+this+'"></div>';B=String.__parseStyleElement.childNodes[0].style}Element.CSS_PROPERTIES.each(function(C){if(B[C]){A.set(C,B[C])}});if(Prototype.Browser.IE&&this.include("opacity")){A.set("opacity",this.match(/opacity:\s*((?:0|1)?(?:\.\d*)?)/)[1])}return A};if(document.defaultView&&document.defaultView.getComputedStyle){Element.getStyles=function(B){var A=document.defaultView.getComputedStyle($(B),null);return Element.CSS_PROPERTIES.inject({},function(C,D){C[D]=A[D];return C})}}else{Element.getStyles=function(B){B=$(B);var A=B.currentStyle,C;C=Element.CSS_PROPERTIES.inject({},function(D,E){D[E]=A[E];return D});if(!C.opacity){C.opacity=B.getOpacity()}return C}}Effect.Methods={morph:function(A,B){A=$(A);new Effect.Morph(A,Object.extend({style:B},arguments[2]||{}));return A},visualEffect:function(C,E,B){C=$(C);var D=E.dasherize().camelize(),A=D.charAt(0).toUpperCase()+D.substring(1);new Effect[A](C,B);return C},highlight:function(B,A){B=$(B);new Effect.Highlight(B,A);return B}};$w("fade appear grow shrink fold blindUp blindDown slideUp slideDown pulsate shake puff squish switchOff dropOut").each(function(A){Effect.Methods[A]=function(C,B){C=$(C);Effect[A.charAt(0).toUpperCase()+A.substring(1)](C,B);return C}});$w("getInlineOpacity forceRerendering setContentZoom collectTextNodes collectTextNodesIgnoreClass getStyles").each(function(A){Effect.Methods[A]=Element[A]});Element.addMethods(Effect.Methods);if(Object.isUndefined(Effect)){throw ("dragdrop.js requires including script.aculo.us' effects.js library")}var Droppables={drops:[],remove:function(A){this.drops=this.drops.reject(function(B){return B.element==$(A)})},add:function(B){B=$(B);var A=Object.extend({greedy:true,hoverclass:null,tree:false},arguments[1]||{});if(A.containment){A._containers=[];var C=A.containment;if(Object.isArray(C)){C.each(function(D){A._containers.push($(D))})}else{A._containers.push($(C))}}if(A.accept){A.accept=[A.accept].flatten()}Element.makePositioned(B);A.element=B;this.drops.push(A)},findDeepestChild:function(A){deepest=A[0];for(i=1;i<A.length;++i){if(Element.isParent(A[i].element,deepest.element)){deepest=A[i]}}return deepest},isContained:function(B,A){var C;if(A.tree){C=B.treeNode}else{C=B.parentNode}return A._containers.detect(function(D){return C==D})},isAffected:function(A,C,B){return((B.element!=C)&&((!B._containers)||this.isContained(C,B))&&((!B.accept)||(Element.classNames(C).detect(function(D){return B.accept.include(D)})))&&Position.within(B.element,A[0],A[1]))},deactivate:function(A){if(A.hoverclass){Element.removeClassName(A.element,A.hoverclass)}this.last_active=null},activate:function(A){if(A.hoverclass){Element.addClassName(A.element,A.hoverclass)}this.last_active=A},show:function(A,C){if(!this.drops.length){return }var B,D=[];this.drops.each(function(E){if(Droppables.isAffected(A,C,E)){D.push(E)}});if(D.length>0){B=Droppables.findDeepestChild(D)}if(this.last_active&&this.last_active!=B){this.deactivate(this.last_active)}if(B){Position.within(B.element,A[0],A[1]);if(B.onHover){B.onHover(C,B.element,Position.overlap(B.overlap,B.element))}if(B!=this.last_active){Droppables.activate(B)}}},fire:function(B,A){if(!this.last_active){return }Position.prepare();if(this.isAffected([Event.pointerX(B),Event.pointerY(B)],A,this.last_active)){if(this.last_active.onDrop){this.last_active.onDrop(A,this.last_active.element,B);return true}}},reset:function(){if(this.last_active){this.deactivate(this.last_active)}}};var Draggables={drags:[],observers:[],register:function(A){if(this.drags.length==0){this.eventMouseUp=this.endDrag.bindAsEventListener(this);this.eventMouseMove=this.updateDrag.bindAsEventListener(this);this.eventKeypress=this.keyPress.bindAsEventListener(this);Event.observe(document,"mouseup",this.eventMouseUp);Event.observe(document,"mousemove",this.eventMouseMove);Event.observe(document,"keypress",this.eventKeypress)}this.drags.push(A)},unregister:function(A){this.drags=this.drags.reject(function(B){return B==A});if(this.drags.length==0){Event.stopObserving(document,"mouseup",this.eventMouseUp);Event.stopObserving(document,"mousemove",this.eventMouseMove);Event.stopObserving(document,"keypress",this.eventKeypress)}},activate:function(A){if(A.options.delay){this._timeout=setTimeout(function(){Draggables._timeout=null;window.focus();Draggables.activeDraggable=A}.bind(this),A.options.delay)}else{window.focus();this.activeDraggable=A}},deactivate:function(){this.activeDraggable=null},updateDrag:function(A){if(!this.activeDraggable){return }var B=[Event.pointerX(A),Event.pointerY(A)];if(this._lastPointer&&(this._lastPointer.inspect()==B.inspect())){return }this._lastPointer=B;this.activeDraggable.updateDrag(A,B)},endDrag:function(A){if(this._timeout){clearTimeout(this._timeout);this._timeout=null}if(!this.activeDraggable){return }this._lastPointer=null;this.activeDraggable.endDrag(A);this.activeDraggable=null},keyPress:function(A){if(this.activeDraggable){this.activeDraggable.keyPress(A)}},addObserver:function(A){this.observers.push(A);this._cacheObserverCallbacks()},removeObserver:function(A){this.observers=this.observers.reject(function(B){return B.element==A});this._cacheObserverCallbacks()},notify:function(B,A,C){if(this[B+"Count"]>0){this.observers.each(function(D){if(D[B]){D[B](B,A,C)}})}if(A.options[B]){A.options[B](A,C)}},_cacheObserverCallbacks:function(){["onStart","onEnd","onDrag"].each(function(A){Draggables[A+"Count"]=Draggables.observers.select(function(B){return B[A]}).length})}};var Draggable=Class.create({initialize:function(B){var C={handle:false,reverteffect:function(F,E,D){var G=Math.sqrt(Math.abs(E^2)+Math.abs(D^2))*0.02;new Effect.Move(F,{x:-D,y:-E,duration:G,queue:{scope:"_draggable",position:"end"}})},endeffect:function(E){var D=Object.isNumber(E._opacity)?E._opacity:1;new Effect.Opacity(E,{duration:0.2,from:0.7,to:D,queue:{scope:"_draggable",position:"end"},afterFinish:function(){Draggable._dragging[E]=false}})},zindex:1000,revert:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,snap:false,delay:0};if(!arguments[1]||Object.isUndefined(arguments[1].endeffect)){Object.extend(C,{starteffect:function(D){D._opacity=Element.getOpacity(D);Draggable._dragging[D]=true;new Effect.Opacity(D,{duration:0.2,from:D._opacity,to:0.7})}})}var A=Object.extend(C,arguments[1]||{});this.element=$(B);if(A.handle&&Object.isString(A.handle)){this.handle=this.element.down("."+A.handle,0)}if(!this.handle){this.handle=$(A.handle)}if(!this.handle){this.handle=this.element}if(A.scroll&&!A.scroll.scrollTo&&!A.scroll.outerHTML){A.scroll=$(A.scroll);this._isScrollChild=Element.childOf(this.element,A.scroll)}Element.makePositioned(this.element);this.options=A;this.dragging=false;this.eventMouseDown=this.initDrag.bindAsEventListener(this);Event.observe(this.handle,"mousedown",this.eventMouseDown);Draggables.register(this)},destroy:function(){Event.stopObserving(this.handle,"mousedown",this.eventMouseDown);Draggables.unregister(this)},currentDelta:function(){return([parseInt(Element.getStyle(this.element,"left")||"0"),parseInt(Element.getStyle(this.element,"top")||"0")])},initDrag:function(A){if(!Object.isUndefined(Draggable._dragging[this.element])&&Draggable._dragging[this.element]){return }if(Event.isLeftClick(A)){var C=Event.element(A);if((tag_name=C.tagName.toUpperCase())&&(tag_name=="INPUT"||tag_name=="SELECT"||tag_name=="OPTION"||tag_name=="BUTTON"||tag_name=="TEXTAREA")){return }var B=[Event.pointerX(A),Event.pointerY(A)];var D=Position.cumulativeOffset(this.element);this.offset=[0,1].map(function(E){return(B[E]-D[E])});Draggables.activate(this);Event.stop(A)}},startDrag:function(B){this.dragging=true;if(!this.delta){this.delta=this.currentDelta()}if(this.options.zindex){this.originalZ=parseInt(Element.getStyle(this.element,"z-index")||0);this.element.style.zIndex=this.options.zindex}if(this.options.ghosting){this._clone=this.element.cloneNode(true);this._originallyAbsolute=(this.element.getStyle("position")=="absolute");if(!this._originallyAbsolute){Position.absolutize(this.element)}this.element.parentNode.insertBefore(this._clone,this.element)}if(this.options.scroll){if(this.options.scroll==window){var A=this._getWindowScroll(this.options.scroll);this.originalScrollLeft=A.left;this.originalScrollTop=A.top}else{this.originalScrollLeft=this.options.scroll.scrollLeft;this.originalScrollTop=this.options.scroll.scrollTop}}Draggables.notify("onStart",this,B);if(this.options.starteffect){this.options.starteffect(this.element)}},updateDrag:function(event,pointer){if(!this.dragging){this.startDrag(event)}if(!this.options.quiet){Position.prepare();Droppables.show(pointer,this.element)}Draggables.notify("onDrag",this,event);this.draw(pointer);if(this.options.change){this.options.change(this)}if(this.options.scroll){this.stopScrolling();var p;if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){p=[left,top,left+width,top+height]}}else{p=Position.page(this.options.scroll);p[0]+=this.options.scroll.scrollLeft+Position.deltaX;p[1]+=this.options.scroll.scrollTop+Position.deltaY;p.push(p[0]+this.options.scroll.offsetWidth);p.push(p[1]+this.options.scroll.offsetHeight)}var speed=[0,0];if(pointer[0]<(p[0]+this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[0]+this.options.scrollSensitivity)}if(pointer[1]<(p[1]+this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[1]+this.options.scrollSensitivity)}if(pointer[0]>(p[2]-this.options.scrollSensitivity)){speed[0]=pointer[0]-(p[2]-this.options.scrollSensitivity)}if(pointer[1]>(p[3]-this.options.scrollSensitivity)){speed[1]=pointer[1]-(p[3]-this.options.scrollSensitivity)}this.startScrolling(speed)}if(Prototype.Browser.WebKit){window.scrollBy(0,0)}Event.stop(event)},finishDrag:function(B,E){this.dragging=false;if(this.options.quiet){Position.prepare();var D=[Event.pointerX(B),Event.pointerY(B)];Droppables.show(D,this.element)}if(this.options.ghosting){if(!this._originallyAbsolute){Position.relativize(this.element)}delete this._originallyAbsolute;Element.remove(this._clone);this._clone=null}var F=false;if(E){F=Droppables.fire(B,this.element);if(!F){F=false}}if(F&&this.options.onDropped){this.options.onDropped(this.element)}Draggables.notify("onEnd",this,B);var A=this.options.revert;if(A&&Object.isFunction(A)){A=A(this.element)}var C=this.currentDelta();if(A&&this.options.reverteffect){if(F==0||A!="failure"){this.options.reverteffect(this.element,C[1]-this.delta[1],C[0]-this.delta[0])}}else{this.delta=C}if(this.options.zindex){this.element.style.zIndex=this.originalZ}if(this.options.endeffect){this.options.endeffect(this.element)}Draggables.deactivate(this);Droppables.reset()},keyPress:function(A){if(A.keyCode!=Event.KEY_ESC){return }this.finishDrag(A,false);Event.stop(A)},endDrag:function(A){if(!this.dragging){return }this.stopScrolling();this.finishDrag(A,true);Event.stop(A)},draw:function(A){var F=Position.cumulativeOffset(this.element);if(this.options.ghosting){var C=Position.realOffset(this.element);F[0]+=C[0]-Position.deltaX;F[1]+=C[1]-Position.deltaY}var E=this.currentDelta();F[0]-=E[0];F[1]-=E[1];if(this.options.scroll&&(this.options.scroll!=window&&this._isScrollChild)){F[0]-=this.options.scroll.scrollLeft-this.originalScrollLeft;F[1]-=this.options.scroll.scrollTop-this.originalScrollTop}var D=[0,1].map(function(G){return(A[G]-F[G]-this.offset[G])}.bind(this));if(this.options.snap){if(Object.isFunction(this.options.snap)){D=this.options.snap(D[0],D[1],this)}else{if(Object.isArray(this.options.snap)){D=D.map(function(G,H){return(G/this.options.snap[H]).round()*this.options.snap[H]}.bind(this))}else{D=D.map(function(G){return(G/this.options.snap).round()*this.options.snap}.bind(this))}}}var B=this.element.style;if((!this.options.constraint)||(this.options.constraint=="horizontal")){B.left=D[0]+"px"}if((!this.options.constraint)||(this.options.constraint=="vertical")){B.top=D[1]+"px"}if(B.visibility=="hidden"){B.visibility=""}},stopScrolling:function(){if(this.scrollInterval){clearInterval(this.scrollInterval);this.scrollInterval=null;Draggables._lastScrollPointer=null}},startScrolling:function(A){if(!(A[0]||A[1])){return }this.scrollSpeed=[A[0]*this.options.scrollSpeed,A[1]*this.options.scrollSpeed];this.lastScrolled=new Date();this.scrollInterval=setInterval(this.scroll.bind(this),10)},scroll:function(){var current=new Date();var delta=current-this.lastScrolled;this.lastScrolled=current;if(this.options.scroll==window){with(this._getWindowScroll(this.options.scroll)){if(this.scrollSpeed[0]||this.scrollSpeed[1]){var d=delta/1000;this.options.scroll.scrollTo(left+d*this.scrollSpeed[0],top+d*this.scrollSpeed[1])}}}else{this.options.scroll.scrollLeft+=this.scrollSpeed[0]*delta/1000;this.options.scroll.scrollTop+=this.scrollSpeed[1]*delta/1000}Position.prepare();Droppables.show(Draggables._lastPointer,this.element);Draggables.notify("onDrag",this);if(this._isScrollChild){Draggables._lastScrollPointer=Draggables._lastScrollPointer||$A(Draggables._lastPointer);Draggables._lastScrollPointer[0]+=this.scrollSpeed[0]*delta/1000;Draggables._lastScrollPointer[1]+=this.scrollSpeed[1]*delta/1000;if(Draggables._lastScrollPointer[0]<0){Draggables._lastScrollPointer[0]=0}if(Draggables._lastScrollPointer[1]<0){Draggables._lastScrollPointer[1]=0}this.draw(Draggables._lastScrollPointer)}if(this.options.change){this.options.change(this)}},_getWindowScroll:function(w){var T,L,W,H;with(w.document){if(w.document.documentElement&&documentElement.scrollTop){T=documentElement.scrollTop;L=documentElement.scrollLeft}else{if(w.document.body){T=body.scrollTop;L=body.scrollLeft}}if(w.innerWidth){W=w.innerWidth;H=w.innerHeight}else{if(w.document.documentElement&&documentElement.clientWidth){W=documentElement.clientWidth;H=documentElement.clientHeight}else{W=body.offsetWidth;H=body.offsetHeight}}}return{top:T,left:L,width:W,height:H}}});Draggable._dragging={};var SortableObserver=Class.create({initialize:function(B,A){this.element=$(B);this.observer=A;this.lastValue=Sortable.serialize(this.element)},onStart:function(){this.lastValue=Sortable.serialize(this.element)},onEnd:function(){Sortable.unmark();if(this.lastValue!=Sortable.serialize(this.element)){this.observer(this.element)}}});var Sortable={SERIALIZE_RULE:/^[^_\-](?:[A-Za-z0-9\-\_]*)[_](.*)$/,sortables:{},_findRootElement:function(A){while(A.tagName.toUpperCase()!="BODY"){if(A.id&&Sortable.sortables[A.id]){return A}A=A.parentNode}},options:function(A){A=Sortable._findRootElement($(A));if(!A){return }return Sortable.sortables[A.id]},destroy:function(A){A=$(A);var B=Sortable.sortables[A.id];if(B){Draggables.removeObserver(B.element);B.droppables.each(function(C){Droppables.remove(C)});B.draggables.invoke("destroy");delete Sortable.sortables[B.element.id]}},create:function(C){C=$(C);var B=Object.extend({element:C,tag:"li",dropOnEmpty:false,tree:false,treeTag:"ul",overlap:"vertical",constraint:"vertical",containment:C,handle:false,only:false,delay:0,hoverclass:null,ghosting:false,quiet:false,scroll:false,scrollSensitivity:20,scrollSpeed:15,format:this.SERIALIZE_RULE,elements:false,handles:false,onChange:Prototype.emptyFunction,onUpdate:Prototype.emptyFunction},arguments[1]||{});this.destroy(C);var A={revert:true,quiet:B.quiet,scroll:B.scroll,scrollSpeed:B.scrollSpeed,scrollSensitivity:B.scrollSensitivity,delay:B.delay,ghosting:B.ghosting,constraint:B.constraint,handle:B.handle};if(B.starteffect){A.starteffect=B.starteffect}if(B.reverteffect){A.reverteffect=B.reverteffect}else{if(B.ghosting){A.reverteffect=function(F){F.style.top=0;F.style.left=0}}}if(B.endeffect){A.endeffect=B.endeffect}if(B.zindex){A.zindex=B.zindex}var D={overlap:B.overlap,containment:B.containment,tree:B.tree,hoverclass:B.hoverclass,onHover:Sortable.onHover};var E={onHover:Sortable.onEmptyHover,overlap:B.overlap,containment:B.containment,hoverclass:B.hoverclass};Element.cleanWhitespace(C);B.draggables=[];B.droppables=[];if(B.dropOnEmpty||B.tree){Droppables.add(C,E);B.droppables.push(C)}(B.elements||this.findElements(C,B)||[]).each(function(H,F){var G=B.handles?$(B.handles[F]):(B.handle?$(H).select("."+B.handle)[0]:H);B.draggables.push(new Draggable(H,Object.extend(A,{handle:G})));Droppables.add(H,D);if(B.tree){H.treeNode=C}B.droppables.push(H)});if(B.tree){(Sortable.findTreeElements(C,B)||[]).each(function(F){Droppables.add(F,E);F.treeNode=C;B.droppables.push(F)})}this.sortables[C.id]=B;Draggables.addObserver(new SortableObserver(C,B.onUpdate))},findElements:function(B,A){return Element.findChildren(B,A.only,A.tree?true:false,A.tag)},findTreeElements:function(B,A){return Element.findChildren(B,A.only,A.tree?true:false,A.treeTag)},onHover:function(E,D,A){if(Element.isParent(D,E)){return }if(A>0.33&&A<0.66&&Sortable.options(D).tree){return }else{if(A>0.5){Sortable.mark(D,"before");if(D.previousSibling!=E){var B=E.parentNode;E.style.visibility="hidden";D.parentNode.insertBefore(E,D);if(D.parentNode!=B){Sortable.options(B).onChange(E)}Sortable.options(D.parentNode).onChange(E)}}else{Sortable.mark(D,"after");var C=D.nextSibling||null;if(C!=E){var B=E.parentNode;E.style.visibility="hidden";D.parentNode.insertBefore(E,C);if(D.parentNode!=B){Sortable.options(B).onChange(E)}Sortable.options(D.parentNode).onChange(E)}}}},onEmptyHover:function(E,G,H){var I=E.parentNode;var A=Sortable.options(G);if(!Element.isParent(G,E)){var F;var C=Sortable.findElements(G,{tag:A.tag,only:A.only});var B=null;if(C){var D=Element.offsetSize(G,A.overlap)*(1-H);for(F=0;F<C.length;F+=1){if(D-Element.offsetSize(C[F],A.overlap)>=0){D-=Element.offsetSize(C[F],A.overlap)}else{if(D-(Element.offsetSize(C[F],A.overlap)/2)>=0){B=F+1<C.length?C[F+1]:null;break}else{B=C[F];break}}}}G.insertBefore(E,B);Sortable.options(I).onChange(E);A.onChange(E)}},unmark:function(){if(Sortable._marker){Sortable._marker.hide()}},mark:function(B,A){var D=Sortable.options(B.parentNode);if(D&&!D.ghosting){return }if(!Sortable._marker){Sortable._marker=($("dropmarker")||Element.extend(document.createElement("DIV"))).hide().addClassName("dropmarker").setStyle({position:"absolute"});document.getElementsByTagName("body").item(0).appendChild(Sortable._marker)}var C=Position.cumulativeOffset(B);Sortable._marker.setStyle({left:C[0]+"px",top:C[1]+"px"});if(A=="after"){if(D.overlap=="horizontal"){Sortable._marker.setStyle({left:(C[0]+B.clientWidth)+"px"})}else{Sortable._marker.setStyle({top:(C[1]+B.clientHeight)+"px"})}}Sortable._marker.show()},_tree:function(E,B,F){var D=Sortable.findElements(E,B)||[];for(var C=0;C<D.length;++C){var A=D[C].id.match(B.format);if(!A){continue}var G={id:encodeURIComponent(A?A[1]:null),element:E,parent:F,children:[],position:F.children.length,container:$(D[C]).down(B.treeTag)};if(G.container){this._tree(G.container,B,G)}F.children.push(G)}return F},tree:function(D){D=$(D);var C=this.options(D);var B=Object.extend({tag:C.tag,treeTag:C.treeTag,only:C.only,name:D.id,format:C.format},arguments[1]||{});var A={id:null,parent:null,children:[],container:D,position:0};return Sortable._tree(D,B,A)},_constructIndex:function(B){var A="";do{if(B.id){A="["+B.position+"]"+A}}while((B=B.parent)!=null);return A},sequence:function(B){B=$(B);var A=Object.extend(this.options(B),arguments[1]||{});return $(this.findElements(B,A)||[]).map(function(C){return C.id.match(A.format)?C.id.match(A.format)[1]:""})},setSequence:function(B,C){B=$(B);var A=Object.extend(this.options(B),arguments[2]||{});var D={};this.findElements(B,A).each(function(E){if(E.id.match(A.format)){D[E.id.match(A.format)[1]]=[E,E.parentNode]}E.parentNode.removeChild(E)});C.each(function(E){var F=D[E];if(F){F[1].appendChild(F[0]);delete D[E]}})},serialize:function(C){C=$(C);var B=Object.extend(Sortable.options(C),arguments[1]||{});var A=encodeURIComponent((arguments[1]&&arguments[1].name)?arguments[1].name:C.id);if(B.tree){return Sortable.tree(C,arguments[1]).children.map(function(D){return[A+Sortable._constructIndex(D)+"[id]="+encodeURIComponent(D.id)].concat(D.children.map(arguments.callee))}).flatten().join("&")}else{return Sortable.sequence(C,arguments[1]).map(function(D){return A+"[]="+encodeURIComponent(D)}).join("&")}}};Element.isParent=function(B,A){if(!B.parentNode||B==A){return false}if(B.parentNode==A){return true}return Element.isParent(B.parentNode,A)};Element.findChildren=function(D,B,A,C){if(!D.hasChildNodes()){return null}C=C.toUpperCase();if(B){B=[B].flatten()}var E=[];$A(D.childNodes).each(function(G){if(G.tagName&&G.tagName.toUpperCase()==C&&(!B||(Element.classNames(G).detect(function(H){return B.include(H)})))){E.push(G)}if(A){var F=Element.findChildren(G,B,A,C);if(F){E.push(F)}}});return(E.length>0?E.flatten():[])};Element.offsetSize=function(A,B){return A["offset"+((B=="vertical"||B=="height")?"Height":"Width")]};if(typeof Effect=="undefined"){throw ("controls.js requires including script.aculo.us' effects.js library")}var Autocompleter={};Autocompleter.Base=Class.create({baseInitialize:function(B,C,A){B=$(B);this.element=B;this.update=$(C);this.hasFocus=false;this.changed=false;this.active=false;this.index=0;this.entryCount=0;this.oldElementValue=this.element.value;if(this.setOptions){this.setOptions(A)}else{this.options=A||{}}this.options.paramName=this.options.paramName||this.element.name;this.options.tokens=this.options.tokens||[];this.options.frequency=this.options.frequency||0.4;this.options.minChars=this.options.minChars||1;this.options.onShow=this.options.onShow||function(D,E){if(!E.style.position||E.style.position=="absolute"){E.style.position="absolute";Position.clone(D,E,{setHeight:false,offsetTop:D.offsetHeight})}Effect.Appear(E,{duration:0.15})};this.options.onHide=this.options.onHide||function(D,E){new Effect.Fade(E,{duration:0.15})};if(typeof (this.options.tokens)=="string"){this.options.tokens=new Array(this.options.tokens)}if(!this.options.tokens.include("\n")){this.options.tokens.push("\n")}this.observer=null;this.element.setAttribute("autocomplete","off");Element.hide(this.update);Event.observe(this.element,"blur",this.onBlur.bindAsEventListener(this));Event.observe(this.element,"keydown",this.onKeyPress.bindAsEventListener(this))},show:function(){if(Element.getStyle(this.update,"display")=="none"){this.options.onShow(this.element,this.update)}if(!this.iefix&&(Prototype.Browser.IE)&&(Element.getStyle(this.update,"position")=="absolute")){new Insertion.After(this.update,'<iframe id="'+this.update.id+'_iefix" style="display:none;position:absolute;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=0);" src="javascript:false;" frameborder="0" scrolling="no"></iframe>');this.iefix=$(this.update.id+"_iefix")}if(this.iefix){setTimeout(this.fixIEOverlapping.bind(this),50)}},fixIEOverlapping:function(){Position.clone(this.update,this.iefix,{setTop:(!this.update.style.height)});this.iefix.style.zIndex=1;this.update.style.zIndex=2;Element.show(this.iefix)},hide:function(){this.stopIndicator();if(Element.getStyle(this.update,"display")!="none"){this.options.onHide(this.element,this.update)}if(this.iefix){Element.hide(this.iefix)}},startIndicator:function(){if(this.options.indicator){Element.show(this.options.indicator)}},stopIndicator:function(){if(this.options.indicator){Element.hide(this.options.indicator)}},onKeyPress:function(A){if(this.active){switch(A.keyCode){case Event.KEY_TAB:case Event.KEY_RETURN:this.selectEntry();Event.stop(A);case Event.KEY_ESC:this.hide();this.active=false;Event.stop(A);return ;case Event.KEY_LEFT:case Event.KEY_RIGHT:return ;case Event.KEY_UP:this.markPrevious();this.render();Event.stop(A);return ;case Event.KEY_DOWN:this.markNext();this.render();Event.stop(A);return }}else{if(A.keyCode==Event.KEY_TAB||A.keyCode==Event.KEY_RETURN||(Prototype.Browser.WebKit>0&&A.keyCode==0)){return }}this.changed=true;this.hasFocus=true;if(this.observer){clearTimeout(this.observer)}this.observer=setTimeout(this.onObserverEvent.bind(this),this.options.frequency*1000)},activate:function(){this.changed=false;this.hasFocus=true;this.getUpdatedChoices()},onHover:function(B){var A=Event.findElement(B,"LI");if(this.index!=A.autocompleteIndex){this.index=A.autocompleteIndex;this.render()}Event.stop(B)},onClick:function(B){var A=Event.findElement(B,"LI");this.index=A.autocompleteIndex;this.selectEntry();this.hide()},onBlur:function(A){setTimeout(this.hide.bind(this),250);this.hasFocus=false;this.active=false},render:function(){if(this.entryCount>0){for(var A=0;A<this.entryCount;A++){this.index==A?Element.addClassName(this.getEntry(A),"selected"):Element.removeClassName(this.getEntry(A),"selected")}if(this.hasFocus){this.show();this.active=true}}else{this.active=false;this.hide()}},markPrevious:function(){if(this.index>0){this.index--}else{this.index=this.entryCount-1}this.getEntry(this.index).scrollIntoView(true)},markNext:function(){if(this.index<this.entryCount-1){this.index++}else{this.index=0}this.getEntry(this.index).scrollIntoView(false)},getEntry:function(A){return this.update.firstChild.childNodes[A]},getEntry:function(){return this.getEntry(this.index)},selectEntry:function(){this.active=false;this.updateElement(this.getCurrentEntry())},updateElement:function(F){if(this.options.updateElement){this.options.updateElement(F);return }var D="";if(this.options.select){var A=$(F).select("."+this.options.select)||[];if(A.length>0){D=Element.collectTextNodes(A[0],this.options.select)}}else{D=Element.collectTextNodesIgnoreClass(F,"informal")}var C=this.getTokenBounds();if(C[0]!=-1){var E=this.element.value.substr(0,C[0]);var B=this.element.value.substr(C[0]).match(/^\s+/);if(B){E+=B[0]}this.element.value=E+D+this.element.value.substr(C[1])}else{this.element.value=D}this.oldElementValue=this.element.value;this.element.focus();if(this.options.afterUpdateElement){this.options.afterUpdateElement(this.element,F)}},updateChoices:function(C){if(!this.changed&&this.hasFocus){this.update.innerHTML=C;Element.cleanWhitespace(this.update);Element.cleanWhitespace(this.update.down());if(this.update.firstChild&&this.update.down().childNodes){this.entryCount=this.update.down().childNodes.length;for(var A=0;A<this.entryCount;A++){var B=this.getEntry(A);B.autocompleteIndex=A;this.addObservers(B)}}else{this.entryCount=0}this.stopIndicator();this.index=0;if(this.entryCount==1&&this.options.autoSelect){this.selectEntry();this.hide()}else{this.render()}}},addObservers:function(A){Event.observe(A,"mouseover",this.onHover.bindAsEventListener(this));Event.observe(A,"click",this.onClick.bindAsEventListener(this))},onObserverEvent:function(){this.changed=false;this.tokenBounds=null;if(this.getToken().length>=this.options.minChars){this.getUpdatedChoices()}else{this.active=false;this.hide()}this.oldElementValue=this.element.value},getToken:function(){var A=this.getTokenBounds();return this.element.value.substring(A[0],A[1]).strip()},getTokenBounds:function(){if(null!=this.tokenBounds){return this.tokenBounds}var E=this.element.value;if(E.strip().empty()){return[-1,0]}var F=arguments.callee.getFirstDifferencePos(E,this.oldElementValue);var H=(F==this.oldElementValue.length?1:0);var D=-1,C=E.length;var G;for(var B=0,A=this.options.tokens.length;B<A;++B){G=E.lastIndexOf(this.options.tokens[B],F+H-1);if(G>D){D=G}G=E.indexOf(this.options.tokens[B],F+H);if(-1!=G&&G<C){C=G}}return(this.tokenBounds=[D+1,C])}});Autocompleter.Base.prototype.getTokenBounds.getFirstDifferencePos=function(C,A){var D=Math.min(C.length,A.length);for(var B=0;B<D;++B){if(C[B]!=A[B]){return B}}return D};Ajax.Autocompleter=Class.create(Autocompleter.Base,{initialize:function(C,D,B,A){this.baseInitialize(C,D,A);this.options.asynchronous=true;this.options.onComplete=this.onComplete.bind(this);this.options.defaultParams=this.options.parameters||null;this.url=B},getUpdatedChoices:function(){this.startIndicator();var A=encodeURIComponent(this.options.paramName)+"="+encodeURIComponent(this.getToken());this.options.parameters=this.options.callback?this.options.callback(this.element,A):A;if(this.options.defaultParams){this.options.parameters+="&"+this.options.defaultParams}new Ajax.Request(this.url,this.options)},onComplete:function(A){this.updateChoices(A.responseText)}});Autocompleter.Local=Class.create(Autocompleter.Base,{initialize:function(B,D,C,A){this.baseInitialize(B,D,A);this.options.array=C},getUpdatedChoices:function(){this.updateChoices(this.options.selector(this))},setOptions:function(A){this.options=Object.extend({choices:10,partialSearch:true,partialChars:2,ignoreCase:true,fullSearch:false,selector:function(B){var D=[];var C=[];var H=B.getToken();var G=0;for(var E=0;E<B.options.array.length&&D.length<B.options.choices;E++){var F=B.options.array[E];var I=B.options.ignoreCase?F.toLowerCase().indexOf(H.toLowerCase()):F.indexOf(H);while(I!=-1){if(I==0&&F.length!=H.length){D.push("<li><strong>"+F.substr(0,H.length)+"</strong>"+F.substr(H.length)+"</li>");break}else{if(H.length>=B.options.partialChars&&B.options.partialSearch&&I!=-1){if(B.options.fullSearch||/\s/.test(F.substr(I-1,1))){C.push("<li>"+F.substr(0,I)+"<strong>"+F.substr(I,H.length)+"</strong>"+F.substr(I+H.length)+"</li>");break}}}I=B.options.ignoreCase?F.toLowerCase().indexOf(H.toLowerCase(),I+1):F.indexOf(H,I+1)}}if(C.length){D=D.concat(C.slice(0,B.options.choices-D.length))}return"<ul>"+D.join("")+"</ul>"}},A||{})}});Field.scrollFreeActivate=function(A){setTimeout(function(){Field.activate(A)},1)};Ajax.InPlaceEditor=Class.create({initialize:function(C,B,A){this.url=B;this.element=C=$(C);this.prepareOptions();this._controls={};arguments.callee.dealWithDeprecatedOptions(A);Object.extend(this.options,A||{});if(!this.options.formId&&this.element.id){this.options.formId=this.element.id+"-inplaceeditor";if($(this.options.formId)){this.options.formId=""}}if(this.options.externalControl){this.options.externalControl=$(this.options.externalControl)}if(!this.options.externalControl){this.options.externalControlOnly=false}this._originalBackground=this.element.getStyle("background-color")||"transparent";this.element.title=this.options.clickToEditText;this._boundCancelHandler=this.handleFormCancellation.bind(this);this._boundComplete=(this.options.onComplete||Prototype.emptyFunction).bind(this);this._boundFailureHandler=this.handleAJAXFailure.bind(this);this._boundSubmitHandler=this.handleFormSubmission.bind(this);this._boundWrapperHandler=this.wrapUp.bind(this);this.registerListeners()},checkForEscapeOrReturn:function(A){if(!this._editing||A.ctrlKey||A.altKey||A.shiftKey){return }if(Event.KEY_ESC==A.keyCode){this.handleFormCancellation(A)}else{if(Event.KEY_RETURN==A.keyCode){this.handleFormSubmission(A)}}},createControl:function(G,C,B){var E=this.options[G+"Control"];var F=this.options[G+"Text"];if("button"==E){var A=document.createElement("input");A.type="submit";A.value=F;A.className="editor_"+G+"_button";if("cancel"==G){A.onclick=this._boundCancelHandler}this._form.appendChild(A);this._controls[G]=A}else{if("link"==E){var D=document.createElement("a");D.href="#";D.appendChild(document.createTextNode(F));D.onclick="cancel"==G?this._boundCancelHandler:this._boundSubmitHandler;D.className="editor_"+G+"_link";if(B){D.className+=" "+B}this._form.appendChild(D);this._controls[G]=D}}},createEditField:function(){var C=(this.options.loadTextURL?this.options.loadingText:this.getText());var B;if(1>=this.options.rows&&!/\r|\n/.test(this.getText())){B=document.createElement("input");B.type="text";var A=this.options.size||this.options.cols||0;if(0<A){B.size=A}}else{B=document.createElement("textarea");B.rows=(1>=this.options.rows?this.options.autoRows:this.options.rows);B.cols=this.options.cols||40}B.name=this.options.paramName;B.value=C;B.className="editor_field";if(this.options.submitOnBlur){B.onblur=this._boundSubmitHandler}this._controls.editor=B;if(this.options.loadTextURL){this.loadExternalText()}this._form.appendChild(this._controls.editor)},createForm:function(){var B=this;function A(D,E){var C=B.options["text"+D+"Controls"];if(!C||E===false){return }B._form.appendChild(document.createTextNode(C))}this._form=$(document.createElement("form"));this._form.id=this.options.formId;this._form.addClassName(this.options.formClassName);this._form.onsubmit=this._boundSubmitHandler;this.createEditField();if("textarea"==this._controls.editor.tagName.toLowerCase()){this._form.appendChild(document.createElement("br"))}if(this.options.onFormCustomization){this.options.onFormCustomization(this,this._form)}A("Before",this.options.okControl||this.options.cancelControl);this.createControl("ok",this._boundSubmitHandler);A("Between",this.options.okControl&&this.options.cancelControl);this.createControl("cancel",this._boundCancelHandler,"editor_cancel");A("After",this.options.okControl||this.options.cancelControl)},destroy:function(){if(this._oldInnerHTML){this.element.innerHTML=this._oldInnerHTML}this.leaveEditMode();this.unregisterListeners()},enterEditMode:function(A){if(this._saving||this._editing){return }this._editing=true;this.triggerCallback("onEnterEditMode");if(this.options.externalControl){this.options.externalControl.hide()}this.element.hide();this.createForm();this.element.parentNode.insertBefore(this._form,this.element);if(!this.options.loadTextURL){this.postProcessEditField()}if(A){Event.stop(A)}},enterHover:function(A){if(this.options.hoverClassName){this.element.addClassName(this.options.hoverClassName)}if(this._saving){return }this.triggerCallback("onEnterHover")},getText:function(){return this.element.innerHTML.unescapeHTML()},handleAJAXFailure:function(A){this.triggerCallback("onFailure",A);if(this._oldInnerHTML){this.element.innerHTML=this._oldInnerHTML;this._oldInnerHTML=null}},handleFormCancellation:function(A){this.wrapUp();if(A){Event.stop(A)}},handleFormSubmission:function(D){var B=this._form;var C=$F(this._controls.editor);this.prepareSubmission();var E=this.options.callback(B,C)||"";if(Object.isString(E)){E=E.toQueryParams()}E.editorId=this.element.id;if(this.options.htmlResponse){var A=Object.extend({evalScripts:true},this.options.ajaxOptions);Object.extend(A,{parameters:E,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});new Ajax.Updater({success:this.element},this.url,A)}else{var A=Object.extend({method:"get"},this.options.ajaxOptions);Object.extend(A,{parameters:E,onComplete:this._boundWrapperHandler,onFailure:this._boundFailureHandler});new Ajax.Request(this.url,A)}if(D){Event.stop(D)}},leaveEditMode:function(){this.element.removeClassName(this.options.savingClassName);this.removeForm();this.leaveHover();this.element.style.backgroundColor=this._originalBackground;this.element.show();if(this.options.externalControl){this.options.externalControl.show()}this._saving=false;this._editing=false;this._oldInnerHTML=null;this.triggerCallback("onLeaveEditMode")},leaveHover:function(A){if(this.options.hoverClassName){this.element.removeClassName(this.options.hoverClassName)}if(this._saving){return }this.triggerCallback("onLeaveHover")},loadExternalText:function(){this._form.addClassName(this.options.loadingClassName);this._controls.editor.disabled=true;var A=Object.extend({method:"get"},this.options.ajaxOptions);Object.extend(A,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(C){this._form.removeClassName(this.options.loadingClassName);var B=C.responseText;if(this.options.stripLoadedTextTags){B=B.stripTags()}this._controls.editor.value=B;this._controls.editor.disabled=false;this.postProcessEditField()}.bind(this),onFailure:this._boundFailureHandler});new Ajax.Request(this.options.loadTextURL,A)},postProcessEditField:function(){var A=this.options.fieldPostCreation;if(A){$(this._controls.editor)["focus"==A?"focus":"activate"]()}},prepareOptions:function(){this.options=Object.clone(Ajax.InPlaceEditor.DefaultOptions);Object.extend(this.options,Ajax.InPlaceEditor.DefaultCallbacks);[this._extraDefaultOptions].flatten().compact().each(function(A){Object.extend(this.options,A)}.bind(this))},prepareSubmission:function(){this._saving=true;this.removeForm();this.leaveHover();this.showSaving()},registerListeners:function(){this._listeners={};var A;$H(Ajax.InPlaceEditor.Listeners).each(function(B){A=this[B.value].bind(this);this._listeners[B.key]=A;if(!this.options.externalControlOnly){this.element.observe(B.key,A)}if(this.options.externalControl){this.options.externalControl.observe(B.key,A)}}.bind(this))},removeForm:function(){if(!this._form){return }this._form.remove();this._form=null;this._controls={}},showSaving:function(){this._oldInnerHTML=this.element.innerHTML;this.element.innerHTML=this.options.savingText;this.element.addClassName(this.options.savingClassName);this.element.style.backgroundColor=this._originalBackground;this.element.show()},triggerCallback:function(B,A){if("function"==typeof this.options[B]){this.options[B](this,A)}},unregisterListeners:function(){$H(this._listeners).each(function(A){if(!this.options.externalControlOnly){this.element.stopObserving(A.key,A.value)}if(this.options.externalControl){this.options.externalControl.stopObserving(A.key,A.value)}}.bind(this))},wrapUp:function(A){this.leaveEditMode();this._boundComplete(A,this.element)}});Object.extend(Ajax.InPlaceEditor.prototype,{dispose:Ajax.InPlaceEditor.prototype.destroy});Ajax.InPlaceCollectionEditor=Class.create(Ajax.InPlaceEditor,{initialize:function($super,C,B,A){this._extraDefaultOptions=Ajax.InPlaceCollectionEditor.DefaultOptions;$super(C,B,A)},createEditField:function(){var A=document.createElement("select");A.name=this.options.paramName;A.size=1;this._controls.editor=A;this._collection=this.options.collection||[];if(this.options.loadCollectionURL){this.loadCollection()}else{this.checkForExternalText()}this._form.appendChild(this._controls.editor)},loadCollection:function(){this._form.addClassName(this.options.loadingClassName);this.showLoadingText(this.options.loadingCollectionText);var options=Object.extend({method:"get"},this.options.ajaxOptions);Object.extend(options,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(transport){var js=transport.responseText.strip();if(!/^\[.*\]$/.test(js)){throw ("Server returned an invalid collection representation.")}this._collection=eval(js);this.checkForExternalText()}.bind(this),onFailure:this.onFailure});new Ajax.Request(this.options.loadCollectionURL,options)},showLoadingText:function(B){this._controls.editor.disabled=true;var A=this._controls.editor.firstChild;if(!A){A=document.createElement("option");A.value="";this._controls.editor.appendChild(A);A.selected=true}A.update((B||"").stripScripts().stripTags())},checkForExternalText:function(){this._text=this.getText();if(this.options.loadTextURL){this.loadExternalText()}else{this.buildOptionList()}},loadExternalText:function(){this.showLoadingText(this.options.loadingText);var A=Object.extend({method:"get"},this.options.ajaxOptions);Object.extend(A,{parameters:"editorId="+encodeURIComponent(this.element.id),onComplete:Prototype.emptyFunction,onSuccess:function(B){this._text=B.responseText.strip();this.buildOptionList()}.bind(this),onFailure:this.onFailure});new Ajax.Request(this.options.loadTextURL,A)},buildOptionList:function(){this._form.removeClassName(this.options.loadingClassName);this._collection=this._collection.map(function(D){return 2===D.length?D:[D,D].flatten()});var B=("value" in this.options)?this.options.value:this._text;var A=this._collection.any(function(D){return D[0]==B}.bind(this));this._controls.editor.update("");var C;this._collection.each(function(E,D){C=document.createElement("option");C.value=E[0];C.selected=A?E[0]==B:0==D;C.appendChild(document.createTextNode(E[1]));this._controls.editor.appendChild(C)}.bind(this));this._controls.editor.disabled=false;Field.scrollFreeActivate(this._controls.editor)}});Ajax.InPlaceEditor.prototype.initialize.dealWithDeprecatedOptions=function(A){if(!A){return }function B(C,D){if(C in A||D===undefined){return }A[C]=D}B("cancelControl",(A.cancelLink?"link":(A.cancelButton?"button":A.cancelLink==A.cancelButton==false?false:undefined)));B("okControl",(A.okLink?"link":(A.okButton?"button":A.okLink==A.okButton==false?false:undefined)));B("highlightColor",A.highlightcolor);B("highlightEndColor",A.highlightendcolor)};Object.extend(Ajax.InPlaceEditor,{DefaultOptions:{ajaxOptions:{},autoRows:3,cancelControl:"link",cancelText:"cancel",clickToEditText:"Click to edit",externalControl:null,externalControlOnly:false,fieldPostCreation:"activate",formClassName:"inplaceeditor-form",formId:null,highlightColor:"#ffff99",highlightEndColor:"#ffffff",hoverClassName:"",htmlResponse:true,loadingClassName:"inplaceeditor-loading",loadingText:"Loading...",okControl:"button",okText:"ok",paramName:"value",rows:1,savingClassName:"inplaceeditor-saving",savingText:"Saving...",size:0,stripLoadedTextTags:false,submitOnBlur:false,textAfterControls:"",textBeforeControls:"",textBetweenControls:""},DefaultCallbacks:{callback:function(A){return Form.serialize(A)},onComplete:function(B,A){new Effect.Highlight(A,{startcolor:this.options.highlightColor,keepBackgroundImage:true})},onEnterEditMode:null,onEnterHover:function(A){A.element.style.backgroundColor=A.options.highlightColor;if(A._effect){A._effect.cancel()}},onFailure:function(B,A){alert("Error communication with the server: "+B.responseText.stripTags())},onFormCustomization:null,onLeaveEditMode:null,onLeaveHover:function(A){A._effect=new Effect.Highlight(A.element,{startcolor:A.options.highlightColor,endcolor:A.options.highlightEndColor,restorecolor:A._originalBackground,keepBackgroundImage:true})}},Listeners:{click:"enterEditMode",keydown:"checkForEscapeOrReturn",mouseover:"enterHover",mouseout:"leaveHover"}});Ajax.InPlaceCollectionEditor.DefaultOptions={loadingCollectionText:"Loading options..."};Form.Element.DelayedObserver=Class.create({initialize:function(B,A,C){this.delay=A||0.5;this.element=$(B);this.callback=C;this.timer=null;this.lastValue=$F(this.element);Event.observe(this.element,"keyup",this.delayedListener.bindAsEventListener(this))},delayedListener:function(A){if(this.lastValue==$F(this.element)){return }if(this.timer){clearTimeout(this.timer)}this.timer=setTimeout(this.onTimerEvent.bind(this),this.delay*1000);this.lastValue=$F(this.element)},onTimerEvent:function(){this.timer=null;this.callback(this.element,$F(this.element))}});if(!Control){var Control={}}Control.Slider=Class.create({initialize:function(D,A,B){var C=this;if(Object.isArray(D)){this.handles=D.collect(function(E){return $(E)})}else{this.handles=[$(D)]}this.track=$(A);this.options=B||{};this.axis=this.options.axis||"horizontal";this.increment=this.options.increment||1;this.step=parseInt(this.options.step||"1");this.range=this.options.range||$R(0,1);this.value=0;this.values=this.handles.map(function(){return 0});this.spans=this.options.spans?this.options.spans.map(function(E){return $(E)}):false;this.options.startSpan=$(this.options.startSpan||null);this.options.endSpan=$(this.options.endSpan||null);this.restricted=this.options.restricted||false;this.maximum=this.options.maximum||this.range.end;this.minimum=this.options.minimum||this.range.start;this.alignX=parseInt(this.options.alignX||"0");this.alignY=parseInt(this.options.alignY||"0");this.trackLength=this.maximumOffset()-this.minimumOffset();this.handleLength=this.isVertical()?(this.handles[0].offsetHeight!=0?this.handles[0].offsetHeight:this.handles[0].style.height.replace(/px$/,"")):(this.handles[0].offsetWidth!=0?this.handles[0].offsetWidth:this.handles[0].style.width.replace(/px$/,""));this.active=false;this.dragging=false;this.disabled=false;if(this.options.disabled){this.setDisabled()}this.allowedValues=this.options.values?this.options.values.sortBy(Prototype.K):false;if(this.allowedValues){this.minimum=this.allowedValues.min();this.maximum=this.allowedValues.max()}this.eventMouseDown=this.startDrag.bindAsEventListener(this);this.eventMouseUp=this.endDrag.bindAsEventListener(this);this.eventMouseMove=this.update.bindAsEventListener(this);this.handles.each(function(F,E){E=C.handles.length-1-E;C.setValue(parseFloat((Object.isArray(C.options.sliderValue)?C.options.sliderValue[E]:C.options.sliderValue)||C.range.start),E);F.makePositioned().observe("mousedown",C.eventMouseDown)});this.track.observe("mousedown",this.eventMouseDown);document.observe("mouseup",this.eventMouseUp);document.observe("mousemove",this.eventMouseMove);this.initialized=true},dispose:function(){var A=this;Event.stopObserving(this.track,"mousedown",this.eventMouseDown);Event.stopObserving(document,"mouseup",this.eventMouseUp);Event.stopObserving(document,"mousemove",this.eventMouseMove);this.handles.each(function(B){Event.stopObserving(B,"mousedown",A.eventMouseDown)})},setDisabled:function(){this.disabled=true},setEnabled:function(){this.disabled=false},getNearestValue:function(A){if(this.allowedValues){if(A>=this.allowedValues.max()){return(this.allowedValues.max())}if(A<=this.allowedValues.min()){return(this.allowedValues.min())}var C=Math.abs(this.allowedValues[0]-A);var B=this.allowedValues[0];this.allowedValues.each(function(D){var E=Math.abs(D-A);if(E<=C){B=D;C=E}});return B}if(A>this.range.end){return this.range.end}if(A<this.range.start){return this.range.start}return A},setValue:function(B,A){if(!this.active){this.activeHandleIdx=A||0;this.activeHandle=this.handles[this.activeHandleIdx];this.updateStyles()}A=A||this.activeHandleIdx||0;if(this.initialized&&this.restricted){if((A>0)&&(B<this.values[A-1])){B=this.values[A-1]}if((A<(this.handles.length-1))&&(B>this.values[A+1])){B=this.values[A+1]}}B=this.getNearestValue(B);this.values[A]=B;this.value=this.values[0];this.handles[A].style[this.isVertical()?"top":"left"]=this.translateToPx(B);this.drawSpans();if(!this.dragging||!this.event){this.updateFinished()}},setValueBy:function(B,A){this.setValue(this.values[A||this.activeHandleIdx||0]+B,A||this.activeHandleIdx||0)},translateToPx:function(A){return Math.round(((this.trackLength-this.handleLength)/(this.range.end-this.range.start))*(A-this.range.start))+"px"},translateToValue:function(A){return((A/(this.trackLength-this.handleLength)*(this.range.end-this.range.start))+this.range.start)},getRange:function(B){var A=this.values.sortBy(Prototype.K);B=B||0;return $R(A[B],A[B+1])},minimumOffset:function(){return(this.isVertical()?this.alignY:this.alignX)},maximumOffset:function(){return(this.isVertical()?(this.track.offsetHeight!=0?this.track.offsetHeight:this.track.style.height.replace(/px$/,""))-this.alignY:(this.track.offsetWidth!=0?this.track.offsetWidth:this.track.style.width.replace(/px$/,""))-this.alignX)},isVertical:function(){return(this.axis=="vertical")},drawSpans:function(){var A=this;if(this.spans){$R(0,this.spans.length-1).each(function(B){A.setSpan(A.spans[B],A.getRange(B))})}if(this.options.startSpan){this.setSpan(this.options.startSpan,$R(0,this.values.length>1?this.getRange(0).min():this.value))}if(this.options.endSpan){this.setSpan(this.options.endSpan,$R(this.values.length>1?this.getRange(this.spans.length-1).max():this.value,this.maximum))}},setSpan:function(B,A){if(this.isVertical()){B.style.top=this.translateToPx(A.start);B.style.height=this.translateToPx(A.end-A.start+this.range.start)}else{B.style.left=this.translateToPx(A.start);B.style.width=this.translateToPx(A.end-A.start+this.range.start)}},updateStyles:function(){this.handles.each(function(A){Element.removeClassName(A,"selected")});Element.addClassName(this.activeHandle,"selected")},startDrag:function(C){if(Event.isLeftClick(C)){if(!this.disabled){this.active=true;var D=Event.element(C);var E=[Event.pointerX(C),Event.pointerY(C)];var A=D;if(A==this.track){var B=Position.cumulativeOffset(this.track);this.event=C;this.setValue(this.translateToValue((this.isVertical()?E[1]-B[1]:E[0]-B[0])-(this.handleLength/2)));var B=Position.cumulativeOffset(this.activeHandle);this.offsetX=(E[0]-B[0]);this.offsetY=(E[1]-B[1])}else{while((this.handles.indexOf(D)==-1)&&D.parentNode){D=D.parentNode}if(this.handles.indexOf(D)!=-1){this.activeHandle=D;this.activeHandleIdx=this.handles.indexOf(this.activeHandle);this.updateStyles();var B=Position.cumulativeOffset(this.activeHandle);this.offsetX=(E[0]-B[0]);this.offsetY=(E[1]-B[1])}}}Event.stop(C)}},update:function(A){if(this.active){if(!this.dragging){this.dragging=true}this.draw(A);if(Prototype.Browser.WebKit){window.scrollBy(0,0)}Event.stop(A)}},draw:function(B){var C=[Event.pointerX(B),Event.pointerY(B)];var A=Position.cumulativeOffset(this.track);C[0]-=this.offsetX+A[0];C[1]-=this.offsetY+A[1];this.event=B;this.setValue(this.translateToValue(this.isVertical()?C[1]:C[0]));if(this.initialized&&this.options.onSlide){this.options.onSlide(this.values.length>1?this.values:this.value,this)}},endDrag:function(A){if(this.active&&this.dragging){this.finishDrag(A,true);Event.stop(A)}this.active=false;this.dragging=false},finishDrag:function(A,B){this.active=false;this.dragging=false;this.updateFinished()},updateFinished:function(){if(this.initialized&&this.options.onChange){this.options.onChange(this.values.length>1?this.values:this.value,this)}this.event=null}});Sound={tracks:{},_enabled:true,template:new Template('<embed style="height:0" id="sound_#{track}_#{id}" src="#{url}" loop="false" autostart="true" hidden="true"/>'),enable:function(){Sound._enabled=true},disable:function(){Sound._enabled=false},play:function(B){if(!Sound._enabled){return }var A=Object.extend({track:"global",url:B,replace:false},arguments[1]||{});if(A.replace&&this.tracks[A.track]){$R(0,this.tracks[A.track].id).each(function(D){var C=$("sound_"+A.track+"_"+D);C.Stop&&C.Stop();C.remove()});this.tracks[A.track]=null}if(!this.tracks[A.track]){this.tracks[A.track]={id:0}}else{this.tracks[A.track].id++}A.id=this.tracks[A.track].id;$$("body")[0].insert(Prototype.Browser.IE?new Element("bgsound",{id:"sound_"+A.track+"_"+A.id,src:A.url,loop:1,autostart:true}):Sound.template.evaluate(A))}};if(Prototype.Browser.Gecko&&navigator.userAgent.indexOf("Win")>0){if(navigator.plugins&&$A(navigator.plugins).detect(function(A){return A.name.indexOf("QuickTime")!=-1})){Sound.template=new Template('<object id="sound_#{track}_#{id}" width="0" height="0" type="audio/mpeg" data="#{url}"/>')}else{Sound.play=function(){}}};
// unFocus.History, version2.0 (Beta 2) (2007/09/10) | Copyright: 2005-2007, Kevin Newman (http://www.unfocus.com/Projects/HistoryKeeper/) | License: http://www.gnu.org/licenses/lgpl.html
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('8 o={};o.Q=2(){h.j={};B(8 i=0;i<18.l;i++){h.j[18[i]]=[]}};o.Q.W={12:2(a,b){B(8 i=0;i<h.j[a].l;i++)4(h.j[a][i]==b)7;h.j[a].1Z(b)},1V:2(a,b){B(8 i=0;i<h.j[a].l;i++){4(h.j[a][i]==b){h.j.1S(i,1);7}}},p:2(a,b){B(8 i=0;i<h.j[a].l;i++)h.j[a][i](b)}};o.14=(2(){2 C(){8 c=h,E=1E,v,3;8 d=2(){7 1p.1k.23(1)};3=d();8 e=2(a){z.1p.1k=a};2 1f(){8 a=d();4(3!=a){3=a;c.p("n",a)}}4(O)v=O(1f,E);2 r(a){4(!1c(a)){8 b;4(/1b/.19(A.17)&&!z.16)b=6.w(\'<a G="\'+a+\'">\'+a+"</a>");u b=6.w("a");b.t("G",a);Z(b.D){V="U";1D="1A";1d=s()+"R";1v=1t()+"R"}6.k.L(b,6.k.P)}}2 1c(a){4(6.24(a).l>0)7 q}4(1i 1h.1g=="22"){2 s(){7 1h.1g}}u 4(6.N&&6.N.M){2 s(){7 6.N.M}}u 4(6.k){2 s(){7 6.k.M}}21(20(s).1X().1e(/1W/g,"1U").1e(/Y/g,"X"));c.1T=2(){7 3};2 9(a){4(3!=a){r(a);3=a;e(a);c.p("n",a)}7 q}c.9=2(a){r(3);c.9=9;7 c.9(a)};4(/1a\\/\\d+/.19(A.1n)&&A.1n.1o(/1a\\/(\\d+)/)[1]<1R){8 f=H.l,x={},m,y=15;2 S(){m=6.w("1O");m.13="1N";m.1M="1L";6.k.L(m,6.k.P)}e=2(a){x[f]=a;m.1K="#"+d();m.1J()};d=2(){7 x[f]};x[f]=3;2 T(a){4(3!=a){r(a);3=a;f=H.l+1;y=q;e(a);c.p("n",a);y=15}7 q}c.9=2(a){r(3);S();c.9=T;7 c.9(a)};2 10(){4(!y){8 a=H.l;4(a!=f){f=a;8 b=d();4(3!=b){3=b;c.p("n",b)}}}};1I(v);v=O(10,E)}u 4(1i 1H!="1G"&&z.1F&&!z.16&&A.17.1o(/1b (\\d\\.\\d)/)[1]>=5.5){8 g,F;2 11(){8 a="1C";g=6.w("1B");g.t("G",a);g.t("13",a);g.t("1P",\'1Q:;\');g.D.V="U";g.D.1d="-1z";6.k.L(g,6.k.P);F=1y[a];J(3,q)}2 J(a){Z(F.6){1x("1w/I");1u("<I><1q></1q><k 1s",\'1Y="1r.o.14.K(\\\'\'+a+\'\\\');">\',a+"</k></I>");25()}}2 1m(a){3=a;c.p("n",a)}c.K=2(){c.K=1m};2 1l(a){4(3!=a){3=a;J(a)}7 q};c.9=2(a){11();c.9=1l;7 c.9(a)};c.12("n",2(a){e(a)})}}C.W=1j o.Q("n");7 1j C()})();',62,130,'||function|_currentHash|if||document|return|var|addHistory||||||||this||_listeners|body|length|_form|historyChange|unFocus|notifyListeners|true|_createAnchor|getScrollY|setAttribute|else|_intervalID|createElement|_historyStates|_recentlyAdded|window|navigator|for|Keeper|style|_pollInterval|_historyFrameRef|name|history|html|_createHistoryHTML|_updateFromHistory|insertBefore|scrollTop|documentElement|setInterval|firstChild|EventManager|px|_createSafariSetHashForm|addHistorySafari|absolute|position|prototype|||with|_watchHistoryLength|_createHistoryFrame|addEventListener|id|History|false|opera|userAgent|arguments|test|WebKit|MSIE|_checkAnchorExists|top|replace|_watchHash|pageYOffset|self|typeof|new|hash|addHistoryIE|updateFromHistory|appVersion|match|location|head|parent|onl|getScrollX|write|left|text|open|frames|900px|block|iframe|unFocusHistoryFrame|display|200|print|undefined|ActiveXObject|clearInterval|submit|action|get|method|unFocusHistoryForm|form|src|javascript|420|splice|getCurrent|Left|removeEventListener|Top|toString|oad|push|String|eval|number|substring|getElementsByName|close'.split('|'),0,{}));unFocus.History.addEventListener('historyChange', function(historyHash){miniLOL.go('#'+(historyHash?historyHash:miniLOL.config['core'].homePage)); $(miniLOL.config['core'].contentNode).scrollTop = 0;})
// Workaround functions 
function attrs(attributes){var text="";for(var i=0;i<attributes.length;i++){text+=attributes.item(i).nodeName+'="'+attributes.item(i).nodeValue+'" ';}return text;};function _$(id){var e=this.getElementsByTagName('*');for(var i=0;i<e.length;i++){if(e[i].getAttribute('id')==id)return e[i];}}function _fix(obj){if(!Prototype.Browser.Gecko&&!Prototype.Browser.Opera){obj.getElementById=_$;}return obj}function include(type,filename){var head=document.getElementsByTagName('head')[0];switch(type){case "js":var script=document.createElement('script');script.setAttribute('src', filename);script.setAttribute('type','text/javascript');head.appendChild(script);break;case "css":var link=document.createElement('link');link.setAttribute('rel','stylesheet');link.setAttribute('href',filename);link.setAttribute('type','text/css');head.appendChild(link);break;}};function _clone(f){f=f.toString();return new Function(f.substring(f.indexOf("{")+1,f.lastIndexOf("}")));};function parseQuery(url){var result=new Object;var matches=url.match(/\?(.*)$/);if(!matches){return result;}var blocks=matches[1].split(/&/);for(var i=0;i<blocks.length;i++){var parts=blocks[i].split(/=/);if(parts[1]){result[parts[0]]=parts[1];}else{result[parts[0]]=true;}}return result;};function Import(path,context,exception){context=context||window;var result;var error;new Ajax.Request(path,{method:'get',asynchronous:false,evalJS:false,onSuccess:function(http){try{eval.call(context,http.responseText);result=context;}catch(e){if(exception){error=e;error.fileName=path;error.lineNumber-=5;}result=null;}},onFailure:function(){result=null;}});if(error){throw error;}return result;};function objectToQuery(obj){var result='';for(var name in obj){result+="#{name}=#{value}&".interpolate({name:name,value:obj[name]});}return result.substr(0,result.length-1);}

/****************************************************************************
 * Copyleft meh. [http://meh.doesntexist.org | meh.ffff@gmail.com]          *
 *                                                                          *
 * This program is free software: you can redistribute it and/or modify     *
 * it under the terms of the GNU General Public License as published by     *
 * the Free Software Foundation, either version 3 of the License, or        *
 * (at your option) any later version.                                      *
 *                                                                          *
 * This program is distributed in the hope that it will be useful,          *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of           *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the            *
 * GNU General Public License for more details.                             *
 *                                                                          *
 * You should have received a copy of the GNU General Public License        *
 * along with miniLOL program.  If not, see <http://www.gnu.org/licenses/>. *
 ****************************************************************************/

var miniLOL = {
    version: '0.8.4',

    initialize: function () {
        if (Prototype.Browser.IE) {
            document.body.innerHTML
                = '<center>miniLOL is a Javascript/XML based CMS thus, being in the XXI century, '+
                  'I pretend those two standards to be respected.<br/>'+
                  'Get a real browser, get <a href="http://getfirefox.com">Firefox</a>';

            throw new Error("You fail at computar.");
        }

        miniLOL.event.add('window.onGo');

        miniLOL._error = false;

        miniLOL.menu.current = null;

        ['miniLOL.resource.load(miniLOL.resources.config, "resources/config.xml");',
         'document.title = miniLOL.config["core"].siteTitle;',
         'document.body.innerHTML = miniLOL.config["core"].loadingMessage;',
         'miniLOL.resource.load(miniLOL.resources.menus, "resources/menus.xml");',
         'miniLOL.resource.load(miniLOL.resources.pages, "resources/pages.xml");',
         'miniLOL.resource.load(miniLOL.resources.functions, "resources/functions.xml");',
         'miniLOL.resource.load(miniLOL.resources.template, "resources/template.html");',
        ].each(function(cmd) {
            try { eval(cmd); } catch (e) { miniLOL._error = true; }

            if (miniLOL._error) {
                throw $break;
            }
        });

        if (miniLOL._error) {
            return false;
        }

        if (miniLOL.menu.exists && !miniLOL.config["core"].menuNode) {
            miniLOL.menu.exists = false
        }

        new PeriodicalExecuter(miniLOL.refresh, miniLOL.config['core'].refreshEvery || 360)

        if (miniLOL.menu.exists) {
            miniLOL.content.set('Loading...');
        }

        miniLOL.content.set('Loading modules...');
        miniLOL.resource.load(miniLOL.resources.modules, "resources/modules.xml", true);

        if (miniLOL._error) {
            return false;
        }

        miniLOL.content.set('Checking dependencies...');
        try {
            miniLOL.module.dependencies.check();
        }
        catch (e) {
            miniLOL._error = true;
            miniLOL.content.set("`#{module}` requires `#{require}`".interpolate(e));
        }

        if (miniLOL.config["core"].init) {
            eval(miniLOL.config["core"].init);
        }

        if (!miniLOL._error) {
            miniLOL.go(/\/[#?].+/.test(location.href) ? location.href.replace(/^.*[#?]/, '#') : "#"+miniLOL.config['core'].homePage);
        }
    },
    
    refresh: function () {
        miniLOL.resource.reload(miniLOL.resources.config)
        miniLOL.resource.reload(miniLOL.resources.menus);
        miniLOL.resource.reload(miniLOL.resources.pages);
        miniLOL.resource.reload(miniLOL.resources.functions);
    },

    content: {
        set: function (data) {
            $(miniLOL.config['core'].contentNode).innerHTML = data;
            data.evalScripts();
        },

        get: function () {
            return $(miniLOL.config['core'].contentNode).innerHTML;
        },
    },

    resource: {
        load: function (wrapper) {
            if (!wrapper) {
                miniLOL.content.set('What wrapper should be loaded?');
                return false;
            }

            for (var func in wrapper) {
                if (typeof wrapper[func] == 'function') {
                    if (wrapper[func]._parent == wrapper) {
                        break;
                    }

                    wrapper[func]         = wrapper[func].bind(wrapper)
                    wrapper[func]._parent = wrapper;
                }
            }

            var args = $A(arguments).slice(1);

            if (!wrapper._calls) {
                wrapper._calls = new Array;
            }

            wrapper._calls.push(args);
            wrapper.load.apply(wrapper, args);
        },

        reload: function (wrapper) {
            if (!wrapper) {
                miniLOL.content.set('What wrapper should be reloaded?');
                return false;
            }

            wrapper.res = null;

            var calls      = wrapper._calls;
            wrapper._calls = new Array;

            for (var i = 0; i < calls.length; i++) {
                miniLOL.resource.load.apply(window, [wrapper].concat(calls[i]));
            }
        },

        check: function (xml) {
            if (!xml) {
                return "There's a syntax error.";
            }

            if (xml.documentElement.nodeName == "parsererror") {
                return xml.documentElement.textContent;
            }

            return false;
        },
    },

    resources: {
        config: {
            name: 'config',
            res: null,

            parse: function (obj, text) {
                if (text) {
                    var result = "";

                    for (var i = 0; i < obj.childNodes.length; i++) {
                        var text = obj.childNodes[i];

                        if (text.nodeType != Node.CDATA_SECTION_NODE && text.nodeType != Node.TEXT_NODE) {
                            continue;
                        }

                        text = text.nodeValue;

                        if (text.match(/^[\s\n]*$/m)) {
                            continue;
                        }
                        
                        result += text;
                    }

                    return result;
                }

                if (obj.nodeType != Node.ELEMENT_NODE) {
                    return null;
                }

                var result = new Object;

                for (var i = 0; i < obj.childNodes.length; i++) {
                    var node = obj.childNodes[i];

                    if (node.nodeType != Node.ELEMENT_NODE) {
                        continue;
                    }

                    if (node.getElementsByTagName("*").length == 0) {
                        result[node.nodeName] = this.parse(node, true);
                    }
                    else {
                        result[node.nodeName] = this.parse(node);
                    }
                }

                return result;
            },

            load: function () {
                if (this.res == null) {
                    this.res = {};
                } var res = this.res;

                miniLOL.config = this.res;

                var paths = $A(arguments);

                var This = this;
                
                for (var i = 0; i < paths.length; i++) {
                    new Ajax.Request(paths[i], {
                        method: 'get',
                        asynchronous: false,
        
                        onSuccess: function (http) {
                            var error = miniLOL.resource.check(_fix(http.responseXML));
                            if (error) {
                                document.body.innerHTML = "Error while parsing config.xml<br/><br/>#{error}".interpolate({
                                    error: error.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;'),
                                });
    
                                miniLOL._error = true;
                                return;
                            }

                            var domain = http.responseXML.documentElement.getAttribute('domain');
                            var config = miniLOL.config[domain] || new Object;

                            miniLOL.config[domain]
                                = Object.extend(config, This.parse(http.responseXML.documentElement));
                        },
        
                        onFailure: function (http) {
                            document.body.innerHTML = "Error while loading config.xml (#{error})".interpolate({
                                error: http.status,
                            });
                            miniLOL._error = true;
                        }
                    });
                }
            }
        },

        menus: {
            name: 'menus',
            res: null,

            load: function (path) {
                if (this.res == null) {
                    this.res = {};
                } var res = this.res;

                miniLOL.menus = miniLOL.resources.menus.res;

                new Ajax.Request(path, {
                    method: 'get',
                    asynchronous: false,

                    onSuccess: function (http) {
                        var error = miniLOL.resource.check(http.responseXML);
                        if (error) {
                            document.body.innerHTML = "Error while parsing menus.xml<br/><br/>#{error}".interpolate({
                                error: error.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;'),
                            });

                            miniLOL._error = true;
                            return;
                        }

                        _fix(http.responseXML);
                        if (http.responseXML.getElementById('default')) {
                            miniLOL.menus       = http.responseXML;
                            miniLOL.menu.exists = true;
                        }
                        else {
                            miniLOL.menu.exists = false;
                        }
                    },

                    onFailure: function (http) {
                        miniLOL.menu.exists = false;
                    }
                });
            }
        },
    
        pages: {
            name: 'pages',
            res: null,
            
            load: function (path) {
                if (this.res == null) {
                    this.res = {
                        dom: null,
                        cache: {}
                    };
                } var res = this.res;

                miniLOL.pages = this.res;

                new Ajax.Request(path, {
                    method: 'get',
                    asynchronous: false,
    
                    onSuccess: function (http) {
                        var error = miniLOL.resource.check(http.responseXML);
                        if (error) {
                            document.body.innerHTML = "Error while parsing pages.xml<br/><br/>#{error}".interpolate({
                                error: error.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;'),
                            });

                            miniLOL._error = true;
                            return;
                        }

                        _fix(http.responseXML);
                        miniLOL.pages.dom = http.responseXML;

                        var pages = http.responseXML.documentElement.getElementsByTagName('page');
                        for (var i = 0; i < pages.length; i++) {
                            delete miniLOL.pages.cache[pages[i].getAttribute('id')];
                        }
                    },
    
                    onFailure: function (http) {
                        document.body.innerHTML = "Error while loading pages.xml (#{error})".interpolate({
                            error: http.status,
                        });
                        miniLOL._error = true;
                    }
                });
            }
        },
    
        functions: {
            name: 'functions',
            res: null,

            load: function (path) {
                if (this.res == null) {
                    this.res = {};
                }
                miniLOL.functions = this.res;

                new Ajax.Request(path, {
                    method: 'get',
                    asynchronous: false,
        
                    onSuccess: function (http) {
                        var error = miniLOL.resource.check(http.responseXML);
                        if (error) {
                            document.body.innerHTML = "Error while parsing functions.xml<br/><br/>#{error}".interpolate({
                                error: error.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;'),
                            });

                            miniLOL._error = true;
                            return;
                        }

                        var functions = http.responseXML.documentElement.getElementsByTagName('function');
        
                        for (var i = 0; i < functions.length; i++) {
                            try {
                                miniLOL.functions[functions[i].getAttribute('name')]
                                    = new Function("var text = arguments[0]; var args = arguments[1]; #{code}; return text;".interpolate({
                                        code: functions[i].firstChild.nodeValue,
                                    }));
                            }
                            catch (e) {
                                document.body.innerHTML
                                    = "Error while creating `#{name}` wrapper from #{path}:<br/><br/>#{error}".interpolate({
                                        name: functions[i].getAttribute("name"),
                                        path: path,
                                        error: e.toString(),
                                    });

                                miniLOL._error = true;
                                return;
                            }
                        }
                    },
        
                    onFailure: function (http) {
                        document.body.innerHTML = "Error while loading functions.xml (#{error})".interpolate({
                            error: http.status,
                        });
                        miniLOL._error = true;
                    }
                });
            }
        },
    
        template: {
            name: 'template',

            load: function (path) {
                new Ajax.Request(path, {
                    method: 'get',
                    asynchronous: false,
        
                    onSuccess: function (http) {
                        document.body.innerHTML = miniLOL.template = http.responseText;
                    },
                    
                    onFailure: function (http) {
                        document.body.innerHTML = "Error while loading template.html (#{error})".interpolate({
                            error: http.status,
                        });
                        miniLOL._error = true;
                    }
                });
            }
        },
    
        modules: {
            name: 'modules',
            res: {
                loading: {},
                list: {}
            },

            load: function (path, output) {
                if (this.res == null) {
                    this.res = {
                        loading: {},
                        list: {}
                    };
                } var res = this.res;

                miniLOL.modules = this.res.list;

                new Ajax.Request(path, {
                    method: 'get',
                    asynchronous: false,
        
                    onSuccess: function (http) { 
                        var error = miniLOL.resource.check(http.responseXML);
                        if (error) {
                            miniLOL.content.set("Error while parsing modules.xml<br/><br/>#{error}".interpolate({
                                error: error.replace(/\n/g, '<br/>').replace(/ /g, '&nbsp;'),
                            }));

                            miniLOL._error = true;
                            return;
                        }

                        var modules = http.responseXML.documentElement.getElementsByTagName('module');
                        for (var i = 0; i < modules.length; i++) {
                            if (output) {
                                miniLOL.content.set("Loading `#{name}`... [#{n}/#{total}]".interpolate({
                                    name:  modules[i].getAttribute("name"),
                                    n:     i+1,
                                    total: modules.length,
                                }));
                            }

                            if (!miniLOL.module.load(modules[i].getAttribute("name"))) {
                                miniLOL._error = true;
                            }

                            if (miniLOL._error) {
                                break;
                            }
                        }
                    },
        
                    onFailure: function (http) {
                        miniLOL.content.set("Error while loading modules.xml (#{error})".interpolate({
                            error: http.status,
                        }));
                        miniLOL._error = true;
                    }
                });
            }
        }
    },

    menu: {
        set: function (data) {
            if (miniLOL.menu.exists) {
                $(miniLOL.config['core'].menuNode).innerHTML = data;
            }
        },

        get: function (name) {
            if (miniLOL.menu.exists) {
                name = name || 'default';
                var menu = miniLOL.menus.getElementById(name);

                if (!menu) {
                    document.body.innerHTML = "The menu `#{name}` doesn't exist.".interpolate({
                        name: name,
                    });
                }

                return menu.firstChild.nodeValue;
            }

            return null;
        },

        change: function (name) {
            if (miniLOL.menu.exists) {
                this.eleName = 'default';
                if (name == 'default') {
                    this.eleName = miniLOL.menu.current;
                }

                var element  = miniLOL.menus.getElementById(name);
                var template = miniLOL.menus.documentElement.getAttribute('template') || "#{menu}";

                var template = (element) ? element.getAttribute('template') || template : template;
                
                miniLOL.menu.set(template.interpolate({
                    name: this.eleName,
                    menu: miniLOL.menu.get(name)
                }));
            }
        },

        check: function (menu) {
            if (miniLOL.menu.exists) {
                miniLOL.menu.current = menu || 'default';

                if (miniLOL.menu.current == 'default') {
                    miniLOL.menu.set(miniLOL.menu.get('default'));
                }
                else {
                    miniLOL.menu.change(miniLOL.menu.current);
                }
            }
        }
    },

    page: {
        parse: function (page, data) {
            var output   = "";
            var contents = page.childNodes;

            for (var i = 0; i < contents.length; i++) {
                switch (contents[i].nodeType) {
                    case Node.ELEMENT_NODE:
                    if (contents[i].nodeName != 'list') {
                        continue;
                    }

                    var ele = contents[i].cloneNode(false);

                    if (!data) {
                        data = [ele];
                    }
                    
                    var list       = contents[i].childNodes;
                    var listBefore = ele.getAttribute('before') || data[0].getAttribute('before'); ele.removeAttribute('before');
                    var listAfter  = ele.getAttribute('after') || data[0].getAttribute('after'); ele.removeAttribute('after');
                    var listArgs   = ele.getAttribute('arguments') || data[0].getAttribute('arguments'); ele.removeAttribute('arguments');
                    var listType   = ele.getAttribute('type') || data[0].getAttribute('type'); ele.removeAttribute('type');
                    var listMenu   = ele.getAttribute('menu') || data[0].getAttribute('menu') || miniLOL.menu.current; ele.removeAttribute('menu');
        
                    output += '<div #{attributes}>'.interpolate({attributes: attrs(ele.attributes)});
                    for (var h = 0; h < list.length; h++) {
                        if (list[h].nodeType == Node.ELEMENT_NODE) {
                            if (list[h].nodeName == 'link') {
                                var link = list[h].cloneNode(true);
                
                                var src     = link.getAttribute('src'); link.removeAttribute('src');
                                var target  = link.getAttribute('target'); link.removeAttribute('target');
                                var text    = link.getAttribute('text'); link.removeAttribute('text');
                                var before  = link.getAttribute('before') || listBefore || ''; link.removeAttribute('before');
                                var after   = link.getAttribute('after') || listAfter || ''; link.removeAttribute('after');
                                var domain  = link.getAttribute('domain') || ''; link.removeAttribute('domain');
                                var args    = link.getAttribute('arguments') || listArgs; link.removeAttribute('arguments');
                                var menu    = link.getAttribute('menu') || listMenu; link.removeAttribute('menu');
                
                                var out = src.match(/^(\w+:\/\/|mailto:)/);
                
                                var linkClass = link.getAttribute('class'); link.removeAttribute('class');
                                var linkId    = link.getAttribute('id'); link.removeAttribute('id');
                
                                output += '<div class="#{0}" id="#{1}">#{2}'.interpolate(
                                          [linkClass, linkId, before]);
                                if (target || out) {
                                    src    = (!out) ? 'data/'+src : src;
                                    target = target || '_blank';
                                    text   = text || src;
            
                                    output += '<a href="#{0}" target="#{1}" #{2}>#{3}</a>#{4}'.interpolate(
                                              [src, target, attrs(link.attributes), text, after]);
                                }
                                else {
                                    var ltype = link.getAttribute('type') || listType; link.removeAttribute('type');
                
                                    if (domain == 'in' || src[0] == '#') {
                                        src = (src[0] == '#') ? src : '#' + src;
                                    }
                                    else {
                                        src = '#page=' + src;
                                    }

                                    text = text || src;
        
                                    args  = args ? '&'+args.replace(/[ ,]+/g, '&amp;') : '';
                                    ltype = ltype ? '&type='+ltype : '';
                                    menu  = miniLOL.menu.exists && menu ? '&amp;menu='+menu : '';
            
                                    output += '<a href="#{0}#{1}#{2}#{3}" #{4}>#{5}</a>#{6}'.interpolate(
                                              [src, args, ltype, menu, attrs(link.attributes), text, after]);
                                }
                                output += '</div>';
                            }
                            else if (list[h].nodeName == 'list') {
                                output += miniLOL.page.parse({ childNodes: [list[h]] }, [contents[i]]);
                            }
                            else if (list[h].nodeName == 'nest') {
                                toParse = list[h].cloneNode(true);

                                output += "<div class='#{0}' style='#{1}'>#{2}</div>".interpolate([
                                    list[h].getAttribute('class'), list[h].getAttribute('style'), miniLOL.page.parse(toParse, [contents[i]])
                                ]);
                            }
                        }
                        else if (list[h].nodeType == Node.CDATA_SECTION_NODE) {
                            output += "<div class='data'>#{0}#{1}#{2}</div>".interpolate([
                                listBefore, list[h].nodeValue, listAfter
                            ]);
                        }
                    }

                    output += '</div>';
                    break;
        
                    case Node.CDATA_SECTION_NODE:
                    output += contents[i].nodeValue;
                    break;
                }
            }

            return output;
        },

        get: function (name, queries, url) {
            miniLOL.content.set(miniLOL.config['core'].loadingMessage);

            var page = miniLOL.pages.dom.getElementById(name);
            var type = queries.type;
        
            if (page == null) {
                miniLOL.content.set("404 - Not Found");
                return false;
            }

            if (page.getAttribute("alias")) {
                if (typeof queries[name] != 'string') {
                    delete queries[name];
                }
                delete queries.page;

                var queries = objectToQuery(queries);
                return miniLOL.go(page.getAttribute("alias")+(queries ? "&"+queries : ''));
            }

            if (type == null) {
                type = page.getAttribute('type');
            }
        
            if (miniLOL.menu.exists) {
                miniLOL.menu.current = queries.menu || page.getAttribute('menu');

                if (miniLOL.menu.current == 'default' || !miniLOL.menu.current) {
                    miniLOL.menu.set(miniLOL.menu.get(miniLOL.menu.current));
                }
                else {
                    miniLOL.menu.change(miniLOL.menu.current);
                }
            }
        
            if (miniLOL.pages.cache[name]) {
                if (miniLOL.functions[type]) {
                    miniLOL.content.set(miniLOL.functions[type](miniLOL.pages.cache[name], queries));
                    
                }
                else {
                    miniLOL.content.set(miniLOL.pages.cache[name]);
                }

                window.onGo(url);
                return true;
            }

            var pageArguments = page.getAttribute('arguments').replace(/[ ,]+/g, '&amp;').toQueryParams();
            for (var key in pageArguments) {
                if (queries[key] == null) {
                    queries[key] = pageArguments[key];
                }
            }
        
            var output = miniLOL.page.parse(page);

            miniLOL.pages.cache[name] = output;

            if (miniLOL.functions[type]) {
                output = miniLOL.functions[type](output, queries);
            }

            miniLOL.content.set(output);
            window.onGo(url);

            return true;
        },

        load: function (path, queries, url) {
            miniLOL.content.set(miniLOL.config['core'].loadingMessage);

            new Ajax.Request('data/'+path+'?'+objectToQuery(queries), {
                method: 'get',
        
                onSuccess: function (http) {
                    if (miniLOL.functions[queries.type]) {
                        miniLOL.content.set(miniLOL.functions[queries.type](http.responseText, queries));
                    }
                    else {
                        miniLOL.content.set(http.responseText);
                    }

                    window.onGo(url);
                },
        
                onFailure: function (http) {
                    miniLOL.content.set("#{code} - #{text}".interpolate({
                        code: http.status,
                        text: http.statusText
                    }));
                }
            });
        }
    },

    module: {
        create: function (name, obj) {
            obj.name = name;
            obj.root = 'modules/'+name;

            if (!obj.type) {
                obj.type = 'active';
            }

            if (obj.onLoad) {
                try {
                    if (obj.onLoad.bind(obj)() == false) {
                        throw new Error("An error occurred while initializing the module.");
                    }
                }
                catch (e) {
                    e.fileName = "modules/#{name}/main.js".interpolate({ name: name });
                    throw e;
                }
            }

            if (!obj.execute) {
                obj.execute = new Function;
            }

            for (var func in obj) {
                if (typeof obj[func] == 'function') {
                    obj[func] = obj[func].bind(obj)
                }
            }

            miniLOL.modules[name] = obj;

            if (obj.onGo) {
                window.onGo('add', obj.onGo);
            }
        },

        execute: function (name, vars, url) {
            if (!name) {
                if (url) {
                    miniLOL.content.set("What module should be executed?");
                }

                miniLOL._error = true;
                return false;
            }

            if (url) {
                miniLOL.content.set(miniLOL.config['core'].loadingMessage);
            }

            if (!miniLOL.modules[name]) {
                if (url) {
                    miniLOL.content.set("The module isn't loaded.");
                    miniLOL.error = true;
                }

                return false;
            }

            vars = (vars instanceof Array) ? vars : [vars];

            var result;
            try {
                result = miniLOL.modules[name].execute.apply(miniLOL.modules[name], vars);
            }
            catch (e) {
                e.fileName = "modules/" + name + "/main.js";

                miniLOL.content.set(
                    "An error occurred while executing the module `#{name}`<br/><br/>#{file} @ #{line}:<br/>#{error}".interpolate({
                        name:  name,
                        file:  e.fileName,
                        line:  e.lineNumber,
                        error: e.toString(),
                    })
                );

                return false;
            }

            if (url) {
                window.onGo(url);
            }

            return result;
        },

        load: function (name) {
            try {
                Import("modules/" + name + "/main.js", window, true);

                if (!miniLOL.modules[name]) {
                    throw new Error("Something went wrong while loading the module `#{name}`.".interpolate({
                        name: name,
                    }));
                }

                return true;
            }
            catch (e) {
                miniLOL.content.set(
                    "An error occurred while loading the module `#{name}`<br/><br/>#{file} @ #{line}:<br/>#{error}".interpolate({
                        name:  name,
                        file:  e.fileName,
                        line:  e.lineNumber,
                        error: e.toString(),
                    })
                );

                return false;
            }
        },

        reload: function (name) {
            if (miniLOL.modules[name]) {
                if (miniLOL.modules[name].onLoad) {
                    miniLOL.modules[name].onLoad(true);
                }
            }
        },

        exists: function (name) {
            return new Boolean(miniLOL.modules[name]);
        },

        dependencies: {
            check: function () {
                for (var module in miniLOL.modules) {
                    var dependencies = miniLOL.modules[module].dependencies;
                    if (dependencies) {
                        for (var i = 0; i < dependencies.length; i++) {
                            if (!miniLOL.modules[dependencies[i]]) {
                                throw { module: module, require: dependencies[i] };
                            }
                        }
                    }
                }

                return true;
            },

            needs: function (name, callback, context, wait) {
                if (miniLOL.modules[name]) {
                    callback.call(context || window);
                }
                else {
                    setTimeout(wait || 10, function(){ miniLOL.module.dependencies.needs(name, callback, context); });
                }
            },
        },
    },

    event: {
        add: function (place, func) {
            if (typeof place != 'string') {
                throw new Error("The place has to be a string.");
            }
    
            var attach = "#{0}=_clone(miniLOL.event.dispatcher);#{0}=#{0}.bind(#{0});".interpolate([place]);
    
            if (!func) {
                eval(attach);
                return;
            }
    
            var check = eval(place);
            if (typeof check == 'function') {
                if (check('minilol') != 'win') {
                    eval(attach)
                }
            }
            else {
                eval(attach);
            }
            
            eval("#{0}('add', func);".interpolate([place]));
        },

        dispatcher: function () {
            if (typeof(this.functions) == 'undefined') {
                this.functions = new Array;
            }

            switch (arguments[0]) {
                case 'minilol':
                return 'win';

                case 'add':
                if (this.functions.indexOf(arguments[1]) < 0) {
                    this.functions.push(arguments[1]);
                }
                return true;
            }

            for (var i = 0; i < this.functions.length; i++) {
                this.functions[i].apply(null, $A(arguments));
            }

            return true;
        },
    },

    go: function (url) {
        var queries = parseQuery(url.sub(/#/, '?'))
        var matches = /#(([^=&]*)&|([^=&]*)$)/.exec(url);

        if (matches) {
            queries.page = matches[2] || matches[3];
            return miniLOL.page.get(queries.page, queries, url);
        }
        else if (queries.module) {
            miniLOL.menu.check(queries.menu);
            return miniLOL.module.execute(queries.module, queries, url);
        }
        else if (queries.page) {
            miniLOL.menu.check(queries.menu);
            return miniLOL.page.load(queries.page, queries, url);
        } 
        else {
            miniLOL.menu.check(queries.menu);
            miniLOL.content.set('wat');
            return false;
        }
    }
};

