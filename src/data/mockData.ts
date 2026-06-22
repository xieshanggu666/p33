import { Course, Teacher, TimeSlot, DayOfWeek, ScheduleEntry } from '../types';

export const courses: Course[] = [
  { id: 'course-1', name: '数学', color: '#3B82F6' },
  { id: 'course-2', name: '英语', color: '#10B981' },
  { id: 'course-3', name: '物理', color: '#F59E0B' },
  { id: 'course-4', name: '化学', color: '#EF4444' },
  { id: 'course-5', name: '语文', color: '#8B5CF6' },
  { id: 'course-6', name: '编程', color: '#EC4899' },
];

export const teachers: Teacher[] = [
  { id: 'teacher-1', name: '张老师', avatar: '👨‍🏫', courses: ['course-1', 'course-3'] },
  { id: 'teacher-2', name: '李老师', avatar: '👩‍🏫', courses: ['course-2', 'course-5'] },
  { id: 'teacher-3', name: '王老师', avatar: '👨‍🔬', courses: ['course-3', 'course-4'] },
  { id: 'teacher-4', name: '刘老师', avatar: '👩‍🎓', courses: ['course-1', 'course-6'] },
  { id: 'teacher-5', name: '陈老师', avatar: '👨‍💻', courses: ['course-6', 'course-3'] },
  { id: 'teacher-6', name: '赵老师', avatar: '👩‍🔬', courses: ['course-4', 'course-2'] },
];

export const timeSlots: TimeSlot[] = [
  { id: 'morning', name: '上午', startTime: '08:00', endTime: '12:00' },
  { id: 'afternoon', name: '下午', startTime: '14:00', endTime: '18:00' },
  { id: 'evening', name: '晚上', startTime: '19:00', endTime: '21:00' },
];

export const daysOfWeek: DayOfWeek[] = [
  { id: 1, name: '星期一', shortName: '周一' },
  { id: 2, name: '星期二', shortName: '周二' },
  { id: 3, name: '星期三', shortName: '周三' },
  { id: 4, name: '星期四', shortName: '周四' },
  { id: 5, name: '星期五', shortName: '周五' },
  { id: 6, name: '星期六', shortName: '周六' },
  { id: 7, name: '星期日', shortName: '周日' },
];

export const initialSchedule: ScheduleEntry[] = [
  { id: 'sched-1', teacherId: 'teacher-1', courseId: 'course-1', dayOfWeek: 1, timeSlotId: 'morning', weekOffset: 0 },
  { id: 'sched-2', teacherId: 'teacher-2', courseId: 'course-2', dayOfWeek: 1, timeSlotId: 'afternoon', weekOffset: 0 },
  { id: 'sched-3', teacherId: 'teacher-3', courseId: 'course-3', dayOfWeek: 2, timeSlotId: 'morning', weekOffset: 0 },
  { id: 'sched-4', teacherId: 'teacher-4', courseId: 'course-6', dayOfWeek: 3, timeSlotId: 'evening', weekOffset: 0 },
  { id: 'sched-5', teacherId: 'teacher-1', courseId: 'course-3', dayOfWeek: 4, timeSlotId: 'morning', weekOffset: 0 },
  { id: 'sched-6', teacherId: 'teacher-5', courseId: 'course-6', dayOfWeek: 5, timeSlotId: 'afternoon', weekOffset: 0 },
  { id: 'sched-7', teacherId: 'teacher-6', courseId: 'course-4', dayOfWeek: 6, timeSlotId: 'morning', weekOffset: 0 },
  { id: 'sched-8', teacherId: 'teacher-2', courseId: 'course-5', dayOfWeek: 2, timeSlotId: 'evening', weekOffset: 0 },
  { id: 'sched-9', teacherId: 'teacher-3', courseId: 'course-4', dayOfWeek: 4, timeSlotId: 'afternoon', weekOffset: 1 },
  { id: 'sched-10', teacherId: 'teacher-4', courseId: 'course-1', dayOfWeek: 5, timeSlotId: 'morning', weekOffset: 1 },
];
