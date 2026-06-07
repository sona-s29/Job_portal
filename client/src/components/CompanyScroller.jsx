const companies = [
    { name: "Google", domain: "google.com" },
    { name: "Microsoft", domain: "microsoft.com" },
    { name: "Amazon", domain: "amazon.com" },
    { name: "Netflix", domain: "netflix.com" },
    { name: "Meta", domain: "meta.com" },
    { name: "Oracle", domain: "oracle.com" },
    { name: "Adobe", domain: "adobe.com" },
    { name: "Spotify", domain: "spotify.com" },
    { name: "Stripe", domain: "stripe.com" },
    { name: "Atlassian", domain: "atlassian.com" },
]

const logoFor = (domain) => `https://logo.clearbit.com/${domain}`;

const LogoRow = ({ reverse = false }) => (
    <div className="overflow-hidden whitespace-nowrap py-4">
        <div className={`flex w-max gap-6 px-6 ${reverse ? "marquee-right" : "marquee-left"}`}>
            {[...companies, ...companies].map((company, index) => (
                <div key={`${company.name}-${index}`} className="flex min-w-52 items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                    <img
                        src={logoFor(company.domain)}
                        alt={`${company.name} logo`}
                        loading="lazy"
                        className="h-12 w-12 rounded-lg bg-white object-contain p-1"
                    />
                    <span className="font-semibold text-brand-text">{company.name}</span>
                </div>
            ))}
        </div>
    </div>
)

export default function CompanyScroller() {
    return (
        <section className="border-y border-slate-200 bg-white py-16">
            <div className="page-shell">
                <div className="mb-8 text-center">
                    <p className="section-eyebrow">Hiring partners</p>
                    <h2 className="section-title mt-2">Trusted by Leading Companies</h2>
                </div>
            </div>
            <div className="space-y-2">
                <LogoRow />
                <LogoRow reverse />
            </div>
        </section>
    );
}
