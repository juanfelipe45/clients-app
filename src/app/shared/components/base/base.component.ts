import { MetaColumn } from "src/app/interfaces/metacolumn.interface";
import { HttpService } from '../../../services/http/http.service';
import { UtilsService } from '../../../services/util/utils.service';
import { GeneralResponse } from "src/app/interfaces/generalresponse.interface";
import { PageResponse } from "src/app/interfaces/pageResponse.interface";
import { MatDialogRef } from '@angular/material/dialog';

enum TypeExport {
  EXCEL = 'excel',
  PDF = 'pdf',
}

export abstract class BaseComponent<Entity, Modal> {

  abstract listFields: string[];
  abstract metaColumns: MetaColumn[];
  protected dataSource: any[] = [];

  quantityRecords: number = 0;
  currentPage: number = 0;
  pageSize: number =10;

  protected form: any;
  protected filename: string = 'data';
  protected sheetName: string = 'Sheet1';
  protected titleReport: string = 'Título reporte';

  constructor(
    protected context: any,
    protected endPoint: string,
    protected httpService: HttpService,
    protected utilsService: UtilsService,
  ) {
    this.getRecordsByPage(0, null);
  }

  getRecordsByPage(pageIndex: number, params: any): void {

    this.form = params ? params : {};

    this.httpService
      .page<Entity>(this.endPoint, pageIndex, this.pageSize, params)
      .subscribe({ next: this.fillDataSource.bind(this) });
    this.currentPage = pageIndex;
  }

  private fillDataSource(result: GeneralResponse<PageResponse<Entity>>) {

    if (!result || !result.header || !result.body) {
      console.log("error");
    }

    if (result.header.code != 200) {
      console.log(result.header.message);
    }

    this.dataSource = result.body.data;
    this.quantityRecords = result.body.count;
  }

  protected showModalWindow(type: string, row: any = null) {
    const reference: MatDialogRef<Modal> = this.utilsService.showModalWindow(
      this.context,
      {
        disableClose: true,
        panelClass: 'form-modal-medic',
        data: row,
      }
    );

    reference.afterClosed().subscribe((response: any) => {
      if (!response) {
        return;
      }

      if (type && type === 'edit') {
        this.httpService.put(this.endPoint, response.record).subscribe(() => {
          this.getRecordsByPage(this.currentPage, null);
          this.utilsService.showNotification('Registro actualizado');
        });
      } else {
        this.httpService.post(this.endPoint, response.record).subscribe(() => {
          this.getRecordsByPage(this.currentPage, null);
          this.utilsService.showNotification('Registro insertado');
        });
      }
    });
  }

  protected export(type: string) {
    this.httpService.list<Entity>(this.endPoint).subscribe((records: GeneralResponse<Entity[]>) => {
      if (type === TypeExport.EXCEL) {
        this.utilsService.exportToExcel(
          records.body,
          this.metaColumns,
          this.filename,
          this.sheetName
        );
      } else if (type === TypeExport.PDF) {
        this.utilsService.exportToPdf(
          records.body,
          this.metaColumns,
          this.filename,
          this.titleReport
        );
      }
    });
  }

}
