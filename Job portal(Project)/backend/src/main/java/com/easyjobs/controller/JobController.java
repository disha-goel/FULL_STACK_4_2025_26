package com.easyjobs.controller;

import com.easyjobs.model.Application;
import com.easyjobs.model.Job;
import com.easyjobs.service.JobService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public List<Job> getAllJobs(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String location) {
        return jobService.getAllJobs(keyword, location);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable Long id) {
        return ResponseEntity.ok(jobService.getJobById(id));
    }

    @PostMapping
    public ResponseEntity<Job> createJob(@Valid @RequestBody Job job) {
        return ResponseEntity.ok(jobService.createJob(job));
    }

    @PostMapping("/{id}/apply")
    public ResponseEntity<Application> applyForJob(
            @PathVariable Long id,
            @RequestBody Application application,
            Authentication auth) {
        String email = auth != null ? auth.getName() : null;
        return ResponseEntity.ok(jobService.applyForJob(id, application, email));
    }

    @GetMapping("/{id}/applications")
    public List<Application> getApplications(@PathVariable Long id) {
        return jobService.getApplicationsForJob(id);
    }

    @GetMapping("/my-applications")
    public List<Application> myApplications(Authentication auth) {
        return jobService.getApplicationsByUser(auth.getName());
    }
}
