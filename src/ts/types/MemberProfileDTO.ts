export interface MemberProfileDTO {
    username: string;
    email: string | null;
    firstName: string;
    lastName: string;
    nbrOfFounders: number | null;
    role: "ADMIN" | "FOUNDER" | "MENTOR";
    available: boolean | null;
    assignedFoundersCount?: number;
    hasMentor?: boolean;
}