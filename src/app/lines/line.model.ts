export class Line {

  public type: string;
  public explanationAudioScript: string;
  public explanationVideoScript: string;
  public explanationAudioMp3: string;
  public exampleTarget: string;
  public exampleEnglish: string;
  public exampleKana: string;
  public exampleRomanization: string;
  public mcQuestion: string;
  public mcAnswerCorrect: string;
  public mcAnswerIncorrect1: string;
  public mcAnswerIncorrect2: string;
  public mcAnswerIncorrect3: string;


  constructor(type: string) {
    this.type = type;
  }
}
