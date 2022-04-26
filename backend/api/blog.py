import requests
from api import app
from fastlab.models import Response, PageData
from common import UA
from config import conf


@app.get('/api/blog/notes')
def repos(page: int = 0, count: int = 10):
    resp = requests.get(f'https://www.jianshu.com/asimov/users/slug/{conf["jianshu"]["user_slug"]}/public_notes?page={page}&count={count}&order_by=shared_at', headers=UA.iphone).json()
    notes = [x['object']['data'] for x in resp]
    return Response(data=PageData(has_more=len(resp) >= count, data=notes)) 
