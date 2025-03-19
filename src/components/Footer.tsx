import { Instagram, Twitter, Facebook, MessageCircle } from "lucide-react";
import Link from "next/link";

function Footer() {
    const aboutMenu = [
        {
            title: "About Us",
            link: "/about",
        },
        {
            title: "Blog",
            link: "/blog",
        },
        {
            title: "Career",
            link: "/career",
        },
    ];
    const supportMenu = [
        {  
            title: "Contact Us",
            link: "/contact",
        },
        {
            title: "Help Center",
            link: "/help",
        },
        {
            title: "FAQs",
            link: "/faqs",
        },
    ]
	return (
		<footer className="bg-gray-100 text-gray-600">
			<div className="container mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					<div className="space-y-4">
						<Link
							href="/"
							className="text-2xl font-bold text-gray-900 flex items-center"
						>
							Horizone
						</Link>
						<p className="text-sm">
                        Smarter stays made simple — AI-driven hotel booking for effortless travel planning.
						</p>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">About</h3>
						<ul className="space-y-2">
                            {
                                aboutMenu.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link
                                                href={item.link}
                                                className="hover:text-gray-900 transition-colors"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">Support</h3>
						<ul className="space-y-2">
							{
                                supportMenu.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Link
                                                href={item.link}
                                                className="hover:text-gray-900 transition-colors"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    );
                                })
                            }
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-gray-900">Get Updates</h3>
						<form className="flex gap-2">
							<input
								type="email"
								className="flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-white border-gray-300 text-gray-900 placeholder:text-gray-400"
								placeholder="Enter your email"
                                required
							/>
							<button
								className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
								type="submit"
							>
								Subscribe
							</button>
						</form>
						<div className="flex gap-2 lg:gap-4">
							<Link
								href="https://instagram.com"
                                target="_blank"
								className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
							>
								<Instagram size={20} />
							</Link>
							<Link
								href="https://twitter.com"
                                target="_blank"
								className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
							>
								<Twitter size={20} />
								<span className="sr-only">Twitter</span>
							</Link>
							<Link
								href="https://facebook.com"
                                target="_blank"
								className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
							>
								<Facebook size={20} />
								<span className="sr-only">Facebook</span>
							</Link>
							<Link
								href="https://discord.com"
                                target="_blank"
								className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition-colors"
							>
								<MessageCircle size={20} />
								<span className="sr-only">Discord</span>
							</Link>
						</div>
					</div>
				</div>
				<div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-gray-200">
					<p className="text-sm">
						©{new Date().getFullYear()} Horizone. All rights reserved.
					</p>
					<div className="flex gap-4 mt-4 md:mt-0">
						<Link
							href="/privacy"
							className="text-sm hover:text-gray-900 transition-colors"
						>
							Privacy Policy
						</Link>
						<Link
							href="/terms"
							className="text-sm hover:text-gray-900 transition-colors"
						>
							Terms of Service
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;