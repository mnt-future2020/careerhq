"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { ChromaGrid } from "@/components/ui/chroma-grid";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { BlurText } from "@/components/ui/blur-text";
import { Grid } from "@/components/ui/feature-section";
import { PartnerApplicationModal } from "@/components/partner-application-modal";

export default function PartnerWithUsPage() {
  const [isApplicationModalOpen, setIsApplicationModalOpen] = React.useState(false);

  const handleDownloadPDF = () => {
    // Create a link element and trigger download
    const link = document.createElement('a');
    link.href = '/Career-HQ-Referral-Partner-Agreement.pdf';
    link.download = 'Career-HQ-Referral-Partner-Agreement.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToFAQ = () => {
    const faqSection = document.getElementById('faq-section');
    if (faqSection) {
      faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const faqs = [
    {
      question: "Who can become a Career HQ referral partner?",
      answer:
        "Any business or professional working with students, job seekers, or corporates can apply, subject to review. This includes education consultancies, recruitment agencies, training institutes, career advisors, and corporate HR partners.",
    },
    {
      question: "Is there any cost to become a partner?",
      answer:
        "No. There is no registration or onboarding fee. Partnership with Career HQ is completely free to join.",
    },
    {
      question: "Do you guarantee approvals, jobs, or visas?",
      answer:
        "No. Career HQ follows a strict no-guarantee, no-false-promises policy. We provide professional services and support, but we do not guarantee approvals, job placements, or visa outcomes as these depend on multiple factors beyond our control.",
    },
    {
      question: "How is commission calculated?",
      answer:
        "Commission is based on successful cases and agreed milestones. The specific commission structure and rates are shared with approved partners after the partnership agreement is signed. Commission varies by service type and case complexity.",
    },
    {
      question: "When is commission paid?",
      answer:
        "Commission is paid after service completion and receipt of payment from the client. Payment timelines are typically 15-30 days after the client payment is received, as specified in the partner agreement.",
    },
    {
      question: "Can I use Career HQ branding?",
      answer:
        "Only with prior written approval. Partners must request permission before using Career HQ logos, branding materials, or representing themselves as official Career HQ representatives. Unauthorized use of branding is prohibited.",
    },
    {
      question: "Is an agreement mandatory?",
      answer:
        "Yes. Approved partners must sign a Referral Partner Agreement & NDA (Non-Disclosure Agreement) before they can start referring clients. This protects both parties and ensures clear terms of engagement.",
    },
    {
      question: "Can the partnership be terminated?",
      answer:
        "Yes. Either party may terminate the partnership with written notice as per the terms specified in the agreement. Career HQ reserves the right to terminate immediately in cases of breach, misconduct, or unethical practices.",
    },
    {
      question: "What services can I refer clients for?",
      answer:
        "Partners can refer clients for Study Abroad, Study India, Job/Professional Placement, Career Services, and Corporate Hiring. You can choose to refer for one or multiple service categories based on your expertise and client base.",
    },
    {
      question: "How long does the approval process take?",
      answer:
        "The review process typically takes 3-5 business days after application submission. We evaluate each application carefully to ensure alignment with our values and partnership criteria.",
    },
    {
      question: "What happens if my application is rejected?",
      answer:
        "If your application doesn't meet our current partnership criteria, we'll notify you via email. You may reapply after 6 months if your business circumstances change or if you can better demonstrate alignment with our requirements.",
    },
    {
      question: "Do I need to be exclusive to Career HQ?",
      answer:
        "No, we don't require exclusivity. However, we expect partners to maintain ethical standards and not misrepresent our services or make false promises to clients.",
    },
    {
      question: "What support do partners receive?",
      answer:
        "Approved partners receive dedicated support including a partner success manager, marketing materials (with approval), training on our services, regular updates, and access to a partner portal for tracking referrals.",
    },
    {
      question: "How do I submit referrals?",
      answer:
        "Approved partners receive access to our partner portal where they can submit client referrals through a secure online form. All referrals must include genuine client information and consent.",
    },
    {
      question: "What information is considered confidential?",
      answer:
        "Confidential information includes client data, business strategies, pricing, commission structures, internal processes, marketing materials, and any proprietary information shared during the partnership. All partners must sign an NDA.",
    },
  ];

  const benefits = [
    {
      title: "Trusted Global Brand",
      description:
        "Partner with a recognized career & education brand with proven track record across multiple markets.",
      icon: "lucide:award",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Transparent Commission Structure",
      description:
        "Clear, fair, and competitive commission models with no hidden terms or conditions.",
      icon: "lucide:trending-up",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Dedicated Partner Support",
      description:
        "Access to a dedicated partner success team to help you maximize referrals and earnings.",
      icon: "lucide:headphones",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      title: "Ethical Approach",
      description:
        "No false promises, no guarantees. We believe in honest, transparent, and ethical business practices.",
      icon: "lucide:shield-check",
      gradient: "from-orange-500 to-red-500",
    },
    {
      title: "Long-term Partnership Focus",
      description:
        "We're not looking for quick wins. We build sustainable, mutually beneficial long-term relationships.",
      icon: "lucide:handshake",
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      title: "Multiple Revenue Streams",
      description:
        "Refer across study abroad, study India, placements, and career services for diversified income.",
      icon: "lucide:layers",
      gradient: "from-red-500 to-pink-500",
    },
  ];

  const partnerTypes = [
    {
      title: "Education & Study Abroad Consultancies",
      description:
        "Expand your service portfolio by partnering with us for comprehensive career and placement support.",
      icon: "lucide:graduation-cap",
    },
    {
      title: "Recruitment & Staffing Agencies",
      description:
        "Collaborate to place skilled professionals and access our talent pool for your client requirements.",
      icon: "lucide:briefcase",
    },
    {
      title: "Training & Upskilling Institutes",
      description:
        "Help your trained candidates find the right opportunities through our placement and career services.",
      icon: "lucide:book-open",
    },
    {
      title: "Career Advisors & Independent Consultants",
      description:
        "Monetize your network by referring clients for study abroad, placements, and career guidance.",
      icon: "lucide:user-check",
    },
    {
      title: "Corporate HR / Placement Partners",
      description:
        "Access quality talent and refer employees for upskilling, international opportunities, and career growth.",
      icon: "lucide:building",
    },
    {
      title: "College Internship, Educational Projects & Loan",
      description:
        "Partner with us to provide internship opportunities, collaborate on educational initiatives, and offer financial solutions including education loans to help students achieve their academic and career goals.",
      icon: "lucide:users",
    },
  ];

  const referralServices = [
    { name: "Study Abroad aspirants", icon: "lucide:plane-takeoff" },
    { name: "Working professionals seeking career growth", icon: "lucide:trending-up" },
    { name: "Job seekers & skilled professionals", icon: "lucide:briefcase" },
    { name: "Corporate & bulk hiring requirements", icon: "lucide:users" },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 lg:pt-40 pb-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden">
        <Grid />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BlurText
                text="Partner with Career HQ"
                className="text-4xl md:text-5xl font-bold mb-6"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl text-foreground-600 mb-8"
            >
              Build trusted career pathways together. Partner with an ethical,
              growth-focused brand to deliver career, education, and global
              opportunity solutions.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Button
                onPress={() => setIsApplicationModalOpen(true)}
                color="primary"
                size="lg"
                startContent={<Icon icon="lucide:file-text" />}
              >
                Apply Now
              </Button>
              <Button
                onPress={scrollToFAQ}
                variant="bordered"
                color="primary"
                size="lg"
                startContent={<Icon icon="lucide:help-circle" />}
              >
                Partner FAQs
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Partner with Career HQ?
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto text-lg">
              We bring trust, transparency, and long-term value to every
              partnership
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative flex flex-col items-center text-center cursor-pointer p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-200 via-secondary-200 to-primary-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
                
                <motion.div
                  className="relative mb-6"
                  whileHover={{
                    scale: 1.15,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 scale-150`}
                  />
                  <div
                    className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${benefit.gradient} flex items-center justify-center shadow-lg`}
                  >
                    <Icon icon={benefit.icon} className="w-10 h-10 text-white" />
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="text-xl font-bold mb-3"
                >
                  {benefit.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-foreground-600 leading-relaxed"
                >
                  {benefit.description}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Partner Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Who Can Partner With Us
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto text-lg">
              We welcome partnerships with ethical, growth-focused businesses
              and professionals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {partnerTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  transition: { duration: 0.3 } 
                }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-default-200 hover:shadow-2xl transition-all duration-300 hover:border-primary-300">
                  <CardBody className="p-6">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mb-4"
                      whileHover={{ 
                        rotate: 360,
                        scale: 1.1,
                        transition: { duration: 0.6 }
                      }}
                    >
                      <Icon
                        icon={type.icon}
                        className="text-primary text-2xl"
                      />
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2">
                      {type.title}
                    </h3>
                    <p className="text-foreground-600 text-sm">
                      {type.description}
                    </p>
                  </CardBody>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Refer Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What You Can Refer
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              Multiple service categories to maximize your referral potential
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {referralServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ 
                  scale: 1.1, 
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 px-6 py-4 bg-white rounded-full border-2 border-primary-200 hover:border-primary-400 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon icon={service.icon} className="text-primary text-xl" />
                </motion.div>
                <span className="font-semibold text-foreground-700">
                  {service.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Partnership Works */}
      <ChromaGrid className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How the Partnership Works
            </h2>
            <p className="text-foreground-600 max-w-2xl mx-auto">
              A simple, transparent process from application to earning
              commissions
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Submit the Partner Application Form",
                  description:
                    "Complete our online application with your business details and partnership interests.",
                },
                {
                  step: "02",
                  title: "Our team reviews your profile",
                  description:
                    "We evaluate your application based on alignment with our values and partnership criteria.",
                },
                {
                  step: "03",
                  title: "Agreement & NDA signing",
                  description:
                    "Approved partners sign our Referral Partner Agreement and Non-Disclosure Agreement.",
                },
                {
                  step: "04",
                  title: "Start referring qualified clients",
                  description:
                    "Begin submitting genuine client referrals through our approved channels.",
                },
                {
                  step: "05",
                  title: "Earn commissions on successful cases",
                  description:
                    "Receive commission payments after service completion and client payment receipt.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-foreground-600">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </ChromaGrid>

      {/* Important Notice */}
      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50 border-y border-amber-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-start gap-4 bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-300"
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Icon
                  icon="lucide:alert-circle"
                  className="text-amber-600 text-3xl flex-shrink-0 mt-1"
                />
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">
                  Important Notice
                </h3>
                <p className="text-amber-800 mb-2">
                  Submitting the partner application form does not guarantee
                  partnership approval. All applications are subject to review
                  and evaluation.
                </p>
                <p className="text-amber-800">
                  Career HQ follows a strict no-guarantee, no-false-promises
                  policy. We do not guarantee approvals, jobs, or visas.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ & Application Form Section */}
      <section id="faq-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-foreground-600 text-lg">
                Find answers to common questions about partnering with Career HQ
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Accordion
                variant="splitted"
                selectionMode="multiple"
                className="gap-4"
              >
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    aria-label={faq.question}
                    title={
                      <span className="font-semibold text-lg">
                        {faq.question}
                      </span>
                    }
                    className="bg-white border border-default-200 rounded-lg px-6 py-2 hover:shadow-md transition-shadow"
                    indicator={({ isOpen }) => (
                      <Icon
                        icon={
                          isOpen
                            ? "lucide:chevron-up"
                            : "lucide:chevron-down"
                        }
                        className="text-2xl text-primary"
                      />
                    )}
                  >
                    <div className="pb-4 text-foreground-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Still Have Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border border-primary-200 rounded-2xl p-8 text-center">
                <Icon
                  icon="lucide:message-circle"
                  className="text-primary text-4xl mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-foreground-600 mb-6">
                  Can't find the answer you're looking for? Our team is here to help.
                </p>
                <Button
                  as={Link}
                  href="/contact"
                  color="primary"
                  size="lg"
                  startContent={<Icon icon="lucide:mail" />}
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-gradient-to-r from-primary-500 to-secondary-500 text-white overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Apply to Become a Partner
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-white/90 mb-8 text-lg"
            >
              Join our network of trusted partners and start building long-term
              value together
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onPress={() => setIsApplicationModalOpen(true)}
                  size="lg"
                  className="bg-white text-primary-600 hover:bg-gray-100 font-semibold"
                  startContent={<Icon icon="lucide:file-text" />}
                >
                  Apply Now – Partner Application
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onPress={handleDownloadPDF}
                  variant="bordered"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  startContent={<Icon icon="lucide:download" />}
                >
                  Download Partner Agreement
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onPress={scrollToFAQ}
                  variant="bordered"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  startContent={<Icon icon="lucide:help-circle" />}
                >
                  View FAQs
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partner Application Modal */}
      <PartnerApplicationModal
        isOpen={isApplicationModalOpen}
        onClose={() => setIsApplicationModalOpen(false)}
      />
    </>
  );
}
