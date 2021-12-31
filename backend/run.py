import uvicorn
from api import *


if __name__ == '__main__':
    uvicorn.run(app=app, host="0.0.0.0", port=8080, access_log=False)
