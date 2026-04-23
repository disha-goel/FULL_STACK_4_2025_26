package com.easyjobs.config;

import com.easyjobs.model.Job;
import com.easyjobs.repository.JobRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private final JobRepository jobRepo;

    public DataSeeder(JobRepository jobRepo) {
        this.jobRepo = jobRepo;
    }

    @Override
    public void run(String... args) {
        if (jobRepo.count() > 0) return;

        jobRepo.save(job("Software Engineer", "TechSoft Pvt Ltd", "Hyderabad", "₹8-14 LPA",
            "Full-Time",
            "Design and develop scalable backend services using Java and Spring Boot.",
            "3+ years Java, Spring Boot, REST APIs, SQL"));

        jobRepo.save(job("React Developer", "Creative Studio", "Pune", "₹6-10 LPA",
            "Full-Time",
            "Build modern, responsive web applications using React and TypeScript.",
            "2+ years React, JavaScript, CSS, REST API integration"));

        jobRepo.save(job("Data Analyst", "DataCorp", "Chennai", "₹5-9 LPA",
            "Full-Time",
            "Analyze large datasets and create dashboards to drive business decisions.",
            "SQL, Python, Power BI or Tableau, Excel"));

        jobRepo.save(job("UI/UX Designer", "PixelWorks", "Bangalore", "₹5-8 LPA",
            "Full-Time",
            "Create intuitive user interfaces and design systems for web and mobile apps.",
            "Figma, Adobe XD, user research, prototyping"));

        jobRepo.save(job("DevOps Engineer", "CloudBase", "Remote", "₹12-18 LPA",
            "Remote",
            "Manage CI/CD pipelines, cloud infrastructure, and container orchestration.",
            "AWS/GCP, Docker, Kubernetes, Jenkins, Terraform"));

        jobRepo.save(job("Marketing Intern", "BrandUp", "Mumbai", "₹15,000/month",
            "Internship",
            "Assist in social media campaigns, content creation, and market research.",
            "Good communication, social media knowledge, creativity"));
    }

    private Job job(String title, String company, String location, String salary,
                    String type, String desc, String req) {
        Job j = new Job();
        j.setTitle(title);
        j.setCompany(company);
        j.setLocation(location);
        j.setSalary(salary);
        j.setJobType(type);
        j.setDescription(desc);
        j.setRequirements(req);
        return j;
    }
}
