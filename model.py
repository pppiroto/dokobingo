from google.appengine.ext import ndb

class User(ndb.Model):
    sns = ndb.StringProperty()
    id = ndb.StringProperty()
    name = ndb.StringProperty()

class Room(ndb.Model):
    name = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)