package com.jhipster.demo.blog.domain;

import static com.jhipster.demo.blog.domain.BlogTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.jhipster.demo.blog.web.rest.TestUtil;
import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("testprod")
class BlogTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Blog.class);
        Blog blog1 = getBlogSample1();
        Blog blog2 = new Blog();
        assertThat(blog1).isNotEqualTo(blog2);

        blog2.setId(blog1.getId());
        assertThat(blog1).isEqualTo(blog2);

        blog2 = getBlogSample2();
        assertThat(blog1).isNotEqualTo(blog2);
    }
}
