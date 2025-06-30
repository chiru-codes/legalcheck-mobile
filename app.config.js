import 'dotenv/config';

export default {
    expo: {
        name: "LegalCheck",
        slug: "legalcheck",
        extra: {
            API_URL: process.env.API_URL,
        },
    },
};
