export interface Course {
  id: string;
  name: string;
  color: string;
}

export interface Teacher {
  id: string;
  name: string;
  avatar: string;
  courses: string[];
}

export interface TimeSlot {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
}

export interface DayOfWeek {
  id: number;
  name: string;
  shortName: string;
}

export interface ScheduleEntry {
  id: string;
  teacherId: string;
  courseId: string;
  dayOfWeek: number;
  timeSlotId: string;
  weekOffset: number;
}

export interface GridCell {
  dayOfWeek: number;
  timeSlotId: string;
}

export interface ConflictInfo {
  cell: GridCell;
  existingEntry: ScheduleEntry;
  newTeacherId: string;
  newCourseId: string;
}
