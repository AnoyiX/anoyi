from typing import Optional
from fastapi import Query
from fastlab.models import Response
from api import app
import requests
from models import StockIndicesBody, StockPlatesBody
from common import UA


@app.post('/api/stock/real')
def real(body: StockIndicesBody):
    """
    实时数据
    """
    prod_code = ",".join(body.code)
    fields = ",".join(body.fields)
    api = f'https://api-ddc.wallstcn.com/market/real?prod_code={prod_code}&fields={fields}'
    resp = requests.get(api, headers=UA.mac).json()
    return Response(data=resp['data'])


@app.get('/api/stock/lives')
def lives(cursor: Optional[str] = Query(None)):
    """
    实时资讯
    """
    query = f'first_page=false&cursor={cursor}' if cursor else 'first_page=true'
    api = f'https://api-one.wallstcn.com/apiv1/content/lives?channel=global-channel&client=pc&limit=20&accept=live&{query}'
    resp = requests.get(api, headers=UA.mac).json()
    return Response(data=resp['data'])


@app.post('/api/stock/plates')
def plates(body: StockPlatesBody):
    """
    板块排行
    """
    rank_api = f'https://flash-api.xuangubao.cn/api/plate/rank?field={body.rank_field}&type={body.rank_type}'
    rank_resp = requests.get(rank_api, headers=UA.mac).json()
    codes = rank_resp['data'][:body.limit] if body.is_acs else rank_resp['data'][-body.limit:]
    plates_code = ",".join([str(x) for x in codes])
    data_fields = ",".join(body.data_fields)
    data_api = f'https://flash-api.xuangubao.cn/api/plate/data?plates={plates_code}&fields={data_fields}'
    data_resp = requests.get(data_api, headers=UA.mac).json()
    return Response(data=data_resp['data'])
