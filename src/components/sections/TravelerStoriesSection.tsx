import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import RatingBar from '@/components/ui/RatingBar';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import toast, { Toaster } from 'react-hot-toast';

interface TestimonialProfile {
  id: string;
  name: string;
  avatar: string;
}

interface Testimonial {
  id: string;
  content: string;
  rating: number;
  tripTitle: string;
  profile: TestimonialProfile;
}

const TravelerStoriesSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // comment box state
  const [comment, setComment] = useState("");

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (comment.trim() === "") {
      toast.error("Please write something before submitting!");
      return;
    }

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ comment }),
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch testimonials: ${res.status}`);
      }

      toast.success("Thank you for your comment!");
      console.log(comment)
      setComment("");
    } catch (err) {
      console.error(err);
      toast.error("Could not submit your comment. Try again!");
    }
  };


  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials?is_approved=true");
        if (!response.ok) {
          throw new Error(`Failed to fetch testimonials: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched testimonials:", data);

        const formattedData = data.results.map((item: any) => ({
          id: item.id,
          content: item.content,
          rating: item.rating,
          tripTitle: item.trip_title,
          profile: {
            id: item.user?.id || "",
            name: item.reviewer_name || item.user?.full_name || "Anonymous",
            avatar: item.reviewer_avatar || "/images/default-avatar.jpg",
          },
        }));

        setTestimonials(formattedData);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);


  if (loading) {
    return <p className='text-center'>Loading testimonials...</p>;
  }

  return (
    <section className="w-full py-[80px] sm:py-[100px] lg:py-[120px]" style={{ backgroundColor: '#F9F9F9' }}>
      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-12 sm:gap-16 lg:gap-20 relative">
          <div className="text-left">
            <h2
              className="text-[30px] sm:text-[35px] lg:text-[40px] font-light italic leading-[33px] sm:leading-[44px] lg:leading-[55px] font-noto-serif"
              style={{ color: '#000000' }}
            >
              Traveler Stories
            </h2>
            <p
              className="text-[14px] sm:text-[16px] lg:text-[18px] font-host-grotesk font-light leading-relaxed mt-4 max-w-[400px] w-full pr-32 sm:pr-20"
              style={{ color: '#312E29' }}
            >
              Stories shared by explorers who turned trips into lasting memories.
            </p>
          </div>

          <div className="relative mt-6 ">
            {/* Background Image - carousel-back.png */}
            {/* <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 translate-x-8 sm:translate-x-12 lg:translate-x-16 z-0">
              <Image
                src="/carousel-back.png"
                alt="Background decoration"
                width={400}
                height={400}
                className="object-contain opacity-100 w-[600px] h-[500px]"
              />
            </div> */}

            {/* Vector.png Background on Right Side */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-60 sm:-translate-x-36 lg:-translate-x-16 z-0 pointer-events-none">
              <div className="w-[450px] h-[450px] sm:w-[550px] sm:h-[500px]">
                <Image
                  src="/images/img_vector.svg"
                  alt="Vector background"
                  fill
                  className="object-contain opacity-100"
                  priority
                />
              </div>
            </div>

            {/* Aphos PNG at top-left of carousel section */}
            <div className="absolute -top-5 left-0 z-20">
              <Image src="/aphos.png" alt="Aphos" width={50} height={50} className="object-contain" />
            </div>

            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
              }}
              className="w-full testimonial-swiper pb-12"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <div className="flex flex-col p-6 sm:p-8 bg-white rounded-2xl shadow-sm h-full min-h-[280px]">
                    {/* Profile Section at Top */}
                    <div className="flex gap-4 items-start mb-4">
                      <div className="relative w-16 h-16 rounded-3xl overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.profile.avatar}
                          alt={testimonial.profile.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-[18px] font-noto-serif italic font-normal leading-tight" style={{ color: '#000000' }}>
                          {testimonial.profile.name}
                        </h4>
                        {/* Rating right below name */}
                        <div className="mt-1">
                          <RatingBar rating={testimonial.rating} readonly={true} size="sm" />
                        </div>
                      </div>
                    </div>

                    {/* Trip Title */}
                    <h3 className="text-[18px] font-host-grotesk font-semibold leading-tight mb-3" style={{ color: '#8B4F5C' }}>
                      {testimonial.tripTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-[16px] font-host-grotesk font-normal leading-relaxed italic" style={{ color: '#312E29' }}>
                      {testimonial.content}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Comment box */}
        <form className='flex flex-col sm:flex-row gap-y-3 gap-x-[13px] relative z-10 mt-[35px]' onSubmit={handleCommentSubmit}>
          <input
            type="text"
            placeholder='Add your experience'
            className='bg-[#E3E3E3] placeholder:text-[#7F7F7F] placeholder:text-sm sm:placeholder:text-base text-sm sm:text-base md:text-[18px] py-3 px-5 rounded-xl max-w-[800px] w-full outline-none text-black font-inter text-center placeholder:text-center sm:text-left sm:placeholder:text-left'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button className='h-[52px] sm:h-[60px] md:h-[65px] w-[140px] sm:w-[160px] md:w-[180px] text-base sm:text-base md:text-[21px] lg:text-[24px] text-white bg-[#312E29] rounded-xl cursor-pointer hover:bg-black transition-all ease-in-out duration-200 font-inter self-center sm:self-auto'>
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default TravelerStoriesSection;
