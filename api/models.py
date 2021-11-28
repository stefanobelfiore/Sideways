from flask import Flask
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.String, primary_key=True)
    position = db.Column(db.String)
    currentState = db.Column(db.String)
    destination = db.Column(db.String)
    
    def to_dict(self):
        return {
            "id": self.id,
            "position": self.position,
            "currentState":self.currentState,
            "destination":self.destination
    }

    def __repr__(self):
        return '<User %r>' % self.username