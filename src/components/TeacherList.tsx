import { Teacher } from '../types';
import { TeacherCard } from './TeacherCard';

interface TeacherListProps {
  teachers: Teacher[];
  getWeeklyHours: (teacherId: string) => number;
}

export function TeacherList({ teachers, getWeeklyHours }: TeacherListProps) {
  return (
    <div className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-bold text-gray-800">教师名单</h2>
        <p className="text-sm text-gray-500 mt-1">拖拽教师卡片到课表中排课</p>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {teachers.map((teacher) => (
          <TeacherCard
            key={teacher.id}
            teacher={teacher}
            weeklyHours={getWeeklyHours(teacher.id)}
          />
        ))}
      </div>
    </div>
  );
}
