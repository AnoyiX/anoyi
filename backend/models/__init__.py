from typing import List
from pydantic import BaseModel, Field


class NameValue(BaseModel):
    name: str
    value: str


class APIBody(BaseModel):
    url: str
    headers: List[NameValue]


class StockIndicesBody(BaseModel):
    code: List[str]
    fields: List[str]


class StockPlatesBody(BaseModel):
    limit: int
    is_acs: bool
    rank_field: str
    rank_type: str
    data_fields: List[str]
