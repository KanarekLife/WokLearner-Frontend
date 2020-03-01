import {Component} from '@angular/core';
import {ApiStatusService} from './services/api-status/api-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WokLearner';

  constructor(private apiStatusService: ApiStatusService) {
  }

  async status() {
    return await this.apiStatusService.getStatus();
  }
}
