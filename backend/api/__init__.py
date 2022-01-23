from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import conf

app = FastAPI(**conf['application'])


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


__all__ = ['app', 'blog', 'mongo', 'stock', 'video']
