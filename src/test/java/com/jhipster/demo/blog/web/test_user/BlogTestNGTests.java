package com.jhipster.demo.blog.web.test_user;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertNull;

import com.jhipster.demo.blog.IntegrationTest;
import com.jhipster.demo.blog.domain.Blog;
import com.jhipster.demo.blog.repository.BlogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.ActiveProfiles;
import org.testng.annotations.*;

@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
@ActiveProfiles("testprod")
public class BlogTestNGTests {

    private static final String DEFAULT_NAME = "Test Blog";
    private static final String DEFAULT_HANDLE = "test-blog";

    @Autowired
    private BlogRepository blogRepository;

    private Blog blog;
    private static Blog savedBlog;

    @AfterClass
    public void cleanupClass() {
        if (savedBlog != null) {
            blogRepository.deleteById(savedBlog.getId());
        }
    }

    @BeforeMethod
    public void setUp() {
        blog = new Blog();
    }

    @AfterMethod
    public void tearDown() {
        blogRepository.deleteAll();
    }

    @Test
    public void shouldCreateBlog() throws Exception {
        // Create blog
        blog.setName(DEFAULT_NAME);
        blog.setHandle(DEFAULT_HANDLE);

        assertThat(blog.getHandle()).isNotNull();
        assertThat(blog.getHandle()).isNotEmpty();
    }

    @Test
    public void shouldUpdateBlog() throws Exception {
        assertNull(blog.getHandle());
        assertThat(blog.getHandle());
    }
}
