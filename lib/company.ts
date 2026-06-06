export const company = {
  name: "Finesse Technology Business Solutions, LLC",
  shortName: "FTBS",
  tagline: "Construction excellence. Technology-driven delivery.",
  description:
    "FTBS delivers construction project management and technology solutions for government agencies, developers, and institutional partners.",
  url: "https://ftbsllc.com",
  email: "info@ftbsllc.com",
  phone: "(954) 224-1283",
  address: {
    street: "2274 Salem Rd SE Ste 106",
    city: "Conyers",
    state: "GA",
    zip: "30013",
    country: "United States",
  },
  division: {
    name: "BGW Construction Company",
    focus:
      "Infrastructure development including roads, buildings, housing, and essential public works.",
  },
} as const;

export const formattedAddress = `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}`;
