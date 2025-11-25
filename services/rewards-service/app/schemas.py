from pydantic import BaseModel
from datetime import datetime

class RewardCreate(BaseModel):
    title: str
    desc: str
    cost: int
    img: str

class RewardResponse(RewardCreate):
    id: int

    class Config:
        orm_mode = True

class RedemptionCreate(BaseModel):
    user_id: str
    reward_id: int
    reward_name: str
    points: int

class RedemptionResponse(RedemptionCreate):
    id: int
    status: str
    created_at: datetime

    class Config:
        orm_mode = True
