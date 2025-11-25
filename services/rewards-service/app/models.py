from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from .database import Base

class Reward(Base):
    __tablename__ = "rewards"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    desc = Column(String(255), nullable=False)
    cost = Column(Integer, nullable=False)
    img = Column(String(255), nullable=True)

class Redemption(Base):
    __tablename__ = "redemptions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(50), nullable=False)
    reward_id = Column(Integer, nullable=False)
    reward_name = Column(String(100), nullable=False)
    points = Column(Integer, nullable=False)
    status = Column(String(50), default="Pendiente")
    created_at = Column(DateTime, default=datetime.utcnow)
