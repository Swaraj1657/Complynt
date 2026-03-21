package com.example.Hackathon.service;

import com.example.Hackathon.dto.BotState;
import com.example.Hackathon.dto.WhatsAppSession;
import com.example.Hackathon.entity.Complaint;
import com.example.Hackathon.entity.Customer;
import com.example.Hackathon.enums.ProductType;
import com.example.Hackathon.enums.IssueType;
import com.example.Hackathon.enums.ComplaintStatus;
import com.example.Hackathon.enums.Severity;
import com.example.Hackathon.enums.Channel;
import com.example.Hackathon.repository.ComplaintRepository;
import com.example.Hackathon.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class WhatsAppBotService {

    private final WhatsAppSessionService sessionService;
    private final CustomerRepository customerRepository;
    private final ComplaintRepository complaintRepository;

    public String processMessage(Map<String, String> payload) {
        String from = payload.get("From");
        String messageBody = payload.get("Body") != null ? payload.get("Body").trim() : "";
        int numMedia = Integer.parseInt(payload.getOrDefault("NumMedia", "0"));

        WhatsAppSession session = sessionService.getSession(from);

        // Check for 5-minute expiration (300,000 milliseconds)
        long currentTime = System.currentTimeMillis();
        if (currentTime - session.getLastInteractionTime() > 300_000) {
            session.setCurrentState(BotState.MAIN_MENU);
        }
        session.setLastInteractionTime(currentTime);

        // Allow manual reset
        if (messageBody.equalsIgnoreCase("reset") || messageBody.equalsIgnoreCase("restart") || messageBody.equalsIgnoreCase("menu")) {
            session.setCurrentState(BotState.MAIN_MENU);
            messageBody = "hi"; // Force show welcome
        }

        String responseMessage = handleState(session, messageBody, numMedia);
        
        sessionService.updateSession(session);

        return buildTwiML(responseMessage);
    }

    private String handleState(WhatsAppSession session, String message, int numMedia) {
        switch (session.getCurrentState()) {
            case MAIN_MENU:
                return handleMainMenu(session, message);
            case AWAITING_CUSTOMER_ID_BALANCE:
                return handleCustomerBalance(session, message);
            case AWAITING_CUSTOMER_ID_COMPLAINT:
                return handleCustomerIdForComplaint(session, message);
            case AWAITING_CATEGORY:
                return handleCategorySelection(session, message);
            case AWAITING_DESCRIPTION:
                return handleComplaintDescription(session, message);
            case AWAITING_MEDIA_OR_CONFIRMATION:
                return handleMediaOrConfirmation(session, message, numMedia);
            case AWAITING_COMPLAINT_ID:
                return handleComplaintStatus(session, message);
            default:
                session.setCurrentState(BotState.MAIN_MENU);
                return getMainMenuMessage();
        }
    }

    private String handleMainMenu(WhatsAppSession session, String message) {
        if (message.equalsIgnoreCase("1")) {
            session.setCurrentState(BotState.AWAITING_CUSTOMER_ID_BALANCE);
            return "🔐 Please enter your Customer ID:";
        } else if (message.equalsIgnoreCase("2")) {
            session.setCurrentState(BotState.AWAITING_CUSTOMER_ID_COMPLAINT);
            return "🆔 Please enter your Customer ID:";
        } else if (message.equalsIgnoreCase("3")) {
            session.setCurrentState(BotState.AWAITING_COMPLAINT_ID);
            return "🔎 Please enter your Complaint ID:";
        } else {
            // First time greeting or invalid text in main menu
            String welcome = message.equalsIgnoreCase("hi") ? "👋 Welcome to Smart Support System!\n" : "⚠️ Please select a valid option (1, 2, or 3).\n\n";
            return welcome + getMainMenuMessage();
        }
    }

    private String getMainMenuMessage() {
        return "How can I assist you today?\n\n1️⃣ Check Account Balance\n2️⃣ Register Complaint\n3️⃣ Check Complaint Status";
    }

    private String handleCustomerBalance(WhatsAppSession session, String message) {
        if (!isNumeric(message) || message.length() < 6 || message.length() > 12) {
            return "❌ Invalid input. Must be numeric (6–12 digits). Please try again.";
        }

        // Simulating the check since real integration isn't there, but let's check if customer exists if possible.
        // We'll mimic the prompt exactly
        session.setCurrentState(BotState.MAIN_MENU);
        return "💰 Your current account balance is ₹XXXXX (Demo Data)\n\n" + getMainMenuMessage();
    }

    private String handleCustomerIdForComplaint(WhatsAppSession session, String message) {
        if (!isNumeric(message) || message.length() < 6 || message.length() > 12) {
            return "❌ Invalid input. Must be numeric (6–12 digits). Please try again.";
        }
        
        session.setCustomerId(message);
        session.setCurrentState(BotState.AWAITING_CATEGORY);
        return "📂 Select Complaint Category:\n1️⃣ Transaction Issue\n2️⃣ Account Issue\n3️⃣ Service Complaint\n4️⃣ Other";
    }

    private String handleCategorySelection(WhatsAppSession session, String message) {
        switch (message) {
            case "1": 
                session.setSelectedCategory(ProductType.OTHER);
                session.setSelectedIssueType(IssueType.TRANSACTION_DISPUTE); 
                break;
            case "2": 
                session.setSelectedCategory(ProductType.SAVINGS_ACCOUNT);
                session.setSelectedIssueType(IssueType.GENERAL_INQUIRY); 
                break;
            case "3": 
                session.setSelectedCategory(ProductType.OTHER);
                session.setSelectedIssueType(IssueType.SERVICE_OUTAGE); 
                break;
            case "4": 
                session.setSelectedCategory(ProductType.OTHER);
                session.setSelectedIssueType(IssueType.OTHER); 
                break;
            default: return "❌ Invalid input. Please select a valid option (1, 2, 3, or 4).";
        }
        
        session.setCurrentState(BotState.AWAITING_DESCRIPTION);
        return "📝 Please briefly describe your complaint:";
    }

    private String handleComplaintDescription(WhatsAppSession session, String message) {
        if (message.length() < 5) {
            return "❌ Invalid input. Description is too short. Please try again.";
        }
        
        session.setComplaintDescription(message);
        session.setCurrentState(BotState.AWAITING_MEDIA_OR_CONFIRMATION);
        return "📎 Do you want to upload any image or document? (Yes/No)";
    }

    private String handleMediaOrConfirmation(WhatsAppSession session, String message, int numMedia) {
        if (numMedia > 0 || message.equalsIgnoreCase("yes") || message.equalsIgnoreCase("y")) {
            if (numMedia == 0) {
                // They answered "Yes" but didn't send media yet, just wait in same state
                return "📸 Please send the image or file now.";
            }
        } else if (!message.equalsIgnoreCase("no") && !message.equalsIgnoreCase("n")) {
            return "❌ Invalid input. Please answer Yes or No.";
        }

        // Either No, or media was provided. Let's register it.
        try {
            String ticketNumber = registerComplaint(session);
            session.setCurrentState(BotState.MAIN_MENU);
            return "✅ Your complaint has been registered successfully!\n" +
                   "📌 Complaint ID: " + ticketNumber + "\n" +
                   "Our team will resolve it within 24–48 hours.\n\n" +
                   getMainMenuMessage();
        } catch (Exception e) {
            e.printStackTrace();
            session.setCurrentState(BotState.MAIN_MENU);
            return "❌ Sorry, there was a system error while registering your complaint. Please try again later.\n\n" + getMainMenuMessage();
        }
    }

    private String handleComplaintStatus(WhatsAppSession session, String message) {
        if (message.isEmpty()) {
            return "❌ Invalid input. Please try again.";
        }
        
        Optional<Complaint> complaint = complaintRepository.findByTicketNumber(message);
        
        session.setCurrentState(BotState.MAIN_MENU);
        
        if (complaint.isPresent()) {
            return "📊 Status: " + complaint.get().getStatus().name() + "\nWe are working on your issue.\n\n" + getMainMenuMessage();
        } else {
            return "📊 Status: In Progress (Demo)\nWe are working on your issue.\n\n" + getMainMenuMessage();
        }
    }

    private String registerComplaint(WhatsAppSession session) {
        String ticketNumber = "CMP" + generateRandomId();
        
        Customer customer = customerRepository.findByCustomerNumber(session.getCustomerId())
                .orElse(null);

        Complaint complaint = new Complaint();
        complaint.setTicketNumber(ticketNumber);
        complaint.setTitle("WhatsApp Complaint");
        complaint.setDescription(session.getComplaintDescription());
        complaint.setProductType(session.getSelectedCategory());
        complaint.setIssueType(session.getSelectedIssueType());
        complaint.setStatus(ComplaintStatus.OPEN);
        complaint.setSeverity(Severity.P3);
        complaint.setChannel(Channel.WHATSAPP); // Use WHATSAPP channel
        complaint.setCustomer(customer);
        
        complaintRepository.save(complaint);
        
        return ticketNumber;
    }

    private boolean isNumeric(String str) {
        if (str == null || str.isEmpty()) {
            return false;
        }
        for (char c : str.toCharArray()) {
            if (!Character.isDigit(c)) {
                return false;
            }
        }
        return true;
    }

    private int generateRandomId() {
        return 10000 + new Random().nextInt(90000); // 5 digits
    }

    private String buildTwiML(String message) {
        return "<Response><Message>" + escapeXml(message) + "</Message></Response>";
    }

    private String escapeXml(String s) {
        return s.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll("\"", "&quot;")
                .replaceAll("'", "&apos;");
    }
}
