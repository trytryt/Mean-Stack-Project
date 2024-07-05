import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalCount: number;
    pageSize: number;
    onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalCount, pageSize, onPageChange }) => {
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="pagination-controls">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
        </div>
    );
};

export default Pagination;
