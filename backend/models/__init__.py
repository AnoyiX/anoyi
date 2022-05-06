from typing import List
from pydantic import BaseModel, Field


class NameValue(BaseModel):
    name: str
    value: str


class APIBody(BaseModel):
    url: str
    headers: List[NameValue]


class StockMarketRealBody(BaseModel):
    code: List[str]
    fields: List[str]
