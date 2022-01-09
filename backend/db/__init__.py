from config import conf
from pymongo import MongoClient

# Mongo
mongo = MongoClient(**conf['mongo'])
