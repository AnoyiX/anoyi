from api import app
from db import mongo
from pydantic import BaseModel
from typing import Optional
from fastlab.models import Response, PageData
from bson import ObjectId


class MongoRequestBody(BaseModel):
    db: str
    collection: str
    query:  Optional[dict] = {}
    projection: Optional[dict] = None
    skip: Optional[int] = 0
    limit: Optional[int] = 24
    sort: Optional[dict] = None


@app.post('/api/mongo/doc')
async def docs(body: MongoRequestBody):
    if body.query.get('_id'):
        body.query['_id'] = ObjectId(body.query.get('_id'))
    doc = mongo[body.db][body.collection].find_one(body.query, body.projection)
    if doc.get('_id'):
        doc['_id'] = str(doc.get('_id'))
    return Response(data=doc)


@app.post('/api/mongo/docs')
async def docs(body: MongoRequestBody):
    cursor = mongo[body.db][body.collection].find(body.query, body.projection).skip(body.skip).limit(body.limit)
    if body.sort:
        sort = [(x, body.sort[x]) for x in body.sort.keys()]
        cursor = cursor.sort(sort)
    docs = list(cursor)
    for item in docs:
        if item.get('_id'):
            item['_id'] = str(item.get('_id'))
    total = mongo[body.db][body.collection].count_documents(body.query)
    return Response(data=PageData(skip=body.skip, limit=body.limit, total=total, has_more=total > body.skip + body.limit, data=docs))
