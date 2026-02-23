export type ServiceType = "maintenance" | "repair" | "inspection" | "other";

export interface ServiceLog {
  id: string;
  providerId: string;
  serviceOrder: string;
  carId: string;
  odometer: number;
  engineHours: number;
  startDate: string;
  endDate: string;
  type: ServiceType;
  serviceDescription: string;
}

export interface DraftServiceLog extends Omit<ServiceLog, "id"> {
  draftId: string;
  updatedAt: string;
}
