(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["mohammad"],{"5fcb":function(e,t,n){"use strict";n.r(t);var a=n("7a23"),r=Object(a["j"])("div",{class:"flex justify-center"},null,-1),c={class:"flex items-center flex-col space-y-4"},u=Object(a["j"])("p",null,"ripple effect",-1),o=Object(a["i"])(" some text ");function i(e,t,n,i,s,l){var b=Object(a["C"])("t-button"),f=Object(a["C"])("t-pagination");return Object(a["u"])(),Object(a["f"])(a["a"],null,[r,Object(a["j"])("div",c,[Object(a["j"])("div",null,[u,Object(a["j"])(b,{variant:"warning",icon:"accessible",ripple:""},{default:Object(a["M"])((function(){return[o]})),_:1})]),Object(a["j"])(f,{currentPage:1,maxPages:12})])],64)}var s=n("b0c5"),l={class:"w-1/2"},b={class:"flex flex-row items-center justify-center bg-white p-4 w-full border-t mt-3 justify-between"},f={class:"flex"};function p(e,t,n,r,c,u){return Object(a["u"])(),Object(a["f"])("div",l,[Object(a["j"])("div",b,[Object(a["j"])("button",{class:"rounded-sm bg-white p-3 mx-2 outline-none focus:outline-none shadow font-bold",onClick:t[1]||(t[1]=function(t){return e.setCurrentPage(1)})}," اولین صفحه "),Object(a["j"])("div",f,[(Object(a["u"])(!0),Object(a["f"])(a["a"],null,Object(a["A"])(e.pagination,(function(t){return Object(a["u"])(),Object(a["f"])("button",{id:e.currentPageVar,key:t.page,class:[{"text-white bg-primary":t.page===e.currentPageVar},"rounded-sm bg-white px-3 py-1 mx-1 focus:outline-none shadow "],onClick:function(n){return e.setCurrentPage(t.page)}},Object(a["F"])(t.page),11,["id","onClick"])})),128))]),Object(a["j"])("button",{class:"rounded-sm bg-white p-3 mx-2 focus:outline-none shadow font-bold",onClick:t[2]||(t[2]=function(t){return e.setCurrentPage(e.maxPages)})}," آخرین صفحه ")])])}n("a9e3");var j=Object(a["k"])({name:"TPagination",props:{maxPages:{type:Number,default:1},currentPage:{type:Number,default:1}},setup:function(e,t){var n=t.emit,r=Object(a["z"])(e.currentPage),c=Object(a["d"])((function(){var t=[],n=r.value,a=e.maxPages;if(a-n<3)for(var c=n-6+a-n;c<n-3;c++)c>0&&t.push({page:c});for(var u=n-3;u<n;u++)u>0&&t.push({page:u});t.push({page:n});for(var o=n+1;o<n+4;o++)o<=a&&t.push({page:o});if(n<4){console.log({max:a,current:n,diffmax:a-n});for(var i=n+4;i<n+4+(4-n);i++)i>0&&t.push({page:i})}return t})),u=function(e){r.value=e,n("pagechange",{currentPageVar:r})};return{setCurrentPage:u,currentPageVar:r,pagination:c}}});j.render=p;var g=j,d=Object(a["k"])({name:"App",components:{TButton:s["a"],TPagination:g},setup:function(){var e=Object(a["z"])(3),t=Object(a["z"])(!1),n=function(){return console.log("modal has been closed"),!0};return{numberPickerCount:e,modal:t,modalCloseCallback:n}}});d.render=i;t["default"]=d}}]);
//# sourceMappingURL=mohammad.0904cf81.js.map