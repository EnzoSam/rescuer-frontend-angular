import{k as l,m as h}from"./chunk-MWYAYKLC.js";import{J as c,M as n,pb as u}from"./chunk-6X42ZUM2.js";var g=(()=>{let i=class i extends l{constructor(e){super(e),this._httpClient=e,this.nameSpace="usefuldata"}new(){return{id:void 0,data:"",description:"",contacts:[]}}getAll(){return new Promise((e,s)=>{this._httpClient.get(this.getBaseUrlNameSpace()).subscribe(r=>{e(r)},r=>{s({statusCode:500,message:r})})})}getById(e){return new Promise((s,r)=>{this._httpClient.get(this.getBaseUrlNameSpace()+""+e).subscribe(t=>{s(t)},t=>{r({statusCode:500,message:t})})})}createOrUpdeate(e){return console.log(e),e.id?this.update(e):this.create(e)}update(e){return new Promise((s,r)=>{this._httpClient.put(this.getBaseUrlNameSpace(),e).subscribe(t=>{console.log(t),s(t)},t=>{r({statusCode:500,message:t})})})}create(e){return new Promise((s,r)=>{this._httpClient.post(this.getBaseUrlNameSpace(),e).subscribe(t=>{s(t)},t=>{r({statusCode:500,message:t})})})}delete(e){return new Promise((s,r)=>{this._httpClient.delete(this.getBaseUrlNameSpace()+""+e.id).subscribe(t=>{s(t)},t=>{r({statusCode:500,message:t})})})}};i.\u0275fac=function(s){return new(s||i)(n(u))},i.\u0275prov=c({token:i,factory:i.\u0275fac,providedIn:"root"});let o=i;return o})();var a={Country:"country",Province:"province",Town:"town",Neighborhood:"neighborhood",Location:"location"};var P=(()=>{let i=class i extends l{constructor(e,s){super(e),this._httpClient=e,this._uiService=s,this.nameSpace="zones"}new(){return{id:void 0,name:"",code:"",zoneType:"",parentZoneId:void 0}}loadAppLocation(){this.getRoots().then(e=>{e.data.length>0&&this._uiService.setZoneStatus(e.data.at(0))})}getAll(){return new Promise((e,s)=>{this._httpClient.get(this.getBaseUrlNameSpace()).subscribe(r=>{e(r)},r=>{s({statusCode:500,message:r})})})}getRoots(){return new Promise((e,s)=>{this._httpClient.get(this.getBaseUrlNameSpace()+"roots").subscribe(r=>{e(r)},r=>{s({statusCode:500,message:r})})})}createOrUpdeate(e){return console.log(e),e.id?this.update(e):this.create(e)}update(e){return new Promise((s,r)=>{this._httpClient.put(this.getBaseUrlNameSpace(),e).subscribe(t=>{console.log(t),s(t)},t=>{r({statusCode:500,message:t})})})}create(e){return new Promise((s,r)=>{this._httpClient.post(this.getBaseUrlNameSpace(),e).subscribe(t=>{console.log(t),s(t)},t=>{r({statusCode:500,message:t})})})}delete(e){return new Promise((s,r)=>{this._httpClient.delete(this.getBaseUrlNameSpace()+""+e.id).subscribe(t=>{s(t)},t=>{r({statusCode:500,message:t})})})}getById(e){return new Promise((s,r)=>{this._httpClient.get(this.getBaseUrlNameSpace()+""+e).subscribe(t=>{s(t)},t=>{r({statusCode:500,message:t})})})}getChildType(e){return!e||e===""?"":e===a.Country?a.Province:e===a.Province?a.Town:e===a.Town?a.Neighborhood:a.Location}getName(e){return!e||e===""?"":e===a.Country?"Pais":e===a.Province?"Provincia":e===a.Town?"Ciudad":e===a.Neighborhood?"Barrio":"Zona"}getByParent(e){return new Promise((s,r)=>{this._httpClient.get(this.getBaseUrlNameSpace()+"childs/"+e).subscribe(t=>{s(t)},t=>{r({statusCode:500,message:t})})})}};i.\u0275fac=function(s){return new(s||i)(n(u),n(h))},i.\u0275prov=c({token:i,factory:i.\u0275fac,providedIn:"root"});let o=i;return o})();export{g as a,a as b,P as c};