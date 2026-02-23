import { DateTime } from "luxon";
import { type ServiceLog } from "../types";

const now = DateTime.now();
const startOfWeek = now.startOf("week");

export const mockServiceLogs: ServiceLog[] = [
  {
    id: "1",
    providerId: "provider-001",
    serviceOrder: "SO-2024-001",
    carId: "car-001",
    odometer: 45000,
    engineHours: 1250,
    startDate: startOfWeek.plus({ days: 3 }).toISODate()!,
    endDate: startOfWeek.plus({ days: 4 }).toISODate()!,
    type: "maintenance",
    serviceDescription: "Oil change and filter replacement",
  },
  {
    id: "2",
    providerId: "provider-002",
    serviceOrder: "SO-2024-002",
    carId: "car-001",
    odometer: 45850,
    engineHours: 1275,
    startDate: startOfWeek.plus({ days: 2 }).toISODate()!,
    endDate: startOfWeek.plus({ days: 3 }).toISODate()!,
    type: "repair",
    serviceDescription: "Brake pad replacement - front axle",
  },
  {
    id: "3",
    providerId: "provider-003",
    serviceOrder: "SO-2024-003",
    carId: "car-001",
    odometer: 46200,
    engineHours: 1285,
    startDate: startOfWeek.plus({ days: 5 }).toISODate()!,
    endDate: startOfWeek.plus({ days: 6 }).toISODate()!,
    type: "inspection",
    serviceDescription: "Annual state safety inspection",
  },
];
