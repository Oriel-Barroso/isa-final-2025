package com.jhipster.demo.blog.config;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@ActiveProfiles("testprod")
@RestController
public class WebConfigurerTestController {

    @GetMapping("/api/test-cors")
    public void testCorsOnApiPath() {
        // empty method
    }

    @GetMapping("/test/test-cors")
    public void testCorsOnOtherPath() {
        // empty method
    }
}
