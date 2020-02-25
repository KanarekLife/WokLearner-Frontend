import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationStatus} from '../../../models/PaginationStatus';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input()
  page: number;
  @Input()
  pages: number;
  @Output() Update = new EventEmitter<PaginationStatus>();
  constructor() { }

  ngOnInit() {
  }
  previous() {
    if (this.page > 0) {
      this.page--;
      this.Update.emit(new PaginationStatus(this.page, this.pages));
    }
  }

  next() {
    if (this.page < this.pages) {
      this.page++;
      this.Update.emit(new PaginationStatus(this.page, this.pages));
    }
  }
}
