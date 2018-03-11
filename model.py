from google.appengine.ext import ndb

class User(ndb.Model):
    sns = ndb.StringProperty()
    sns_id = ndb.StringProperty()
    name = ndb.StringProperty()
    thumbnail = ndb.StringProperty()
    
class Room(ndb.Model):
    name = ndb.StringProperty()
    created = ndb.DateTimeProperty(auto_now_add=True)