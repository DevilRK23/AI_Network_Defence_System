from sklearn.ensemble import IsolationForest
import numpy as np

training_data = np.array([
    [100],
    [150],
    [200],
    [300],
    [400],
    [500]
])

model = IsolationForest(contamination=0.3)

model.fit(training_data)

def detect_threat(packet_size):

    prediction = model.predict([[packet_size]])

    if prediction[0] == -1:
        return "Suspicious"

    return "Normal"