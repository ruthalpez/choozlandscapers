import Image from "next/image";
import Link from "next/link";
import { BsCalendar, BsEnvelope } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaRegComment } from "react-icons/fa";

import Logo from "@/images/logo/choz_landscrapers_transparent_logo_1.png";
import { blogs } from "@/data/blog";

const legalInfo = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Acceptable Use", href: "/acceptable-use" },
  { label: "Accessibility Statement", href: "/accessibility-statement" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Add your company", href: "/claim-painting-contractor" },
  { label: "Blog", href: "/blog" },
];

const Footer = () => {
  return (
    <footer className="text-sm primary-bg-gradient text-[#ffffff] relative">
      <div className="container xl:max-w-[1340px] mx-auto px-5">
        <div className="py-10 flex flex-wrap gap-10 md:gap-20">
          <div>
            <Link href={"/"} prefetch={false}>
              <Image src={Logo} alt="Logo" width={140} height={100} priority />
            </Link>
            <div className="mt-4">
              <Link
                href={"mailto:support@choozlandscapers.com"}
                prefetch={false}
                className="flex items-center gap-2 mb-2">
                <BsEnvelope />
                <span>support@choozlandscapers.com</span>
              </Link>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="https://www.facebook.com/profile.php?id=61573089310812"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/chooz_landscapers/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80">
                <FaInstagram className="w-6 h-6" />
              </a>
            </div>
          </div>
          <div>
            <h5 className="mb-4 text-base font-medium">Legal Info</h5>
            <hr className="border-white" />
            <ul className="mt-4">
              {legalInfo.map((item) => (
                <li key={item.label} className="mb-2">
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="mb-4 text-base font-medium">Quick Links</h5>
            <hr className="border-white" />
            <ul className="mt-4">
              {quickLinks.map((item) => (
                <li key={item.label} className="mb-2">
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="lg:max-w-[400px] xl:max-w-[496px]">
            <h5 className="mb-4 text-base font-medium">Recent Posts</h5>
            {blogs.slice(0, 1).map((blog, index) => (
              <div key={index} className="flex gap-4">
                <Link
                  href={`/blog/${blog.slug}`}
                  prefetch={false}
                  className="w-[117px]">
                  <Image
                    src={blog.image}
                    alt="Logo"
                    width={300}
                    height={300}
                    className="h-[117px] w-[117px] object-cover rounded-2xl"
                  />
                </Link>
                <div className="w-[calc(100%-117px)]">
                  <Link
                    href={`/blog/${blog.slug}`}
                    prefetch={false}
                    className="mb-2 text-base font-medium block">
                    {blog.title}
                  </Link>
                  <p className="mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="text-xs flex items-center gap-2">
                    <Link
                      href={`/blog/${blog.slug}`}
                      prefetch={false}
                      className="flex items-center gap-2 hover:underline">
                      <BsCalendar />
                      <span>{blog.date}</span>
                    </Link>
                    <Link
                      href={`/blog/${blog.slug}`}
                      prefetch={false}
                      className="flex items-center gap-2 hover:underline">
                      <FaRegComment />
                      <span>{blog.comments} comment</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </div>
      <hr className="border-[#485a85]" />
      <div className="container xl:max-w-[1340px] mx-auto px-5">
        <div className="py-5 flex items-center justify-center">
          <p>Copyright © {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
