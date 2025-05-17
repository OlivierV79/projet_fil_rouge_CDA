export interface AppointmentInterface {
    id: number;
    date: string;
    heure: string;
    sujet: string;
    parrain: string;
    porteur: string;
    summary?: string;
}