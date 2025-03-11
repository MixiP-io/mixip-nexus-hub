
export interface Assignment {
  id: number;
  title: string;
  description: string;
  type: string;
  client: string;
  status: string;
  createdAt: string;
  dueDate: string;
  location: string;
  budget?: number;
  teamSize?: number;
  priority?: 'Low' | 'Medium' | 'High';
  requirements?: string[];
}
