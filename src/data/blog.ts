export const blogs = [
  {
    _id: "1",
    title:
      "Budget-Friendly Painting: How to Refresh Your Space Without Breaking the Bank",
    excerpt:
      "Feeling like your walls are closing in, or just tired of looking at the same old color? A room refresh can do wonders for your mood and home's appeal, but the thought of the cost can be daunting. Major renovations aren't always feasible, but here's the good news: painting is one of the most cost-effective ways to completely transform a space.",
    date: "April 24, 2025",
    author: "Michael Norwood",
    category: "Local Landscapers",
    comments: 1,
    image:
      "https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/28fb691e-6443-4da9-ec21-79a0d3005e00/public",
  },
  {
    _id: "2",
    title: "Finding Trusted Landscapers in Your Area",
    excerpt:
      "When it comes to transforming your home or office, a fresh coat of paint can make all the difference.",
    date: "April 23, 2025",
    author: "Ed Dus",
    category: "Local Landscapers",
    comments: 1,
    image:
      "https://imagedelivery.net/6JkaVsfAvbV7M0nIAmm2-g/8cc3389a-94a3-461d-d2b8-ffa696564200/public",
    alt: "Smiling couple sitting on floor after completing a home painting project, surrounded by paint cans, brushes, and ladder",
  },
].map((blog) => ({
  ...blog,
  slug: blog.title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, ""),
}));
