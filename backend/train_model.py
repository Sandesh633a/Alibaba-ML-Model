# import pandas as pd
# from sklearn.model_selection import train_test_split
# from sklearn.linear_model import LogisticRegression
# from sklearn.metrics import accuracy_score, classification_report
# import joblib
# import os

# def main():
#     print("Loading data...")
#     # Load dataset
#     df = pd.read_csv('Ali_Baba_Stock_Data.csv')
    
#     print("Engineering features...")
#     # Feature Engineering based on assignment instructions
#     # Price_Range = High - Low
#     df['Price_Range'] = df['High'] - df['Low']
    
#     # Daily_Return = (Close - Open) / Open
#     df['Daily_Return'] = (df['Close'] - df['Open']) / df['Open']
    
#     # Create Target Variable: 1 if Close > Open, else 0
#     df['Target'] = (df['Close'] > df['Open']).astype(int)
    
#     # Feature Selection
#     features = ['Open', 'High', 'Low', 'Volume', 'Price_Range', 'Daily_Return']
#     X = df[features]
#     y = df['Target']
    
#     print("Splitting data...")
#     # Train-Test Split (Stratified)
#     X_train, X_test, y_train, y_test = train_test_split(
#         X, y, test_size=0.2, random_state=42, stratify=y
#     )
    
#     print("Training Logistic Regression model...")
#     # Train Model
#     lr = LogisticRegression()
#     lr.fit(X_train, y_train)
    
#     # Evaluate
#     y_pred = lr.predict(X_test)
#     acc = accuracy_score(y_test, y_pred)
#     print(f"Model trained successfully. Accuracy: {acc:.4f}")
#     print("Classification Report:")
#     print(classification_report(y_test, y_pred))
    
#     # Save Model
#     print("Saving model to model.joblib...")
#     joblib.dump(lr, 'model.joblib')
#     print("Done!")

# if __name__ == '__main__':
#     main()









import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report


def main():
    print("Loading data...")
    df = pd.read_csv('Ali_Baba_Stock_Data.csv')

    print("Feature engineering...")

    # Price Range
    df['Price_Range'] = df['High'] - df['Low']

    # Target (same as before)
    df['Target'] = (df['Close'] > df['Open']).astype(int)

    #  Remove leakage features (VERY IMPORTANT)
    # Do NOT use Daily_Return or Close

    # Use limited realistic features
    features = ['Open', 'High', 'Low', 'Volume']

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

    print("Training KNN model...")

    #  Increase neighbors to reduce overfitting
    knn = KNeighborsClassifier(n_neighbors=15)

    knn.fit(X_train_scaled, y_train)

    y_pred = knn.predict(X_test_scaled)

    acc = accuracy_score(y_test, y_pred)

    print(f"KNN Accuracy: {acc:.4f}")
    print("Classification Report:")
    print(classification_report(y_test, y_pred))

    print("Saving model...")
    joblib.dump(knn, 'model.joblib')
    joblib.dump(scaler, 'scaler.joblib')

    print("Done!")


if __name__ == '__main__':
    main()