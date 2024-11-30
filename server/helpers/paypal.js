const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID || 'AWhnZGKPdq8IbAV3dmSWwERit8RCJTv6vYkkw6s8S1Ir2W4VyEhq8LUpLdj1v0Dr0sqA1QWsbAf17Or7',
  client_secret: process.env.PAYPAL_SECRET_ID || 'EFKoq1AcqkEbpvDFTq1IfhOVURNB30QXZZrvt7nQ2broy-HNSxQHRQE9_BDVt0wXaonNWUEd1A99umN2',
});

module.exports = paypal;
