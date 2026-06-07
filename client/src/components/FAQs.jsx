import React from 'react';

const faqSections = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is CareerHive?",
        answer: "CareerHive connects job seekers with employers and gives recruiters a focused workspace for companies, job posts, and applicants.",
      },
      {
        question: "Is CareerHive free to use?",
        answer: "CareerHive is free for job seekers. Recruiter workflows are available for company hiring teams.",
      },
      {
        question: "How do I get started?",
        answer: "Create an account, complete your profile, browse roles, save jobs that interest you, and apply when you are ready.",
      },
    ],
  },
  {
    title: "Profile & Applications",
    items: [
      {
        question: "What should I include in my profile?",
        answer: "Add a clear bio, contact details, skills, and an updated resume so recruiters can quickly understand your fit.",
      },
      {
        question: "How do I track applications?",
        answer: "Applied roles appear in your profile with status updates such as pending, accepted, or rejected.",
      },
      {
        question: "How do saved jobs work?",
        answer: "Use Save For Later on any listing to build a personal shortlist that you can revisit from Saved Jobs.",
      },
    ],
  },
];

const FAQs = () => {
  return (
    <section className="py-16">
      <div className="page-shell max-w-5xl">
        <div className="mb-10 text-center">
          <p className="section-eyebrow">Support</p>
          <h2 className="section-title mt-2">Frequently asked questions</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqSections.map((section) => (
            <div key={section.title} className="professional-card p-6">
              <h3 className="text-xl font-bold text-slate-950">{section.title}</h3>
              <div className="mt-5 space-y-5">
                {section.items.map((item) => (
                  <div key={item.question} className="border-b border-slate-200 pb-5 last:border-0 last:pb-0">
                    <h4 className="font-semibold text-slate-950">{item.question}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
