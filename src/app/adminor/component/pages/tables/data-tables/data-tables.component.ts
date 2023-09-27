import { Component } from '@angular/core';
import { SimpleDataTable } from 'src/app/adminor/shared/data/tables_data/data_table';


@Component({
  selector: 'app-data-tables',
  templateUrl: './data-tables.component.html',
  styleUrls: ['./data-tables.component.scss'],
})
export class DataTablesComponent {
  dataTable = SimpleDataTable;
}
