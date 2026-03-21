package com.example.Hackathon.util;

import java.util.Arrays;
import java.util.List;

public class EmailValidationUtil {

    private static final List<String> INVALID_SENDERS = Arrays.asList(
            "noreply@", "no-reply@", "do-not-reply@", "system@", "mailer-daemon@"
    );

    private static final List<String> SUBJECT_REQUIRED_KEYWORDS = Arrays.asList(
            "complaint", "issue", "problem", "refund", "failed", "delay", "error"
    );

    private static final List<String> SUBJECT_FORBIDDEN_KEYWORDS = Arrays.asList(
            "otp", "verification", "alert", "security", "welcome", "account", "login"
    );

    private static final List<String> BODY_REQUIRED_KEYWORDS = Arrays.asList(
            "not working", "failed", "error", "issue", "refund", "delay", "problem"
    );

    public static boolean isValidSender(String email) {
        if (email == null || email.isEmpty()) return false;
        String lowerEmail = email.toLowerCase();
        for (String invalidSender : INVALID_SENDERS) {
            if (lowerEmail.contains(invalidSender)) {
                return false;
            }
        }
        return true;
    }

    public static boolean isValidSubject(String subject) {
        if (subject == null || subject.trim().isEmpty()) return false;
        String lowerSubject = subject.toLowerCase();

        // Check forbidden keywords
        for (String forbidden : SUBJECT_FORBIDDEN_KEYWORDS) {
            if (lowerSubject.contains(forbidden)) {
                return false;
            }
        }

        // Check required keywords
        boolean hasRequiredKeyword = false;
        for (String req : SUBJECT_REQUIRED_KEYWORDS) {
            if (lowerSubject.contains(req)) {
                hasRequiredKeyword = true;
                break;
            }
        }

        return hasRequiredKeyword;
    }

    public static boolean isValidBody(String body) {
        if (body == null || body.trim().length() <= 30) {
            return false;
        }

        String lowerBody = body.toLowerCase();
        for (String req : BODY_REQUIRED_KEYWORDS) {
            if (lowerBody.contains(req)) {
                return true;
            }
        }

        return false;
    }

    public static String normalizeSubject(String subject) {
        if (subject == null) return "No Subject";
        // Remove prefixes like "Re:", "Fwd:", "FW:", etc.
        return subject.replaceAll("(?i)^(re|fwd|fw|reply):\\s*", "").trim();
    }
}
