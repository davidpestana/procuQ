import { Component, OnInit } from '@angular/core';
import { LidlFilesService } from '../../shared/services';
import * as XLSX from 'xlsx';

import {NgbModal, NgbModalRef, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

import { Turn } from '../../shared/sdk';


@Component({
  selector: 'app-lidl-file-events-parser',
  templateUrl: './lidl-file-events-parser.component.html',
  styleUrls: ['./lidl-file-events-parser.component.scss']
})
export class LidlFileEventsParserComponent implements OnInit {

  turns:Turn[] = [];
  modal:NgbModalRef;

  constructor(private lidlFilesService:LidlFilesService,private modalService: NgbModal){

  }

  onFileChange(evt: any,content:any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = this.lidlFilesService.onLoad;
    reader.readAsBinaryString(target.files[0]);     
    this.modal = this.modalService.open(content,{size:'lg'});
    this.modal.result.then((result) => console.log(result),(reason) => console.log(reason));
  }


  ngOnInit() {
    this.lidlFilesService.getEvents().subscribe((turns:Turn[])=>{
        this.turns = turns;
    });
  }

  import(){
    this.lidlFilesService.import(this.turns);
    this.modal.close();
  }
 
}
