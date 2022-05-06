from typing import Optional
from fastapi import Query
from fastlab.models import Response
from api import app
import requests
from models import StockMarketRealBody
from common import UA


@app.post('/api/stock/market/real')
def market_real(body: StockMarketRealBody):
    """
    综合指数
    """
    prod_code = ",".join(body.code)
    fields = ",".join(body.fields)
    api = f'https://api-ddc.wallstcn.com/market/real?prod_code={prod_code}&fields={fields}'
    resp = requests.get(api, headers=UA.mac).json()
    return Response(data=resp['data'])


@app.get('/api/stock/content/lives')
def content_lives(cursor: Optional[str] = Query(None)):
    """
    实时资讯
    """
    query = f'first_page=false&cursor={cursor}' if cursor else 'first_page=true'
    api = f'https://api-one.wallstcn.com/apiv1/content/lives?channel=global-channel&client=pc&limit=20&accept=live&{query}'
    resp = requests.get(api, headers=UA.mac).json()
    return Response(data=resp['data'])
