import { connect } from "@/utils/mongo"
import { NextRequest, NextResponse } from "next/server"
import { WebResponse } from "../../../../utils/web"

export async function POST(request: NextRequest) {
    const body = await request.json()
    const mongo = await connect()
    const {database, collection, filter, ...options} = body
    const result = await mongo.db(database).collection(collection).find(filter, options).toArray()
    return NextResponse.json(WebResponse.successList(result, result.length >= body.limit))
}