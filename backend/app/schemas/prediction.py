from pydantic import BaseModel
class HousePredictionRequest(BaseModel):
    location: str
    carpet_area_sqft: float
    super_area_sqft: float
    floor_num: float
    Bathroom_num: float
    Balcony_num: float
    Car_Parking_num: float
    furnishing: str
    transaction: str
    ownership: str
    facing: str
    overlooking: str
    society: str
PredictionRequest = HousePredictionRequest
class PredictionResponse(BaseModel):
    predicted_price: float