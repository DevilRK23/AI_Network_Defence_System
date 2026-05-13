from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Working"}

@app.get("/threats")
def get_threats():

    data = []

    for i in range(10):

        packet = {
            "source_ip": f"192.168.1.{i}",
            "destination_ip": "142.250.183.14",
            "packet_size": random.randint(100, 6000),
            "status": random.choice(["Normal", "Suspicious"])
        }

        data.append(packet)

    return data