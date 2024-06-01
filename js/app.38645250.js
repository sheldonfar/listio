(function(){"use strict";var t={6312:function(t,e,s){var a=s(7195),i=s(4359),r=s(7244),n=(s(7024),function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("Navbar"),e("div",{staticClass:"d-flex flex-column px-2 px-md-4",attrs:{id:"content"}},[e("Settings"),e("NavList"),e("Totals")],1),e("Bottombar")],1)}),o=[],l=s(408),c=function(){var t=this,e=t._self._c;return e("div",[e("b-navbar",{attrs:{tag:"div",fixed:"top",type:"dark",variant:"dark"}},[t.archives.length>0?e("b-icon",{directives:[{name:"b-toggle",rawName:"v-b-toggle.sidebar-variant",modifiers:{"sidebar-variant":!0}}],attrs:{variant:"light",size:"lg",role:"button","font-scale":"1.5",icon:"list"}},[t._v(" NavBar ")]):t._e(),t.currentArchive?e("span",{staticClass:"mx-4 text-light"},[t._v(" Viewing archive: "),e("b",[t._v(t._s(t.currentArchive.name))])]):t._e(),t.currentArchive?e("b-button",{staticClass:"mr-2",attrs:{variant:"outline-primary"},on:{click:t.handleClearCurrentArchive}},[t._v(" Close ")]):t._e(),e("b-navbar-nav",{staticClass:"ml-auto d-flex align-items-center",attrs:{tag:"div"}},[e("span",{staticClass:"text-light"},[t._v(" "+t._s(t.totalHours)+"h / "+t._s(t.totalMoneyNoCashTips)+" pln ")]),t.currentArchive?t._e():e("b-button",{directives:[{name:"b-modal",rawName:"v-b-modal.confirm-archive-modal",modifiers:{"confirm-archive-modal":!0}}],staticClass:"ml-4",attrs:{variant:"outline-danger"}},[t._v(" Archive ")]),e("b-modal",{ref:"modal",attrs:{id:"confirm-archive-modal",title:"Confirm archiving of all records"},on:{hidden:t.resetModal,ok:t.handleOk}},[e("p",{staticClass:"mb-4"},[t._v(" By clicking OK you confirm that all records will be archived (you can still access them from the left menu) ")]),e("p",{staticClass:"my-4"},[t._v(" To proceed please type the name of the new archive: ")]),e("form",{ref:"form"},[e("b-form-group",{attrs:{"invalid-feedback":"Archive name is required",state:t.archiveNameState}},[e("b-form-input",{attrs:{autofocus:"",state:t.archiveNameState,required:""},model:{value:t.archiveName,callback:function(e){t.archiveName=e},expression:"archiveName"}})],1)],1)])],1)],1),e("b-sidebar",{attrs:{id:"sidebar-variant",title:"Archives","bg-variant":"dark","text-variant":"light",shadow:"",backdrop:""}},[e("div",{staticClass:"px-3 py-2"},[e("nav",{staticClass:"mb-3"},[e("b-nav",{attrs:{vertical:""}},t._l(t.archives,(function(s){return e("div",{key:s.id},[e("b-nav-item",{directives:[{name:"b-toggle",rawName:"v-b-toggle.sidebar-variant",modifiers:{"sidebar-variant":!0}}],attrs:{disabled:t.currentArchive&&s.id===t.currentArchive.id},on:{click:function(e){return t.handleLoadArchive(s.id)}}},[t._v(" "+t._s(s.name)+" ")]),t.currentArchive&&s.id===t.currentArchive.id?e("ul",{staticClass:"nav flex-column"},[e("li",{directives:[{name:"b-modal",rawName:"v-b-modal.confirm-rename-archive-modal",modifiers:{"confirm-rename-archive-modal":!0}}],staticClass:"nav-item not-collapsed pl-4"},[t._v(" Rename ")]),e("li",{directives:[{name:"b-modal",rawName:"v-b-modal.confirm-remove-archive-modal",modifiers:{"confirm-remove-archive-modal":!0}}],staticClass:"nav-item not-collapsed pl-4"},[t._v(" Delete ")])]):t._e()],1)})),0)],1)])]),e("b-modal",{ref:"rename-archive-modal",attrs:{id:"confirm-rename-archive-modal",title:"Enter new name of this archive"},on:{hidden:t.resetEditArchiveModal,ok:t.handleRenameArchive}},[e("p",{staticClass:"mb-4"},[t._v(" Please type new name of the archive: ")]),e("form",{ref:"form"},[e("b-form-group",{attrs:{"invalid-feedback":"Archive name is required",state:t.newArchiveNameState}},[e("b-form-input",{attrs:{autofocus:"",state:t.newArchiveNameState,required:""},model:{value:t.newArchiveName,callback:function(e){t.newArchiveName=e},expression:"newArchiveName"}})],1)],1)]),e("b-modal",{ref:"remove-archive-modal",attrs:{id:"confirm-remove-archive-modal",title:"Remove archive?"},on:{ok:t.handleRemoveArchive}},[e("p",{staticClass:"my-4"},[t._v(" Click OK to remove the archive ")])])],1)},d=[],u=(s(560),s(9619)),p=s(6010);const m=t=>{const e=localStorage.getItem(t);return JSON.parse(e)},h=(t,e)=>{const s=JSON.stringify(e);localStorage.setItem(t,s)},v=t=>{localStorage.removeItem(t)},f=t=>{Object.keys(t).forEach((e=>{localStorage.setItem(e,t[e])}))},g=()=>{const t=new Blob([[JSON.stringify(localStorage)]],{type:"text/plain;charset=utf-8"});(0,p.saveAs)(t,`[${(new Date).toDateString()}] list.json`)},b="tips/ADD_INTEREST",_="tips/REMOVE_INTEREST",y="tips/CLEAR_INTERESTS",R="tips/SET_INTERESTS",T="tips/SAVE_INTERESTS",S="tips/LOAD_INTERESTS",C={interests:[]},E={getListInterests:t=>e=>t.interests.filter((t=>t.listId===e)),getInterestById:t=>e=>t.interests.find((t=>t.id===e)),getInterestGrossValue:(t,e)=>t=>{const s=e.getInterestById(t);return s.value-s.discountPercent*s.value/100}},w={[R](t,e){t.interests=e},[b](t,e){const s={...e,id:(0,u.Z)()};t.interests.push(s)},[y](t){t.interests=[]},[_](t,e){t.interests=t.interests.filter((({id:t})=>t!==e))}},I={async[b](t,e){t.commit(b,e),await t.dispatch(T)},async[_](t,e){t.commit(_,e),await t.dispatch(T)},async[S](t){const e=m("interests");e&&t.commit(R,e)},async[y](t){t.commit(y),await t.dispatch(T)},async[R](t,e){t.commit(R,e),await t.dispatch(T)},[T](t){h("interests",t.state.interests)}};var x={state:C,getters:E,mutations:w,actions:I};const A="records/SET_RECORDS",L="records/SAVE_RECORDS",N="records/LOAD_RECORDS",D="tips/CLEAR_RECORDS",k="records/ADD_RECORD",P="records/EDIT_RECORD",O="records/REMOVE_RECORD",V={records:[]},M={getListRecords:t=>e=>t.records.filter((t=>t.listId===e))},H={[A](t,e){t.records=e},[k](t,e){const s={...e,id:(0,u.Z)()};t.records.push(s)},[P](t,e){const s=t.records.find((t=>t.id===e.id));Object.assign(s,e)},[D](t){t.records=[]},[O](t,e){t.records=t.records.filter((({id:t})=>t!==e))}},q={async[k](t,e){t.commit(k,e),await t.dispatch(L)},async[P](t,e){t.commit(P,e),await t.dispatch(L)},async[O](t,e){t.commit(O,e),await t.dispatch(L)},async[N](t){const e=m("records");e&&t.commit(A,e)},async[D](t){t.commit(D),await t.dispatch(L)},async[A](t,e){t.commit(A,e),await t.dispatch(L)},[L](t){h("records",t.state.records)}};var B={state:V,getters:M,mutations:H,actions:q};const Z="tips/ADD_TIP",$="tips/REMOVE_TIP",j="tips/CLEAR_TIPS",G="tips/SET_TIPS",F="tips/SAVE_TIPS",z="tips/LOAD_TIPS",U={tips:[]},J={getListTips:t=>e=>t.tips.filter((t=>t.listId===e)),getListTipsByType:t=>(e,s)=>t.tips.filter((t=>t.listId===e&&t.type===s))},X={[G](t,e){t.tips=e},[Z](t,e){const s={...e,id:(0,u.Z)()};t.tips.push(s)},[j](t){t.tips=[]},[$](t,e){t.tips=t.tips.filter((({id:t})=>t!==e))}},K={async[Z](t,e){t.commit(Z,e),await t.dispatch(F)},async[$](t,e){t.commit($,e),await t.dispatch(F)},async[z](t){const e=m("tips");e&&t.commit(G,e)},async[j](t){t.commit(j),await t.dispatch(F)},async[G](t,e){t.commit(G,e),await t.dispatch(F)},[F](t){h("tips",t.state.tips)}};var Q={state:U,getters:J,mutations:X,actions:K};const Y="archives/ADD_ARCHIVE",W="archives/EDIT_ARCHIVE",tt="archives/REMOVE_ARCHIVE",et="archives/LOAD_ARCHIVE",st="archives/CLEAR_CURRENT_ARCHIVE",at="archives/SAVE_ARCHIVES",it="archives/SAVE_CURRENT_ARCHIVE_ID",rt="archives/LOAD_ARCHIVES",nt="archives/SET_ARCHIVES",ot={currentArchiveId:null,archives:[]},lt={archives:t=>t.archives,getArchiveById:t=>e=>t.archives.find((t=>t.id===e)),currentArchive:(t,e)=>e.getArchiveById(t.currentArchiveId)},ct={[nt](t,e){t.archives=e},[et](t,e){t.currentArchiveId=e},[Y](t,e){t.archives.push(e)},[W](t,e){const s=t.archives.find((t=>t.id===e.id));Object.assign(s,e)},[st](t){t.currentArchiveId=null},[tt](t,e){t.archives=t.archives.filter((({id:t})=>t!==e))}},dt={async[Y](t,e){const s={...e,id:(0,u.Z)(),records:t.rootState.records.records,tips:t.rootState.tips.tips,interests:t.rootState.interests.interests};t.commit(Y,s),await t.dispatch(at),await t.dispatch(y),await t.dispatch(D),await t.dispatch(j)},async[st](t){const e=t.state.currentArchiveId;t.commit(st);const s=t.state.archives.find((t=>t.id===e));s&&await t.dispatch(W,{id:e,interests:t.rootState.interests.interests,records:t.rootState.records.records,tips:t.rootState.tips.tips});const a=m("pendingArchive");await t.dispatch(R,a.interests),await t.dispatch(A,a.records),await t.dispatch(G,a.tips),await t.dispatch(it),await t.dispatch(at),v("pendingArchive")},async[et](t,e){if(!t.state.currentArchiveId){const e={records:t.rootState.records.records,tips:t.rootState.tips.tips,interests:t.rootState.interests.interests};h("pendingArchive",e)}t.commit(et,e);const s=t.getters.getArchiveById(e);await t.dispatch(R,s.interests),await t.dispatch(A,s.records),await t.dispatch(G,s.tips),await t.dispatch(it)},async[W](t,e){t.commit(W,e),await t.dispatch(at)},async[tt](t,e){t.commit(tt,e),e===t.state.currentArchiveId?await t.dispatch(st):await t.dispatch(at)},async[rt](t){const e=m("archives"),s=m("currentArchiveId");e&&t.commit(nt,e),s&&t.commit(et,s)},[at](t){h("archives",t.state.archives)},[it](t){h("currentArchiveId",t.state.currentArchiveId)}};var ut={state:ot,getters:lt,mutations:ct,actions:dt},pt={data(){return{archiveName:"",archiveNameState:null,newArchiveName:"",newArchiveNameState:null}},computed:{...(0,l.Se)(["archives","currentArchive","totalHours","totalMoneyNoCashTips"]),defaultArchiveName(){let t,e=0,s=!1;do{t=(new Date).toLocaleString("default",{month:"long",year:"numeric"}),e>0&&(t+=` (${e})`),e+=1,s=this.archives.every((e=>e.name!==t))}while(!s);return t}},watch:{defaultArchiveName:{handler(t){this.archiveName=t},immediate:!0}},methods:{checkFormValidity(){const t=this.$refs.form.checkValidity();return this.archiveNameState=t,t},resetModal(){this.archiveName=this.defaultArchiveName,this.archiveNameState=null},resetEditArchiveModal(){this.newArchiveName="",this.newArchiveNameState=null},handleOk(t){t.preventDefault(),this.handleArchiveRecors()},handleClearCurrentArchive(){this[st]()},handleLoadArchive(t){this[et](t)},handleArchiveRecors(){if(!this.checkFormValidity())return;const t={name:this.archiveName};this[Y](t),this.$nextTick((()=>{this.$bvModal.hide("confirm-archive-modal")}))},handleRenameArchive(){this[W]({id:this.currentArchive.id,name:this.newArchiveName})},handleRemoveArchive(){this[tt](this.currentArchive.id)},...(0,l.nv)([Y,et,st,W,tt])}},mt=pt,ht=s(1001),vt=(0,ht.Z)(mt,c,d,!1,null,null,null),ft=vt.exports,gt=function(){var t=this,e=t._self._c;return e("b-card",{attrs:{"no-body":""}},[e("div",{staticClass:"table-responsive"},[e("b-table",{staticClass:"record-table w-100",attrs:{hover:"",bordered:"",items:t.records,fields:t.fields},on:{"row-clicked":t.handleRowClicked},scopedSlots:t._u([{key:"cell(date)",fn:function(s){return[t.isRecordEditMode&&t.focusedRecordId===s.item.id?e("DatePicker",{attrs:{value:s.item.date},on:{dateSelected:function(e){return t.handleEditRecordDate(e,s.item.id)}}}):e("span",[t._v(t._s(new Date(s.item.date).toLocaleDateString("pl-PL")))])]}},{key:"cell(value)",fn:function(s){return[t.isRecordEditMode&&t.focusedRecordId===s.item.id?e("b-form-input",{staticClass:"value-input",attrs:{type:"number",min:"0",value:s.item.value},on:{blur:function(e){return t.handleEditRecordValue(e,s.item.id)}}}):e("span",[t._v(t._s(s.item.value))])]}},{key:"cell(money)",fn:function(e){return[t._v(" "+t._s(e.item.value*t.hourlyRate)+" pln ")]}},{key:"custom-foot",fn:function(){return[e("tr",[e("th",[e("DatePicker",{attrs:{value:t.newRecordDate},on:{dateSelected:e=>t.newRecordDate=e}})],1),e("th",[e("b-form-input",{staticClass:"value-input",attrs:{"aria-label":"Number of hours",type:"number",min:"0"},on:{blur:function(e){return t.handleAddRecord(t.selectedList.id)}},model:{value:t.newRecordValue,callback:function(e){t.newRecordValue=e},expression:"newRecordValue"}})],1),e("th")]),e("tr",[e("th"),e("th",[t._v(t._s(t.totalHours)+" hours")]),e("th",[t._v(t._s(t.totalMoney)+" pln")])])]},proxy:!0},{key:"row-details",fn:function(s){return[e("b-button",{staticClass:"mr-2",attrs:{variant:"info",disabled:t.isRecordEditMode},on:{click:function(e){return t.handleEnableRecordEditMode(s.item.id)}}},[t._v(" Edit ")]),e("b-button",{staticClass:"mr-2",attrs:{variant:"dark"},on:{click:function(e){return t.handleRemoveRecord(s.item.id)}}},[t._v(" Delete ")])]}}])})],1),e("div",{staticClass:"px-2 pb-2"},[e("Tips",{staticClass:"mb-3",attrs:{"list-id":t.selectedList.id}}),e("Interests",{attrs:{"list-id":t.selectedList.id}})],1)])},bt=[],_t=function(){var t=this,e=t._self._c;return e("div",[e("b-form-tags",{attrs:{"no-outer-focus":""},scopedSlots:t._u([{key:"default",fn:function({inputAttrs:s,inputHandlers:a}){return[e("b-input-group",{staticClass:"root"},[e("input",t._g(t._b({staticClass:"form-control",attrs:{placeholder:"Tip",type:"number"}},"input",s,!1),a)),e("b-input-group-append",[e("b-form-select",{staticClass:"rounded-0",attrs:{options:t.tipTypes},nativeOn:{"!click":function(t){t.stopPropagation()}},model:{value:t.selectedTipType,callback:function(e){t.selectedTipType=e},expression:"selectedTipType"}}),e("b-button",{attrs:{variant:"primary"},on:{click:function(e){return t.addTip(s)}}},[t._v(" Add ")])],1)],1),t.tips.length>0?e("ul",{staticClass:"list-unstyled d-inline-flex flex-wrap mb-0",attrs:{"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions removals"}},t._l(t.tips,(function(s){return e("b-card",{key:s.id,staticClass:"mt-2 mr-2",attrs:{id:s.id,tag:"li","body-class":"py-1 px-2 text-nowrap d-flex align-items-center"}},[e("strong",[t._v(t._s(s.type)+" "+t._s(s.value)+" pln")]),e("b-icon",{staticClass:"ml-4",attrs:{icon:"trash",role:"button","aria-label":"Remove tip"},on:{click:function(e){return t.removeTip(s.id)}}}),e("b-tooltip",{attrs:{target:s.id,triggers:"hover"}},[t._v(" Date: "+t._s(new Date(s.date).toLocaleDateString("pl-PL"))+" ")])],1)})),1):t._e()]}}])}),t.total>0?e("p",{staticClass:"mt-2"},[t._v(" Total tips ("),e("strong",[t._v(t._s(t.tips.length))]),t._v(") earnings: "),e("b",[t._v(t._s(t.total)+" pln")])]):t._e()],1)},yt=[],Rt=[{value:"cash",text:"Cash"},{value:"card",text:"Card"}],Tt={props:{listId:{type:String,required:!0}},data(){return{selectedTipType:Rt[0].value,tipTypes:Rt}},computed:{...(0,l.Se)(["getListTips"]),tips(){return this.getListTips(this.listId)},total(){return this.tips.reduce(((t,e)=>t+e.value),0)}},methods:{addTip(t){if(0===t.value.length)return;const e={value:+t.value,date:(new Date).toISOString(),listId:this.listId,type:this.selectedTipType};this[Z](e),t.value=""},removeTip(t){this[$](t)},...(0,l.nv)([Z,$])}},St=Tt,Ct=(0,ht.Z)(St,_t,yt,!1,null,"01e81418",null),Et=Ct.exports,wt=function(){var t=this,e=t._self._c;return e("div",[e("b-form-tags",{attrs:{"no-outer-focus":""},scopedSlots:t._u([{key:"default",fn:function({inputAttrs:s,inputHandlers:a}){return[e("b-input-group",{staticClass:"root flex-nowrap"},[e("input",t._g(t._b({staticClass:"form-control",attrs:{placeholder:"Cost",type:"number"}},"input",s,!1),a)),e("b-input-group-append",[e("b-input-group",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.discountPercent,expression:"discountPercent"}],staticClass:"form-control rounded-0",attrs:{placeholder:"Discount, %",type:"number"},domProps:{value:t.discountPercent},on:{"!click":function(t){t.stopPropagation()},input:function(e){e.target.composing||(t.discountPercent=e.target.value)}}})]),e("b-input-group",[e("input",{directives:[{name:"model",rawName:"v-model",value:t.entryTaxRate,expression:"entryTaxRate"}],staticClass:"form-control rounded-0",attrs:{placeholder:"VAT, %",type:"number"},domProps:{value:t.entryTaxRate},on:{"!click":function(t){t.stopPropagation()},input:function(e){e.target.composing||(t.entryTaxRate=e.target.value)}}})]),e("b-button",{attrs:{variant:"primary"},on:{click:function(e){return t.addInterest(s)}}},[t._v(" Add ")])],1)],1),t.interests.length>0?e("ul",{staticClass:"list-unstyled d-inline-flex flex-wrap mb-0",attrs:{"aria-live":"polite","aria-atomic":"false","aria-relevant":"additions removals"}},t._l(t.interests,(function(s){return e("b-card",{key:s.id,staticClass:"mt-2 mr-2",attrs:{id:s.id,tag:"li","body-class":"py-1 px-2 text-nowrap d-flex align-items-center"}},[e("strong",[t._v(" "+t._s(t.getInterestDisplayValue(s))+" ")]),e("b-icon",{staticClass:"ml-4",attrs:{icon:"trash",role:"button","aria-label":"Remove procedure earning"},on:{click:function(e){return t.removeInterest(s.id)}}}),e("b-tooltip",{attrs:{target:s.id,triggers:"hover"}},[t._v(" Date: "+t._s(new Date(s.date).toLocaleDateString("pl-PL"))),e("br"),t._v(" Amount gross: "+t._s(s.value)+" pln"),e("br"),t._v(" Discount percent: "+t._s(s.discountPercent)+"%"),e("br"),t._v(" Discount amount: "+t._s(s.discountPercent*s.value/100)+" pln"),e("br"),t._v(" Tax Rate (VAT): "+t._s(s.taxRate??t.taxRate)+"%"),e("br"),t._v(" Procedure net: "+t._s(t.getProcedureNetValue(s.id))+" pln"),e("br"),t._v(" Amount net: "+t._s(t.getInterestNetValue(s.id))+" pln"),e("br")])],1)})),1):t._e()]}}])}),t.total>0?e("p",{staticClass:"mt-2"},[t._v(" Total procedure ("),e("strong",[t._v(t._s(t.interests.length))]),t._v(") earnings: "),e("b",[t._v(t._s(t.total)+" pln")])]):t._e()],1)},It=[],xt={props:{listId:{type:String,required:!0}},data(){return{discountPercent:"",entryTaxRate:""}},computed:{...(0,l.Se)(["getListInterests","getProcedureNetValue","getInterestNetValue","taxRate"]),interests(){return this.getListInterests(this.listId)},total(){return this.interests.reduce(((t,e)=>t+this.getInterestNetValue(e.id)),0)}},methods:{getInterestDisplayValue(t){const e=t.discountPercent?`- ${t.discountPercent}%`:"";return`${t.value} pln gross ${e} = ${this.getInterestNetValue(t.id)} pln net`},addInterest(t){if(0===t.value.length)return;const e={value:+t.value,date:(new Date).toISOString(),listId:this.listId,discountPercent:+this.discountPercent,taxRate:""===this.entryTaxRate?this.taxRate:+this.entryTaxRate};this[b](e),t.value=""},removeInterest(t){this[_](t)},...(0,l.nv)([b,_])}},At=xt,Lt=(0,ht.Z)(At,wt,It,!1,null,"39709a8b",null),Nt=Lt.exports,Dt=function(){var t=this,e=t._self._c;return e("div",[e("b-input-group",{on:{click:t.onInputClick},scopedSlots:t._u([{key:"prepend",fn:function(){return[e("b-button",{staticClass:"border border-right-0",attrs:{variant:"transparent"}},[e("b-icon",{attrs:{icon:"calendar"}})],1)]},proxy:!0}])},[e("label",{staticClass:"form-control border-left-0 pl-0",attrs:{role:"button"}},[t._v(" "+t._s(new Date(t.value).toLocaleDateString("pl-PL"))+" ")])]),e("b-modal",{ref:"calendar-modal",attrs:{centered:"","hide-header":"","hide-footer":"","no-fade":"","content-class":"w-auto mx-auto"}},[e("b-calendar",{attrs:{"value-as-date":"",locale:"pl-PL","date-format-options":{year:"numeric",month:"numeric",day:"numeric"}},on:{context:t.onContext},model:{value:t.dateValue,callback:function(e){t.dateValue=e},expression:"dateValue"}})],1)],1)},kt=[],Pt={name:"DatePicker",props:{value:{type:String,default:null}},data(){return{dateValue:new Date(this.value),dateContext:{}}},methods:{onInputClick(){this.$refs["calendar-modal"].show()},onContext(t){const e=this.dateContext.selectedDate;e&&t.selectedDate.toISOString()!==e.toISOString()&&(this.$refs["calendar-modal"].hide(),this.$emit("dateSelected",t.selectedDate.toISOString())),this.dateContext=t}}},Ot=Pt,Vt=(0,ht.Z)(Ot,Dt,kt,!1,null,null,null),Mt=Vt.exports,Ht={name:"NavList",components:{Tips:Et,Interests:Nt,DatePicker:Mt},data(){return{focusedRecordId:void 0,isEditMode:!1,isCreateMode:!1,isRecordEditMode:!1,newRecordDate:(new Date).toISOString(),newRecordValue:"",fields:[{key:"date"},{key:"value",label:"# of hours"},"money"]}},computed:{...(0,l.Se)(["lists","getListRecords","hourlyRate","selectedList"]),records(){const t=this.selectedList.id;return this.getListRecords(t).sort(((t,e)=>new Date(t.date).getTime()-new Date(e.date).getTime())).map((t=>({...t,_showDetails:!1})))},totalMoney(){return this.records.reduce(((t,e)=>t+e.value*this.hourlyRate),0)},totalHours(){return this.records.reduce(((t,e)=>t+e.value),0)}},methods:{handleRowClicked(t){this.$set(t,"_showDetails",!t._showDetails)},handleEnableRecordEditMode(t){this.isRecordEditMode=!0,this.focusedRecordId=t},handleAddRecord(t){const e={value:+this.newRecordValue,date:this.newRecordDate,listId:t};this[k](e),this.newRecordValue="",this.newRecordDate=(new Date).toISOString()},handleRemoveRecord(t){this[O](t)},handleEditRecordDate(t,e){const s=this.records.find((t=>t.id===e)),a={...s,date:t};this[P](a),this.isRecordEditMode=!1,this.focusedRecordId=void 0},handleEditRecordValue(t,e){const s=this.records.find((t=>t.id===e)),a={...s,value:+t.target.value};this[P](a),this.isRecordEditMode=!1,this.focusedRecordId=void 0},...(0,l.nv)([k,P,O])}},qt=Ht,Bt=(0,ht.Z)(qt,gt,bt,!1,null,"6d4aa544",null),Zt=Bt.exports,$t=function(){var t=this,e=t._self._c;return e("div",{staticClass:"d-flex flex-column mb-2 align-self-end align-items-end"},[e("b-button",{staticClass:"text-right",attrs:{variant:"link","aria-expanded":t.settingsExpanded?"true":"false","aria-controls":"settings-collapse"},on:{click:t.toggleSettingsExpanded}},[t._v(" Toggle Settings ")]),e("b-collapse",{attrs:{id:"settings-collapse",visible:t.settingsExpanded}},[e("div",{staticClass:"d-flex flex-column flex-lg-row mt-0 mt-lg-2"},[e("div",{staticClass:"mx-2 my-2 my-lg-0"},[e("b-input-group",{attrs:{size:"lg",append:"PLN"}},[e("b-input-group-prepend",[e("b-input-group-text",{staticClass:"prepend-group-text"},[t._v(" Hourly rate ")])],1),e("b-form-input",{staticClass:"settings-input",attrs:{"aria-label":"Hourly rate",type:"number",value:t.hourlyRate},on:{change:t.handleEditHourlyRate}})],1)],1),e("div",{staticClass:"mx-2 my-2 my-lg-0"},[e("b-input-group",{attrs:{size:"lg",append:"%"}},[e("b-input-group-prepend",[e("b-input-group-text",{staticClass:"prepend-group-text"},[t._v(" VAT ")])],1),e("b-form-input",{staticClass:"settings-input",attrs:{"aria-label":"VAT",type:"number",value:t.taxRate},on:{change:t.handleEditTaxRate}})],1)],1),e("div",{staticClass:"mx-2 my-2 my-lg-0"},[e("b-input-group",{attrs:{size:"lg",append:"%"}},[e("b-input-group-prepend",[e("b-input-group-text",{staticClass:"prepend-group-text"},[t._v(" Interest rate ")])],1),e("b-form-input",{staticClass:"settings-input",attrs:{"aria-label":"Interest rate",type:"number",value:t.interestRate},on:{change:t.handleEditInterestRate}})],1)],1),e("div",{staticClass:"mx-2 my-2 my-lg-0"},[e("b-input-group",{attrs:{size:"lg",append:"PLN"}},[e("b-input-group-prepend",[e("b-input-group-text",{staticClass:"prepend-group-text"},[t._v(" Required/hour ")])],1),e("b-form-input",{staticClass:"settings-input",attrs:{"aria-label":"REPH",type:"number",value:t.requiredEarningsPerHour},on:{change:t.handleEditRequiredEarningsPerHour}})],1)],1)])])],1)},jt=[];const Gt="settings/EDIT_HOURLY_RATE",Ft="settings/EDIT_TAX_RATE",zt="settings/EDIT_INTEREST_RATE",Ut="settings/EDIT_REQUIRED_EARNINGS_PER_HOUR",Jt="settings/SET_SETTINGS",Xt="settings/SAVE_SETTINGS",Kt="settings/LOAD_SETTINGS",Qt="settings/TOGGLE_SETTINGS_EXPANDED",Yt={expanded:!0,hourlyRate:15,interestRate:10,taxRate:23,requiredEarningsPerHour:90},Wt={hourlyRate:t=>t.hourlyRate,interestRate:t=>t.interestRate,taxRate:t=>t.taxRate,settingsExpanded:t=>t.expanded,requiredEarningsPerHour:t=>t.requiredEarningsPerHour},te={[Jt](t,e){Object.keys(e).forEach((s=>{t[s]=e[s]}))},[Gt](t,e){t.hourlyRate=e},[zt](t,e){t.interestRate=e},[Ft](t,e){t.taxRate=e},[Ut](t,e){t.requiredEarningsPerHour=e},[Qt](t,e){t.expanded=e}},ee={async[Gt](t,e){t.commit(Gt,e),await t.dispatch(Xt)},async[Ft](t,e){t.commit(Ft,e),await t.dispatch(Xt)},async[zt](t,e){t.commit(zt,e),await t.dispatch(Xt)},async[Ut](t,e){t.commit(Ut,e),await t.dispatch(Xt)},async[Qt](t,e){t.commit(Qt,e),await t.dispatch(Xt)},async[Kt](t){const e=m("settings");e&&t.commit(Jt,e)},[Xt](t){h("settings",t.state)}};var se={state:Yt,getters:Wt,mutations:te,actions:ee},ae={computed:{...(0,l.Se)(["hourlyRate","taxRate","interestRate","settingsExpanded","requiredEarningsPerHour"])},methods:{toggleSettingsExpanded(){this[Qt](!this.settingsExpanded)},handleEditHourlyRate(t){this[Gt](t)},handleEditTaxRate(t){this[Ft](t)},handleEditInterestRate(t){this[zt](t)},handleEditRequiredEarningsPerHour(t){this[Ut](t)},...(0,l.nv)([Gt,Ft,zt,Ut,Qt])}},ie=ae,re=(0,ht.Z)(ie,$t,jt,!1,null,"3779cae7",null),ne=re.exports,oe=function(){var t=this,e=t._self._c;return e("b-card",{staticClass:"mt-4 p-2",attrs:{"no-body":""}},[e("p",[t._v(" Total Hours ("),e("strong",[t._v(t._s(t.totalHoursCount))]),t._v("): "),e("b",[t._v(t._s(t.totalHours)+" hours")])]),e("p",[t._v(" Total Tips ("),e("strong",[t._v(t._s(t.totalTipsCount))]),t._v(") Earnings: "),e("b",[t._v(t._s(t.totalCashTips)+" pln")]),t._v(" cash ("),e("strong",[t._v(t._s(t.totalCashTipsCount))]),t._v(") + "),e("b",[t._v(t._s(t.totalCardTips)+" pln")]),t._v(" card ("),e("strong",[t._v(t._s(t.totalCardTipsCount))]),t._v(") = "),e("b",[t._v(t._s(t.totalTips)+" pln")])]),e("p",[t._v(" Total Procedure ("),e("strong",[t._v(t._s(t.totalInterestsCount))]),t._v(") Earnings: "),e("b",[t._v(t._s(t.totalInterests)+" pln")])]),e("p",[t._v("Total Money (no cash tips): "),e("b",[t._v(t._s(t.totalMoneyNoCashTips)+" pln")])]),e("p",[t._v(" Total Money: "),e("b",[t._v(t._s(t.totalSalary)+" pln")]),t._v(" salary + "),e("b",[t._v(t._s(t.totalTips)+" pln")]),t._v(" tips + "),e("b",[t._v(t._s(t.totalInterests)+" pln")]),t._v(" procedure earnings = "),e("b",[t._v(t._s(t.totalMoney)+" pln")])]),e("p",[t._v(" Required earning saldo: "),e("b",[t._v(t._s(t.totalInterestsGrossNoTax)+" pln")]),t._v(" out of "),e("b",[t._v(t._s(t.requiredEarningsPerHour*t.totalHours)+" pln")]),t._v(" = "),e("b",{class:{"text-danger":t.earningSaldo<0,"text-success":t.earningSaldo>0}},[t._v(t._s(t.earningSaldo)+" pln")])])])},le=[],ce={computed:{...(0,l.Se)(["totalHours","totalHoursCount","totalCashTips","totalCashTipsCount","totalCardTips","totalCardTipsCount","totalTips","totalTipsCount","totalInterests","totalInterestsGrossNoTax","totalInterestsCount","totalSalary","totalMoneyNoCashTips","totalMoney","requiredEarningsPerHour"]),earningSaldo(){return this.totalInterestsGrossNoTax-this.requiredEarningsPerHour*this.totalHours}}},de=ce,ue=(0,ht.Z)(de,oe,le,!1,null,null,null),pe=ue.exports,me=function(){var t=this,e=t._self._c;return e("div",[e("b-navbar",{staticClass:"overflow-auto",attrs:{fixed:"bottom",type:"dark",variant:"dark"}},[t.lists.length>0?e("b-icon",{directives:[{name:"b-toggle",rawName:"v-b-toggle.lists-sidebar",modifiers:{"lists-sidebar":!0}}],staticClass:"mr-3",attrs:{variant:"light",size:"lg",role:"button","font-scale":"1.5",icon:"list"}},[t._v(" NavBar ")]):t._e(),e("b-navbar-nav",{staticClass:"d-flex align-items-center"},[t._l(t.lists,(function(s){return e("b-nav-item",{key:s.id,staticClass:"mr-3 text-nowrap",attrs:{active:t.selectedList.id===s.id},on:{click:function(e){return t.handleSelectList(s.id)}}},[t._v(" "+t._s(s.name)+" ")])})),e("b-nav-item",{directives:[{name:"b-modal",rawName:"v-b-modal.confirm-new-list-modal",modifiers:{"confirm-new-list-modal":!0}}],attrs:{href:"#"}},[t._v(" + ")])],2)],1),e("b-modal",{ref:"new-list-modal",attrs:{id:"confirm-new-list-modal",title:"Enter name of new list"},on:{hidden:t.resetNewListModal,ok:t.handleAddList}},[e("p",{staticClass:"my-4"},[t._v(" Please type the name of the new list: ")]),e("form",{ref:"form",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[e("b-form-group",{attrs:{"invalid-feedback":"List name is required",state:t.newListNameState}},[e("b-form-input",{attrs:{state:t.newListNameState,autofocus:"",required:""},model:{value:t.newListName,callback:function(e){t.newListName=e},expression:"newListName"}})],1)],1)]),e("b-modal",{ref:"edit-list-modal",attrs:{id:"confirm-edit-list-modal",title:"Enter new name of this list"},on:{hidden:t.resetEditListModal,ok:t.handleEditListName}},[e("p",{staticClass:"my-4"},[t._v(" Please type new name of the list: ")]),e("form",{ref:"form"},[e("b-form-group",{attrs:{"invalid-feedback":"List name is required",state:t.editListNameState}},[e("b-form-input",{attrs:{state:t.editListNameState,autofocus:"",required:""},model:{value:t.editListName,callback:function(e){t.editListName=e},expression:"editListName"}})],1)],1)]),e("b-modal",{ref:"remove-list-modal",attrs:{id:"confirm-remove-list-modal",title:"Remove list?"},on:{ok:t.handleRemoveList}},[e("p",{staticClass:"my-4"},[t._v(" Click OK to remove the list ")])]),e("b-sidebar",{ref:"sidebar",attrs:{id:"lists-sidebar",title:t.selectedList.name,"bg-variant":"dark","text-variant":"light",shadow:"",backdrop:""}},[e("div",{staticClass:"px-3 py-2"},[e("nav",{staticClass:"mb-3"},[e("b-nav",{attrs:{vertical:""}},[e("b-nav-item",{directives:[{name:"b-modal",rawName:"v-b-modal.confirm-edit-list-modal",modifiers:{"confirm-edit-list-modal":!0}}]},[t._v(" Edit list ")]),e("b-nav-item",{directives:[{name:"b-modal",rawName:"v-b-modal.confirm-remove-list-modal",modifiers:{"confirm-remove-list-modal":!0}}]},[t._v(" Remove list ")]),e("b-dropdown-divider",{staticClass:"nav-link"}),e("b-nav-item",{on:{click:t.handleExportData}},[t._v(" Export Data ")]),e("b-nav-item",{on:{click:function(e){return t.$refs.importFile.click()}}},[t._v(" Import Data ")])],1)],1)])]),e("input",{ref:"importFile",staticClass:"d-none",attrs:{type:"file",accept:".json"},on:{change:t.handleImportData}})],1)},he=[];const ve="lists/SET_LISTS",fe="lists/LOAD_LISTS",ge="lists/SAVE_LISTS",be="lists/REMOVE_LIST",_e="lists/ADD_LIST",ye="lists/EDIT_LIST",Re="lists/SELECT_LIST",Te=[{id:(0,u.Z)(),name:"Default list 1"},{id:(0,u.Z)(),name:"Default list 2"},{id:(0,u.Z)(),name:"Default list 3"}],Se={selectedListId:Te[0].id,lists:Te},Ce={getListById:t=>e=>t.lists.find((({id:t})=>t===e)),lists:t=>t.lists,selectedList:(t,e)=>e.getListById(t.selectedListId)},Ee={[ve](t,e){t.lists=e,e.length>0&&(t.selectedListId=e[0].id)},[be](t,e){t.lists=t.lists.filter((t=>t.id!==e)),t.lists[0]&&(t.selectedListId=t.lists[0].id)},[_e](t,e){t.lists.push({...e,id:(0,u.Z)()})},[ye](t,e){const s=t.lists.find((t=>t.id===e.id));Object.assign(s,e)},[Re](t,e){t.selectedListId=e}},we={async[_e](t,e){t.commit(_e,e),await t.dispatch(ge)},async[be](t,e){t.commit(be,e),await t.dispatch(ge)},async[ye](t,e){t.commit(ye,e),await t.dispatch(ge)},async[Re](t,e){t.commit(Re,e)},async[fe](t){const e=m("lists");e?t.commit(ve,e):await t.dispatch(ge)},async[ge](t){h("lists",t.state.lists)}};var Ie={state:Se,getters:Ce,mutations:Ee,actions:we};a["default"].use(l.ZP);const xe="store/IMPORT_STORE",Ae="store/EXPORT_STORE",Le="store/LOAD_STORE",Ne={},De={getProcedureNetValue:(t,e,s,a)=>s=>{const i=a.getInterestById(s),r=i.taxRate||t.settings.taxRate;return Math.round(e.getInterestGrossValue(s)/(1+r/100))},getInterestNetValue:(t,e)=>s=>Math.round(e.getProcedureNetValue(s)*t.settings.interestRate/100),totalHours:(t,e)=>t.lists.lists.reduce(((t,s)=>{const a=e.getListRecords(s.id);return t+a.reduce(((t,e)=>t+e.value),0)}),0),totalHoursCount:(t,e)=>t.lists.lists.reduce(((t,s)=>t+e.getListRecords(s.id).length),0),totalSalary:(t,e)=>e.totalHours*t.settings.hourlyRate,totalCardTips:(t,e)=>t.lists.lists.reduce(((t,s)=>{const a=e.getListTipsByType(s.id,"card");return t+a.reduce(((t,e)=>t+e.value),0)}),0),totalCardTipsCount:(t,e)=>t.lists.lists.reduce(((t,s)=>t+e.getListTipsByType(s.id,"card").length),0),totalCashTips:(t,e)=>t.lists.lists.reduce(((t,s)=>{const a=e.getListTipsByType(s.id,"cash");return t+a.reduce(((t,e)=>t+e.value),0)}),0),totalCashTipsCount:(t,e)=>t.lists.lists.reduce(((t,s)=>t+e.getListTipsByType(s.id,"cash").length),0),totalTips:(t,e)=>e.totalCardTips+e.totalCashTips,totalTipsCount:(t,e)=>e.totalCardTipsCount+e.totalCardTipsCount,totalInterests:(t,e)=>t.lists.lists.reduce(((t,s)=>{const a=e.getListInterests(s.id);return t+a.reduce(((t,s)=>{const a=e.getInterestNetValue(s.id);return t+a}),0)}),0),totalInterestsGrossNoTax:(t,e)=>t.lists.lists.reduce(((t,s)=>{const a=e.getListInterests(s.id);return t+a.reduce(((t,s)=>{const a=e.getProcedureNetValue(s.id);return t+a}),0)}),0),totalInterestsCount:(t,e)=>t.lists.lists.reduce(((t,s)=>t+e.getListInterests(s.id).length),0),totalMoneyNoCashTips:(t,e)=>e.totalSalary+e.totalCardTips+e.totalInterests,totalMoney:(t,e)=>e.totalSalary+e.totalTips+e.totalInterests},ke={},Pe={async[xe](t,e){f(e),t.dispatch(Le)},async[Ae](){g()},async[Le](t){t.dispatch(Kt),t.dispatch(fe),t.dispatch(N),t.dispatch(z),t.dispatch(S),t.dispatch(rt)}},Oe=new l.ZP.Store({strict:!1,state:Ne,getters:De,mutations:ke,actions:Pe,modules:{lists:Ie,records:B,tips:Q,interests:x,settings:se,archives:ut}});var Ve=Oe;const Me="My new list";var He={data(){return{newListName:Me,newListNameState:null,editListName:"",editListNameState:null}},computed:{...(0,l.Se)(["lists","selectedList"])},methods:{...(0,l.nv)([ye,_e,be,Re,Ae,xe]),checkFormValidity(){const t=this.$refs.form.checkValidity();return this.newListNameState=t,t},resetNewListModal(){this.newListName=Me,this.newListNameState=null},resetEditListModal(){this.editListName="",this.editListNameState=null},handleAddList(){const t={name:this.newListName};this[_e](t)},handleRemoveList(){this[be](this.selectedList.id)},handleEditListName(){const t={...this.selectedList,name:this.editListName};this[ye](t)},handleSelectList(t){this[Re](t)},handleExportData(){this[Ae]()},handleImportData(){const t=this.$refs.importFile.files[0];if(t){const e=new FileReader;e.onload=()=>{const t=JSON.parse(e.result);t&&(this[xe](t),this.$refs.sidebar.hide())},e.readAsText(t)}}}},qe=He,Be=(0,ht.Z)(qe,me,he,!1,null,null,null),Ze=Be.exports,$e={name:"App",components:{Navbar:ft,Settings:ne,NavList:Zt,Totals:pe,Bottombar:Ze},created(){this[Le]()},methods:{...(0,l.nv)([Le])}},je=$e,Ge=(0,ht.Z)(je,n,o,!1,null,null,null),Fe=Ge.exports;a["default"].config.productionTip=!1,a["default"].use(i.XG7),a["default"].use(r.A7),new a["default"]({store:Ve,render:t=>t(Fe)}).$mount("#app")}},e={};function s(a){var i=e[a];if(void 0!==i)return i.exports;var r=e[a]={exports:{}};return t[a].call(r.exports,r,r.exports,s),r.exports}s.m=t,function(){var t=[];s.O=function(e,a,i,r){if(!a){var n=1/0;for(d=0;d<t.length;d++){a=t[d][0],i=t[d][1],r=t[d][2];for(var o=!0,l=0;l<a.length;l++)(!1&r||n>=r)&&Object.keys(s.O).every((function(t){return s.O[t](a[l])}))?a.splice(l--,1):(o=!1,r<n&&(n=r));if(o){t.splice(d--,1);var c=i();void 0!==c&&(e=c)}}return e}r=r||0;for(var d=t.length;d>0&&t[d-1][2]>r;d--)t[d]=t[d-1];t[d]=[a,i,r]}}(),function(){s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,{a:e}),e}}(),function(){s.d=function(t,e){for(var a in e)s.o(e,a)&&!s.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){s.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};s.O.j=function(e){return 0===t[e]};var e=function(e,a){var i,r,n=a[0],o=a[1],l=a[2],c=0;if(n.some((function(e){return 0!==t[e]}))){for(i in o)s.o(o,i)&&(s.m[i]=o[i]);if(l)var d=l(s)}for(e&&e(a);c<n.length;c++)r=n[c],s.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return s.O(d)},a=self["webpackChunklistio"]=self["webpackChunklistio"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=s.O(void 0,[998],(function(){return s(6312)}));a=s.O(a)})();
//# sourceMappingURL=app.38645250.js.map