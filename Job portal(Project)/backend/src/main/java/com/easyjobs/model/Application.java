package com.easyjobs.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String applicantName;
    private String email;
    private String phone;

    @Column(length = 2000)
    private String coverLetter;

    private String status = "PENDING"; // PENDING, REVIEWED, ACCEPTED, REJECTED

    private LocalDate appliedDate = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters
    public Long getId() { return id; }
    public String getApplicantName() { return applicantName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getCoverLetter() { return coverLetter; }
    public String getStatus() { return status; }
    public LocalDate getAppliedDate() { return appliedDate; }
    public Job getJob() { return job; }
    public User getUser() { return user; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setApplicantName(String name) { this.applicantName = name; }
    public void setEmail(String email) { this.email = email; }
    public void setPhone(String phone) { this.phone = phone; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }
    public void setStatus(String status) { this.status = status; }
    public void setAppliedDate(LocalDate date) { this.appliedDate = date; }
    public void setJob(Job job) { this.job = job; }
    public void setUser(User user) { this.user = user; }
}
