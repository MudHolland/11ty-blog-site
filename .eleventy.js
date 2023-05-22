const { DateTime } = require("luxon");
const markdownIt = require('markdown-it');
const md = markdownIt();

module.exports = function(eleventyConfig) {

	eleventyConfig.addPassthroughCopy('./src/reset.css');
	eleventyConfig.addPassthroughCopy('./src/style.css');
	eleventyConfig.addPassthroughCopy('./src/modal.css');
	eleventyConfig.addPassthroughCopy('./src/darkmode.js');
	eleventyConfig.addPassthroughCopy('./src/modal.js');
	eleventyConfig.addPassthroughCopy('./src/assets');
	eleventyConfig.addPassthroughCopy('./src/admin');

// Override the default image rendering rule
md.renderer.rules.image = function (tokens, idx, options, env, self) {
    // Get the image details from the token
    const src = tokens[idx].attrs[0][1];
    const label = tokens[idx].attrs[1][1];

    // Generate the HTML output
    return `<figure>
      <img src="${src}" alt="${label}">
      <figcaption>[${label}]</figcaption>
    </figure>`;
  };

  // Add the modified MarkdownIt instance to Eleventy's markdown library
  eleventyConfig.setLibrary('md', md);



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
