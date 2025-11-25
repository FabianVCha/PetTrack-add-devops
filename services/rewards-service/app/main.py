from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import Base, engine, get_db
from . import models, schemas
from datetime import datetime

Base.metadata.create_all(bind=engine)
app = FastAPI(title="Rewards Service", version="1.0")

@app.post("/rewards", response_model=schemas.RewardResponse)
def create_reward(data: schemas.RewardCreate, db: Session = Depends(get_db)):
    new_reward = models.Reward(**data.dict())
    db.add(new_reward)
    db.commit()
    db.refresh(new_reward)
    return new_reward

@app.get("/rewards", response_model=list[schemas.RewardResponse])
def list_rewards(db: Session = Depends(get_db)):
    return db.query(models.Reward).all()

@app.post("/redeem", response_model=schemas.RedemptionResponse)
def redeem_reward(data: schemas.RedemptionCreate, db: Session = Depends(get_db)):
    new_redemption = models.Redemption(
        **data.dict(),
        status="Pendiente",
        created_at=datetime.utcnow()
    )
    db.add(new_redemption)
    db.commit()
    db.refresh(new_redemption)
    return new_redemption

@app.get("/redemptions/{user_id}", response_model=list[schemas.RedemptionResponse])
def user_redemptions(user_id: str, db: Session = Depends(get_db)):
    return db.query(models.Redemption).filter(models.Redemption.user_id == user_id).all()

@app.get("/health")
def health():
    return {"service": "rewards-service", "status": "ok"}
