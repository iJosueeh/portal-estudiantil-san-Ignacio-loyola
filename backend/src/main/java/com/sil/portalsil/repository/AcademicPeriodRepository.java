package com.sil.portalsil.repository;

import com.sil.portalsil.entity.AcademicPeriod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AcademicPeriodRepository extends JpaRepository<AcademicPeriod, Long> {
    
    List<AcademicPeriod> findByIsActive(Boolean isActive);
    
    Optional<AcademicPeriod> findByIsCurrent(Boolean isCurrent);
    
    List<AcademicPeriod> findByAcademicYear(Integer academicYear);
    
    List<AcademicPeriod> findByAcademicYearOrderByStartDateAsc(Integer academicYear);
}
