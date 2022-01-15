from fastlab.models import Response
from api import app
import requests
from common import UA


@app.get('/api/video/play')
def play_url(vid: str):
    """
    视频无水印播放地址
    """
    video_url = f'https://aweme.snssdk.com/aweme/v1/play/?video_id={vid}&ratio=720p&line=0'
    resp = requests.get(video_url, headers=UA.iphone, allow_redirects=False)
    if resp.status_code == 302:
        location = resp.headers['location']
        return Response(data=location.replace('http:', 'https:'))
    else:
        return Response(code=404, message='not found')


@app.get('/api/video/share/douyin/play')
def play_share(share_url: str):
    """
    视频分享播放地址
    """
    resp = requests.get(share_url, headers=UA.iphone, allow_redirects=False)
    if resp.status_code == 302:
        location = resp.headers['location']
        vid = location.split('?')[0].split('/')[-2]
        if vid:
            resp = requests.get(f'https://www.iesdouyin.com/web/api/v2/aweme/iteminfo/?item_ids={vid}', headers=UA.iphone).json()
            if resp.get('item_list'):
                return play_url(resp['item_list'][0]['video']['vid'])
    return Response(code=400, message='invlid share url')