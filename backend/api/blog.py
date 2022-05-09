import requests
from api import app
from fastlab.models import Response, PageData
from common import UA
from config import conf
from bs4 import BeautifulSoup

user_slug = conf["jianshu"]["user_slug"]


@app.get('/api/blog/notes')
def repos(page: int = 0, count: int = 10):
    """
    文章列表
    """ 
    resp = requests.get(f'https://www.jianshu.com/asimov/users/slug/{user_slug}/public_notes?page={page}&count={count}&order_by=shared_at', headers=UA.iphone).json()
    notes = [x['object']['data'] for x in resp]
    return Response(data=PageData(has_more=len(resp) >= count, data=notes)) 


@app.get('/api/blog/article/{slug}')
async def blog_article(slug):
    """
    文章详情
    """
    html_doc = requests.get(f'https://www.jianshu.com/p/{slug}', headers=UA.iphone).text
    html = BeautifulSoup(html_doc, 'html.parser')
    return Response(data={
        'id': slug,
        'title': html.select('h1.title')[0].text,
        'time': html.select('div.meta > span')[-1].text,
        'author_name': html.select('div.nickname > p.oneline')[0].text,
        'content': str(html.select('div.note-content')[0])
    }) 
