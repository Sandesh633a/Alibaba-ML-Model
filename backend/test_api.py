from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    print("Health check response:", response.json())

def test_predict():
    response = client.post(
        "/predict",
        json={
            "Open": 90.0,
            "High": 92.0,
            "Low": 89.0,
            "Volume": 1000000,
            "Price_Range": 3.0,
            "Daily_Return": 0.05
        },
    )
    assert response.status_code == 200
    print("Predict response:", response.json())

if __name__ == "__main__":
    test_read_main()
    test_predict()
    print("All tests passed successfully!")
