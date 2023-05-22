const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy('./src/reset.css');
	eleventyConfig.addPassthroughCopy('./src/style.css');
	eleventyConfig.addPassthroughCopy('./src/modal.css');
	eleventyConfig.addPassthroughCopy('./src/darkmode.js');
	eleventyConfig.addPassthroughCopy('./src/modal.js');
	eleventyConfig.addPassthroughCopy('./src/assets');
	eleventyConfig.addPassthroughCopy('./src/admin');

	eleventyConfig.addFilter("postDate", (dateObj) => {
		return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
})

	return {
		dir: {
			input: "src",
			output: "public"
		}
	}

const markdownIt = require('markdown-it');
  // Create a new MarkdownIt instance
  const md = markdownIt();

  // Override the default image rendering rule
  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    // Get the image details from the token
    const src = tokens[idx].attrs[0][1];
    const alt = tokens[idx].attrs[1][1];

    // Generate the HTML output
    return `<figure>
      <img src="${src}" alt="${alt}">
      <figcaption>[${alt}]</figcaption>
    </figure>`;
  };

  // Add the modified MarkdownIt instance to Eleventy's markdown library
  eleventyConfig.setLibrary('md', md);
};
