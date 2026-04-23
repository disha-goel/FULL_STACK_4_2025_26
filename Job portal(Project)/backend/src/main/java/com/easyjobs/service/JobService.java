package com.easyjobs.service;

import com.easyjobs.model.Application;
import com.easyjobs.model.Job;
import com.easyjobs.model.User;
import com.easyjobs.repository.ApplicationRepository;
import com.easyjobs.repository.JobRepository;
import com.easyjobs.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepo;
    private final ApplicationRepository appRepo;
    private final UserRepository userRepo;

    public JobService(JobRepository jobRepo, ApplicationRepository appRepo, UserRepository userRepo) {
        this.jobRepo = jobRepo;
        this.appRepo = appRepo;
        this.userRepo = userRepo;
    }

    public List<Job> getAllJobs(String keyword, String location) {
        String kw = (keyword == null || keyword.isBlank()) ? null : keyword;
        String loc = (location == null || location.isBlank()) ? null : location;
        if (kw == null && loc == null) return jobRepo.findAll();
        return jobRepo.searchJobs(kw, loc);
    }

    public Job getJobById(Long id) {
        return jobRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    public Job createJob(Job job) {
        return jobRepo.save(job);
    }

    public Application applyForJob(Long jobId, Application application, String userEmail) {
        Job job = getJobById(jobId);
        application.setJob(job);
        if (userEmail != null) {
            userRepo.findByEmail(userEmail).ifPresent(application::setUser);
        }
        return appRepo.save(application);
    }

    public List<Application> getApplicationsForJob(Long jobId) {
        return appRepo.findByJobId(jobId);
    }

    public List<Application> getApplicationsByUser(String email) {
        return appRepo.findByUserEmail(email);
    }
}

