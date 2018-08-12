import DataTable from "views/dataTable";
import {countries} from "models/countries";

export default class CountriesView extends DataTable{

	deleteItem(e, id){
		const _ = this.$scope.app.getService("locale")._;
		webix.confirm({
			title: _("Delete"),
			text: _("Delete this row?"),
			type:"confirm-warning",
			ok: _("Yes"),
			cancel: _("Nope"),
			callback:function(result){
				if ( result ) {
					countries.remove(id);

					webix.message({
						type:"info",
						text:_("Removed success.")
					});
				}
			}
		});
	}

	init(view){
		let datatable = view.queryView({view:"datatable"}),
			form = view.queryView({localId:"addForm"}),
			iconField = form.queryView({name:"Icon"});

		iconField.hide();
		datatable.hideColumn("Icon");

		datatable.sync(countries);
		datatable.on_click.jsDeleteBtn = this.deleteItem;

		this.on(view.queryView({localId:"add"}), "onItemClick", () => {
			if ( !form.validate() )
				return false;

			let values = form.getValues();
			countries.add(values);
			form.clear();
		});
	}
}
