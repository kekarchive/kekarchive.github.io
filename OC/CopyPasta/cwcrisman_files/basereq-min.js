function getElementsByClassName(b,f,a){var e=((f=="*"&&document.all)?document.all:b.getElementsByTagName(f));var h=new Array();a=a.replace(/\-/g,"\\-");var g=new RegExp("(^|\\s)"+a+"(\\s|$)");var d;for(var c=0;c<e.length;c++){d=e[c];if(g.test(d.className)){h.push(d)}}return(h)}function trim(a){while(a.length>0&&a[0]==" "){a=a.substr(1)}while(a.length>1&&a[length-1]==" "){a=a.substr(0,a.length-2)}return a}function setChild(f,a,b){var h=a.childNodes;for(var d=0;d<h.length;d++){try{var c=h[d].id;if(c){h[d].id=f+c+b}}catch(g){}setChild(f,h[d],b)}}var counter=0;function divClone(d,b,f){var a=document.getElementById(b).cloneNode(true);counter++;document.getElementById(d+"num").value=counter;a.id=d+counter;var e=a.childNodes;a.style.display="";setChildNodes(d,a,counter);var c=document.getElementById(f);c.parentNode.insertBefore(a,c);if(did("prefixtable")){prettify("prefixtable")}}function clearAllRows(b){for(var a=0;a<=counter;a++){deleteRow(b,b+"_"+a)}counter=0}function deleteRow(b,d){d=d.split("_");d=d[d.length-1];var c=document.getElementById(b+d);if(c){c.parentNode.removeChild(c);var a=document.getElementById(b+"location");if(a&&a.innerHTML){a.innerHTML=""}}if(did("prefixtable")){prettify("prefixtable")}}var g_processUrl="/go/process";function setProcessUrl(a){g_processUrl=a}function did(a){return document.getElementById(a)}function sendRequest(b){var a=did("loading");if(a){a.src="/images/loading.gif"}req=false;if(window.XMLHttpRequest){try{req=new XMLHttpRequest()}catch(c){req=false}}else{if(window.ActiveXObject){try{req=new ActiveXObject("Msxml2.XMLHTTP")}catch(c){try{req=new ActiveXObject("Microsoft.XMLHTTP")}catch(c){req=false}}}}if(req){req.onreadystatechange=processReqChange;req.open("POST",g_processUrl,true);req.send("action="+b)}}function processReqChange(){if(req&&req.readyState==4){eval(req.responseText);var el=did("loading");if(el){el.src="/images/blank.png"}}}function submitSpellcheck(c){var a="/go/processspelling";req=false;if(window.XMLHttpRequest){try{req=new XMLHttpRequest()}catch(b){req=false}}else{if(window.ActiveXObject){try{req=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{req=new ActiveXObject("Microsoft.XMLHTTP")}catch(b){req=false}}}}if(req){req.onreadystatechange=processReqChange;req.open("POST",a,true);req.send("id="+c+"&text="+encodeURIComponent(did(c).value))}}function submitPreview(c){var a="/go/processpreview";req=false;if(window.XMLHttpRequest){try{req=new XMLHttpRequest()}catch(b){req=false}}else{if(window.ActiveXObject){try{req=new ActiveXObject("Msxml2.XMLHTTP")}catch(b){try{req=new ActiveXObject("Microsoft.XMLHTTP")}catch(b){req=false}}}}if(req){req.onreadystatechange=processReqChange;req.open("POST",a,true);req.send("id="+c+"&text="+encodeURIComponent(did(c).value))}}function initSortableTables(){$.each($(".mbgen"),function(){var a=($(this).attr("id"));if(!a){return}header=$("#"+a).find("th").filter(function(b){this.index=b+1;return b in {0:0,1:0,3:0,4:0,6:0}});$.each(header,function(){var b=1;$(this).css("cursor","pointer").css("text-decoration","underline");$(this).click(function(c){sortRows(a,this.index,b);b*=-1})})})}function sortRows(f,b,a){var d=$("#"+f).children().children("tr[id^=tr]"),e="number";$.each(d,function(){if(isNaN(Number($(this).children(":nth-child("+b+")").text().replace(",","")))){e="text"}});var c=$.map(d,function(h){var g=$(h).children(":nth-child("+b+")").text().replace(/[ '":;,]/g,"").replace(String.fromCharCode(160),"");return{row:$(h).html(),cell:e=="text"?g:Number(g),className:$(h).attr("class"),display:$(h).css("display")}});c.sort(function(h,g){if(a==-1){if(!h.cell){h.cell=(e=="number"?Infinity:"ZZZZZZ")}if(!g.cell){g.cell=(e=="number"?Infinity:"ZZZZZZ")}}if(h.cell<g.cell){return 1*a}if(h.cell>g.cell){return -1*a}return 0});$.each(d,function(){var g=c.shift();$(this).html(g.row);$(this).attr("class",g.className);$(this).css("display",g.display)})}function prettify(b){if(b=="casts"){b="cast_members"}if(b=="crews"){b="crew_members"}var k=darkcolors[b];var e=lightcolors[b];var m=document.getElementById(b).getElementsByTagName("tr");var h=m.length;var g=0;for(var f=1;f<h;f++){var a=m[f];if(a.style&&a.style.display!="none"){g=!g;a.style.background=g?k:e;var d=a.getElementsByTagName("td");var l=d.length;for(var j=1;j<h;j++){var c=d[j];if(c&&c.getElementsByTagName("input")&&c.getElementsByTagName("input")[0]){c.getElementsByTagName("input")[0].style.background=g?k:e}}}}}var Position=(function(){function a(d){if(document.getElementById&&document.getElementById(d)!=null){return document.getElementById(d)}else{if(document.all&&document.all[d]!=null){return document.all[d]}else{if(document.anchors&&document.anchors.length&&document.anchors.length>0&&document.anchors[0].x){for(var c=0;c<document.anchors.length;c++){if(document.anchors[c].name==d){return document.anchors[c]}}}}}}var b={};b.$VERSION=1;b.set=function(e,d,c){if(typeof(e)=="string"){e=a(e)}if(e==null||!e.style){return false}if(typeof(d)=="object"){var f=d;d=f.left;c=f.top}e.style.left=d+"px";e.style.top=c+"px";return true};b.get=function(f){var g=true;if(typeof(f)=="string"){f=a(f)}if(f==null){return null}var h=0;var j=0;var d=0;var m=0;var i=null;var c=null;c=f.offsetParent;var k=f;var e=f;while(e.parentNode!=null){e=e.parentNode;if(e.offsetParent==null){}else{var l=true;if(g&&window.opera){if(e==k.parentNode||e.nodeName=="TR"){l=false}}if(l){if(e.scrollTop&&e.scrollTop>0){j-=e.scrollTop}if(e.scrollLeft&&e.scrollLeft>0){h-=e.scrollLeft}}}if(e==c){h+=f.offsetLeft;if(e.clientLeft&&e.nodeName!="TABLE"){h+=e.clientLeft}j+=f.offsetTop;if(e.clientTop&&e.nodeName!="TABLE"){j+=e.clientTop}f=e;if(f.offsetParent==null){if(f.offsetLeft){h+=f.offsetLeft}if(f.offsetTop){j+=f.offsetTop}}c=f.offsetParent}}if(k.offsetWidth){d=k.offsetWidth}if(k.offsetHeight){m=k.offsetHeight}return{left:h,top:j,width:d,height:m}};b.getCenter=function(d){var e=this.get(d);if(e==null){return null}e.left=e.left+(e.width/2);e.top=e.top+(e.height/2);return e};return b})();function toggleSub(e,d,a,c,b){did("sub_"+e+"_"+d+"_"+a).src="/images/loading.gif";sendRequest("Subscription|"+token+"|"+e+"|"+d+"|"+a+"|"+c)}function toggleFav(d,c,a,b){did("fav_"+d+"_"+c+"_"+a).src="/images/loading.gif";sendRequest("Favorite|"+token+"|"+d+"|"+c+"|"+a)}function minidoc_update(a,b){var c=encodeURIComponent(did("minidoc_body_ta_"+a).value);sendRequest("Minidoc|"+token+"|"+a+"|"+b+"|"+c)}function tagClick(c,g,b,a){if(token==""){return}var f=-1;current_id=g;var d=document.getElementById("tagger1");d.style.position="absolute";var e=did("tag_img_"+g+"_"+b+"_"+a);var h=Position.get(e);d.style.top=(h.top+h.height)+"px";d.style.left=h.left-200+"px";d.style.visibility="visible";did("tagger_assoc_id").value=g;did("tagger_type").value=b;did("tagger_context").value=a;sendRequest("LoadTags|"+token+"|"+g+"|"+b+","+a+","+f);setOverlay(true)}var g_spellingList=null;var g_type="a";var g_lastId=null;function goLink(a){if(g_type=="a"){pnhTextareaInsert(g_lastId,"","[Artist"+a+"]")}else{if(g_type=="l"){pnhTextareaInsert(g_lastId,"","[Album"+a+"]")}else{if(g_type=="b"){pnhTextareaInsert(g_lastId,"","[Label"+a+"]")}}}cancelSearch(g_lastId)}function initTextarea(a){did(a+"_preview").style.display="none";setButtons("normal",a);did("ta_searchfields_"+a).style.display="none"}function startSearch(d,c){did("ta_searchfields_"+d).style.display="";g_type=c;did("searchname_"+d).value="";var b=did("ta_search_instruct_"+d);while(b.hasChildNodes()){b.removeChild(b.firstChild)}var a;if(c=="a"){a="Type artist's name"}else{if(c=="l"){a="First, search for the artist :"}else{if(c=="b"){a="Type label name"}}}b.appendChild(document.createTextNode(a))}function cancelSearch(b){did("ta_searchfields_"+b).display="none";var a=did("searchbox"+b);a.style.height="1px";a.style.width="1px";a.style.visibility="hidden";a.src="/go/search?ta&searchterm=&searchtype=";did("ta_searchfields_"+b).style.display="none"}function goSearch(b){var a=did("searchbox"+b);a.style.top="0";a.style.left="0";a.style.height="200px";a.style.width="415px";a.style.visibility="visible";a.src="/go/search?ta&searchterm="+escape(did("searchname_"+b).value)+"&searchtype="+((g_type=="l")?"a":g_type)+"&searchdest="+g_type;g_lastId=b}function replaceWord(b,a,c){pnhTextareaReplace(c,"",g_spellingList[a][b])}function setButtons(d,e){var a;var b;if(d=="normal"){b=new Array("ta_bold_"+e,"ta_italic_"+e,"ta_link_"+e,"ta_connectArtist_"+e,"ta_connectRelease_"+e,"ta_connectLabel_"+e,"ta_connectText_"+e,"reviewsavebtn","ta_spellcheck_"+e,"ta_preview_btn_"+e,"ta_submit_"+e);a=new Array("ta_cancelpreview_btn_"+e)}else{if(d=="preview"){cancelSearch(e);a=new Array("ta_bold_"+e,"ta_italic_"+e,"ta_link_"+e,"ta_connectArtist_"+e,"ta_connectRelease_"+e,"ta_connectLabel_"+e,"ta_connectText_"+e,"reviewsavebtn","ta_spellcheck_"+e,"ta_preview_btn_"+e,"ta_submit_"+e);b=new Array("ta_cancelpreview_btn_"+e)}}for(var e in a){var c=did(a[e]);if(c){c.style.visibility="hidden"}}for(var e in b){var c=did(b[e]);if(c){c.style.visibility="visible"}}}function cancelPreview(a){setButtons("normal",a);did(a+"_preview").style.display="none"}function previewO(a){did(a+"_preview").innerHTML='Loading preview... <img src="/images/loading.gif">';did(a+"_preview").style.display="";submitPreview(a)}function preview(a){setButtons("preview",a);did(a+"_preview").innerHTML='Loading preview... <img src="/images/loading.gif">';did(a+"_preview").style.display="";submitPreview(a)}function hidePopup(a){did("popupblanket").style.display="none";did(a).style.display="none"}function showPopup(b,e,a){viewport=getViewportDimensions();var d=Math.round((viewport[0]-e)/2);var c=Math.round((viewport[1]-a)/2);did(b).style.width=e+"px";did(b).style.height=a+"px";did(b).style.marginTop=-(a/2)+"px";did(b).style.marginLeft=-(e/2)+"px";did("popupblanket").style.display="block";did(b).style.display="block"}function getViewportDimensions(){var b=0,a=0;if(typeof(window.innerWidth)=="number"){b=window.innerWidth;a=window.innerHeight}else{if(document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)){b=document.documentElement.clientWidth;a=document.documentElement.clientHeight}}return new Array(b,a)}function voteGenre(f,d,c,b,e,a){sendRequest("VoteGenre|"+login_token+"|"+f+"|"+d+"|"+c+"|"+b+"|"+e+"|"+encodeURIComponent(a))}function reportGenre(d,c,b,a){if(confirm("Genre reporting should ONLY be used if this genre/film was voted with malicious/abusive intent (such as voting 'Death Metal' for a Britney Spears album). It should NOT be used for genres you simply disagree with (in which case, you vote against the genre using the '-' button).  If you misreport genre votes, you will lose your ability to vote on genres.  Are you sure want to report this?")){sendRequest("ReportGenre|"+login_token+"|"+d+"|"+c+"|"+b+"|"+a)}}function pnhTextareaReplace(a,e){var c=document.getElementById(a);if(document.selection){var f=document.selection.createRange().text;c.focus();var d=document.selection.createRange();d.text=e}else{if(c.selectionStart|c.selectionStart==0){if(c.selectionEnd>c.value.length){c.selectionEnd=c.value.length}var g=c.selectionStart;var b=c.selectionEnd+e.length;c.value=c.value.slice(0,g)+e+c.value.slice(c.selectionEnd);c.selectionStart=g+e.length;c.selectionEnd=b;c.focus()}}}function pnhTextareaInsert(a,f,d){var c=document.getElementById(a);if(document.selection){var g=document.selection.createRange().text;c.focus();var e=document.selection.createRange();e.text=f+g+d}else{if(c.selectionStart|c.selectionStart==0){if(c.selectionEnd>c.value.length){c.selectionEnd=c.value.length}var h=c.selectionStart;var b=c.selectionEnd+f.length;c.value=c.value.slice(0,h)+f+c.value.slice(h);c.value=c.value.slice(0,b)+d+c.value.slice(b);c.selectionStart=h+f.length;c.selectionEnd=b;c.focus()}}}function pnhEditTextarea(f,e){var d="";var c="";switch(e){case"strong":d="[b]";c="[/b]";break;case"emphasis":d="[i]";c="[/i]";break;case"a_href":var b=prompt("Please enter the site you'd like to link","http://");var a=prompt("Please enter the name of this link","");if(b!=null&&a!=null){d="["+b+","+a+"]";c=""}else{d="";c=""}break}pnhTextareaInsert(f,d,c);return false};