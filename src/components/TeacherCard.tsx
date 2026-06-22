import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Teacher, Course } from '../types';
import { courses } from '../data/mockData';

interface TeacherCardProps {
  teacher: Teacher;
  weeklyHours: number;
  isDragging?: boolean;
}

export function TeacherCard({ teacher, weeklyHours }: TeacherCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `teacher-${teacher.id}`,
    data: {
      type: 'teacher',
      teacherId: teacher.id,
      defaultCourseId: teacher.courses[0],
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  const teacherCourses = teacher.courses
    .map((id) => courses.find((c) => c.id === id))
    .filter(Boolean) as Course[];

  const loadLevel = weeklyHours >= 10 ? 'high' : weeklyHours >= 5 ? 'medium' : 'low';
  const loadColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };
  const loadBgColors = {
    high: 'bg-red-50',
    medium: 'bg-yellow-50',
    low: 'bg-green-50',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        p-4 rounded-xl border-2 border-gray-200 bg-white cursor-grab active:cursor-grabbing
        hover:border-blue-400 hover:shadow-md transition-all duration-200
        ${isDragging ? 'shadow-lg border-blue-500' : ''}
      `}
    >
      <div className="flex items-start gap-3">
        <div className="text-3xl">{teacher.avatar}</div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-800">{teacher.name}</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {teacherCourses.map((course) => (
              <span
                key={course.id}
                className="text-xs px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: course.color }}
              >
                {course.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={`mt-3 p-2 rounded-lg ${loadBgColors[loadLevel]}`}>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">本周课时</span>
          <span className={`font-bold ${loadColors[loadLevel].replace('bg-', 'text-')}`}>
            {weeklyHours} 节
          </span>
        </div>
        <div className="mt-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${loadColors[loadLevel]} transition-all duration-300`}
            style={{ width: `${Math.min(weeklyHours * 10, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
