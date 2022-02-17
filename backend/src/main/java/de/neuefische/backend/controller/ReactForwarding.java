package de.neuefische.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReactForwarding {

    @GetMapping(value = "/**/{[path:[^\\.]*}")
    public String forwardToRoutUrl() {
        return "forward:/";
    }

}
