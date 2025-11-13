"use client";

import Banner from "@/components/sections/BlogPost/Banner";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TfiHeart } from "react-icons/tfi";
import { PiHeartFill } from "react-icons/pi";
import chevronLeft from "../../../../public/blog/blogPost/XMLID_222_left.png";
import chevronRight from "../../../../public/blog/blogPost/XMLID_222_right.png";
import blogCard_1 from "../../../../public/blog/card_image_1.png";
import blogCard_2 from "../../../../public/blog/card_image_2.png";
import blogCard_3 from "../../../../public/blog/card_image_3.png";
import linkedIn_icon from "../../../../public/images/linkedin_icon.png";
import x_icon from "../../../../public/images/x_icon.png";
import facebook_icon from "../../../../public/images/facebook_icon.png";
import instagram_icon from "../../../../public/images/instagram_icon.png";
import toast from "react-hot-toast";

import blogInternalData from "../../../../public/json/blogInternalData.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useParams } from "next/navigation";
import BlogPostSkeleton from "@/components/sections/Blog/BlogPostSkeleton";

import { useRouter } from "next/navigation";

// Map JSON image keys to actual imports
const imageMap: Record<string, any> = {
  blogCard_1,
  blogCard_2,
  blogCard_3,
};

// Social links (static)
const socialLinks = [
  { id: 1, icon: linkedIn_icon, alt: "linked in", url: "https://www.linkedin.com/company/travelyollo/?viewAsMember=true" },
  // { id: 2, icon: x_icon, alt: "x", url: "/" },
  { id: 3, icon: instagram_icon, alt: "instagram", url: "https://www.instagram.com/travelyollo/" },
  { id: 4, icon: facebook_icon, alt: "facebook", url: "https://www.facebook.com/people/TravelYollo/61573601551252/" },
];

const Page = () => {
  const [favourite, setFavourite] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);



  interface BlogDetails {
    id?: string;
    slug?: string;
    title?: string;
    author?: string;
    date?: string;
    featured_image?: string;
    paragraphs?: {
      desktop: string[];
      mobile: string[];
    };
    quote?: {
      desktop: string;
      mobile: string;
    };
    related_blogs?: any[];
    like_count?: number;
    view_count?: number;
  }


  const [blogDetails, setBlogDetails] = useState<BlogDetails | null>(null);

  // Latest posts for sidebar (static)
  const blogData = blogInternalData[0];
  const blogCards = blogData.blogCards.map((card) => ({
    ...card,
    image: imageMap[card.image] || blogCard_1,
  }));

  const { slug } = useParams();

  // Pagination for blogs
  const router = useRouter();

  const currentIndex = relatedBlogs.findIndex(
    (item) => item?.slug === slug
  );

  const handleNextBlog = () => {
    if (relatedBlogs.length === 0) return;
    const nextIndex = (currentIndex + 1) % relatedBlogs.length;
    const nextSlug = relatedBlogs[nextIndex]?.blog.slug;
    if (nextSlug) router.push(`/blog/${nextSlug}`);
  };

  const handlePrevBlog = () => {
    if (relatedBlogs.length === 0) return;
    const prevIndex =
      (currentIndex - 1 + relatedBlogs.length) % relatedBlogs.length;
    const prevSlug = relatedBlogs[prevIndex]?.blog.slug;
    if (prevSlug) router.push(`/blog/${prevSlug}`);
  };
  console.log("Current slug:", slug, "Related blogs:", relatedBlogs.length);


  // Fetch Blogs details via /blogs/{slug}
  useEffect(() => {
    async function fetchBlogDetails() {
      try {
        if (!slug || typeof slug !== "string") return; // 
        console.log("Fetching blog for slug:", slug);
        const res = await fetch(`/api/blogs/${slug}`, {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Failed to fetch blog:", res.status, text);
          throw new Error(`Failed with status ${res.status}`);
        }

        const data = await res.json();
        console.log("Blog fetched successfully:", data);

        // set blog and stop loading
        setBlogDetails(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error while fetching:", err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchBlogDetails();
  }, [slug]);

  // Fetch related blog posts via /blog-related/
  useEffect(() => {
    if (!slug) return;

    async function fetchRelatedBlogs() {
      try {
        const res = await fetch("/api/blog-related", {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });

        if (!res.ok) throw new Error(`Failed to fetch related blogs: ${res.status}`);

        const data = await res.json();
        console.log("Raw /api/blog-related response:", data);

        const results = Array.isArray(data.results)
          ? data.results
          : Array.isArray(data)
            ? data
            : [];

        const safeSlug = String(slug).trim().toLowerCase();

        const relatedList: any[] = [];

        results.forEach((item: any) => {
          if (!item) return;

          // Extract blog slug safely
          let blogSlug = null;
          if (item.blog && typeof item.blog === "object" && item.blog.slug) {
            blogSlug = String(item.blog.slug).toLowerCase();
          } else if (typeof item.blog === "string") {
            blogSlug = item.blog.toLowerCase();
          } else if (typeof item.blog === "number") {
            blogSlug = String(item.blog);
          }

          // Only continue if it matches current blog
          if (blogSlug !== safeSlug) return;

          // Handle related_blog in any shape
          const relatedField =
            item.related_blog ||
            item.related_blogs ||
            item.related ||
            item.relatedpost ||
            item.relatedBlog;

          if (!relatedField) return;

          // Add related blogs safely (object or array)
          if (Array.isArray(relatedField)) {
            relatedField.forEach((rb) => {
              if (rb && typeof rb === "object" && rb.slug) relatedList.push(rb);
            });
          } else if (relatedField && typeof relatedField === "object" && relatedField.slug) {
            relatedList.push(relatedField);
          }
        });

        // Remove duplicates by slug
        const unique = Array.from(
          new Map(relatedList.map((r) => [r.slug, r])).values()
        );

        console.log("Final related blogs:", unique);
        setRelatedBlogs(unique.slice(0, 3));
      } catch (err) {
        console.error("Error fetching related blogs:", err);
        setRelatedBlogs([]);
      }
    }

    fetchRelatedBlogs();
  }, [slug]);



  useEffect(() => {
    if (!slug) return;
    const liked = localStorage.getItem(`liked_${slug}`);
    if (liked === "true") {
      setFavourite(true);
    }
  }, [slug]);



  if (loading)
    return (
      <BlogPostSkeleton />
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        This Blog is Not available.
      </div>
    );

  return (
    <div className="relative w-screen">
      <Banner featured_image={blogDetails?.featured_image} />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col mdplus:flex-row md:justify-between md:items-start mt-[25px] md:mt-[37px] gap-x-[26px]">
        {/* Left section */}
        <div className="w-full mdplus:w-[70%] mdplus:border-r border-[#D0D0D0] pr-0 mdplus:pr-[26px] pb-0 sm:pb-[30px] mdplus:pb-[160px] lg:pb-[190px] md:mb-8">
          <div className="flex flex-row justify-between items-center">
            <p className="font-host-grotesk font-normal italic text-base md:text-[20px] text-[#6C3B3F]">
              By {blogDetails?.author || "TravelYolo Team"} •{" "}
              {blogDetails?.date || ""}
            </p>
            <span className="text-[24px] md:text-[26px] translate-y-0 lg:translate-y-[38px] cursor-pointer">
              {favourite ? (
                <PiHeartFill className="text-red-500" />
              ) : (
                <TfiHeart
                  onClick={async () => {
                    if (!blogDetails?.slug) return;

                    try {
                      setFavourite(true); // make it red immediately

                      const res = await fetch(`/api/blogs/${blogDetails.slug}/like`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                      });

                      if (!res.ok) {
                        console.error("Failed to update like count");
                        toast.error("Unable to like this post. Please try again.");
                        setFavourite(false);
                        return;
                      }

                      toast.success("You liked this post!");
                    } catch (error) {
                      console.error("Like error:", error);
                      toast.error("Something went wrong.");
                      setFavourite(false);
                    }
                  }}
                />
              )}
            </span>

          </div>

          <h2 className="max-w-[277px] w-full sm:max-w-[900px] text-[32px] md:text-[40px] text-[#000000] font-noto-serif font-medium italic mt-[55px] md:mt-[13px] leading-tight">
            {blogDetails?.title || "Untitled Blog"}
          </h2>

          {/* Paragraphs */}
          <div className="max-w-[1057px] w-full flex flex-col mt-[16px] md:mt-[70px]">
            <div className="flex flex-col gap-y-[30px]">
              {(blogDetails?.paragraphs?.mobile || []).map((p, i) => (
                <p
                  key={`mobile-${i}`}
                  className="block md:hidden text-[18px] md:text-[20px] font-normal text-[#6D6D6D] font-host-grotesk leading-[26px]"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
              {(blogDetails?.paragraphs?.desktop || []).map((p, i) => (
                <p
                  key={`desktop-${i}`}
                  className="hidden md:block text-[18px] md:text-[20px] font-normal text-[#6D6D6D] font-host-grotesk leading-[26px]"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div>

            <div className="mt-[68px] md:mt-[67px]">
              <h1 className="hidden md:block max-w-[859px] w-full font-noto-serif font-light italic text-[#6C3B3F] text-[32px] leading-snug">
                {blogDetails?.quote?.desktop || ""}
              </h1>
              <h1 className="block md:hidden font-noto-serif font-light italic text-[#6C3B3F] text-[32px] leading-snug">
                {blogDetails?.quote?.mobile || ""}
              </h1>
            </div>

            {/* Second Paragraphs */}
            {/* <div className="flex flex-col gap-y-[30px] mt-[21px] md:mt-[67px]">
              {(blogDetails?.paragraphs?.mobile || []).map((p, i) => (
                <p
                  key={`sm-${i}`}
                  className="block md:hidden text-[18px] md:text-[20px] font-normal text-[#6D6D6D] font-host-grotesk leading-[26px]"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
              {(blogDetails?.paragraphs?.desktop || []).map((p, i) => (
                <p
                  key={`lg-${i}`}
                  className="hidden md:block text-[18px] md:text-[20px] font-normal text-[#6D6D6D] font-host-grotesk leading-[26px]"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div> */}

            {/* Image placeholders */}
            {/* <div className="flex flex-col sm:flex-row gap-[17px] md:gap-[18px] mt-[50px] md:mt-[45px]">
              <div className="max-w-[507px] w-full h-[420px] md:h-[590px] bg-[#D9D9D9]"></div>
              <div className="max-w-[507px] w-full h-[420px] md:h-[590px] bg-[#D9D9D9]"></div>
            </div> */}

            {/* Third Paragraphs */}
            {/* <div className="flex flex-col gap-y-[30px] mt-[49px] md:mt-[59px]">
              {(blogDetails?.paragraphs?.mobile || []).map((p, i) => (
                <p
                  key={`m3-${i}`}
                  className="block md:hidden text-[18px] md:text-[20px] font-normal text-[#6D6D6D] font-host-grotesk leading-[26px]"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
              {(blogDetails?.paragraphs?.desktop || []).map((p, i) => (
                <p
                  key={`d3-${i}`}
                  className="hidden md:block text-[18px] md:text-[20px] font-normal text-[#6D6D6D] font-host-grotesk leading-[26px]"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}
            </div> */}
          </div>

          <hr className="h-[1px] w-full bg-[#D0D0D0] mt-[56px] md:mt-[53px]" />
        </div>

        {/* Right Section */}
        <div className="w-full md:flex-1 mt-[89px] md:mt-0">
          <div>
            <h2 className="font-normal font-noto-serif italic text-[#000000] text-[24px]">
              Latest post
            </h2>
            <div className="flex flex-col mt-[27px] max-w-[371px] w-full">
              {relatedBlogs.length > 0 ? (
                relatedBlogs.map((item) => (
                  <div
                    key={item.id || item.slug}
                    className="flex flex-row items-center gap-x-[10px] mt-[13px] first:mt-0"
                  >
                    <Image
                      src={item.featured_image || blogCard_1}
                      alt={item.title}
                      width={1000}
                      height={1000}
                      className="w-[107px] h-[73px] rounded-lg object-cover"
                    />
                    <Link href={`/blog/${item.slug}`}>
                      <p className="max-w-[228px] w-full font-medium text-base font-host-grotesk hover:underline cursor-pointer">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                ))
              ) : (
                <p className="text-[#6D6D6D] text-sm mt-3">No related blogs found.</p>
              )}


              <hr className="h-[1px] bg-[#D0D0D0] w-full mt-[63px] md:mt-[76px]" />
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-[57px] md:mt-[63px] mb-[136px] md:mb-0">
            <h2 className="font-normal font-noto-serif italic text-[#000000] text-[24px]">
              Newsletter
            </h2>
            <form
              className="max-w-[371px] w-full flex flex-col gap-y-[27px] justify-center items-center mt-[53px] md:mt-[21px]"
              onSubmit={async (e) => {
                e.preventDefault();

                if (!email.trim()) {
                  toast.error("Please enter your email.");
                  return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email.trim())) {
                  toast.error("Please enter a valid email address.");
                  return;
                }

                try {
                  const res = await fetch("/api/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: email.trim(),
                      is_subscribed: true,
                    }),
                  });

                  if (!res.ok) {
                    const errData = await res.text();
                    console.error("Newsletter error:", errData);
                    toast.error("Subscription failed. Please try again later.");
                    return;
                  }

                  setEmail("");
                  toast.success("Subscribed to newsletter!");
                } catch (err) {
                  console.error("Newsletter error:", err);
                  toast.error("Something went wrong. Please try again.");
                }
              }}
            >
              <input
                type="text"
                placeholder="Email"
                className="w-full bg-[#E8E8E8] placeholder:text-base placeholder:text-[#5B564C] placeholder:font-normal font-host-grotesk py-3.5 px-6 rounded-full outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="text-center w-full h-[53px] text-base text-[#312E29] font-normal font-host-grotesk border border-[#312E29] rounded-full cursor-pointer hover:bg-[#312E29] hover:text-[#FFFFFF] transition-colors ease-in-out duration-200 hover:scale-105"
              >
                Subscribe
              </button>
            </form>
            <hr className="hidden sm:block mt-[81px] h-[1px] w-full bg-[#D0D0D0]" />
          </div>

          {/* Follow Us */}
          <div className="hidden md:flex flex-col gap-[24px] mt-[48px]">
            <h2 className="font-normal font-noto-serif italic text-[#000000] text-[24px]">
              Follow Us
            </h2>
            <div className="flex flex-row gap-x-[17px]">
              {socialLinks.map((item) => (
                <Link key={item.id} href={item.url} target="_blank">
                  <Image
                    src={item.icon}
                    alt={item.alt}
                    width={1000}
                    height={1000}
                    className="h-[50px] w-[50px]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Swiper Navigation Style */}
      <style jsx global>{`
        .custom-swiper .swiper-button-prev,
        .custom-swiper .swiper-button-next {
          color: #312e29 !important;
        }
        .custom-swiper .swiper-button-prev::after,
        .custom-swiper .swiper-button-next::after {
          font-size: 22px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default Page;