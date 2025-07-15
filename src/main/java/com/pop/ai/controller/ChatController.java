package com.pop.ai.controller;

import com.pop.ai.service.GeminiService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final GeminiService geminiService;

    public ChatController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");
        String reply = geminiService.askGemini(userMessage);

        Map<String, String> response = new HashMap<>();
        response.put("reply", reply);
        return response;
    }
}
