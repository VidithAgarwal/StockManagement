import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";





export async function GET(request) {

    const uri =
    "mongodb+srv://vidithagarwal:Classmate123!!@cluster0.w4egf87.mongodb.net/";
    
    const client = new MongoClient(uri);
    
    const query = request.nextUrl.searchParams.get("query");
    
    try {
        const database = client.db("Stock");
        const inventory = database.collection("Inventory");
        
        const products = await inventory.aggregate([
            {$match: 
                {$or:
                    [
                        {productName: {$regex: query, $options: "i"}}
                    ]
                }
            }
        ]).toArray()
        return NextResponse.json({succes: true, products });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

