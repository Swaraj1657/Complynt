package com.example.Hackathon.service;

import com.example.Hackathon.entity.Agent;
import com.example.Hackathon.entity.Complaint;
import com.example.Hackathon.enums.ComplaintStatus;
import com.example.Hackathon.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class RoutingService {

    @Autowired
    private AgentRepository agentRepository;

    public Optional<Agent> autoAssign(Complaint complaint) {
        String category = complaint.getProductType() != null ? complaint.getProductType().name() : "OTHER";

        // 1. Find active agents in matching team
        List<Agent> teamAgents = agentRepository.findByTeamCategoryAndActive(category, true);

        // 2. Fallback to any active agent
        if (teamAgents.isEmpty()) {
            teamAgents = agentRepository.findByActive(true);
        }

        if (teamAgents.isEmpty()) {
            return Optional.empty();
        }

        // 3. Pick agent with lowest open complaint count (least loaded)
        return teamAgents.stream()
                .min(Comparator.comparingLong(agent -> {
                    if (agent.getAssignedComplaints() == null) return 0L;
                    return agent.getAssignedComplaints().stream()
                            .filter(c -> c.getStatus() != ComplaintStatus.RESOLVED
                                    && c.getStatus() != ComplaintStatus.CLOSED)
                            .count();
                }));
    }
}
