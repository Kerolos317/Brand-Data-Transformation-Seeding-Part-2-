import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { Brand } from "./models/brand.model";

dotenv.config();

function isValidYear(val: any): boolean {
    const num = Number(val);
    if (!Number.isFinite(num) || !Number.isInteger(num)) return false;
    return num >= 1600 && num <= new Date().getFullYear();
}

function getYear(doc: any): number {
    if (isValidYear(doc.yearFounded)) return Number(doc.yearFounded);
    if (isValidYear(doc.yearCreated)) return Number(doc.yearCreated);
    if (isValidYear(doc.yearsFounded)) return Number(doc.yearsFounded);
    return 1600;
}

function getBrandName(doc: any): string {
    if (typeof doc.brandName === "string" && doc.brandName.trim() !== "")
        return doc.brandName;
    if (
        doc.brand &&
        typeof doc.brand.name === "string" &&
        doc.brand.name.trim() !== ""
    )
        return doc.brand.name;
    return "Unknown Brand";
}

function getHeadquarters(doc: any): string {
    if (typeof doc.headquarters === "string" && doc.headquarters.trim() !== "")
        return doc.headquarters;
    if (typeof doc.hqAddress === "string" && doc.hqAddress.trim() !== "")
        return doc.hqAddress;
    return "Unknown";
}

function getNumberOfLocations(doc: any): number {
    const num = Number(doc.numberOfLocations);
    if (Number.isFinite(num) && Number.isInteger(num) && num >= 1) return num;
    return 1;
}

async function main() {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            console.error("MONGODB_URI is not defined in .env");
            process.exit(1);
        }

        await mongoose.connect(uri);
        console.log("Connected to MongoDB for Transformation");

        const docs = (await Brand.find({}).lean()) as any[];

        for (const doc of docs) {
            const update = {
                brandName: getBrandName(doc),
                yearFounded: getYear(doc),
                headquarters: getHeadquarters(doc),
                numberOfLocations: getNumberOfLocations(doc),
            };

            const tempDoc = new Brand(update);
            const validationError = tempDoc.validateSync();

            if (validationError) {
                console.log(
                    `[SKIP] _id: ${doc._id} — ${validationError.message}`,
                );
                continue;
            }

            await Brand.updateOne(
                { _id: doc._id },
                {
                    $set: update,
                    $unset: {
                        yearCreated: "",
                        yearsFounded: "",
                        brand: "",
                        hqAddress: "",
                    },
                },
            );
            console.log(`[OK] _id: ${doc._id} updated successfully.`);
        }
    } catch (err) {
        console.error("Error during transformation:", err);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

main();
