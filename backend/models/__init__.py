from typing import List, Optional
from pydantic import BaseModel, Field


class NameValue(BaseModel):
    name: str
    value: str


class APIBody(BaseModel):
    url: str
    headers: List[NameValue]