import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const uri =
        "mongodb+srv://vidithagarwal:Classmate123!!@cluster0.w4egf87.mongodb.net/";

    const client = new MongoClient(uri);

    try {
        const database = client.db("Stock");
        const inventory = database.collection("Inventory");

        // Query for a movie that has the title 'Back to the Future'
        const query = {};
        const products = await inventory.find(query).toArray();
        return NextResponse.json({succes: true, products });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

export async function POST(request) {

    const body = await request.json();

    const uri =
        "mongodb+srv://vidithagarwal:Classmate123!!@cluster0.w4egf87.mongodb.net/";

    const client = new MongoClient(uri);

    try {
        const database = client.db("Stock");
        const inventory = database.collection("Inventory");

        // Query for a movie that has the title 'Back to the Future'
        const product = await inventory.insertOne(body);

        return NextResponse.json({ product, ok: true });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
