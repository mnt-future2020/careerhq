"use client";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { BlogSlider } from "../components/blog-ticker";

import { Grid } from "../components/ui/feature-section";
import { EnquiryForm, EnquiryFormHandle } from "../components/enquiry-form";

import { BlogCard } from "../components/blog-card";
import { AnimatedTestimonials } from "../components/ui/animated-testimonials";
import { HeroVideoDialog } from "../components/hero-video-dialog";
// import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import { AnimatedHeroContent } from "../components/ui/animated-hero-content";
import VenomBeam from "../components/ui/venom-beam";
import { AnimatedLogosCanopy } from "../components/ui/animated-logos-canopy";
import { StatsSection } from "../components/ui/stats-section";
// import DomeGallery from "../components/ui/country-flags";
import { TiltedCard } from "../components/ui/tilted-card";
import { ChromaGrid } from "../components/ui/chroma-grid";
import { AppleCardsCarousel } from "@/components/ui/apple-cards-carousel";
import { AnnouncementScroller } from "../components/ui/announcement-scroller";
import type { BlogPost } from "@/types/blog";
import type { CountryWithCounts, University } from "@/types/education";
import type { Company } from "@/models/Company";
import {
  // getImageUrl as getCloudinaryImageUrl,
  getCloudinaryUrl,
} from "@/lib/cloudinary-utils";
import {
  logDataFetchError,
  logNetworkError,
  logApiError,
} from "@/utils/errorUtils";

interface HomePageClientProps {
  blogPosts: BlogPost[];
  placementCompanies: Company[];
}

export function HomePageClient({
  blogPosts,
  placementCompanies,
}: HomePageClientProps) {
  const enquiryRef = React.useRef<EnquiryFormHandle | null>(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [_countries, setCountries] = React.useState<CountryWithCounts[]>([]);
  const [_universities, setUniversities] = React.useState<University[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoaded(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch countries and universities in parallel
      const [countriesRes, universitiesRes] = await Promise.all([
        fetch("/api/countries?includeCounts=true"),
        fetch("/api/universities?populate=true&limit=8"),
      ]);

      // Check countries response
      if (!countriesRes.ok) {
        logApiError(
          `Failed to fetch countries for homepage: ${countriesRes.status}`,
          "/api/countries",
          { includeCounts: true },
          countriesRes.status
        );
      }

      // Check universities response
      if (!universitiesRes.ok) {
        logApiError(
          `Failed to fetch universities for homepage: ${universitiesRes.status}`,
          "/api/universities",
          { populate: true, limit: 8 },
          universitiesRes.status
        );
      }

      const [countriesData, universitiesData] = await Promise.all([
        countriesRes.ok ? countriesRes.json() : { countries: [] },
        universitiesRes.ok ? universitiesRes.json() : { universities: [] },
      ]);

      // Set countries data (limit to top 4 for homepage)
      if (countriesData.countries) {
        setCountries(countriesData.countries);
      }

      // Set universities data
      if (universitiesData.universities) {
        setUniversities(universitiesData.universities);
      }
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        logNetworkError(error, "/api/countries or /api/universities", {
          countriesParams: { includeCounts: true },
          universitiesParams: { populate: true, limit: 8 },
        });
      } else {
        logDataFetchError(
          error instanceof Error ? error : String(error),
          "homepage_data",
          undefined,
          {
            countriesParams: { includeCounts: true },
            universitiesParams: { populate: true, limit: 8 },
          }
        );
      }
      // Keep empty arrays as fallback
    } finally {
      setLoading(false);
    }
  };

  // Data is now fetched from APIs in useEffect

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "CSE, SSN College of Engineering",
      content:
        "SSN's placement cell connected me with top recruiters; I landed a software role at a unicorn and my coding skills grew fast.",
      image: "👨‍💼",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Mechanical Engg, VIT (Vellore Institute of Technology)",
      content:
        "VIT's industry-driven curriculum and internship support helped me secure a summer internship that turned into a job offer.",
      image: "👩‍💼",
      rating: 5,
    },
    {
      name: "Emily Chen",
      role: "Data Science, Deakin University",
      content:
        "Deakin's industry-aligned curriculum helped me secure a Data Analyst internship that quickly became a full-time role.",
      image: "👨‍💻",
      rating: 5,
    },
    {
      name: "Liam Patel",
      role: "Computer Science, AUT — Auckland University of Technology",
      content:
        "AUT's industry-focused teaching and co-op placements opened the door to my first tech job in Auckland.",
      image: "👩‍💻",
      rating: 5,
    },
    {
      name: "Sarah Johnson",
      role: "Civil Engineering, Griffith University",
      content:
        "Griffith's close industry ties helped me earn a paid internship that led to a full-time engineering position.",
      image: "👨‍🔬",
      rating: 5,
    },
    {
      name: "Anika Müller",
      role: "Data Science, IU – International University of Applied Sciences",
      content:
        "IU's practical curriculum and flexible study modes helped me gain real industry experience in Germany.",
      image: "👩‍🔬",
      rating: 5,
    },
    {
      name: "David Schmidt",
      role: "MBA, Berlin School of Business & Innovation (BSBI)",
      content:
        "BSBI's business-focused teaching and networking events helped me land an internship in Berlin.",
      image: "👨‍🎓",
      rating: 5,
    },
    {
      name: "Michael Rodriguez",
      role: "Cybersecurity, University of New Haven (USA)",
      content:
        "UNH's practical labs and career workshops helped me secure a cybersecurity internship within months.",
      image: "👩‍🎓",
      rating: 5,
    },
    {
      name: "Sophie Martin",
      role: "Computer Science, University of Alberta (Canada)",
      content:
        "UAlberta's world-class labs and research culture helped me contribute to impactful engineering projects.",
      image: "👨‍⚕️",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "Management, Durham University (UK)",
      content:
        "Durham's rigorous coursework and academic excellence prepared me for a consulting role in the UK.",
      image: "👩‍⚕️",
      rating: 5,
    },
    {
      name: "Aoife O'Connor",
      role: "Computer Science, Trinity College Dublin (Ireland)",
      content:
        "TCD's research-led teaching and strong tech ecosystem helped me secure a role in Ireland's tech industry.",
      image: "👨‍🏫",
      rating: 5,
    },
    {
      name: "Pierre Dubois",
      role: "Global MBA, NEOMA Business School (Paris)",
      content:
        "NEOMA's global curriculum and case-study approach prepared me for real corporate challenges.",
      image: "👩‍🏫",
      rating: 5,
    },
    {
      name: "Ananya Reddy",
      role: "ECE, SSN College of Engineering",
      content:
        "Campus life at SSN balanced academics and clubs perfectly — faculty mentorship made a real difference in projects.",
      image: "👨‍🔧",
      rating: 5,
    },
    {
      name: "Arjun Menon",
      role: "IT, VIT (Vellore Institute of Technology)",
      content:
        "The global peer group and active placement team gave me confidence to interview with multinational companies.",
      image: "👩‍🔧",
      rating: 5,
    },
    {
      name: "Vikram Singh",
      role: "Civil Engg, SRM Institute of Science & Technology",
      content:
        "SRM's placement coaching and mock interviews were game-changers — I cleared multiple rounds and joined a large MNC.",
      image: "👨‍🎨",
      rating: 5,
    },
    {
      name: "Meera Krishnan",
      role: "Biotechnology, SRM Institute of Science & Technology",
      content:
        "Excellent lab facilities and supportive faculty helped me publish my first research paper during my final year.",
      image: "👩‍🎨",
      rating: 5,
    },
    {
      name: "Dr. Aditya Iyer",
      role: "Medicine, SRM Ramachandra",
      content:
        "Clinical exposure and experienced faculty at Ramachandra prepared me exceptionally well for hospital work.",
      image: "👨‍⚖️",
      rating: 5,
    },
    {
      name: "Kavya Nair",
      role: "Allied Health, SRM Ramachandra",
      content:
        "Hands-on training and industry collaborations led directly to my placement in a leading healthcare organisation.",
      image: "👩‍⚖️",
      rating: 5,
    },
    {
      name: "Karthik Ramesh",
      role: "Electronics, Sathyabama Institute of Science and Technology",
      content:
        "Sathyabama's project-driven labs gave me the portfolio I needed to impress recruiters.",
      image: "🧑‍💼",
      rating: 5,
    },
    {
      name: "Divya Subramanian",
      role: "IT, Sathyabama Institute of Science and Technology",
      content:
        "Placement teams arranged campus drives with reputable firms — the process was well-organised and supportive.",
      image: "🧑‍💻",
      rating: 5,
    },
    {
      name: "Dr. Sneha Pillai",
      role: "Dentistry, Saveetha Institute",
      content:
        "Clinical training at Saveetha was rigorous and practical — it boosted my confidence in patient care.",
      image: "🧑‍🔬",
      rating: 5,
    },
    {
      name: "Rohan Gupta",
      role: "Biomedical, Saveetha Institute",
      content:
        "Strong faculty guidance helped me secure a research assistant position during my studies.",
      image: "🧑‍🎓",
      rating: 5,
    },
    {
      name: "Arun Xavier",
      role: "Commerce, Loyola College",
      content:
        "Loyola's emphasis on ethics and soft skills made me a better communicator at interviews; I joined a consumer-tech firm after graduation.",
      image: "🧑‍⚕️",
      rating: 5,
    },
    {
      name: "Maria Joseph",
      role: "Visual Communication, Loyola College",
      content:
        "Active alumni network opened doors for mentoring and placements.",
      image: "🧑‍🏫",
      rating: 5,
    },
    {
      name: "Siddharth Bose",
      role: "Computer Science, Amrita Vishwa Vidyapeetham",
      content:
        "Amrita's research culture and collaboration with industry helped me land a role in AI research.",
      image: "👨‍💼",
      rating: 5,
    },
    {
      name: "Lakshmi Venkat",
      role: "Electrical Engg, Amrita Vishwa Vidyapeetham",
      content:
        "Holistic education, strong labs and experienced faculty — great foundation for my career in engineering.",
      image: "👩‍💼",
      rating: 5,
    },
    {
      name: "Naveen Kumar",
      role: "Mechanical Engg, PSG College of Technology",
      content:
        "PSG's corporate connections and robust placement training helped me receive multiple offers.",
      image: "👨‍💻",
      rating: 5,
    },
    {
      name: "Deepika Rajan",
      role: "Mechatronics, PSG College of Technology",
      content:
        "Excellent hands-on workshops and industry projects made me job-ready.",
      image: "👩‍💻",
      rating: 5,
    },
    {
      name: "Harish Balaji",
      role: "Computer Science, Rajalakshmi Engineering College",
      content:
        "Rajalakshmi's focused placement drives and soft-skill sessions helped me secure a role in product engineering.",
      image: "👨‍🔬",
      rating: 5,
    },
    {
      name: "Pooja Sundaram",
      role: "ECE, Rajalakshmi Engineering College",
      content:
        "Supportive faculty guided me through internships that turned into full-time offers.",
      image: "👩‍🔬",
      rating: 5,
    },
    {
      name: "Ashwin Prakash",
      role: "CSE, Kumaraguru College of Technology",
      content:
        "Kumaraguru's emphasis on practical learning and entrepreneurship helped me launch a startup post-graduation.",
      image: "👨‍🎓",
      rating: 5,
    },
    {
      name: "Nithya Mohan",
      role: "IT, Kumaraguru College of Technology",
      content:
        "Placement cell was proactive; the mock interviews built my confidence.",
      image: "👩‍🎓",
      rating: 5,
    },
    {
      name: "Samuel David",
      role: "Biotechnology, Karunya Institute of Technology and Sciences",
      content:
        "Karunya's ethical values and industry-focused curriculum made me a well-rounded engineer.",
      image: "👨‍⚕️",
      rating: 5,
    },
    {
      name: "Grace Thomas",
      role: "Chemical Engg, Karunya Institute of Technology and Sciences",
      content:
        "Strong lab facilities and internship pipelines helped me secure a research role.",
      image: "👩‍⚕️",
      rating: 5,
    },
    {
      name: "Oliver Thompson",
      role: "Engineering, Deakin University",
      content:
        "Hands-on labs and supportive faculty strengthened my research skills and boosted my confidence in global interviews.",
      image: "👨‍🏫",
      rating: 5,
    },
    {
      name: "Jack Anderson",
      role: "IT, Charles Sturt University",
      content:
        "CSU's practical modules and flexible learning helped me land a cyber security role soon after graduation.",
      image: "👩‍🏫",
      rating: 5,
    },
    {
      name: "Emma Williams",
      role: "Business Analytics, Charles Sturt University",
      content:
        "Personalised faculty guidance made my academic and career journey smooth and impactful.",
      image: "👨‍🔧",
      rating: 5,
    },
    {
      name: "Aria Singh",
      role: "Design Technology, AUT — Auckland University of Technology",
      content:
        "A multicultural environment and excellent labs helped me build a strong creative portfolio.",
      image: "👩‍🔧",
      rating: 5,
    },
    {
      name: "Isabella Brown",
      role: "Health Sciences, Flinders University",
      content:
        "Flinders' internship pathways and hands-on training directly helped me secure a role in the healthcare sector.",
      image: "👨‍🎨",
      rating: 5,
    },
    {
      name: "Noah Davis",
      role: "Biotechnology, Flinders University",
      content:
        "Friendly faculty and strong research facilities made project work meaningful and career-focused.",
      image: "👩‍🎨",
      rating: 5,
    },
    {
      name: "Chloe Taylor",
      role: "Business, Griffith University",
      content:
        "Excellent campus support and global exposure prepared me well for competitive business roles.",
      image: "👨‍⚖️",
      rating: 5,
    },
    {
      name: "Lucas Mitchell",
      role: "Mechanical Engg, The University of Newcastle (Australia)",
      content:
        "Newcastle's research-driven learning gave me the technical depth to join an international engineering firm.",
      image: "👩‍⚖️",
      rating: 5,
    },
    {
      name: "Mia Roberts",
      role: "IT, The University of Newcastle (Australia)",
      content:
        "Career services guided me through every interview step until I secured a graduate position.",
      image: "🧑‍💼",
      rating: 5,
    },
    {
      name: "Lars Weber",
      role: "Business Management, IU – International University of Applied Sciences",
      content:
        "Career-focused modules helped me secure a working student role within the first semester.",
      image: "🧑‍💻",
      rating: 5,
    },
    {
      name: "Hannah Fischer",
      role: "Marketing, Berlin School of Business & Innovation (BSBI)",
      content:
        "Their career guidance and international community opened doors to opportunities across Europe.",
      image: "🧑‍🔬",
      rating: 5,
    },
    {
      name: "Ryan Lee",
      role: "IT, EDU International (Adelaide)",
      content:
        "Practical training sessions and faculty mentorship helped me build strong skills and secure my placement.",
      image: "🧑‍🎓",
      rating: 5,
    },
    {
      name: "Zoe Campbell",
      role: "Business, EDU International (Adelaide)",
      content:
        "Supportive staff and well-structured internships made my transition into the workforce smooth.",
      image: "🧑‍⚕️",
      rating: 5,
    },
    {
      name: "Erik Andersson",
      role: "Entrepreneurship, Jönköping University (Sweden)",
      content:
        "The startup-driven ecosystem at Jönköping helped me co-found a student-led venture during my course.",
      image: "🧑‍🏫",
      rating: 5,
    },
    {
      name: "Sofia Larsson",
      role: "Engineering, Jönköping University (Sweden)",
      content:
        "Strong industry collaboration opened up multiple internship pathways across Europe.",
      image: "👨‍💼",
      rating: 5,
    },
    {
      name: "Camille Laurent",
      role: "Marketing, NEOMA Business School (Paris)",
      content:
        "Their alumni network and career support guided me toward a role in a multinational firm.",
      image: "👩‍💼",
      rating: 5,
    },
    {
      name: "Jessica Martinez",
      role: "Forensic Science, University of New Haven (USA)",
      content:
        "Faculty mentorship and research opportunities strengthened my profile for competitive roles.",
      image: "👨‍💻",
      rating: 5,
    },
    {
      name: "Ethan MacDonald",
      role: "Engineering, University of Alberta (Canada)",
      content:
        "Co-op programs and career fairs made it easier to connect with top recruiters.",
      image: "👩‍💻",
      rating: 5,
    },
    {
      name: "Charlotte Smith",
      role: "Economics, Durham University (UK)",
      content:
        "The college system and mentorship helped me grow personally and professionally.",
      image: "👨‍🔬",
      rating: 5,
    },
    {
      name: "Conor Murphy",
      role: "Business Analytics, Trinity College Dublin (Ireland)",
      content:
        "Great campus culture and well-structured internships strengthened my global career profile.",
      image: "👩‍🔬",
      rating: 5,
    },
  ];

  const services = [
    {
      title: "University Selection",
      description:
        "Get expert guidance on choosing the right university based on your academic profile, career goals, and preferences.",
      icon: "lucide:building",
    },
    {
      title: "Visa Assistance",
      description:
        "Navigate the complex visa application process with our step-by-step guidance and documentation support.",
      icon: "lucide:file-check",
    },
    {
      title: "Scholarship Guidance",
      description:
        "Discover and apply for scholarships that match your profile to make your education more affordable.",
      icon: "lucide:award",
    },
    {
      title: "Application Support",
      description:
        "Get comprehensive assistance with university applications, including SOP, LOR, and resume preparation.",
      icon: "lucide:clipboard-check",
    },
    {
      title: "Test Preparation",
      description:
        "Access resources and guidance for standardized tests like IELTS, TOEFL, GRE, GMAT, and more.",
      icon: "lucide:book-open",
    },
    {
      title: "Career Counseling",
      description:
        "Receive personalized career counseling to align your education with your long-term professional goals.",
      icon: "lucide:briefcase",
    },
    {
      title: "Student Accommodation",
      description:
        "Find safe and comfortable accommodation options near your university with our housing assistance service.",
      icon: "lucide:home",
    },
    {
      title: "Cultural Integration",
      description:
        "Get support for adapting to your new environment with cultural orientation and local community connections.",
      icon: "lucide:globe",
    },
  ];

  const statsData = [
    { value: "10000+", label: "Students Placed", icon: "lucide:users" },
    { value: "95%", label: "Visa Success Rate", icon: "lucide:check-circle" },
    { value: "500+", label: "University Partners", icon: "lucide:building" },
    { value: "50+", label: "Countries Covered", icon: "lucide:globe" },
  ];

  // Convert blog posts to ticker format
  const blogTickerItems = blogPosts.map((post) => {
    const urlSlug = post.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    return {
      id: post.id,
      title: post.title,
      link: `/blog/${urlSlug}`,
      isActive: false,
    };
  });

  // Announcement items for the scroller
  const announcementItems = blogPosts.slice(0, 10).map((post) => {
    return {
      id: post.id,
      text: post.title,
      link: "/blog",
      icon: "📰",
    };
  });

  return (
    <>
      {/* Hero Section */}
      <VenomBeam className="relative z-10 pt-24 lg:pt-32">
        <div className="container mx-auto px-4 pt-16 pb-28 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <AnimatedHeroContent />

                <div className="flex flex-wrap gap-4 mb-8">
                  <Link href="/about">
                    {" "}
                    <Button
                      color="primary"
                      size="lg"
                      endContent={<Icon icon="lucide:arrow-right" />}
                      className="font-medium"
                    >
                      Learn More
                    </Button>{" "}
                  </Link>
                  <Button
                    color="primary"
                    variant="flat"
                    size="lg"
                    startContent={<Icon icon="lucide:calendar" />}
                    className="font-medium"
                    onPress={() =>
                      enquiryRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                    }
                  >
                    Free Consultation
                  </Button>
                </div>

                {/* <div className="flex items-center justify-start gap-2">
                  <p className="text-sm text-foreground-500 mr-4 hidden md:block">
                    Popular Destinations:
                  </p>
                  {!loading && countries.length > 0 && (
                    <AnimatedTooltip
                      items={countries.map((country, index) => ({
                        id: index + 1,
                        name: country.name,
                        designation: `${
                          country.universities || 0
                        } Universities • ${country.courses || 0} Courses`,
                        image: country.flagImageId
                          ? getCloudinaryImageUrl(
                              country.flagImageId,
                              "thumbnail"
                            )
                          : ``,
                      }))}
                    />
                  )}
                </div> */}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative"
            >
              <TiltedCard
                tiltMaxAngle={10}
                scale={1.02}
                transitionDuration={400}
                containerClassName="relative z-10"
              >
                <HeroVideoDialog
                  videoSrc="https://www.youtube.com/embed/t5akgsQsOSk?si=zke8LcRhw_75zT4X"
                  thumbnailSrc="https://www.timeshighereducation.com/student/sites/default/files/harvard-university-campus.jpg"
                  thumbnailAlt="Watch our welcome video"
                  animationStyle="from-center"
                  className="w-full rounded-lg shadow-xl overflow-hidden aspect-video"
                />
              </TiltedCard>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary-100 rounded-full blur-2xl opacity-60 z-0"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary-100 rounded-full blur-2xl opacity-60 z-0"></div>
            </motion.div>
          </div>

          {/* <div className="mt-12 md:mt-16">
            <SearchBar variant="hero" />
          </div> */}

          {/* {blogTickerItems && blogTickerItems.length > 0 && (
            <div className="mt-14">
              <BlogSlider items={blogTickerItems} />
            </div>
          )} */}
        </div>

        {/* Announcement Scroller - Fixed at Bottom of Hero */}
        {announcementItems.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <AnnouncementScroller
              items={announcementItems}
              speed={25}
              className="rounded-none"
            />
          </div>
        )}
      </VenomBeam>

      {/* Country Flags Gallery Section */}
      {/* Global Education Opportunities Section - Commented out */}
      {/* <section className="py-20 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-7">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Global Education Opportunities
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-foreground-600 max-w-2xl mx-auto text-lg"
            >
              Explore world-class universities and programs across multiple
              countries
            </motion.p>
          </div>

          <div className="h-[500px] w-full">
            <DomeGallery
              images={countries
                .filter((country) => country.flagImageId)
                .map((country) => ({
                  src: getCloudinaryImageUrl(country.flagImageId!, "card"),
                  alt: country.name,
                }))}
              fit={0.6}
              minRadius={400}
              maxRadius={800}
              segments={30}
              grayscale={false}
              imageBorderRadius="16px"
              openedImageBorderRadius="20px"
              openedImageWidth="500px"
              openedImageHeight="350px"
              overlayBlurColor="rgba(255, 255, 255, 0.1)"
            />
          </div>
        </div>
      </section> */}

      {/* Global Exclusive Tie-up Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
        {/* Animated background lines */}
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-primary-300"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 px-2">
              Global Exclusive Tie-up With
            </h2>
            <p className="text-sm sm:text-base text-foreground-500 max-w-2xl mx-auto px-4">
              We have established exclusive partnerships with leading career
              providers across 24 countries worldwide
            </p>
          </div>

          <div className="relative max-w-7xl mx-auto">
            {/* Connecting lines SVG overlay - Full network mesh - Hidden on mobile for performance */}
            <svg
              className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              {/* Generate comprehensive network connections */}
              {(() => {
                const positions = [
                  { x: "8%", y: "12%" },
                  { x: "25%", y: "12%" },
                  { x: "41%", y: "12%" },
                  { x: "58%", y: "12%" },
                  { x: "75%", y: "12%" },
                  { x: "92%", y: "12%" },
                  { x: "8%", y: "35%" },
                  { x: "25%", y: "35%" },
                  { x: "41%", y: "35%" },
                  { x: "58%", y: "35%" },
                  { x: "75%", y: "35%" },
                  { x: "92%", y: "35%" },
                  { x: "8%", y: "58%" },
                  { x: "25%", y: "58%" },
                  { x: "41%", y: "58%" },
                  { x: "58%", y: "58%" },
                  { x: "75%", y: "58%" },
                  { x: "92%", y: "58%" },
                  { x: "8%", y: "81%" },
                  { x: "25%", y: "81%" },
                  { x: "41%", y: "81%" },
                  { x: "58%", y: "81%" },
                  { x: "75%", y: "81%" },
                  { x: "92%", y: "81%" },
                ];

                const lines: Array<{
                  x1: string;
                  y1: string;
                  x2: string;
                  y2: string;
                }> = [];
                // Connect each country to nearby countries (within 2 positions)
                positions.forEach((pos1, i) => {
                  positions.forEach((pos2, j) => {
                    if (i < j) {
                      const distance = Math.sqrt(
                        Math.pow(parseFloat(pos1.x) - parseFloat(pos2.x), 2) +
                        Math.pow(parseFloat(pos1.y) - parseFloat(pos2.y), 2)
                      );
                      // Only connect if distance is reasonable (not too far)
                      if (distance < 50) {
                        lines.push({
                          x1: pos1.x,
                          y1: pos1.y,
                          x2: pos2.x,
                          y2: pos2.y,
                        });
                      }
                    }
                  });
                });

                return lines.map((line, i) => (
                  <motion.line
                    key={i}
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke="url(#lineGradient)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.25 }}
                    transition={{ duration: 2, delay: i * 0.02 }}
                    viewport={{ once: true }}
                  />
                ));
              })()}

              {/* Animated particles moving along lines */}
              {[...Array(8)].map((_, i) => (
                <motion.circle
                  key={`particle-${i}`}
                  r="2"
                  fill="#3b82f6"
                  initial={{ cx: "8%", cy: "12%" }}
                  animate={{
                    cx: ["8%", "92%", "92%", "8%", "8%"],
                    cy: ["12%", "12%", "81%", "81%", "12%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    delay: i * 1.25,
                    ease: "linear",
                  }}
                  opacity={0.6}
                />
              ))}

              <defs>
                <linearGradient
                  id="lineGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.3" />
                </linearGradient>
                <radialGradient id="glowGradient">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            <div
              className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8 relative"
              style={{ zIndex: 1 }}
            >
              {[
                { name: "Australia", code: "au" },
                { name: "New Zealand", code: "nz" },
                { name: "USA", code: "us" },
                { name: "Canada", code: "ca" },
                { name: "Poland", code: "pl" },
                { name: "Spain", code: "es" },
                { name: "Germany", code: "de" },
                { name: "France", code: "fr" },
                { name: "Denmark", code: "dk" },
                { name: "Austria", code: "at" },
                { name: "Netherlands", code: "nl" },
                { name: "Malta", code: "mt" },
                { name: "Lithuania", code: "lt" },
                { name: "Belgium", code: "be" },
                { name: "Finland", code: "fi" },
                { name: "Hungary", code: "hu" },
                { name: "Italy", code: "it" },
                { name: "Russia", code: "ru" },
                { name: "Singapore", code: "sg" },
                { name: "Georgia", code: "ge" },
                { name: "Sweden", code: "se" },
                { name: "United Kingdom", code: "gb" },
                { name: "Ireland", code: "ie" },
                { name: "India", code: "in" },
              ].map((country, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  viewport={{ once: true }}
                  className="group flex flex-col items-center justify-center gap-2 sm:gap-3 cursor-pointer relative py-2"
                >
                  {/* Pulse ring effect - Hidden on very small screens */}
                  <motion.div
                    className="hidden sm:block absolute w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 border-primary-300"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.1,
                    }}
                  />

                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl transition-shadow duration-300 ring-1 sm:ring-2 ring-white"
                  >
                    <Image
                      src={`https://flagcdn.com/w160/${country.code}.png`}
                      alt={`${country.name} flag`}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                  <h3 className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-primary transition-colors duration-300 text-center px-1 leading-tight">
                    {country.name}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Placement Partners Section */}
      {placementCompanies.length > 0 && (
        <section className="py-16 bg-gradient-to-b from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Our Placement Partners
              </h2>
              <p className="text-foreground-600 max-w-2xl mx-auto">
                We partner with leading companies across industries to provide
                exceptional placement opportunities for our students.
              </p>
            </div>

            <AnimatedLogosCanopy
              data={placementCompanies.map((company) => ({
                name: company.name,
                logo: getCloudinaryUrl(company.logo, {
                  width: 300,
                  height: 200,
                  crop: "fit",
                }),
              }))}
              className="py-8"
              cardClassName="bg-transparent"
              repeat={4}
              noGrayscale={true}
              reverse={true}
            />
          </div>
        </section>
      )}

      {/* Partners Section */}
      <section className="py-16 bg-default-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our University Partners</h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">
              We collaborate with leading universities and institutions
              worldwide to provide you with the best opportunities.
            </p>
          </div>

          <AnimatedLogosCanopy
            data={[
              {
                name: "University Partner 4",
                logo: "/images/university-partners/123.png",
              },
              {
                name: "University Partner 4",
                logo: "/images/university-partners/4.png",
              },
              {
                name: "University Partner 5",
                logo: "/images/university-partners/5.png",
              },
              {
                name: "University Partner 6",
                logo: "/images/university-partners/6.png",
              },
              {
                name: "University Partner 7",
                logo: "/images/university-partners/7.png",
              },
              {
                name: "University Partner 8",
                logo: "/images/university-partners/8.png",
              },
              {
                name: "University Partner 9",
                logo: "/images/university-partners/9.png",
              },
              {
                name: "University Partner 10",
                logo: "/images/university-partners/10.png",
              },
              {
                name: "University Partner 11",
                logo: "/images/university-partners/11.png",
              },
              {
                name: "University Partner 12",
                logo: "/images/university-partners/12.png",
              },
              {
                name: "University Partner 13",
                logo: "/images/university-partners/13.png",
              },
              {
                name: "University Partner 14",
                logo: "/images/university-partners/14.png",
              },
              {
                name: "University Partner 16",
                logo: "/images/university-partners/16.png",
              },
              {
                name: "University Partner 17",
                logo: "/images/university-partners/17.png",
              },
              {
                name: "University Partner 18",
                logo: "/images/university-partners/18.png",
              },

              {
                name: "University Partner 20",
                logo: "/images/university-partners/20.png",
              },
              {
                name: "University Partner 21",
                logo: "/images/university-partners/21.png",
              },
              {
                name: "University Partner 22",
                logo: "/images/university-partners/22.png",
              },
              {
                name: "University Partner 23",
                logo: "/images/university-partners/23.png",
              },
              {
                name: "University Partner 24",
                logo: "/images/university-partners/24.png",
              },
              {
                name: "University Partner 25",
                logo: "/images/university-partners/25.png",
              },
              {
                name: "University Partner 26",
                logo: "/images/university-partners/26.png",
              },
              {
                name: "University Partner 27",
                logo: "/images/university-partners/27.png",
              },
              {
                name: "University Partner 28",
                logo: "/images/university-partners/28.png",
              },
              {
                name: "University Partner 29",
                logo: "/images/university-partners/29.png",
              },
              {
                name: "University Partner 30",
                logo: "/images/university-partners/30.png",
              },
              {
                name: "University Partner 31",
                logo: "/images/university-partners/31.png",
              },
              {
                name: "University Partner 32",
                logo: "/images/university-partners/32.png",
              },
              {
                name: "University Partner 19",
                logo: "/images/university-partners/19.png",
              },
              // {
              //   name: "University Partner 33",
              //   logo: "/images/university-partners/33.png",
              // },
              {
                name: "University Partner 34",
                logo: "/images/university-partners/34.png",
              },
              {
                name: "University Partner 35",
                logo: "/images/university-partners/35.png",
              },
              {
                name: "University Partner 36",
                logo: "/images/university-partners/36.png",
              },
              {
                name: "University Partner 37",
                logo: "/images/university-partners/37.png",
              },
              // {
              //   name: "University Partner 38",
              //   logo: "/images/university-partners/38.png",
              // },
              // // {
              // //   name: "University Partner 39",
              // //   logo: "/images/university-partners/39.png",
              // // },
              // // {
              // //   name: "University Partner 40",
              // //   logo: "/images/university-partners/40.png",
              // // },
              // // {
              // //   name: "University Partner 41",
              // //   logo: "/images/university-partners/41.png",
              // },
            ]}
            className="py-8"
            cardClassName="bg-transparent"
            repeat={2}
            noGrayscale={true}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-200 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Our Impacts
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-foreground-600 max-w-2xl mx-auto text-lg"
            >
              Trusted by thousands of students worldwide to achieve their career
              dreams
            </motion.p>
          </div>

          <StatsSection
            stats={statsData}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          />
        </div>
      </section>

      {/* Why Career Headquarters Section */}
      <ChromaGrid className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Why Choose Career HeadQuarters?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-foreground-600 max-w-3xl mx-auto text-lg"
            >
              Discover how Career HQ combines global insight, end-to-end
              support, and future-focused solutions to shape your career
              journey.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {[
              {
                icon: "lucide:globe-2",
                title: "Global Perspective, Personalized Approach",
                description:
                  "We provide tailored guidance aligned with each individual’s goals, strengths, and aspirations—ensuring every decision is informed and future-focused. Example: A student aspiring to study overseas receives personalized guidance to choose the right country, university, and course based on academic profile, budget, and long-term career goals.",
                gradient: "from-blue-500 to-cyan-500",
                color: "text-blue-500",
              },
              {
                icon: "lucide:award",
                title: "Proven Experience, Trusted Leadership",
                description:
                  "Led by founders with first-hand education and career experience, Career HQ offers transparent and reliable guidance grounded in real insight. Example: A student exploring higher education in India is guided toward top universities and specialized programs aligned with industry demand and career growth.",
                gradient: "from-purple-500 to-pink-500",
                color: "text-purple-500",
              },
              {
                icon: "lucide:target",
                title: "End-to-End Career Focus",
                description:
                  "We focus on outcomes that matter—bridging education with global career opportunities. Example: An international graduate receives structured support for overseas placements, including career mapping and guidance toward roles aligned with global industry standards.",
                gradient: "from-green-500 to-emerald-500",
                color: "text-green-500",
              },
              {
                icon: "lucide:briefcase",
                title: "Opportunities Without Borders",
                description:
                  "We help talent transition confidently into the workforce, both locally and globally. Example: A graduate is guided into a suitable placement within India, aligned with skills, industry preferences, and long-term career progression.",
                gradient: "from-orange-500 to-red-500",
                color: "text-orange-500",
              },
              {
                icon: "lucide:hand-heart",
                title: "A Partnership for the Future",
                description:
                  "At Career HQ, we support students beyond guidance by enabling access to financial solutions that make education possible. Example: A student secures an education loan through Career HQ’s assistance, helping finance tuition and living expenses with clarity and confidence.",
                gradient: "from-red-500 to-pink-500",
                color: "text-red-500",
              },
              {
                icon: "lucide:users-round",
                title: "Team HQ",
                description:
                  "A dedicated, collaborative team ensures a smooth and transparent client journey from consultation to final outcomes. Example: A student experiences a stress-free process where guidance, documentation, applications, and follow-ups are handled seamlessly by one unified team.",
                gradient: "from-indigo-500 to-blue-500",
                color: "text-indigo-500",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -12,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center text-center cursor-pointer p-6 rounded-3xl hover:bg-white/50 dark:hover:bg-gray-900/50 backdrop-blur-sm transition-all duration-300"
              >
                {/* Floating Icon with Glow Effect */}
                <motion.div
                  className="relative mb-6"
                  whileHover={{
                    scale: 1.15,
                    rotate: 360,
                    transition: { duration: 0.6, ease: "easeInOut" },
                  }}
                >
                  {/* Glow effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-full blur-2xl opacity-20 group-hover:opacity-60 transition-all duration-500 scale-150 group-hover:scale-[2]`}
                  />
                  {/* Icon container */}
                  <div
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-shadow duration-500`}
                  >
                    <Icon
                      icon={feature.icon}
                      className="w-10 h-10 text-white"
                    />
                  </div>

                  {/* Animated ring */}
                  <div
                    className={`absolute inset-0 rounded-full border-2 border-transparent group-hover:border-current ${feature.color} opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}
                  />
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="text-2xl font-bold mb-4 transition-all duration-300 group-hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                >
                  <span
                    className={`group-hover:bg-gradient-to-r group-hover:${feature.gradient} group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300`}
                  >
                    {feature.title}
                  </span>
                </motion.h3>
                <motion.p
                  className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-sm group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  {feature.description}
                </motion.p>

                {/* Decorative line */}
                <div className="mt-6 w-16 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:w-32 group-hover:via-primary-500 transition-all duration-500" />

                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </ChromaGrid>

      {/* Mission & Vision Section */}
      <section className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 right-10 w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Our Mission & Vision
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4 md:mb-6 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-foreground-600 max-w-3xl mx-auto text-base md:text-lg px-4"
            >
              Guiding principles that drive everything we do at Career Head
              Quarters
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto items-stretch">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative perspective-1000 flex"
            >
              <motion.div
                whileHover={{ scale: 1.02, rotateX: 5 }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Floating gradient orb */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-2xl"
                />

                <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 md:p-10 lg:p-12 rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)",
                    }}
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Number badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
                    viewport={{ once: true }}
                    className="inline-block mb-4 md:mb-6 text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-blue-500 to-cyan-500 bg-clip-text text-transparent opacity-20"
                  >
                    01
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                      className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                    >
                      Our Mission
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg flex-1"
                    >
                      At Career Head Quarters, our mission is to empower
                      individuals to realize their fullest potential and build
                      meaningful, sustainable career paths. We inspire growth,
                      enable informed choices, and create a future where every
                      person has the opportunity to thrive professionally with
                      global exposure.
                    </motion.p>
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="group relative perspective-1000 flex"
            >
              <motion.div
                whileHover={{ scale: 1.02, rotateX: 5 }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Floating gradient orb */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute -top-10 -left-10 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl"
                />

                <div className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 md:p-10 lg:p-12 rounded-2xl overflow-hidden h-full flex flex-col">
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.5), transparent)",
                    }}
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.5,
                    }}
                  />

                  {/* Number badge */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                    viewport={{ once: true }}
                    className="inline-block mb-4 md:mb-6 text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent opacity-20"
                  >
                    02
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                      className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
                    >
                      Our Vision
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1 }}
                      viewport={{ once: true }}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base lg:text-lg flex-1"
                    >
                      To become a trusted global gateway for education, careers,
                      and professional development—empowering students,
                      professionals, and organizations to learn, grow, and
                      succeed with future-ready skills across borders.
                    </motion.p>
                  </div>

                  {/* Decorative dots */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex gap-2">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3 + 0.5,
                        }}
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      {/* <section className="py-20  bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Our Services
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto text-lg">
              Discover your path to success, where worldwide careers meet at one
              dot .
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative bg-white dark:bg-gray-800 p-8 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                <Grid size={20} />
                <div className="relative z-20 mb-6 transform transition-transform group-hover:scale-110 duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-primary-100 dark:bg-primary-800/30 flex items-center justify-center">
                    <Icon
                      icon={service.icon}
                      className="h-6 w-6 text-primary-600 dark:text-primary-400"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-primary-900 dark:text-primary-100 relative z-20 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal relative z-20 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Core Values Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
            >
              Our Core Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-foreground-600 max-w-3xl mx-auto text-lg"
            >
              The principles that guide our approach and define our culture
            </motion.p>
          </div>

          <AppleCardsCarousel
            cards={[
              {
                title: "Empowerment",
                description:
                  "We uplift individuals to take control of their career journeys with clarity, confidence, and independence.",
                icon: "lucide:zap",
              },
              {
                title: "Integrity",
                description:
                  "We operate with honesty, transparency, and trust, ensuring ethical practices in every interaction.",
                icon: "lucide:shield",
              },
              {
                title: "Growth Mindset",
                description:
                  "We believe that learning never stops and encourage continuous personal and professional evolution.",
                icon: "lucide:trending-up",
              },
              {
                title: "Inclusivity",
                description:
                  "We create an environment where every individual is respected, valued, and given equal opportunity—without barriers.",
                icon: "lucide:users",
              },
              {
                title: "Innovation",
                description:
                  "We embrace new ideas, forward-thinking strategies, and transformative tools that drive meaningful career advancement.",
                icon: "lucide:lightbulb",
              },
              {
                title: "Impact",
                description:
                  "We define success by the positive and lasting difference we create in people's lives and career paths.",
                icon: "lucide:target",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Get In Touch with DOT Agent{" "}
              </h2>
              <p className="text-white/90 mb-6">
                One destination, countless opportunities – where worldwide
                careers meet at one dot .
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/career-test">
                  <Button
                    color="default"
                    variant="solid"
                    size="lg"
                    startContent={<Icon icon="lucide:calendar" />}
                    className="font-medium bg-white text-primary"
                  >
                    Register
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    variant="bordered"
                    size="lg"
                    className="font-medium text-white border-white"
                  >
                    Learn More About Us
                  </Button>{" "}
                </Link>
              </div>
            </div>
            <div className=" p-6">
              <EnquiryForm
                ref={enquiryRef}
                title="Get Started Today"
                subtitle="Fill out this form and our experts will get back to you within 24 hours."
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
              radial-gradient(circle 500px at 20% 80%, rgba(59,130,246,0.3), transparent),
              radial-gradient(circle 500px at 80% 20%, rgba(59,130,246,0.3), transparent)
            `,
            backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Success Stories</h2>
            <p className="text-foreground-500 max-w-2xl mx-auto">
              Hear from our students who have successfully achieved their career
              goals with our guidance.
            </p>
          </div>

          <AnimatedTestimonials
            data={testimonials}
            className="py-8"
            cardClassName="bg-white/90 dark:bg-gray-800/90 shadow-lg backdrop-blur-sm"
          />
        </div>
      </section>

      {/* Blog Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest from Our Blog</h2>
              <p className="text-foreground-500">
                Insights and guides for international students
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  excerpt={post.excerpt}
                  imageId={post.imageId}
                  date={post.date}
                  author={post.author}
                  category={post.category}
                  readTime={post.readTime || "5 min read"}
                />
              ))
            ) : (
              <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-center py-12">
                <p className="text-foreground-500 mb-4">
                  No blog posts available at the moment.
                </p>
              </div>
            )}
          </div>
          {blogPosts.length > 0 && (
            <div className="mt-10 text-center">
              <Link href="/blog">
                {" "}
                <Button
                  variant="flat"
                  color="primary"
                  endContent={<Icon icon="lucide:arrow-right" />}
                  className="mt-4 md:mt-0"
                >
                  View All Articles
                </Button>{" "}
              </Link>
            </div>
          )}
        </div>
      </section> */}
    </>
  );
}
