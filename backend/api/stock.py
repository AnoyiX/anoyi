from fastlab.models import Response
from api import app
import requests
import json

@app.get('/api/stock/overview/{code}')
def stock_overview(code: str):
    """
    综合指数
    """
    headers = {
        'Host': 'd.10jqka.com.cn',
        'Referer': 'http://q.10jqka.com.cn/',
        'Pragma': 'no-cache'
    }
    api = f'http://d.10jqka.com.cn/v6/time/{code}/last.js'
    resp = requests.get(api, headers=headers).text
    data = resp.replace(f'quotebridge_v6_time_{code}_last(', '')[0:-1]
    return Response(data=json.loads(data))
