/* THIS FILE IS GENERATED. Edit src/main.ts instead. */
var Me=Object.defineProperty;var Jn=Object.getOwnPropertyDescriptor;var Yn=Object.getOwnPropertyNames;var Kn=Object.prototype.hasOwnProperty;var oe=(e,n)=>{for(var t in n)Me(e,t,{get:n[t],enumerable:!0})},Qn=(e,n,t,u)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of Yn(n))!Kn.call(e,r)&&r!==t&&Me(e,r,{get:()=>n[r],enumerable:!(u=Jn(n,r))||u.enumerable});return e};var eu=e=>Qn(Me({},"__esModule",{value:!0}),e);var oo={};oe(oo,{default:()=>Te});module.exports=eu(oo);var Oe={};oe(Oe,{arrayReplaceAt:()=>Be,asciiTrim:()=>W,assign:()=>Q,escapeHtml:()=>q,escapeRE:()=>Pu,fromCodePoint:()=>ee,has:()=>Eu,isMdAsciiPunct:()=>j,isPunctChar:()=>cn,isPunctCharCode:()=>U,isSpace:()=>_,isString:()=>_e,isValidEntityCode:()=>Ae,isWhiteSpace:()=>$,lib:()=>qu,normalizeReference:()=>V,unescapeAll:()=>P,unescapeMd:()=>Tu});var me={};oe(me,{decode:()=>ae,encode:()=>pe,format:()=>J,parse:()=>ie});var Ot={};function tu(e){let n=Ot[e];if(n)return n;n=Ot[e]=[];for(let t=0;t<128;t++){let u=String.fromCharCode(t);n.push(u)}for(let t=0;t<e.length;t++){let u=e.charCodeAt(t);n[u]="%"+("0"+u.toString(16).toUpperCase()).slice(-2)}return n}function de(e,n){typeof n!="string"&&(n=de.defaultChars);let t=tu(n);return e.replace(/(%[a-f0-9]{2})+/gi,function(u){let r="";for(let o=0,a=u.length;o<a;o+=3){let i=parseInt(u.slice(o+1,o+3),16);if(i<128){r+=t[i];continue}if((i&224)===192&&o+3<a){let c=parseInt(u.slice(o+4,o+6),16);if((c&192)===128){let s=i<<6&1984|c&63;s<128?r+="\uFFFD\uFFFD":r+=String.fromCharCode(s),o+=3;continue}}if((i&240)===224&&o+6<a){let c=parseInt(u.slice(o+4,o+6),16),s=parseInt(u.slice(o+7,o+9),16);if((c&192)===128&&(s&192)===128){let l=i<<12&61440|c<<6&4032|s&63;l<2048||l>=55296&&l<=57343?r+="\uFFFD\uFFFD\uFFFD":r+=String.fromCharCode(l),o+=6;continue}}if((i&248)===240&&o+9<a){let c=parseInt(u.slice(o+4,o+6),16),s=parseInt(u.slice(o+7,o+9),16),l=parseInt(u.slice(o+10,o+12),16);if((c&192)===128&&(s&192)===128&&(l&192)===128){let d=i<<18&1835008|c<<12&258048|s<<6&4032|l&63;d<65536||d>1114111?r+="\uFFFD\uFFFD\uFFFD\uFFFD":(d-=65536,r+=String.fromCharCode(55296+(d>>10),56320+(d&1023))),o+=9;continue}}r+="\uFFFD"}return r})}de.defaultChars=";/?:@&=+$,#";de.componentChars="";var ae=de;var $t={};function nu(e){let n=$t[e];if(n)return n;n=$t[e]=[];for(let t=0;t<128;t++){let u=String.fromCharCode(t);/^[0-9a-z]$/i.test(u)?n.push(u):n.push("%"+("0"+t.toString(16).toUpperCase()).slice(-2))}for(let t=0;t<e.length;t++)n[e.charCodeAt(t)]=e[t];return n}function fe(e,n,t){typeof n!="string"&&(t=n,n=fe.defaultChars),typeof t=="undefined"&&(t=!0);let u=nu(n),r="";for(let o=0,a=e.length;o<a;o++){let i=e.charCodeAt(o);if(t&&i===37&&o+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(o+1,o+3))){r+=e.slice(o,o+3),o+=2;continue}if(i<128){r+=u[i];continue}if(i>=55296&&i<=57343){if(i>=55296&&i<=56319&&o+1<a){let c=e.charCodeAt(o+1);if(c>=56320&&c<=57343){r+=encodeURIComponent(e[o]+e[o+1]),o++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(e[o])}return r}fe.defaultChars=";/?:@&=+$,-_.!~*'()#";fe.componentChars="-_.!~*'()";var pe=fe;function J(e){let n="";return n+=e.protocol||"",n+=e.slashes?"//":"",n+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?n+="["+e.hostname+"]":n+=e.hostname||"",n+=e.port?":"+e.port:"",n+=e.pathname||"",n+=e.search||"",n+=e.hash||"",n}function he(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}var uu=/^([a-z0-9.+-]+:)/i,ru=/:[0-9]*$/,ou=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,au=["<",">",'"',"`"," ","\r",`
`,"	"],iu=["{","}","|","\\","^","`"].concat(au),cu=["'"].concat(iu),Ut=["%","/","?",";","#"].concat(cu),jt=["/","?","#"],su=255,Vt=/^[+a-z0-9A-Z_-]{0,63}$/,lu=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,Wt={javascript:!0,"javascript:":!0},Zt={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};function du(e,n){if(e&&e instanceof he)return e;let t=new he;return t.parse(e,n),t}he.prototype.parse=function(e,n){let t,u,r,o=e;if(o=o.trim(),!n&&e.split("#").length===1){let s=ou.exec(o);if(s)return this.pathname=s[1],s[2]&&(this.search=s[2]),this}let a=uu.exec(o);if(a&&(a=a[0],t=a.toLowerCase(),this.protocol=a,o=o.substr(a.length)),(n||a||o.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r=o.substr(0,2)==="//",r&&!(a&&Wt[a])&&(o=o.substr(2),this.slashes=!0)),!Wt[a]&&(r||a&&!Zt[a])){let s=-1;for(let f=0;f<jt.length;f++)u=o.indexOf(jt[f]),u!==-1&&(s===-1||u<s)&&(s=u);let l,d;s===-1?d=o.lastIndexOf("@"):d=o.lastIndexOf("@",s),d!==-1&&(l=o.slice(0,d),o=o.slice(d+1),this.auth=l),s=-1;for(let f=0;f<Ut.length;f++)u=o.indexOf(Ut[f]),u!==-1&&(s===-1||u<s)&&(s=u);s===-1&&(s=o.length),o[s-1]===":"&&s--;let h=o.slice(0,s);o=o.slice(s),this.parseHost(h),this.hostname=this.hostname||"";let p=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!p){let f=this.hostname.split(/\./);for(let x=0,y=f.length;x<y;x++){let w=f[x];if(w&&!w.match(Vt)){let b="";for(let g=0,k=w.length;g<k;g++)w.charCodeAt(g)>127?b+="x":b+=w[g];if(!b.match(Vt)){let g=f.slice(0,x),k=f.slice(x+1),v=w.match(lu);v&&(g.push(v[1]),k.unshift(v[2])),k.length&&(o=k.join(".")+o),this.hostname=g.join(".");break}}}}this.hostname.length>su&&(this.hostname=""),p&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}let i=o.indexOf("#");i!==-1&&(this.hash=o.substr(i),o=o.slice(0,i));let c=o.indexOf("?");return c!==-1&&(this.search=o.substr(c),o=o.slice(0,c)),o&&(this.pathname=o),Zt[t]&&this.hostname&&!this.pathname&&(this.pathname=""),this};he.prototype.parseHost=function(e){let n=ru.exec(e);n&&(n=n[0],n!==":"&&(this.port=n.substr(1)),e=e.substr(0,e.length-n.length)),e&&(this.hostname=e)};var ie=du;var Ie={};oe(Ie,{Any:()=>be,Cc:()=>ge,Cf:()=>Gt,P:()=>Y,S:()=>xe,Z:()=>ke});var be=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;var ge=/[\0-\x1F\x7F-\x9F]/;var Gt=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/;var Y=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/;var xe=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/;var ke=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/;var Xt=new Uint16Array('\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map(e=>e.charCodeAt(0)));var Jt=new Uint16Array("\u0200aglq	\x1B\u026D\0\0p;\u4026os;\u4027t;\u403Et;\u403Cuot;\u4022".split("").map(e=>e.charCodeAt(0)));var Ne,fu=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),ze=(Ne=String.fromCodePoint)!==null&&Ne!==void 0?Ne:function(e){let n="";return e>65535&&(e-=65536,n+=String.fromCharCode(e>>>10&1023|55296),e=56320|e&1023),n+=String.fromCharCode(e),n};function Pe(e){var n;return e>=55296&&e<=57343||e>1114111?65533:(n=fu.get(e))!==null&&n!==void 0?n:e}var F;(function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"})(F||(F={}));var pu=32,B;(function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"})(B||(B={}));function qe(e){return e>=F.ZERO&&e<=F.NINE}function hu(e){return e>=F.UPPER_A&&e<=F.UPPER_F||e>=F.LOWER_A&&e<=F.LOWER_F}function mu(e){return e>=F.UPPER_A&&e<=F.UPPER_Z||e>=F.LOWER_A&&e<=F.LOWER_Z||qe(e)}function bu(e){return e===F.EQUALS||mu(e)}var C;(function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"})(C||(C={}));var L;(function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"})(L||(L={}));var ye=class{constructor(n,t,u){this.decodeTree=n,this.emitCodePoint=t,this.errors=u,this.state=C.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=L.Strict}startEntity(n){this.decodeMode=n,this.state=C.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(n,t){switch(this.state){case C.EntityStart:return n.charCodeAt(t)===F.NUM?(this.state=C.NumericStart,this.consumed+=1,this.stateNumericStart(n,t+1)):(this.state=C.NamedEntity,this.stateNamedEntity(n,t));case C.NumericStart:return this.stateNumericStart(n,t);case C.NumericDecimal:return this.stateNumericDecimal(n,t);case C.NumericHex:return this.stateNumericHex(n,t);case C.NamedEntity:return this.stateNamedEntity(n,t)}}stateNumericStart(n,t){return t>=n.length?-1:(n.charCodeAt(t)|pu)===F.LOWER_X?(this.state=C.NumericHex,this.consumed+=1,this.stateNumericHex(n,t+1)):(this.state=C.NumericDecimal,this.stateNumericDecimal(n,t))}addToNumericResult(n,t,u,r){if(t!==u){let o=u-t;this.result=this.result*Math.pow(r,o)+parseInt(n.substr(t,o),r),this.consumed+=o}}stateNumericHex(n,t){let u=t;for(;t<n.length;){let r=n.charCodeAt(t);if(qe(r)||hu(r))t+=1;else return this.addToNumericResult(n,u,t,16),this.emitNumericEntity(r,3)}return this.addToNumericResult(n,u,t,16),-1}stateNumericDecimal(n,t){let u=t;for(;t<n.length;){let r=n.charCodeAt(t);if(qe(r))t+=1;else return this.addToNumericResult(n,u,t,10),this.emitNumericEntity(r,2)}return this.addToNumericResult(n,u,t,10),-1}emitNumericEntity(n,t){var u;if(this.consumed<=t)return(u=this.errors)===null||u===void 0||u.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(n===F.SEMI)this.consumed+=1;else if(this.decodeMode===L.Strict)return 0;return this.emitCodePoint(Pe(this.result),this.consumed),this.errors&&(n!==F.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(n,t){let{decodeTree:u}=this,r=u[this.treeIndex],o=(r&B.VALUE_LENGTH)>>14;for(;t<n.length;t++,this.excess++){let a=n.charCodeAt(t);if(this.treeIndex=gu(u,r,this.treeIndex+Math.max(1,o),a),this.treeIndex<0)return this.result===0||this.decodeMode===L.Attribute&&(o===0||bu(a))?0:this.emitNotTerminatedNamedEntity();if(r=u[this.treeIndex],o=(r&B.VALUE_LENGTH)>>14,o!==0){if(a===F.SEMI)return this.emitNamedEntityData(this.treeIndex,o,this.consumed+this.excess);this.decodeMode!==L.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return-1}emitNotTerminatedNamedEntity(){var n;let{result:t,decodeTree:u}=this,r=(u[t]&B.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,r,this.consumed),(n=this.errors)===null||n===void 0||n.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(n,t,u){let{decodeTree:r}=this;return this.emitCodePoint(t===1?r[n]&~B.VALUE_LENGTH:r[n+1],u),t===3&&this.emitCodePoint(r[n+2],u),u}end(){var n;switch(this.state){case C.NamedEntity:return this.result!==0&&(this.decodeMode!==L.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case C.NumericDecimal:return this.emitNumericEntity(0,2);case C.NumericHex:return this.emitNumericEntity(0,3);case C.NumericStart:return(n=this.errors)===null||n===void 0||n.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case C.EntityStart:return 0}}};function Yt(e){let n="",t=new ye(e,u=>n+=ze(u));return function(r,o){let a=0,i=0;for(;(i=r.indexOf("&",i))>=0;){n+=r.slice(a,i),t.startEntity(o);let s=t.write(r,i+1);if(s<0){a=i+t.end();break}a=i+s,i=s===0?a+1:a}let c=n+r.slice(a);return n="",c}}function gu(e,n,t,u){let r=(n&B.BRANCH_LENGTH)>>7,o=n&B.JUMP_TABLE;if(r===0)return o!==0&&u===o?t:-1;if(o){let c=u-o;return c<0||c>=r?-1:e[t+c]-1}let a=t,i=a+r-1;for(;a<=i;){let c=a+i>>>1,s=e[c];if(s<u)a=c+1;else if(s>u)i=c-1;else return e[c+r]}return-1}var Kt=Yt(Xt),zo=Yt(Jt);function K(e,n=L.Legacy){return Kt(e,n)}function ce(e){return Kt(e,L.Strict)}function ve(e){for(let n=1;n<e.length;n++)e[n][0]+=e[n-1][0]+1;return e}var xu=new Map(ve([[9,"&Tab;"],[0,"&NewLine;"],[22,"&excl;"],[0,"&quot;"],[0,"&num;"],[0,"&dollar;"],[0,"&percnt;"],[0,"&amp;"],[0,"&apos;"],[0,"&lpar;"],[0,"&rpar;"],[0,"&ast;"],[0,"&plus;"],[0,"&comma;"],[1,"&period;"],[0,"&sol;"],[10,"&colon;"],[0,"&semi;"],[0,{v:"&lt;",n:8402,o:"&nvlt;"}],[0,{v:"&equals;",n:8421,o:"&bne;"}],[0,{v:"&gt;",n:8402,o:"&nvgt;"}],[0,"&quest;"],[0,"&commat;"],[26,"&lbrack;"],[0,"&bsol;"],[0,"&rbrack;"],[0,"&Hat;"],[0,"&lowbar;"],[0,"&DiacriticalGrave;"],[5,{n:106,o:"&fjlig;"}],[20,"&lbrace;"],[0,"&verbar;"],[0,"&rbrace;"],[34,"&nbsp;"],[0,"&iexcl;"],[0,"&cent;"],[0,"&pound;"],[0,"&curren;"],[0,"&yen;"],[0,"&brvbar;"],[0,"&sect;"],[0,"&die;"],[0,"&copy;"],[0,"&ordf;"],[0,"&laquo;"],[0,"&not;"],[0,"&shy;"],[0,"&circledR;"],[0,"&macr;"],[0,"&deg;"],[0,"&PlusMinus;"],[0,"&sup2;"],[0,"&sup3;"],[0,"&acute;"],[0,"&micro;"],[0,"&para;"],[0,"&centerdot;"],[0,"&cedil;"],[0,"&sup1;"],[0,"&ordm;"],[0,"&raquo;"],[0,"&frac14;"],[0,"&frac12;"],[0,"&frac34;"],[0,"&iquest;"],[0,"&Agrave;"],[0,"&Aacute;"],[0,"&Acirc;"],[0,"&Atilde;"],[0,"&Auml;"],[0,"&angst;"],[0,"&AElig;"],[0,"&Ccedil;"],[0,"&Egrave;"],[0,"&Eacute;"],[0,"&Ecirc;"],[0,"&Euml;"],[0,"&Igrave;"],[0,"&Iacute;"],[0,"&Icirc;"],[0,"&Iuml;"],[0,"&ETH;"],[0,"&Ntilde;"],[0,"&Ograve;"],[0,"&Oacute;"],[0,"&Ocirc;"],[0,"&Otilde;"],[0,"&Ouml;"],[0,"&times;"],[0,"&Oslash;"],[0,"&Ugrave;"],[0,"&Uacute;"],[0,"&Ucirc;"],[0,"&Uuml;"],[0,"&Yacute;"],[0,"&THORN;"],[0,"&szlig;"],[0,"&agrave;"],[0,"&aacute;"],[0,"&acirc;"],[0,"&atilde;"],[0,"&auml;"],[0,"&aring;"],[0,"&aelig;"],[0,"&ccedil;"],[0,"&egrave;"],[0,"&eacute;"],[0,"&ecirc;"],[0,"&euml;"],[0,"&igrave;"],[0,"&iacute;"],[0,"&icirc;"],[0,"&iuml;"],[0,"&eth;"],[0,"&ntilde;"],[0,"&ograve;"],[0,"&oacute;"],[0,"&ocirc;"],[0,"&otilde;"],[0,"&ouml;"],[0,"&div;"],[0,"&oslash;"],[0,"&ugrave;"],[0,"&uacute;"],[0,"&ucirc;"],[0,"&uuml;"],[0,"&yacute;"],[0,"&thorn;"],[0,"&yuml;"],[0,"&Amacr;"],[0,"&amacr;"],[0,"&Abreve;"],[0,"&abreve;"],[0,"&Aogon;"],[0,"&aogon;"],[0,"&Cacute;"],[0,"&cacute;"],[0,"&Ccirc;"],[0,"&ccirc;"],[0,"&Cdot;"],[0,"&cdot;"],[0,"&Ccaron;"],[0,"&ccaron;"],[0,"&Dcaron;"],[0,"&dcaron;"],[0,"&Dstrok;"],[0,"&dstrok;"],[0,"&Emacr;"],[0,"&emacr;"],[2,"&Edot;"],[0,"&edot;"],[0,"&Eogon;"],[0,"&eogon;"],[0,"&Ecaron;"],[0,"&ecaron;"],[0,"&Gcirc;"],[0,"&gcirc;"],[0,"&Gbreve;"],[0,"&gbreve;"],[0,"&Gdot;"],[0,"&gdot;"],[0,"&Gcedil;"],[1,"&Hcirc;"],[0,"&hcirc;"],[0,"&Hstrok;"],[0,"&hstrok;"],[0,"&Itilde;"],[0,"&itilde;"],[0,"&Imacr;"],[0,"&imacr;"],[2,"&Iogon;"],[0,"&iogon;"],[0,"&Idot;"],[0,"&imath;"],[0,"&IJlig;"],[0,"&ijlig;"],[0,"&Jcirc;"],[0,"&jcirc;"],[0,"&Kcedil;"],[0,"&kcedil;"],[0,"&kgreen;"],[0,"&Lacute;"],[0,"&lacute;"],[0,"&Lcedil;"],[0,"&lcedil;"],[0,"&Lcaron;"],[0,"&lcaron;"],[0,"&Lmidot;"],[0,"&lmidot;"],[0,"&Lstrok;"],[0,"&lstrok;"],[0,"&Nacute;"],[0,"&nacute;"],[0,"&Ncedil;"],[0,"&ncedil;"],[0,"&Ncaron;"],[0,"&ncaron;"],[0,"&napos;"],[0,"&ENG;"],[0,"&eng;"],[0,"&Omacr;"],[0,"&omacr;"],[2,"&Odblac;"],[0,"&odblac;"],[0,"&OElig;"],[0,"&oelig;"],[0,"&Racute;"],[0,"&racute;"],[0,"&Rcedil;"],[0,"&rcedil;"],[0,"&Rcaron;"],[0,"&rcaron;"],[0,"&Sacute;"],[0,"&sacute;"],[0,"&Scirc;"],[0,"&scirc;"],[0,"&Scedil;"],[0,"&scedil;"],[0,"&Scaron;"],[0,"&scaron;"],[0,"&Tcedil;"],[0,"&tcedil;"],[0,"&Tcaron;"],[0,"&tcaron;"],[0,"&Tstrok;"],[0,"&tstrok;"],[0,"&Utilde;"],[0,"&utilde;"],[0,"&Umacr;"],[0,"&umacr;"],[0,"&Ubreve;"],[0,"&ubreve;"],[0,"&Uring;"],[0,"&uring;"],[0,"&Udblac;"],[0,"&udblac;"],[0,"&Uogon;"],[0,"&uogon;"],[0,"&Wcirc;"],[0,"&wcirc;"],[0,"&Ycirc;"],[0,"&ycirc;"],[0,"&Yuml;"],[0,"&Zacute;"],[0,"&zacute;"],[0,"&Zdot;"],[0,"&zdot;"],[0,"&Zcaron;"],[0,"&zcaron;"],[19,"&fnof;"],[34,"&imped;"],[63,"&gacute;"],[65,"&jmath;"],[142,"&circ;"],[0,"&caron;"],[16,"&breve;"],[0,"&DiacriticalDot;"],[0,"&ring;"],[0,"&ogon;"],[0,"&DiacriticalTilde;"],[0,"&dblac;"],[51,"&DownBreve;"],[127,"&Alpha;"],[0,"&Beta;"],[0,"&Gamma;"],[0,"&Delta;"],[0,"&Epsilon;"],[0,"&Zeta;"],[0,"&Eta;"],[0,"&Theta;"],[0,"&Iota;"],[0,"&Kappa;"],[0,"&Lambda;"],[0,"&Mu;"],[0,"&Nu;"],[0,"&Xi;"],[0,"&Omicron;"],[0,"&Pi;"],[0,"&Rho;"],[1,"&Sigma;"],[0,"&Tau;"],[0,"&Upsilon;"],[0,"&Phi;"],[0,"&Chi;"],[0,"&Psi;"],[0,"&ohm;"],[7,"&alpha;"],[0,"&beta;"],[0,"&gamma;"],[0,"&delta;"],[0,"&epsi;"],[0,"&zeta;"],[0,"&eta;"],[0,"&theta;"],[0,"&iota;"],[0,"&kappa;"],[0,"&lambda;"],[0,"&mu;"],[0,"&nu;"],[0,"&xi;"],[0,"&omicron;"],[0,"&pi;"],[0,"&rho;"],[0,"&sigmaf;"],[0,"&sigma;"],[0,"&tau;"],[0,"&upsi;"],[0,"&phi;"],[0,"&chi;"],[0,"&psi;"],[0,"&omega;"],[7,"&thetasym;"],[0,"&Upsi;"],[2,"&phiv;"],[0,"&piv;"],[5,"&Gammad;"],[0,"&digamma;"],[18,"&kappav;"],[0,"&rhov;"],[3,"&epsiv;"],[0,"&backepsilon;"],[10,"&IOcy;"],[0,"&DJcy;"],[0,"&GJcy;"],[0,"&Jukcy;"],[0,"&DScy;"],[0,"&Iukcy;"],[0,"&YIcy;"],[0,"&Jsercy;"],[0,"&LJcy;"],[0,"&NJcy;"],[0,"&TSHcy;"],[0,"&KJcy;"],[1,"&Ubrcy;"],[0,"&DZcy;"],[0,"&Acy;"],[0,"&Bcy;"],[0,"&Vcy;"],[0,"&Gcy;"],[0,"&Dcy;"],[0,"&IEcy;"],[0,"&ZHcy;"],[0,"&Zcy;"],[0,"&Icy;"],[0,"&Jcy;"],[0,"&Kcy;"],[0,"&Lcy;"],[0,"&Mcy;"],[0,"&Ncy;"],[0,"&Ocy;"],[0,"&Pcy;"],[0,"&Rcy;"],[0,"&Scy;"],[0,"&Tcy;"],[0,"&Ucy;"],[0,"&Fcy;"],[0,"&KHcy;"],[0,"&TScy;"],[0,"&CHcy;"],[0,"&SHcy;"],[0,"&SHCHcy;"],[0,"&HARDcy;"],[0,"&Ycy;"],[0,"&SOFTcy;"],[0,"&Ecy;"],[0,"&YUcy;"],[0,"&YAcy;"],[0,"&acy;"],[0,"&bcy;"],[0,"&vcy;"],[0,"&gcy;"],[0,"&dcy;"],[0,"&iecy;"],[0,"&zhcy;"],[0,"&zcy;"],[0,"&icy;"],[0,"&jcy;"],[0,"&kcy;"],[0,"&lcy;"],[0,"&mcy;"],[0,"&ncy;"],[0,"&ocy;"],[0,"&pcy;"],[0,"&rcy;"],[0,"&scy;"],[0,"&tcy;"],[0,"&ucy;"],[0,"&fcy;"],[0,"&khcy;"],[0,"&tscy;"],[0,"&chcy;"],[0,"&shcy;"],[0,"&shchcy;"],[0,"&hardcy;"],[0,"&ycy;"],[0,"&softcy;"],[0,"&ecy;"],[0,"&yucy;"],[0,"&yacy;"],[1,"&iocy;"],[0,"&djcy;"],[0,"&gjcy;"],[0,"&jukcy;"],[0,"&dscy;"],[0,"&iukcy;"],[0,"&yicy;"],[0,"&jsercy;"],[0,"&ljcy;"],[0,"&njcy;"],[0,"&tshcy;"],[0,"&kjcy;"],[1,"&ubrcy;"],[0,"&dzcy;"],[7074,"&ensp;"],[0,"&emsp;"],[0,"&emsp13;"],[0,"&emsp14;"],[1,"&numsp;"],[0,"&puncsp;"],[0,"&ThinSpace;"],[0,"&hairsp;"],[0,"&NegativeMediumSpace;"],[0,"&zwnj;"],[0,"&zwj;"],[0,"&lrm;"],[0,"&rlm;"],[0,"&dash;"],[2,"&ndash;"],[0,"&mdash;"],[0,"&horbar;"],[0,"&Verbar;"],[1,"&lsquo;"],[0,"&CloseCurlyQuote;"],[0,"&lsquor;"],[1,"&ldquo;"],[0,"&CloseCurlyDoubleQuote;"],[0,"&bdquo;"],[1,"&dagger;"],[0,"&Dagger;"],[0,"&bull;"],[2,"&nldr;"],[0,"&hellip;"],[9,"&permil;"],[0,"&pertenk;"],[0,"&prime;"],[0,"&Prime;"],[0,"&tprime;"],[0,"&backprime;"],[3,"&lsaquo;"],[0,"&rsaquo;"],[3,"&oline;"],[2,"&caret;"],[1,"&hybull;"],[0,"&frasl;"],[10,"&bsemi;"],[7,"&qprime;"],[7,{v:"&MediumSpace;",n:8202,o:"&ThickSpace;"}],[0,"&NoBreak;"],[0,"&af;"],[0,"&InvisibleTimes;"],[0,"&ic;"],[72,"&euro;"],[46,"&tdot;"],[0,"&DotDot;"],[37,"&complexes;"],[2,"&incare;"],[4,"&gscr;"],[0,"&hamilt;"],[0,"&Hfr;"],[0,"&Hopf;"],[0,"&planckh;"],[0,"&hbar;"],[0,"&imagline;"],[0,"&Ifr;"],[0,"&lagran;"],[0,"&ell;"],[1,"&naturals;"],[0,"&numero;"],[0,"&copysr;"],[0,"&weierp;"],[0,"&Popf;"],[0,"&Qopf;"],[0,"&realine;"],[0,"&real;"],[0,"&reals;"],[0,"&rx;"],[3,"&trade;"],[1,"&integers;"],[2,"&mho;"],[0,"&zeetrf;"],[0,"&iiota;"],[2,"&bernou;"],[0,"&Cayleys;"],[1,"&escr;"],[0,"&Escr;"],[0,"&Fouriertrf;"],[1,"&Mellintrf;"],[0,"&order;"],[0,"&alefsym;"],[0,"&beth;"],[0,"&gimel;"],[0,"&daleth;"],[12,"&CapitalDifferentialD;"],[0,"&dd;"],[0,"&ee;"],[0,"&ii;"],[10,"&frac13;"],[0,"&frac23;"],[0,"&frac15;"],[0,"&frac25;"],[0,"&frac35;"],[0,"&frac45;"],[0,"&frac16;"],[0,"&frac56;"],[0,"&frac18;"],[0,"&frac38;"],[0,"&frac58;"],[0,"&frac78;"],[49,"&larr;"],[0,"&ShortUpArrow;"],[0,"&rarr;"],[0,"&darr;"],[0,"&harr;"],[0,"&updownarrow;"],[0,"&nwarr;"],[0,"&nearr;"],[0,"&LowerRightArrow;"],[0,"&LowerLeftArrow;"],[0,"&nlarr;"],[0,"&nrarr;"],[1,{v:"&rarrw;",n:824,o:"&nrarrw;"}],[0,"&Larr;"],[0,"&Uarr;"],[0,"&Rarr;"],[0,"&Darr;"],[0,"&larrtl;"],[0,"&rarrtl;"],[0,"&LeftTeeArrow;"],[0,"&mapstoup;"],[0,"&map;"],[0,"&DownTeeArrow;"],[1,"&hookleftarrow;"],[0,"&hookrightarrow;"],[0,"&larrlp;"],[0,"&looparrowright;"],[0,"&harrw;"],[0,"&nharr;"],[1,"&lsh;"],[0,"&rsh;"],[0,"&ldsh;"],[0,"&rdsh;"],[1,"&crarr;"],[0,"&cularr;"],[0,"&curarr;"],[2,"&circlearrowleft;"],[0,"&circlearrowright;"],[0,"&leftharpoonup;"],[0,"&DownLeftVector;"],[0,"&RightUpVector;"],[0,"&LeftUpVector;"],[0,"&rharu;"],[0,"&DownRightVector;"],[0,"&dharr;"],[0,"&dharl;"],[0,"&RightArrowLeftArrow;"],[0,"&udarr;"],[0,"&LeftArrowRightArrow;"],[0,"&leftleftarrows;"],[0,"&upuparrows;"],[0,"&rightrightarrows;"],[0,"&ddarr;"],[0,"&leftrightharpoons;"],[0,"&Equilibrium;"],[0,"&nlArr;"],[0,"&nhArr;"],[0,"&nrArr;"],[0,"&DoubleLeftArrow;"],[0,"&DoubleUpArrow;"],[0,"&DoubleRightArrow;"],[0,"&dArr;"],[0,"&DoubleLeftRightArrow;"],[0,"&DoubleUpDownArrow;"],[0,"&nwArr;"],[0,"&neArr;"],[0,"&seArr;"],[0,"&swArr;"],[0,"&lAarr;"],[0,"&rAarr;"],[1,"&zigrarr;"],[6,"&larrb;"],[0,"&rarrb;"],[15,"&DownArrowUpArrow;"],[7,"&loarr;"],[0,"&roarr;"],[0,"&hoarr;"],[0,"&forall;"],[0,"&comp;"],[0,{v:"&part;",n:824,o:"&npart;"}],[0,"&exist;"],[0,"&nexist;"],[0,"&empty;"],[1,"&Del;"],[0,"&Element;"],[0,"&NotElement;"],[1,"&ni;"],[0,"&notni;"],[2,"&prod;"],[0,"&coprod;"],[0,"&sum;"],[0,"&minus;"],[0,"&MinusPlus;"],[0,"&dotplus;"],[1,"&Backslash;"],[0,"&lowast;"],[0,"&compfn;"],[1,"&radic;"],[2,"&prop;"],[0,"&infin;"],[0,"&angrt;"],[0,{v:"&ang;",n:8402,o:"&nang;"}],[0,"&angmsd;"],[0,"&angsph;"],[0,"&mid;"],[0,"&nmid;"],[0,"&DoubleVerticalBar;"],[0,"&NotDoubleVerticalBar;"],[0,"&and;"],[0,"&or;"],[0,{v:"&cap;",n:65024,o:"&caps;"}],[0,{v:"&cup;",n:65024,o:"&cups;"}],[0,"&int;"],[0,"&Int;"],[0,"&iiint;"],[0,"&conint;"],[0,"&Conint;"],[0,"&Cconint;"],[0,"&cwint;"],[0,"&ClockwiseContourIntegral;"],[0,"&awconint;"],[0,"&there4;"],[0,"&becaus;"],[0,"&ratio;"],[0,"&Colon;"],[0,"&dotminus;"],[1,"&mDDot;"],[0,"&homtht;"],[0,{v:"&sim;",n:8402,o:"&nvsim;"}],[0,{v:"&backsim;",n:817,o:"&race;"}],[0,{v:"&ac;",n:819,o:"&acE;"}],[0,"&acd;"],[0,"&VerticalTilde;"],[0,"&NotTilde;"],[0,{v:"&eqsim;",n:824,o:"&nesim;"}],[0,"&sime;"],[0,"&NotTildeEqual;"],[0,"&cong;"],[0,"&simne;"],[0,"&ncong;"],[0,"&ap;"],[0,"&nap;"],[0,"&ape;"],[0,{v:"&apid;",n:824,o:"&napid;"}],[0,"&backcong;"],[0,{v:"&asympeq;",n:8402,o:"&nvap;"}],[0,{v:"&bump;",n:824,o:"&nbump;"}],[0,{v:"&bumpe;",n:824,o:"&nbumpe;"}],[0,{v:"&doteq;",n:824,o:"&nedot;"}],[0,"&doteqdot;"],[0,"&efDot;"],[0,"&erDot;"],[0,"&Assign;"],[0,"&ecolon;"],[0,"&ecir;"],[0,"&circeq;"],[1,"&wedgeq;"],[0,"&veeeq;"],[1,"&triangleq;"],[2,"&equest;"],[0,"&ne;"],[0,{v:"&Congruent;",n:8421,o:"&bnequiv;"}],[0,"&nequiv;"],[1,{v:"&le;",n:8402,o:"&nvle;"}],[0,{v:"&ge;",n:8402,o:"&nvge;"}],[0,{v:"&lE;",n:824,o:"&nlE;"}],[0,{v:"&gE;",n:824,o:"&ngE;"}],[0,{v:"&lnE;",n:65024,o:"&lvertneqq;"}],[0,{v:"&gnE;",n:65024,o:"&gvertneqq;"}],[0,{v:"&ll;",n:new Map(ve([[824,"&nLtv;"],[7577,"&nLt;"]]))}],[0,{v:"&gg;",n:new Map(ve([[824,"&nGtv;"],[7577,"&nGt;"]]))}],[0,"&between;"],[0,"&NotCupCap;"],[0,"&nless;"],[0,"&ngt;"],[0,"&nle;"],[0,"&nge;"],[0,"&lesssim;"],[0,"&GreaterTilde;"],[0,"&nlsim;"],[0,"&ngsim;"],[0,"&LessGreater;"],[0,"&gl;"],[0,"&NotLessGreater;"],[0,"&NotGreaterLess;"],[0,"&pr;"],[0,"&sc;"],[0,"&prcue;"],[0,"&sccue;"],[0,"&PrecedesTilde;"],[0,{v:"&scsim;",n:824,o:"&NotSucceedsTilde;"}],[0,"&NotPrecedes;"],[0,"&NotSucceeds;"],[0,{v:"&sub;",n:8402,o:"&NotSubset;"}],[0,{v:"&sup;",n:8402,o:"&NotSuperset;"}],[0,"&nsub;"],[0,"&nsup;"],[0,"&sube;"],[0,"&supe;"],[0,"&NotSubsetEqual;"],[0,"&NotSupersetEqual;"],[0,{v:"&subne;",n:65024,o:"&varsubsetneq;"}],[0,{v:"&supne;",n:65024,o:"&varsupsetneq;"}],[1,"&cupdot;"],[0,"&UnionPlus;"],[0,{v:"&sqsub;",n:824,o:"&NotSquareSubset;"}],[0,{v:"&sqsup;",n:824,o:"&NotSquareSuperset;"}],[0,"&sqsube;"],[0,"&sqsupe;"],[0,{v:"&sqcap;",n:65024,o:"&sqcaps;"}],[0,{v:"&sqcup;",n:65024,o:"&sqcups;"}],[0,"&CirclePlus;"],[0,"&CircleMinus;"],[0,"&CircleTimes;"],[0,"&osol;"],[0,"&CircleDot;"],[0,"&circledcirc;"],[0,"&circledast;"],[1,"&circleddash;"],[0,"&boxplus;"],[0,"&boxminus;"],[0,"&boxtimes;"],[0,"&dotsquare;"],[0,"&RightTee;"],[0,"&dashv;"],[0,"&DownTee;"],[0,"&bot;"],[1,"&models;"],[0,"&DoubleRightTee;"],[0,"&Vdash;"],[0,"&Vvdash;"],[0,"&VDash;"],[0,"&nvdash;"],[0,"&nvDash;"],[0,"&nVdash;"],[0,"&nVDash;"],[0,"&prurel;"],[1,"&LeftTriangle;"],[0,"&RightTriangle;"],[0,{v:"&LeftTriangleEqual;",n:8402,o:"&nvltrie;"}],[0,{v:"&RightTriangleEqual;",n:8402,o:"&nvrtrie;"}],[0,"&origof;"],[0,"&imof;"],[0,"&multimap;"],[0,"&hercon;"],[0,"&intcal;"],[0,"&veebar;"],[1,"&barvee;"],[0,"&angrtvb;"],[0,"&lrtri;"],[0,"&bigwedge;"],[0,"&bigvee;"],[0,"&bigcap;"],[0,"&bigcup;"],[0,"&diam;"],[0,"&sdot;"],[0,"&sstarf;"],[0,"&divideontimes;"],[0,"&bowtie;"],[0,"&ltimes;"],[0,"&rtimes;"],[0,"&leftthreetimes;"],[0,"&rightthreetimes;"],[0,"&backsimeq;"],[0,"&curlyvee;"],[0,"&curlywedge;"],[0,"&Sub;"],[0,"&Sup;"],[0,"&Cap;"],[0,"&Cup;"],[0,"&fork;"],[0,"&epar;"],[0,"&lessdot;"],[0,"&gtdot;"],[0,{v:"&Ll;",n:824,o:"&nLl;"}],[0,{v:"&Gg;",n:824,o:"&nGg;"}],[0,{v:"&leg;",n:65024,o:"&lesg;"}],[0,{v:"&gel;",n:65024,o:"&gesl;"}],[2,"&cuepr;"],[0,"&cuesc;"],[0,"&NotPrecedesSlantEqual;"],[0,"&NotSucceedsSlantEqual;"],[0,"&NotSquareSubsetEqual;"],[0,"&NotSquareSupersetEqual;"],[2,"&lnsim;"],[0,"&gnsim;"],[0,"&precnsim;"],[0,"&scnsim;"],[0,"&nltri;"],[0,"&NotRightTriangle;"],[0,"&nltrie;"],[0,"&NotRightTriangleEqual;"],[0,"&vellip;"],[0,"&ctdot;"],[0,"&utdot;"],[0,"&dtdot;"],[0,"&disin;"],[0,"&isinsv;"],[0,"&isins;"],[0,{v:"&isindot;",n:824,o:"&notindot;"}],[0,"&notinvc;"],[0,"&notinvb;"],[1,{v:"&isinE;",n:824,o:"&notinE;"}],[0,"&nisd;"],[0,"&xnis;"],[0,"&nis;"],[0,"&notnivc;"],[0,"&notnivb;"],[6,"&barwed;"],[0,"&Barwed;"],[1,"&lceil;"],[0,"&rceil;"],[0,"&LeftFloor;"],[0,"&rfloor;"],[0,"&drcrop;"],[0,"&dlcrop;"],[0,"&urcrop;"],[0,"&ulcrop;"],[0,"&bnot;"],[1,"&profline;"],[0,"&profsurf;"],[1,"&telrec;"],[0,"&target;"],[5,"&ulcorn;"],[0,"&urcorn;"],[0,"&dlcorn;"],[0,"&drcorn;"],[2,"&frown;"],[0,"&smile;"],[9,"&cylcty;"],[0,"&profalar;"],[7,"&topbot;"],[6,"&ovbar;"],[1,"&solbar;"],[60,"&angzarr;"],[51,"&lmoustache;"],[0,"&rmoustache;"],[2,"&OverBracket;"],[0,"&bbrk;"],[0,"&bbrktbrk;"],[37,"&OverParenthesis;"],[0,"&UnderParenthesis;"],[0,"&OverBrace;"],[0,"&UnderBrace;"],[2,"&trpezium;"],[4,"&elinters;"],[59,"&blank;"],[164,"&circledS;"],[55,"&boxh;"],[1,"&boxv;"],[9,"&boxdr;"],[3,"&boxdl;"],[3,"&boxur;"],[3,"&boxul;"],[3,"&boxvr;"],[7,"&boxvl;"],[7,"&boxhd;"],[7,"&boxhu;"],[7,"&boxvh;"],[19,"&boxH;"],[0,"&boxV;"],[0,"&boxdR;"],[0,"&boxDr;"],[0,"&boxDR;"],[0,"&boxdL;"],[0,"&boxDl;"],[0,"&boxDL;"],[0,"&boxuR;"],[0,"&boxUr;"],[0,"&boxUR;"],[0,"&boxuL;"],[0,"&boxUl;"],[0,"&boxUL;"],[0,"&boxvR;"],[0,"&boxVr;"],[0,"&boxVR;"],[0,"&boxvL;"],[0,"&boxVl;"],[0,"&boxVL;"],[0,"&boxHd;"],[0,"&boxhD;"],[0,"&boxHD;"],[0,"&boxHu;"],[0,"&boxhU;"],[0,"&boxHU;"],[0,"&boxvH;"],[0,"&boxVh;"],[0,"&boxVH;"],[19,"&uhblk;"],[3,"&lhblk;"],[3,"&block;"],[8,"&blk14;"],[0,"&blk12;"],[0,"&blk34;"],[13,"&square;"],[8,"&blacksquare;"],[0,"&EmptyVerySmallSquare;"],[1,"&rect;"],[0,"&marker;"],[2,"&fltns;"],[1,"&bigtriangleup;"],[0,"&blacktriangle;"],[0,"&triangle;"],[2,"&blacktriangleright;"],[0,"&rtri;"],[3,"&bigtriangledown;"],[0,"&blacktriangledown;"],[0,"&dtri;"],[2,"&blacktriangleleft;"],[0,"&ltri;"],[6,"&loz;"],[0,"&cir;"],[32,"&tridot;"],[2,"&bigcirc;"],[8,"&ultri;"],[0,"&urtri;"],[0,"&lltri;"],[0,"&EmptySmallSquare;"],[0,"&FilledSmallSquare;"],[8,"&bigstar;"],[0,"&star;"],[7,"&phone;"],[49,"&female;"],[1,"&male;"],[29,"&spades;"],[2,"&clubs;"],[1,"&hearts;"],[0,"&diamondsuit;"],[3,"&sung;"],[2,"&flat;"],[0,"&natural;"],[0,"&sharp;"],[163,"&check;"],[3,"&cross;"],[8,"&malt;"],[21,"&sext;"],[33,"&VerticalSeparator;"],[25,"&lbbrk;"],[0,"&rbbrk;"],[84,"&bsolhsub;"],[0,"&suphsol;"],[28,"&LeftDoubleBracket;"],[0,"&RightDoubleBracket;"],[0,"&lang;"],[0,"&rang;"],[0,"&Lang;"],[0,"&Rang;"],[0,"&loang;"],[0,"&roang;"],[7,"&longleftarrow;"],[0,"&longrightarrow;"],[0,"&longleftrightarrow;"],[0,"&DoubleLongLeftArrow;"],[0,"&DoubleLongRightArrow;"],[0,"&DoubleLongLeftRightArrow;"],[1,"&longmapsto;"],[2,"&dzigrarr;"],[258,"&nvlArr;"],[0,"&nvrArr;"],[0,"&nvHarr;"],[0,"&Map;"],[6,"&lbarr;"],[0,"&bkarow;"],[0,"&lBarr;"],[0,"&dbkarow;"],[0,"&drbkarow;"],[0,"&DDotrahd;"],[0,"&UpArrowBar;"],[0,"&DownArrowBar;"],[2,"&Rarrtl;"],[2,"&latail;"],[0,"&ratail;"],[0,"&lAtail;"],[0,"&rAtail;"],[0,"&larrfs;"],[0,"&rarrfs;"],[0,"&larrbfs;"],[0,"&rarrbfs;"],[2,"&nwarhk;"],[0,"&nearhk;"],[0,"&hksearow;"],[0,"&hkswarow;"],[0,"&nwnear;"],[0,"&nesear;"],[0,"&seswar;"],[0,"&swnwar;"],[8,{v:"&rarrc;",n:824,o:"&nrarrc;"}],[1,"&cudarrr;"],[0,"&ldca;"],[0,"&rdca;"],[0,"&cudarrl;"],[0,"&larrpl;"],[2,"&curarrm;"],[0,"&cularrp;"],[7,"&rarrpl;"],[2,"&harrcir;"],[0,"&Uarrocir;"],[0,"&lurdshar;"],[0,"&ldrushar;"],[2,"&LeftRightVector;"],[0,"&RightUpDownVector;"],[0,"&DownLeftRightVector;"],[0,"&LeftUpDownVector;"],[0,"&LeftVectorBar;"],[0,"&RightVectorBar;"],[0,"&RightUpVectorBar;"],[0,"&RightDownVectorBar;"],[0,"&DownLeftVectorBar;"],[0,"&DownRightVectorBar;"],[0,"&LeftUpVectorBar;"],[0,"&LeftDownVectorBar;"],[0,"&LeftTeeVector;"],[0,"&RightTeeVector;"],[0,"&RightUpTeeVector;"],[0,"&RightDownTeeVector;"],[0,"&DownLeftTeeVector;"],[0,"&DownRightTeeVector;"],[0,"&LeftUpTeeVector;"],[0,"&LeftDownTeeVector;"],[0,"&lHar;"],[0,"&uHar;"],[0,"&rHar;"],[0,"&dHar;"],[0,"&luruhar;"],[0,"&ldrdhar;"],[0,"&ruluhar;"],[0,"&rdldhar;"],[0,"&lharul;"],[0,"&llhard;"],[0,"&rharul;"],[0,"&lrhard;"],[0,"&udhar;"],[0,"&duhar;"],[0,"&RoundImplies;"],[0,"&erarr;"],[0,"&simrarr;"],[0,"&larrsim;"],[0,"&rarrsim;"],[0,"&rarrap;"],[0,"&ltlarr;"],[1,"&gtrarr;"],[0,"&subrarr;"],[1,"&suplarr;"],[0,"&lfisht;"],[0,"&rfisht;"],[0,"&ufisht;"],[0,"&dfisht;"],[5,"&lopar;"],[0,"&ropar;"],[4,"&lbrke;"],[0,"&rbrke;"],[0,"&lbrkslu;"],[0,"&rbrksld;"],[0,"&lbrksld;"],[0,"&rbrkslu;"],[0,"&langd;"],[0,"&rangd;"],[0,"&lparlt;"],[0,"&rpargt;"],[0,"&gtlPar;"],[0,"&ltrPar;"],[3,"&vzigzag;"],[1,"&vangrt;"],[0,"&angrtvbd;"],[6,"&ange;"],[0,"&range;"],[0,"&dwangle;"],[0,"&uwangle;"],[0,"&angmsdaa;"],[0,"&angmsdab;"],[0,"&angmsdac;"],[0,"&angmsdad;"],[0,"&angmsdae;"],[0,"&angmsdaf;"],[0,"&angmsdag;"],[0,"&angmsdah;"],[0,"&bemptyv;"],[0,"&demptyv;"],[0,"&cemptyv;"],[0,"&raemptyv;"],[0,"&laemptyv;"],[0,"&ohbar;"],[0,"&omid;"],[0,"&opar;"],[1,"&operp;"],[1,"&olcross;"],[0,"&odsold;"],[1,"&olcir;"],[0,"&ofcir;"],[0,"&olt;"],[0,"&ogt;"],[0,"&cirscir;"],[0,"&cirE;"],[0,"&solb;"],[0,"&bsolb;"],[3,"&boxbox;"],[3,"&trisb;"],[0,"&rtriltri;"],[0,{v:"&LeftTriangleBar;",n:824,o:"&NotLeftTriangleBar;"}],[0,{v:"&RightTriangleBar;",n:824,o:"&NotRightTriangleBar;"}],[11,"&iinfin;"],[0,"&infintie;"],[0,"&nvinfin;"],[4,"&eparsl;"],[0,"&smeparsl;"],[0,"&eqvparsl;"],[5,"&blacklozenge;"],[8,"&RuleDelayed;"],[1,"&dsol;"],[9,"&bigodot;"],[0,"&bigoplus;"],[0,"&bigotimes;"],[1,"&biguplus;"],[1,"&bigsqcup;"],[5,"&iiiint;"],[0,"&fpartint;"],[2,"&cirfnint;"],[0,"&awint;"],[0,"&rppolint;"],[0,"&scpolint;"],[0,"&npolint;"],[0,"&pointint;"],[0,"&quatint;"],[0,"&intlarhk;"],[10,"&pluscir;"],[0,"&plusacir;"],[0,"&simplus;"],[0,"&plusdu;"],[0,"&plussim;"],[0,"&plustwo;"],[1,"&mcomma;"],[0,"&minusdu;"],[2,"&loplus;"],[0,"&roplus;"],[0,"&Cross;"],[0,"&timesd;"],[0,"&timesbar;"],[1,"&smashp;"],[0,"&lotimes;"],[0,"&rotimes;"],[0,"&otimesas;"],[0,"&Otimes;"],[0,"&odiv;"],[0,"&triplus;"],[0,"&triminus;"],[0,"&tritime;"],[0,"&intprod;"],[2,"&amalg;"],[0,"&capdot;"],[1,"&ncup;"],[0,"&ncap;"],[0,"&capand;"],[0,"&cupor;"],[0,"&cupcap;"],[0,"&capcup;"],[0,"&cupbrcap;"],[0,"&capbrcup;"],[0,"&cupcup;"],[0,"&capcap;"],[0,"&ccups;"],[0,"&ccaps;"],[2,"&ccupssm;"],[2,"&And;"],[0,"&Or;"],[0,"&andand;"],[0,"&oror;"],[0,"&orslope;"],[0,"&andslope;"],[1,"&andv;"],[0,"&orv;"],[0,"&andd;"],[0,"&ord;"],[1,"&wedbar;"],[6,"&sdote;"],[3,"&simdot;"],[2,{v:"&congdot;",n:824,o:"&ncongdot;"}],[0,"&easter;"],[0,"&apacir;"],[0,{v:"&apE;",n:824,o:"&napE;"}],[0,"&eplus;"],[0,"&pluse;"],[0,"&Esim;"],[0,"&Colone;"],[0,"&Equal;"],[1,"&ddotseq;"],[0,"&equivDD;"],[0,"&ltcir;"],[0,"&gtcir;"],[0,"&ltquest;"],[0,"&gtquest;"],[0,{v:"&leqslant;",n:824,o:"&nleqslant;"}],[0,{v:"&geqslant;",n:824,o:"&ngeqslant;"}],[0,"&lesdot;"],[0,"&gesdot;"],[0,"&lesdoto;"],[0,"&gesdoto;"],[0,"&lesdotor;"],[0,"&gesdotol;"],[0,"&lap;"],[0,"&gap;"],[0,"&lne;"],[0,"&gne;"],[0,"&lnap;"],[0,"&gnap;"],[0,"&lEg;"],[0,"&gEl;"],[0,"&lsime;"],[0,"&gsime;"],[0,"&lsimg;"],[0,"&gsiml;"],[0,"&lgE;"],[0,"&glE;"],[0,"&lesges;"],[0,"&gesles;"],[0,"&els;"],[0,"&egs;"],[0,"&elsdot;"],[0,"&egsdot;"],[0,"&el;"],[0,"&eg;"],[2,"&siml;"],[0,"&simg;"],[0,"&simlE;"],[0,"&simgE;"],[0,{v:"&LessLess;",n:824,o:"&NotNestedLessLess;"}],[0,{v:"&GreaterGreater;",n:824,o:"&NotNestedGreaterGreater;"}],[1,"&glj;"],[0,"&gla;"],[0,"&ltcc;"],[0,"&gtcc;"],[0,"&lescc;"],[0,"&gescc;"],[0,"&smt;"],[0,"&lat;"],[0,{v:"&smte;",n:65024,o:"&smtes;"}],[0,{v:"&late;",n:65024,o:"&lates;"}],[0,"&bumpE;"],[0,{v:"&PrecedesEqual;",n:824,o:"&NotPrecedesEqual;"}],[0,{v:"&sce;",n:824,o:"&NotSucceedsEqual;"}],[2,"&prE;"],[0,"&scE;"],[0,"&precneqq;"],[0,"&scnE;"],[0,"&prap;"],[0,"&scap;"],[0,"&precnapprox;"],[0,"&scnap;"],[0,"&Pr;"],[0,"&Sc;"],[0,"&subdot;"],[0,"&supdot;"],[0,"&subplus;"],[0,"&supplus;"],[0,"&submult;"],[0,"&supmult;"],[0,"&subedot;"],[0,"&supedot;"],[0,{v:"&subE;",n:824,o:"&nsubE;"}],[0,{v:"&supE;",n:824,o:"&nsupE;"}],[0,"&subsim;"],[0,"&supsim;"],[2,{v:"&subnE;",n:65024,o:"&varsubsetneqq;"}],[0,{v:"&supnE;",n:65024,o:"&varsupsetneqq;"}],[2,"&csub;"],[0,"&csup;"],[0,"&csube;"],[0,"&csupe;"],[0,"&subsup;"],[0,"&supsub;"],[0,"&subsub;"],[0,"&supsup;"],[0,"&suphsub;"],[0,"&supdsub;"],[0,"&forkv;"],[0,"&topfork;"],[0,"&mlcp;"],[8,"&Dashv;"],[1,"&Vdashl;"],[0,"&Barv;"],[0,"&vBar;"],[0,"&vBarv;"],[1,"&Vbar;"],[0,"&Not;"],[0,"&bNot;"],[0,"&rnmid;"],[0,"&cirmid;"],[0,"&midcir;"],[0,"&topcir;"],[0,"&nhpar;"],[0,"&parsim;"],[9,{v:"&parsl;",n:8421,o:"&nparsl;"}],[44343,{n:new Map(ve([[56476,"&Ascr;"],[1,"&Cscr;"],[0,"&Dscr;"],[2,"&Gscr;"],[2,"&Jscr;"],[0,"&Kscr;"],[2,"&Nscr;"],[0,"&Oscr;"],[0,"&Pscr;"],[0,"&Qscr;"],[1,"&Sscr;"],[0,"&Tscr;"],[0,"&Uscr;"],[0,"&Vscr;"],[0,"&Wscr;"],[0,"&Xscr;"],[0,"&Yscr;"],[0,"&Zscr;"],[0,"&ascr;"],[0,"&bscr;"],[0,"&cscr;"],[0,"&dscr;"],[1,"&fscr;"],[1,"&hscr;"],[0,"&iscr;"],[0,"&jscr;"],[0,"&kscr;"],[0,"&lscr;"],[0,"&mscr;"],[0,"&nscr;"],[1,"&pscr;"],[0,"&qscr;"],[0,"&rscr;"],[0,"&sscr;"],[0,"&tscr;"],[0,"&uscr;"],[0,"&vscr;"],[0,"&wscr;"],[0,"&xscr;"],[0,"&yscr;"],[0,"&zscr;"],[52,"&Afr;"],[0,"&Bfr;"],[1,"&Dfr;"],[0,"&Efr;"],[0,"&Ffr;"],[0,"&Gfr;"],[2,"&Jfr;"],[0,"&Kfr;"],[0,"&Lfr;"],[0,"&Mfr;"],[0,"&Nfr;"],[0,"&Ofr;"],[0,"&Pfr;"],[0,"&Qfr;"],[1,"&Sfr;"],[0,"&Tfr;"],[0,"&Ufr;"],[0,"&Vfr;"],[0,"&Wfr;"],[0,"&Xfr;"],[0,"&Yfr;"],[1,"&afr;"],[0,"&bfr;"],[0,"&cfr;"],[0,"&dfr;"],[0,"&efr;"],[0,"&ffr;"],[0,"&gfr;"],[0,"&hfr;"],[0,"&ifr;"],[0,"&jfr;"],[0,"&kfr;"],[0,"&lfr;"],[0,"&mfr;"],[0,"&nfr;"],[0,"&ofr;"],[0,"&pfr;"],[0,"&qfr;"],[0,"&rfr;"],[0,"&sfr;"],[0,"&tfr;"],[0,"&ufr;"],[0,"&vfr;"],[0,"&wfr;"],[0,"&xfr;"],[0,"&yfr;"],[0,"&zfr;"],[0,"&Aopf;"],[0,"&Bopf;"],[1,"&Dopf;"],[0,"&Eopf;"],[0,"&Fopf;"],[0,"&Gopf;"],[1,"&Iopf;"],[0,"&Jopf;"],[0,"&Kopf;"],[0,"&Lopf;"],[0,"&Mopf;"],[1,"&Oopf;"],[3,"&Sopf;"],[0,"&Topf;"],[0,"&Uopf;"],[0,"&Vopf;"],[0,"&Wopf;"],[0,"&Xopf;"],[0,"&Yopf;"],[1,"&aopf;"],[0,"&bopf;"],[0,"&copf;"],[0,"&dopf;"],[0,"&eopf;"],[0,"&fopf;"],[0,"&gopf;"],[0,"&hopf;"],[0,"&iopf;"],[0,"&jopf;"],[0,"&kopf;"],[0,"&lopf;"],[0,"&mopf;"],[0,"&nopf;"],[0,"&oopf;"],[0,"&popf;"],[0,"&qopf;"],[0,"&ropf;"],[0,"&sopf;"],[0,"&topf;"],[0,"&uopf;"],[0,"&vopf;"],[0,"&wopf;"],[0,"&xopf;"],[0,"&yopf;"],[0,"&zopf;"]]))}],[8906,"&fflig;"],[0,"&filig;"],[0,"&fllig;"],[0,"&ffilig;"],[0,"&ffllig;"]]));var ku=new Map([[34,"&quot;"],[38,"&amp;"],[39,"&apos;"],[60,"&lt;"],[62,"&gt;"]]),yu=String.prototype.codePointAt!=null?(e,n)=>e.codePointAt(n):(e,n)=>(e.charCodeAt(n)&64512)===55296?(e.charCodeAt(n)-55296)*1024+e.charCodeAt(n+1)-56320+65536:e.charCodeAt(n);function Re(e,n){return function(u){let r,o=0,a="";for(;r=e.exec(u);)o!==r.index&&(a+=u.substring(o,r.index)),a+=n.get(r[0].charCodeAt(0)),o=r.index+1;return a+u.substring(o)}}var Qt=Re(/[&<>'"]/g,ku),en=Re(/["&\u00A0]/g,new Map([[34,"&quot;"],[38,"&amp;"],[160,"&nbsp;"]])),tn=Re(/[&<>\u00A0]/g,new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[160,"&nbsp;"]]));var nn;(function(e){e[e.XML=0]="XML",e[e.HTML=1]="HTML"})(nn||(nn={}));var un;(function(e){e[e.UTF8=0]="UTF8",e[e.ASCII=1]="ASCII",e[e.Extensive=2]="Extensive",e[e.Attribute=3]="Attribute",e[e.Text=4]="Text"})(un||(un={}));function Au(e){return Object.prototype.toString.call(e)}function _e(e){return Au(e)==="[object String]"}var wu=Object.prototype.hasOwnProperty;function Eu(e,n){return wu.call(e,n)}function Q(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){if(t){if(typeof t!="object")throw new TypeError(t+"must be object");Object.keys(t).forEach(function(u){e[u]=t[u]})}}),e}function Be(e,n,t){return[].concat(e.slice(0,n),t,e.slice(n+1))}function Ae(e){return!(e>=55296&&e<=57343||e>=64976&&e<=65007||(e&65535)===65535||(e&65535)===65534||e>=0&&e<=8||e===11||e>=14&&e<=31||e>=127&&e<=159||e>1114111)}function ee(e){if(e>65535){e-=65536;let n=55296+(e>>10),t=56320+(e&1023);return String.fromCharCode(n,t)}return String.fromCharCode(e)}var an=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,Cu=/&([a-z#][a-z0-9]{1,31});/gi,Fu=new RegExp(an.source+"|"+Cu.source,"gi"),Du=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function Su(e,n){if(n.charCodeAt(0)===35&&Du.test(n)){let u=n[1].toLowerCase()==="x"?parseInt(n.slice(2),16):parseInt(n.slice(1),10);return Ae(u)?ee(u):e}let t=K(e);return t!==e?t:e}function Tu(e){return e.indexOf("\\")<0?e:e.replace(an,"$1")}function P(e){return e.indexOf("\\")<0&&e.indexOf("&")<0?e:e.replace(Fu,function(n,t,u){return t||Su(n,u)})}var Lu=/[&<>"]/,Mu=/[&<>"]/g,Iu={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function Nu(e){return Iu[e]}function q(e){return Lu.test(e)?e.replace(Mu,Nu):e}var zu=/[.?*+^$[\]\\(){}|-]/g;function Pu(e){return e.replace(zu,"\\$&")}function _(e){switch(e){case 9:case 32:return!0}return!1}function $(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function cn(e){return Y.test(e)||xe.test(e)}function U(e){return cn(ee(e))}function j(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function V(e){return e=e.trim().replace(/\s+/g," "),"\u1E9E".toLowerCase()==="\u1E7E"&&(e=e.replace(/ẞ/g,"\xDF")),e.toLowerCase().toUpperCase()}function on(e){return e===32||e===9||e===10||e===13}function W(e){let n=0;for(;n<e.length&&on(e.charCodeAt(n));n++);let t=e.length-1;for(;t>=n&&on(e.charCodeAt(t));t--);return e.slice(n,t+1)}var qu={mdurl:me,ucmicro:Ie};var Ve={};oe(Ve,{parseLinkDestination:()=>Ue,parseLinkLabel:()=>$e,parseLinkTitle:()=>je});function $e(e,n,t){let u,r,o,a,i=e.posMax,c=e.pos;for(e.pos=n+1,u=1;e.pos<i;){if(o=e.src.charCodeAt(e.pos),o===93&&(u--,u===0)){r=!0;break}if(a=e.pos,e.md.inline.skipToken(e),o===91){if(a===e.pos-1)u++;else if(t)return e.pos=c,-1}}let s=-1;return r&&(s=e.pos),e.pos=c,s}function Ue(e,n,t){let u,r=n,o={ok:!1,pos:0,str:""};if(e.charCodeAt(r)===60){for(r++;r<t;){if(u=e.charCodeAt(r),u===10||u===60)return o;if(u===62)return o.pos=r+1,o.str=P(e.slice(n+1,r)),o.ok=!0,o;if(u===92&&r+1<t){r+=2;continue}r++}return o}let a=0;for(;r<t&&(u=e.charCodeAt(r),!(u===32||u<32||u===127));){if(u===92&&r+1<t){if(e.charCodeAt(r+1)===32)break;r+=2;continue}if(u===40&&(a++,a>32))return o;if(u===41){if(a===0)break;a--}r++}return n===r||a!==0||(o.str=P(e.slice(n,r)),o.pos=r,o.ok=!0),o}function je(e,n,t,u){let r,o=n,a={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(u)a.str=u.str,a.marker=u.marker;else{if(o>=t)return a;let i=e.charCodeAt(o);if(i!==34&&i!==39&&i!==40)return a;n++,o++,i===40&&(i=41),a.marker=i}for(;o<t;){if(r=e.charCodeAt(o),r===a.marker)return a.pos=o+1,a.str+=P(e.slice(n,o)),a.ok=!0,a;if(r===40&&a.marker===41)return a;r===92&&o+1<t&&o++,o++}return a.can_continue=!0,a.str+=P(e.slice(n,o)),a}var I={};I.code_inline=function(e,n,t,u,r){let o=e[n];return"<code"+r.renderAttrs(o)+">"+q(o.content)+"</code>"};I.code_block=function(e,n,t,u,r){let o=e[n];return"<pre"+r.renderAttrs(o)+"><code>"+q(e[n].content)+`</code></pre>
`};I.fence=function(e,n,t,u,r){let o=e[n],a=o.info?P(o.info).trim():"",i="",c="";if(a){let l=a.split(/(\s+)/g);i=l[0],c=l.slice(2).join("")}let s;if(t.highlight?s=t.highlight(o.content,i,c)||q(o.content):s=q(o.content),s.indexOf("<pre")===0)return s+`
`;if(a){let l=o.attrIndex("class"),d=o.attrs?o.attrs.slice():[];l<0?d.push(["class",t.langPrefix+i]):(d[l]=d[l].slice(),d[l][1]+=" "+t.langPrefix+i);let h={attrs:d};return`<pre><code${r.renderAttrs(h)}>${s}</code></pre>
`}return`<pre><code${r.renderAttrs(o)}>${s}</code></pre>
`};I.image=function(e,n,t,u,r){let o=e[n];return o.attrs[o.attrIndex("alt")][1]=r.renderInlineAsText(o.children,t,u),r.renderToken(e,n,t)};I.hardbreak=function(e,n,t){return t.xhtmlOut?`<br />
`:`<br>
`};I.softbreak=function(e,n,t){return t.breaks?t.xhtmlOut?`<br />
`:`<br>
`:`
`};I.text=function(e,n){return q(e[n].content)};I.html_block=function(e,n){return e[n].content};I.html_inline=function(e,n){return e[n].content};function te(){this.rules=Q({},I)}te.prototype.renderAttrs=function(n){let t,u,r;if(!n.attrs)return"";for(r="",t=0,u=n.attrs.length;t<u;t++)r+=" "+q(n.attrs[t][0])+'="'+q(n.attrs[t][1])+'"';return r};te.prototype.renderToken=function(n,t,u){let r=n[t],o="";if(r.hidden)return"";r.block&&r.nesting!==-1&&t&&n[t-1].hidden&&(o+=`
`),o+=(r.nesting===-1?"</":"<")+r.tag,o+=this.renderAttrs(r),r.nesting===0&&u.xhtmlOut&&(o+=" /");let a=!1;if(r.block&&(a=!0,r.nesting===1&&t+1<n.length)){let i=n[t+1];(i.type==="inline"||i.hidden||i.nesting===-1&&i.tag===r.tag)&&(a=!1)}return o+=a?`>
`:">",o};te.prototype.renderInline=function(e,n,t){let u="",r=this.rules;for(let o=0,a=e.length;o<a;o++){let i=e[o].type;typeof r[i]!="undefined"?u+=r[i](e,o,n,t,this):u+=this.renderToken(e,o,n)}return u};te.prototype.renderInlineAsText=function(e,n,t){let u="";for(let r=0,o=e.length;r<o;r++)switch(e[r].type){case"text":u+=e[r].content;break;case"image":u+=this.renderInlineAsText(e[r].children,n,t);break;case"html_inline":case"html_block":u+=e[r].content;break;case"softbreak":case"hardbreak":u+=`
`;break;default:}return u};te.prototype.render=function(e,n,t){let u="",r=this.rules;for(let o=0,a=e.length;o<a;o++){let i=e[o].type;i==="inline"?u+=this.renderInline(e[o].children,n,t):typeof r[i]!="undefined"?u+=r[i](e,o,n,t,this):u+=this.renderToken(e,o,n,t)}return u};var sn=te;function M(){this.__rules__=[],this.__cache__=null}M.prototype.__find__=function(e){for(let n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===e)return n;return-1};M.prototype.__compile__=function(){let e=this,n=[""];e.__rules__.forEach(function(t){t.enabled&&t.alt.forEach(function(u){n.indexOf(u)<0&&n.push(u)})}),e.__cache__={},n.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(u){u.enabled&&(t&&u.alt.indexOf(t)<0||e.__cache__[t].push(u.fn))})})};M.prototype.at=function(e,n,t){let u=this.__find__(e),r=t||{};if(u===-1)throw new Error("Parser rule not found: "+e);this.__rules__[u].fn=n,this.__rules__[u].alt=r.alt||[],this.__cache__=null};M.prototype.before=function(e,n,t,u){let r=this.__find__(e),o=u||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r,0,{name:n,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null};M.prototype.after=function(e,n,t,u){let r=this.__find__(e),o=u||{};if(r===-1)throw new Error("Parser rule not found: "+e);this.__rules__.splice(r+1,0,{name:n,enabled:!0,fn:t,alt:o.alt||[]}),this.__cache__=null};M.prototype.push=function(e,n,t){let u=t||{};this.__rules__.push({name:e,enabled:!0,fn:n,alt:u.alt||[]}),this.__cache__=null};M.prototype.enable=function(e,n){Array.isArray(e)||(e=[e]);let t=[];return e.forEach(function(u){let r=this.__find__(u);if(r<0){if(n)return;throw new Error("Rules manager: invalid rule name "+u)}this.__rules__[r].enabled=!0,t.push(u)},this),this.__cache__=null,t};M.prototype.enableOnly=function(e,n){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(t){t.enabled=!1}),this.enable(e,n)};M.prototype.disable=function(e,n){Array.isArray(e)||(e=[e]);let t=[];return e.forEach(function(u){let r=this.__find__(u);if(r<0){if(n)return;throw new Error("Rules manager: invalid rule name "+u)}this.__rules__[r].enabled=!1,t.push(u)},this),this.__cache__=null,t};M.prototype.getRules=function(e){return this.__cache__===null&&this.__compile__(),this.__cache__[e]||[]};var Z=M;function ne(e,n,t){this.type=e,this.tag=n,this.attrs=null,this.map=null,this.nesting=t,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}ne.prototype.attrIndex=function(n){if(!this.attrs)return-1;let t=this.attrs;for(let u=0,r=t.length;u<r;u++)if(t[u][0]===n)return u;return-1};ne.prototype.attrPush=function(n){this.attrs?this.attrs.push(n):this.attrs=[n]};ne.prototype.attrSet=function(n,t){let u=this.attrIndex(n),r=[n,t];u<0?this.attrPush(r):this.attrs[u]=r};ne.prototype.attrGet=function(n){let t=this.attrIndex(n),u=null;return t>=0&&(u=this.attrs[t][1]),u};ne.prototype.attrJoin=function(n,t){let u=this.attrIndex(n);u<0?this.attrPush([n,t]):this.attrs[u][1]=this.attrs[u][1]+" "+t};var R=ne;function ln(e,n,t){this.src=e,this.env=t,this.tokens=[],this.inlineMode=!1,this.md=n}ln.prototype.Token=R;var dn=ln;var Ru=/\r\n?|\n/g,Hu=/\0/g;function We(e){let n;n=e.src.replace(Ru,`
`),n=n.replace(Hu,"\uFFFD"),e.src=n}function Ze(e){let n;e.inlineMode?(n=new e.Token("inline","",0),n.content=e.src,n.map=[0,1],n.children=[],e.tokens.push(n)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}function Ge(e){let n=e.tokens;for(let t=0,u=n.length;t<u;t++){let r=n[t];r.type==="inline"&&e.md.inline.parse(r.content,e.md,e.env,r.children)}}function Bu(e){return/^<a[>\s]/i.test(e)}function Ou(e){return/^<\/a\s*>/i.test(e)}function Xe(e){let n=e.tokens;if(e.md.options.linkify)for(let t=0,u=n.length;t<u;t++){if(n[t].type!=="inline"||!e.md.linkify.pretest(n[t].content))continue;let r=n[t].children,o=0;for(let a=r.length-1;a>=0;a--){let i=r[a];if(i.type==="link_close"){for(a--;r[a].level!==i.level&&r[a].type!=="link_open";)a--;continue}if(i.type==="html_inline"&&(Bu(i.content)&&o>0&&o--,Ou(i.content)&&o++),!(o>0)&&i.type==="text"&&e.md.linkify.test(i.content)){let c=i.content,s=e.md.linkify.match(c),l=[],d=i.level,h=0;s.length>0&&s[0].index===0&&a>0&&r[a-1].type==="text_special"&&(s=s.slice(1));for(let p=0;p<s.length;p++){let f=s[p].url,x=e.md.normalizeLink(f);if(!e.md.validateLink(x))continue;let y=s[p].text;s[p].schema?s[p].schema==="mailto:"&&!/^mailto:/i.test(y)?y=e.md.normalizeLinkText("mailto:"+y).replace(/^mailto:/,""):y=e.md.normalizeLinkText(y):y=e.md.normalizeLinkText("http://"+y).replace(/^http:\/\//,"");let w=s[p].index;if(w>h){let v=new e.Token("text","",0);v.content=c.slice(h,w),v.level=d,l.push(v)}let b=new e.Token("link_open","a",1);b.attrs=[["href",x]],b.level=d++,b.markup="linkify",b.info="auto",l.push(b);let g=new e.Token("text","",0);g.content=y,g.level=d,l.push(g);let k=new e.Token("link_close","a",-1);k.level=--d,k.markup="linkify",k.info="auto",l.push(k),h=s[p].lastIndex}if(h<c.length){let p=new e.Token("text","",0);p.content=c.slice(h),p.level=d,l.push(p)}n[t].children=r=Be(r,a,l)}}}}var fn=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,$u=/\((c|tm|r)\)/i,Uu=/\((c|tm|r)\)/ig,ju={c:"\xA9",r:"\xAE",tm:"\u2122"};function Vu(e,n){return ju[n.toLowerCase()]}function Wu(e){let n=0;for(let t=e.length-1;t>=0;t--){let u=e[t];u.type==="text"&&!n&&(u.content=u.content.replace(Uu,Vu)),u.type==="link_open"&&u.info==="auto"&&n--,u.type==="link_close"&&u.info==="auto"&&n++}}function Zu(e){let n=0;for(let t=e.length-1;t>=0;t--){let u=e[t];u.type==="text"&&!n&&fn.test(u.content)&&(u.content=u.content.replace(/\+-/g,"\xB1").replace(/\.{2,}/g,"\u2026").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1\u2014").replace(/(^|\s)--(?=\s|$)/mg,"$1\u2013").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1\u2013")),u.type==="link_open"&&u.info==="auto"&&n--,u.type==="link_close"&&u.info==="auto"&&n++}}function Je(e){let n;if(e.md.options.typographer)for(n=e.tokens.length-1;n>=0;n--)e.tokens[n].type==="inline"&&($u.test(e.tokens[n].content)&&Wu(e.tokens[n].children),fn.test(e.tokens[n].content)&&Zu(e.tokens[n].children))}var Gu=/['"]/,pn=/['"]/g,hn="\u2019";function we(e,n,t,u){e[n]||(e[n]=[]),e[n].push({pos:t,ch:u})}function Xu(e,n){let t="",u=0;n.sort((r,o)=>r.pos-o.pos);for(let r=0;r<n.length;r++){let o=n[r];t+=e.slice(u,o.pos)+o.ch,u=o.pos+1}return t+e.slice(u)}function Ju(e,n){let t,u=[],r={};for(let o=0;o<e.length;o++){let a=e[o],i=e[o].level;for(t=u.length-1;t>=0&&!(u[t].level<=i);t--);if(u.length=t+1,a.type!=="text")continue;let c=a.content,s=0,l=c.length;e:for(;s<l;){pn.lastIndex=s;let d=pn.exec(c);if(!d)break;let h=!0,p=!0;s=d.index+1;let f=d[0]==="'",x=32;if(d.index-1>=0)x=c.charCodeAt(d.index-1);else for(t=o-1;t>=0&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t--)if(e[t].content){x=e[t].content.charCodeAt(e[t].content.length-1);break}let y=32;if(s<l)y=c.charCodeAt(s);else for(t=o+1;t<e.length&&!(e[t].type==="softbreak"||e[t].type==="hardbreak");t++)if(e[t].content){y=e[t].content.charCodeAt(0);break}let w=j(x)||U(x),b=j(y)||U(y),g=$(x),k=$(y);if(k?h=!1:b&&(g||w||(h=!1)),g?p=!1:w&&(k||b||(p=!1)),y===34&&d[0]==='"'&&x>=48&&x<=57&&(p=h=!1),h&&p&&(h=w,p=b),!h&&!p){f&&we(r,o,d.index,hn);continue}if(p)for(t=u.length-1;t>=0;t--){let v=u[t];if(u[t].level<i)break;if(v.single===f&&u[t].level===i){v=u[t];let A,E;f?(A=n.md.options.quotes[2],E=n.md.options.quotes[3]):(A=n.md.options.quotes[0],E=n.md.options.quotes[1]),we(r,o,d.index,E),we(r,v.token,v.pos,A),u.length=t;continue e}}h?u.push({token:o,pos:d.index,single:f,level:i}):p&&f&&we(r,o,d.index,hn)}}Object.keys(r).forEach(function(o){e[o].content=Xu(e[o].content,r[o])})}function Ye(e){if(e.md.options.typographer)for(let n=e.tokens.length-1;n>=0;n--)e.tokens[n].type!=="inline"||!Gu.test(e.tokens[n].content)||Ju(e.tokens[n].children,e)}function Ke(e){let n,t,u=e.tokens,r=u.length;for(let o=0;o<r;o++){if(u[o].type!=="inline")continue;let a=u[o].children,i=a.length;for(n=0;n<i;n++)a[n].type==="text_special"&&(a[n].type="text");for(n=t=0;n<i;n++)a[n].type==="text"&&n+1<i&&a[n+1].type==="text"?a[n+1].content=a[n].content+a[n+1].content:(n!==t&&(a[t]=a[n]),t++);n!==t&&(a.length=t)}}var Qe=[["normalize",We],["block",Ze],["inline",Ge],["linkify",Xe],["replacements",Je],["smartquotes",Ye],["text_join",Ke]];function et(){this.ruler=new Z;for(let e=0;e<Qe.length;e++)this.ruler.push(Qe[e][0],Qe[e][1])}et.prototype.process=function(e){let n=this.ruler.getRules("");for(let t=0,u=n.length;t<u;t++)n[t](e)};et.prototype.State=dn;var mn=et;function N(e,n,t,u){this.src=e,this.md=n,this.env=t,this.tokens=u,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;let r=this.src;for(let o=0,a=0,i=0,c=0,s=r.length,l=!1;a<s;a++){let d=r.charCodeAt(a);if(!l)if(_(d)){i++,d===9?c+=4-c%4:c++;continue}else l=!0;(d===10||a===s-1)&&(d!==10&&a++,this.bMarks.push(o),this.eMarks.push(a),this.tShift.push(i),this.sCount.push(c),this.bsCount.push(0),l=!1,i=0,c=0,o=a+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}N.prototype.push=function(e,n,t){let u=new R(e,n,t);return u.block=!0,t<0&&this.level--,u.level=this.level,t>0&&this.level++,this.tokens.push(u),u};N.prototype.isEmpty=function(n){return this.bMarks[n]+this.tShift[n]>=this.eMarks[n]};N.prototype.skipEmptyLines=function(n){for(let t=this.lineMax;n<t&&!(this.bMarks[n]+this.tShift[n]<this.eMarks[n]);n++);return n};N.prototype.skipSpaces=function(n){for(let t=this.src.length;n<t;n++){let u=this.src.charCodeAt(n);if(!_(u))break}return n};N.prototype.skipSpacesBack=function(n,t){if(n<=t)return n;for(;n>t;)if(!_(this.src.charCodeAt(--n)))return n+1;return n};N.prototype.skipChars=function(n,t){for(let u=this.src.length;n<u&&this.src.charCodeAt(n)===t;n++);return n};N.prototype.skipCharsBack=function(n,t,u){if(n<=u)return n;for(;n>u;)if(t!==this.src.charCodeAt(--n))return n+1;return n};N.prototype.getLines=function(n,t,u,r){if(n>=t)return"";let o=new Array(t-n);for(let a=0,i=n;i<t;i++,a++){let c=0,s=this.bMarks[i],l=s,d;for(i+1<t||r?d=this.eMarks[i]+1:d=this.eMarks[i];l<d&&c<u;){let h=this.src.charCodeAt(l);if(_(h))h===9?c+=4-(c+this.bsCount[i])%4:c++;else if(l-s<this.tShift[i])c++;else break;l++}c>u?o[a]=new Array(c-u+1).join(" ")+this.src.slice(l,d):o[a]=this.src.slice(l,d)}return o.join("")};N.prototype.Token=R;var bn=N;var Yu=65536;function tt(e,n){let t=e.bMarks[n]+e.tShift[n],u=e.eMarks[n];return e.src.slice(t,u)}function gn(e){let n=[],t=e.length,u=0,r=e.charCodeAt(u),o=!1,a=0,i="";for(;u<t;)r===124&&(o?(i+=e.substring(a,u-1),a=u):(n.push(i+e.substring(a,u)),i="",a=u+1)),o=r===92,u++,r=e.charCodeAt(u);return n.push(i+e.substring(a)),n}function nt(e,n,t,u){if(n+2>t)return!1;let r=n+1;if(e.sCount[r]<e.blkIndent||e.sCount[r]-e.blkIndent>=4)return!1;let o=e.bMarks[r]+e.tShift[r];if(o>=e.eMarks[r])return!1;let a=e.src.charCodeAt(o++);if(a!==124&&a!==45&&a!==58||o>=e.eMarks[r])return!1;let i=e.src.charCodeAt(o++);if(i!==124&&i!==45&&i!==58&&!_(i)||a===45&&_(i))return!1;for(;o<e.eMarks[r];){let k=e.src.charCodeAt(o);if(k!==124&&k!==45&&k!==58&&!_(k))return!1;o++}let c=tt(e,n+1),s=c.split("|"),l=[];for(let k=0;k<s.length;k++){let v=s[k].trim();if(!v){if(k===0||k===s.length-1)continue;return!1}if(!/^:?-+:?$/.test(v))return!1;v.charCodeAt(v.length-1)===58?l.push(v.charCodeAt(0)===58?"center":"right"):v.charCodeAt(0)===58?l.push("left"):l.push("")}if(c=tt(e,n).trim(),c.indexOf("|")===-1||e.sCount[n]-e.blkIndent>=4)return!1;s=gn(c),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop();let d=s.length;if(d===0||d!==l.length)return!1;if(u)return!0;let h=e.parentType;e.parentType="table";let p=e.md.block.ruler.getRules("blockquote"),f=e.push("table_open","table",1),x=[n,0];f.map=x;let y=e.push("thead_open","thead",1);y.map=[n,n+1];let w=e.push("tr_open","tr",1);w.map=[n,n+1];for(let k=0;k<s.length;k++){let v=e.push("th_open","th",1);l[k]&&(v.attrs=[["style","text-align:"+l[k]]]);let A=e.push("inline","",0);A.content=s[k].trim(),A.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let b,g=0;for(r=n+2;r<t&&!(e.sCount[r]<e.blkIndent);r++){let k=!1;for(let A=0,E=p.length;A<E;A++)if(p[A](e,r,t,!0)){k=!0;break}if(k||(c=tt(e,r).trim(),!c)||e.sCount[r]-e.blkIndent>=4||(s=gn(c),s.length&&s[0]===""&&s.shift(),s.length&&s[s.length-1]===""&&s.pop(),g+=d-s.length,g>Yu))break;if(r===n+2){let A=e.push("tbody_open","tbody",1);A.map=b=[n+2,0]}let v=e.push("tr_open","tr",1);v.map=[r,r+1];for(let A=0;A<d;A++){let E=e.push("td_open","td",1);l[A]&&(E.attrs=[["style","text-align:"+l[A]]]);let T=e.push("inline","",0);T.content=s[A]?s[A].trim():"",T.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return b&&(e.push("tbody_close","tbody",-1),b[1]=r),e.push("table_close","table",-1),x[1]=r,e.parentType=h,e.line=r,!0}function ut(e,n,t){if(e.sCount[n]-e.blkIndent<4)return!1;let u=n+1,r=u;for(;u<t;){if(e.isEmpty(u)){u++;continue}if(e.sCount[u]-e.blkIndent>=4){u++,r=u;continue}break}e.line=r;let o=e.push("code_block","code",0);return o.content=e.getLines(n,r,4+e.blkIndent,!1)+`
`,o.map=[n,e.line],!0}function rt(e,n,t,u){let r=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||r+3>o)return!1;let a=e.src.charCodeAt(r);if(a!==126&&a!==96)return!1;let i=r;r=e.skipChars(r,a);let c=r-i;if(c<3)return!1;let s=e.src.slice(i,r),l=e.src.slice(r,o);if(a===96&&l.indexOf(String.fromCharCode(a))>=0)return!1;if(u)return!0;let d=n,h=!1;for(;d++,!(d>=t||(r=i=e.bMarks[d]+e.tShift[d],o=e.eMarks[d],r<o&&e.sCount[d]<e.blkIndent));)if(e.src.charCodeAt(r)===a&&!(e.sCount[d]-e.blkIndent>=4)&&(r=e.skipChars(r,a),!(r-i<c)&&(r=e.skipSpaces(r),!(r<o)))){h=!0;break}c=e.sCount[n],e.line=d+(h?1:0);let p=e.push("fence","code",0);return p.info=l,p.content=e.getLines(n+1,d,c,!0),p.markup=s,p.map=[n,e.line],!0}function ot(e,n,t,u){let r=e.bMarks[n]+e.tShift[n],o=e.eMarks[n],a=e.lineMax;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(r)!==62)return!1;if(u)return!0;let i=[],c=[],s=[],l=[],d=e.md.block.ruler.getRules("blockquote"),h=e.parentType;e.parentType="blockquote";let p=!1,f;for(f=n;f<t;f++){let g=e.sCount[f]<e.blkIndent;if(r=e.bMarks[f]+e.tShift[f],o=e.eMarks[f],r>=o)break;if(e.src.charCodeAt(r++)===62&&!g){let v=e.sCount[f]+1,A,E;e.src.charCodeAt(r)===32?(r++,v++,E=!1,A=!0):e.src.charCodeAt(r)===9?(A=!0,(e.bsCount[f]+v)%4===3?(r++,v++,E=!1):E=!0):A=!1;let T=v;for(i.push(e.bMarks[f]),e.bMarks[f]=r;r<o;){let H=e.src.charCodeAt(r);if(_(H))H===9?T+=4-(T+e.bsCount[f]+(E?1:0))%4:T++;else break;r++}p=r>=o,c.push(e.bsCount[f]),e.bsCount[f]=e.sCount[f]+1+(A?1:0),s.push(e.sCount[f]),e.sCount[f]=T-v,l.push(e.tShift[f]),e.tShift[f]=r-e.bMarks[f];continue}if(p)break;let k=!1;for(let v=0,A=d.length;v<A;v++)if(d[v](e,f,t,!0)){k=!0;break}if(k){e.lineMax=f,e.blkIndent!==0&&(i.push(e.bMarks[f]),c.push(e.bsCount[f]),l.push(e.tShift[f]),s.push(e.sCount[f]),e.sCount[f]-=e.blkIndent);break}i.push(e.bMarks[f]),c.push(e.bsCount[f]),l.push(e.tShift[f]),s.push(e.sCount[f]),e.sCount[f]=-1}let x=e.blkIndent;e.blkIndent=0;let y=e.push("blockquote_open","blockquote",1);y.markup=">";let w=[n,0];y.map=w,e.md.block.tokenize(e,n,f);let b=e.push("blockquote_close","blockquote",-1);b.markup=">",e.lineMax=a,e.parentType=h,w[1]=e.line;for(let g=0;g<l.length;g++)e.bMarks[g+n]=i[g],e.tShift[g+n]=l[g],e.sCount[g+n]=s[g],e.bsCount[g+n]=c[g];return e.blkIndent=x,!0}function at(e,n,t,u){let r=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let o=e.bMarks[n]+e.tShift[n],a=e.src.charCodeAt(o++);if(a!==42&&a!==45&&a!==95)return!1;let i=1;for(;o<r;){let s=e.src.charCodeAt(o++);if(s!==a&&!_(s))return!1;s===a&&i++}if(i<3)return!1;if(u)return!0;e.line=n+1;let c=e.push("hr","hr",0);return c.map=[n,e.line],c.markup=Array(i+1).join(String.fromCharCode(a)),!0}function xn(e,n){let t=e.eMarks[n],u=e.bMarks[n]+e.tShift[n],r=e.src.charCodeAt(u++);if(r!==42&&r!==45&&r!==43)return-1;if(u<t){let o=e.src.charCodeAt(u);if(!_(o))return-1}return u}function kn(e,n){let t=e.bMarks[n]+e.tShift[n],u=e.eMarks[n],r=t;if(r+1>=u)return-1;let o=e.src.charCodeAt(r++);if(o<48||o>57)return-1;for(;;){if(r>=u)return-1;if(o=e.src.charCodeAt(r++),o>=48&&o<=57){if(r-t>=10)return-1;continue}if(o===41||o===46)break;return-1}return r<u&&(o=e.src.charCodeAt(r),!_(o))?-1:r}function Ku(e,n){let t=e.level+2;for(let u=n+2,r=e.tokens.length-2;u<r;u++)e.tokens[u].level===t&&e.tokens[u].type==="paragraph_open"&&(e.tokens[u+2].hidden=!0,e.tokens[u].hidden=!0,u+=2)}function it(e,n,t,u){let r,o,a,i,c=n,s=!0;if(e.sCount[c]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[c]-e.listIndent>=4&&e.sCount[c]<e.blkIndent)return!1;let l=!1;u&&e.parentType==="paragraph"&&e.sCount[c]>=e.blkIndent&&(l=!0);let d,h,p;if((p=kn(e,c))>=0){if(d=!0,a=e.bMarks[c]+e.tShift[c],h=Number(e.src.slice(a,p-1)),l&&h!==1)return!1}else if((p=xn(e,c))>=0)d=!1;else return!1;if(l&&e.skipSpaces(p)>=e.eMarks[c])return!1;if(u)return!0;let f=e.src.charCodeAt(p-1),x=e.tokens.length;d?(i=e.push("ordered_list_open","ol",1),h!==1&&(i.attrs=[["start",h]])):i=e.push("bullet_list_open","ul",1);let y=[c,0];i.map=y,i.markup=String.fromCharCode(f);let w=!1,b=e.md.block.ruler.getRules("list"),g=e.parentType;for(e.parentType="list";c<t;){o=p,r=e.eMarks[c];let k=e.sCount[c]+p-(e.bMarks[c]+e.tShift[c]),v=k;for(;o<r;){let X=e.src.charCodeAt(o);if(X===9)v+=4-(v+e.bsCount[c])%4;else if(X===32)v++;else break;o++}let A=o,E;A>=r?E=1:E=v-k,E>4&&(E=1);let T=k+E;i=e.push("list_item_open","li",1),i.markup=String.fromCharCode(f);let H=[c,0];i.map=H,d&&(i.info=e.src.slice(a,p-1));let re=e.tight,Le=e.tShift[c],Zn=e.sCount[c],Gn=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=T,e.tight=!0,e.tShift[c]=A-e.bMarks[c],e.sCount[c]=v,A>=r&&e.isEmpty(c+1)?e.line=Math.min(e.line+2,t):e.md.block.tokenize(e,c,t,!0),(!e.tight||w)&&(s=!1),w=e.line-c>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=Gn,e.tShift[c]=Le,e.sCount[c]=Zn,e.tight=re,i=e.push("list_item_close","li",-1),i.markup=String.fromCharCode(f),c=e.line,H[1]=c,c>=t||e.sCount[c]<e.blkIndent||e.sCount[c]-e.blkIndent>=4)break;let Bt=!1;for(let X=0,Xn=b.length;X<Xn;X++)if(b[X](e,c,t,!0)){Bt=!0;break}if(Bt)break;if(d){if(p=kn(e,c),p<0)break;a=e.bMarks[c]+e.tShift[c]}else if(p=xn(e,c),p<0)break;if(f!==e.src.charCodeAt(p-1))break}return d?i=e.push("ordered_list_close","ol",-1):i=e.push("bullet_list_close","ul",-1),i.markup=String.fromCharCode(f),y[1]=c,e.line=c,e.parentType=g,s&&Ku(e,x),!0}function ct(e,n,t,u){let r=e.bMarks[n]+e.tShift[n],o=e.eMarks[n],a=n+1;if(e.sCount[n]-e.blkIndent>=4||e.src.charCodeAt(r)!==91)return!1;function i(b){let g=e.lineMax;if(b>=g||e.isEmpty(b))return null;let k=!1;if(e.sCount[b]-e.blkIndent>3&&(k=!0),e.sCount[b]<0&&(k=!0),!k){let E=e.md.block.ruler.getRules("reference"),T=e.parentType;e.parentType="reference";let H=!1;for(let re=0,Le=E.length;re<Le;re++)if(E[re](e,b,g,!0)){H=!0;break}if(e.parentType=T,H)return null}let v=e.bMarks[b]+e.tShift[b],A=e.eMarks[b];return e.src.slice(v,A+1)}let c=e.src.slice(r,o+1);o=c.length;let s=-1;for(r=1;r<o;r++){let b=c.charCodeAt(r);if(b===91)return!1;if(b===93){s=r;break}else if(b===10){let g=i(a);g!==null&&(c+=g,o=c.length,a++)}else if(b===92&&(r++,r<o&&c.charCodeAt(r)===10)){let g=i(a);g!==null&&(c+=g,o=c.length,a++)}}if(s<0||c.charCodeAt(s+1)!==58)return!1;for(r=s+2;r<o;r++){let b=c.charCodeAt(r);if(b===10){let g=i(a);g!==null&&(c+=g,o=c.length,a++)}else if(!_(b))break}let l=e.md.helpers.parseLinkDestination(c,r,o);if(!l.ok)return!1;let d=e.md.normalizeLink(l.str);if(!e.md.validateLink(d))return!1;r=l.pos;let h=r,p=a,f=r;for(;r<o;r++){let b=c.charCodeAt(r);if(b===10){let g=i(a);g!==null&&(c+=g,o=c.length,a++)}else if(!_(b))break}let x=e.md.helpers.parseLinkTitle(c,r,o);for(;x.can_continue;){let b=i(a);if(b===null)break;c+=b,r=o,o=c.length,a++,x=e.md.helpers.parseLinkTitle(c,r,o,x)}let y;for(r<o&&f!==r&&x.ok?(y=x.str,r=x.pos):(y="",r=h,a=p);r<o;){let b=c.charCodeAt(r);if(!_(b))break;r++}if(r<o&&c.charCodeAt(r)!==10&&y)for(y="",r=h,a=p;r<o;){let b=c.charCodeAt(r);if(!_(b))break;r++}if(r<o&&c.charCodeAt(r)!==10)return!1;let w=V(c.slice(1,s));return w?(u||(typeof e.env.references=="undefined"&&(e.env.references={}),typeof e.env.references[w]=="undefined"&&(e.env.references[w]={title:y,href:d}),e.line=a),!0):!1}var yn=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"];var Qu="[a-zA-Z_:][a-zA-Z0-9:._-]*",er="[^\"'=<>`\\x00-\\x20]+",tr="'[^']*'",nr='"[^"]*"',ur="(?:"+er+"|"+tr+"|"+nr+")",rr="(?:\\s+"+Qu+"(?:\\s*=\\s*"+ur+")?)",vn="<[A-Za-z][A-Za-z0-9\\-]*"+rr+"*\\s*\\/?>",_n="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",or="<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->",ar="<[?][\\s\\S]*?[?]>",ir="<![A-Za-z][^>]*>",cr="<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",An=new RegExp("^(?:"+vn+"|"+_n+"|"+or+"|"+ar+"|"+ir+"|"+cr+")"),wn=new RegExp("^(?:"+vn+"|"+_n+")");var G=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+yn.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(wn.source+"\\s*$"),/^$/,!1]];function st(e,n,t,u){let r=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4||!e.md.options.html||e.src.charCodeAt(r)!==60)return!1;let a=e.src.slice(r,o),i=0;for(;i<G.length&&!G[i][0].test(a);i++);if(i===G.length)return!1;if(u)return G[i][2];let c=n+1,s=G[i][1].test("");if(!G[i][1].test(a)){for(;c<t&&!(e.sCount[c]<e.blkIndent&&(s||!e.isEmpty(c)));c++)if(r=e.bMarks[c]+e.tShift[c],o=e.eMarks[c],a=e.src.slice(r,o),G[i][1].test(a)){a.length!==0&&c++;break}}e.line=c;let l=e.push("html_block","",0);return l.map=[n,c],l.content=e.getLines(n,c,e.blkIndent,!0),!0}function lt(e,n,t,u){let r=e.bMarks[n]+e.tShift[n],o=e.eMarks[n];if(e.sCount[n]-e.blkIndent>=4)return!1;let a=e.src.charCodeAt(r);if(a!==35||r>=o)return!1;let i=1;for(a=e.src.charCodeAt(++r);a===35&&r<o&&i<=6;)i++,a=e.src.charCodeAt(++r);if(i>6||r<o&&!_(a))return!1;if(u)return!0;o=e.skipSpacesBack(o,r);let c=e.skipCharsBack(o,35,r);c>r&&_(e.src.charCodeAt(c-1))&&(o=c),e.line=n+1;let s=e.push("heading_open","h"+String(i),1);s.markup="########".slice(0,i),s.map=[n,e.line];let l=e.push("inline","",0);l.content=W(e.src.slice(r,o)),l.map=[n,e.line],l.children=[];let d=e.push("heading_close","h"+String(i),-1);return d.markup="########".slice(0,i),!0}function dt(e,n,t){let u=e.md.block.ruler.getRules("paragraph");if(e.sCount[n]-e.blkIndent>=4)return!1;let r=e.parentType;e.parentType="paragraph";let o=0,a,i=n+1;for(;i<t&&!e.isEmpty(i);i++){if(e.sCount[i]-e.blkIndent>3)continue;if(e.sCount[i]>=e.blkIndent){let p=e.bMarks[i]+e.tShift[i],f=e.eMarks[i];if(p<f&&(a=e.src.charCodeAt(p),(a===45||a===61)&&(p=e.skipChars(p,a),p=e.skipSpaces(p),p>=f))){o=a===61?1:2;break}}if(e.sCount[i]<0)continue;let h=!1;for(let p=0,f=u.length;p<f;p++)if(u[p](e,i,t,!0)){h=!0;break}if(h)break}if(!o)return e.parentType=r,!1;let c=W(e.getLines(n,i,e.blkIndent,!1));e.line=i+1;let s=e.push("heading_open","h"+String(o),1);s.markup=String.fromCharCode(a),s.map=[n,e.line];let l=e.push("inline","",0);l.content=c,l.map=[n,e.line-1],l.children=[];let d=e.push("heading_close","h"+String(o),-1);return d.markup=String.fromCharCode(a),e.parentType=r,!0}function ft(e,n,t){let u=e.md.block.ruler.getRules("paragraph"),r=e.parentType,o=n+1;for(e.parentType="paragraph";o<t&&!e.isEmpty(o);o++){if(e.sCount[o]-e.blkIndent>3||e.sCount[o]<0)continue;let s=!1;for(let l=0,d=u.length;l<d;l++)if(u[l](e,o,t,!0)){s=!0;break}if(s)break}let a=W(e.getLines(n,o,e.blkIndent,!1));e.line=o;let i=e.push("paragraph_open","p",1);i.map=[n,e.line];let c=e.push("inline","",0);return c.content=a,c.map=[n,e.line],c.children=[],e.push("paragraph_close","p",-1),e.parentType=r,!0}var Ee=[["table",nt,["paragraph","reference"]],["code",ut],["fence",rt,["paragraph","reference","blockquote","list"]],["blockquote",ot,["paragraph","reference","blockquote","list"]],["hr",at,["paragraph","reference","blockquote","list"]],["list",it,["paragraph","reference","blockquote"]],["reference",ct],["html_block",st,["paragraph","reference","blockquote"]],["heading",lt,["paragraph","reference","blockquote"]],["lheading",dt],["paragraph",ft]];function Ce(){this.ruler=new Z;for(let e=0;e<Ee.length;e++)this.ruler.push(Ee[e][0],Ee[e][1],{alt:(Ee[e][2]||[]).slice()})}Ce.prototype.tokenize=function(e,n,t){let u=this.ruler.getRules(""),r=u.length,o=e.md.options.maxNesting,a=n,i=!1;for(;a<t&&(e.line=a=e.skipEmptyLines(a),!(a>=t||e.sCount[a]<e.blkIndent));){if(e.level>=o){e.line=t;break}let c=e.line,s=!1;for(let l=0;l<r;l++)if(s=u[l](e,a,t,!1),s){if(c>=e.line)throw new Error("block rule didn't increment state.line");break}if(!s)throw new Error("none of the block rules matched");e.tight=!i,e.isEmpty(e.line-1)&&(i=!0),a=e.line,a<t&&e.isEmpty(a)&&(i=!0,a++,e.line=a)}};Ce.prototype.parse=function(e,n,t,u){if(!e)return;let r=new this.State(e,n,t,u);this.tokenize(r,r.line,r.lineMax)};Ce.prototype.State=bn;var En=Ce;function se(e,n,t,u){this.src=e,this.env=t,this.md=n,this.tokens=u,this.tokens_meta=Array(u.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}se.prototype.pushPending=function(){let e=new R("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e};se.prototype.push=function(e,n,t){this.pending&&this.pushPending();let u=new R(e,n,t),r=null;return t<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),u.level=this.level,t>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(u),this.tokens_meta.push(r),u};se.prototype.scanDelims=function(e,n){let t=this.posMax,u=this.src.charCodeAt(e),r;if(e===0)r=32;else if(e===1)r=this.src.charCodeAt(0),(r&63488)===55296&&(r=65533);else if(r=this.src.charCodeAt(e-1),(r&64512)===56320){let y=this.src.charCodeAt(e-2);r=(y&64512)===55296?65536+(y-55296<<10)+(r-56320):65533}else(r&64512)===55296&&(r=65533);let o=e;for(;o<t&&this.src.charCodeAt(o)===u;)o++;let a=o-e,i=o<t?this.src.charCodeAt(o):32;if((i&64512)===55296){let y=this.src.charCodeAt(o+1);i=(y&64512)===56320?65536+(i-55296<<10)+(y-56320):65533}else(i&64512)===56320&&(i=65533);let c=j(r)||U(r),s=j(i)||U(i),l=$(r),d=$(i),h=!d&&(!s||l||c),p=!l&&(!c||d||s);return{can_open:h&&(n||!p||c),can_close:p&&(n||!h||s),length:a}};se.prototype.Token=R;var Cn=se;function sr(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}function pt(e,n){let t=e.pos;for(;t<e.posMax&&!sr(e.src.charCodeAt(t));)t++;return t===e.pos?!1:(n||(e.pending+=e.src.slice(e.pos,t)),e.pos=t,!0)}var lr=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;function ht(e,n){if(!e.md.options.linkify||e.linkLevel>0)return!1;let t=e.pos,u=e.posMax;if(t+3>u||e.src.charCodeAt(t)!==58||e.src.charCodeAt(t+1)!==47||e.src.charCodeAt(t+2)!==47)return!1;let r=e.pending.match(lr);if(!r)return!1;let o=r[1],a=e.md.linkify.matchAtStart(e.src.slice(t-o.length));if(!a)return!1;let i=a.url;if(i.length<=o.length)return!1;let c=i.length;for(;c>0&&i.charCodeAt(c-1)===42;)c--;c!==i.length&&(i=i.slice(0,c));let s=e.md.normalizeLink(i);if(!e.md.validateLink(s))return!1;if(!n){e.pending=e.pending.slice(0,-o.length);let l=e.push("link_open","a",1);l.attrs=[["href",s]],l.markup="linkify",l.info="auto";let d=e.push("text","",0);d.content=e.md.normalizeLinkText(i);let h=e.push("link_close","a",-1);h.markup="linkify",h.info="auto"}return e.pos+=i.length-o.length,!0}function mt(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==10)return!1;let u=e.pending.length-1,r=e.posMax;if(!n)if(u>=0&&e.pending.charCodeAt(u)===32)if(u>=1&&e.pending.charCodeAt(u-1)===32){let o=u-1;for(;o>=1&&e.pending.charCodeAt(o-1)===32;)o--;e.pending=e.pending.slice(0,o),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(t++;t<r&&_(e.src.charCodeAt(t));)t++;return e.pos=t,!0}var bt=[];for(let e=0;e<256;e++)bt.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){bt[e.charCodeAt(0)]=1});function gt(e,n){let t=e.pos,u=e.posMax;if(e.src.charCodeAt(t)!==92||(t++,t>=u))return!1;let r=e.src.charCodeAt(t);if(r===10){for(n||e.push("hardbreak","br",0),t++;t<u&&(r=e.src.charCodeAt(t),!!_(r));)t++;return e.pos=t,!0}let o=e.src[t];if(r>=55296&&r<=56319&&t+1<u){let i=e.src.charCodeAt(t+1);i>=56320&&i<=57343&&(o+=e.src[t+1],t++)}let a="\\"+o;if(!n){let i=e.push("text_special","",0);r<256&&bt[r]!==0?i.content=o:i.content=a,i.markup=a,i.info="escape"}return e.pos=t+1,!0}function xt(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==96)return!1;let r=t;t++;let o=e.posMax;for(;t<o&&e.src.charCodeAt(t)===96;)t++;let a=e.src.slice(r,t),i=a.length;if(e.backticksScanned&&(e.backticks[i]||0)<=r)return n||(e.pending+=a),e.pos+=i,!0;let c=t,s;for(;(s=e.src.indexOf("`",c))!==-1;){for(c=s+1;c<o&&e.src.charCodeAt(c)===96;)c++;let l=c-s;if(l===i){if(!n){let d=e.push("code_inline","code",0);d.markup=a,d.content=e.src.slice(t,s).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=c,!0}e.backticks[l]=s}return e.backticksScanned=!0,n||(e.pending+=a),e.pos+=i,!0}function dr(e,n){let t=e.pos,u=e.src.charCodeAt(t);if(n||u!==126)return!1;let r=e.scanDelims(e.pos,!0),o=r.length,a=String.fromCharCode(u);if(o<2)return!1;let i;o%2&&(i=e.push("text","",0),i.content=a,o--);for(let c=0;c<o;c+=2)i=e.push("text","",0),i.content=a+a,e.delimiters.push({marker:u,length:0,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}function Fn(e,n){let t,u=[],r=n.length;for(let o=0;o<r;o++){let a=n[o];if(a.marker!==126||a.end===-1)continue;let i=n[a.end];t=e.tokens[a.token],t.type="s_open",t.tag="s",t.nesting=1,t.markup="~~",t.content="",t=e.tokens[i.token],t.type="s_close",t.tag="s",t.nesting=-1,t.markup="~~",t.content="",e.tokens[i.token-1].type==="text"&&e.tokens[i.token-1].content==="~"&&u.push(i.token-1)}for(;u.length;){let o=u.pop(),a=o+1;for(;a<e.tokens.length&&e.tokens[a].type==="s_close";)a++;a--,o!==a&&(t=e.tokens[a],e.tokens[a]=e.tokens[o],e.tokens[o]=t)}}function fr(e){let n=e.tokens_meta,t=e.tokens_meta.length;Fn(e,e.delimiters);for(let u=0;u<t;u++)n[u]&&n[u].delimiters&&Fn(e,n[u].delimiters)}var kt={tokenize:dr,postProcess:fr};function pr(e,n){let t=e.pos,u=e.src.charCodeAt(t);if(n||u!==95&&u!==42)return!1;let r=e.scanDelims(e.pos,u===42);for(let o=0;o<r.length;o++){let a=e.push("text","",0);a.content=String.fromCharCode(u),e.delimiters.push({marker:u,length:r.length,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close})}return e.pos+=r.length,!0}function Dn(e,n){let t=n.length;for(let u=t-1;u>=0;u--){let r=n[u];if(r.marker!==95&&r.marker!==42||r.end===-1)continue;let o=n[r.end],a=u>0&&n[u-1].end===r.end+1&&n[u-1].marker===r.marker&&n[u-1].token===r.token-1&&n[r.end+1].token===o.token+1,i=String.fromCharCode(r.marker),c=e.tokens[r.token];c.type=a?"strong_open":"em_open",c.tag=a?"strong":"em",c.nesting=1,c.markup=a?i+i:i,c.content="";let s=e.tokens[o.token];s.type=a?"strong_close":"em_close",s.tag=a?"strong":"em",s.nesting=-1,s.markup=a?i+i:i,s.content="",a&&(e.tokens[n[u-1].token].content="",e.tokens[n[r.end+1].token].content="",u--)}}function hr(e){let n=e.tokens_meta,t=e.tokens_meta.length;Dn(e,e.delimiters);for(let u=0;u<t;u++)n[u]&&n[u].delimiters&&Dn(e,n[u].delimiters)}var yt={tokenize:pr,postProcess:hr};function vt(e,n){let t,u,r,o,a="",i="",c=e.pos,s=!0;if(e.src.charCodeAt(e.pos)!==91)return!1;let l=e.pos,d=e.posMax,h=e.pos+1,p=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(p<0)return!1;let f=p+1;if(f<d&&e.src.charCodeAt(f)===40){for(s=!1,f++;f<d&&(t=e.src.charCodeAt(f),!(!_(t)&&t!==10));f++);if(f>=d)return!1;if(c=f,r=e.md.helpers.parseLinkDestination(e.src,f,e.posMax),r.ok){for(a=e.md.normalizeLink(r.str),e.md.validateLink(a)?f=r.pos:a="",c=f;f<d&&(t=e.src.charCodeAt(f),!(!_(t)&&t!==10));f++);if(r=e.md.helpers.parseLinkTitle(e.src,f,e.posMax),f<d&&c!==f&&r.ok)for(i=r.str,f=r.pos;f<d&&(t=e.src.charCodeAt(f),!(!_(t)&&t!==10));f++);}(f>=d||e.src.charCodeAt(f)!==41)&&(s=!0),f++}if(s){if(typeof e.env.references=="undefined")return!1;if(f<d&&e.src.charCodeAt(f)===91?(c=f+1,f=e.md.helpers.parseLinkLabel(e,f),f>=0?u=e.src.slice(c,f++):f=p+1):f=p+1,u||(u=e.src.slice(h,p)),o=e.env.references[V(u)],!o)return e.pos=l,!1;a=o.href,i=o.title}if(!n){e.pos=h,e.posMax=p;let x=e.push("link_open","a",1),y=[["href",a]];x.attrs=y,i&&y.push(["title",i]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=f,e.posMax=d,!0}function _t(e,n){let t,u,r,o,a,i,c,s,l="",d=e.pos,h=e.posMax;if(e.src.charCodeAt(e.pos)!==33||e.src.charCodeAt(e.pos+1)!==91)return!1;let p=e.pos+2,f=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(f<0)return!1;if(o=f+1,o<h&&e.src.charCodeAt(o)===40){for(o++;o<h&&(t=e.src.charCodeAt(o),!(!_(t)&&t!==10));o++);if(o>=h)return!1;for(s=o,i=e.md.helpers.parseLinkDestination(e.src,o,e.posMax),i.ok&&(l=e.md.normalizeLink(i.str),e.md.validateLink(l)?o=i.pos:l=""),s=o;o<h&&(t=e.src.charCodeAt(o),!(!_(t)&&t!==10));o++);if(i=e.md.helpers.parseLinkTitle(e.src,o,e.posMax),o<h&&s!==o&&i.ok)for(c=i.str,o=i.pos;o<h&&(t=e.src.charCodeAt(o),!(!_(t)&&t!==10));o++);else c="";if(o>=h||e.src.charCodeAt(o)!==41)return e.pos=d,!1;o++}else{if(typeof e.env.references=="undefined")return!1;if(o<h&&e.src.charCodeAt(o)===91?(s=o+1,o=e.md.helpers.parseLinkLabel(e,o),o>=0?r=e.src.slice(s,o++):o=f+1):o=f+1,r||(r=e.src.slice(p,f)),a=e.env.references[V(r)],!a)return e.pos=d,!1;l=a.href,c=a.title}if(!n){u=e.src.slice(p,f);let x=[];e.md.inline.parse(u,e.md,e.env,x);let y=e.push("image","img",0),w=[["src",l],["alt",""]];y.attrs=w,y.children=x,y.content=u,c&&w.push(["title",c])}return e.pos=o,e.posMax=h,!0}var mr=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,br=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;function At(e,n){let t=e.pos;if(e.src.charCodeAt(t)!==60)return!1;let u=e.pos,r=e.posMax;for(;;){if(++t>=r)return!1;let a=e.src.charCodeAt(t);if(a===60)return!1;if(a===62)break}let o=e.src.slice(u+1,t);if(br.test(o)){let a=e.md.normalizeLink(o);if(!e.md.validateLink(a))return!1;if(!n){let i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";let c=e.push("text","",0);c.content=e.md.normalizeLinkText(o);let s=e.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return e.pos+=o.length+2,!0}if(mr.test(o)){let a=e.md.normalizeLink("mailto:"+o);if(!e.md.validateLink(a))return!1;if(!n){let i=e.push("link_open","a",1);i.attrs=[["href",a]],i.markup="autolink",i.info="auto";let c=e.push("text","",0);c.content=e.md.normalizeLinkText(o);let s=e.push("link_close","a",-1);s.markup="autolink",s.info="auto"}return e.pos+=o.length+2,!0}return!1}function gr(e){return/^<a[>\s]/i.test(e)}function xr(e){return/^<\/a\s*>/i.test(e)}function kr(e){let n=e|32;return n>=97&&n<=122}function wt(e,n){if(!e.md.options.html)return!1;let t=e.posMax,u=e.pos;if(e.src.charCodeAt(u)!==60||u+2>=t)return!1;let r=e.src.charCodeAt(u+1);if(r!==33&&r!==63&&r!==47&&!kr(r))return!1;let o=e.src.slice(u).match(An);if(!o)return!1;if(!n){let a=e.push("html_inline","",0);a.content=o[0],gr(a.content)&&e.linkLevel++,xr(a.content)&&e.linkLevel--}return e.pos+=o[0].length,!0}var yr=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,vr=/^&([a-z][a-z0-9]{1,31});/i;function Et(e,n){let t=e.pos,u=e.posMax;if(e.src.charCodeAt(t)!==38||t+1>=u)return!1;if(e.src.charCodeAt(t+1)===35){let o=e.src.slice(t).match(yr);if(o){if(!n){let a=o[1][0].toLowerCase()==="x"?parseInt(o[1].slice(1),16):parseInt(o[1],10),i=e.push("text_special","",0);i.content=Ae(a)?ee(a):ee(65533),i.markup=o[0],i.info="entity"}return e.pos+=o[0].length,!0}}else{let o=e.src.slice(t).match(vr);if(o){let a=ce(o[0]);if(a!==o[0]){if(!n){let i=e.push("text_special","",0);i.content=a,i.markup=o[0],i.info="entity"}return e.pos+=o[0].length,!0}}}return!1}function Sn(e){let n={},t=e.length;if(!t)return;let u=0,r=-2,o=[];for(let a=0;a<t;a++){let i=e[a];if(o.push(0),(e[u].marker!==i.marker||r!==i.token-1)&&(u=a),r=i.token,i.length=i.length||0,!i.close)continue;n.hasOwnProperty(i.marker)||(n[i.marker]=[-1,-1,-1,-1,-1,-1]);let c=n[i.marker][(i.open?3:0)+i.length%3],s=u-o[u]-1,l=s;for(;s>c;s-=o[s]+1){let d=e[s];if(d.marker===i.marker&&d.open&&d.end<0){let h=!1;if((d.close||i.open)&&(d.length+i.length)%3===0&&(d.length%3!==0||i.length%3!==0)&&(h=!0),!h){let p=s>0&&!e[s-1].open?o[s-1]+1:0;o[a]=a-s+p,o[s]=p,i.open=!1,d.end=a,d.close=!1,l=-1,r=-2;break}}}l!==-1&&(n[i.marker][(i.open?3:0)+(i.length||0)%3]=l)}}function Ct(e){let n=e.tokens_meta,t=e.tokens_meta.length;Sn(e.delimiters);for(let u=0;u<t;u++)n[u]&&n[u].delimiters&&Sn(n[u].delimiters)}function Ft(e){let n,t,u=0,r=e.tokens,o=e.tokens.length;for(n=t=0;n<o;n++)r[n].nesting<0&&u--,r[n].level=u,r[n].nesting>0&&u++,r[n].type==="text"&&n+1<o&&r[n+1].type==="text"?r[n+1].content=r[n].content+r[n+1].content:(n!==t&&(r[t]=r[n]),t++);n!==t&&(r.length=t)}var Dt=[["text",pt],["linkify",ht],["newline",mt],["escape",gt],["backticks",xt],["strikethrough",kt.tokenize],["emphasis",yt.tokenize],["link",vt],["image",_t],["autolink",At],["html_inline",wt],["entity",Et]],St=[["balance_pairs",Ct],["strikethrough",kt.postProcess],["emphasis",yt.postProcess],["fragments_join",Ft]];function le(){this.ruler=new Z;for(let e=0;e<Dt.length;e++)this.ruler.push(Dt[e][0],Dt[e][1]);this.ruler2=new Z;for(let e=0;e<St.length;e++)this.ruler2.push(St[e][0],St[e][1])}le.prototype.skipToken=function(e){let n=e.pos,t=this.ruler.getRules(""),u=t.length,r=e.md.options.maxNesting,o=e.cache;if(typeof o[n]!="undefined"){e.pos=o[n];return}let a=!1;if(e.level<r){for(let i=0;i<u;i++)if(e.level++,a=t[i](e,!0),e.level--,a){if(n>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;a||e.pos++,o[n]=e.pos};le.prototype.tokenize=function(e){let n=this.ruler.getRules(""),t=n.length,u=e.posMax,r=e.md.options.maxNesting;for(;e.pos<u;){let o=e.pos,a=!1;if(e.level<r){for(let i=0;i<t;i++)if(a=n[i](e,!1),a){if(o>=e.pos)throw new Error("inline rule didn't increment state.pos");break}}if(a){if(e.pos>=u)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()};le.prototype.parse=function(e,n,t,u){let r=new this.State(e,n,t,u);this.tokenize(r);let o=this.ruler2.getRules(""),a=o.length;for(let i=0;i<a;i++)o[i](r)};le.prototype.State=Cn;var Tn=le;function Ln(e){let n={};e=e||{},n.src_Any=be.source,n.src_Cc=ge.source,n.src_Z=ke.source,n.src_P=Y.source,n.src_ZPCc=[n.src_Z,n.src_P,n.src_Cc].join("|"),n.src_ZCc=[n.src_Z,n.src_Cc].join("|");let t="[><\uFF5C]";return n.src_pseudo_letter="(?:(?!"+t+"|"+n.src_ZPCc+")"+n.src_Any+")",n.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",n.src_auth="(?:(?:(?!"+n.src_ZCc+"|[@/\\[\\]()]).)+@)?",n.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",n.src_host_terminator="(?=$|"+t+"|"+n.src_ZPCc+")(?!"+(e["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+n.src_ZPCc+"))",n.src_path="(?:[/?#](?:(?!"+n.src_ZCc+"|"+t+`|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!`+n.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+n.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+n.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+n.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+n.src_ZCc+"|[']).)+\\'|\\'(?="+n.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+n.src_ZCc+"|[.]|$)|"+(e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+n.src_ZCc+"|$)|;(?!"+n.src_ZCc+"|$)|\\!+(?!"+n.src_ZCc+"|[!]|$)|\\?(?!"+n.src_ZCc+"|[?]|$))+|\\/)?",n.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',n.src_xn="xn--[a-z0-9\\-]{1,59}",n.src_domain_root="(?:"+n.src_xn+"|"+n.src_pseudo_letter+"{1,63})",n.src_domain="(?:"+n.src_xn+"|(?:"+n.src_pseudo_letter+")|(?:"+n.src_pseudo_letter+"(?:-|"+n.src_pseudo_letter+"){0,61}"+n.src_pseudo_letter+"))",n.src_host="(?:(?:(?:(?:"+n.src_domain+")\\.)*"+n.src_domain+"))",n.tpl_host_fuzzy="(?:"+n.src_ip4+"|(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%)))",n.tpl_host_no_ip_fuzzy="(?:(?:(?:"+n.src_domain+")\\.)+(?:%TLDS%))",n.src_host_strict=n.src_host+n.src_host_terminator,n.tpl_host_fuzzy_strict=n.tpl_host_fuzzy+n.src_host_terminator,n.src_host_port_strict=n.src_host+n.src_port+n.src_host_terminator,n.tpl_host_port_fuzzy_strict=n.tpl_host_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_port_no_ip_fuzzy_strict=n.tpl_host_no_ip_fuzzy+n.src_port+n.src_host_terminator,n.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+n.src_ZPCc+"|>|$))",n.tpl_email_fuzzy="(^|"+t+'|"|\\(|'+n.src_ZCc+")("+n.src_email_name+"@"+n.tpl_host_fuzzy_strict+")",n.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|"+n.src_ZPCc+"))((?![$+<=>^`|\uFF5C])"+n.tpl_host_port_fuzzy_strict+n.src_path+")",n.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|\uFF5C]|"+n.src_ZPCc+"))((?![$+<=>^`|\uFF5C])"+n.tpl_host_port_no_ip_fuzzy_strict+n.src_path+")",n}function Tt(e){return Array.prototype.slice.call(arguments,1).forEach(function(t){t&&Object.keys(t).forEach(function(u){e[u]=t[u]})}),e}function De(e){return Object.prototype.toString.call(e)}function _r(e){return De(e)==="[object String]"}function Ar(e){return De(e)==="[object Object]"}function wr(e){return De(e)==="[object RegExp]"}function Mn(e){return De(e)==="[object Function]"}function Er(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}var Nn={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1};function Cr(e){return Object.keys(e||{}).reduce(function(n,t){return n||Nn.hasOwnProperty(t)},!1)}var Fr={"http:":{validate:function(e,n,t){let u=e.slice(n);return t.re.http||(t.re.http=new RegExp("^\\/\\/"+t.re.src_auth+t.re.src_host_port_strict+t.re.src_path,"i")),t.re.http.test(u)?u.match(t.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,n,t){let u=e.slice(n);return t.re.no_http||(t.re.no_http=new RegExp("^"+t.re.src_auth+"(?:localhost|(?:(?:"+t.re.src_domain+")\\.)+"+t.re.src_domain_root+")"+t.re.src_port+t.re.src_host_terminator+t.re.src_path,"i")),t.re.no_http.test(u)?n>=3&&e[n-3]===":"||n>=3&&e[n-3]==="/"?0:u.match(t.re.no_http)[0].length:0}},"mailto:":{validate:function(e,n,t){let u=e.slice(n);return t.re.mailto||(t.re.mailto=new RegExp("^"+t.re.src_email_name+"@"+t.re.src_host_strict,"i")),t.re.mailto.test(u)?u.match(t.re.mailto)[0].length:0}}},Dr="a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]",Sr="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|\u0440\u0444".split("|");function Tr(e){return function(n,t){let u=n.slice(t);return e.test(u)?u.match(e)[0].length:0}}function In(){return function(e,n){n.normalize(e)}}function Fe(e){let n=e.re=Ln(e.__opts__),t=e.__tlds__.slice();e.onCompile(),e.__tlds_replaced__||t.push(Dr),t.push(n.src_xn),n.src_tlds=t.join("|");function u(i){return i.replace("%TLDS%",n.src_tlds)}n.email_fuzzy=RegExp(u(n.tpl_email_fuzzy),"i"),n.email_fuzzy_global=RegExp(u(n.tpl_email_fuzzy),"ig"),n.link_fuzzy=RegExp(u(n.tpl_link_fuzzy),"i"),n.link_fuzzy_global=RegExp(u(n.tpl_link_fuzzy),"ig"),n.link_no_ip_fuzzy=RegExp(u(n.tpl_link_no_ip_fuzzy),"i"),n.link_no_ip_fuzzy_global=RegExp(u(n.tpl_link_no_ip_fuzzy),"ig"),n.host_fuzzy_test=RegExp(u(n.tpl_host_fuzzy_test),"i");let r=[];e.__compiled__={};function o(i,c){throw new Error('(LinkifyIt) Invalid schema "'+i+'": '+c)}Object.keys(e.__schemas__).forEach(function(i){let c=e.__schemas__[i];if(c===null)return;let s={validate:null,link:null};if(e.__compiled__[i]=s,Ar(c)){wr(c.validate)?s.validate=Tr(c.validate):Mn(c.validate)?s.validate=c.validate:o(i,c),Mn(c.normalize)?s.normalize=c.normalize:c.normalize?o(i,c):s.normalize=In();return}if(_r(c)){r.push(i);return}o(i,c)}),r.forEach(function(i){e.__compiled__[e.__schemas__[i]]&&(e.__compiled__[i].validate=e.__compiled__[e.__schemas__[i]].validate,e.__compiled__[i].normalize=e.__compiled__[e.__schemas__[i]].normalize)}),e.__compiled__[""]={validate:null,normalize:In()};let a=Object.keys(e.__compiled__).filter(function(i){return i.length>0&&e.__compiled__[i]}).map(Er).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><\uFF5C]|"+n.src_ZPCc+"))("+a+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><\uFF5C]|"+n.src_ZPCc+"))("+a+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i")}function zn(e,n,t,u){let r=e.slice(t,u);this.schema=n.toLowerCase(),this.index=t,this.lastIndex=u,this.raw=r,this.text=r,this.url=r}function D(e,n){if(!(this instanceof D))return new D(e,n);n||Cr(e)&&(n=e,e={}),this.__opts__=Tt({},Nn,n),this.__schemas__=Tt({},Fr,e),this.__compiled__={},this.__tlds__=Sr,this.__tlds_replaced__=!1,this.re={},Fe(this)}D.prototype.add=function(n,t){return this.__schemas__[n]=t,Fe(this),this};D.prototype.set=function(n){return this.__opts__=Tt(this.__opts__,n),this};D.prototype.test=function(n){if(!n.length)return!1;let t,u;if(this.re.schema_test.test(n)){for(u=this.re.schema_search,u.lastIndex=0;(t=u.exec(n))!==null;)if(this.testSchemaAt(n,t[2],u.lastIndex))return!0}return!!(this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&n.search(this.re.host_fuzzy_test)>=0&&n.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy)!==null||this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&n.indexOf("@")>=0&&n.match(this.re.email_fuzzy)!==null)};D.prototype.pretest=function(n){return this.re.pretest.test(n)};D.prototype.testSchemaAt=function(n,t,u){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(n,u,this):0};D.prototype.match=function(n){let t=[],u=[],r=[],o=[],a,i,c;function s(h,p){return h?p?h.index!==p.index?h.index<p.index?h:p:h.lastIndex>=p.lastIndex?h:p:h:p}if(!n.length)return null;if(this.re.schema_test.test(n))for(c=this.re.schema_search,c.lastIndex=0;(a=c.exec(n))!==null;)i=this.testSchemaAt(n,a[2],c.lastIndex),i&&u.push({schema:a[2],index:a.index+a[1].length,lastIndex:a.index+a[0].length+i});if(this.__opts__.fuzzyLink&&this.__compiled__["http:"])for(c=this.__opts__.fuzzyIP?this.re.link_fuzzy_global:this.re.link_no_ip_fuzzy_global,c.lastIndex=0;(a=c.exec(n))!==null;)r.push({schema:"",index:a.index+a[1].length,lastIndex:a.index+a[0].length});if(this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"])for(c=this.re.email_fuzzy_global,c.lastIndex=0;(a=c.exec(n))!==null;)o.push({schema:"mailto:",index:a.index+a[1].length,lastIndex:a.index+a[0].length});let l=[0,0,0],d=0;for(;;){let h=[u[l[0]],o[l[1]],r[l[2]]],p=s(s(h[0],h[1]),h[2]);if(!p)break;if(p===h[0]?l[0]++:p===h[1]?l[1]++:l[2]++,p.index<d)continue;let f=new zn(n,p.schema,p.index,p.lastIndex);this.__compiled__[f.schema].normalize(f,this),t.push(f),d=p.lastIndex}return t.length?t:null};D.prototype.matchAtStart=function(n){if(!n.length)return null;let t=this.re.schema_at_start.exec(n);if(!t)return null;let u=this.testSchemaAt(n,t[2],t[0].length);if(!u)return null;let r=new zn(n,t[2],t.index+t[1].length,t.index+t[0].length+u);return this.__compiled__[r.schema].normalize(r,this),r};D.prototype.tlds=function(n,t){return n=Array.isArray(n)?n:[n],t?(this.__tlds__=this.__tlds__.concat(n).sort().filter(function(u,r,o){return u!==o[r-1]}).reverse(),Fe(this),this):(this.__tlds__=n.slice(),this.__tlds_replaced__=!0,Fe(this),this)};D.prototype.normalize=function(n){n.schema||(n.url="http://"+n.url),n.schema==="mailto:"&&!/^mailto:/i.test(n.url)&&(n.url="mailto:"+n.url)};D.prototype.onCompile=function(){};var Pn=D;var Lr=/^xn--/,Mr=/[^\0-\x7F]/,Ir=/[\x2E\u3002\uFF0E\uFF61]/g,Nr={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},Lt=35,z=Math.floor,Mt=String.fromCharCode;function O(e){throw new RangeError(Nr[e])}function zr(e,n){let t=[],u=e.length;for(;u--;)t[u]=n(e[u]);return t}function Rn(e,n){let t=e.split("@"),u="";t.length>1&&(u=t[0]+"@",e=t[1]),e=e.replace(Ir,".");let r=e.split("."),o=zr(r,n).join(".");return u+o}function Hn(e){let n=[],t=0,u=e.length;for(;t<u;){let r=e.charCodeAt(t++);if(r>=55296&&r<=56319&&t<u){let o=e.charCodeAt(t++);(o&64512)==56320?n.push(((r&1023)<<10)+(o&1023)+65536):(n.push(r),t--)}else n.push(r)}return n}var Pr=e=>String.fromCodePoint(...e),qr=function(e){return e>=48&&e<58?26+(e-48):e>=65&&e<91?e-65:e>=97&&e<123?e-97:36},qn=function(e,n){return e+22+75*(e<26)-((n!=0)<<5)},Bn=function(e,n,t){let u=0;for(e=t?z(e/700):e>>1,e+=z(e/n);e>Lt*26>>1;u+=36)e=z(e/Lt);return z(u+(Lt+1)*e/(e+38))},On=function(e){let n=[],t=e.length,u=0,r=128,o=72,a=e.lastIndexOf("-");a<0&&(a=0);for(let i=0;i<a;++i)e.charCodeAt(i)>=128&&O("not-basic"),n.push(e.charCodeAt(i));for(let i=a>0?a+1:0;i<t;){let c=u;for(let l=1,d=36;;d+=36){i>=t&&O("invalid-input");let h=qr(e.charCodeAt(i++));h>=36&&O("invalid-input"),h>z((2147483647-u)/l)&&O("overflow"),u+=h*l;let p=d<=o?1:d>=o+26?26:d-o;if(h<p)break;let f=36-p;l>z(2147483647/f)&&O("overflow"),l*=f}let s=n.length+1;o=Bn(u-c,s,c==0),z(u/s)>2147483647-r&&O("overflow"),r+=z(u/s),u%=s,n.splice(u++,0,r)}return String.fromCodePoint(...n)},$n=function(e){let n=[];e=Hn(e);let t=e.length,u=128,r=0,o=72;for(let c of e)c<128&&n.push(Mt(c));let a=n.length,i=a;for(a&&n.push("-");i<t;){let c=2147483647;for(let l of e)l>=u&&l<c&&(c=l);let s=i+1;c-u>z((2147483647-r)/s)&&O("overflow"),r+=(c-u)*s,u=c;for(let l of e)if(l<u&&++r>2147483647&&O("overflow"),l===u){let d=r;for(let h=36;;h+=36){let p=h<=o?1:h>=o+26?26:h-o;if(d<p)break;let f=d-p,x=36-p;n.push(Mt(qn(p+f%x,0))),d=z(f/x)}n.push(Mt(qn(d,0))),o=Bn(r,s,i===a),r=0,++i}++r,++u}return n.join("")},Rr=function(e){return Rn(e,function(n){return Lr.test(n)?On(n.slice(4).toLowerCase()):n})},Hr=function(e){return Rn(e,function(n){return Mr.test(n)?"xn--"+$n(n):n})},Br={version:"2.3.1",ucs2:{decode:Hn,encode:Pr},decode:On,encode:$n,toASCII:Hr,toUnicode:Rr};var It=Br;var Un={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}};var jn={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}};var Vn={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"\u201C\u201D\u2018\u2019",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}};var Or={default:Un,zero:jn,commonmark:Vn},$r=/^(vbscript|javascript|file|data):/,Ur=/^data:image\/(gif|png|jpeg|webp);/;function jr(e){let n=e.trim().toLowerCase();return $r.test(n)?Ur.test(n):!0}var Wn=["http:","https:","mailto:"];function Vr(e){let n=ie(e,!0);if(n.hostname&&(!n.protocol||Wn.indexOf(n.protocol)>=0))try{n.hostname=It.toASCII(n.hostname)}catch(t){}return pe(J(n))}function Wr(e){let n=ie(e,!0);if(n.hostname&&(!n.protocol||Wn.indexOf(n.protocol)>=0))try{n.hostname=It.toUnicode(n.hostname)}catch(t){}return ae(J(n),ae.defaultChars+"%")}function S(e,n){if(!(this instanceof S))return new S(e,n);n||_e(e)||(n=e||{},e="default"),this.inline=new Tn,this.block=new En,this.core=new mn,this.renderer=new sn,this.linkify=new Pn,this.validateLink=jr,this.normalizeLink=Vr,this.normalizeLinkText=Wr,this.utils=Oe,this.helpers=Q({},Ve),this.options={},this.configure(e),n&&this.set(n)}S.prototype.set=function(e){return Q(this.options,e),this};S.prototype.configure=function(e){let n=this;if(_e(e)){let t=e;if(e=Or[t],!e)throw new Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw new Error("Wrong `markdown-it` preset, can't be empty");return e.options&&n.set(e.options),e.components&&Object.keys(e.components).forEach(function(t){e.components[t].rules&&n[t].ruler.enableOnly(e.components[t].rules),e.components[t].rules2&&n[t].ruler2.enableOnly(e.components[t].rules2)}),this};S.prototype.enable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.enable(e,!0))},this),t=t.concat(this.inline.ruler2.enable(e,!0));let u=e.filter(function(r){return t.indexOf(r)<0});if(u.length&&!n)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+u);return this};S.prototype.disable=function(e,n){let t=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(r){t=t.concat(this[r].ruler.disable(e,!0))},this),t=t.concat(this.inline.ruler2.disable(e,!0));let u=e.filter(function(r){return t.indexOf(r)<0});if(u.length&&!n)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+u);return this};S.prototype.use=function(e){let n=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,n),this};S.prototype.parse=function(e,n){if(typeof e!="string")throw new Error("Input data should be a String");let t=new this.core.State(e,this,n);return this.core.process(t),t.tokens};S.prototype.render=function(e,n){return n=n||{},this.renderer.render(this.parse(e,n),this.options,n)};S.prototype.parseInline=function(e,n){let t=new this.core.State(e,this,n);return t.inlineMode=!0,this.core.process(t),t.tokens};S.prototype.renderInline=function(e,n){return n=n||{},this.renderer.render(this.parseInline(e,n),this.options,n)};var Nt=S;var m=require("obsidian"),zt="notes-to-html-pages-html-view",Zr='"Noto Serif SC", "Songti SC", serif',Gr={small:15,default:16,large:18,xlarge:20},Pt={clean:{zh:"\u7B80\u6D01",en:"Clean"},claude:{zh:"Claude \u98CE\u683C",en:"Claude"}},Se={zh:{ribbonExportCurrentNote:"\u5BFC\u51FA\u5F53\u524D\u7B14\u8BB0\u4E3A HTML \u9875\u9762",commandExportCurrentNote:"\u5BFC\u51FA\u5F53\u524D\u7B14\u8BB0\u4E3A HTML \u9875\u9762",commandExportCurrentFolder:"\u5BFC\u51FA\u5F53\u524D\u6587\u4EF6\u5939\u4E3A HTML \u9875\u9762",menuExportNote:"\u5BFC\u51FA\u4E3A HTML \u9875\u9762",menuExportFolder:"\u5BFC\u51FA\u6587\u4EF6\u5939\u4E3A HTML \u9875\u9762",noticeNoActiveMarkdown:"\u5F53\u524D\u6CA1\u6709\u6253\u5F00 Markdown \u7B14\u8BB0\u3002",noticeNoMarkdownInFolder:"\u8FD9\u4E2A\u6587\u4EF6\u5939\u91CC\u6CA1\u6709\u53EF\u5BFC\u51FA\u7684 Markdown \u7B14\u8BB0\u3002",noticeFolderExported:"\u5DF2\u5BFC\u51FA {count} \u7BC7\u7B14\u8BB0\u4E3A HTML \u9875\u9762\u3002",noticeFileExported:"\u5DF2\u5BFC\u51FA\uFF1A{path}",noticeExportFailed:"\u5BFC\u51FA\u5931\u8D25\uFF1A{path}",noticeReloadRequired:"\u91CD\u542F Obsidian \u6216\u91CD\u65B0\u52A0\u8F7D\u63D2\u4EF6\u540E\uFF0C\u547D\u4EE4\u540D\u548C\u4FA7\u8FB9\u680F\u6309\u94AE\u4F1A\u66F4\u65B0\u3002",untitledSection:"\u672A\u547D\u540D\u7AE0\u8282",toc:"\u76EE\u5F55",sectionTocAria:"\u7AE0\u8282\u76EE\u5F55",codeLabel:"\u4EE3\u7801",asciiFigureLabel:"ASCII \u56FE",fallbackHtmlPage:"HTML \u9875\u9762",launcherOpenInBrowser:"\u5728\u6D4F\u89C8\u5668\u6253\u5F00 HTML \u9875\u9762",launcherHtmlFile:"HTML \u6587\u4EF6",launcherSourceNote:"\u6E90\u7B14\u8BB0",sourceLinkLabel:"HTML \u9875\u9762",sourceLinkAlias:"\u6253\u5F00 HTML \u9875\u9762",settingsTitle:"Notes to HTML Pages",settingLanguageName:"\u754C\u9762\u8BED\u8A00",settingLanguageDesc:"\u5207\u6362\u63D2\u4EF6\u547D\u4EE4\u3001\u53F3\u952E\u83DC\u5355\u3001\u8BBE\u7F6E\u9875\u548C\u63D0\u793A\u6587\u6848\u3002\u547D\u4EE4\u540D\u9700\u8981\u91CD\u8F7D\u63D2\u4EF6\u540E\u5237\u65B0\u3002",languageChinese:"\u4E2D\u6587",languageEnglish:"English",settingExportFolderName:"\u5BFC\u51FA\u76EE\u5F55",settingExportFolderDesc:"\u76F8\u5BF9\u4E8E\u5F53\u524D vault \u6839\u76EE\u5F55\u3002",settingStyleName:"HTML \u6837\u5F0F",settingStyleDesc:"\u63A7\u5236\u5BFC\u51FA\u7684 HTML \u9875\u9762\u7248\u5F0F\u3002\u540E\u7EED\u65B0\u589E\u6837\u5F0F\u4F1A\u51FA\u73B0\u5728\u8FD9\u91CC\u3002",settingWebFontName:"\u81EA\u5B9A\u4E49\u6B63\u6587\u5B57\u4F53",settingWebFontDesc:"\u586B\u5165\u7535\u8111\u91CC\u5DF2\u5B89\u88C5\u7684\u5B57\u4F53\u540D\uFF08\u4F8B\u5982 \u971E\u9E5C\u6587\u6977 / LXGW WenKai\uFF09\u3002\u7559\u7A7A\u5219\u7528\u6837\u5F0F\u9ED8\u8BA4\u5B57\u4F53\u3002",settingCustomFontPlaceholder:"\u4F8B\u5982\uFF1A\u971E\u9E5C\u6587\u6977",settingFontSizeName:"\u6B63\u6587\u5B57\u53F7",settingFontSizeDesc:"\u8C03\u6574\u5BFC\u51FA\u9875\u9762\u7684\u6574\u4F53\u9605\u8BFB\u5B57\u53F7\u3002",fontSizeSmall:"\u504F\u5C0F",fontSizeDefault:"\u9ED8\u8BA4",fontSizeLarge:"\u504F\u5927",fontSizeXLarge:"\u7279\u5927",controlsAriaLabel:"\u9605\u8BFB\u5DE5\u5177",controlsCopyHighlights:"\u590D\u5236\u6240\u6709\u5212\u7EBF",controlsCopied:"\u5DF2\u590D\u5236 {count} \u6761",controlsCopyEmpty:"\u6682\u65E0\u5212\u7EBF",controlsCopyFailed:"\u590D\u5236\u5931\u8D25",controlsNoteLabel:"\u5907\u6CE8",settingPreserveFoldersName:"\u4FDD\u7559\u539F\u6587\u4EF6\u5939\u5C42\u7EA7",settingPreserveFoldersDesc:"\u5F00\u542F\u540E\uFF0C\u5BFC\u51FA\u7684 HTML \u4F1A\u5728\u5BFC\u51FA\u76EE\u5F55\u91CC\u590D\u523B\u539F\u7B14\u8BB0\u7684\u6587\u4EF6\u5939\u8DEF\u5F84\u3002",settingAddTitleName:"\u6CA1\u6709 H1 \u65F6\u7528\u6587\u4EF6\u540D\u8865\u6807\u9898",settingAddTitleDesc:"\u8BA9\u5BFC\u51FA\u7684\u9875\u9762\u59CB\u7EC8\u6709\u4E00\u4E2A\u5C45\u4E2D\u7684\u4E3B\u6807\u9898\u3002",settingWikilinksName:"\u5C06 Wikilink \u6307\u5411\u540C\u540D HTML",settingWikilinksDesc:"\u4F8B\u5982 [[\u957F\u6587]] \u4F1A\u5BFC\u51FA\u4E3A\u6307\u5411 \u957F\u6587.html \u7684\u94FE\u63A5\u3002",settingOpenHtmlName:"\u5728 Obsidian \u5185\u76F4\u63A5\u6253\u5F00 HTML",settingOpenHtmlDesc:"\u6CE8\u518C .html/.htm \u6587\u4EF6\u89C6\u56FE\u3002\u5F00\u542F\u540E\uFF0C\u5BFC\u51FA\u7684 HTML \u4F1A\u51FA\u73B0\u5728\u6587\u4EF6\u5217\u8868\u4E2D\uFF0C\u5E76\u53EF\u76F4\u63A5\u70B9\u5F00\u9605\u8BFB\u3002",settingLauncherName:"\u751F\u6210 Obsidian \u53EF\u89C1\u5165\u53E3\u7B14\u8BB0",settingLauncherDesc:"\u517C\u5BB9\u65E7\u65B9\u6848\uFF1A\u540C\u65F6\u751F\u6210\u540C\u540D .md \u5165\u53E3\u7B14\u8BB0\u3002\u5DF2\u5F00\u542F HTML \u76F4\u63A5\u9605\u8BFB\u65F6\u901A\u5E38\u4E0D\u9700\u8981\u3002",settingInsertLinkName:"\u5728\u539F\u6587\u5F00\u5934\u63D2\u5165\u9605\u8BFB\u7248\u53CC\u94FE",settingInsertLinkDesc:"\u5BFC\u51FA\u540E\uFF0C\u5728\u539F\u6587\u5F00\u5934\u653E\u5165\u6307\u5411\u5165\u53E3\u7B14\u8BB0\u7684\u53CC\u94FE\u3002\u518D\u6B21\u5BFC\u51FA\u4F1A\u81EA\u52A8\u66F4\u65B0\uFF0C\u4E0D\u4F1A\u91CD\u590D\u6DFB\u52A0\u3002",settingEmbedImagesName:"\u5185\u5D4C\u672C\u5730\u56FE\u7247",settingEmbedImagesDesc:"\u628A\u672C\u5730\u56FE\u7247\u8F6C\u4E3A data URI\uFF0C\u65B9\u4FBF HTML \u6587\u4EF6\u72EC\u7ACB\u6253\u5F00\u3002",settingSyncAnnotationsName:"\u6279\u6CE8\u540C\u6B65\u56DE\u539F Markdown",settingSyncAnnotationsDesc:"\u5728 Obsidian \u5185\u9605\u8BFB HTML \u65F6\uFF0C\u9009\u4E2D\u6587\u672C\u6DFB\u52A0\u7684\u6279\u6CE8\u4F1A\u5199\u56DE\u6E90\u7B14\u8BB0\u3002\u72EC\u7ACB\u6D4F\u89C8\u5668\u6253\u5F00\u65F6\u4ECD\u53EF\u4E34\u65F6\u5212\u7EBF\u548C\u6279\u6CE8\u3002",annotationToolbarUnderline:"\u5212\u7EBF",annotationInlinePlaceholder:"\u8FD9\u91CC\u53EF\u4EE5\u5199\u5907\u6CE8...",annotationInlineSave:"\u4FDD\u5B58",annotationCardPlaceholder:"\u6DFB\u52A0\u6279\u6CE8...",annotationComposerSave:"\u4FDD\u5B58",annotationDelete:"\u5220\u9664",annotationPanelTitle:"\u6279\u6CE8",annotationQuoteLabel:"\u539F\u6587",annotationNoteLabel:"\u6279\u6CE8",annotationSyncDisabled:"\u4EC5\u4FDD\u5B58\u5728\u5F53\u524D\u9875\u9762",annotationSyncedNotice:"\u6279\u6CE8\u5DF2\u540C\u6B65\u5230\u539F Markdown\u3002",annotationSyncFailedNotice:"\u6279\u6CE8\u540C\u6B65\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002",annotationDeletedNotice:"\u6279\u6CE8\u5DF2\u5220\u9664\u3002",annotationDeleteFailedNotice:"\u6279\u6CE8\u5220\u9664\u540C\u6B65\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002"},en:{ribbonExportCurrentNote:"Export current note to HTML page",commandExportCurrentNote:"Export current note to HTML page",commandExportCurrentFolder:"Export current folder to HTML pages",menuExportNote:"Export to HTML page",menuExportFolder:"Export folder to HTML pages",noticeNoActiveMarkdown:"No Markdown note is currently open.",noticeNoMarkdownInFolder:"This folder does not contain Markdown notes to export.",noticeFolderExported:"Exported {count} notes to HTML pages.",noticeFileExported:"Exported: {path}",noticeExportFailed:"Export failed: {path}",noticeReloadRequired:"Reload Obsidian or reload the plugin to refresh command names and the ribbon button.",untitledSection:"Untitled section",toc:"Table of contents",sectionTocAria:"Section table of contents",codeLabel:"Code",asciiFigureLabel:"ASCII diagram",fallbackHtmlPage:"HTML Page",launcherOpenInBrowser:"Open HTML page in browser",launcherHtmlFile:"HTML file",launcherSourceNote:"Source note",sourceLinkLabel:"HTML Page",sourceLinkAlias:"Open HTML Page",settingsTitle:"Notes to HTML Pages",settingLanguageName:"Interface language",settingLanguageDesc:"Switch plugin commands, context menus, settings, and notices. Command names refresh after reloading the plugin.",languageChinese:"\u4E2D\u6587",languageEnglish:"English",settingExportFolderName:"Export folder",settingExportFolderDesc:"Relative to the current vault root.",settingStyleName:"HTML style",settingStyleDesc:"Controls the exported HTML page layout. Future styles will appear here.",settingWebFontName:"Custom body font",settingWebFontDesc:"Enter a font installed on your computer (e.g. LXGW WenKai). Leave empty to use the style default.",settingCustomFontPlaceholder:"e.g. LXGW WenKai",settingFontSizeName:"Body text size",settingFontSizeDesc:"Adjusts the overall reading size of exported pages.",fontSizeSmall:"Small",fontSizeDefault:"Default",fontSizeLarge:"Large",fontSizeXLarge:"Extra large",controlsAriaLabel:"Reading tools",controlsCopyHighlights:"Copy highlights",controlsCopied:"Copied {count}",controlsCopyEmpty:"No highlights yet",controlsCopyFailed:"Copy failed",controlsNoteLabel:"Note",settingPreserveFoldersName:"Preserve folder structure",settingPreserveFoldersDesc:"Exports HTML pages into matching subfolders inside the export folder.",settingAddTitleName:"Use filename as title when H1 is missing",settingAddTitleDesc:"Ensures every exported page has a centered main title.",settingWikilinksName:"Point Wikilinks to same-name HTML",settingWikilinksDesc:"For example, [[Long note]] will link to Long note.html.",settingOpenHtmlName:"Open HTML directly in Obsidian",settingOpenHtmlDesc:"Registers a .html/.htm file view so exported HTML files appear in the file explorer and open inside Obsidian.",settingLauncherName:"Create Obsidian-visible launcher notes",settingLauncherDesc:"Legacy compatibility: also create a same-name .md launcher note. Usually unnecessary when direct HTML reading is enabled.",settingInsertLinkName:"Insert HTML backlink at source note top",settingInsertLinkDesc:"After export, insert a backlink to the generated reading page at the top of the source note. Re-exporting updates it without duplicates.",settingEmbedImagesName:"Embed local images",settingEmbedImagesDesc:"Converts local images to data URIs so the HTML file can be opened standalone.",settingSyncAnnotationsName:"Sync annotations back to Markdown",settingSyncAnnotationsDesc:"When reading HTML inside Obsidian, selected-text annotations are written back to the source note. Standalone browser reading still supports temporary highlights and comments.",annotationToolbarUnderline:"Underline",annotationInlinePlaceholder:"Write a note here...",annotationInlineSave:"Save",annotationCardPlaceholder:"Add a note...",annotationComposerSave:"Save",annotationDelete:"Delete",annotationPanelTitle:"Annotations",annotationQuoteLabel:"Quote",annotationNoteLabel:"Note",annotationSyncDisabled:"Saved in this page only",annotationSyncedNotice:"Annotation synced to the source Markdown note.",annotationSyncFailedNotice:"Annotation sync failed. Please try again.",annotationDeletedNotice:"Annotation deleted.",annotationDeleteFailedNotice:"Annotation deletion could not be synced. Please try again."}},qt={interfaceLanguage:"zh",exportFolder:"HTML Pages",stylePreset:"clean",customFontFamily:"",fontScale:"default",preserveFolderStructure:!0,addTitleFromFilename:!0,linkWikilinksToHtml:!0,embedLocalImages:!0,openHtmlInObsidian:!0,createLauncherNote:!1,insertLinkInSource:!0,syncAnnotationsToSource:!0},Xr=/(?:%% readable-html-exporter-link:start %%\r?\n)?^> (?:阅读版 HTML|HTML 页面|Readable HTML|HTML Page)\s*[：:]\s*\[\[[^\]]+\|(?:打开对应 HTML|打开 HTML 页面|Open HTML|Open HTML Page)\]\]\s*\r?\n(?:%% readable-html-exporter-link:end %%\r?\n?)?/gm,Jr=new Set(["<",">",":",'"',"/","\\","|","?","*"]),Yr="<!-- notes-to-html-pages-annotations:start -->",Kr="<!-- notes-to-html-pages-annotations:end -->",ue=/<!-- notes-to-html-pages-annotations:start -->[\s\S]*?<!-- notes-to-html-pages-annotations:end -->/,Qr=/<!-- notes-to-html-pages-annotations:data\s*([\s\S]*?)\s*notes-to-html-pages-annotations:data-end -->/,Te=class extends m.Plugin{constructor(){super(...arguments);this.settings=qt}async onload(){if(await this.loadSettings(),this.markdown=this.createMarkdownRenderer(),this.settings.openHtmlInObsidian){this.registerView(zt,t=>new Rt(t,this));try{this.registerExtensions(["html","htm"],zt)}catch(t){console.info("Notes to HTML Pages could not register html/htm extensions.",t)}}this.addRibbonIcon("file-output",this.t("ribbonExportCurrentNote"),()=>{this.exportActiveFile()}),this.addCommand({id:"export-current-note-readable-html",name:this.t("commandExportCurrentNote"),checkCallback:t=>{let u=this.getActiveMarkdownFile();return u?(t||this.exportFile(u,!0),!0):!1}}),this.addCommand({id:"export-current-folder-readable-html",name:this.t("commandExportCurrentFolder"),checkCallback:t=>{let u=this.getActiveMarkdownFile(),r=u==null?void 0:u.parent;return r?(t||this.exportFolder(r),!0):!1}}),this.registerEvent(this.app.workspace.on("file-menu",(t,u)=>{u instanceof m.TFile&&u.extension==="md"&&t.addItem(r=>{r.setTitle(this.t("menuExportNote")).setIcon("file-output").onClick(()=>void this.exportFile(u,!0))}),u instanceof m.TFolder&&t.addItem(r=>{r.setTitle(this.t("menuExportFolder")).setIcon("folder-output").onClick(()=>void this.exportFolder(u))})})),this.addSettingTab(new Ht(this.app,this))}async loadSettings(){let t=await this.loadData();this.settings=Object.assign({},qt,this.normalizeLoadedSettings(t))}normalizeLoadedSettings(t){if(!this.isRecord(t))return{};let u={};return(t.interfaceLanguage==="zh"||t.interfaceLanguage==="en")&&(u.interfaceLanguage=t.interfaceLanguage),typeof t.exportFolder=="string"&&(u.exportFolder=t.exportFolder),(t.stylePreset==="clean"||t.stylePreset==="claude")&&(u.stylePreset=t.stylePreset),typeof t.customFontFamily=="string"&&(u.customFontFamily=t.customFontFamily),(t.fontScale==="small"||t.fontScale==="default"||t.fontScale==="large"||t.fontScale==="xlarge")&&(u.fontScale=t.fontScale),typeof t.preserveFolderStructure=="boolean"&&(u.preserveFolderStructure=t.preserveFolderStructure),typeof t.addTitleFromFilename=="boolean"&&(u.addTitleFromFilename=t.addTitleFromFilename),typeof t.linkWikilinksToHtml=="boolean"&&(u.linkWikilinksToHtml=t.linkWikilinksToHtml),typeof t.embedLocalImages=="boolean"&&(u.embedLocalImages=t.embedLocalImages),typeof t.openHtmlInObsidian=="boolean"&&(u.openHtmlInObsidian=t.openHtmlInObsidian),typeof t.createLauncherNote=="boolean"&&(u.createLauncherNote=t.createLauncherNote),typeof t.insertLinkInSource=="boolean"&&(u.insertLinkInSource=t.insertLinkInSource),typeof t.syncAnnotationsToSource=="boolean"&&(u.syncAnnotationsToSource=t.syncAnnotationsToSource),u}isRecord(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}async saveSettings(){await this.saveData(this.settings)}getInterfaceLanguage(){return this.settings.interfaceLanguage==="en"?"en":"zh"}t(t,u={}){var a,i;let r=this.getInterfaceLanguage();return((i=(a=Se[r][t])!=null?a:Se.zh[t])!=null?i:t).replace(/\{(\w+)}/g,(c,s)=>{var l;return String((l=u[s])!=null?l:"")})}tForLanguage(t,u,r={}){var a,i;return((i=(a=Se[t][u])!=null?a:Se.zh[u])!=null?i:u).replace(/\{(\w+)}/g,(c,s)=>{var l;return String((l=r[s])!=null?l:"")})}getStyleLabel(t,u=this.getInterfaceLanguage()){var r,o;return(o=(r=Pt[t])==null?void 0:r[u])!=null?o:t}createMarkdownRenderer(){var r;let t=new Nt({html:!0,linkify:!1,typographer:!1,breaks:!1}),u=(r=t.renderer.rules.heading_open)!=null?r:((o,a,i,c,s)=>s.renderToken(o,a,i));return t.renderer.rules.heading_open=(o,a,i,c,s)=>{var h;let l=o[a],d=o[a+1];if((d==null?void 0:d.type)==="inline"&&d.content){let p=this.getHeadingIdMap(c),f=this.slugify(d.content),x=(h=p.get(f))!=null?h:0;p.set(f,x+1),l.attrSet("id",x===0?f:`${f}-${x+1}`)}return u(o,a,i,c,s)},t}getHeadingIdMap(t){let u=t;return u.headingIds||(u.headingIds=new Map),u.headingIds}getActiveMarkdownFile(){var r;let t=this.app.workspace.getActiveViewOfType(m.MarkdownView),u=(r=t==null?void 0:t.file)!=null?r:this.app.workspace.getActiveFile();return u instanceof m.TFile&&u.extension==="md"?u:null}async exportActiveFile(){let t=this.getActiveMarkdownFile();if(!t){new m.Notice(this.t("noticeNoActiveMarkdown"));return}await this.exportFile(t,!0)}async exportFolder(t){let u=this.collectMarkdownFiles(t).filter(o=>!this.isInsideExportFolder(o.path));if(u.length===0){new m.Notice(this.t("noticeNoMarkdownInFolder"));return}let r=0;for(let o of u)await this.exportFile(o,!1),r+=1;new m.Notice(this.t("noticeFolderExported",{count:r}))}collectMarkdownFiles(t){let u=[];for(let r of t.children)r instanceof m.TFile&&r.extension==="md"&&u.push(r),r instanceof m.TFolder&&u.push(...this.collectMarkdownFiles(r));return u}async exportFile(t,u){try{let r=this.getOutputPaths(t),{html:o,title:a}=await this.renderFileToHtml(t);if(await this.ensureFolder(r.outputFolder),await this.writeTextFile(r.htmlPath,o),this.settings.createLauncherNote&&await this.writeTextFile(r.launcherPath,this.createLauncherNote(t,a,r)),this.settings.insertLinkInSource){let i=this.settings.openHtmlInObsidian?r.htmlWikiTarget:r.launcherWikiTarget;await this.upsertSourceLink(t,i)}u&&new m.Notice(this.t("noticeFileExported",{path:r.htmlPath}))}catch(r){console.error(r),new m.Notice(this.t("noticeExportFailed",{path:t.path}))}}async renderFileToHtml(t){var A,E;let u=await this.app.vault.cachedRead(t),r=this.extractAnnotations(u),{content:o,frontmatterTitle:a}=this.stripFrontmatter(u),i=this.removeSourceLinkBlock(o),c=this.removeAnnotationsBlock(i),s=await this.prepareMarkdown(c,t),l=(E=(A=this.findFirstHeading(c))!=null?A:a)!=null?E:t.basename,h=this.settings.addTitleFromFilename&&!this.hasTopLevelHeading(s)?`# ${l}

${s}`:s,p=this.getStylePreset(),f=this.markdown.render(h,{}),x=/[\u3400-\u9fff]/.test(u)?"zh":"en",y=this.buildStyledBody(f,l,p,x),w=x==="zh"?"zh-CN":"en",b=this.createAnnotationConfig(t,x),g=this.createAnnotationDataScript(r),k=this.buildExportOverrideCss(this.settings.customFontFamily,this.settings.fontScale),v=this.createReaderControls(x);return{title:l,html:["<!doctype html>",`<html lang="${w}">`,"<head>",'<meta charset="utf-8">','<meta name="viewport" content="width=device-width, initial-scale=1">',`<meta name="notes-to-html-pages-style" content="${p}">`,`<meta name="notes-to-html-pages-source" content="${this.escapeHtml(t.path)}">`,`<meta name="notes-to-html-pages-sync-annotations" content="${this.settings.syncAnnotationsToSource?"true":"false"}">`,`<title>${this.escapeHtml(l)}</title>`,`<style>${this.getStyleCss(p)}</style>`,`<style>${uo}</style>`,k?`<style>${k}</style>`:"","</head>",`<body class="style-${p}">`,'<main class="page">',y,"</main>",v,b,g,`<script>${eo}<\/script>`,`<script>${ro}<\/script>`,"</body>","</html>"].filter(Boolean).join(`
`)}}createReaderControls(t){let u=r=>this.escapeHtml(this.tForLanguage(t,r));return[`<div id="reader-controls" aria-label="${u("controlsAriaLabel")}"`,` data-copied-text="${u("controlsCopied")}"`,` data-empty-text="${u("controlsCopyEmpty")}"`,` data-failed-text="${u("controlsCopyFailed")}"`,` data-note-label="${u("controlsNoteLabel")}">`,'<button type="button" class="reader-control-button reader-control-copy" data-action="copy-highlights"',` title="${u("controlsCopyHighlights")}" aria-label="${u("controlsCopyHighlights")}">`,'<span class="reader-control-glyph" aria-hidden="true">\u29C9</span>',`<span class="reader-control-label">${u("controlsCopyHighlights")}</span>`,"</button>","</div>"].join("")}buildExportOverrideCss(t,u){let r=[],o=Gr[u];o&&o!==16&&r.push(`html{font-size:${o}px;}`);let a=this.normalizeFontFamily(t);return a&&r.push(`body{font-family:${a}, ${Zr} !important;}`),r.join("")}normalizeFontFamily(t){let u=(t||"").replace(/["'<>{};\\]/g,"").trim();return u?`"${u}"`:""}async syncAnnotationToSource(t,u){if(!this.settings.syncAnnotationsToSource)return;let r=this.app.vault.getAbstractFileByPath(t);if(!(r instanceof m.TFile)||r.extension!=="md")throw new Error(`Source Markdown file not found: ${t}`);let o=this.normalizeAnnotation(u,r.path),a=await this.app.vault.read(r),i=this.extractAnnotations(a),c=i.findIndex(h=>h.id===o.id),s=c>=0?i.map((h,p)=>p===c?o:h):[...i,o],l=this.createAnnotationsMarkdownBlock(s,this.getInterfaceLanguage()),d=ue.test(a)?a.replace(ue,l):`${a.replace(/\s+$/g,"")}

${l}
`;d!==a&&await this.app.vault.modify(r,d)}async deleteAnnotationFromSource(t,u){if(!this.settings.syncAnnotationsToSource)return;let r=this.app.vault.getAbstractFileByPath(t);if(!(r instanceof m.TFile)||r.extension!=="md")throw new Error(`Source Markdown file not found: ${t}`);let o=await this.app.vault.read(r),a=this.extractAnnotations(o),i=a.filter(s=>s.id!==u);if(i.length===a.length)return;let c=i.length>0?o.replace(ue,this.createAnnotationsMarkdownBlock(i,this.getInterfaceLanguage())):o.replace(ue,"").replace(/\n{3,}/g,`

`).replace(/\s+$/g,`
`);c!==o&&await this.app.vault.modify(r,c)}getStylePreset(){return Object.prototype.hasOwnProperty.call(Pt,this.settings.stylePreset)?this.settings.stylePreset:"clean"}getStyleCss(t){return t==="claude"?no:to}createAnnotationConfig(t,u){let r=["annotationToolbarUnderline","annotationInlinePlaceholder","annotationInlineSave","annotationCardPlaceholder","annotationComposerSave","annotationDelete","annotationPanelTitle","annotationQuoteLabel","annotationNoteLabel","annotationSyncDisabled"],o={};for(let a of r)o[a]=this.tForLanguage(u,a);return`<script type="application/json" id="notes-to-html-pages-config">${this.escapeJsonScript(JSON.stringify({sourcePath:t.path,syncAnnotationsToSource:this.settings.syncAnnotationsToSource,text:o}))}<\/script>`}createAnnotationDataScript(t){return`<script type="application/json" id="notes-to-html-pages-annotations">${this.escapeJsonScript(JSON.stringify(t))}<\/script>`}extractAnnotations(t){var o;let u=(o=t.match(ue))==null?void 0:o[0];if(!u)return[];let r=u.match(Qr);if(!r)return[];try{let a=r[1].trim(),i=/%[0-9a-f]{2}/i.test(a)?decodeURIComponent(a):a,c=JSON.parse(i);if(!Array.isArray(c))return[];let s=[];for(let l of c)this.isHtmlAnnotation(l)&&s.push(this.normalizeAnnotation(l,l.sourcePath));return s}catch(a){return console.warn("Notes to HTML Pages could not parse saved annotations.",a),[]}}removeAnnotationsBlock(t){return t.replace(ue,"").replace(/\n{3,}/g,`

`)}isHtmlAnnotation(t){return this.isRecord(t)&&typeof t.id=="string"&&typeof t.selectedText=="string"&&typeof t.note=="string"&&typeof t.createdAt=="string"&&(typeof t.sourcePath=="undefined"||typeof t.sourcePath=="string")}normalizeAnnotation(t,u){return{id:t.id.trim()||`annotation-${Date.now()}`,selectedText:this.compactText(t.selectedText).slice(0,2e3),note:this.compactText(t.note).slice(0,2e3),createdAt:t.createdAt||new Date().toISOString(),sourcePath:u||t.sourcePath}}createAnnotationsMarkdownBlock(t,u){let r=u==="zh"?"## HTML \u9875\u9762\u6279\u6CE8":"## HTML Page Annotations",o=this.tForLanguage(u,"annotationQuoteLabel"),a=this.tForLanguage(u,"annotationNoteLabel"),i=t.map(s=>{let l=[`- **${this.formatAnnotationDate(s.createdAt)}**`,`  - ${o}: ==${this.escapeAnnotationMarkdown(s.selectedText)}==`];return s.note&&l.push(`  - ${a}: ${this.escapeAnnotationMarkdown(s.note)}`),l.push(`  - ID: \`${this.escapeMarkdownCode(s.id)}\``),l.join(`
`)}).join(`
`),c=encodeURIComponent(JSON.stringify(t,null,2));return[Yr,r,"",i,"",`<!-- notes-to-html-pages-annotations:data
${c}
notes-to-html-pages-annotations:data-end -->`,Kr].join(`
`)}sanitizeGeneratedBody(t){Array.from(t.querySelectorAll("script")).forEach(u=>u.remove()),Array.from(t.querySelectorAll("*")).forEach(u=>{Array.from(u.attributes).forEach(r=>{let o=r.name.toLowerCase(),a=r.value.trim();(o.startsWith("on")||["href","src","xlink:href"].includes(o)&&/^javascript:/i.test(a))&&u.removeAttribute(r.name)})})}formatAnnotationDate(t){let u=new Date(t);if(Number.isNaN(u.getTime()))return t;let r=o=>String(o).padStart(2,"0");return[`${u.getFullYear()}-${r(u.getMonth()+1)}-${r(u.getDate())}`,`${r(u.getHours())}:${r(u.getMinutes())}`].join(" ")}compactText(t){return t.replace(/\s+/g," ").trim()}escapeAnnotationMarkdown(t){return this.compactText(t).replace(/\\/g,"\\\\").replace(/`/g,"'").replace(/\[/g,"\\[").replace(/]/g,"\\]").replace(/==/g,"=")}escapeMarkdownCode(t){return t.replace(/`/g,"'")}escapeJsonScript(t){return t.replace(/</g,"\\u003c").replace(/>/g,"\\u003e").replace(/&/g,"\\u0026").replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}buildStyledBody(t,u,r,o){var f;if(!(r==="clean"||r==="claude")||typeof DOMParser=="undefined")return`<article class="article-body">${t}</article>`;let c=new DOMParser().parseFromString(`<main>${t}</main>`,"text/html").querySelector("main");if(!c)return`<article class="article-body">${t}</article>`;let s=c.querySelector("h1"),l=((f=s==null?void 0:s.textContent)==null?void 0:f.trim())||u;s==null||s.remove();let d="",h=this.getFirstContentElement(c);(h==null?void 0:h.tagName)==="BLOCKQUOTE"&&(d=h.innerHTML,h.remove()),this.removeLeadingHr(c),this.removeLeadingManualToc(c),this.normalizeSectionHeadings(c),this.enhanceReadableBlocks(c,o),this.sanitizeGeneratedBody(c);let p=this.createAutoToc(c,o);return[this.createArticleHero(l,d),p,`<article class="article-body">${c.innerHTML}</article>`].filter(Boolean).join(`
`)}createArticleHero(t,u){let{primary:r,secondary:o}=this.splitHeroTitle(t),a=u?`<div class="article-deck">${u}</div>`:"";return['<header class="article-hero">',`<h1><span>${this.escapeHtml(r)}</span>${o?`<span>${this.escapeHtml(o)}</span>`:""}</h1>`,a,'<div class="hero-rule" aria-hidden="true"></div>',"</header>"].join(`
`)}splitHeroTitle(t){let u=t.split(/\s+[·|｜]\s+|\s*[·|｜]\s*/u).map(r=>r.trim()).filter(Boolean);return u.length>=2&&t.length<=80?{primary:u[0],secondary:u.slice(1).join(" \xB7 ")}:{primary:t,secondary:null}}createAutoToc(t,u){let r=Array.from(t.querySelectorAll("h2")).filter(s=>!this.isTocHeading(s));if(r.length<2)return"";let o=new Map,a=r.map(s=>{var p;let l=((p=s.textContent)==null?void 0:p.trim())||this.tForLanguage(u,"untitledSection"),h=s.getAttribute("id")||this.createUniqueHeadingId(l,o);return s.setAttribute("id",h),`<li><a href="#${this.escapeHtml(h)}">${this.escapeHtml(this.cleanTocLabel(l))}</a></li>`}),i=this.tForLanguage(u,"toc"),c=this.tForLanguage(u,"sectionTocAria");return[`<nav class="table-of-contents" aria-label="${this.escapeHtml(i)}">`,`<h2>${this.escapeHtml(i)}</h2>`,"<ol>",a.join(`
`),"</ol>","</nav>",`<aside class="side-table-of-contents" aria-label="${this.escapeHtml(c)}">`,`<div class="side-toc-title">${this.escapeHtml(i)}</div>`,"<ol>",a.join(`
`),"</ol>","</aside>"].join(`
`)}removeLeadingManualToc(t){let u=this.getFirstContentElement(t);if(!u||!this.isTocHeading(u))return;let r=u.nextElementSibling;for(u.remove();r&&!/^H[12]$/.test(r.tagName);){let o=r;r=r.nextElementSibling,o.remove()}}removeLeadingHr(t){let u=this.getFirstContentElement(t);(u==null?void 0:u.tagName)==="HR"&&u.remove()}normalizeSectionHeadings(t){Array.from(t.querySelectorAll("h2")).forEach(u=>{var a,i;if(this.isTocHeading(u))return;let r=(i=(a=u.textContent)==null?void 0:a.trim())!=null?i:"",o=this.cleanSectionPrefix(r);o&&o!==r&&(u.textContent=o)})}enhanceReadableBlocks(t,u){this.enhanceBlockquotes(t),this.enhanceCodeFigures(t,u),this.enhanceTables(t)}enhanceBlockquotes(t){Array.from(t.querySelectorAll("blockquote")).forEach(u=>{var i,c;let r=this.getBlockquoteLabel(u),o=(c=(i=u.textContent)==null?void 0:i.trim())!=null?c:"",a=this.getBlockquoteKind(r,o);u.classList.add("readable-blockquote"),r&&u.setAttribute("data-label",r),a==="conclusion"?u.classList.add("callout-block","callout-conclusion"):a==="highlight"?u.classList.add("callout-block","callout-highlight"):u.classList.add("quote-block")})}getBlockquoteLabel(t){var r,o,a;let u=(r=t.querySelector("p:first-child strong:first-child"))!=null?r:t.querySelector("strong:first-child");return(a=(o=u==null?void 0:u.textContent)==null?void 0:o.trim())!=null?a:""}getBlockquoteKind(t,u){let r=`${t} ${u.slice(0,80)}`.toLowerCase();return/(结论|总结|小结|结语|最终判断|takeaway|conclusion|summary|final)/i.test(r)?"conclusion":/(重点|要点|提示|注意|关键|核心|观察|洞察|提醒|important|note|tip|warning|info|insight)/i.test(r)?"highlight":"quote"}enhanceCodeFigures(t,u){Array.from(t.querySelectorAll("pre")).forEach(r=>{var i;let o=(i=r.textContent)!=null?i:"",a=this.looksLikeAsciiFigure(o);r.classList.add("code-figure"),a&&r.classList.add("ascii-figure"),r.setAttribute("data-label",a?this.tForLanguage(u,"asciiFigureLabel"):this.tForLanguage(u,"codeLabel"))})}enhanceTables(t){Array.from(t.querySelectorAll("table")).forEach(u=>{var o;if((o=u.parentElement)!=null&&o.classList.contains("table-scroll"))return;let r=u.ownerDocument.createElement("div");r.className="table-scroll",u.replaceWith(r),r.appendChild(u)})}looksLikeAsciiFigure(t){return t.split(/\r?\n/).filter(r=>r.trim().length>0).length<3?!1:/[┌┐└┘├┤┬┴┼│─━┃╭╮╰╯→←↑↓▼▲]|(?:-{2,}>|={2,}>|\|[\s\S]*\||\+-{2,}\+)/.test(t)}getFirstContentElement(t){var u;return(u=Array.from(t.children).find(r=>{var o;return r.tagName==="HR"||!!((o=r.textContent)!=null&&o.trim())}))!=null?u:null}isTocHeading(t){var u,r;return/^H[1-6]$/.test(t.tagName)&&/^目录|toc$/i.test((r=(u=t.textContent)==null?void 0:u.trim())!=null?r:"")}createUniqueHeadingId(t,u){var a;let r=this.slugify(t),o=(a=u.get(r))!=null?a:0;return u.set(r,o+1),o===0?r:`${r}-${o+1}`}cleanTocLabel(t){return this.cleanSectionPrefix(t)}cleanSectionPrefix(t){return t.replace(/^(?:第[一二三四五六七八九十百千万\d]+[层章节部分篇讲课节讲]*|[一二三四五六七八九十百千万]+|[0-9]{1,2})[：:、.．\s-]+/u,"").trim()||t}stripFrontmatter(t){let u=t.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);if(!u)return{content:t,frontmatterTitle:null};let o=u[1].match(/^title:\s*["']?(.+?)["']?\s*$/m);return{content:t.slice(u[0].length),frontmatterTitle:o?o[1].trim():null}}async prepareMarkdown(t,u){let r=t.replace(/%%[\s\S]*?%%/g,"");return this.transformOutsideFences(r,async o=>{let a=this.convertCalloutMarker(o);return a=await this.convertObsidianEmbeds(a,u),a=await this.convertMarkdownImages(a,u),a=this.convertWikilinks(a),a})}async transformOutsideFences(t,u){let r=t.split(/\r?\n/),o=[],a=!1,i=null,c=0;for(let s of r){let l=s.match(/^\s*(`{3,}|~{3,})/);if(l){let d=l[1],h=d[0];a?i===h&&d.length>=c&&(a=!1,i=null,c=0):(a=!0,i=h,c=d.length),o.push(s);continue}o.push(a?s:await u(s))}return o.join(`
`)}convertCalloutMarker(t){return t.replace(/^(\s*>+\s*)\[!([^\]]+)\][+-]?\s*(.*)$/i,(u,r,o,a)=>{let i=a.trim()||this.titleCase(o.replace(/[-_]/g," "));return`${r}**${this.escapeMarkdownText(i)}**`})}async convertObsidianEmbeds(t,u){return this.replaceAsync(t,/!\[\[([^\]]+)]]/g,async(r,o)=>{let{target:a,alias:i}=this.parseObsidianLink(o),c=this.resolveLinkedFile(a,u),s=i||a;if(c&&this.isImageFile(c)){let l=this.settings.embedLocalImages?await this.fileToDataUri(c):this.getRelativePath(u.path,c.path);return`![${this.escapeMarkdownText(s)}](${l})`}return c&&c.extension==="md"?`[${this.escapeMarkdownText(s)}](${this.obsidianTargetToHtmlHref(a)})`:`**${this.escapeMarkdownText(s)}**`})}async convertMarkdownImages(t,u){return this.settings.embedLocalImages?this.replaceAsync(t,/!\[([^\]]*)]\(([^)\s]+)\)/g,async(r,o,a)=>{if(this.isRemoteOrDataUri(a))return r;let i=a.replace(/^<|>$/g,""),c=this.resolveLinkedFile(decodeURIComponent(i),u);if(!c||!this.isImageFile(c))return r;let s=await this.fileToDataUri(c);return`![${this.escapeMarkdownText(o)}](${s})`}):t}convertWikilinks(t){return t.replace(/(^|[^!])\[\[([^\]]+)]]/g,(u,r,o)=>{let{target:a,alias:i}=this.parseObsidianLink(o),c=i||this.getDisplayTextFromTarget(a);return this.settings.linkWikilinksToHtml?`${r}[${this.escapeMarkdownText(c)}](${this.obsidianTargetToHtmlHref(a)})`:`${r}${this.escapeMarkdownText(c)}`})}parseObsidianLink(t){let[u,...r]=t.split("|"),o=r.length>0?r.join("|").trim():null;return{target:u.trim(),alias:o}}resolveLinkedFile(t,u){let r=t.split("#")[0].split("^")[0].trim();if(!r)return null;let o=this.app.metadataCache.getFirstLinkpathDest(r,u.path);return o instanceof m.TFile?o:null}obsidianTargetToHtmlHref(t){let[u,r]=t.split("#"),o=u.split("^")[0].trim(),a=r==null?void 0:r.split("^")[0].trim(),i=o?o.replace(/\.md$/i,"")+".html":"",c=a?`#${this.slugify(a)}`:"";return`${encodeURI(i)}${c}`}getDisplayTextFromTarget(t){var i;let u=t.split("^")[0],r=u.split("#")[1],a=((i=u.split("#")[0].split("/").pop())==null?void 0:i.replace(/\.md$/i,""))||t;return(r==null?void 0:r.trim())||a.trim()}getOutputPaths(t){var a;let u=this.getOutputPath(t,"html"),r=this.getOutputPath(t,"md"),o=u.substring(0,u.lastIndexOf("/"));return{htmlPath:u,launcherPath:r,outputFolder:o,htmlFileName:(a=u.split("/").pop())!=null?a:`${this.cleanFileName(t.basename)}.html`,htmlWikiTarget:u,launcherWikiTarget:r.replace(/\.md$/i,"")}}getOutputPath(t,u){var i;let r=this.cleanVaultPath(this.settings.exportFolder||"HTML Pages"),o=this.settings.preserveFolderStructure&&((i=t.parent)!=null&&i.path)?t.parent.path:"",a=`${this.cleanFileName(t.basename)}.${u}`;return(0,m.normalizePath)([r,o,a].filter(Boolean).join("/"))}isInsideExportFolder(t){let u=this.cleanVaultPath(this.settings.exportFolder||"HTML Pages");return t===u||t.startsWith(`${u}/`)}cleanVaultPath(t){return(0,m.normalizePath)(t.trim().replace(/^\/+|\/+$/g,""))}cleanFileName(t){return Array.from(t,r=>Jr.has(r)||r.charCodeAt(0)<32?"-":r).join("").trim()||"untitled"}async ensureFolder(t){let u=this.cleanVaultPath(t);if(!u)return;let r=u.split("/"),o="";for(let a of r)o=o?`${o}/${a}`:a,await this.app.vault.adapter.exists(o)||await this.app.vault.adapter.mkdir(o)}async writeTextFile(t,u){let r=this.app.vault.getAbstractFileByPath(t);if(r instanceof m.TFile){await this.app.vault.modify(r,u);return}if(await this.app.vault.adapter.exists(t)){await this.app.vault.adapter.write(t,u);return}if(t.endsWith(".md")){await this.app.vault.create(t,u);return}await this.app.vault.adapter.write(t,u)}createLauncherNote(t,u,r){var c;let o=t.path.replace(/\.md$/i,""),a=(c=this.getFileUri(r.htmlPath))!=null?c:encodeURI(r.htmlFileName),i=new Date().toISOString();return["---","readable_html_exporter: true",`source: "${this.escapeYamlValue(t.path)}"`,`html: "${this.escapeYamlValue(r.htmlPath)}"`,`updated: "${i}"`,"---","",`# ${this.escapeMarkdownHeading(u)}`,"",`[${this.t("launcherOpenInBrowser")}](${a})`,"",`${this.t("launcherHtmlFile")}\uFF1A\`${r.htmlFileName}\``,"",`${this.t("launcherSourceNote")}\uFF1A[[${o}|${this.escapeMarkdownText(t.basename)}]]`].join(`
`)}async upsertSourceLink(t,u){let r=await this.app.vault.read(t),o=this.removeSourceLinkBlock(r),a=`> ${this.t("sourceLinkLabel")}: [[${u}|${this.t("sourceLinkAlias")}]]`,i=this.insertAfterFrontmatter(o,a);i!==r&&await this.app.vault.modify(t,i)}removeSourceLinkBlock(t){return t.replace(Xr,"")}insertAfterFrontmatter(t,u){let r=`${u}

`,o=t.match(/^---\s*\r?\n[\s\S]*?\r?\n---\s*(?:\r?\n|$)/);if(!o)return`${r}${t.replace(/^\s*\n/,"")}`;let a=o[0].replace(/\s*$/,`
`),i=t.slice(o[0].length).replace(/^\s*\n/,"");return`${a}${r}${i}`}getFileUri(t){if(!(this.app.vault.adapter instanceof m.FileSystemAdapter))return null;let u=(0,m.normalizePath)(this.app.vault.adapter.getBasePath()),o=(0,m.normalizePath)(`${u}/${t}`).replace(/\\/g,"/"),a=o.split("/").map(i=>encodeURIComponent(i)).join("/").replace(/^([A-Za-z])%3A/,"$1:");return/^[A-Za-z]:\//.test(o)?`file:///${a}`:`file://${a}`}async fileToDataUri(t){let u=await this.app.vault.readBinary(t);return`data:${this.getMimeType(t.extension)};base64,${this.arrayBufferToBase64(u)}`}arrayBufferToBase64(t){let u=new Uint8Array(t),r=32768,o="";for(let a=0;a<u.length;a+=r)o+=String.fromCharCode(...u.subarray(a,a+r));return btoa(o)}isImageFile(t){return["apng","avif","gif","jpg","jpeg","png","svg","webp"].includes(t.extension.toLowerCase())}getMimeType(t){var o;let u=t.toLowerCase();return(o={apng:"image/apng",avif:"image/avif",gif:"image/gif",jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",svg:"image/svg+xml",webp:"image/webp"}[u])!=null?o:"application/octet-stream"}isRemoteOrDataUri(t){return/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(t)}getRelativePath(t,u){let r=t.split("/").slice(0,-1),o=u.split("/"),a=0;for(;a<r.length&&a<o.length&&r[a]===o[a];)a+=1;let i=r.slice(a).map(()=>".."),c=o.slice(a);return encodeURI([...i,...c].join("/")||u)}findFirstHeading(t){let u=t.match(/^#\s+(.+?)\s*#*\s*$/m);return u?this.stripMarkdownInline(u[1]):null}hasTopLevelHeading(t){return/^#\s+.+$/m.test(t)}stripMarkdownInline(t){return t.replace(/`([^`]+)`/g,"$1").replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*]+)\*/g,"$1").replace(/__([^_]+)__/g,"$1").replace(/_([^_]+)_/g,"$1").replace(/\[([^\]]+)]\([^)]+\)/g,"$1").replace(/#+$/g,"").trim()}titleCase(t){return t.replace(/\b\w/g,u=>u.toUpperCase())}slugify(t){return t.toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu,"").replace(/\s+/g,"-").replace(/-+/g,"-").slice(0,80)||"section"}escapeHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}escapeMarkdownText(t){return t.replace(/\\/g,"\\\\").split("[").join("\\[").split("]").join("\\]")}escapeMarkdownHeading(t){return t.replace(/\r?\n/g," ").trim()||this.t("fallbackHtmlPage")}escapeYamlValue(t){return t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}async replaceAsync(t,u,r){let o=Array.from(t.matchAll(u));if(o.length===0)return t;let a=await Promise.all(o.map(s=>r(...s))),i="",c=0;return o.forEach((s,l)=>{var d;i+=t.slice(c,s.index),i+=a[l],c=((d=s.index)!=null?d:0)+s[0].length}),i+t.slice(c)}},Rt=class extends m.FileView{constructor(t,u){super(t);this.plugin=u;this.detachMessageListener=null}getViewType(){return zt}getDisplayText(){var t,u;return(u=(t=this.file)==null?void 0:t.basename)!=null?u:"Readable HTML"}async onLoadFile(t){var o;let u=await this.app.vault.cachedRead(t),r=this.createIframe();(o=this.detachMessageListener)==null||o.call(this),this.attachMessageListener(r),this.contentEl.empty(),this.contentEl.setAttr("style","height: 100%; padding: 0; overflow: hidden; background: var(--background-primary);"),this.contentEl.appendChild(r),r.srcdoc=this.injectBaseHref(u,this.getBaseHref(t.path))}async onUnloadFile(){var t;(t=this.detachMessageListener)==null||t.call(this),this.detachMessageListener=null,this.contentEl.empty()}createIframe(){let t=activeDocument.createElement("iframe");return t.setAttribute("title","Readable HTML"),t.setAttribute("sandbox","allow-scripts allow-popups allow-popups-to-escape-sandbox"),t.setAttribute("csp",["default-src 'none'","script-src 'unsafe-inline'","object-src 'none'","frame-src 'none'","style-src 'unsafe-inline'","img-src data: file: https: http:","font-src data: file:","media-src data: file:"].join("; ")),t.setAttr("style","width: 100%; height: 100%; border: 0; display: block; background: white;"),t}attachMessageListener(t){let u=r=>{if(r.source!==t.contentWindow)return;let o=r.data;this.isAnnotationMessage(o)&&this.handleAnnotationMessage(o)};activeWindow.addEventListener("message",u),this.detachMessageListener=()=>activeWindow.removeEventListener("message",u)}async handleAnnotationMessage(t){if(this.plugin.settings.syncAnnotationsToSource)try{if(t.type==="annotation-created"){if(!t.annotation.sourcePath)return;await this.plugin.syncAnnotationToSource(t.annotation.sourcePath,t.annotation),new m.Notice(this.plugin.t("annotationSyncedNotice"));return}await this.plugin.deleteAnnotationFromSource(t.sourcePath,t.annotationId),new m.Notice(this.plugin.t("annotationDeletedNotice"))}catch(u){console.error(u),new m.Notice(this.plugin.t(t.type==="annotation-deleted"?"annotationDeleteFailedNotice":"annotationSyncFailedNotice"))}}isAnnotationMessage(t){return!this.isRecord(t)||t.plugin!=="notes-to-html-pages"?!1:t.type==="annotation-created"?this.isAnnotationPayload(t.annotation):t.type==="annotation-deleted"&&typeof t.annotationId=="string"&&typeof t.sourcePath=="string"}isAnnotationPayload(t){return this.isRecord(t)&&typeof t.id=="string"&&typeof t.selectedText=="string"&&typeof t.note=="string"&&typeof t.createdAt=="string"&&(typeof t.sourcePath=="undefined"||typeof t.sourcePath=="string")}isRecord(t){return typeof t=="object"&&t!==null&&!Array.isArray(t)}injectBaseHref(t,u){if(!u)return t;let o=new DOMParser().parseFromString(t,"text/html"),a=o.head;a||(a=o.createElement("head"),o.documentElement.prepend(a));let i=a.querySelector("base");if(i)i.setAttribute("href",u);else{let c=o.createElement("base");c.setAttribute("href",u),a.prepend(c)}return this.preserveSrcdocFragmentLinks(o),`<!doctype html>
${o.documentElement.outerHTML}`}preserveSrcdocFragmentLinks(t){t.querySelectorAll('a[href^="#"]').forEach(u=>{let r=u.getAttribute("href");r&&r!=="#"&&u.setAttribute("href",`about:srcdoc${r}`)})}getBaseHref(t){if(!(this.app.vault.adapter instanceof m.FileSystemAdapter))return null;let u=(0,m.normalizePath)(this.app.vault.adapter.getBasePath()),r=t.split("/").slice(0,-1).join("/"),o=(0,m.normalizePath)([u,r].filter(Boolean).join("/"));return`${this.pathToFileUri(o)}/`}pathToFileUri(t){let u=t.replace(/\\/g,"/"),r=u.split("/").map(o=>encodeURIComponent(o)).join("/").replace(/^([A-Za-z])%3A/,"$1:");return/^[A-Za-z]:\//.test(u)?`file:///${r}`:`file://${r}`}},Ht=class extends m.PluginSettingTab{constructor(t,u){super(t,u);this.plugin=u}display(){this.renderSettings()}renderSettings(){let{containerEl:t}=this;t.empty(),new m.Setting(t).setName(this.plugin.t("settingsTitle")).setHeading(),new m.Setting(t).setName(this.plugin.t("settingLanguageName")).setDesc(this.plugin.t("settingLanguageDesc")).addDropdown(u=>{u.addOption("zh",this.plugin.t("languageChinese")).addOption("en",this.plugin.t("languageEnglish")).setValue(this.plugin.getInterfaceLanguage()).onChange(async r=>{this.plugin.settings.interfaceLanguage=r==="en"?"en":"zh",await this.plugin.saveSettings(),new m.Notice(this.plugin.t("noticeReloadRequired")),this.renderSettings()})}),new m.Setting(t).setName(this.plugin.t("settingExportFolderName")).setDesc(this.plugin.t("settingExportFolderDesc")).addText(u=>u.setPlaceholder("HTML Pages").setValue(this.plugin.settings.exportFolder).onChange(async r=>{this.plugin.settings.exportFolder=r.trim()||qt.exportFolder,await this.plugin.saveSettings()})),new m.Setting(t).setName(this.plugin.t("settingStyleName")).setDesc(this.plugin.t("settingStyleDesc")).addDropdown(u=>{Object.keys(Pt).forEach(r=>{u.addOption(r,this.plugin.getStyleLabel(r))}),u.setValue(this.plugin.settings.stylePreset).onChange(async r=>{this.plugin.settings.stylePreset=r,await this.plugin.saveSettings()})}),new m.Setting(t).setName(this.plugin.t("settingWebFontName")).setDesc(this.plugin.t("settingWebFontDesc")).addText(u=>{u.setPlaceholder(this.plugin.t("settingCustomFontPlaceholder")).setValue(this.plugin.settings.customFontFamily).onChange(async r=>{this.plugin.settings.customFontFamily=r,await this.plugin.saveSettings()})}),new m.Setting(t).setName(this.plugin.t("settingFontSizeName")).setDesc(this.plugin.t("settingFontSizeDesc")).addDropdown(u=>{u.addOption("small",this.plugin.t("fontSizeSmall")),u.addOption("default",this.plugin.t("fontSizeDefault")),u.addOption("large",this.plugin.t("fontSizeLarge")),u.addOption("xlarge",this.plugin.t("fontSizeXLarge")),u.setValue(this.plugin.settings.fontScale).onChange(async r=>{this.plugin.settings.fontScale=r,await this.plugin.saveSettings()})}),new m.Setting(t).setName(this.plugin.t("settingPreserveFoldersName")).setDesc(this.plugin.t("settingPreserveFoldersDesc")).addToggle(u=>u.setValue(this.plugin.settings.preserveFolderStructure).onChange(async r=>{this.plugin.settings.preserveFolderStructure=r,await this.plugin.saveSettings()})),new m.Setting(t).setName(this.plugin.t("settingAddTitleName")).setDesc(this.plugin.t("settingAddTitleDesc")).addToggle(u=>u.setValue(this.plugin.settings.addTitleFromFilename).onChange(async r=>{this.plugin.settings.addTitleFromFilename=r,await this.plugin.saveSettings()})),new m.Setting(t).setName(this.plugin.t("settingWikilinksName")).setDesc(this.plugin.t("settingWikilinksDesc")).addToggle(u=>u.setValue(this.plugin.settings.linkWikilinksToHtml).onChange(async r=>{this.plugin.settings.linkWikilinksToHtml=r,await this.plugin.saveSettings()})),new m.Setting(t).setName(this.plugin.t("settingOpenHtmlName")).setDesc(this.plugin.t("settingOpenHtmlDesc")).addToggle(u=>u.setValue(this.plugin.settings.openHtmlInObsidian).onChange(async r=>{this.plugin.settings.openHtmlInObsidian=r,await this.plugin.saveSettings(),new m.Notice(this.plugin.t("noticeReloadRequired"))})),new m.Setting(t).setName(this.plugin.t("settingLauncherName")).setDesc(this.plugin.t("settingLauncherDesc")).addToggle(u=>u.setValue(this.plugin.settings.createLauncherNote).onChange(async r=>{this.plugin.settings.createLauncherNote=r,await this.plugin.saveSettings()})),new m.Setting(t).setName(this.plugin.t("settingInsertLinkName")).setDesc(this.plugin.t("settingInsertLinkDesc")).addToggle(u=>u.setValue(this.plugin.settings.insertLinkInSource).onChange(async r=>{this.plugin.settings.insertLinkInSource=r,await this.plugin.saveSettings()})),new m.Setting(t).setName(this.plugin.t("settingSyncAnnotationsName")).setDesc(this.plugin.t("settingSyncAnnotationsDesc")).addToggle(u=>u.setValue(this.plugin.settings.syncAnnotationsToSource).onChange(async r=>{this.plugin.settings.syncAnnotationsToSource=r,await this.plugin.saveSettings()})),new m.Setting(t).setName(this.plugin.t("settingEmbedImagesName")).setDesc(this.plugin.t("settingEmbedImagesDesc")).addToggle(u=>u.setValue(this.plugin.settings.embedLocalImages).onChange(async r=>{this.plugin.settings.embedLocalImages=r,await this.plugin.saveSettings()}))}},eo=`
(() => {
	"use strict";

	const config = readJson("notes-to-html-pages-config", {});
	const savedAnnotations = readJson("notes-to-html-pages-annotations", []);
	const text = Object.assign(
		{
			annotationToolbarUnderline: "Underline",
			annotationInlinePlaceholder: "Write a note here...",
			annotationInlineSave: "Save note",
			annotationComposerSave: "Save",
			annotationDelete: "Delete",
			annotationPanelTitle: "Annotations",
			annotationCardPlaceholder: "Add a note...",
			annotationSyncDisabled: "Saved in this page only"
		},
		config.text || {}
	);
	const article = document.querySelector(".article-body");
	if (!article) return;

	const state = {
		range: null,
		annotations: []
	};
	const popover = createPopover();
	const panel = createPanel();

	document.body.append(popover, panel);
	window.addEventListener("resize", () => {
		scheduleAnnotationLayout();
		if (!usesInlineAnnotations()) {
			closeInlineAnnotations();
		}
	});
	if (document.fonts && document.fonts.ready) {
		document.fonts.ready.then(scheduleAnnotationLayout);
		}
	document.addEventListener("mouseup", (event) => {
		if (isInsideAnnotationUi(event.target)) {
			return;
		}
		window.setTimeout(updateSelectionUi, 0);
	});
	document.addEventListener("keyup", (event) => {
		if (event.key === "Escape") {
			hidePopover();
			return;
		}
		if (isEditableTarget(event.target)) {
			return;
		}
		window.setTimeout(updateSelectionUi, 0);
	});
	document.addEventListener("mousedown", (event) => {
		const target = event.target;
		if (popover.contains(target) || isEditableTarget(target)) {
			return;
		}
		cancelAnnotationEditors();
		if (target instanceof Node && !article.contains(target) && !panel.contains(target)) {
			hidePopover();
		}
	});

	for (const annotation of Array.isArray(savedAnnotations) ? savedAnnotations : []) {
		if (isAnnotation(annotation)) {
			addAnnotation(annotation, true);
		}
	}
	updatePanelVisibility();
	scheduleAnnotationLayout();

	function readJson(id, fallback) {
		const element = document.getElementById(id);
		if (!element || !element.textContent) return fallback;
		try {
			return JSON.parse(element.textContent);
		} catch (_error) {
			return fallback;
		}
	}

	function isInsideAnnotationUi(target) {
		return target instanceof Node && (popover.contains(target) || panel.contains(target));
	}

	function isEditableTarget(target) {
		return target instanceof Element && Boolean(target.closest("input, textarea, button"));
	}

	function createPopover() {
		const element = document.createElement("div");
		element.className = "annotation-popover";
		element.hidden = true;

		const actions = document.createElement("div");
		actions.className = "annotation-popover-actions";

		const underline = document.createElement("button");
		underline.type = "button";
		underline.className = "annotation-underline-button";
		underline.textContent = text.annotationToolbarUnderline;
		underline.addEventListener("click", () => saveCurrentAnnotation(""));
		actions.append(underline);

		const noteRow = document.createElement("div");
		noteRow.className = "annotation-note-row";

		const input = document.createElement("input");
		input.type = "text";
		input.className = "annotation-note-input";
		input.placeholder = text.annotationInlinePlaceholder;
		input.setAttribute("aria-label", text.annotationInlinePlaceholder);
		input.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				saveCurrentAnnotation(input.value);
			}
		});

		const save = document.createElement("button");
		save.type = "button";
		save.className = "annotation-mini-save";
		save.textContent = text.annotationInlineSave;
		save.addEventListener("click", () => saveCurrentAnnotation(input.value));

		noteRow.append(input, save);
		element.append(actions, noteRow);
		return element;
	}

	function createPanel() {
		const element = document.createElement("aside");
		element.className = "annotation-panel";
		element.hidden = true;

		const title = document.createElement("div");
		title.className = "annotation-panel-title";
		title.textContent = text.annotationPanelTitle;

		const list = document.createElement("div");
		list.className = "annotation-list";

		element.append(title, list);
		return element;
	}

	function updateSelectionUi() {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
			hidePopover();
			return;
		}

		const range = selection.getRangeAt(0);
		const selectedText = compactText(range.toString());
		if (!selectedText || !article.contains(range.startContainer) || !article.contains(range.endContainer)) {
			hidePopover();
			return;
		}

		const rect = getRangeAnchorRect(range);
		if (!rect) {
			hidePopover();
			return;
		}

		state.range = range.cloneRange();
		positionPopover(rect);
		const input = popover.querySelector(".annotation-note-input");
		if (input) input.value = "";
		popover.hidden = false;
	}

	function getRangeAnchorRect(range) {
		const rects = Array.from(range.getClientRects()).filter((rect) => rect.width && rect.height);
		return rects[rects.length - 1] || null;
	}

	function positionPopover(rect) {
		popover.style.left = "0px";
		popover.style.top = "0px";
		const width = popover.offsetWidth || 280;
		const left = Math.min(
			window.scrollX + window.innerWidth - width - 14,
			Math.max(14 + window.scrollX, window.scrollX + rect.left)
		);
		const top = window.scrollY + rect.bottom + 8;
		popover.style.left = left + "px";
		popover.style.top = top + "px";
	}

	function hidePopover() {
		popover.hidden = true;
	}

	function saveCurrentAnnotation(note) {
		if (!state.range) return;

		const selectedText = compactText(state.range.toString());
		if (!selectedText) return;

		const annotation = {
			id: "ntoh-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 8),
			selectedText,
			note: compactText(note),
			createdAt: new Date().toISOString(),
			sourcePath: typeof config.sourcePath === "string" ? config.sourcePath : ""
		};

		addAnnotation(annotation, false);
		hidePopover();
		const selection = window.getSelection();
		if (selection) selection.removeAllRanges();
		state.range = null;
	}

	function addAnnotation(annotation, fromSaved) {
		const normalized = {
			id: String(annotation.id || ""),
			selectedText: compactText(String(annotation.selectedText || "")),
			note: compactText(String(annotation.note || "")),
			createdAt: String(annotation.createdAt || new Date().toISOString()),
			sourcePath: String(annotation.sourcePath || config.sourcePath || "")
		};
		if (!normalized.id || !normalized.selectedText) return;

		const marked = markAnnotation(normalized, fromSaved);
		state.annotations.push(normalized);
		const annotationIndex = state.annotations.length;
		renderAnnotationCard(normalized, annotationIndex, marked);
		renderInlineAnnotation(normalized, annotationIndex, marked);
		updatePanelVisibility();
		scheduleAnnotationLayout();

		if (!fromSaved) {
			syncAnnotation(normalized);
		}
	}

	function markAnnotation(annotation, fromSaved) {
		const range = fromSaved ? findTextRange(article, annotation.selectedText) : state.range;
		if (!range) return false;
		return wrapRangeWithMarks(range, annotation);
	}

	function wrapRangeWithMarks(range, annotation) {
		const nodes = getTextNodesInRange(range);
		if (nodes.length === 0) return false;

		for (const item of nodes.reverse()) {
			const mark = createMark(annotation);
			const segmentRange = document.createRange();
			try {
				segmentRange.setStart(item.node, item.start);
				segmentRange.setEnd(item.node, item.end);
				segmentRange.surroundContents(mark);
			} catch (_error) {
				continue;
			}
		}

		return true;
	}

	function getTextNodesInRange(range) {
		const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
			acceptNode(node) {
				if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
				if (node.parentElement && node.parentElement.closest(".annotation-inline-disclosure")) {
					return NodeFilter.FILTER_REJECT;
				}
				try {
					return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
				} catch (_error) {
					return NodeFilter.FILTER_REJECT;
				}
			}
		});
		const nodes = [];
		while (walker.nextNode()) {
			const node = walker.currentNode;
			const length = node.nodeValue ? node.nodeValue.length : 0;
			let start = node === range.startContainer ? range.startOffset : 0;
			let end = node === range.endContainer ? range.endOffset : length;
			start = Math.max(0, Math.min(start, length));
			end = Math.max(0, Math.min(end, length));
			if (start < end) {
				nodes.push({ node, start, end });
			}
		}
		return nodes;
	}

	function createMark(annotation) {
		const mark = document.createElement("mark");
		mark.className = "annotation-mark";
		mark.dataset.annotationId = annotation.id;
		if (annotation.note) mark.title = annotation.note;
		mark.addEventListener("click", () => {
			if (usesInlineAnnotations()) {
				toggleInlineAnnotation(annotation.id);
				return;
			}
			openAnnotationEditor(annotation.id);
		});
		mark.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			removeAnnotation(annotation);
		});
		return mark;
	}

	function usesInlineAnnotations() {
		return window.matchMedia("(max-width: 1023px)").matches;
	}

	function findTextRange(root, quote) {
		const needle = compactText(quote);
		if (!needle) return null;

		const map = [];
		let normalized = "";
		let lastWasSpace = false;
		const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

		while (walker.nextNode()) {
			const node = walker.currentNode;
			if (node.parentElement && node.parentElement.closest(".annotation-inline-disclosure")) {
				continue;
			}
			const value = node.nodeValue || "";
			for (let index = 0; index < value.length; index += 1) {
				const character = value[index];
				if (/\\s/.test(character)) {
					if (!lastWasSpace) {
						normalized += " ";
						map.push({ node, offset: index });
						lastWasSpace = true;
					}
				} else {
					normalized += character;
					map.push({ node, offset: index });
					lastWasSpace = false;
				}
			}
		}

		const startIndex = normalized.indexOf(needle);
		if (startIndex < 0) return null;
		const endIndex = startIndex + needle.length - 1;
		const startPoint = map[startIndex];
		const endPoint = map[endIndex];
		if (!startPoint || !endPoint) return null;

		const range = document.createRange();
		range.setStart(startPoint.node, startPoint.offset);
		range.setEnd(endPoint.node, endPoint.offset + 1);
		return range;
	}

	function renderAnnotationCard(annotation, index, marked) {
		const list = panel.querySelector(".annotation-list");
		if (!list) return;

		const card = document.createElement("div");
		card.tabIndex = 0;
		card.className = "annotation-card";
		card.classList.toggle("has-note", Boolean(annotation.note));
		card.dataset.annotationId = annotation.id;
		card.addEventListener("click", (event) => {
			const target = event.target;
			if (target instanceof Element && target.closest("textarea, button")) return;
			openAnnotationEditor(annotation.id);
		});
		card.addEventListener("keydown", (event) => {
			const target = event.target;
			if (target instanceof Element && target.closest("textarea, button")) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				openAnnotationEditor(annotation.id);
			}
		});
		card.addEventListener("contextmenu", (event) => {
			event.preventDefault();
			removeAnnotation(annotation);
		});

		const number = document.createElement("span");
		number.className = "annotation-number";
		number.textContent = String(index);

		const quote = document.createElement("p");
		quote.className = "annotation-quote";
		quote.textContent = annotation.selectedText;

		const body = document.createElement("div");
		body.className = "annotation-card-body";

		const note = document.createElement("p");
		note.className = "annotation-note";
		note.textContent = annotation.note;
		note.hidden = !annotation.note;

		const editor = document.createElement("div");
		editor.className = "annotation-card-editor";
		editor.hidden = true;

		const textarea = document.createElement("textarea");
		textarea.rows = 3;
		textarea.placeholder = text.annotationCardPlaceholder;
		textarea.setAttribute("aria-label", text.annotationCardPlaceholder);
		textarea.value = annotation.note;

		const save = document.createElement("button");
		save.type = "button";
		save.className = "annotation-card-save";
		save.textContent = text.annotationComposerSave;
		save.addEventListener("click", () => {
			annotation.note = compactText(textarea.value);
			note.textContent = annotation.note;
			note.hidden = !annotation.note;
			card.classList.toggle("has-note", Boolean(annotation.note));
			syncAnnotation(annotation);
			updateMarkTitles(annotation);
			editor.hidden = true;
			card.classList.remove("is-editing");
			scheduleAnnotationLayout();
		});

		const remove = document.createElement("button");
		remove.type = "button";
		remove.className = "annotation-card-delete";
		remove.textContent = text.annotationDelete;
		remove.addEventListener("click", () => removeAnnotation(annotation));

		const actions = document.createElement("div");
		actions.className = "annotation-card-actions";
		actions.append(remove, save);

		textarea.addEventListener("keydown", (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
				event.preventDefault();
				save.click();
			}
			if (event.key === "Escape") {
				event.preventDefault();
				cancelAnnotationEditors();
			}
		});

		editor.append(textarea, actions);
		body.append(number, quote, note, editor);
		card.append(body);

		if ((!config.syncAnnotationsToSource || !annotation.sourcePath) && !marked) {
			const status = document.createElement("div");
			status.className = "annotation-status";
			status.textContent = text.annotationSyncDisabled;
			body.append(status);
		}

		list.append(card);
	}

	function renderInlineAnnotation(annotation, index, marked) {
		if (!marked || !annotation.note) return;
		if (
			document.querySelector(
				'.annotation-inline-disclosure[data-annotation-id="' + cssEscape(annotation.id) + '"]'
			)
		) {
			return;
		}
		const marks = Array.from(
			document.querySelectorAll('.annotation-mark[data-annotation-id="' + cssEscape(annotation.id) + '"]')
		);
		const lastMark = marks[marks.length - 1];
		if (!lastMark) return;

		const disclosure = document.createElement("span");
		disclosure.className = "annotation-inline-disclosure";
		disclosure.dataset.annotationId = annotation.id;

		const trigger = document.createElement("button");
		trigger.type = "button";
		trigger.className = "annotation-inline-trigger";
		trigger.setAttribute("aria-expanded", "false");
		trigger.setAttribute("aria-label", text.annotationPanelTitle + " " + index);

		const icon = document.createElement("span");
		icon.className = "annotation-inline-icon";
		icon.setAttribute("aria-hidden", "true");

		const count = document.createElement("span");
		count.className = "annotation-inline-count";
		count.textContent = String(index);

		const content = document.createElement("span");
		content.className = "annotation-inline-content";
		content.hidden = true;

		const note = document.createElement("span");
		note.className = "annotation-inline-note";
		note.textContent = annotation.note;
		content.append(note);

		trigger.append(icon, count);
		trigger.addEventListener("click", (event) => {
			event.preventDefault();
			toggleInlineAnnotation(annotation.id);
		});
		disclosure.append(trigger, content);

		const paragraphEnd = findParagraphEnd(lastMark);
		if (paragraphEnd && paragraphEnd.node) {
			const range = document.createRange();
			range.setStart(paragraphEnd.node, paragraphEnd.offset);
			range.collapse(true);
			range.insertNode(disclosure);
			return;
		}

		lastMark.insertAdjacentElement("afterend", disclosure);
	}

	function findParagraphEnd(lastMark) {
		const block = lastMark.closest("p, li, blockquote");
		if (!block) return null;

		const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
			acceptNode(node) {
				return node.parentElement && node.parentElement.closest(".annotation-inline-disclosure")
					? NodeFilter.FILTER_REJECT
					: NodeFilter.FILTER_ACCEPT;
			}
		});
		const nodes = [];
		while (walker.nextNode()) {
			nodes.push(walker.currentNode);
		}

		const lastNode = nodes[nodes.length - 1];
		if (!lastNode || !lastNode.nodeValue) return null;
		return {
			node: lastNode,
			offset: lastNode.nodeValue.length
		};
	}

	function toggleInlineAnnotation(annotationId) {
		const disclosure = document.querySelector(
			'.annotation-inline-disclosure[data-annotation-id="' + cssEscape(annotationId) + '"]'
		);
		if (!disclosure) return;
		const content = disclosure.querySelector(".annotation-inline-content");
		const trigger = disclosure.querySelector(".annotation-inline-trigger");
		if (!content || !trigger) return;

		const shouldOpen = content.hidden;
		closeInlineAnnotations(disclosure);
		content.hidden = !shouldOpen;
		trigger.setAttribute("aria-expanded", String(shouldOpen));
		if (shouldOpen) {
			activateAnnotation(annotationId, false);
		}
	}

	function closeInlineAnnotations(exceptDisclosure) {
		document.querySelectorAll(".annotation-inline-content:not([hidden])").forEach((content) => {
			const disclosure = content.closest(".annotation-inline-disclosure");
			if (disclosure === exceptDisclosure) return;
			content.hidden = true;
			const trigger = disclosure ? disclosure.querySelector(".annotation-inline-trigger") : null;
			if (trigger) trigger.setAttribute("aria-expanded", "false");
		});
	}

	function removeAnnotation(annotation) {
		hidePopover();
		removeAnnotationMarks(annotation.id);
		state.annotations = state.annotations.filter((item) => item.id !== annotation.id);
		document
			.querySelectorAll('.annotation-inline-disclosure[data-annotation-id="' + cssEscape(annotation.id) + '"]')
			.forEach((disclosure) => disclosure.remove());
		const card = panel.querySelector('.annotation-card[data-annotation-id="' + cssEscape(annotation.id) + '"]');
		if (card) card.remove();
		updateAnnotationNumbers();
		updatePanelVisibility();
		syncAnnotationDeletion(annotation);
		scheduleAnnotationLayout();
	}

	function removeAnnotationMarks(annotationId) {
		document
			.querySelectorAll('.annotation-mark[data-annotation-id="' + cssEscape(annotationId) + '"]')
			.forEach((mark) => {
				const parent = mark.parentNode;
				mark.replaceWith(...Array.from(mark.childNodes));
				if (parent && typeof parent.normalize === "function") {
					parent.normalize();
				}
			});
	}

	function syncAnnotation(annotation) {
		if (!config.syncAnnotationsToSource || !annotation.sourcePath || !window.parent || window.parent === window) {
			return;
		}

		window.parent.postMessage(
			{
				plugin: "notes-to-html-pages",
				type: "annotation-created",
				annotation
			},
			"*"
		);
	}

	function syncAnnotationDeletion(annotation) {
		if (!config.syncAnnotationsToSource || !annotation.sourcePath || !window.parent || window.parent === window) {
			return;
		}

		window.parent.postMessage(
			{
				plugin: "notes-to-html-pages",
				type: "annotation-deleted",
				annotationId: annotation.id,
				sourcePath: annotation.sourcePath
			},
			"*"
		);
	}

	function scheduleAnnotationLayout() {
		window.requestAnimationFrame(positionAnnotationCards);
	}

	function positionAnnotationCards() {
		const cards = Array.from(panel.querySelectorAll(".annotation-card"));
		if (window.innerWidth < 1024) {
			cards.forEach((card) => {
				card.style.top = "";
			});
			const list = panel.querySelector(".annotation-list");
			if (list) list.style.height = "";
			return;
		}

		const list = panel.querySelector(".annotation-list");
		if (!list) return;
		const cardsWithAnchors = cards
			.map((card) => {
				const id = card.dataset.annotationId || "";
				const mark = document.querySelector('.annotation-mark[data-annotation-id="' + cssEscape(id) + '"]');
				const fallbackTop = article.getBoundingClientRect().top + window.scrollY;
				const anchorTop = mark
					? mark.getBoundingClientRect().top + window.scrollY + 12
					: Number(card.dataset.annotationTop || fallbackTop);
				card.dataset.annotationTop = String(anchorTop);
				return { card, anchorTop };
			})
			.sort((first, second) => first.anchorTop - second.anchorTop);

		let nextTop = 0;
		for (const item of cardsWithAnchors) {
			const top = Math.max(item.anchorTop, nextTop);
			item.card.style.top = Math.round(top) + "px";
			nextTop = top + item.card.offsetHeight + 10;
		}
		list.style.height = Math.ceil(nextTop) + "px";
	}

	function updateMarkTitles(annotation) {
		document
			.querySelectorAll('.annotation-mark[data-annotation-id="' + cssEscape(annotation.id) + '"]')
			.forEach((mark) => {
				if (annotation.note) {
					mark.setAttribute("title", annotation.note);
				} else {
					mark.removeAttribute("title");
				}
			});
		syncInlineAnnotation(annotation);
	}

	function syncInlineAnnotation(annotation) {
		const selector =
			'.annotation-inline-disclosure[data-annotation-id="' + cssEscape(annotation.id) + '"]';
		const disclosure = document.querySelector(selector);
		if (!annotation.note) {
			if (disclosure) disclosure.remove();
			return;
		}

		if (!disclosure) {
			const index = state.annotations.findIndex((item) => item.id === annotation.id);
			const hasMark = Boolean(
				document.querySelector('.annotation-mark[data-annotation-id="' + cssEscape(annotation.id) + '"]')
			);
			renderInlineAnnotation(annotation, index + 1, hasMark);
			return;
		}

		const inlineNote = disclosure.querySelector(".annotation-inline-note");
		if (inlineNote) inlineNote.textContent = annotation.note;
	}

	function updateAnnotationNumbers() {
		state.annotations.forEach((annotation, index) => {
			const number = panel.querySelector(
				'.annotation-card[data-annotation-id="' + cssEscape(annotation.id) + '"] .annotation-number'
			);
			if (number) number.textContent = String(index + 1);
			const count = document.querySelector(
				'.annotation-inline-disclosure[data-annotation-id="' + cssEscape(annotation.id) + '"] .annotation-inline-count'
			);
			if (count) count.textContent = String(index + 1);
		});
	}

	function activateAnnotation(id, shouldScroll = true) {
		const marks = document.querySelectorAll('.annotation-mark[data-annotation-id="' + cssEscape(id) + '"]');
		document.querySelectorAll(".annotation-card.is-active, .annotation-mark.is-active").forEach((element) => {
			element.classList.remove("is-active");
		});
		const card = document.querySelector('.annotation-card[data-annotation-id="' + cssEscape(id) + '"]');
		if (card) card.classList.add("is-active");
		marks.forEach((mark) => mark.classList.add("is-active"));
		const firstMark = marks[0];
		if (shouldScroll && firstMark) {
			firstMark.scrollIntoView({ block: "center", behavior: "smooth" });
		}
	}

	function openAnnotationEditor(id) {
		const card = document.querySelector('.annotation-card[data-annotation-id="' + cssEscape(id) + '"]');
		if (!card) return;
		activateAnnotation(id, false);
		cancelAnnotationEditors(card);
		const editor = card.querySelector(".annotation-card-editor");
		const textarea = card.querySelector("textarea");
		if (editor) editor.hidden = false;
		card.classList.add("is-editing");
		if (textarea) {
			textarea.focus({ preventScroll: true });
			textarea.setSelectionRange(textarea.value.length, textarea.value.length);
		}
		scheduleAnnotationLayout();
	}

	function cancelAnnotationEditors(exceptCard) {
		let changed = false;
		panel.querySelectorAll(".annotation-card.is-editing").forEach((card) => {
			if (card === exceptCard) return;
			const editor = card.querySelector(".annotation-card-editor");
			const textarea = card.querySelector("textarea");
			const note = card.querySelector(".annotation-note");
			if (textarea) {
				textarea.value = note && !note.hidden ? note.textContent || "" : "";
			}
			if (editor) editor.hidden = true;
			card.classList.remove("is-editing");
			changed = true;
		});
		if (changed) scheduleAnnotationLayout();
	}

	function updatePanelVisibility() {
		panel.hidden = state.annotations.length === 0;
	}

	function compactText(value) {
		return String(value || "").replace(/\\s+/g, " ").trim();
	}

	function formatDate(value) {
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return value;
		const pad = (part) => String(part).padStart(2, "0");
		return pad(date.getMonth() + 1) + "-" + pad(date.getDate()) + " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
	}

	function cssEscape(value) {
		if (window.CSS && typeof window.CSS.escape === "function") {
			return window.CSS.escape(value);
		}
		return String(value).replace(/"/g, "\\\\22 ");
	}

	function isAnnotation(value) {
		return (
			value &&
			typeof value === "object" &&
			typeof value.id === "string" &&
			typeof value.selectedText === "string"
		);
	}
})();
`.trim(),to=`
:root {
	color-scheme: light;
	--page-bg: #f3f0e8;
	--paper: #fbf8f1;
	--ink: #20201d;
	--muted: #77736a;
	--line: #d8d1c6;
	--line-soft: #ebe6dd;
	--accent: #c7352b;
	--accent-soft: #f8ede9;
	--quote-bg: #f8f4eb;
	--code-bg: #eee9df;
	--link: #2f7a4b;
}

* {
	box-sizing: border-box;
}

html {
	background: var(--page-bg);
	font-size: 16px;
	scroll-behavior: smooth;
	scroll-padding-top: 1.4rem;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

body {
	position: relative;
	margin: 0;
	color: var(--ink);
	background: var(--page-bg);
	font-family: Georgia, "Times New Roman", "Noto Serif SC", "Songti SC", SimSun, serif;
	line-height: 1.76;
	letter-spacing: 0;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
}

.page {
	width: min(100%, 860px);
	margin: 0 auto;
	padding: 2.8rem 1.6rem 5rem;
}

.article-hero {
	width: 100%;
	max-width: 720px;
	margin: 0 auto 2.4rem;
	padding: 1.4rem 0 2rem;
	text-align: center;
	border-bottom: 1px solid var(--line);
	background: transparent;
}

.article-hero h1 {
	max-width: 720px;
	margin: 0 auto;
	color: #1f1f1d;
	font-size: 2.25rem;
	font-weight: 700;
	line-height: 1.25;
	letter-spacing: 0;
	text-align: center;
	text-wrap: balance;
}

.article-hero h1 span {
	display: block;
}

.article-deck {
	max-width: 680px;
	margin: 0.95rem auto 0;
	color: var(--muted);
	font-size: 1rem;
	font-style: italic;
	line-height: 1.72;
	text-wrap: pretty;
}

.article-deck p {
	margin: 0;
}

.article-deck strong {
	color: inherit;
	font-weight: 600;
}

.hero-rule {
	width: 3.4rem;
	height: 2px;
	margin: 1.55rem auto 0;
	background: var(--accent);
}

.table-of-contents {
	max-width: 720px;
	margin: 0 auto 3.2rem;
	padding: 1.35rem 1.45rem 1.25rem;
	border: 1px solid var(--line);
	border-radius: 8px;
	background: rgba(251, 248, 241, 0.86);
}

.table-of-contents h2 {
	margin: 0 0 0.85rem;
	padding: 0;
	border: 0;
	color: var(--muted);
	font-size: 0.9rem;
	font-weight: 700;
	line-height: 1.3;
}

.table-of-contents h2::before {
	content: none;
}

.table-of-contents ol {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 0.32rem 1.35rem;
	margin: 0;
	padding: 0;
	list-style: none;
	counter-reset: toc;
	font-size: 0.86rem;
	line-height: 1.48;
}

.table-of-contents li {
	margin: 0;
	padding: 0;
	counter-increment: toc;
	break-inside: avoid;
}

.table-of-contents a {
	display: grid;
	grid-template-columns: 1.9em minmax(0, 1fr);
	gap: 0.3rem;
	margin: 0 -0.35rem;
	padding: 0.1rem 0.35rem;
	border-radius: 5px;
	color: var(--ink);
	text-decoration: none;
	cursor: pointer;
	transition: color 160ms ease, background-color 160ms ease;
}

.table-of-contents a::before {
	content: counter(toc) ".";
	color: var(--muted);
	text-align: right;
	transition: color 160ms ease;
}

.table-of-contents a:hover,
.table-of-contents a:focus-visible {
	background: var(--accent-soft);
	color: var(--accent);
}

.table-of-contents a:hover::before,
.table-of-contents a:focus-visible::before {
	color: var(--accent);
}

.side-table-of-contents {
	display: none;
}

.side-toc-title {
	margin: 0 0 0.75rem;
	color: var(--muted);
	font-size: 0.72rem;
	font-weight: 700;
	text-transform: uppercase;
}

.side-table-of-contents ol {
	margin: 0;
	padding: 0;
	list-style: none;
	counter-reset: side-toc;
	font-size: 0.76rem;
	line-height: 1.36;
}

.side-table-of-contents li {
	margin: 0;
	padding: 0;
	counter-increment: side-toc;
}

.side-table-of-contents a {
	display: grid;
	grid-template-columns: 2em minmax(0, 1fr);
	gap: 0.28rem;
	margin: 0 -0.35rem;
	padding: 0.22rem 0.35rem;
	border-radius: 5px;
	color: var(--muted);
	text-decoration: none;
	cursor: pointer;
	transition: color 160ms ease, background-color 160ms ease;
}

.side-table-of-contents a::before {
	content: counter(side-toc) ".";
	color: #aaa39a;
	text-align: right;
	transition: color 160ms ease;
}

.side-table-of-contents a:hover,
.side-table-of-contents a:focus-visible {
	background: var(--accent-soft);
	color: var(--accent);
}

.side-table-of-contents a:hover::before,
.side-table-of-contents a:focus-visible::before {
	color: var(--accent);
}

.article-body {
	counter-reset: section;
	width: 100%;
	max-width: 720px;
	margin: 0 auto;
	font-size: 1rem;
}

.article-body > * {
	max-width: 100%;
}

.article-body h2,
.article-body h3,
.article-body h4 {
	color: #20201d;
	letter-spacing: 0;
	line-height: 1.32;
	text-wrap: balance;
}

.article-body h2 {
	counter-increment: section;
	position: relative;
	margin: 2.85rem 0 1rem;
	padding: 0;
	border: 0;
	font-size: 1.55rem;
	font-weight: 700;
}

.article-body h2:target {
	color: var(--accent);
}

.article-body h2::before {
	content: counter(section, cjk-ideographic) "\u3001";
	display: inline-block;
	min-width: 2.35em;
	margin-right: 0.2rem;
	color: var(--accent);
	font-weight: 500;
}

.article-body h3 {
	margin: 2.1rem 0 0.72rem;
	font-size: 1.25rem;
	font-weight: 700;
}

.article-body h4 {
	margin: 1.65rem 0 0.58rem;
	font-size: 1.08rem;
	font-weight: 700;
}

p {
	margin: 0.9rem 0;
}

a {
	color: var(--link);
	text-decoration-thickness: 1px;
	text-underline-offset: 0.18em;
}

[hidden] {
	display: none !important;
}

.annotation-mark {
	margin: 0 0.01em;
	padding: 0.02em 0.08em 0.03em;
	border-bottom: 1px solid rgba(199, 53, 43, 0.34);
	background: rgba(199, 53, 43, 0.1);
	cursor: pointer;
	transition: background-color 160ms ease, box-shadow 160ms ease;
}

.annotation-mark:hover,
.annotation-mark.is-active {
	background: rgba(199, 53, 43, 0.16);
	box-shadow: 0 0 0 2px rgba(199, 53, 43, 0.08);
}

.annotation-inline-disclosure {
	display: none;
}

.annotation-popover {
	position: absolute;
	z-index: 30;
	width: min(20rem, calc(100vw - 1.75rem));
	padding: 0.5rem;
	border: 1px solid rgba(92, 75, 56, 0.16);
	border-radius: 10px;
	background: rgba(255, 252, 246, 0.98);
	box-shadow: 0 12px 30px rgba(60, 45, 30, 0.14);
	backdrop-filter: blur(10px);
}

.annotation-popover::before {
	content: "";
	position: absolute;
	top: -6px;
	left: 1.2rem;
	width: 10px;
	height: 10px;
	border-top: 1px solid rgba(92, 75, 56, 0.16);
	border-left: 1px solid rgba(92, 75, 56, 0.16);
	background: rgba(255, 252, 246, 0.98);
	transform: rotate(45deg);
}

.annotation-popover-actions {
	display: flex;
	align-items: center;
	margin-bottom: 0.42rem;
}

.annotation-popover button,
.annotation-card button {
	appearance: none;
	border: 0;
	border-radius: 5px;
	background: transparent;
	color: var(--ink);
	font: inherit;
	font-size: 0.78rem;
	line-height: 1;
	cursor: pointer;
}

.annotation-underline-button {
	width: 100%;
	padding: 0.5rem 0.68rem;
	border: 1px solid rgba(199, 53, 43, 0.18) !important;
	background: rgba(199, 53, 43, 0.08) !important;
	color: var(--accent) !important;
	font-weight: 700 !important;
	text-align: center;
}

.annotation-popover button:hover,
.annotation-popover button:focus-visible,
.annotation-card button:hover,
.annotation-card button:focus-visible {
	background: var(--accent-soft);
	color: var(--accent);
	outline: none;
}

.annotation-note-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 0.4rem;
	align-items: center;
	padding: 0.28rem;
	border: 1px solid rgba(216, 209, 198, 0.9);
	border-radius: 8px;
	background: rgba(251, 248, 241, 0.92);
}

.annotation-note-input {
	width: 100%;
	min-width: 0;
	padding: 0.46rem 0.5rem;
	border: 0;
	border-radius: 6px;
	background: transparent;
	color: var(--ink);
	font: inherit;
	font-size: 0.8rem;
	line-height: 1.2;
}

.annotation-note-row:focus-within {
	border-color: rgba(199, 53, 43, 0.44);
	box-shadow: 0 0 0 2px rgba(199, 53, 43, 0.08);
}

.annotation-note-input:focus {
	outline: none;
}

.annotation-card textarea:focus {
	border-color: rgba(199, 53, 43, 0.52);
	outline: 2px solid rgba(199, 53, 43, 0.12);
}

.annotation-mini-save,
.annotation-card-save {
	padding: 0.42rem 0.58rem;
	border-radius: 6px !important;
	background: var(--accent) !important;
	color: #fff !important;
}

.annotation-panel {
	position: absolute;
	top: 0;
	right: max(1.25rem, calc(50% - 360px - 17rem));
	width: 15.8rem;
	z-index: 20;
	padding-left: 0.8rem;
	border-left: 1px solid var(--line-soft);
	overflow: visible;
}

.annotation-panel-title {
	display: none;
}

.annotation-list {
	position: relative;
	width: 100%;
}

.annotation-card {
	position: absolute;
	left: 0;
	width: 100%;
	padding: 0;
	border: 0;
	border-radius: 10px;
	background: transparent;
	color: var(--ink);
	font: inherit;
	text-align: left;
	box-shadow: none;
	cursor: pointer;
	transition-property: background-color, box-shadow;
	transition-duration: 180ms;
	transition-timing-function: ease-out;
}

.annotation-card:hover,
.annotation-card.is-active {
	background: transparent;
	box-shadow: none;
}

.annotation-card.is-editing {
	background: transparent;
	box-shadow: none;
}

.annotation-card-body {
	position: relative;
	padding: 0.18rem 0.5rem 0.42rem 1.55rem;
}

.annotation-number {
	position: absolute;
	top: 0.18rem;
	left: 0.12rem;
	min-width: 1rem;
	color: var(--accent);
	font-size: 0.88rem;
	font-weight: 700;
	font-variant-numeric: tabular-nums;
}

.annotation-quote,
.annotation-status {
	margin: 0;
}

.annotation-quote {
	margin: 0;
	color: #625d54;
	font-size: 0.78rem;
	line-height: 1.46;
	border-left: 2px solid rgba(199, 53, 43, 0.34);
	background: rgba(199, 53, 43, 0.045);
	padding: 0.36rem 0.48rem;
	text-wrap: pretty;
}

.annotation-note {
	margin: 0.62rem 0 0;
	padding: 0;
	border: 0;
	color: var(--ink);
	font-size: 0.86rem;
	line-height: 1.52;
	text-wrap: pretty;
}

.annotation-status {
	margin-top: 0.45rem;
	color: var(--muted);
	font-size: 0.7rem;
}

.annotation-card-editor {
	display: grid;
	gap: 0.42rem;
	margin-top: 0.86rem;
	padding-top: 0.74rem;
	border-top: 1px solid var(--line-soft);
}

.annotation-card textarea {
	display: block;
	width: 100%;
	resize: vertical;
	min-height: 4.5rem;
	padding: 0.58rem 0.62rem;
	border: 1px solid var(--line);
	border-radius: 6px;
	background: var(--paper);
	color: var(--ink);
	font: inherit;
	font-size: 0.78rem;
	line-height: 1.48;
}

.annotation-card-save {
	font-size: 0.72rem !important;
}

.annotation-card-actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 0.38rem;
	margin-top: 0.06rem;
}

.annotation-card-delete,
.annotation-card-save {
	min-width: auto;
	min-height: 2.1rem;
	padding: 0.36rem 0.58rem !important;
	font-size: 0.72rem !important;
	transition-property: background-color, border-color, box-shadow, color, scale;
	transition-duration: 150ms;
	transition-timing-function: ease-out;
}

.annotation-card-delete {
	border-color: transparent !important;
	background: transparent !important;
	color: var(--accent) !important;
	box-shadow: none !important;
}

.annotation-card .annotation-card-delete:hover,
.annotation-card .annotation-card-delete:focus-visible {
	background: rgba(199, 53, 43, 0.075) !important;
	color: var(--accent) !important;
	box-shadow: none !important;
	outline: none;
}

.annotation-card .annotation-card-save:hover,
.annotation-card .annotation-card-save:focus-visible {
	background: #ae2e26 !important;
	box-shadow: 0 2px 5px rgba(152, 43, 35, 0.22) !important;
	outline: none;
}

.annotation-card-delete:active,
.annotation-card-save:active {
	scale: 0.96;
}

strong {
	color: var(--accent);
	font-weight: 700;
}

em {
	color: var(--muted);
}

blockquote {
	position: relative;
	margin: 1.55rem 0;
	padding: 0.95rem 1.15rem 0.95rem 1.25rem;
	border: 0;
	border-left: 3px solid var(--line);
	border-radius: 6px;
	background: var(--quote-bg);
	color: #272622;
}

blockquote.quote-block {
	color: #3c3932;
}

blockquote.callout-block {
	border: 1px solid var(--line);
	border-left: 4px solid var(--accent);
	background: #f9f2eb;
}

blockquote.callout-highlight {
	box-shadow: inset 0 0 0 1px rgba(199, 53, 43, 0.05);
}

blockquote.callout-conclusion {
	padding: 1.05rem 1.25rem;
	border: 1px solid #d9cdc0;
	border-top: 3px solid var(--accent);
	border-left-color: #d9cdc0;
	background: var(--paper);
	box-shadow: 0 10px 28px rgba(70, 48, 26, 0.06);
}

blockquote p:first-child {
	margin-top: 0;
}

blockquote p:last-child {
	margin-bottom: 0;
}

blockquote strong {
	color: var(--accent);
}

blockquote.callout-block p:first-child strong:first-child {
	display: inline-block;
	margin-bottom: 0.25rem;
	padding: 0.06rem 0.42rem;
	border-radius: 999px;
	background: var(--accent-soft);
	color: var(--accent);
	font-size: 0.78rem;
	line-height: 1.45;
}

ul,
ol {
	margin: 0.9rem 0 1.05rem 1.35rem;
	padding: 0;
}

li {
	margin: 0.35rem 0;
	padding-left: 0.25rem;
}

li::marker {
	color: #151513;
	font-weight: 600;
}

hr {
	margin: 2.2rem 0;
	border: 0;
	border-top: 1px solid var(--line-soft);
}

.table-scroll {
	max-width: 100%;
	margin: 1.45rem 0;
	border: 1px solid var(--line);
	border-radius: 6px;
	background: var(--paper);
	overflow-x: auto;
}

table {
	width: max-content;
	min-width: 100%;
	border-collapse: separate;
	border-spacing: 0;
	background: var(--paper);
	font-size: 0.84rem;
	line-height: 1.55;
}

thead {
	background: transparent;
}

th {
	background: #ebe6dc;
	color: #4a463f;
	font-weight: 700;
	white-space: nowrap;
}

th,
td {
	padding: 0.55rem 0.66rem;
	border: 0;
	border-right: 1px solid var(--line);
	border-bottom: 1px solid var(--line);
	text-align: left;
	vertical-align: top;
}

tr > :last-child {
	border-right: 0;
}

tbody tr:last-child td {
	border-bottom: 0;
}

tbody tr:nth-child(even) {
	background: #f7f3ea;
}

tbody tr:hover {
	background: #f4eadc;
}

pre,
code {
	font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}

code {
	padding: 0.08rem 0.28rem;
	border-radius: 4px;
	background: var(--code-bg);
	font-size: 0.82em;
}

pre {
	position: relative;
	margin: 1.6rem 0;
	padding: 2rem 1rem 1rem;
	border: 1px solid var(--line);
	border-left: 4px solid #bbb3a8;
	border-radius: 6px;
	background: var(--code-bg);
	overflow-x: auto;
	line-height: 1.5;
}

pre::before {
	content: "\u4EE3\u7801 / \u56FE\u793A";
	position: absolute;
	top: 0.55rem;
	left: 0.9rem;
	color: var(--muted);
	font-family: Georgia, "Times New Roman", "Noto Serif SC", "Songti SC", SimSun, serif;
	font-size: 0.72rem;
	font-weight: 700;
	line-height: 1;
}

pre.code-figure::before {
	content: attr(data-label);
}

pre.code-figure.ascii-figure {
	border-left-color: var(--accent);
	background: #f1ece3;
}

pre.code-figure.ascii-figure::before {
	color: var(--accent);
}

pre code {
	padding: 0;
	background: transparent;
	font-size: 0.78rem;
}

img {
	display: block;
	max-width: 100%;
	height: auto;
	margin: 1.5rem auto;
	outline: 1px solid rgba(0, 0, 0, 0.1);
	outline-offset: -1px;
}

sup {
	line-height: 0;
}

@media (min-width: 1280px) {
	.side-table-of-contents {
		display: block;
		position: fixed;
		top: 5rem;
		left: max(1.25rem, calc(50% - 360px - 14.5rem));
		right: auto;
		width: 12.75rem;
		max-height: calc(100vh - 6rem);
		padding: 0.2rem 0.75rem 0.5rem 0;
		border-right: 1px solid var(--line-soft);
		border-left: 0;
		background: transparent;
		overflow: auto;
	}
}

@media (min-width: 1024px) and (max-width: 1179px) {
	.article-body {
		max-width: 640px;
	}

	.annotation-panel {
		right: max(1rem, calc(50% - 320px - 11.5rem));
		width: 10.5rem;
		padding-left: 0.58rem;
	}

	.annotation-card-body {
		padding-right: 0.25rem;
		padding-left: 1.28rem;
	}

	.annotation-number {
		left: 0.06rem;
		font-size: 0.78rem;
	}

	.annotation-quote {
		font-size: 0.72rem;
	}

	.annotation-note {
		font-size: 0.8rem;
	}
}

@media (min-width: 1180px) and (max-width: 1359px) {
	.article-body {
		max-width: 680px;
	}

	.annotation-panel {
		right: max(1rem, calc(50% - 340px - 13.5rem));
		width: 12.5rem;
		padding-left: 0.68rem;
	}
}

@media (max-width: 1023px) {
	.annotation-panel {
		display: none !important;
	}

	.annotation-popover {
		width: min(22rem, calc(100vw - 1.5rem));
	}

	.annotation-inline-disclosure {
		display: inline;
		margin-left: 0.22em;
		vertical-align: baseline;
	}

	.annotation-inline-trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.24rem;
		min-height: 1.3rem;
		padding: 0.12rem 0.28rem;
		border: 0;
		border-radius: 4px;
		background: rgba(92, 75, 56, 0.055);
		color: var(--muted);
		font: inherit;
		font-size: 0.64rem;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		vertical-align: 0.08em;
		cursor: pointer;
		transition-property: background-color, color, scale;
		transition-duration: 150ms;
		transition-timing-function: ease-out;
	}

	.annotation-inline-trigger:hover,
	.annotation-inline-trigger:focus-visible,
	.annotation-inline-trigger[aria-expanded="true"] {
		background: rgba(199, 53, 43, 0.09);
		color: var(--accent);
		outline: none;
	}

	.annotation-inline-trigger:active {
		scale: 0.96;
	}

	.annotation-inline-icon {
		position: relative;
		display: inline-block;
		width: 0.62rem;
		height: 0.48rem;
		border: 1px solid currentColor;
		border-radius: 2px;
	}

	.annotation-inline-icon::after {
		content: "";
		position: absolute;
		bottom: -0.17rem;
		left: 0.12rem;
		width: 0.2rem;
		height: 0.2rem;
		border-bottom: 1px solid currentColor;
		border-left: 1px solid currentColor;
		background: transparent;
		transform: skewY(-36deg);
	}

	.annotation-inline-content {
		margin-left: 0.3em;
		padding: 0.08em 0.34em 0.1em;
		border-left: 1px solid rgba(199, 53, 43, 0.3);
		background: rgba(199, 53, 43, 0.038);
		color: var(--ink);
		font-size: 0.78rem;
		line-height: 1.52;
		text-wrap: pretty;
		vertical-align: baseline;
	}

	.annotation-inline-note {
		margin: 0;
	}
}

@media (max-width: 780px) {
	html {
		font-size: 16px;
	}

	.page {
		padding: 1.8rem 1rem 3.2rem;
	}

	.article-hero {
		margin-bottom: 1.9rem;
		padding-top: 0.8rem;
		padding-bottom: 1.55rem;
	}

	.article-hero h1 {
		font-size: 1.75rem;
	}

	.article-deck {
		font-size: 0.95rem;
	}

	.table-of-contents {
		margin-bottom: 2.5rem;
		padding: 1.1rem 1rem;
	}

	.table-of-contents ol {
		grid-template-columns: 1fr;
		gap: 0.45rem;
	}

	.article-body h2 {
		margin-top: 2.45rem;
		font-size: 1.35rem;
	}

	.article-body h2::before {
		min-width: 0;
		margin-right: 0.15rem;
	}

	blockquote {
		padding: 0.85rem 0.95rem;
	}

	table {
		font-size: 0.8rem;
	}

	.annotation-popover {
		max-width: calc(100vw - 1.5rem);
	}
}

@media print {
	html,
	body {
		background: #fff;
	}

	.page {
		width: 100%;
		padding: 0;
	}

	.article-hero {
		margin-inline: 0;
		padding-inline: 0;
	}

	a {
		color: inherit;
	}

	.annotation-popover,
	.annotation-panel {
		display: none !important;
	}
}
`.trim(),no=`
:root {
	color-scheme: light;
	--page-bg: #efe8da;
	--paper: #f7f4ee;
	--ink: #1a1714;
	--muted: #6f6555;
	--line: #d7cdb9;
	--line-soft: #e6dece;
	--line-strong: #1a1714;
	--accent: #c4342b;
	--accent-soft: #f3e5dc;
	--quote-bg: #efe8da;
	--code-bg: #ece4d4;
	--link: #b02a22;
}

* {
	box-sizing: border-box;
}

html {
	background: var(--page-bg);
	font-size: 16px;
	scroll-behavior: smooth;
	scroll-padding-top: 1.4rem;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

body {
	position: relative;
	margin: 0;
	color: var(--ink);
	background: var(--page-bg);
	font-family: Georgia, "Times New Roman", "Noto Serif SC", "Songti SC", SimSun, serif;
	line-height: 1.85;
	letter-spacing: 0;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
}

.page {
	width: min(100%, 860px);
	margin: 0 auto;
	padding: 2.8rem 1.6rem 5rem;
}

.article-hero {
	width: 100%;
	max-width: 720px;
	margin: 0 auto 2.6rem;
	padding: 0.6rem 0 1.9rem;
	text-align: left;
	border-bottom: 3px solid var(--line-strong);
	background: transparent;
}

.article-hero h1 {
	max-width: 720px;
	margin: 0;
	color: var(--ink);
	font-size: clamp(1.7rem, 3vw, 2.2rem);
	font-weight: 800;
	line-height: 1.16;
	letter-spacing: -0.02em;
	text-align: left;
	text-wrap: balance;
}

.article-hero h1 span {
	display: block;
}

.article-hero h1 span + span {
	margin-top: 0.35rem;
	color: var(--accent);
	font-size: 0.5em;
	font-weight: 700;
	letter-spacing: 0;
}

.article-deck {
	max-width: 620px;
	margin: 1.25rem 0 0;
	color: var(--muted);
	font-size: 1.16rem;
	font-style: normal;
	font-weight: 300;
	line-height: 1.6;
	text-wrap: pretty;
}

.article-deck p {
	margin: 0;
}

.article-deck strong {
	color: inherit;
	font-weight: 600;
	box-shadow: none;
}

.hero-rule {
	width: 3.4rem;
	height: 4px;
	margin: 1.5rem 0 0;
	background: var(--accent);
}

.table-of-contents {
	max-width: 720px;
	margin: 0 auto 3.3rem;
	padding: 1.1rem 0 1.2rem;
	border: 0;
	border-top: 3px solid var(--line-strong);
	border-bottom: 1px solid var(--line);
	border-radius: 0;
	background: transparent;
}

.table-of-contents h2 {
	margin: 0 0 0.95rem;
	padding: 0;
	border: 0;
	color: var(--ink);
	font-size: 0.78rem;
	font-weight: 800;
	letter-spacing: 0.18em;
	text-transform: uppercase;
	line-height: 1.3;
}

.table-of-contents h2::before {
	content: none;
}

.table-of-contents ol {
	display: grid;
	grid-template-columns: repeat(2, minmax(0, 1fr));
	gap: 0 1.6rem;
	margin: 0;
	padding: 0;
	list-style: none;
	counter-reset: toc;
	font-size: 0.9rem;
	line-height: 1.5;
}

.table-of-contents li {
	margin: 0;
	padding: 0;
	counter-increment: toc;
	break-inside: avoid;
	border-bottom: 1px solid var(--line-soft);
}

.table-of-contents a {
	display: grid;
	grid-template-columns: 2.2em minmax(0, 1fr);
	gap: 0.4rem;
	margin: 0;
	padding: 0.5rem 0.2rem;
	border-radius: 4px;
	color: var(--ink);
	text-decoration: none;
	cursor: pointer;
	transition: color 160ms ease, background-color 160ms ease;
}

.table-of-contents a::before {
	content: counter(toc, decimal-leading-zero);
	color: var(--accent);
	font-family: "SFMono-Regular", Consolas, Menlo, monospace;
	font-size: 0.78rem;
	font-weight: 700;
	text-align: left;
	transition: color 160ms ease;
}

.table-of-contents a:hover,
.table-of-contents a:focus-visible {
	background: var(--accent-soft);
	color: var(--accent);
}

.side-table-of-contents {
	display: none;
}

.side-toc-title {
	margin: 0 0 0.85rem;
	padding-bottom: 0.5rem;
	border-bottom: 2px solid var(--line-strong);
	color: var(--ink);
	font-size: 0.72rem;
	font-weight: 800;
	letter-spacing: 0.16em;
	text-transform: uppercase;
}

.side-table-of-contents ol {
	margin: 0;
	padding: 0;
	list-style: none;
	counter-reset: side-toc;
	font-size: 0.78rem;
	line-height: 1.4;
}

.side-table-of-contents li {
	margin: 0;
	padding: 0;
	counter-increment: side-toc;
	border-bottom: 1px solid var(--line-soft);
}

.side-table-of-contents a {
	display: grid;
	grid-template-columns: 1.9em minmax(0, 1fr);
	gap: 0.3rem;
	margin: 0;
	padding: 0.42rem 0.1rem;
	border-radius: 4px;
	color: var(--muted);
	text-decoration: none;
	cursor: pointer;
	transition: color 160ms ease, background-color 160ms ease;
}

.side-table-of-contents a::before {
	content: counter(side-toc, decimal-leading-zero);
	color: var(--accent);
	font-family: "SFMono-Regular", Consolas, Menlo, monospace;
	font-size: 0.7rem;
	font-weight: 700;
	text-align: left;
	transition: color 160ms ease;
}

.side-table-of-contents a:hover,
.side-table-of-contents a:focus-visible {
	background: var(--accent-soft);
	color: var(--accent);
}

.article-body {
	counter-reset: section;
	width: 100%;
	max-width: 720px;
	margin: 0 auto;
	font-size: 1.02rem;
}

.article-body > * {
	max-width: 100%;
}

.article-body h2,
.article-body h3,
.article-body h4 {
	color: var(--ink);
	letter-spacing: -0.01em;
	line-height: 1.18;
	text-wrap: balance;
}

.article-body h2 {
	counter-increment: section;
	position: relative;
	margin: 3.1rem 0 1.1rem;
	padding: 1.3rem 0 0;
	border: 0;
	border-top: 3px solid var(--line-strong);
	font-size: 1.45rem;
	font-weight: 800;
}

.article-body h2:target {
	color: var(--accent);
}

.article-body h2::before {
	content: counter(section, decimal-leading-zero);
	display: inline-block;
	margin-right: 0.55rem;
	color: var(--accent);
	font-family: "SFMono-Regular", Consolas, Menlo, monospace;
	font-size: 0.62em;
	font-weight: 700;
	vertical-align: 0.18em;
}

.article-body h3 {
	display: flex;
	align-items: baseline;
	gap: 0.6rem;
	margin: 2.3rem 0 0.8rem;
	font-size: 1.16rem;
	font-weight: 800;
}

.article-body h3::before {
	content: "";
	flex: none;
	width: 1.3rem;
	height: 3px;
	background: var(--accent);
	transform: translateY(-0.32em);
}

.article-body h4 {
	margin: 1.8rem 0 0.6rem;
	font-size: 1.1rem;
	font-weight: 800;
}

p {
	margin: 1rem 0;
}

a {
	color: var(--link);
	text-decoration-thickness: 1px;
	text-underline-offset: 0.18em;
}

[hidden] {
	display: none !important;
}

strong {
	color: var(--ink);
	font-weight: 800;
	box-shadow: inset 0 -0.5em 0 rgba(196, 52, 43, 0.16);
}

em {
	color: var(--accent);
	font-style: italic;
}

mark:not(.annotation-mark) {
	background: var(--accent);
	color: #fff;
	padding: 0 0.22em;
	border-radius: 2px;
}

blockquote {
	position: relative;
	margin: 1.9rem 0;
	padding: 0.4rem 0 0.4rem 1.5rem;
	border: 0;
	border-left: 4px solid var(--accent);
	border-radius: 0;
	background: transparent;
	color: var(--muted);
}

blockquote.quote-block {
	color: var(--muted);
	font-size: 1.32rem;
	font-style: italic;
	line-height: 1.62;
}

blockquote.callout-block {
	padding: 1.1rem 1.25rem;
	border: 0;
	border-top: 3px solid var(--accent);
	background: var(--paper);
	color: var(--ink);
	font-style: normal;
	box-shadow: 0 1px 0 var(--line);
}

blockquote.callout-highlight {
	box-shadow: 0 1px 0 var(--line);
}

blockquote.callout-conclusion {
	padding: 1.4rem 1.5rem;
	border: 0;
	border-top: 3px solid var(--accent);
	background: var(--ink);
	color: #f4efe6;
	font-style: normal;
}

blockquote p:first-child {
	margin-top: 0;
}

blockquote p:last-child {
	margin-bottom: 0;
}

blockquote strong {
	color: var(--accent);
	box-shadow: none;
}

blockquote.callout-conclusion strong {
	color: #fff;
	box-shadow: inset 0 -0.5em 0 rgba(196, 52, 43, 0.5);
}

blockquote.callout-block p:first-child strong:first-child {
	display: inline-block;
	margin-bottom: 0.45rem;
	padding: 0.12rem 0.5rem;
	border-radius: 2px;
	background: var(--accent-soft);
	color: var(--accent);
	font-size: 0.7rem;
	font-weight: 800;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	line-height: 1.5;
	box-shadow: none;
}

blockquote.callout-conclusion p:first-child strong:first-child {
	background: var(--accent);
	color: #fff;
}

ul,
ol {
	margin: 1rem 0 1.15rem 1.4rem;
	padding: 0;
}

li {
	margin: 0.42rem 0;
	padding-left: 0.3rem;
}

li::marker {
	color: var(--accent);
	font-weight: 700;
}

hr {
	margin: 2.4rem 0;
	border: 0;
	border-top: 1px solid var(--line);
}

.table-scroll {
	max-width: 100%;
	margin: 1.6rem 0;
	border: 0;
	border-top: 3px solid var(--line-strong);
	border-radius: 0;
	background: transparent;
	overflow-x: auto;
}

table {
	width: max-content;
	min-width: 100%;
	border-collapse: separate;
	border-spacing: 0;
	background: transparent;
	font-family: "Helvetica Neue", Arial, "Noto Sans SC", "PingFang SC", sans-serif;
	font-size: 0.86rem;
	line-height: 1.55;
}

thead {
	background: transparent;
}

th {
	background: transparent;
	color: var(--ink);
	font-weight: 800;
	letter-spacing: 0.02em;
	white-space: nowrap;
	border-bottom: 1px solid var(--line-strong);
}

th,
td {
	padding: 0.62rem 0.7rem;
	border: 0;
	border-bottom: 1px solid var(--line);
	text-align: left;
	vertical-align: top;
	color: var(--ink);
}

tbody td {
	color: #4a443b;
}

tbody tr:last-child td {
	border-bottom: 2px solid var(--line-strong);
}

pre,
code {
	font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
}

code {
	padding: 0.08rem 0.28rem;
	border-radius: 3px;
	background: var(--code-bg);
	font-size: 0.82em;
}

pre {
	position: relative;
	margin: 1.7rem 0;
	padding: 2rem 1rem 1rem;
	border: 0;
	border-left: 4px solid var(--accent);
	border-radius: 0;
	background: var(--code-bg);
	overflow-x: auto;
	line-height: 1.5;
}

pre::before {
	content: "\u4EE3\u7801 / \u56FE\u793A";
	position: absolute;
	top: 0.55rem;
	left: 0.9rem;
	color: var(--accent);
	font-family: "Helvetica Neue", Arial, "Noto Sans SC", "PingFang SC", sans-serif;
	font-size: 0.66rem;
	font-weight: 800;
	letter-spacing: 0.1em;
	text-transform: uppercase;
	line-height: 1;
}

pre.code-figure::before {
	content: attr(data-label);
}

pre.code-figure.ascii-figure {
	border-left-color: var(--accent);
	background: #ece2d2;
}

pre code {
	padding: 0;
	background: transparent;
	font-size: 0.78rem;
}

img {
	display: block;
	max-width: 100%;
	height: auto;
	margin: 1.6rem auto;
	outline: 1px solid rgba(0, 0, 0, 0.1);
	outline-offset: -1px;
}

sup {
	line-height: 0;
}

.annotation-mark {
	margin: 0 0.01em;
	padding: 0.02em 0.08em 0.03em;
	border-bottom: 1px solid rgba(196, 52, 43, 0.34);
	background: rgba(196, 52, 43, 0.1);
	color: inherit;
	font: inherit;
	cursor: pointer;
	transition: background-color 160ms ease, box-shadow 160ms ease;
}

.annotation-mark:hover,
.annotation-mark.is-active {
	background: rgba(196, 52, 43, 0.16);
	box-shadow: 0 0 0 2px rgba(196, 52, 43, 0.08);
}

.annotation-inline-disclosure {
	display: none;
}

.annotation-popover {
	position: absolute;
	z-index: 30;
	width: min(20rem, calc(100vw - 1.75rem));
	padding: 0.5rem;
	border: 1px solid rgba(92, 75, 56, 0.16);
	border-radius: 10px;
	background: rgba(255, 252, 246, 0.98);
	box-shadow: 0 12px 30px rgba(60, 45, 30, 0.14);
	backdrop-filter: blur(10px);
}

.annotation-popover::before {
	content: "";
	position: absolute;
	top: -6px;
	left: 1.2rem;
	width: 10px;
	height: 10px;
	border-top: 1px solid rgba(92, 75, 56, 0.16);
	border-left: 1px solid rgba(92, 75, 56, 0.16);
	background: rgba(255, 252, 246, 0.98);
	transform: rotate(45deg);
}

.annotation-popover-actions {
	display: flex;
	align-items: center;
	margin-bottom: 0.42rem;
}

.annotation-popover button,
.annotation-card button {
	appearance: none;
	border: 0;
	border-radius: 5px;
	background: transparent;
	color: var(--ink);
	font: inherit;
	font-size: 0.78rem;
	line-height: 1;
	cursor: pointer;
}

.annotation-underline-button {
	width: 100%;
	padding: 0.5rem 0.68rem;
	border: 1px solid rgba(196, 52, 43, 0.18) !important;
	background: rgba(196, 52, 43, 0.08) !important;
	color: var(--accent) !important;
	font-weight: 700 !important;
	text-align: center;
}

.annotation-popover button:hover,
.annotation-popover button:focus-visible,
.annotation-card button:hover,
.annotation-card button:focus-visible {
	background: var(--accent-soft);
	color: var(--accent);
	outline: none;
}

.annotation-note-row {
	display: grid;
	grid-template-columns: minmax(0, 1fr) auto;
	gap: 0.4rem;
	align-items: center;
	padding: 0.28rem;
	border: 1px solid rgba(215, 205, 185, 0.9);
	border-radius: 8px;
	background: rgba(247, 244, 238, 0.92);
}

.annotation-note-input {
	width: 100%;
	min-width: 0;
	padding: 0.46rem 0.5rem;
	border: 0;
	border-radius: 6px;
	background: transparent;
	color: var(--ink);
	font: inherit;
	font-size: 0.8rem;
	line-height: 1.2;
}

.annotation-note-row:focus-within {
	border-color: rgba(196, 52, 43, 0.44);
	box-shadow: 0 0 0 2px rgba(196, 52, 43, 0.08);
}

.annotation-note-input:focus {
	outline: none;
}

.annotation-card textarea:focus {
	border-color: rgba(196, 52, 43, 0.52);
	outline: 2px solid rgba(196, 52, 43, 0.12);
}

.annotation-mini-save,
.annotation-card-save {
	padding: 0.42rem 0.58rem;
	border-radius: 6px !important;
	background: var(--accent) !important;
	color: #fff !important;
}

.annotation-panel {
	position: absolute;
	top: 0;
	right: max(1.25rem, calc(50% - 360px - 17rem));
	width: 15.8rem;
	z-index: 20;
	padding-left: 0.8rem;
	border-left: 1px solid var(--line-soft);
	overflow: visible;
}

.annotation-panel-title {
	display: none;
}

.annotation-list {
	position: relative;
	width: 100%;
}

.annotation-card {
	position: absolute;
	left: 0;
	width: 100%;
	padding: 0;
	border: 0;
	border-radius: 10px;
	background: transparent;
	color: var(--ink);
	font: inherit;
	text-align: left;
	box-shadow: none;
	cursor: pointer;
	transition-property: background-color, box-shadow;
	transition-duration: 180ms;
	transition-timing-function: ease-out;
}

.annotation-card:hover,
.annotation-card.is-active {
	background: transparent;
	box-shadow: none;
}

.annotation-card.is-editing {
	background: transparent;
	box-shadow: none;
}

.annotation-card-body {
	position: relative;
	padding: 0.18rem 0.5rem 0.42rem 1.55rem;
}

.annotation-number {
	position: absolute;
	top: 0.18rem;
	left: 0.12rem;
	min-width: 1rem;
	color: var(--accent);
	font-size: 0.88rem;
	font-weight: 700;
	font-variant-numeric: tabular-nums;
}

.annotation-quote,
.annotation-status {
	margin: 0;
}

.annotation-quote {
	margin: 0;
	color: #5f5849;
	font-size: 0.78rem;
	line-height: 1.46;
	border-left: 2px solid rgba(196, 52, 43, 0.34);
	background: rgba(196, 52, 43, 0.045);
	padding: 0.36rem 0.48rem;
	text-wrap: pretty;
}

.annotation-note {
	margin: 0.62rem 0 0;
	padding: 0;
	border: 0;
	color: var(--ink);
	font-size: 0.86rem;
	line-height: 1.52;
	text-wrap: pretty;
}

.annotation-status {
	margin-top: 0.45rem;
	color: var(--muted);
	font-size: 0.7rem;
}

.annotation-card-editor {
	display: grid;
	gap: 0.42rem;
	margin-top: 0.86rem;
	padding-top: 0.74rem;
	border-top: 1px solid var(--line-soft);
}

.annotation-card textarea {
	display: block;
	width: 100%;
	resize: vertical;
	min-height: 4.5rem;
	padding: 0.58rem 0.62rem;
	border: 1px solid var(--line);
	border-radius: 6px;
	background: var(--paper);
	color: var(--ink);
	font: inherit;
	font-size: 0.78rem;
	line-height: 1.48;
}

.annotation-card-save {
	font-size: 0.72rem !important;
}

.annotation-card-actions {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: 0.38rem;
	margin-top: 0.06rem;
}

.annotation-card-delete,
.annotation-card-save {
	min-width: auto;
	min-height: 2.1rem;
	padding: 0.36rem 0.58rem !important;
	font-size: 0.72rem !important;
	transition-property: background-color, border-color, box-shadow, color, scale;
	transition-duration: 150ms;
	transition-timing-function: ease-out;
}

.annotation-card-delete {
	border-color: transparent !important;
	background: transparent !important;
	color: var(--accent) !important;
	box-shadow: none !important;
}

.annotation-card .annotation-card-delete:hover,
.annotation-card .annotation-card-delete:focus-visible {
	background: rgba(196, 52, 43, 0.075) !important;
	color: var(--accent) !important;
	box-shadow: none !important;
	outline: none;
}

.annotation-card .annotation-card-save:hover,
.annotation-card .annotation-card-save:focus-visible {
	background: #ae2e26 !important;
	box-shadow: 0 2px 5px rgba(152, 43, 35, 0.22) !important;
	outline: none;
}

.annotation-card-delete:active,
.annotation-card-save:active {
	scale: 0.96;
}

@media (min-width: 1280px) {
	.side-table-of-contents {
		display: block;
		position: fixed;
		top: 5rem;
		left: max(1.25rem, calc(50% - 360px - 14.5rem));
		right: auto;
		width: 12.75rem;
		max-height: calc(100vh - 6rem);
		padding: 0.2rem 0.75rem 0.5rem 0;
		border-right: 1px solid var(--line-soft);
		border-left: 0;
		background: transparent;
		overflow: auto;
	}
}

@media (min-width: 1024px) and (max-width: 1179px) {
	.article-body {
		max-width: 640px;
	}

	.annotation-panel {
		right: max(1rem, calc(50% - 320px - 11.5rem));
		width: 10.5rem;
		padding-left: 0.58rem;
	}

	.annotation-card-body {
		padding-right: 0.25rem;
		padding-left: 1.28rem;
	}

	.annotation-number {
		left: 0.06rem;
		font-size: 0.78rem;
	}

	.annotation-quote {
		font-size: 0.72rem;
	}

	.annotation-note {
		font-size: 0.8rem;
	}
}

@media (min-width: 1180px) and (max-width: 1359px) {
	.article-body {
		max-width: 680px;
	}

	.annotation-panel {
		right: max(1rem, calc(50% - 340px - 13.5rem));
		width: 12.5rem;
		padding-left: 0.68rem;
	}
}

@media (max-width: 1023px) {
	.annotation-panel {
		display: none !important;
	}

	.annotation-popover {
		width: min(22rem, calc(100vw - 1.5rem));
	}

	.annotation-inline-disclosure {
		display: inline;
		margin-left: 0.22em;
		vertical-align: baseline;
	}

	.annotation-inline-trigger {
		display: inline-flex;
		align-items: center;
		gap: 0.24rem;
		min-height: 1.3rem;
		padding: 0.12rem 0.28rem;
		border: 0;
		border-radius: 4px;
		background: rgba(92, 75, 56, 0.055);
		color: var(--muted);
		font: inherit;
		font-size: 0.64rem;
		font-variant-numeric: tabular-nums;
		line-height: 1;
		vertical-align: 0.08em;
		cursor: pointer;
		transition-property: background-color, color, scale;
		transition-duration: 150ms;
		transition-timing-function: ease-out;
	}

	.annotation-inline-trigger:hover,
	.annotation-inline-trigger:focus-visible,
	.annotation-inline-trigger[aria-expanded="true"] {
		background: rgba(196, 52, 43, 0.09);
		color: var(--accent);
		outline: none;
	}

	.annotation-inline-trigger:active {
		scale: 0.96;
	}

	.annotation-inline-icon {
		position: relative;
		display: inline-block;
		width: 0.62rem;
		height: 0.48rem;
		border: 1px solid currentColor;
		border-radius: 2px;
	}

	.annotation-inline-icon::after {
		content: "";
		position: absolute;
		bottom: -0.17rem;
		left: 0.12rem;
		width: 0.2rem;
		height: 0.2rem;
		border-bottom: 1px solid currentColor;
		border-left: 1px solid currentColor;
		background: transparent;
		transform: skewY(-36deg);
	}

	.annotation-inline-content {
		margin-left: 0.3em;
		padding: 0.08em 0.34em 0.1em;
		border-left: 1px solid rgba(196, 52, 43, 0.3);
		background: rgba(196, 52, 43, 0.038);
		color: var(--ink);
		font-size: 0.78rem;
		line-height: 1.52;
		text-wrap: pretty;
		vertical-align: baseline;
	}

	.annotation-inline-note {
		margin: 0;
	}
}

@media (max-width: 780px) {
	html {
		font-size: 16px;
	}

	.page {
		padding: 1.8rem 1rem 3.2rem;
	}

	.article-hero {
		margin-bottom: 2rem;
		padding-top: 0.4rem;
		padding-bottom: 1.4rem;
	}

	.article-deck {
		font-size: 1.02rem;
	}

	.table-of-contents {
		margin-bottom: 2.5rem;
	}

	.table-of-contents ol {
		grid-template-columns: 1fr;
		gap: 0;
	}

	.article-body h2 {
		margin-top: 2.6rem;
		font-size: 1.3rem;
	}

	blockquote.quote-block {
		font-size: 1.16rem;
	}

	table {
		font-size: 0.82rem;
	}

	.annotation-popover {
		max-width: calc(100vw - 1.5rem);
	}
}

@media print {
	html,
	body {
		background: #fff;
	}

	.page {
		width: 100%;
		padding: 0;
	}

	.article-hero {
		margin-inline: 0;
		padding-inline: 0;
	}

	a {
		color: inherit;
	}

	.annotation-popover,
	.annotation-panel {
		display: none !important;
	}
}
`.trim(),uo=`
#reader-controls {
	position: fixed;
	right: 1.4rem;
	bottom: 1.4rem;
	z-index: 40;
	display: flex;
	gap: 0.4rem;
}

.reader-control-button {
	appearance: none;
	display: inline-flex;
	align-items: center;
	gap: 0.42rem;
	min-height: 1.9rem;
	padding: 0.34rem 0.82rem;
	border: 1px solid var(--line, #d8d1c6);
	border-radius: 999px;
	background: var(--paper, #fbf8f1);
	color: var(--muted, #77736a);
	font-family: inherit;
	font-size: 0.8rem;
	font-weight: 500;
	line-height: 1;
	letter-spacing: 0.01em;
	cursor: pointer;
	opacity: 0.78;
	box-shadow: 0 2px 10px rgba(60, 45, 30, 0.07);
	transition: opacity 180ms ease, color 180ms ease, background-color 180ms ease,
		border-color 180ms ease, box-shadow 180ms ease, transform 120ms ease;
}

.reader-control-button:hover,
.reader-control-button:focus-visible {
	opacity: 1;
	color: var(--accent, #c7352b);
	background: var(--accent-soft, #f8ede9);
	border-color: var(--accent, #c7352b);
	box-shadow: 0 5px 18px rgba(60, 45, 30, 0.12);
	outline: none;
}

.reader-control-button:active {
	transform: translateY(1px);
}

.reader-control-glyph {
	display: inline-flex;
	font-size: 0.9rem;
	line-height: 1;
	opacity: 0.85;
}

.reader-control-label {
	white-space: nowrap;
}

.reader-control-copy.is-done {
	opacity: 1;
	color: #2f7a4b;
	background: rgba(47, 122, 75, 0.1);
	border-color: rgba(47, 122, 75, 0.42);
}

.reader-control-copy.is-empty {
	opacity: 1;
	color: var(--muted, #77736a);
	background: var(--paper, #fbf8f1);
}

@media (max-width: 1023px) {
	#reader-controls {
		right: 0.95rem;
		bottom: 0.95rem;
	}
}

@media (max-width: 600px) {
	.reader-control-label {
		display: none;
	}

	.reader-control-button {
		min-width: 1.9rem;
		padding: 0.4rem;
		justify-content: center;
	}
}

@media print {
	#reader-controls {
		display: none !important;
	}
}
`.trim(),ro=`
(() => {
	"use strict";

	var controls = document.getElementById("reader-controls");
	if (!controls) return;

	function gatherHighlights() {
		var seen = {};
		var order = [];
		var marks = document.querySelectorAll(".annotation-mark");
		for (var i = 0; i < marks.length; i++) {
			var id = marks[i].getAttribute("data-annotation-id") || ("_" + i);
			if (!Object.prototype.hasOwnProperty.call(seen, id)) { seen[id] = ""; order.push(id); }
			seen[id] += marks[i].textContent || "";
		}
		var notes = {};
		var cards = document.querySelectorAll(".annotation-card");
		for (var j = 0; j < cards.length; j++) {
			var cid = cards[j].getAttribute("data-annotation-id");
			if (!cid) continue;
			var noteEl = cards[j].querySelector(".annotation-note");
			var noteText = noteEl ? (noteEl.textContent || "").trim() : "";
			if (noteText) notes[cid] = noteText;
		}
		var noteLabel = controls.getAttribute("data-note-label") || "Note";
		var lines = [];
		for (var k = 0; k < order.length; k++) {
			var oid = order[k];
			var quote = (seen[oid] || "").replace(/\\s+/g, " ").trim();
			if (!quote) continue;
			var block = (k + 1) + ". " + quote;
			if (notes[oid]) block += "\\n   " + noteLabel + "\uFF1A " + notes[oid];
			lines.push(block);
		}
		return lines;
	}

	function flash(button, cls, message) {
		var labelEl = button.querySelector(".reader-control-label");
		var original = labelEl ? labelEl.textContent : null;
		button.classList.add(cls);
		if (labelEl && message != null) labelEl.textContent = message;
		window.setTimeout(function () {
			button.classList.remove(cls);
			if (labelEl && original != null) labelEl.textContent = original;
		}, 1600);
	}

	function fallbackCopy(text) {
		try {
			var ta = document.createElement("textarea");
			ta.value = text;
			ta.style.position = "fixed";
			ta.style.opacity = "0";
			document.body.appendChild(ta);
			ta.focus();
			ta.select();
			var ok = document.execCommand("copy");
			document.body.removeChild(ta);
			return ok;
		} catch (e) { return false; }
	}

	function copyText(text) {
		if (navigator.clipboard && navigator.clipboard.writeText) {
			return navigator.clipboard.writeText(text);
		}
		return new Promise(function (resolve, reject) {
			fallbackCopy(text) ? resolve() : reject(new Error("copy failed"));
		});
	}

	function onCopy(button) {
		var lines = gatherHighlights();
		if (!lines.length) {
			flash(button, "is-empty", controls.getAttribute("data-empty-text"));
			return;
		}
		var text = lines.join("\\n\\n");
		var doneText = (controls.getAttribute("data-copied-text") || "{count}").replace("{count}", String(lines.length));
		copyText(text).then(function () {
			flash(button, "is-done", doneText);
		}).catch(function () {
			if (fallbackCopy(text)) flash(button, "is-done", doneText);
			else flash(button, "is-empty", controls.getAttribute("data-failed-text"));
		});
	}

	controls.addEventListener("click", function (event) {
		var target = event.target instanceof Element ? event.target.closest("[data-action]") : null;
		if (!target) return;
		if (target.getAttribute("data-action") === "copy-highlights") onCopy(target);
	});
})();
`.trim();

/* nosourcemap */