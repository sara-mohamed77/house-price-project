from fastapi import APIRouter, Request
from app.services.inference import predict_house_price
from app.schemas.prediction import HousePredictionRequest
from app.services.inference import predict_house_price
import json
from app.core.config import LOCATIONS_PATH
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.inference import predict_price
router = APIRouter()
router = APIRouter(
    prefix="/api",
    tags=["Prediction"]
)
@router.post("/predict")
def predict(
    data: HousePredictionRequest,
    request: Request
):
    model = request.app.state.model

    prediction = predict_house_price(model, data)

    return {
        "predicted_price": prediction
    }
@router.get("/locations")
def get_locations():
    with open(LOCATIONS_PATH, "r", encoding="utf-8") as f:
        locations = json.load(f)

    return {"locations": locations}