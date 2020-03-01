import {Component, OnInit} from '@angular/core';
import {ApiStatusService} from '../../services/api-status/api-status.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  status: boolean;

  constructor(ApiStatus: ApiStatusService) {
    ApiStatus.getStatus().then((status) => {
      this.status = status;
    });
  }

  ngOnInit() {
  }

}
