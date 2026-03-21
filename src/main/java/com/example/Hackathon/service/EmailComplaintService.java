package com.example.Hackathon.service;

import com.example.Hackathon.dto.EmailWebhookPayload;
import com.example.Hackathon.entity.Complaint;
import com.example.Hackathon.entity.Customer;
import com.example.Hackathon.enums.Channel;
import com.example.Hackathon.enums.ComplaintStatus;
import com.example.Hackathon.enums.IssueType;
import com.example.Hackathon.enums.Severity;
import com.example.Hackathon.repository.ComplaintRepository;
import com.example.Hackathon.repository.CustomerRepository;
import com.example.Hackathon.util.EmailValidationUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class EmailComplaintService {

    private final ComplaintRepository complaintRepository;
    private final CustomerRepository customerRepository;
    private final EmailSenderService emailSenderService;

    // Matches cases like: Customer ID: 12345, CustID=12345, ID: 12345, Customer-Id 12345 (Strictly Digits)
    private static final Pattern CUSTOMER_ID_PATTERN = Pattern.compile("(?i)(?:customer[-\\s]?id|custid|id)\\s*[:=]?\\s*(\\d+)");

    public boolean processEmailComplaint(EmailWebhookPayload payload) {
        String email = payload.getSenderEmail();
        String originalSubject = payload.getSubject();
        String rawBody = payload.getEmailBody();
        String cleanBody = cleanBody(rawBody);

        // 1. Validation Pipeline
        if (!EmailValidationUtil.isValidSender(email)) {
            System.out.println("❌ Email Registration Blocked [Invalid Sender]: " + email);
            return false;
        }

        if (!EmailValidationUtil.isValidSubject(originalSubject)) {
            System.out.println("❌ Email Registration Blocked [Invalid Subject]: " + originalSubject);
            return false;
        }

        if (!EmailValidationUtil.isValidBody(cleanBody)) {
            System.out.println("❌ Email Registration Blocked [Invalid Body - Length/Keywords missing]");
            return false;
        }

        String normalizedSubject = EmailValidationUtil.normalizeSubject(originalSubject);

        // 2. Detect duplicates within the last 10 minutes
        LocalDateTime tenMinsAgo = LocalDateTime.now().minusMinutes(10);
        List<Complaint> recentComplaints = complaintRepository.findByDateRange(tenMinsAgo, LocalDateTime.now());
        boolean isDuplicate = recentComplaints.stream()
                .anyMatch(c -> email.equalsIgnoreCase(c.getEmail()) && normalizedSubject.equalsIgnoreCase(c.getTitle()));

        if (isDuplicate) {
            System.out.println("⚠️ Duplicate complaint detected and ignored from " + email + " for subject: " + normalizedSubject);
            return false; // Safely exit without storing duplicate
        }

        // 3. Extract Customer ID
        String customerId = extractCustomerId(cleanBody);
        
        // 4. Determine Priority
        String priority = determinePriority(cleanBody);
        Severity severityEnum = mapPriorityToSeverity(priority);

        // 5. Create Complaint
        String ticketNumber = "CMP-" + LocalDateTime.now().getYear() + "-" + generateRandomId();

        Customer customer = null;
        if (!"UNKNOWN".equals(customerId)) {
            customer = customerRepository.findByCustomerNumber(customerId).orElse(null);
        }
        if (customer == null) {
            // Fallback attempt by email
            customer = customerRepository.findByEmail(email).orElse(null);
        }

        Complaint complaint = new Complaint();
        complaint.setTicketNumber(ticketNumber);
        complaint.setTitle(normalizedSubject);
        complaint.setDescription(cleanBody);
        complaint.setEmail(email);
        complaint.setProvidedCustomerId(customerId);
        complaint.setPriority(priority);
        complaint.setStatus(ComplaintStatus.OPEN);
        complaint.setSeverity(severityEnum);
        complaint.setChannel(Channel.EMAIL);
        complaint.setCustomer(customer);
        complaint.setIssueType(IssueType.GENERAL_INQUIRY); // Default
        complaint.setProductType(com.example.Hackathon.enums.ProductType.OTHER); // Default
        complaint.setIsDuplicate(false); // Since we abort entirely on duplicate

        complaintRepository.save(complaint);
        System.out.println("✅ Accepted and saved complaint " + ticketNumber + " from " + email);

        // 6. Send Confirmation ONLY to the user (the sender)
        emailSenderService.sendComplaintConfirmation(email, ticketNumber, normalizedSubject);
        return true;
    }

    private String cleanBody(String body) {
        if (body == null) return "";
        String cleaned = body.replaceAll("\\s+", " ").trim();
        int sigIndex = cleaned.indexOf("-- ");
        if (sigIndex != -1) {
            cleaned = cleaned.substring(0, sigIndex);
        }
        return cleaned;
    }

    private String extractCustomerId(String body) {
        Matcher matcher = CUSTOMER_ID_PATTERN.matcher(body);
        if (matcher.find()) {
            return matcher.group(1).trim();
        }
        return "UNKNOWN";
    }

    private String determinePriority(String body) {
        String lowerBody = body.toLowerCase();
        if (lowerBody.contains("urgent") || lowerBody.contains("asap") || lowerBody.contains("immediately")) {
            return "HIGH";
        } else if (lowerBody.contains("minor") || lowerBody.contains("not urgent")) {
            return "LOW";
        }
        return "MEDIUM";
    }

    private Severity mapPriorityToSeverity(String priority) {
        switch (priority) {
            case "HIGH": return Severity.P1;
            case "LOW": return Severity.P4;
            default: return Severity.P3; // MEDIUM
        }
    }

    private int generateRandomId() {
        return 1000 + new Random().nextInt(9000);
    }
}
