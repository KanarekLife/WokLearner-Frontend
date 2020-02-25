export class AppUser {
  constructor() {
  }
  userName: string;
  accessFailedCount: number;
  learningStatus: { [id: string]: number};
  skipLevel: number;
  id: string;
}
