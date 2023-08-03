const { DateTime } = require("luxon");
const markdownIt = require('markdown-it');
const md = markdownIt();

module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy('./src/reset.css');
	eleventyConfig.addPassthroughCopy('./src/style.css');
	eleventyConfig.addPassthroughCopy('./src/script.js');
	eleventyConfig.addPassthroughCopy('./src/favicon.ico');
	eleventyConfig.addPassthroughCopy('./src/assets');
	eleventyConfig.addPassthroughCopy('./src/admin');

	// Override the default image rendering rule
	md.renderer.rules.image = function (tokens, idx, options, env, self) {
		// Get the image details from the token
		const src = tokens[idx].attrs[0][1];
		const alt = tokens[idx].content;
		// Generate the HTML output
		return `
			<figure>
				<img src="${src}" alt="${alt}">
				<figcaption>${alt}</figcaption>
			</figure>`;
	};
	// Add the modified MarkdownIt instance to Eleventy's markdown library
	eleventyConfig.setLibrary('md', md);

	// Add a filter to modify the blog content
	eleventyConfig.addFilter('openingParagraph', function (content) {
		const paragraphs = content.split('</p>');
		if (paragraphs.length > 1) {
		  paragraphs[0] = paragraphs[0].replace('<p>', '<p class="opening">');
		}
		return paragraphs.join('</p>');
	  });

	eleventyConfig.addFilter("postDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
	})

	return {
		dir: {
			input: "src",
			output: "public"
		}
	}
};
