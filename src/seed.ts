import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import { Brand } from "./models/brand.model";

dotenv.config();

async function main() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGODB_URI is not defined in .env");
            process.exit(1);
        }
        await mongoose.connect(uri);
        console.log("Connected to MongoDB for Seeding");

        const currentYear = new Date().getFullYear();

        const seedData = [
            {
                brandName: faker.company.name(),
                yearFounded: faker.number.int({ min: 1980, max: 2010 }),
                headquarters: `${faker.location.city()}, ${faker.location.country()}`,
                numberOfLocations: faker.number.int({ min: 10, max: 500 }),
            },
            {
                brandName: faker.company.name() + " Historic",
                yearFounded: 1600,
                headquarters: `${faker.location.city()}, ${faker.location.country()}`,
                numberOfLocations: faker.number.int({ min: 5, max: 50 }),
            },
            {
                brandName: faker.company.name() + " Startup",
                yearFounded: currentYear,
                headquarters: `${faker.location.city()}, ${faker.location.country()}`,
                numberOfLocations: faker.number.int({ min: 1, max: 3 }),
            },
            {
                brandName: faker.company.name() + " Local",
                yearFounded: faker.number.int({
                    min: 1990,
                    max: currentYear - 1,
                }),
                headquarters: `${faker.location.city()}, ${faker.location.country()}`,
                numberOfLocations: 1,
            },
            {
                brandName: faker.company.name() + " Global",
                yearFounded: faker.number.int({ min: 1900, max: 2000 }),
                headquarters: `${faker.location.city()}, ${faker.location.country()}`,
                numberOfLocations: faker.number.int({
                    min: 50000,
                    max: 100000,
                }),
            },
            {
                brandName:
                    "The Super Extremely Long Company Name That Might Be A Full Sentence Testing The Capabilities Of The Schema",
                yearFounded: faker.number.int({ min: 1950, max: 2000 }),
                headquarters: `${faker.location.city()}, ${faker.location.country()}`,
                numberOfLocations: faker.number.int({ min: 10, max: 100 }),
            },
            {
                brandName: faker.company.name(),
                yearFounded: faker.number.int({ min: 1900, max: 2000 }),
                headquarters: "São Paulo, Zürich & München-Gladbach",
                numberOfLocations: faker.number.int({ min: 10, max: 100 }),
            },
            {
                brandName: "   " + faker.company.name() + " With Spaces   ",
                yearFounded: faker.number.int({ min: 1950, max: 2000 }),
                headquarters: `${faker.location.city()}, ${faker.location.country()}`,
                numberOfLocations: faker.number.int({ min: 10, max: 100 }),
            },
            {
                brandName: faker.company.name() + " Vintage",
                yearFounded: faker.number.int({ min: 1850, max: 1950 }),
                headquarters: `${faker.location.city()}, ${faker.location.country()}`,
                numberOfLocations: faker.number.int({ min: 20, max: 200 }),
            },
            {
                brandName: faker.company.name() + " Explosive Growth",
                yearFounded: faker.number.int({
                    min: currentYear - 5,
                    max: currentYear,
                }),
                headquarters: `${faker.location.city()}, ${faker.location.country()}`,
                numberOfLocations: faker.number.int({ min: 10001, max: 20000 }),
            },
        ];

        const insertedDocs = await Brand.insertMany(seedData);
        console.log(`Successfully inserted ${insertedDocs.length} documents.`);
        insertedDocs.forEach((doc, idx) => {
            console.log(`[Inserted] Case ${idx + 1}: _id ${doc._id}`);
        });
    } catch (err) {
        console.error("Error during seeding:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

main();
