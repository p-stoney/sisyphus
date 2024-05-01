import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Users
  // const users = await prisma.user.createMany({
  //   data: [
  //     {
  //       email: "preston.stoney@gmail.com",
  //       emailVerified: new Date(),
  //       role: "admin",
  //     },
  //     {
  //       email: "stoney.preston@gmail.com",
  //       emailVerified: new Date(),
  //       role: "user",
  //     },
  //     { email: "user2@example.com", emailVerified: new Date(), role: "user" },
  //   ],
  // });

  // Business
  // const business = await prisma.business.create({
  //   data: {
  //     name: "Demo Business",
  //     userId: "clvl5kbaz0000jnm64evkei0q",
  //   },
  // });

  // Distributors
  // const distributors = await prisma.distributor.createMany({
  //   data: [
  //     {
  //       name: "Distributor A",
  //       email: "contact@distributora.com",
  //       address: "1234 Market St",
  //       city: "San Francisco",
  //       state: "CA",
  //       postalCode: "94103",
  //       paymentTerms: 14,
  //     },
  //     {
  //       name: "Distributor B",
  //       email: "contact@distributorb.com",
  //       address: "5678 Trade St",
  //       city: "New York",
  //       state: "NY",
  //       postalCode: "10001",
  //       paymentTerms: 30,
  //     },
  //     {
  //       name: "Distributor C",
  //       email: "contact@distributorc.com",
  //       address: "91011 Export Ave",
  //       city: "Chicago",
  //       state: "IL",
  //       postalCode: "60601",
  //       paymentTerms: 45,
  //     },
  //     {
  //       name: "Distributor D",
  //       email: "contact@distributord.com",
  //       address: "1213 Import Dr",
  //       city: "Seattle",
  //       state: "WA",
  //       postalCode: "98101",
  //       paymentTerms: 60,
  //     },
  //   ],
  // });

  // Products
  // const products = await prisma.product.createMany({
  //   data: [
  //     {
  //       name: "Product 1",
  //       price: new Prisma.Decimal("9.50"),
  //       distributorId: "clvl5vp5f0002bvsyldxzz6pn",
  //     },
  //     {
  //       name: "Product 2",
  //       price: new Prisma.Decimal("4.00"),
  //       distributorId: "clvl5vp5f0002bvsyldxzz6pn",
  //     },
  //     {
  //       name: "Product 3",
  //       price: new Prisma.Decimal("12.25"),
  //       distributorId: "clvl5vp5f0003bvsybeqanmqn",
  //     },
  //     {
  //       name: "Product 4",
  //       price: new Prisma.Decimal("15.00"),
  //       distributorId: "clvl5vp5f0003bvsybeqanmqn",
  //     },
  //     {
  //       name: "Product 5",
  //       price: new Prisma.Decimal("17.75"),
  //       distributorId: "clvl5vp5f0004bvsyij41x57q",
  //     },
  //     {
  //       name: "Product 6",
  //       price: new Prisma.Decimal("25.00"),
  //       distributorId: "clvl5vp5f0004bvsyij41x57q",
  //     },
  //     {
  //       name: "Product 7",
  //       price: new Prisma.Decimal("7.75"),
  //       distributorId: "clvl5vp5f0005bvsyo416umbg",
  //     },
  //     {
  //       name: "Product 8",
  //       price: new Prisma.Decimal("20.00"),
  //       distributorId: "clvl5vp5f0005bvsyo416umbg",
  //     },
  //     {
  //       name: "Product 9",
  //       price: new Prisma.Decimal("19.50"),
  //       distributorId: "clvl5vp5f0005bvsyo416umbg",
  //     },
  //   ],
  // });

  // const invoices = await prisma.invoice.createMany({
  //   data: [
  //     {
  //       dueBy: new Date("2023-05-30"),
  //       status: "UNPAID",
  //       businessId: "clvl5vp520001bvsy5nyaqixl",
  //       distributorId: "clvl5vp5f0002bvsyldxzz6pn",
  //     },
  //     {
  //       dueBy: new Date("2023-06-15"),
  //       status: "PAID",
  //       businessId: "clvl5vp520001bvsy5nyaqixl",
  //       distributorId: "clvl5vp5f0003bvsybeqanmqn",
  //     },
  //     {
  //       dueBy: new Date("2023-07-01"),
  //       status: "UNPAID",
  //       businessId: "clvl5vp520001bvsy5nyaqixl",
  //       distributorId: "clvl5vp5f0003bvsybeqanmqn",
  //     },
  //     {
  //       dueBy: new Date("2023-07-18"),
  //       status: "PAID",
  //       businessId: "clvl5vp520001bvsy5nyaqixl",
  //       distributorId: "clvl5vp5f0004bvsyij41x57q",
  //     },
  //     {
  //       dueBy: new Date("2023-08-05"),
  //       status: "PAID",
  //       businessId: "clvl5vp520001bvsy5nyaqixl",
  //       distributorId: "clvl5vp5f0004bvsyij41x57q",
  //     },
  //     {
  //       dueBy: new Date("2023-08-20"),
  //       status: "UNPAID",
  //       businessId: "clvl5vp520001bvsy5nyaqixl",
  //       distributorId: "clvl5vp5f0005bvsyo416umbg",
  //     },
  //     {
  //       dueBy: new Date("2023-09-10"),
  //       status: "PAID",
  //       businessId: "clvl5vp520001bvsy5nyaqixl",
  //       distributorId: "clvl5vp5f0005bvsyo416umbg",
  //     },
  //   ],
  // });

  // Invoice Items
  const invoiceItems = await prisma.invoiceItem.createMany({
    data: [
      {
        invoiceId: "clvl65zrp0009ob8gfbkmjxr6",
        productId: "clvl6118q0004i91t45lg9tpy",
        name: "Product 1",
        price: new Prisma.Decimal("9.50"),
        quantity: 10,
      },
      {
        invoiceId: "clvl65zrp0009ob8gfbkmjxr6",
        productId: "clvl6118q0005i91twz5o3onm",
        name: "Product 2",
        price: new Prisma.Decimal("4.00"),
        quantity: 5,
      },
      {
        invoiceId: "clvl65zrp000aob8gfxmkgtfr",
        productId: "clvl6118q0006i91t2fquegeo",
        name: "Product 3",
        price: new Prisma.Decimal("12.25"),
        quantity: 7,
      },
      {
        invoiceId: "clvl65zrp000aob8gfxmkgtfr",
        productId: "clvl6118q0007i91tr5vtv21b",
        name: "Product 4",
        price: new Prisma.Decimal("15.00"),
        quantity: 3,
      },
      {
        invoiceId: "clvl65zrp000bob8gz2gqb2ic",
        productId: "clvl6118q0006i91t2fquegeo",
        name: "Product 3",
        price: new Prisma.Decimal("12.25"),
        quantity: 2,
      },
      {
        invoiceId: "clvl65zrp000cob8gnwg58dmx",
        productId: "clvl6118q0008i91ts6xr01xj",
        name: "Product 5",
        price: new Prisma.Decimal("17.75"),
        quantity: 1,
      },
      {
        invoiceId: "clvl65zrp000cob8gnwg58dmx",
        productId: "clvl6118q0009i91tao9w646i",
        name: "Product 6",
        price: new Prisma.Decimal("25.00"),
        quantity: 4,
      },
      {
        invoiceId: "clvl65zrp000dob8g9k2tv7lk",
        productId: "clvl6118q0009i91tao9w646i",
        name: "Product 6",
        price: new Prisma.Decimal("25.00"),
        quantity: 6,
      },
      {
        invoiceId: "clvl65zrq000eob8ghvy21fpt",
        productId: "clvl6118q000bi91tvgm10lj9",
        name: "Product 8",
        price: new Prisma.Decimal("20.00"),
        quantity: 5,
      },
      {
        invoiceId: "clvl65zrq000eob8ghvy21fpt",
        productId: "clvl6118q000ai91tjnxasgz7",
        name: "Product 7",
        price: new Prisma.Decimal("7.75"),
        quantity: 3,
      },
      {
        invoiceId: "clvl65zrq000fob8guy3uujkx",
        productId: "clvl6118q000ci91t5cn2avks",
        name: "Product 9",
        price: new Prisma.Decimal("19.50"),
        quantity: 7,
      },
    ],
  });

  console.log({
    // users,
    // business,
    // distributors,
    // products,
    // invoices,
    invoiceItems,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
