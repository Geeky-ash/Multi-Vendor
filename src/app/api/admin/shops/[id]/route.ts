import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Shop from "@/models/Shop";

// This is the most direct and standard signature for a dynamic route handler.
// We are destructuring `params` directly from the second argument.
export async function PUT(
    request: NextRequest, 
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);

    // Ensure the user is an authenticated admin.
    if (!session || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Extract the shop ID from the destructured params.
    const { id } = params;
    const { status } = await request.json();

    // Validate the incoming status value.
    if (!status || !['approved', 'blocked'].includes(status)) {
        return NextResponse.json({ error: 'Invalid or missing status' }, { status: 400 });
    }
    
    await dbConnect();

    try {
        // Find the shop by its ID and update only the status field.
        const updatedShop = await Shop.findByIdAndUpdate(
            id, 
            { status }, 
            { new: true } // This option returns the document after the update.
        );

        if (!updatedShop) {
            return NextResponse.json({ error: 'Shop not found' }, { status: 404 });
        }

        return NextResponse.json(updatedShop);

    } catch (error) {
        // Log the error for debugging purposes on the server.
        console.error("Admin Update Shop Error:", error);
        return NextResponse.json({ error: 'Server error during shop update' }, { status: 500 });
    }
}
