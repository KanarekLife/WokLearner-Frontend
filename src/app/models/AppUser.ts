export class AppUser {
  userName: string;
  accessFailedCount: number;
  learningStatus: { [id: string]: number };
  skipLevel: number;
  id: string;

  constructor() {
  }
}
