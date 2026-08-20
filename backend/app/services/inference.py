import pandas as pd
def predict_house_price(model, data):

    input_data = pd.DataFrame([{
        "location": data.location,
        "Transaction": data.transaction,
        "Furnishing": data.furnishing,
        "facing": data.facing,
        "overlooking": data.overlooking,
        "Ownership": data.ownership,
        "carpet_area_sqft": data.carpet_area_sqft,
        "floor_num": data.floor_num,
        "Bathroom_num": data.Bathroom_num,
        "Balcony_num": data.Balcony_num,
        "Car_Parking_num": data.Car_Parking_num,
        "super_area_sqft": data.super_area_sqft,
        "location_grouped": data.location,
        "society_grouped": data.society
    }])

    prediction = model.predict(input_data)
    return float(prediction[0])
predict_price = predict_house_price