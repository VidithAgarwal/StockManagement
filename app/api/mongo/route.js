import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


export async function GET(request) {

const uri = "mongodb+srv://vidithagarwal:Classmate123!!@cluster0.w4egf87.mongodb.net/";

const client = new MongoClient(uri);

    try {
        const database = client.db('Stock');
        const movies = database.collection('Inventory');
        
        // Query for a movie that has the title 'Back to the Future'
        const query = { };
        const movie = await movies.findOne(query);
        
        console.log(movie);
        return NextResponse.json({"b": 35, movie})
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}