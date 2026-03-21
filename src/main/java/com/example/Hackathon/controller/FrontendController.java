package com.example.Hackathon.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {

    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }

    @GetMapping("/complaints")
    public String complaints() {
        return "forward:/complaints.html";
    }

    @GetMapping("/complaint-detail")
    public String complaintDetail() {
        return "forward:/complaint-detail.html";
    }

    @GetMapping("/new-complaint")
    public String newComplaint() {
        return "forward:/new-complaint.html";
    }

    @GetMapping("/agents")
    public String agents() {
        return "forward:/agents.html";
    }

    @GetMapping("/customers")
    public String customers() {
        return "forward:/customers.html";
    }

    @GetMapping("/sla")
    public String sla() {
        return "forward:/sla.html";
    }

    @GetMapping("/reports")
    public String reports() {
        return "forward:/reports.html";
    }
}
