package com.example.Hackathon.service;

import com.example.Hackathon.dto.AgentNotifyDTO;
import com.example.Hackathon.entity.Complaint;
import com.example.Hackathon.enums.Channel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AgentNotificationService {

    private final EmailSenderService emailSenderService;
    private final TwilioWhatsAppService twilioWhatsAppService;
    private final AuditLogService auditLogService;

    public void notifyCustomer(Complaint complaint, AgentNotifyDTO dto) {
        String requested = dto.getChannel() != null ? dto.getChannel().trim() : "";
        boolean auto = requested.isEmpty() || "AUTO".equalsIgnoreCase(requested);

        String type = dto.getMessageType() != null ? dto.getMessageType().trim().toUpperCase() : "OTHER";
        String subject = buildSubject(complaint, type);
        String body = buildBody(complaint, dto.getMessage());

        String effective = auto ? defaultChannelForComplaint(complaint) : requested.toUpperCase();

        if ("WHATSAPP".equals(effective)) {
            String phone = resolvePhone(complaint);
            if (phone == null) {
                if (auto && resolveEmail(complaint) != null) {
                    effective = "EMAIL";
                } else {
                    throw new IllegalStateException(
                            "No mobile number on file for WhatsApp. Add phone to the customer or use email.");
                }
            }
        }

        if ("EMAIL".equals(effective)) {
            String to = resolveEmail(complaint);
            if (to == null) {
                throw new IllegalStateException(
                        "No email for this case — ensure complaint email or customer email is set.");
            }
            emailSenderService.sendAgentMessage(to, subject, body);
        } else if ("WHATSAPP".equals(effective)) {
            String phone = resolvePhone(complaint);
            if (!twilioWhatsAppService.sendWhatsApp(phone, body)) {
                if (auto && resolveEmail(complaint) != null) {
                    emailSenderService.sendAgentMessage(resolveEmail(complaint), subject, body);
                } else {
                    throw new IllegalStateException(
                            "WhatsApp send failed. Configure Twilio (app.twilio.*) or use email.");
                }
            }
        } else {
            throw new IllegalArgumentException("channel must be EMAIL, WHATSAPP, or AUTO");
        }

        String logSnippet = dto.getMessage().length() > 400 ? dto.getMessage().substring(0, 400) + "..." : dto.getMessage();
        auditLogService.log(complaint, "Agent notified customer via " + effective, "AGENT", null, logSnippet);
    }

    private static String defaultChannelForComplaint(Complaint c) {
        Channel ch = c.getChannel();
        if (ch == Channel.WHATSAPP) {
            return "WHATSAPP";
        }
        if (ch == Channel.EMAIL) {
            return "EMAIL";
        }
        return "EMAIL";
    }

    private String resolveEmail(Complaint c) {
        if (c.getEmail() != null && !c.getEmail().isBlank()) {
            return c.getEmail().trim();
        }
        if (c.getCustomer() != null && c.getCustomer().getEmail() != null && !c.getCustomer().getEmail().isBlank()) {
            return c.getCustomer().getEmail().trim();
        }
        return null;
    }

    private String resolvePhone(Complaint c) {
        if (c.getCustomer() != null && c.getCustomer().getPhone() != null && !c.getCustomer().getPhone().isBlank()) {
            return c.getCustomer().getPhone().trim();
        }
        return null;
    }

    private String buildSubject(Complaint c, String type) {
        return switch (type) {
            case "INFO_REQUEST" -> "More information needed — " + c.getTicketNumber();
            case "RESOLUTION" -> "Update on your complaint — " + c.getTicketNumber();
            default -> "Message regarding your complaint — " + c.getTicketNumber();
        };
    }

    private String buildBody(Complaint c, String agentMessage) {
        return "Reference: " + c.getTicketNumber() + "\n\n" + agentMessage + "\n\n— Complaint Management Team";
    }
}
