export class Vocab {
  public id: string;
  public target: string;
  public targetKana: string;
  public targetRomanization: string;
  public english: string;
  public audioFilePathMp3: string;

  constructor(target: string,
              targetKana: string,
              targetRomanization: string,
              english: string) {
    this.target = target;
    this.targetKana = targetKana;
    this.targetRomanization = targetRomanization;
    this.english = english;
  }

}
