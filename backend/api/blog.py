import requests
from functools import lru_cache
from api import app
from config import conf
from fastlab.models import Response, PageData


auth_headers = {
    'X-Auth-Token': conf['yuque']['token']
}


@lru_cache
def get_user():
    resp = requests.get(f'{conf["yuque"]["host"]}/user', headers=auth_headers).json()
    return resp['data']


@app.get('/api/blog/repos')
def repos(skip: int = 0, limit: int = 20):
    user = get_user()
    resp = requests.get(f'{conf["yuque"]["host"]}/users/{user["id"]}/repos?offset={skip}', headers=auth_headers).json()
    public_repos = list(filter(lambda x: x['public'] == 1, resp['data']))
    return Response(data=PageData(skip=skip, limit=limit, has_more=len(resp['data']) > limit, data=public_repos)) 


@app.get('/api/blog/repo/{repo_id}/docs')
def docs(repo_id: str, skip: int = 0, limit: int = 20):
    resp = requests.get(f'{conf["yuque"]["host"]}/repos/{repo_id}/docs?offset={skip}&limit={limit}', headers=auth_headers).json()
    public_docs = list(filter(lambda x: x['public'] == 1 and x['status'] == 1, resp['data']))
    return Response(data=PageData(skip=skip, limit=limit, has_more=len(resp['data']) > limit, data=public_docs)) 
