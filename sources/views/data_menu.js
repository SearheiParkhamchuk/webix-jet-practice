import {JetView} from "webix-jet";

export default class DataMenuView extends JetView{
	config(){
		return {
			localId:"statusesList",
			view:"list",
			width: 300,
			template:"#value#",
			select:true,
			scroll:"auto",
			data:[
				{id:"statuses", value:"Statuses"},
				{id:"countries", value:"Countries"}
			],
			on:{
				onAfterSelect:function(id){
					this.$scope.app.webix.$$(id).show();
				}
			}
		};
	}
}
