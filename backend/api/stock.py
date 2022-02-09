from fastlab.models import Response
from api import app
import requests
from common import UA


@app.get('/api/stock/index/{category}')
def stock_index(category: str):
    """
    综合指数
    """
    api = f'https://danjuanfunds.com/djapi/fundx/base/index/quotes?category={category}'
    resp = requests.get(api, headers=UA.iphone,).json()
    return Response(data=resp['data'][category])
