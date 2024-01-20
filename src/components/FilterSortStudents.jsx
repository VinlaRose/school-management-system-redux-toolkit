import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function FilterSortStudents({ onFilter, onSort }) {
    const filterGenderDefault  = useSelector(state => state.filterGender)
  const [filterGender, setFilterGender] = useState(filterGenderDefault); 
  const [sortCriteria, setSortCriteria] = useState('name'); 

  const handleFilterChange = (e) => {
    setFilterGender(e.target.value);
    onFilter(e.target.value); 
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
    onSort(e.target.value); 
  };

  return (
    <div className="filter-sort-container">
      <div className="filter-container">
        <label>Filter by Gender:</label>
        <select value={filterGender} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div className="sort-container">
        <label>Sort by:</label>
        <select value={sortCriteria} onChange={handleSortChange}>
          <option value="name">Name</option>
          <option value="age">Age</option>
          <option value="attendance">Attendance</option>
          <option value="marks">Marks</option>
        </select>
      </div>
    </div>
  );
}

export default FilterSortStudents;
