import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CourseList.css';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/courses');
      setCourses(response.data);
    } catch (error) {
      console.error('강의 목록을 불러오는데 실패했습니다:', error);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await axios.post(`http://localhost:5000/api/courses/${courseId}/enroll`);
      fetchCourses(); // 목록 새로고침
    } catch (error) {
      console.error('수강신청에 실패했습니다:', error);
    }
  };

  return (
    <div className="course-list-container">
      <h1>수강신청</h1>
      
      <div className="search-filter-container">
        <input
          type="text"
          placeholder="강의 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">전체 강의</option>
          <option value="available">수강 가능</option>
          <option value="full">마감된 강의</option>
        </select>
      </div>

      <div className="courses-grid">
        {courses
          .filter(course => {
            if (filter === 'available') return course.enrolled < course.capacity;
            if (filter === 'full') return course.enrolled >= course.capacity;
            return true;
          })
          .filter(course => 
            course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(course => (
            <div key={course._id} className="course-card">
              <h2>{course.name}</h2>
              <p className="instructor">교수: {course.instructor}</p>
              <p className="description">{course.description}</p>
              <p className="schedule">강의 시간: {course.schedule}</p>
              <p className="capacity">
                ��강인원: {course.enrolled}/{course.capacity}
              </p>
              <button
                onClick={() => handleEnroll(course._id)}
                disabled={course.enrolled >= course.capacity}
                className="enroll-button"
              >
                {course.enrolled >= course.capacity ? '수강마감' : '수강신청'}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default CourseList; 