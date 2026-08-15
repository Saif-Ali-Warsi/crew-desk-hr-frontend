import api from "./axios";
import type { AttendanceResponse, Attendance } from "../types/attendance";

export const getAttendance = async (): Promise<AttendanceResponse> => {
    const response = await api.get<AttendanceResponse>("/attendance");

    return response.data;
};

export const clockIn = async (
    employeeId: string
): Promise<{
    success: boolean;
    message: string;
    data: Attendance;
}> => {
    const response = await api.post(
        "/attendance/clock-in",
        { employeeId }
    );

    return response.data;
};

export const clockOut = async (
    employeeId: string
): Promise<{
    success: boolean;
    message: string;
    data: Attendance;
}> => {
    const response = await api.put(
        "/attendance/clock-out",
        { employeeId }
    );

    return response.data;
};