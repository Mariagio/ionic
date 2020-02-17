import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'Firebase';
import { constructor } from 'Firebase';
import { CrudService } from './../service/crud.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  students: any;
  studentItem: string;
  studentQuantidade: number;
  //studentAddress: string;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    this.crudService.read_Students().subscribe(data => {

      this.students = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          Item: e.payload.doc.data()['Item'],
          Quantidade: e.payload.doc.data()['Quantidade'],
          //Address: e.payload.doc.data()['Address'],
        };
      })
      console.log(this.students);

    });
  }

  CreateRecord() {
    let record = {};
    record['Item'] = this.studentItem;
    record['Quantidade'] = this.studentQuantidade;
    //record['Address'] = this.studentQuantidade;
    this.crudService.create_NewStudent(record).then(resp => {
      this.studentItem = "";
      this.studentQuantidade = undefined;
     // this.studentAddress = "";
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }

  RemoveRecord(rowID) {
    this.crudService.delete_Student(rowID);
  }

  EditRecord(record) {
    record.isEdit = true;
    record.EditItem = record.Item;
    record.EditQuantidade = record.Quantidade;
    //record.EditAddress = record.Address;
  }

  UpdateRecord(recordRow) {
    let record = {};
    record['Item'] = recordRow.EditItem;
    record['Quantidade'] = recordRow.EditQuantidade;
   // record['Address'] = recordRow.EditAddress;
    this.crudService.update_Student(recordRow.id, record);
    recordRow.isEdit = false;
  }
}


