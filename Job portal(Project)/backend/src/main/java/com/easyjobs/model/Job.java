package com.easyjobs.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDate;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String company;

    @NotBlank
    private String location;

    private String salary;
    private String jobType;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String requirements;

    private LocalDate postedDate = LocalDate.now();

    // Getters
    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getCompany() { return company; }
    public String getLocation() { return location; }
    public String getSalary() { return salary; }
    public String getJobType() { return jobType; }
    public String getDescription() { return description; }
    public String getRequirements() { return requirements; }
    public LocalDate getPostedDate() { return postedDate; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setTitle(String title) { this.title = title; }
    public void setCompany(String company) { this.company = company; }
    public void setLocation(String location) { this.location = location; }
    public void setSalary(String salary) { this.salary = salary; }
    public void setJobType(String jobType) { this.jobType = jobType; }
    public void setDescription(String description) { this.description = description; }
    public void setRequirements(String requirements) { this.requirements = requirements; }
    public void setPostedDate(LocalDate postedDate) { this.postedDate = postedDate; }
}
