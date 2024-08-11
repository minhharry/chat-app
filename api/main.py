import hashlib

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str

user_database = {"admin": User(username="admin", password="admin")}
token_to_user = {}


@app.get("/")
def return_database():
    return {"message": user_database}

@app.post("/register")
def register_user(user: User):
    if user.username in user_database:
        raise HTTPException(status_code=400, detail="Username already exists")
    user_database[user.username] = user
    return {"message": "User registered successfully."}

@app.post("/login")
def login_user(user: User):
    if user.username not in user_database:
        return {"message": {"isLoginOK": False, "token": None}}
    if user_database[user.username].password != user.password:
        return {"message": {"isLoginOK": False, "token": None}}
    hashValue = hashlib.sha256(str(user).encode()).hexdigest()
    token_to_user[hashValue] = user.username
    return {"message": {"isLoginOK": True, "token": hashValue}}

@app.get("/get_username_from_token")
def get_username_from_token(token: str):
    if token not in token_to_user:
        return {"message": "Token invalid!"}
    return {"message": token_to_user[token]} 