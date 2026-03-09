
export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface Question {
  id: number;
  text: string;
}

export interface BarometerState {
  currentStep: number;
  answers: boolean[];
  isFinished: boolean;
}
