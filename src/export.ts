import mongoose from "mongoose";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";
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
        console.log("Connected to MongoDB for Export");

        const docs = await Brand.find({}).lean();

        const outputPath = path.join(__dirname, "..", "brands-exported.json");
        fs.writeFileSync(outputPath, JSON.stringify(docs, null, 2), "utf-8");

        console.log(
            `Export successful. ${docs.length} documents written to brands-exported.json`,
        );
    } catch (err) {
        console.error("Error during export:", err);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB");
    }
}

main();
