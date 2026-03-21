package com.example.Hackathon;

import com.example.Hackathon.entity.*;
import com.example.Hackathon.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private AgentRepository agentRepository;

    @Autowired
    private SlaRuleRepository slaRuleRepository;

    @Autowired
    private EscalationRuleRepository escalationRuleRepository;

    @Override
    public void run(String... args) {
        if (agentRepository.count() > 0) return; // already seeded

        // ===== TEAMS =====
        Team ccTeam = teamRepository.save(Team.builder().name("Credit Card Team").category("CREDIT_CARD").build());
        Team loanTeam = teamRepository.save(Team.builder().name("Loan Team").category("HOME_LOAN").build());
        Team savingsTeam = teamRepository.save(Team.builder().name("Savings Team").category("SAVINGS_ACCOUNT").build());
        Team genTeam = teamRepository.save(Team.builder().name("General Team").category("OTHER").build());

        // ===== AGENTS =====
        agentRepository.save(Agent.builder().name("Priya Sharma").email("priya@bank.com").role("AGENT").active(true).team(ccTeam).build());
        agentRepository.save(Agent.builder().name("Rahul Mehta").email("rahul@bank.com").role("AGENT").active(true).team(ccTeam).build());
        agentRepository.save(Agent.builder().name("Sneha Patel").email("sneha@bank.com").role("AGENT").active(true).team(loanTeam).build());
        agentRepository.save(Agent.builder().name("Vikram Nair").email("vikram@bank.com").role("SUPERVISOR").active(true).team(genTeam).build());
        agentRepository.save(Agent.builder().name("Anita Roy").email("anita@bank.com").role("AGENT").active(true).team(savingsTeam).build());

        // ===== SLA RULES =====
        slaRuleRepository.save(SlaRule.builder().severity("P1").slaHours(24).warnAtPercent(80).build());
        slaRuleRepository.save(SlaRule.builder().severity("P2").slaHours(72).warnAtPercent(80).build());
        slaRuleRepository.save(SlaRule.builder().severity("P3").slaHours(168).warnAtPercent(80).build());
        slaRuleRepository.save(SlaRule.builder().severity("P4").slaHours(720).warnAtPercent(80).build());

        // ===== ESCALATION RULES =====
        escalationRuleRepository.save(EscalationRule.builder().severity("P1").triggerAtPercent(80).escalateTo("SUPERVISOR").notifyMethod("DASHBOARD_ALERT").build());
        escalationRuleRepository.save(EscalationRule.builder().severity("P1").triggerAtPercent(100).escalateTo("BRANCH_HEAD").notifyMethod("EMAIL").build());
        escalationRuleRepository.save(EscalationRule.builder().severity("P2").triggerAtPercent(80).escalateTo("SUPERVISOR").notifyMethod("DASHBOARD_ALERT").build());
        escalationRuleRepository.save(EscalationRule.builder().severity("P2").triggerAtPercent(100).escalateTo("BRANCH_HEAD").notifyMethod("DASHBOARD_ALERT").build());

        System.out.println("========================================");
        System.out.println("  Data Seeder: Loaded seed data");
        System.out.println("  4 Teams, 5 Agents, 4 SLA Rules, 4 Escalation Rules");
        System.out.println("========================================");
    }
}
