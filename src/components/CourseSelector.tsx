import { Teacher, Course, GridCell } from '../types';
import { courses } from '../data/mockData';

interface CourseSelectorProps {
  teacher: Teacher;
  cell: GridCell;
  weekOffset: number;
  onSelect: (courseId: string) => void;
  onCancel: () => void;
}

export function CourseSelector({ teacher, cell, weekOffset, onSelect, onCancel }: CourseSelectorProps) {
  const teacherCourses = teacher.courses
    .map((id) => courses.find((c) => c.id === id))
    .filter(Boolean) as Course[];

  const dayNames = ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];
  const timeSlotNames: Record<string, string> = {
    morning: '上午',
    afternoon: '下午',
    evening: '晚上',
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={onCancel}>
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 overflow-hidden animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-blue-500 text-white p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{teacher.avatar}</span>
            <div>
              <h3 className="text-lg font-bold">选择课程</h3>
              <p className="text-sm opacity-90">
                {teacher.name} 教授 {teacherCourses.length} 门课程
              </p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-3 text-sm text-gray-500 text-center">
            排到{' '}
            <span className="font-semibold text-gray-700">
              {dayNames[cell.dayOfWeek]} {timeSlotNames[cell.timeSlotId]}
            </span>
          </div>

          <div className="space-y-2">
            {teacherCourses.map((course) => (
              <button
                key={course.id}
                onClick={() => onSelect(course.id)}
                className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-left group"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: course.color }}
                >
                  {course.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {course.name}
                  </div>
                  <div className="text-xs text-gray-500">点击选择此课程</div>
                </div>
                <span className="text-gray-300 group-hover:text-blue-400 transition-colors">→</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={onCancel}
            className="w-full px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}
