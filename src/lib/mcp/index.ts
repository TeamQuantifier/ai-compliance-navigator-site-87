import { defineMcp } from "@lovable.dev/mcp-js";
import listBlogPosts from "./tools/list-blog-posts";
import listCaseStudies from "./tools/list-case-studies";

export default defineMcp({
  name: "quantifier-ai-mcp",
  title: "Quantifier.ai MCP",
  version: "0.1.0",
  instructions:
    "Read-only access to Quantifier.ai public marketing content. Use `list_blog_posts` for published blog articles and `list_case_studies` for customer success stories. Both accept an optional `locale` (en, pl, cs).",
  tools: [listBlogPosts, listCaseStudies],
});
