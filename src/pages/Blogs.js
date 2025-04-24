import React from "react";
import "../pages/Blogs.css";
import HeroSection from "../components/HeroSection";

const Blogs = () => {
  const blogData = [
    {
      title: "Why Regular Plumbing Checks Matter",
      summary: "Discover how timely plumbing inspections can save you thousands.",
      date: "April 20, 2025",
      author: "John Smith"
    },
    {
      title: "5 Painting Mistakes to Avoid",
      summary: "Learn the secrets professionals use for perfect home painting.",
      date: "April 17, 2025",
      author: "Emily Green"
    },
    {
      title: "Electric Safety Tips for Homeowners",
      summary: "Stay safe with these expert electrician-recommended tips.",
      date: "April 12, 2025",
      author: "Samantha Lee"
    },
    {
      title: "Moving Made Easy: 7 Packing Hacks",
      summary: "Simplify your move with these clever packing tricks.",
      date: "April 10, 2025",
      author: "Mike Johnson"
    }
  ];

  return (
    <>
      <HeroSection />
      <div className="blogs-page">
        <h2>📝 Latest Blogs</h2>
        <p className="blog-intro">Tips and inspiration from the experts at WorkersDeck</p>
        <div className="blog-grid">
          {blogData.map((blog, index) => (
            <div className="blog-card" key={index}>
              <h3>{blog.title}</h3>
              <p className="blog-summary">{blog.summary}</p>
              <p className="blog-meta">📅 {blog.date} | ✍️ {blog.author}</p>
              <button className="read-more-btn">Read More</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;