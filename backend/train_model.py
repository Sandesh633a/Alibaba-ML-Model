import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report


def main():
    print("Loading data...")
    df = pd.read_csv('Ali_Baba_Stock_Data.csv')

    print("Feature engineering...")

    # Feature Engineering
    df['Price_Range'] = df['High'] - df['Low']

    # Target variable
    df['Target'] = (df['Close'] > df['Open']).astype(int)

    # ✅ Final Features (NO leakage)
    features = ['Open', 'High', 'Low', 'Volume', 'Price_Range']

    X = df[features]
    y = df['Target']

    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )

    print("Scaling data...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    print("Training Logistic Regression model...")

    # ✅ Final Model
    lr = LogisticRegression(max_iter=1000)
    lr.fit(X_train_scaled, y_train)

    # Predictions
    y_pred = lr.predict(X_test_scaled)

    # Evaluation
    acc = accuracy_score(y_test, y_pred)

    print(f"Logistic Regression Accuracy: {acc:.4f}")
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

    print("Saving model...")
    joblib.dump(lr, 'model.joblib')
    joblib.dump(scaler, 'scaler.joblib')

    print("Done!")


if __name__ == '__main__':
    main()