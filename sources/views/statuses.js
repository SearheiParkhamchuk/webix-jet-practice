import DataTable from "views/dataTable";
import {statuses} from "models/statuses";

export default class StatusesView extends DataTable{

	deleteItem(e, id){
		const _ = this.$scope.app.getService("locale")._;

		webix.confirm({
			title: _("Delete"),
			text: _("Delete this row?"),
			type:"confirm-warning",
			callback:function(result){
				if ( result ) {
					statuses.remove(id);

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
			form = view.queryView({localId:"addForm"});

		datatable.sync(statuses);
		datatable.on_click.jsDeleteBtn = this.deleteItem;

		this.on(view.queryView({localId:"add"}), "onItemClick", () => {
			if ( !form.validate() )
				return false;

			let values = form.getValues();
			statuses.add(values);
			form.clear();
		});
	}
}
