export interface NavItem {
  title: string;
  href: string;
  description?: string;
}

export const mainNavItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Products", href: "/product" },
  { title: "News", href: "/news" },
  { title: "Contact", href: "/contact" },
];

export const companyDetails = {
  name: "UNIBOX",
  tagline: "Innovative Maritime Logistics & Cold Chain Solutions",
  description:
    "Empowering fisheries and modern maritime supply chains with durable, thermal-insulated container technologies.",
  phone: "+62 812-3456-7890",
  email: "info@unibox.co.id",
  address: "Pelabuhan Perikanan Samudera, Jakarta, Indonesia",
};
