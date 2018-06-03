export class Line {

  public type: string;
  public explanationAudioScript: string;
  public explanationVideoScript: string;
  public exampleTarget: string;
  public exampleEnglish: string;
  public exampleKana: string;
  public exampleRomanization: string;

  constructor(type: string) {
    this.type = type;
  }
}
