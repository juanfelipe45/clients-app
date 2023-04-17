import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/shared/components/confirm/confirm.component';
import { MetaColumn } from 'src/app/interfaces/metacolumn.interface';

import * as XLSX from 'xlsx';

declare let require: any;

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable()
export class UtilsService {
  constructor(
    private readonly dialog: MatDialog,
    private readonly notification: MatSnackBar
  ) {}

  showModalWindow(
    classComponent: any,
    options: { [s: string]: string | number | boolean | object }
  ): MatDialogRef<any> {
    return this.dialog.open(classComponent, options);
  }

  showConfirm(message: string = '') {
    const reference = this.dialog.open(ConfirmComponent, {
      width: '340px',
      disableClose: true,
    });

    if (message) {
      reference.componentInstance.messageToConfirm = message;
    }

    return reference.afterClosed();
  }

  showNotification(message: string) {
    this.notification.open(message, '', {
      duration: 3000,
    });
  }

  exportToExcel<Entity>(
    records: Entity[],
    metacolumns: MetaColumn[],
    filename: string,
    sheetName: string
  ) {
    const result = this.dtoExcel(records, metacolumns);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_json(ws, result);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  }

  private dtoExcel<Entity>(records: Entity[], metacolumns: MetaColumn[]) {
    return records.map((item: Entity) => {
      const newElement: any = {};
      for (const prop in item) {
        const metaData = metacolumns.find((el) => el.field === prop);
        if (metaData) {
          newElement[metaData.title] = item[prop];
        }
      }

      return newElement;
    });
  }

  async exportToPdf<Entity>(
    records: Entity[],
    metacolumns: MetaColumn[],
    filename: string,
    title: string
  ) {
    const dataUrl = await this.getDataUrl('/assets/img/logo.jpg');

    const dataFormatted = {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      pageMargins: [20, 20, 20, 20],
      content: [
        this.generateTableHeader(records, dataUrl, title.toUpperCase()),
        this.generateTableData(records, metacolumns),
      ],
      styles: this.generateStyles(),
    };

    this.generatePdf(dataFormatted, filename);
  }

  private generateTableHeader<Entity>(
    data: Entity[],
    dataUrl: any,
    title: string
  ) {
    return {
      margin: [0, 0, 0, 15],
      table: {
        widths: [120, 'auto', 50, 'auto'],
        body: [
          [
            {
              borderWidth: ['1px', '1px', '1px', '1px'],
              borderColor: ['#000', '#000', '#000', '#000'],
              border: [false, false, true, false],
              width: 100,
              image: dataUrl,
            },
            {
              border: [false, false, false, false],
              text: [
                this.generateColum('Channel', 'headerLeft'),
                this.generateColum('Av. De La República 3645', 'subHeaderLeft'),
                this.generateColum('San Isidro, Lima Perú', 'subHeaderLeft'),
                this.generateColum('Tel: (591) 222-2222', 'subHeaderLeft'),
                this.generateColum('info@channel.com', 'subHeaderLeft'),
                this.generateColum('www.channel.com', 'subHeaderLeft'),
              ],
            },
            {
              border: [false, false, false, false],
              text: '',
            },
            {
              border: [false, false, false, false],
              text: title,
              style: 'titleReport',
            },
          ],
        ],
      },
    };
  }

  private generateTableData<Entity>(data: Entity[], metacolumns: MetaColumn[]) {
    const body = data
      .map((el: any) => {
        const newElement: any = {};
        Object.keys(el).forEach((key) => {
          const metaData = metacolumns.find((el) => el.field === key);
          if (metaData) {
            newElement[metaData.field] = el[key];
          }
        });
        return newElement;
      })
      .map((el) =>
        Object.keys(el).map((prop) =>
          this.generateRowData(el, metacolumns, prop)
        )
      );

    const quantityCols = metacolumns.length;
    const widths = Array.from(Array(quantityCols).keys()).map(
      (el) => Math.floor(100 / quantityCols) + '%'
    );

    const rows:any[] = [];
    metacolumns.forEach((el) => {
      const row = [
        {
          border: [false, false, false, false],
          text: el.title,
          style: 'header',
        },
      ];

      rows.push(row);
    });

    body.unshift(rows);

    return {
      margin: [0, 0, 0, 15],
      table: {
        widths,
        body,
      },
    };
  }

  private generateRowData(
    data: any,
    metacolums: MetaColumn[],
    key: string
  ) {
    const column = metacolums.find((el) => el.field === key);
    if (column) {
      return [
        {
          border: [false, false, false, false],
          text: data[key],
        },
      ];
    } else {
      return [];
    }
  }

  private generatePdf(dataFormatted: any, filename: string) {
    const docGenerated = pdfMake.createPdf(dataFormatted);
    docGenerated.download(`${filename}.pdf`);
  }

  private async getDataUrl(pathLogo: string) {
    const blob = await fetch(pathLogo).then((r) => r.blob());
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

    return dataUrl;
  }

  private generateStyles() {
    return {
      headerLeft: {
        fontFamily: 'Verdana',
        fontSize: '13',
        height: 16,
        color: '#3c3b40',
      },
      subHeaderLeft: {
        fontFamily: 'Verdana',
        fontSize: 10,
        height: 16,
        color: '#3c3b40',
      },
      titleReport: {
        fontFamily: 'Verdana',
        fontSize: 15,
        height: 16,
        color: '#3c3b40',
      },
      header: {
        fontFamily: 'Verdana',
        fontSize: 13,
        height: 14,
        color: '#3c3b40',
        bold: true,
      },
    };
  }

  private generateColum(text: string, style: any = null) {
    const column: any = {
      text: text + '\n',
    };

    if (style) {
      column['style'] = style;
    }

    return column;
  }
}
