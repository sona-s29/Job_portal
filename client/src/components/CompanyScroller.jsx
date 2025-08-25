import { motion } from "framer-motion";


export const companies = [
    { name: "Google", logo: "https://imgs.search.brave.com/j5FNhYRZkpcRlamgbXdPpPszJOrLUKGtgQMdE1q-Grg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjIv/NDg0LzUwOS9zbWFs/bC9nb29nbGUtbGVu/cy1pY29uLWxvZ28t/c3ltYm9sLWZyZWUt/cG5nLnBuZw" },
    { name: "Microsoft", logo: "https://imgs.search.brave.com/7kQl-fYyD62bSqjZWfSAWYXjTVpQclavS-GqGcKvbjs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjAv/MDkvTWljcm9zb2Z0/LVN5bWJvbC03MDB4/Mzk0LnBuZw" },
    { name: "Amazon", logo: "https://imgs.search.brave.com/cSGw_fGTMAWpTLl0Hxxd-bs68RaucqEzdr3eGo6lWnA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9hbWF6/b24tbG9nby1lZGl0/b3JpYWwtaWxsdXN0/cmF0aXZlLXdoaXRl/LWJhY2tncm91bmQt/ZXBzLWRvd25sb2Fk/LXZlY3Rvci1qcGVn/LWJhbm5lci1haS1h/bWF6b24tbG9nby1l/ZGl0b3JpYWwtaWxs/dXN0cmF0aXZlLTIw/ODMyOTEwNy5qcGc" },
    { name: "Netflix", logo: "https://imgs.search.brave.com/lPlgd2xkgzqxivxTcOUN9Ph6xjIGD0TbPBr5GMMe4lw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/bG9nb2pveS5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjMx/MDMxMTU0NjAyLzIw/MTYtbmV0ZmxpeC1s/b2dvLTYwMHgzMTku/cG5n" },
    { name: "Meta", logo: "https://imgs.search.brave.com/r6XS7Vs9YOYc7ePMhwuHlcXr6y6FMNTvsOu9KV5Q09U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2RhLzhj/LzY4L2RhOGM2ODY2/ZWYyZThlNGIyYWNj/YTFlMzYzMjI1NjRj/LmpwZw" },
     { name: "Oracle", logo:"https://imgs.search.brave.com/vGGqlfqEtyx1YgHjb8MKaw2o9zO3OUU1e3MTRIMfzMI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTUvT3Jh/Y2xlLUxvZ28tUE5H/LUltYWdlLnBuZw"},
   { name: "Adobe", logo: "https://imgs.search.brave.com/szwVYyj9nIXppAwe7H1Zy1A6DC2hAI6AaL4AIHcvVSA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE2LzEw/L0Fkb2JlLUxvZ28t/MTk5My01MDB4MzQ0/LmpwZw"},
]

export default function CompanyScroller(){
    return (
        <div className="w-full max-w-7xl mx-auto my-8">
            <h2 className="text-white text-center text-5xl font-bold mb-6">Top Companies</h2>
            <div className="flex flex-col gap-4">
                {/* First scroller from right to left */}
                <div className="overflow-hidden whitespace-nowrap bg-slate-900/50 py-6 rounded-2xl shadow-xl w-1/2 mx-auto">
                    <motion.div
                        className="flex gap-12"
                        animate={{ x: ["100%", "-100%"] }}
                        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    >
                        {[...companies, ...companies].map((company, index) => (
                            <div key={index} className="flex items-center gap-3 min-w-max">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="h-12 w-auto object-contain rounded-full shadow-lg"
                                />
                                <span className="text-lg font-semibold text-gray-300">{company.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
                {/* Second scroller from left to right */}
                <div className="overflow-hidden whitespace-nowrap bg-slate-900/50 py-6 rounded-2xl shadow-xl w-1/2 mx-auto">
                    <motion.div
                        className="flex gap-12"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ repeat: Infinity, duration:20, ease: "linear"}}
                    >
                        {[...companies, ...companies].map((company, index) => (
                            <div key={index} className="flex items-center gap-3 min-w-max">
                                <img
                                    src={company.logo}
                                    alt={company.name}
                                    className="h-12 w-auto object-contain rounded-full shadow-lg"
                                />
                                <span className="text-lg font-semibold text-gray-300">{company.name}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}



