from starlette.responses import Response
from api import app
import requests
from bs4 import BeautifulSoup
from fastlab.models import Response


class UA:
    iphone = {'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'}
    mac = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'}


@app.get('/api/blog/articles')
async def blog_articles(id_: str, page: int = 0, order_by: str = 'shared_at'):
    """
    文章列表
    """
    articles = requests.get(f'https://www.jianshu.com/asimov/users/slug/{id_}/public_notes?page={page}&count=10&order_by={order_by}', headers=UA.iphone).json()
    return Response(data=articles)


@app.get('/api/blog/collection/articles')
async def blog_collection_articles(id_: str, page: int = 0, order_by: str = 'added_at'):
    """
    专栏 - 文章列表
    """
    articles = requests.get(f'https://www.jianshu.com/asimov/collections/slug/{id_}/public_notes?page={page}&count=10&order_by={order_by}', headers=UA.iphone).json()
    return Response(data=articles)


@app.get('/api/blog/notebook/articles')
async def blog_notebook_articles(id_: str, page: int = 0, order_by: str = 'notebook'):
    """
    文集 - 文章列表
    """
    articles = requests.get(f'https://www.jianshu.com/asimov/notebooks/{id_}/public_notes?page={page}&count=10&order_by={order_by}', headers=UA.iphone).json()
    return Response(data=articles)


@app.get('/api/blog/collections')
async def blog_collections(user_id: str, page: int = 0):
    """
    专栏列表
    """
    collections = requests.get(f'https://www.jianshu.com/users/{user_id}/collections_and_notebooks?slug={user_id}&type=manager&page={page}&per_page=10', headers=UA.iphone).json()
    return Response(data=collections)


@app.get('/api/blog/notebooks')
async def blog_notebooks(user_id: str, page: int = 0):
    """
    分类列表
    """
    notebooks = requests.get(f'https://www.jianshu.com/users/{user_id}/notebooks?slug={user_id}&type=manager&page={page}&per_page=10', headers=UA.iphone).json()
    return Response(data=notebooks)


@app.get('/api/blog/article/{article_id}')
async def blog_article(article_id):
    """
    文章详情
    """
    html_doc = requests.get(f'https://www.jianshu.com/p/{article_id}', headers=UA.iphone).text
    html = BeautifulSoup(html_doc, 'html.parser')
    return Response(data={
        'id': article_id,
        'title': html.select('h1.title')[0].text,
        'time': html.select('div.meta > span')[-1].text,
        'content': str(html.select('div.note-content')[0])
    })
